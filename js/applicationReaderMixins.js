if (typeof App === 'undefined') {
    App = Ember.Application.create({
        rootElement: '#application'
    });
}

var outcomeColorMap = {
    'Hired' : 'label--success',
    'Withdrew' : 'label--warning',
    'Rejected' : 'label--error'
}

App.applicationReaderProcesser = function(parsedJson){
    parsedJson.application.formattedCreatedDate = moment(parsedJson.application.CreatedDate).format('MMM DD, YYYY');
    var jobQuestions = Ember.A();
    var generalQuestions = Ember.A();

    contactRows = Ember.A();
    contactRow = Ember.A();

    //we need to split up the additional contact fields into a 2d array where each row is a max length of 2 items. 
    //This is done so the css is able to handle uneven height of the fields.
    parsedJson.contactFields.forEach(function(f){
        if(contactRow.length == 2){
            contactRows.push(contactRow);
            contactRow = Ember.A();
        }

        f.value = parsedJson.application[f.name];
        f.isEmail = f.type === 'EMAIL';
        f.emailLink = f.type === 'EMAIL' ? 'mailto:' + f.value : null;
        contactRow.push(f);
    });

    contactRows.push(contactRow);
    parsedJson.contactRows = contactRows;

    if (parsedJson.talentProfile) {
        parsedJson.talentProfile.labels = labels;

        //find the values of the fields that are in the field set
        if(parsedJson.talentProfile.Education_Histories__r && parsedJson.talentProfile.Education_Histories__r.records){
            parsedJson.talentProfile.Education_Histories__r.records.forEach(function(edu){
                var fieldSet = [];
                parsedJson.eduFields.forEach(function(f) {
                    f.value = edu[f.name];
                    fieldSet.push(f);
                });

                edu.fieldSet = fieldSet;
            })
        }

        //find the values of the fields that are in the field set
        if(parsedJson.talentProfile.Employment_Histories__r && parsedJson.talentProfile.Employment_Histories__r.records){
            parsedJson.talentProfile.Employment_Histories__r.records.forEach(function(employ){
                var fieldSet = [];
                parsedJson.employFields.forEach(function(f) {
                    f.value = employ[f.name];
                    fieldSet.push(f);
                });

                employ.fieldSet = fieldSet;
            })
        }

        // camelize talent profile fields
        parsedJson.talentProfile.camelizedModel = App.camelizeObj(parsedJson.talentProfile);
    }

    //if we have questions split them up into jobQuestions and generalQuestions
    var markupByScore = {
        '1': '<span data-toggle="tooltip" title="'+labels.positive+'" class="juicon juicon-like text-success mar--sm--lxs"></span>',
        '0' : '',
        '-1': '<span data-toggle="tooltip" title="'+labels.negative+'" class="juicon juicon-dislike text-error mar--sm--lxs"></span>',
        'disqualify': '<span data-toggle="tooltip" title="'+labels.disqualify+'" class="juicon juicon-ban text-error mar--sm--lxs"></span>'
    };

    if(parsedJson.application.Applicant_Responses__r && parsedJson.application.Applicant_Responses__r.records){
        parsedJson.application.Applicant_Responses__r.records.forEach(function(resp){
            var scoreMarkup = resp.Disqualified__c === true ? markupByScore.disqualify : markupByScore[resp.Score__c];

            //if we have any previous found checkbox repsonses we need to group them up.
            if(!Ember.isEmpty(jobQuestions.findBy('Form_Element__c', resp.Form_Element__c))){   //this if is checking for jobQuestion checkboxes
                var foundResp =  jobQuestions.findBy('Form_Element__c', resp.Form_Element__c);

                if (!Ember.isEmpty(scoreMarkup)) {
                    foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
                }
            } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){  //this if is checking for generalQuestions checkboxes
                var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
                if (!Ember.isEmpty(scoreMarkup)) {
                    foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
                }
            } else {
                if (!Ember.isEmpty(scoreMarkup)) {
                    resp.Value__c += scoreMarkup;
                }
                if(resp.Form_Element__r.Section__c == 'Job Specific'){
                    jobQuestions.addObject(Ember.Object.create(resp));
                } else if(resp.Form_Element__r.Section__c == 'General'){
                    generalQuestions.addObject(Ember.Object.create(resp));
                }
            }
        });
    }

    parsedJson.positiveFeedback = 0;
    parsedJson.negativeFeedback = 0;
    parsedJson.neutralFeedback = 0;

    if(parsedJson.application.Evaluation_Lookups__r && parsedJson.application.Evaluation_Lookups__r.records){
        parsedJson.evaluations = parsedJson.application.Evaluation_Lookups__r.records
        parsedJson.evaluations.forEach(function(evaluation){
            if(evaluation.Interview__c != null){
                if(evaluation.Positive_Feedback__c != 0){
                    parsedJson.positiveFeedback += 1;
                } else if(evaluation.Negative_Feedback__c != 0){
                    parsedJson.negativeFeedback += 1;
                } else {
                    parsedJson.neutralFeedback += 1
                }

                evaluation.Interview__r.camelizedModel = App.camelizeObj(evaluation.Interview__r);
            }
        })
    } else {
        parsedJson.evaluations = [];
    }
    
    parsedJson.regardingSelectValues = [];
    parsedJson.interviewers = {};

    parsedJson.regardingSelectValues.addObject({
        value : 'null|' + labels.miscellaneous,
        label : labels.miscellaneous
    });
    //only accepted or completed interviews can have feedback.
    if(!Ember.isEmpty(parsedJson.interviews)){
        parsedJson.interviews.forEach(function(interview){
            if(interview.Status__c == 'Accepted' || interview.Status__c == 'Completed'){
                var obj = {
                    value : interview.Id + '|Interview',
                    label : Ember.isEmpty(interview.Topics__c) ? 'Interview: ' + interview.Interviewers__c : interview.Topics__c
                }

                parsedJson.regardingSelectValues.addObject(obj);
                parsedJson.interviewers[interview.Id] = Ember.isEmpty(interview.Topics__c) ? null : 'Interview with ' + interview.Interviewers__c;
            }
        });
    }

    parsedJson.regardingSelectValues.addObject({
        value : 'null|' + labels.finalSelection,
        label : labels.finalSelection   
    });

    parsedJson.application.showMax = parsedJson.scoreSort == 'Raw_Score__c' //if the scoring type isn't the default Raw_Score don't show the maximum
    parsedJson.application.score = parsedJson.application[parsedJson.scoreSort];

    if(parsedJson.application.Source__c == 'Career Site'){
        parsedJson.application.Source__c = parsedJson.careerSiteName;
    }

    if(parsedJson.application.showMax){
        parsedJson.application.hasScore = !Ember.isEmpty(parsedJson.application.score) && !Ember.isEmpty(parsedJson.application.Maximum_Score__c);
    } else {
        parsedJson.application.hasScore = !Ember.isEmpty(parsedJson.application.score);
    }
    

    if(parsedJson.application.hasScore){
        if(parsedJson.application.score >= 0) {
            parsedJson.application.ratingColor = 'text-success';
        } else if(parsedJson.application.score < 0) {
            parsedJson.application.ratingColor = 'text-error';
        }
    }

    parsedJson.application = Ember.Object.create(parsedJson.application);

    //helper function defined in toHelpers allows us to get a list of dependent picklists to use.
    parsedJson.statusOptions = getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace);
    parsedJson.jobQuestions = jobQuestions;
    parsedJson.generalQuestions = generalQuestions;
    parsedJson.selectedStage = parsedJson.application.Stage__c;
    parsedJson.selectedStatus = parsedJson.application.Status__c;
    parsedJson.firstTime = true;
    parsedJson.isSF1 = isSF1;
    return parsedJson;
};

