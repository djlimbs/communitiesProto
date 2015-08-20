App = Ember.Application.create({
    rootElement: '#application'
});

App.Router.map(function(){
    this.resource('main', {path: '/'});
});

var searchTimer = null;
var monthMap = {}

var outcomeColorMap = {
    'Hired' : 'label--success',
    'Withdrew' : 'label--warning',
    'Rejected' : 'label--error'
}

App.ApplicationReaderView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            // iPhone CSS mod to handle scrolling with the containing div insted of the iframe
            // When Mobile Safari fixes how it resizes iframes to content, this can go away.
            if (isSF1) {
                $('#mobileMainView').css({
                    'max-height' : window.innerHeight,
                    'overflow-y' : 'scroll',
                    '-webkit-overflow-scrolling' : 'touch'
                });
            }
            //javascript snippet to make the go to top button
            $(document).ready(function() {
                var backToTop = $('#back-to-top'),
                    contentContainer = $('body .scope-container > .content');
                
                function setPos() {
                    var topPos = $(window).height() - ($(window).height() / 6),
                        leftPos = contentContainer.offset().left + (contentContainer.width());
                        
                        backToTop.css('top', topPos + 'px')
                            .css('left', leftPos + 'px');
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
            });
        });
    }
});

Ember.Application.initializer({
    name: 'ember-select-with-nullprompt',

    initialize: function(container, application) {
        Ember.Select.reopen({
            didInsertElement: function () {
                if (this.prompt) {
                    this.$('option:first').attr('disabled', true);
                }
            }
        });
    }
});

App.ApplicationReaderRoute = Ember.Route.extend({
    model: function (){
        monthMap = parsedJson.monthMap;
        parsedJson.labels = labels
        parsedJson.talentProfile.labels = labels
        parsedJson.application.formattedCreatedDate = moment(parsedJson.application.CreatedDate).format('MMM DD, YYYY')
        var jobQuestions = Ember.A();
        var generalQuestions = Ember.A();

        if(Ember.isEmpty(parsedJson.photoUrl)){
            parsedJson.photoUrl = defaultIconUrl;
        }

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
            contactRow.push(f);
        });

        contactRows.push(contactRow);
        parsedJson.contactRows = contactRows;

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

        //if we have questions split them up into jobQuestions and generalQuestions
        if(parsedJson.application.Applicant_Responses__r && parsedJson.application.Applicant_Responses__r.records){
            parsedJson.application.Applicant_Responses__r.records.forEach(function(resp){
                //if we have any previous found checkbox repsonses we need to group them up.
                if(!Ember.isEmpty(jobQuestions.findBy('Form_Element__c', resp.Form_Element__c))){   //this if is checking for jobQuestion checkboxes
                   var foundResp =  jobQuestions.findBy('Form_Element__c', resp.Form_Element__c);
                   foundResp.Value__c += ', ' + resp.Value__c
                } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){  //this if is checking for generalQuestions checkboxes
                   var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
                   foundResp.Value__c += ', ' + resp.Value__c
                } else {
                    if(resp.Form_Element__r.Section__c == 'Job Specific'){
                        jobQuestions.addObject(Ember.Object.create(resp));
                    } else if(resp.Form_Element__r.Section__c == 'General'){
                        generalQuestions.addObject(Ember.Object.create(resp));
                    }
                }
            });
        }

        if(parsedJson.application.Evaluation_Lookups__r && parsedJson.application.Evaluation_Lookups__r.records){
            parsedJson.evaluations = parsedJson.application.Evaluation_Lookups__r.records
        }

        parsedJson.application.showMax = parsedJson.scoreSort == 'Raw_Score__c' //if the scoring type isn't the default Raw_Score don't show the maximum
        parsedJson.application.score = parsedJson.application[parsedJson.scoreSort];

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

        test = Ember.Object.create(parsedJson)
        return test;
    }
});

