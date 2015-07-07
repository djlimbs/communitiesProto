// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


App.TimeSlotSelectorController = Ember.ObjectController.extend({
    
});

App.TimeSlotSelectorRoute = Ember.Route.extend({
    model: function (){
        return {};
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