App.AddLabelsController = Ember.ObjectController.extend({
    labels: labels
});

App.camelizeObj = function camelizeObj(obj) {
    var camelizedObj = {};

    Object.keys(obj).forEach(function(key) {
        camelizedObj[key.replace('__c','').camelize()] = obj[key];
    });

    return camelizedObj;
};

App.CamelizeModelMixin = Ember.Mixin.create({
    camelizedModel: function() {
        var model = this.get('model');
        return App.camelizeObj(model);
    }.property('model')
});

App.AdditionalInfoMixin = Ember.Mixin.create({
    camelizedModel: function() {
        var model = this.get('model');
        var camelizedModel = {};

        Object.keys(model).forEach(function(key) {
            camelizedModel[key.replace('__c','').camelize()] = model[key];
        });

        return camelizedModel;
    }.property('model')
});

App.OtherAppsMixin = Ember.Mixin.create({
	employmentText : function(){
        var employmentHistory = this.get('employmentHistory');
        if(this.get('isInternal')){
            return !Ember.isEmpty(this.get('Candidate_User__r')) ? this.get('Candidate_User__r').Title : '';
        } else if(!Ember.isEmpty(employmentHistory)){
            return employmentHistory.Job_Title__c  + ' at ' + employmentHistory.Name;
        }

        return labels.cardNoEmployment
    }.property('employmentHistory'),
    hasOutcome : function(){
        return !Ember.isEmpty(this.get('Outcome__c'))
    }.property('Outcome__c'),
    outcomeColor : function(){
        return outcomeColorMap[this.get('Outcome__c')];
    }.property('Outcome__c'),
    statusText : function(){
        var offerStage = this.get('parentController').get('offerStage');
        var statusText = this.get('Stage__c');

        if(Ember.isEmpty(this.get('Outcome__c'))){
            if(statusText == offerStage && !Ember.isEmpty(this.get('Job_Offer_Lookups__r'))){
                statusText += ' (' + this.get('Job_Offer_Lookups__r').records[0].Status__c + ')';
            } else {
                statusText += ' (' + this.get('Status__c') + ')';
            }
        }

        return statusText;
    }.property('parentController')
})