App.InterviewController = Ember.ObjectController.extend({
    feedbackStatus : function(){
        var feedbackStatus = 'None';
        var hasPartial = false;
        var hasAll = true
        var evaluations = this.get('parentController').get('evaluations');
        if(!Ember.isEmpty(evaluations)){
            for(var i = 1; i < 11; i++){
                var field = 'User' + i + '__c';
                var userId = this.get(field);

                if(Ember.isEmpty(userId)){
                    break;
                }

                var evaluation = evaluations.filterBy('Interview__c', this.get('Id')).findBy('CreatedById', userId)

                if(Ember.isEmpty(evaluation)){
                    hasAll = false;
                } else {
                    hasPartial = true;
                }
            }
        } else {
            hasAll = false;
        }

        if(hasAll){
            feedbackStatus = 'All'
        } else if(hasPartial){
            feedbackStatus = 'Partial'
        }

        return feedbackStatus;
    }.property(),
    sortedTimeSlots : function(){
        var sortedTimeSlots = Ember.A();

        if(!Ember.isEmpty(this.get('namespace_Interview_Time_Slots__r')) && !Ember.isEmpty(this.get('namespace_Interview_Time_Slots__r').records)){
            var timeSlots = Ember.A(this.get('namespace_Interview_Time_Slots__r').records);
            var interviewStatus = this.get('namespace_Status__c');

            if(interviewStatus == 'Accepted' || interviewStatus == 'Completed'){
                sortedTimeSlots = timeSlots.filterBy('namespace_Status__c', 'Selected');
            } else {
                sortedTimeSlots = timeSlots.sortBy('namespace_Start_Time__c');  
            }
        }
        
        return sortedTimeSlots;
    }.property(''),
    formattedStartDate : function(){
        var sortedTimeSlots = this.get('sortedTimeSlots');
        var formattedStartDate = 'Date/time TBD';
        if(!Ember.isEmpty(sortedTimeSlots)){
            var formatString = 'ddd, MMM DD, YYYY @ h:mm A z';

            if(isSF1){
                formatString = 'ddd MMM DD @ h:mm A';
            }
            var dateString = moment(sortedTimeSlots[0].namespace_Start_Time__c).tz(this.get('parentController').get('timeZone')).format(formatString);

            if(isSF1){
                dateString = dateString.replace('AM', 'A').replace('PM', 'P');
            }

            return dateString
        }

        return formattedStartDate;

    }.property(''),
    otherText : function(){
        var sortedTimeSlots = this.get('sortedTimeSlots');
        var otherText = ''

        if(!Ember.isEmpty(sortedTimeSlots)){
            var totalTimeSlots = sortedTimeSlots.length;

            if(totalTimeSlots > 1){
                return '(and ' + (totalTimeSlots - 1) + ' more)'
            }
        }

        return otherText;
    }.property(''),
    statusColor : function(){
        return this.get('namespace_Status__c').toLowerCase();
    }.property(''),
    isCompleted : function(){
        return this.get('namespace_Status__c').toLowerCase() == 'completed'
    }.property('')
});

App.FeedbackController = Ember.ObjectController.extend({
    headerText : function(){
        var headerText = '';
        if(this.get('hasFinal')){
            headerText = 'Final Selection'
        } else if(Ember.isEmpty(this.get('Interview__c'))){
            headerText = 'Resume Review'
        } else if(this.get('Interview__r').Topics__c){
            headerText = this.get('Interview__r').Topics__c;
        } else {
            headerText = this.get('Interview__r').Interviewers__c
        }

        return headerText;
    }.property(''),
    icon : function(){
        var icon = '';
        var feedback = this.get('Net_Feedback_Score__c');

        if(this.get('namespace_Rejected__c')){
            icon = 'juicon-ban'
        } else if(this.get('namespace_Selected__c')){
            icon = 'juicon-check'
        } else if(feedback == 1){
            icon = 'juicon-like'
        } else if (feedback == 0){
            icon = 'juicon-question-circle'
        } else if (feedback == -1){
            icon = 'juicon-dislike'
        }

        return icon
    }.property(''),
    iconColor : function(){
        var iconColor = '';
        var feedback = this.get('Net_Feedback_Score__c');
        if(this.get('namespace_Rejected__c')){
            iconColor = 'text-error'
        } else if(feedback == 1 || this.get('namespace_Selected__c')){
            iconColor = 'text-success'
        } else if (feedback == 0){
            iconColor = 'text-info'
        } else if (feedback == -1){
            iconColor = 'text-warning';
        }

        return iconColor;
    }.property(''),
    hasFinal : function(){
        return (this.get('namespace_Rejected__c') || this.get('namespace_Selected__c'))
    }.property(''),
    criteriaFields : function(){
        var self = this;
        var processedFields = Ember.A();
        var criteriaFields = this.get('parentController').get('additionalCriteriaFields');
        //var hasCriteria = false; //if every criterifield is empty we have no criterias

        if(!Ember.isEmpty(criteriaFields)){
            criteriaFields.forEach(function(field){
                var obj = {}
                obj.label = field.label
                obj.value = self.get(field.name);
                if(!Ember.isEmpty(obj.value)){
                    //hasCriteria = true;
                }
                processedFields.addObject(obj);
            });
        }

        //this.set('hasCriteria', hasCriteria)
        return processedFields;
    }.property(''),
    formattedDate : function(){
        return moment(this.get('CreatedDate')).format('MMM DD, YYYY')
    }.property(''),
    displayPanelBottom : function(){
        var hasCriteria = this.get('hasCriteria');
        var hasComments = !Ember.isEmpty(this.get('Comments__c'));
        var hasDisposition = !Ember.isEmpty(this.get('namespace_Disposition__c'))
        return (hasCriteria || hasComments || hasDisposition)
    }.property('')
});

