// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

function processTalentProfile() {
    return parsedTalentProfileMap.talentProfile;
};

App.TalentProfileViewRoute = Ember.Route.extend({
    model: function (){
        
        return processTalentProfile();
    }
});

App.TalentProfileViewController = Ember.ObjectController.extend({
    actions: {
        clickEdit: function() {
            if (isSF1) {
                sforce.one.navigateToURL('/apex/to_talentProfileEdit');
            } else {
                window.location.href = '/apex/to_talentProfileEdit';
            }
        }
    }
});

// Router
App.Router.map(function() {
    this.resource('talentProfileView', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});