App.FeedbackMixin = Ember.Mixin.create({
	headerText : function(){
         var headerText = '';
        if(this.get('hasFinal')){
            headerText = labels.finalSelection;
        } else if(Ember.isEmpty(this.get('Interview__c'))){
            headerText = labels.resumeReview;
        } else if(this.get('Interview__r').Topics__c){
            headerText = this.get('Interview__r').Topics__c;
        } else {
            headerText = this.get('Interview__r').Interviewers__c
        }

        return headerText;
    }.property('Interview__r'),
    tooltipText : function(){
        var tooltipText = '';
        var feedback = this.get('Net_Feedback_Score__c');

        if(this.get('Rejected__c')){
            tooltipText = labels.rejected
        } else if(this.get('Selected__c')){
            tooltipText = labels.selected
        } else if(feedback == 1){
            tooltipText = labels.positiveFeedback
        } else if(feedback == 0){
            tooltipText = labels.neutralFeedback
        } else if (feedback == -1){
            tooltipText = labels.negativeFeedback
        }

        return tooltipText;
    }.property('Net_Feedback_Score__c'),
    icon : function(){
        var icon = '';
        var feedback = this.get('Net_Feedback_Score__c');

        if(this.get('Rejected__c')){
            icon = 'juicon-ban'
        } else if(this.get('Selected__c')){
            icon = 'juicon-check'
        } else if(feedback == 1){
            icon = 'juicon-like'
        } else if (feedback == 0){
            icon = 'juicon-question-circle'
        } else if (feedback == -1){
            icon = 'juicon-dislike'
        }

        return icon
    }.property('Net_Feedback_Score__c'),
    iconColor : function(){
        var iconColor = '';
        var feedback = this.get('Net_Feedback_Score__c');
        if(this.get('Rejected__c')){
            iconColor = 'text-error'
        } else if(feedback == 1 || this.get('Selected__c')){
            iconColor = 'text-success'
        } else if (feedback == 0){
            iconColor = 'text-info'
        } else if (feedback == -1){
            iconColor = 'text-warning';
        }

        return iconColor;
    }.property('Net_Feedback_Score__c'),
    hasFinal : function(){
        return (this.get('Rejected__c') || this.get('Selected__c'))
    }.property('Rejected__c', 'Selected__c'),
    criteriaFields : function(){
        var self = this;
        var processedFields = Ember.A();
        var criteriaFields = this.get('parentController').get('additionalCriteriaFields');

        if(!Ember.isEmpty(criteriaFields)){
            criteriaFields.forEach(function(field){
                var obj = {}
                obj.label = field.label
                obj.value = self.get(field.name);

                processedFields.addObject(obj);
            });
        }

        return processedFields;
    }.property('parentController'),
    formattedDate : function(){
        return moment(this.get('CreatedDate')).format('MMM DD, YYYY')
    }.property('CreatedDate'),
    displayPanelBottom : function(){
        var hasCriteria = !Ember.isEmpty(this.get('criteriaFields')) && !Ember.isEmpty(this.get('Interview__c'));
        var hasComments = !Ember.isEmpty(this.get('Comments__c'));
        var hasDisposition = !Ember.isEmpty(this.get('Disposition__c'));
        return (hasCriteria || hasComments || hasDisposition)
    }.property('hasCriteria', 'Comments__c', 'Disposition__c'),
    isResumeReview: function() {
        return Ember.isEmpty(this.get('Interview__c'));
    }.property('Interview__c')
})

App.InterviewMixin = Ember.Mixin.create({
	sortedTimeSlots : function(){
        var sortedTimeSlots = Ember.A();

        if(!Ember.isEmpty(this.get('Interview_Time_Slots__r')) && !Ember.isEmpty(this.get('Interview_Time_Slots__r').records)){
            var timeSlots = Ember.A(this.get('Interview_Time_Slots__r').records);
            var interviewStatus = this.get('Status__c');

            if(interviewStatus == 'Accepted' || interviewStatus == 'Completed'){    //if its been selected we only want the selected timeslot
                sortedTimeSlots = timeSlots.filterBy('Status__c', 'Selected');
            } else {    //else we want all the timeslots sorted by the earliest one.
                sortedTimeSlots = timeSlots.sortBy('Start_Time__c');  
            }
        }
        
        return sortedTimeSlots;
    }.property('parentController'),
    otherTooltipText: function(){
        var self = this;
        var sortedTimeSlots = this.get('sortedTimeSlots');
        var formattedStartDate = labels.dateTime + ' TBD';
        if(!Ember.isEmpty(sortedTimeSlots)){
            var dateString = '';
            var formatString = 'ddd, MMM DD, YYYY @ h:mm A z';

            if(isSF1){
                formatString = 'ddd MMM DD @ h:mm A';
            }

            sortedTimeSlots.forEach(function(ts, i) {
                if (i > 0) {
                    dateString += moment(sortedTimeSlots[i].Start_Time__c).tz(self.get('parentController').get('timeZone')).format(formatString);

                    if (i < sortedTimeSlots.length - 1) {
                        dateString += '<br/>';
                    }

                    if(isSF1){
                        dateString = dateString.replace('AM', 'A').replace('PM', 'P');  //shorten the AM PM for more space on mobile
                    }
                }  
            });


            return dateString
        }

    }.property('parentController'),
    formattedStartDate : function(){
        var sortedTimeSlots = this.get('sortedTimeSlots');
        var formattedStartDate = labels.dateTime + ' TBD';

        if(!Ember.isEmpty(sortedTimeSlots)){
            var formatString = 'ddd, MMM DD, YYYY @ h:mm A z';

            if(isSF1){
                formatString = 'ddd MMM DD @ h:mm A';
            }

            var dateString = moment(sortedTimeSlots[0].Start_Time__c).tz(this.get('parentController').get('timeZone')).format(formatString);

            if(isSF1){
                dateString = dateString.replace('AM', 'A').replace('PM', 'P');  //shorten the AM PM for more space on mobile
            }

            return dateString
        }

        return formattedStartDate;

    }.property('parentController'),
    otherText : function(){
        var sortedTimeSlots = this.get('sortedTimeSlots');
        var otherText = ''
        
        if(!Ember.isEmpty(sortedTimeSlots)){
            var totalTimeSlots = sortedTimeSlots.length;

            if(totalTimeSlots > 1){
                return '(' + labels.and + ' ' + (totalTimeSlots - 1) + ' ' + labels.more + ')';
            }
        }

        return otherText;
    }.property('sortedTimeSlots'),
    statusColor : function(){
        return this.get('Status__c').toLowerCase();
    }.property('Status__c'),
    isCompleted : function(){
        return this.get('Status__c').toLowerCase() == 'completed'
    }.property('Status__c'),
    isSF1 : function(){
        return isSF1
    }.property(''),
    interviewUrl : function(){
        return '/apex/' + extnamespace + 'to_interviewView?id=' + this.get('Id') + '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + this.get('retPage') + '?id=' + this.get('parentController').get('application').Id)
    }.property('parentController')
});

