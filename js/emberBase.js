// Add a labels property to every controller so that we don't have to access the global scope (which was deprecated).
Ember.ControllerMixin.reopen({
    labels: labels
});

Ember.Object.reopen({
    labels: labels
});

// Attribute bindings for QA locators so we can easily add them to ember markup.
Ember.View.reopen({
    attributeBindings: ['data-dev', 'data-qa', 'data-qa-label', 'data-qa-button', 'data-qa-input', 
                        'data-qa-link', 'data-qa-pane', 'data-qa-select', 'da-qa-modal', 'data-qa-alert',
                        'data-qa-container'],
    didInsertElement : function(){
        this._super();

        Ember.run.scheduleOnce('afterRender', this, this.initJUI);   
    },
    initJUI: function() {
        // Initialize tooltips if they exist. This might actually be expensive since it's run every time a new view is added. Will refactor.
        /*if ($('[data-toggle="tooltip"]').length > 0) {
            $('body').tooltip({
                selector: '[data-toggle=tooltip]'
            });
        }*/
        this.afterRenderEvent();
    },
    afterRenderEvent : function() {
        // implement this hook in your own subclasses and run your jQuery logic there
    }
});