// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.TimeSlotController = Ember.ObjectController.extend({
    needs: "timeSlotSelector",
    timeZoneOffsetBinding: "controllers.timeSlotSelector.timeZoneOffset",
    date: function() {
        return moment(this.get('namespace_Start_Time__c')).zone(this.get('timeZoneOffset')).format('ddd, MMM DD, YYYY');
    }.property('Start_Time__c'),
    startTime: function() {
        return moment(this.get('namespace_Start_Time__c')).zone(this.get('timeZoneOffset')).format('hh:mma').replace(/(a|p)m/, '$1');
    }.property('Start_Time__c'),
    endTime: function() {
        return moment(this.get('namespace_End_Time__c')).zone(this.get('timeZoneOffset')).format('hh:mma').replace(/(a|p)m/, '$1');
    }.property('End_Time__c'),
    timeZone: function() {
        return moment(this.get('namespace_End_Time__c')).zone(this.get('timeZoneOffset'))._d.toString().match(/\(([a-zA-Z]{3})\)/)[1];
    }.property('End_Time__c')
});

App.TimeSlotSelectorController = Ember.ObjectController.extend({
    actions: {
        submit: function() {
            // declining single selection
            // current state is accepted
            if (this.get('isAccepted')) {
                // comments required
                if (Ember.isEmpty(this.get('comments'))) {
                    this.set('validationError', true);
                } else {
                    this.set('validationError', false);
                    cont.declineTimeSlotsById([this.get('applicantChoice')] , this.get('interview.Id'), function(data) {
                        // TODO: read response
                        
                        window.location.reload();
                    });
                }
            }
            else if (this.get('isProposed') && !this.get('disabled')) {
                // decline all proposed
                if (this.get('applicantChoice') == -1) {
                    // comments required
                    if (Ember.isEmpty(this.get('comments'))) {
                        this.set('validationError', true);
                    } else {
                        this.set('validationError', false);
                        
                        // get id list
                        var timeSlotIds = [];
                        for (i in this.get('timeSlots')) {
                            timeSlotIds.push(this.get('timeSlots')[i].Id);
                        }
                        
                        cont.declineTimeSlotsById(timeSlotIds, this.get('intervie.Id'), function(data) {
                            // TODO: read response
                            
                            window.location.reload();
                        });
                    }
                } else {
                    cont.selectTimeSlotById(this.get('applicantChoice'), this.get('interview.Id'), function(data) {
                        // TODO: read response
                        
                        window.location.reload();
                    });
                }
            }
        }
    },
    
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