App.ApplicationReaderMixin = Ember.Mixin.create({
    emailLink: function() {
        return 'mailto:' + this.get('application.Email__c');
    }.property('application.Email__c'),
	statusText : function(){
        var offerStage = this.get('offerStage');
        var application = this.get('application');
        var statusText = application.Stage__c;
        
        if(Ember.isEmpty(application.Outcome__c)){
            if(statusText == offerStage){
                if(!Ember.isEmpty(application.Job_Offer_Lookups__r)){
                    statusText += ' (' + application.Job_Offer_Lookups__r.records[0].Status__c + ')';
                } else {
                    statusText += ' (' + application.Status__c + ')';
                }
            } else {
                statusText += ' (' + application.Status__c + ')';
            }
        }

        return statusText;
    }.property('application.Stage__c', 'application.Status__c'),
    isSF1 : function(){
        return isSF1;
    }.property(),
    isInternal : function(){
        return this.get('application').Source__c == 'Internal';
    }.property('application'),
    hasOutcome : function(){
        return !Ember.isEmpty(this.get('application').Outcome__c)
    }.property('application'),
    hasAddress : function(){
        return (!Ember.isEmpty(this.get('application').City__c) && !Ember.isEmpty(this.get('application').State_Province__c))
    }.property('application'),
    hasProfile : function(){
        return !Ember.isEmpty(this.get('application').LinkedIn_Profile_Id__c);
    }.property('application'),
    hasResume : function(){
        return !Ember.isEmpty(this.get('resume'));
    }.property('resume'),
    outcomeColor : function(){
        return outcomeColorMap[this.get('application').get('Outcome__c')];
    }.property('application'),
    employmentText : function(){
        var app = this.get('application');
        var employmentHistory = labels.cardNoEmployment;

        if(app.Source__c == 'Internal'){
            employmentHistory = !Ember.isEmpty(app.Candidate_User__r) ? app.Candidate_User__r.Title : '';
        } else if(!Ember.isEmpty(app.Employment_Histories__r)){
            var employmentHistory = app.Employment_Histories__r.records[0];
            employmentHistory = employmentHistory.Job_Title__c  + ' '  + labels.at + ' ' + employmentHistory.Name;
        }

        return employmentHistory;
    }.property('application'),
    linkedInLinkText : function(){
        var linkText = labels.cardSearch

        if(this.get('hasProfile')){
            linkText = labels.cardProfile;;
        }

        return linkText;
    }.property('hasProfile'),
    statusSelect : function(){
        //we need to prevent this from happening on load because we don't want to null out the current status
        if(!this.get('firstTime')){
            this.set('selectedStatus', null);
        } else {
            this.set('firstTime', false);
        }

        return this.get('statusOptions')[this.get('selectedStage')];
    }.property('selectedStage'),
    csaUrl : function(){
        var app = this.get('application');
        var url = '';

        url = '/apex/' + extnamespace + 'to_linkedInCSAFrame?linkId=' + app.LinkedIn_Link_Id__c + '&firstName=' 
               + app.First_Name__c + '&lastName=' + app.Last_Name__c + '&email=' + app.Email__c 
               + '&appId=' + app.Id 

        if(app.Talent_Profile__c){
            //ie9 has no origin
            var badgeUrl = "https://" + window.location.host + '/' +  app.Talent_Profile__c;

            url += '&tpId=' + app.Talent_Profile__c + '&url=' + encodeURIComponent(badgeUrl);

            if(app.Talent_Profile__r){
                if(app.Talent_Profile__r.LinkedIn_Badge_Location__c){
                    url += '&location=' + app.Talent_Profile__r.LinkedIn_Badge_Location__c
                }

                if(app.Talent_Profile__r.LinkedIn_Badge_Company_Name__c){
                    url += '&companyName=' + app.Talent_Profile__r.LinkedIn_Badge_Company_Name__c;
                }

                if(app.Talent_Profile__r.LinkedIn_Badge_Title__c){
                    url += '&title=' + app.Talent_Profile__r.LinkedIn_Badge_Title__c;
                }
            }
        }

        return url;
    }.property('application'),
    otherAppsLength : function(){
        return this.get('otherApps').length;
    }.property('otherApps'),
    showApplicationDetails : function(){
    	return this.get('selectedTab') == 'application';
    }.property('selectedTab'),
    showResume : function(){
    	return this.get('selectedTab') == 'resume';
    }.property('selectedTab'),
    showLinkedIn : function(){
    	return this.get('selectedTab') == 'linkedin';
    }.property('selectedTab'),
    alertStatusClass: function() {
        var alertStatus = this.get('application.Alert_Status__c');
        return Ember.isEmpty(alertStatus) ? null : alertStatus === 'Warning' ? 'alert--warning' : 'alert--error';
    }.property('application'),
    thresholdDays: function() {
        return moment().diff(moment(this.get('application.Condition_Start_Time__c')), 'days');
    }.property('application'),
    actions : {
    	selectTab : function(tab){
    		this.set('selectedTab', tab);
    	},
        navigation : function(link){
            if (link.search(/^http[s]?\:\/\//) == -1) {
                link = 'http://' + link;
            }

            if(isSF1){
                sforce.one.navigateToURL(link)
            } else {
                window.open(link);
            }
        },
        openStatusModal : function(){
            var self = this;
            $('#status-modal').modal('show');

            $('body').off('hide.jui.modal').on('hide.jui.modal', function(){
                self.set('firstTime', true);
                self.set('selectedStage', self.get('application').Stage__c);
                self.set('selectedStatus', self.get('application').Status__c);
            });
        },
        updateStageStatus : function(){
            var self = this;

            if(Ember.isEmpty(this.get('selectedStatus'))){
                this.set('noSelect', true);
                return
            }

            this.set('showAlert', false);
            this.set('noSelect', false);

            var application = this.get('application');
            application.set('Stage__c', this.get('selectedStage'));
            application.set('Status__c', this.get('selectedStatus'))

            $('#status-modal').modal('hide');
            cont.updateStatus(JSON.stringify(application), function(res){
                parsedResult = parseResult(res);
                if(!parsedResult.isSuccess){
                    self.set('showAlert', true);
                    self.set('errorMsg', parsedResult.errorMessages);
                }
            });
        },
        provideFeedback : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewFeedback?id=' + this.get('application').Id + 
                      '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + this.get('retPage') + '?id=' + this.get('application').Id)

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        },
        addInterview : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewNewEdit?appId=' + this.get('application').Id + 
                      '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + this.get('retPage') + '?id=' + this.get('application').Id)

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        },
        viewTalentProfile : function(){
            var url = '/apex/' + extnamespace + 'to_talentProfileView?userId=' + this.get('application').Candidate_User__c;

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url;
            }
        },
        loadGoogleMaps: function(){
            var app = this.get('application')
            if(!isSF1) {
                var address = 'https://www.google.com/maps/place/';
                address += Ember.isEmpty(app.Street_Address__c) ? '' : app.Street_Address__c + ' ';
                address += Ember.isEmpty(app.City__c) ? '' : app.City__c + ' ';
                address += Ember.isEmpty(app.State_Province__c) ? '' : app.State_Province__c + ' ';
                address += Ember.isEmpty(app.Country__c) ? '' : app.Country__c + ' ';
                window.open(address, 'google-maps');
            }
        },
        loadLinkedIn: function(){
            var application = this.get('application');

            if(Ember.isEmpty(application.LinkedIn_Profile_Id__c)){
                var address = 'https://www.linkedin.com/vsearch/p?type=people&keywords=' + application.First_Name__c + '+' + application.Last_Name__c

                if (isSF1){
                    sforce.one.navigateToURL(address);
                } else {
                    window.open(address, 'linkedin');
                }
            } else {
                var linkedInId = application.LinkedIn_Profile_Id__c;

                if (isSF1) {
                    var address = 'https://touch.www.linkedin.com/#profile/' + linkedInId;
                    
                    if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
                        var now = new Date().valueOf();
                        setTimeout(function () {
                            if (new Date().valueOf() - now > 300) return;
                            sforce.one.navigateToURL(address);
                        }, 100);

                        sforce.one.navigateToURL('linkedin://#profile/' + linkedInId);
                    } else {
                        sforce.one.navigateToURL(address);
                    }
                } else {
                    var address = 'https://www.linkedin.com/profile/view?id=' + linkedInId
                    window.open(address, 'linkedin');
                }
            }
        },
        clickProvideFeedbackInline: function() {
            if(isSF1){
                $('#feedback-modal').modal('show');
            } else {
                if (!this.get('isInlineFeedbackVisible')) {
                    $('.js-feedback-card').slideDown();
                } else {
                    $('.js-feedback-card').slideUp();
                }
                
                this.toggleProperty('isInlineFeedbackVisible');
                return false;
            }
        },
        openResumeUrl : function(){
            sforce.one.navigateToFeedItemDetail(this.get('resumeFeedItem').Id);
        },
        openApplicationModal : function(){
            if(isSF1){
                $('#applicantModal').modal();
            } else {
                window.location.href = '/_ui/search/ui/UnifiedSearchResults?searchType=2&str=' + this.get('application').get('Name');
            }
        },
        navigateToApplication : function(){
            if(isSF1){
                sforce.one.navigateToSObject(this.get('application').Id);
            } else {
                window.location.href = '/' + this.get('application').Id;
            }
        }
    }
});

