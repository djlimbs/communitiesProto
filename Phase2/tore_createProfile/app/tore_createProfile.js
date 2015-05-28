// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

var globalThis = this;

function updateHeight() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        parent.resizeIframe();
    });
};

Ember.View.reopen({
    willInsertElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    },
    willDestroyElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    }
});

App.ProfileController = Ember.ObjectController.extend({
    hasValidationError: function(){
        return !Ember.isEmpty(this.get('errorMsg'));
    }.property('errorMsg'),
    showEmptyFirstNameError: function(){
        return this.get('emptyFirstName') && this.get('showError');
    }.property('emptyFirstName', 'showError'),
    showEmptyLastNameError: function(){
        return this.get('emptyLastName') && this.get('showError');
    }.property('emptyLastName', 'showError'),
    showEmailError: function(){
        return (this.get('hasEmailError') || this.get('emptyEmail')) && this.get('showError');
    }.property('emptyEmail', 'hasEmailError', 'showError'),
    emptyFirstName : function(){
        return Ember.isEmpty(this.get('user').FirstName);
    }.property('user.FirstName'),
    emptyLastName : function(){ 
        return Ember.isEmpty(this.get('user').LastName);
    }.property('user.LastName'),
    emptyEmail : function(){
        return Ember.isEmpty(this.get('user').Email);
    }.property('user.Email'),
    emailError : 'Please supply a value',
    actions : {
        save : function(){
            var self = this;
            var user = self.get('user');
            self.set('emailError', 'Please supply a value');
            self.set('errorMsg', null);
            self.set('hasEmailError', false);
            self.set('isSaving', true);
            self.set('showError', false);


            if(self.get('emptyFirstName') || self.get('emptyLastName') || self.get('emptyEmail')){
                self.set('isSaving', false);
                self.set('showError', true);
                return;
            }

            cont.saveUser(JSON.stringify(self.get('user')), self.get('user').ContactId, function(res){
                self.set('isSaving', false);
                console.log(res);
                var parsedResult = parseResult(res);
                console.log(parsedResult);
                if(!parsedResult.isSuccess){
                    if(parsedResult.errorMessages[0] == 'Please correct the email address format.'){
                        self.set('showError', true);
                        self.set('hasEmailError', true);
                        self.set('emailError', 'Please correct the email address format.');
                    } else {
                        self.set('errorMsg', parsedResult.errorMessages);
                    }
                    
                    return;
                }

                history.back();
            });
        },
        cancel : function(){
            history.back();
        }
    }
})

App.ProfileRoute = Ember.Route.extend({
    model: function(params) {
        parsedJson.labels = labels
        return parsedJson;
    }
});

// Router
App.Router.map(function() {
    this.resource('profile', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});