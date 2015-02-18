// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


// Routes
App.ApplyRoute = Ember.Route.extend( {
    model: function(params) {
        return {
            companyLogoUrl: companyLogoUrl
        }
    }
});

// Router
App.Router.map(function() {
    this.resource('apply', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});