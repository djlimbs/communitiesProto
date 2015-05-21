// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


App.TalentProfileEditRoute = Ember.Route.extend({
    model: function (){
        
        return {};
    },
    afterModel: function() {
        this.transitionTo('viewAll');
    }
});

App.ViewAllRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('talentProfileEdit');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        this.controllerFor('talentProfileEdit').set('editSection', null);
        $('#identity').slideToggle('fast');
    }
});

App.SummaryEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('talentProfileEdit');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        this.controllerFor('talentProfileEdit').set('editSection', 'Summary');
        $('#identity').slideToggle('fast');
    }
});

// Router
App.Router.map(function() {
    this.resource('talentProfileEdit', { path: '/' }, function() {
        this.resource('viewAll');
        this.resource('summaryEdit');
    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});