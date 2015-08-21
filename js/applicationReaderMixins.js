App = Ember.Application.create({
    rootElement: '#application'
});

var outcomeColorMap = {
    'Hired' : 'label--success',
    'Withdrew' : 'label--warning',
    'Rejected' : 'label--error'
}

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
    }.property(),
    hasOutcome : function(){
        return !Ember.isEmpty(this.get('Outcome__c'))
    }.property(),
    outcomeColor : function(){
        return outcomeColorMap[this.get('Outcome__c')];
    }.property(),
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
    }.property()
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
    }.property(''),
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
    }.property(''),
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
    }.property(''),
    hasFinal : function(){
        return (this.get('Rejected__c') || this.get('Selected__c'))
    }.property(''),
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
    }.property(''),
    formattedDate : function(){
        return moment(this.get('CreatedDate')).format('MMM DD, YYYY')
    }.property(''),
    displayPanelBottom : function(){
        var hasCriteria = this.get('hasCriteria');
        var hasComments = !Ember.isEmpty(this.get('Comments__c'));
        var hasDisposition = !Ember.isEmpty(this.get('Disposition__c'))
        return (hasCriteria || hasComments || hasDisposition)
    }.property('')
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
    }.property(''),
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

    }.property(''),
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
    }.property(''),
    statusColor : function(){
        return this.get('Status__c').toLowerCase();
    }.property(''),
    isCompleted : function(){
        return this.get('Status__c').toLowerCase() == 'completed'
    }.property(''),
    isSF1 : function(){
        return isSF1
    }.property(''),
    interviewUrl : function(){
        return '/apex/' + extnamespace + 'to_interviewView?id=' + this.get('Id') + '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('parentController').get('application').Id)
    }.property('')
});

App.ApplicationReaderMixin = Ember.Mixin.create({
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
    hasResume : function(){
        return !Ember.isEmpty(this.get('resume'));
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
            employmentHistory = employmentHistory.Job_Title__c  + ' '  + labels.at + ' ' + employmentHistory.Name;
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
    statusSelect : function(){
        //we need to prevent this from happening on load because we don't want to null out the current status
        if(!this.get('firstTime')){
            this.set('selectedStatus', null);
        } else {
            this.set('firstTime', false);
        }

        return this.get('statusOptions')[this.get('selectedStage')];
    }.property('selectedStage'),
    otherAppsLength : function(){
        return this.get('otherApps').length;
    }.property(),
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
                      '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id)

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        },
        addInterview : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewNewEdit?appId=' + this.get('application').Id + 
                      '&retUrl=' + encodeURIComponent('/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id)

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
            if(!isSF1){
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