// FULL COMPONENTS
App.ToolTipsterComponent = Ember.Component.extend({
    attributeBindings: ['data'],
    layoutName: 'components/tooltipster',
    $button: function() {
        return $('.' + this.get('buttonClass'));
    }.property('buttonClass'),
    customInitializer: function() {
        return '';
    },
    initializeToolTipstser: function() {
        var self = this;
        var $button = this.get('$button');
        var content = '<div id="' + this.get('elementId') + '" class="ember-view">' + this.$().html() + '</div>';
        var hideTooltipster = function() {
            $button.tooltipster('hide');
        };

        var tooltipOptions = {
            contentAsHTML: true,
            trigger: 'click',
            autoClose: false,
            //autoClose: true,
            //interactive: true,
            //hideOnClick: true,
            offsetY: -100,
            offsetX: -10,
            delay: 0,
            position: 'bottom',
            updateAnimation: false,
            functionBefore: function(origin, continueTooltip) {
                $('.js-tooltipster-button').not($button).tooltipster('hide');
                $button.one('click', hideTooltipster);
                continueTooltip();
            },
            functionReady: function(origin, tooltip) {
                var $shell = tooltip.find('.tooltipster-content');
                $shell.contents().remove();
                $shell.append(self.$());
                tooltip.appendTo('body .scope-container');
                tooltip.css('visibility', 'hidden');
                Ember.run.scheduleOnce('afterRender', this, function() {
                    $(window).trigger('scroll');
                    tooltip.css('visibility', 'visible');
                });
                
            },
            functionAfter: function(origin, tooltip) {
                $button.off('click', hideTooltipster);
            },
            content: this.$()
        };

        $button.tooltipster(tooltipOptions);
    },
    afterRenderEvent: function() {
        if (this.get('buttonClass')) {
            this.initializeToolTipstser();
        }
        this.customInitializer();
    },
    click: function(e) {
        var $button = this.get('$button');
        e.stopPropagation();

        if ($(e.target).closest('[data-dismiss="modal"]').length > 0) {
            $button.tooltipster('hide');
        }
    }
});

