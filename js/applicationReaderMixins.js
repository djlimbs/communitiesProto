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
        var hasCriteria = this.get('hasCriteria');
        var hasComments = !Ember.isEmpty(this.get('Comments__c'));
        var hasDisposition = !Ember.isEmpty(this.get('Disposition__c'))
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

        url = '/apex/linkedinframe?linkId=' + app.namespace_LinkedIn_Link_Id__c + '&firstName=' 
               + app.First_Name__c + '&lastName=' + app.Last_Name__c + '&email=' + app.Email__c 
               + '&appId=' + app.Id 

        if(app.namespace_Talent_Profile__c){
            //ie9 has no origin
            var badgeUrl = "https://" + window.location.host + '/' +  app.namespace_Talent_Profile__c;

            url += '&tpId=' + app.namespace_Talent_Profile__c + '&url=' + encodeURIComponent(badgeUrl);

            if(app.namespace_Talent_Profile__r){
                if(app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Location__c){
                    url += '&location=' + app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Location__c
                }

                if(app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Company_Name__c){
                    url += '&companyName=' + app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Company_Name__c;
                }

                if(app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Title__c){
                    url += '&title=' + app.namespace_Talent_Profile__r.namespace_LinkedIn_Badge_Title__c;
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
        openResumeUrl : function(){
            var downloadUrl = '';

            if(Ember.isEmpty(this.get('resume').RelatedRecordId)){
                downloadUrl = this.get('resume').LinkUrl;
            } else {
                downloadUrl = '/' + this.get('resume').RelatedRecordId;
            }

            if(isSF1){
                sforce.one.navigateToFeedItemDetail(this.get('resume').Id);
            } else {
                window.open(downloadUrl, '_blank');
            }
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
            },
            functionAfter: function(origin, tooltip) {
                $button.off('click', hideTooltipster);
            },
            content: this.$()
        };

        $button.tooltipster(tooltipOptions);
    },
    afterRenderEvent: function() {
        this.initializeToolTipstser();
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
            this.set('RecordTypeId', selectedType[1] == 'Interview' ? this.get('interviewRTId') : this.get('miscRTId')); 
        }
    }.observes('selectedType'),
    showDisposition: function(){
        return this.get('Rejected__c');
    }.property('Rejected__c'),
    actions: {
        clickSave: function() {
            var self = this;
            var ctrl = this.get('ctrl');
            
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

            if(this.get('feedbackType') == 'Interview'){
                this.get('additionalCriteriaFields').forEach(function(field){
                    field.set('isEmpty', false);
                    
                    if(Ember.isEmpty(field.selectedValue)){
                        somethingIsEmpty = true;
                        field.set('isEmpty', true);
                    }

                    newEvaluation[field.name] = field.get('selectedValue');
                });
            }

            if (!somethingIsEmpty) {
                cont.saveEvaluation(JSON.stringify(newEvaluation), function(res, evt) {
                    if (res) {
                        res = parseResult(res);

                        if (res.isSuccess) {
                            var newEval = res.data.evaluation[0];
                            if (!Ember.isNone(newEval.Interview__r)) {
                                newEval.Interview__r.camelizedModel = camelizeObj(newEval.Interview__r);
                            }
                            ctrl.get('evaluations').unshiftObject(newEval);
                            self.resetFeedbackValues();
                            if (self.get('isInline') === true) {
                                $('.js-feedback-card').slideUp();
                                self.get('ctrl').set('isInlineFeedbackVisible', false);
                            }
                        } else {
                            console.log(res);
                            // ERROR
                        }
                    } else {
                        //ERROR 
                    }
                });
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
            comments: null
        };

        this.get('additionalCriteriaFields').setEach('selectedValue', null);
        this.setProperties(initState);
    }
});

App.ProvideFeedbackComponent = App.FeedbackComponent.extend({
    layoutName: 'components/provideFeedback',
});

App.ProvideFeedbackInlineComponent = App.FeedbackComponent.extend({
    isInline: true,
    layoutName: 'components/provideFeedbackInline',
});