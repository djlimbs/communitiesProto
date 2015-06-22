// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


App.NewPageController = Ember.ObjectController.extend({
    
});

App.NewPageRoute = Ember.Route.extend({
    model: function (){
        return {};
    }
});

// Router
App.Router.map(function() {
    this.resource('newPage', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