App.FeedbackComponent = App.ToolTipsterComponent.extend({
    attributeBindings: ['data', 'ctrl'],
    disposition: function() {
        return this.get('ctrl.disposition');
    }.property(),
    chooseLike: function(){
        return this.get('Positive_Feedback__c') == 1
    }.property('Positive_Feedback__c'),
    chooseDislike: function(){
        return this.get('Negative_Feedback__c') == 1
    }.property('Negative_Feedback__c'),
    chooseUnknown: function(){
        return this.get('Neutral__c') == 1
    }.property('Neutral__c'),
    chooseDisqualified: function(){
        return this.get('Rejected__c');
    }.property('Rejected__c'),
    chooseSelected: function(){
        return this.get('Selected__c');
    }.property('Selected__c'),
    interviews: function() {
        return this.get('ctrl.interviews');
    }.property('ctrl'),
    additionalCriteriaFields: function() {
        return this.get('ctrl.additionalCriteriaFields').map(function(field) {
            return Ember.Object.create(field);
        });
    }.property('ctrl'),
    regardingSelectValues: function() {
        return this.get('ctrl.regardingSelectValues');
    }.property('ctrl'),
    allowNeutral: function() {
        return initData.allowNeutral;
    }.property(),
    allowRejection: function() {
        return initData.allowRejection;
    }.property(),
    isResumeReview : function(){
        if(!Ember.isEmpty(this.get('selectedType'))){
            return this.get('selectedType').split('|')[1] == labels.miscellaneous;
        }

        return false;
    }.property('selectedType'),
    selectedFinalOutcome : function(){
        this.set('Rejected__c', false)
        
        if(!Ember.isEmpty(this.get('selectedType'))){
            return this.get('selectedType').split('|')[1] == labels.finalSelection;
        }

        return false;
    }.property('selectedType'),
    setType : function(){
        if(!Ember.isEmpty(this.get('selectedType'))){
            //reset all the errorstates and selected choices
            this.set('feedbackError', false);
            var additionalCriteriaFields = this.get('additionalCriteriaFields');
            additionalCriteriaFields.forEach(function(field){
                field.set('isEmpty', false);
                field.set('selectedValue', null);
            });

            this.setProperties({
                Positive_Feedback__c : 0,
                Negative_Feedback__c : 0,
                Neutral__c : 0,
                Selected__c : false,
                Rejected__c : false
            });

            selectedType = this.get('selectedType').split('|');
            this.set('interviewText', this.get('ctrl.interviewers')[selectedType[0]]);
            this.set('Interview__c', selectedType[0] == "null" ? null : selectedType[0]);
            this.set('feedbackType', selectedType[1]);
            this.set('feedbackScoreIsEmpty', false);
        }
    }.observes('selectedType'),
    /*customInitializer: function() {
        var self = this;
        var $button = this.get('$button');

        $button.on('click', function(e) {
            var additionalCriteriaFields = self.get('additionalCriteriaFields');
            additionalCriteriaFields.forEach(function(field){
                field.set('isEmpty', false);
            });

            self.set('feedbackScoreIsEmpty', false); 
        });
            
    },*/
    showDisposition: function(){
        return this.get('Rejected__c');
    }.property('Rejected__c'),
    actions: {
        clickSave: function() {
            var self = this;
            var ctrl = this.get('ctrl');
            var feedbackType = this.get('feedbackType');
            this.setProperties({
                feedbackScoreIsEmpty: false,
                isSavingFeedback: true
            });
            
            var newEvaluation = {
                Application_Lookup__c: this.get('ctrl.application.Id'),
                RecordTypeId: this.get('isResumeReview') === true ? ctrl.get('miscRTId') : ctrl.get('interviewRTId'),
                Comments__c: this.get('comments'),
                Interview__c: this.get('Interview__c'),
                Negative_Feedback__c: this.get('Negative_Feedback__c'),
                Positive_Feedback__c: this.get('Positive_Feedback__c'),
                Neutral__c : this.get('Neutral__c'),
                Selected__c : this.get('Selected__c'),
                Rejected__c : this.get('Rejected__c'),
                Disposition__c: this.get('selectedDisposition')
            };
            var somethingIsEmpty = false;

            if(feedbackType === 'Interview'){
                this.get('additionalCriteriaFields').forEach(function(field){
                    field.set('isEmpty', false);
                    
                    if(Ember.isEmpty(field.selectedValue)){
                        somethingIsEmpty = true;
                        field.set('isEmpty', true);
                    }

                    newEvaluation[field.name] = field.get('selectedValue');
                });

                if (somethingIsEmpty === false) {
                    if (this.get('Negative_Feedback__c') + this.get('Positive_Feedback__c') + this.get('Neutral__c') === 0) {
                        somethingIsEmpty = true;
                        this.set('feedbackScoreIsEmpty', true);
                    }

                }
            } else if (feedbackType === 'Resume Review') {
                if (somethingIsEmpty === false) {
                    if (this.get('Negative_Feedback__c') + this.get('Positive_Feedback__c') + this.get('Neutral__c') === 0) {
                        somethingIsEmpty = true;
                        this.set('feedbackScoreIsEmpty', true);
                    }
                }
            } else if (feedbackType === 'Final Selection') {
                if (somethingIsEmpty === false) {
                    if ((!this.get('Selected__c') && this.get('allowRejection') === true && !this.get('Rejected__c'))
                                            || (this.get('allowRejection') === false && !this.get('Selected__c'))) {
                        somethingIsEmpty = true;
                        this.set('feedbackScoreIsEmpty', true);
                    }                
                }
            }

            if (!somethingIsEmpty) {
                cont.saveEvaluation(JSON.stringify(newEvaluation), function(res, evt) {
                    if (res) {
                        res = parseResult(res);

                        if (res.isSuccess) {
                            var newEval = res.data.evaluation;

                            if (!Ember.isNone(newEval.Interview__r)) {
                                newEval.Interview__r.camelizedModel = App.camelizeObj(newEval.Interview__r);

                                // Update view's interview feedback values
                                if(newEval.Positive_Feedback__c != 0){
                                    ctrl.incrementProperty('positiveFeedback');
                                } else if(newEval.Negative_Feedback__c != 0){
                                    ctrl.incrementProperty('negativeFeedback');
                                } else {
                                    ctrl.incrementProperty('neutralFeedback');
                                }
                            }

                            if (Ember.isNone(ctrl.get('evaluations'))) {
                                ctrl.set('evaluations', []);
                            }

                            ctrl.get('evaluations').unshiftObject(newEval);
                            self.resetFeedbackValues();

                            // If in applicant review and sort type is relavent to resume/interview, update the results.
                            var viewApplicantsController = ctrl.get('controllers');

                            if (!Ember.isEmpty(viewApplicantsController.needs)) {
                                viewApplicantsController = ctrl.get('controllers.viewApplicants');
                                var sortType = viewApplicantsController.get('sortType');

                                if ((sortType === 'Feedback_Score__c' && Ember.isNone(newEval.Interview__r))
                                        || (sortType === 'Interview_Score__c' && !Ember.isNone(newEval.Interview__r))) {
                                    viewApplicantsController.notifyPropertyChange('sortType');
                                }
                            }

                            if (self.get('isInline') === true) {
                                $('.js-feedback-card').slideUp();
                                self.get('ctrl').set('isInlineFeedbackVisible', false);
                            } else if (self.get('isModal') === true){
                                $('#feedback-modal').modal('hide');
                            } else {
                                self.get('$button').tooltipster('hide');
                            }

                            self.set('isSavingFeedback', false);
                        } else {
                            console.log(res);
                            self.set('isSavingFeedback', false);
                            // ERROR
                        }
                    } else {
                        self.set('isSavingFeedback', false);
                        //ERROR 
                    }
                });
            } else {
                this.set('isSavingFeedback', false);
            }
        },
        clickCancel: function() {
            if (this.get('isInline') === true) {
                $('.js-feedback-card').slideUp();
                this.get('ctrl').set('isInlineFeedbackVisible', false);
            }

            this.resetFeedbackValues();
        },
        clickSelectFeedback : function(choice){
            if(this.get(choice) == 1){
                this.set('hasFeedback', false);
                this.set(choice, (choice == 'Rejected__c' || choice == 'Selected__c')? false : 0);
                this.set('Disposition__c', null);
            } else {
                this.set('hasFeedback', true);
                var choices = {
                    Positive_Feedback__c : 0,
                    Negative_Feedback__c : 0,
                    Neutral__c : 0,
                    Selected__c : false,
                    Rejected__c : false
                }

                if(choice == 'Rejected__c' || choice == 'Selected__c'){
                    choices[choice] = true;
                } else {
                    choices[choice] = 1;
                    this.set('Disposition__c', null);
                }

                this.setProperties(choices);
            }
        }
    },
    resetFeedbackValues: function() {
        var initState = {
            Positive_Feedback__c : 0,
            Negative_Feedback__c : 0,
            Neutral__c : 0,
            Selected__c : false,
            Rejected__c : false,
            selectedType: this.get('regardingSelectValues')[0].value,
            selectedDisposition: null,
            comments: null,
            feedbackScoreIsEmpty: false
        };

        this.get('additionalCriteriaFields').setEach('selectedValue', null);
        this.get('additionalCriteriaFields').setEach('isEmpty', null);

        this.setProperties(initState);
    }
});