App.ApplicationReaderController = Ember.ObjectController.extend({
    statusText : function(){
        var offerStage = this.get('offerStage');
        var application = this.get('application');
        var statusText = application.Stage__c;
        
        if(Ember.isEmpty(application.Outcome__c)){
            if(statusText == offerStage){
                if(!Ember.isEmpty(application.Job_Offer_Lookups__r)){
                    statusText += ' (' + application.Job_Offer_Lookups__r.records[0].Status__c + ')';
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
    }.property(),
    hasOutcome : function(){
        return !Ember.isEmpty(this.get('application').Outcome__c)
    }.property(),
    hasAddress : function(){
        return (!Ember.isEmpty(this.get('application').City__c) && !Ember.isEmpty(this.get('application').State_Province__c))
    }.property(),
    hasProfile : function(){
        return !Ember.isEmpty(this.get('application').LinkedIn_Profile_Id__c);
    }.property(),
    outcomeColor : function(){
        return outcomeColorMap[this.get('application').get('Outcome__c')];
    }.property(),
    employmentText : function(){
        var app = this.get('application');
        var employmentHistory = labels.cardNoEmployment;

        if(app.Source__c == 'Internal'){
            employmentHistory = !Ember.isEmpty(app.Candidate_User__r) ? app.Candidate_User__r.Title : '';
        } else if(!Ember.isEmpty(app.Employment_Histories__r)){
            var employmentHistory = app.Employment_Histories__r.records[0];
            employmentHistory = employmentHistory.Job_Title__c  + ' at ' + employmentHistory.Name;
        }

        return employmentHistory;
    }.property(),
    linkedInLinkText : function(){
        var linkText = labels.cardSearch

        if(this.get('hasProfile')){
            linkText = labels.cardProfile;;
        }

        return linkText;
    }.property(),
    linkedInAddress : function(){
        var address = ''
        var app = this.get('application');

        if(this.get('hasProfile')){
            if (isSF1 && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                address = 'linkedin://#profile/' + app.LinkedIn_Profile_Id__c;
            } else {
                address = 'https://www.linkedin.com/profile/view?id=' + app.LinkedIn_Profile_Id__c;
            }
        } else {
            address = 'https://www.linkedin.com/pub/dir/?first=' + app.First_Name__c + '&last=' + app.Last_Name__c
        }

        return address;
    }.property(),
    statusSelect : function(){
        if(!this.get('firstTime')){
            this.set('selectedStatus', null);
        } else {
            this.set('firstTime', false);
        }

        return this.get('statusOptions')[this.get('selectedStage')];
    }.property('selectedStage'),
    actions : {
        navigation : function(link){
            link.replace('http://', '').replace('https://', '');
            if(isSF1){
                sforce.one.navigateToURL('http://' + link)
            } else {
                window.open('http://' + link);
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
            $('body').off('hide.jui.modal');
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
                      '&retUrl=/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        },
        addInterview : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewNewEdit?appId=' + this.get('application').Id + 
                      '&retUrl=/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id

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
        loadResume : function(){
            if(isSF1){
                sforce.one.navigateToObject
            } else {

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
                var address = 'https://www.google.com?#q=' + application.First_Name__c + ' ' + application.Last_Name__c + ' site://linkedin.com'
                if (isSF1){
                    sforce.one.navigateToURL(address);
                } else {
                    window.open(address, 'linkedIn');
                }
            } else {
                if (isSF1) {
                    var address = 'https://touch.www.linkedin.com/#profile/' + application.LinkedIn_Profile_Id__c;
                    if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
                        var now = new Date().valueOf();
                        setTimeout(function () {
                            if (new Date().valueOf() - now > 300) return;
                            sforce.one.navigateToURL(address);
                        }, 100);

                        sforce.one.navigateToURL('linkedin://#profile/' + application.LinkedIn_Profile_Id__c);
                    } else {
                        sforce.one.navigateToURL(address);
                    }
                } else {
                    var address = 'https://touch.www.linkedin.com/profile/view?id=' + application.LinkedIn_Profile_Id__c;
                    window.open(address, 'linkedIn');
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
        }
    }
});


Ember.Handlebars.helper('pluralfication', function(records, name) {
    if(records.length > 1){
        if(name.charAt(name.length - 1) == 'y'){
            return name.slice(0, name.length - 1) + 'ies';
        } else {
            return name + 's';
        }
    } else {
        return name;
    }
});

Ember.Handlebars.helper('convertNewLinesToBreaks', function(text, name) {
    if(text){
        return new Ember.Handlebars.SafeString(text.replace(/\n/g, '<br/>'));
    } else {
        return '';
    }
});

Ember.Handlebars.helper('formateDateWithPartition', function(date, secondPart, text) {
    if(Ember.isEmpty(date) && Ember.isEmpty(secondPart)){
        return '';
    } else if(Ember.isEmpty(date)){
        return secondPart;
    } else if(Ember.isEmpty(secondPart)){
        return moment(date).format('MMM DD, YYYY');
    } else {
        return moment(date).format('MMM DD, YYYY') + ' ' + text + ' ' + secondPart;
    }
});

Ember.Handlebars.helper('formatDate', function(date) {
    if(Ember.isEmpty(date)){
        return '';
    } else {
        return moment(date).format('MMM DD, YYYY');
    }
});

Ember.Handlebars.helper('displayDate', function(startDate, endDate, text) {
    if(Ember.isEmpty(startDate)){
        return '';
    } else if(Ember.isEmpty(endDate)){
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' Present')
    } else {
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' ' + moment(endDate).format('MMM DD, YYYY'))
    }
});

Ember.Handlebars.helper('displayMonthYear', function(month, year) {
    if(Ember.isEmpty(month) || Ember.isEmpty(year)){
        return '';
    } else {
        formattedMonth = monthMap[month] ? monthMap[month].slice(0, 3) : '';
        return formattedMonth + ' ' + year;
    }
});

Ember.Handlebars.helper('displayMonthYearRange', function(startMonth, startYear, endMonth, endYear, text) {
    if(Ember.isEmpty(startMonth) || Ember.isEmpty(startYear)){
        return '';
    } else if(Ember.isEmpty(endMonth) || Ember.isEmpty(endYear)){
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        return (formattedStartMonth + ' ' + startYear + ' ' + text + ' Present');
    } else {
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        formattedEndMonth = monthMap[endMonth] ? monthMap[endMonth].slice(0, 3) : '';

        return formattedStartMonth + ' ' + startYear + ' ' + text + ' ' + formattedEndMonth + ' ' + endYear ;
    }
});

Ember.Handlebars.helper('formatSize', function(size) {
    var formattedSize = '';
    if(size >= 1000){
        formattedSize = '(' + Math.floor(size/1000) + 'K)';
    } else if (size >= 100000){
        formattedSize = '(' + Math.floor(size/100000) + 'M)';
    } else if (size > 0) {
        formattedSize = '(' + size + 'B)';
    }

    return formattedSize;
});

App.Router.map(function() {
    this.resource('applicationReader', { path: '/' });
});