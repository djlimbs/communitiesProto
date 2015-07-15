// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

function detectUrl(text) { // Create link HTML if a URL is recognized
    var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi,
        prefixRegex = /^((http|https|www|ftp):\/\/)/;
    return text.replace(urlRegex, function(url) {
        if (!prefixRegex.test(url)) {
            url = 'http://' + url;
        }
        return "<a href='" + url + "'>" + url + "</a>";
    })
}


function formatDateTime(timeSlots){
    var timeSlotsArray = [];

    timeSlots.forEach(function(timeSlot){
        var timeSlotsObj = {};
        timeSlotsObj.id = timeSlot.Id;

        startTime = timeSlot.namespace_Start_Time__c;
        endTime = timeSlot.namespace_End_Time__c;

        var startTimeZone = moment(startTime).zone(userTimeZone).format();
        var endTimeZone = moment(endTime).zone(userTimeZone).format();
        var timeZone = String(String(moment(endTime).zone(userTimeZone)._d).match(/\(([^)]+)\)/g)).slice(1,4);

        var fullStartTime = moment(startTimeZone).format('llll');
        var fullEndTime = moment(endTimeZone).format('llll');

        var formatedDate = fullStartTime.slice(11)[0] == ',' ? fullStartTime.slice(0, 17) : fullStartTime.slice(0, 16);
        var sHM = fullStartTime.split(' ')[4][1] == ':' ? fullStartTime.split(' ')[4].slice(0, 4) : fullStartTime.split(' ')[4].slice(0, 5);
        var fromAmPm = fullStartTime.split(' ')[5][0] == 'A' ? 'a' : 'p';

        // var eDMDY = fullEndTime.slice(11)[0] == ',' ? fullEndTime.slice(0, 17) : fullEndTime.slice(0, 16);
        var eHM = fullEndTime.split(' ')[4][1] == ':' ? fullEndTime.split(' ')[4].slice(0, 4) : fullEndTime.split(' ')[4].slice(0, 5);
        var toAmPm = fullEndTime.split(' ')[5][0] == 'A' ? 'a' : 'p';

        var formatedTime = sHM + '-' + eHM + toAmPm + ' ' + timeZone;
        timeSlotsObj.formatedDate = formatedDate;
        timeSlotsObj.formatedTime = formatedTime;
        
        timeSlotsObj.isAccepted = timeSlot.namespace_Status__c == 'Selected' ? true : false;
        timeSlotsObj.isPossible = timeSlot.namespace_Status__c == 'Possible' ? true : false;        
     
        timeSlotsArray.push(timeSlotsObj);
    });
    return timeSlotsArray;
}


App.DeleteModalView = Ember.View.extend({
    templateName: 'deleteModal',
    didInsertElement: function() {    
    }
});

App.CancelModalView = Ember.View.extend({
    templateName: 'cancelModal',
    didInsertElement: function() {    
    }
});

App.EditModalView = Ember.View.extend({
    templateName: 'editModal',
    didInsertElement: function() {    
    }
});