App.ProvideFeedbackComponent = App.FeedbackComponent.extend({
    layoutName: 'components/provideFeedback',
});

App.ProvideFeedbackModalComponent = App.FeedbackComponent.extend({
    isModal: true,
    layoutName: 'components/provideFeedbackModal',
});

App.ProvideFeedbackInlineComponent = App.FeedbackComponent.extend({
    isInline: true,
    layoutName: 'components/provideFeedbackInline',
});

App.UpdateStatusComponent = App.ToolTipsterComponent.extend({
    attributeBindings: ['data', 'ctrl'],
    layoutName: 'components/updateStatus',
    applicationStages: function() {
        return Object.keys(this.get('ctrl.applicationStageAndStatuses')).reject(function(status) { return status === labels.any; });
    }.property(),
    applicationStatuses: function() {
        var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
        return statuses;
    }.property('stage'),
    stageChanged: function() {
        var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
        this.set('status', statuses[0]);
    }.observes('stage'),
    customInitializer: function() {
        var self = this;
        var $button = this.get('$button');
        var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
        var resetModal = function(){
            var currentStage = self.get('ctrl.application.Stage__c');
            var currentStatus = self.get('ctrl.application.Status__c');
            if (!Ember.isNone(currentStage)) {
                self.set('stage', currentStage);
            }

            if (!Ember.isNone(statuses)) {
                self.set('status', !Ember.isNone(currentStatus) ? currentStatus : statuses[0]);
            }
        }
        if(self.get('isModal')){
            $('.updateStatus').on('click', resetModal);
        } else {
            $button.on('click', resetModal);
        }
    },
    actions: {
        clickUpdateStatus: function() {
            var self = this;
            var ctrl = this.get('ctrl');
            var appId = this.get('ctrl.application.Id');
            var bulkUpdateObj = {
                stage: this.get('stage'),
                status: this.get('status'),
                appIds: [appId]
            };
            
            cont.bulkUpdateStatus(JSON.stringify(bulkUpdateObj), function(res, evt) {
                if (res) {
                    res = parseResult(res);

                    if (res.isSuccess) {
                        // UPDATE STORED APPS' STAGE AND STATUS
                        var savedApp = App.Fixtures.get('savedApplications').findBy('application.Id', appId);
                        var previousStage = savedApp.get('application.Stage__c');
                        var previousStageCount = initData.stageCounts.findBy('name', previousStage);
                        var newStageCount = initData.stageCounts.findBy('name', bulkUpdateObj.stage);

                        savedApp.set('application.Stage__c', bulkUpdateObj.stage);
                        savedApp.set('application.Status__c', bulkUpdateObj.status);

                        ctrl.set('application.Stage__c', bulkUpdateObj.stage);
                        ctrl.set('application.Status__c', bulkUpdateObj.status);

                        previousStageCount.total--;

                        if (Ember.isNone(newStageCount)) {
                            initData.stageCounts.addObject({
                                name: bulkUpdateObj.stage,
                                total: 1
                            });
                        } else {
                            newStageCount.total++;
                        }

                        var viewApplicantsController = ctrl.get('controllers');

                        if (!Ember.isEmpty(viewApplicantsController.needs)) {
                            viewApplicantsController = ctrl.get('controllers.viewApplicants');

                            var newHeaderData = {};
                            App.formatHeaderNumbers(newHeaderData, initData);
                            var appInResults = viewApplicantsController.get('results.viewableApplications').findBy('Id', appId);
                            var appInResultsIndex = viewApplicantsController.get('results.viewableApplications').indexOf(appInResults);
                            viewApplicantsController.set('indexToGoto', appInResultsIndex);
                            viewApplicantsController.set('applicantId', null);
                            viewApplicantsController.set('totalApplicants', newHeaderData.totalApplicants);
                            viewApplicantsController.notifyPropertyChange('sortType');
                        }

                    } else {
                        // ERROR
                    }
                } else {
                    // ERROR
                }
            });
        }
    }
});

App.UpdateStatusModalComponent = App.UpdateStatusComponent.extend({
    isModal : true,
    layoutName: 'components/updateStatusModal'
});

App.BackToTopComponent = Ember.Component.extend({
    layoutName: 'components/backToTop',
    afterRenderEvent: function() {
        var backToTop = $('#back-to-top'),
            contentContainer = $('body .slds .js-profile-panel');
        
        function setPos() {
            var topPos = $(window).height() - ($(window).height() / 6),
                leftPos = contentContainer.offset().left + (contentContainer.width());
                
                backToTop.css('top', (topPos - 50) + 'px')
                    .css('left', (leftPos + 1) + 'px');
        }
        
        setPos();
        
        $(window).resize(setPos);
        
        $(window).scroll(function() {
            if ($(window).scrollTop() > $(window).height()) {
                backToTop.fadeIn(250);
            } else {
                backToTop.fadeOut(250);
            }
        });
        
        backToTop.click(function() {
            $('body, html').animate({
                scrollTop: 0
            }, 500);
            
            return false;
        });
    }
});