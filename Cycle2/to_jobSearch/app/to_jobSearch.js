// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


App.JobSearchController = Ember.ObjectController.extend({

});


// Router
App.Router.map(function() {
    this.resource('jobSearch', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});