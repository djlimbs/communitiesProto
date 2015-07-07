// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.TimeSlotSelectorController = Ember.ObjectController.extend({
    needs: "main",
    timeZoneOffsetBinding: "controllers.main.timeZoneOffset",
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

App.MainRoute = Ember.Route.extend({
    model: function (){
        var pageData = rawPageData;
        
        return pageData;
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