App.MainController = Ember.ObjectController.extend({
    isSF1: function(){
        return isSF1;
    }.property(),
    applicantObj: function(){
        return this.get('applicant');
    }.property('applicant'),
    interviewObj: function(){
        return this.get('interview');
    }.property('interview'),
    application: function(){
        return this.get('interviewObj.application');
    }.property('interviewObj'),
    location: function(){
        return this.get('interviewObj.location');
    }.property('interviewObj'),
    timeSlotsArray: function(){
        if (this.get('timeSlots')) {
          return this.get('timeSlots').sort();
        };
    }.property('timeSlots'),


    interviewStatusDraft: function(){
        return this.get('interview.status') == 'Draft' ? true : false;
    }.property('interview.namespace_Status__c'),
    interviewStatusProposed: function(){
        return this.get('interview.status') == 'Proposed' ? true : false;
    }.property('interview.namespace_Status__c'),
    interviewStatusCanceled: function(){
        return this.get('interview.status') == 'Canceled' ? true : false;
    }.property('interview.namespace_Status__c'),
    interviewStatusDeclined: function(){
        return this.get('interview.status') == 'Declined' ? true : false;
    }.property('interview.namespace_Status__c'),
    interviewStatusAccepted: function(){
        return this.get('interview.status') == 'Accepted' ? true : false;
    }.property('interview.namespace_Status__c'),
    interviewStatusCompleted: function(){
        return this.get('interview.status') == 'Completed' ? true : false;
    }.property('interview.namespace_Status__c'),

    hasDateAndTime: function(){
        if (this.get('timeSlotsArray')) {
            return this.get('timeSlotsArray').length != 0 ? true : false;
        };
    }.property('timeSlotsArray'),
    hasInterviewers: function(){
        if (this.get('interviewersArray')) {
            return this.get('interviewersArray').length != 0 ? true : false;
        };
    }.property('interviewersArray'),
    hasTopics: function(){
        if (this.get('topicsArray')) {
            return this.get('topicsArray').length != 0 ? true : false;
        };
    }.property('topicsArray'),

    interviewersArray: function(){
        if (this.get('interviewers')) {
            return this.get('interviewers').sortBy('name');
        };
    }.property('interviewers'),
    topicsArray: function(){
        if (this.get('topics')) {
            return this.get('topics').sort();
        };
    }.property('topics'),
    jobInformationObj: function(){
        return this.get('jobInformation');
    }.property('jobInformation'),
    talentProfileObj: function(){
        return this.get('talentProfile');
    }.property('talentProfile'),
   
    interviewGuidelines: '',
    plainInterviewGuidelines: function(){
        var stringsToReplace = this.get('interviewGuidelines').match(/<a([^>]*)>|<\/a>/g);
        
        var plainInterviewGuidelines = this.get('interviewGuidelines');
        if (plainInterviewGuidelines) {
            stringsToReplace.forEach(function(string){
                plainInterviewGuidelines = plainInterviewGuidelines.replace(string, '');
            });
        };

        return plainInterviewGuidelines;
    }.property('interviewGuidelines'),
    
    interviewGuidelinesContent: function(){
        if (!Ember.isEmpty(this.get('interview.interviewGuidelines'))) {
            var formatedInterviewGuidelines = detectUrl(this.get('interview.interviewGuidelines'));
            this.set('interviewGuidelines', formatedInterviewGuidelines);           
        };
    }.observes('interview.interviewGuidelines'),

    feedbackArray: function(){
        return this.get('feedback');
    }.property('feedback'),
    actions:{
        clickDelete: function(){
            var self = this;

            $('#deleteModal').modal({
                show: true,
            });

            $('#modalDelete').click(function() {
                var interviewId = self.get('interview').id;
                cont.deleteInterview(interviewId, function(result, resultObj){});

                $('#modalDelete').unbind('click');
                window.location.href = window.location.origin + '/' + self.get('interviewObj').application.id;
            });
        },
        clickCancel: function(){
            var self = this;

            $('#cancelModal').modal({
                show: true,
            });

            $('#modalYes').click(function() {
                var interviewId = self.get('interview').id;
                cont.cancelInterview(interviewId, function(result, resultObj){});

                $('#modalYes').unbind('click');
                window.location.reload();
            });
        },
        clickEdit: function(){
            window.location.href = window.location.origin + '/apex/to_interviewNewEdit?id=' + this.get('interview.id') + "&retURL=" + encodeURIComponent(window.location.href);
        },
        clickEditInterviewGuidelines: function(){
            var self = this;

            $('#editModal').modal({
                show: true,
            });

            $('#saveEdit').click(function() {
                $('#saveEdit').unbind('click');

                var interviewGuidelinesString = $('#textareaEdit').val();
                
                var formatedInterviewGuidelines = detectUrl(interviewGuidelinesString);
                self.set('interviewGuidelines', formatedInterviewGuidelines);           

                var interviewGuidelinesObj = {
                    interviewId: self.get('interview.id'),
                    interviewGuidelines: interviewGuidelinesString
                };
                // $("#interviewGuidelinesLink").attr("href", self.get('interviewGuidelinesLink'));

                cont.saveInterviewGuidelines(JSON.stringify(interviewGuidelinesObj), function(result, resultObj){
                });
            });
           
        },

        viewMap: function(){
            var interviewObj = this.get('interviewObj');
            var streetAddress = interviewObj.location.streetAddress.split(' ').join('+');

            var interviewLocation = 'https://www.google.com/maps/place/' + streetAddress + ',' + interviewObj.location.city + ',' + 
                                    interviewObj.location.stateProvince + ',' + interviewObj.location.zipPostalCode +
                                    '/@' + interviewObj.location.geographicalLocation.latitude + ',' + interviewObj.location.geographicalLocation.longitude;

            var win = window.open(interviewLocation, '_blank');
            win.focus();
        },
        provideFeedback: function(){
            window.location.href = window.location.origin + '/' + 'apex/to_interviewFeedback?id=' + this.get('application.id') + '&interviewId=' + this.get('interview.id');
        }
    } 
});

