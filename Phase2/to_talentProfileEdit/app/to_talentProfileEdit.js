// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.EID = 0;

function processTalentProfile() {
    var talentProfile = parsedTalentProfileMap.talentProfile;

    if (!Ember.isNone(talentProfile.Projects__r)) {
        talentProfile.projects = talentProfile.Projects__r.records.map(function(proj) {
            proj.eId = ++App.EID;

            return proj;
        });
    }

    return Ember.Object.create(parsedTalentProfileMap.talentProfile);
};

App.TalentProfileEditRoute = Ember.Route.extend({
    model: function (){
        
       return processTalentProfile();
    },
    beforeModel: function() {
        this.transitionTo('viewAll');
    },
    actions: {
        clickSave: function() {
            var editSection = this.get('controller').get('editSection');
            var routeName = (editSection + '_' + 'Edit').camelize();

            if (editSection === 'Summary') {
                this.saveSummary();
            }

            if (editSection === 'Projects') {
                this.saveProjects();
            }


            this.transitionTo('viewAll');
        }
    },
    saveSummary: function() {
        var data = this.controllerFor('summaryEdit').get('tempObj');

        this.modelFor('talentProfileEdit').set('Summary__c', data.get('Summary__c'));
    },
    saveProjects: function() {

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
        controller.set('model', {});
        controller.set('tempObj', Ember.Object.create(model));
        this.controllerFor('talentProfileEdit').set('editSection', 'Summary');
        $('#identity').slideToggle('fast');
    }
});

App.ProjectsEditRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.Object.create(this.modelFor('talentProfileEdit').projects.findBy('eId', parseInt(params.eId)));
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        this.controllerFor('talentProfileEdit').set('editSection', 'Projects');
        $('#identity').slideToggle('fast');
    }
});

// Router
App.Router.map(function() {
    this.resource('talentProfileEdit', { path: '/' }, function() {
        this.resource('viewAll');
        this.resource('summaryEdit');
        this.resource('projectsEdit', { path: '/:eId' });
    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});