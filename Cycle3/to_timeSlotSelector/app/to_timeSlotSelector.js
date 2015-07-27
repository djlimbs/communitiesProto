// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.TimeSlotController = Ember.ObjectController.extend({
    needs: "timeSlotSelector",
    locationTimeZoneBinding: "controllers.timeSlotSelector.locationTimeZone",
    interviewIsInPersonBinding: "controllers.timeSlotSelector.interviewIsInPerson",

    date: function() {
        var date;
        if (this.get('interviewIsInPerson')) {
            date = moment(this.get('namespace_Start_Time__c')).tz(this.get('locationTimeZone')).format('ddd, MMM D, YYYY');
        } else {
            date = moment(this.get('namespace_Start_Time__c')).format('ddd, MMM D, YYYY');
        };
        return date;
    }.property('Start_Time__c'),
    startTime: function() {
        var startTime;
        if (this.get('interviewIsInPerson')) {
            startTime = moment(this.get('namespace_Start_Time__c')).tz(this.get('locationTimeZone')).format('h:mm A').replace(/(AM|PM)/, '$1');
        } else {
            startTime = moment(this.get('namespace_Start_Time__c')).format('h:mm A').replace(/(AM|PM)/, '$1');
        };
        return startTime;
    }.property('Start_Time__c'),
    endTime: function() {
        var endTime;
        if (this.get('interviewIsInPerson')) {
            endTime = moment(this.get('namespace_End_Time__c')).tz(this.get('locationTimeZone')).format('h:mm A').replace(/(AM|PM)/, '$1');
        } else {
            endTime = moment(this.get('namespace_End_Time__c')).format('h:mm A').replace(/(AM|PM)/, '$1');;
        };
        return endTime;
    }.property('End_Time__c'),
    timeZone: function() {
        var timeZone;
        if (this.get('interviewIsInPerson')) {
            timeZone = moment(this.get('namespace_End_Time__c')).tz(this.get('locationTimeZone')).format('z');
        } else {
            timeZone = moment(this.get('namespace_End_Time__c')).format('z');
        };
        return timeZone;
    }.property('End_Time__c')
});

App.TimeSlotSelectorController = Ember.ObjectController.extend({
    actions: {
        submit: function() {
            var self = this;
            
            // if (!Ember.isEmpty(self.get('comments'))) {
            //     cont.saveApplicantComment(self.get('interview.Id'), JSON.stringify(self.get('comments')), function(result, resultObj) {
            //         // TODO: read response
            //     });
            // };
            this.set('isSubmitting', true);

            // declining single selection
            // current state is accepted
            if (self.get('isAccepted')) {
                // comments required
                if (Ember.isEmpty(self.get('comments'))) {
                    self.set('validationError', true);
                    self.set('isSubmitting', false);
                } else {
                    self.set('validationError', false);
                    cont.declineTimeSlotsById([self.get('applicantChoice')] , self.get('interview.Id'), function(data) {
                        // TODO: read response
                        var parsedResult = parseResult(data);
                        
                        if (parsedResult.isSuccess) {
                            self.sendEmails();
                        } else {
                            console.log(parsedResult.errorMessages);
                        }
                    });
                }
            }
            else if (self.get('isProposed') && !self.get('disabled')) {
                // decline all proposed
                if (self.get('applicantChoice') == -1) {
                    // comments required
                    if (Ember.isEmpty(self.get('comments'))) {
                        self.set('validationError', true);
                    } else {
                        self.set('validationError', false);
                        
                        // get id list
                        var timeSlotIds = [];
                        self.get('timeSlots').forEach(function(timeSlot) {
                            timeSlotIds.push(timeSlot.Id);
                        });
                        
                        cont.declineTimeSlotsById(timeSlotIds, self.get('interview.Id'), function(data) {
                            // TODO: read response
                            var parsedResult = parseResult(data);
                            
                            if (parsedResult.isSuccess) {
                                window.location.reload();
                            } else {
                                console.log(parsedResult.errorMessages);
                            }
                        });
                    }
                }
                // accepting
                else {
                    cont.selectTimeSlotById(self.get('applicantChoice'), self.get('interview.Id'), function(data) {
                        // TODO: read response
                        var parsedResult = parseResult(data);
                        
                        if (parsedResult.isSuccess) {
                            self.sendEmails();
                        } else {
                            console.log(parsedResult.errorMessages);
                        }
                    });
                }
            }
        }
    },
    
    sendEmails: function() {
        var self = this;
        
        cont.sendEmails(self.get('interview.Id'), function(data) {
            var parsedResult = parseResult(data);
            
            if (parsedResult.isSuccess) {
                alert(parsedResult.data.message);
                window.location.reload();
            } else {
                console.log(parsedResult.errorMessages);
            }
        });
    },
    isSubmitting: false,
    locationTimeZone: function(){
        return this.get('interview.namespace_Location_Time_Zone__c');
    }.property('interview.namespace_Location_Time_Zone__c'),
    locationType: function(){
        return this.get('interview.namespace_Location_Type__c');
    }.property('interview.namespace_Location_Type__c'),
    interviewIsInPerson: function(){
        return this.get('interview.namespace_Location_Type__c') == 'In person' ? true : false;
    }.property('interview.namespace_Location_Type__c'),
    comments: function(){
        return this.get('interview.namespace_Applicant_Comment__c');
    }.property('interview.namespace_Applicant_Comment__c'),
    commentRequired: function() {
        return this.get('applicantChoice') == '-1' || this.get('interview.namespace_Status__c') == 'Accepted';
    }.property('applicantChoice', 'interview.namespace_Status__c'),
    disabled: function() {
        return Ember.isEmpty(this.get('applicantChoice')) ? 'disabled' : false;
    }.property('applicantChoice'),
    
    isAccepted: function() {
        return this.get('interview.namespace_Status__c') == 'Accepted';
    }.property('interview.namespace_Status__c'),
    isCanceled: function() {
        return this.get('interview.namespace_Status__c') == 'Canceled';
    }.property('interview.namespace_Status__c'),
    isDeclined: function() {
        return this.get('interview.namespace_Status__c') == 'Declined';
    }.property('interview.namespace_Status__c'),
    isProposed: function() {
        return this.get('interview.namespace_Status__c') == 'Proposed';
    }.property('interview.namespace_Status__c')
});

App.TimeSlotSelectorRoute = Ember.Route.extend({
    model: function (){
        pageData = rawPageData;
        
        return pageData;
    }
});

// Router
App.Router.map(function() {
    this.resource('timeSlotSelector', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

App.RadioButtonComponent = Ember.Component.extend({  
    tagName: 'input',
    attributeBindings: ['name', 'type', 'value', 'checked', 'data-qa-input'],
    type: 'radio',
    checked: function () {
        return this.get('value') == this.get('selection');
    }.property('value', 'selection'),
    click: function () {
        this.set('selection', this.get('value'));
    }
});