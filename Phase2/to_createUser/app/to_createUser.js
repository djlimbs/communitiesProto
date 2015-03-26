// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.CreateUserController = Ember.ObjectController.extend({

});

// Router
App.Router.map(function() {
    this.resource('createUser', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});