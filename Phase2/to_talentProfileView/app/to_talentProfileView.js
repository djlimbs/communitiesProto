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
            var destUrl = '/apex/to_talentProfileEdit?id=' + userId;
            if (isSF1) {
                sforce.one.navigateToURL(destUrl);
            } else {
                parent.window.location.href = destUrl;
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