App.MainRoute = Ember.Route.extend({
    model: function (){

        var interview = parsedInterviewViewMap.interview;
        var interviewObj = {
            id: interview.Id,
            name: interview.Name,
            applicantComment: interview.namespace_Applicant_Comment__c,
            status: interview.namespace_Status__c,
            application: {
                id: interview.Application__r.Id,
                name: interview.Application__r.Name,
                contact: {
                    id: interview.Application__r.Id,
                    name: interview.Application__r.Name,
                },
            },
            location: {
                isInPerson: interview.namespace_Location_Type__c == 'In person' ? true : false,
                type: interview.namespace_Location_Type__c,
                name: interview.namespace_Location_Name__c,
                streetAddress: interview.namespace_Street_Address__c,
                city: interview.namespace_City__c,
                stateProvince: interview.namespace_State_Province__c,
                zipPostalCode: interview.namespace_Zip_Postal_Code__c,
                countryRegion: interview.namespace_Country_Region__c,
                geographicalLocation: {
                    latitude: !Ember.isEmpty(interview.namespace_Geographical_Location__c) ? interview.namespace_Geographical_Location__c.latitude : '',
                    longitude: !Ember.isEmpty(interview.namespace_Geographical_Location__c) ? interview.namespace_Geographical_Location__c.longitude : '',
                },
            },
            interviewGuidelines: interview.namespace_Interview_Guidelines__c,
            logisticalDetails: interview.namespace_Logistical_Details__c,

        };

        var timeSlots;
        if(!Ember.isEmpty(interview.namespace_Interview_Time_Slots__r)){
            timeSlots = formatDateTime(interview.namespace_Interview_Time_Slots__r.records);
        };

        var interviewers = Ember.A();
        var topics = Ember.A();

        if(!Ember.isEmpty(interview)){
            for(var i = 1; i < 11; i++){
                if(!Ember.isEmpty(interview['User' + i + '__c'])){
                    var user = interview['User' + i + '__c'];
                    var userR = interview['User' + i + '__r'];
                    interviewers.addObject(Ember.Object.create({
                        id: user,
                        name: userR.Name,
                        smallPhotoUrl: userR.SmallPhotoUrl
                    }));
                }

                if(!Ember.isEmpty(interview['Topic' + i + '__c'])){
                    var topic = interview['Topic' + i + '__c']
                    topics.addObject(topic);
                }
            }
        }

        var jobInformationObj;
        if(!Ember.isEmpty(parsedInterviewViewMap.jobPostingMap)){
            var jobInformation = parsedInterviewViewMap.jobPostingMap;
        
            jobInformationObj = {
                jobPosting: {
                    id: jobInformation.jobPosting.Id,
                    name: jobInformation.jobPosting.Name,
                    title: jobInformation.jobPosting.Job_Title__c,
                },
                hiringManager: {
                    id: jobInformation.hiringManager.Id,
                    name: jobInformation.hiringManager.Name,
                    smallPhotoUrl: jobInformation.hiringManager.SmallPhotoUrl,
                    title: jobInformation.hiringManager.Title,
                },
                recruiter: {
                    id: jobInformation.recruiter.Id,
                    name: jobInformation.recruiter.Name,
                    smallPhotoUrl: jobInformation.recruiter.SmallPhotoUrl,
                    title: jobInformation.recruiter.Title,
                },
            };
        };

        var applicantObj;
        if(!Ember.isEmpty(parsedInterviewViewMap.applicant)){
            applicantObj = parsedInterviewViewMap.applicant;
        };

        var talentProfileObj;
        if(!Ember.isEmpty(parsedInterviewViewMap.talentProfile)){
            talentProfileObj = parsedInterviewViewMap.talentProfile;
        };

        var feedbackArray = [];
        
        if(!Ember.isEmpty(parsedInterviewViewMap.feedbackMap)){
            var fieldSet = parsedInterviewViewMap.feedbackMap.fieldSet;
            var feedbacks = parsedInterviewViewMap.feedbackMap.feedbacks;

            var feedbackObj = {};

            feedbacks.forEach(function(aFeedback){
                feedbackObj = {
                    comments: aFeedback.Comments__c,
                    feedback: aFeedback.Feedback__c,
                    positiveFeedback: aFeedback.Positive_Feedback__c,
                    negativeFeedback: aFeedback.Negative_Feedback__c,
                    netScoreFeedback: aFeedback.Net_Feedback_Score__c,
                    isPositive: aFeedback.Net_Feedback_Score__c > 0 ? true : false,
                    isNeutral: aFeedback.Net_Feedback_Score__c == 0 ? true : false,
                    owner: {
                        id: aFeedback.Owner.Id,
                        name: aFeedback.Owner.Name,   
                    }
                };

                var fieldSetArray = [];
                fieldSet.forEach(function(field){
                    fieldSetArray.addObject({
                        label: field.label,
                        value: aFeedback[field.name]
                    });
                    feedbackObj.fieldSet = fieldSetArray;
                });
                
                feedbackArray.push(feedbackObj);
            });
        };


        return {
            interview: interviewObj,
            timeSlots: timeSlots,
            interviewers: interviewers,
            topics: topics,
            jobInformation: jobInformationObj,
            applicant: applicantObj,
            talentProfile: talentProfileObj,
            feedback: feedbackArray
        };
    }
});

// Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});
