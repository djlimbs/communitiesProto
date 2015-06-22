// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


App.InterviewNewEditController = Ember.ObjectController.extend({
    
});

App.InterviewNewEditRoute = Ember.Route.extend({
    model: function (){
        return {};
    }
});

// Router
App.Router.map(function() {
    this.resource('interviewNewEdit', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

