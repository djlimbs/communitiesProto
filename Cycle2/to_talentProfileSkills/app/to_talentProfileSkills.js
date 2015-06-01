// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});



App.Select2Component = Ember.TextField.extend({
    attributeBindings: ['multiple', 'data-qa-input'],
    multiple: true,
    didInsertElement: function() {
        var self = this;
        this.$().select2({
            minimumInputLength: 2,
            placeholder: 'Add Skills',
            tags: [],
            formatNoMatches: 'No Skills',
            tokenSeparators: [',']
        });
    }
});

App.SkillsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});





App.TalentProfileSkillsController = Ember.ObjectController.extend({
	// selectedSkills: ['Sale', 'Marketing']

});

// // Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

