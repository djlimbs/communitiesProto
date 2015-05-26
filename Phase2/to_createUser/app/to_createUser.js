// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

var updateHeight = function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        parent.resizeIframe();
    });
};

var globalThis = this;
var alertTextPart1 = 'Sorry, but the user account could not be created.</br>';
var alertTextPart2 = '</br>The System Administrator has been notified';



Ember.View.reopen({
    willInsertElement: function() {
        if (parent.resizeIframe) {
            Ember.run.debounce(globalThis, updateHeight, 100);
        }
    },
    willDestroyElement: function() {
        if (parent.resizeIframe) {
            Ember.run.debounce(globalThis, updateHeight, 100);
        }
    }
});

var sourceClasses = {
    application : {
        icon : 'juicon-check-circle',
        color : 'alert--success',
        alertText : 'Done! Thank you for applying.',
        buttonText : 'Create my account',
        showAlert : true
    },
    applyEmail : {
        icon : 'juicon-info-circle',
        color : 'alert--info',
        alertText : 'Your application for the Account Executive position was completed on',
        buttonText : 'Create my account',
        showAlert : true
    },
    offerEmail : {
        icon : 'juicon-exclamation-circle',
        color : 'alert--warning',
        alertText : 'Specify a password now so we can create an account and provide you access to your offer.',
        buttonText : 'Create account and view offer',
        showAlert : true
    },
    verifyEmail : {
        icon : 'juicon-exclamation-circle',
        color : 'alert--warning',
        alertText : 'Specify a password now so we can create an account.',
        buttonText : 'Create my account and continue applying',
        showAlert : true    
    },
    error : {
        icon : 'juicon-exclamation-circle',
        color : 'alert--error',
        alertText : 'Please supply a password.',
        buttonText : 'Create my account',
        showAlert : true
    }
}

App.CreateUserRoute = Ember.Route.extend({
    model: function (){
        console.log('wtf 6');
        parsedJSON.state = parsedJSON.source;
        
        if(parsedJSON.source == 'applyEmail'){
            sourceClasses.applyEmail.alertText += ' ' + moment(parsedJSON.app.CreatedDate).format('MMM DD, YYYY');
        }

        if(!parsedJSON.tokenVerified){
            sourceClasses.error.alertText = 'Your token is invalid';   
            parsedJSON.state = 'error';
        }

        return parsedJSON;
    }
});

App.CreateUserController = Ember.ObjectController.extend({
    showAlert : function(){
        return sourceClasses[this.get('state')].showAlert;
    }.property('state'),
    alertIcon : function(){
        return sourceClasses[this.get('state')].icon;
    }.property('state'),
    alertColor : function(){
        return sourceClasses[this.get('state')].color;
    }.property('state'),
    alertText : function(){
        return sourceClasses[this.get('state')].alertText;
    }.property('state'),
    buttonText : function(){
        return sourceClasses[this.get('state')].buttonText;
    }.property(),
    showJobLink : function(){
        return this.get('source') == 'application';
    }.property(),
    showBodyText : function(){
        return this.get('source') != 'offerEmail' && this.get('source') != 'verifyEmail';
    }.property(),
    inputType : function(){
        return this.get('showPass') ? 'text' : 'password'
    }.property('showPass'),
    showBody : function(){
        return this.get('tokenVerified') && !this.get('loggedIn')
    }.property(),
    listingPage : function(){
        return parent.urlPrefix + '/JobListing?id=' + this.get('app').Job_Posting__c;
    }.property(),
    resize : true,
    showPass : true,
    actions : {
        createUser : function(){
            var self = this;
            console.log('I AM password ' + self.get('password'));
            if(Ember.isEmpty(self.get('password'))){
                self.set('state', 'error');
                sourceClasses['error'].alertText = 'Please supply a password.';
                self.notifyPropertyChange('state');
                return;
            }
            //remote actions don't have access to the current page so we need to pass the url in from the frontend.
            cont.checkUser(self.get('app').Id, self.get('baseUrl'), function(checkResults, resultObj){
                var parsedCheckResults = parseResult(checkResults);
                console.log(parsedCheckResults);
                if(parsedCheckResults.errorMessages.length == 0){
                    console.log('no problems');
                    cont.createUser(self.get('password'), self.get('app').Id, sourceContact, self.get('source'), joId, function(createResults, resultObj){
                        var parsedCreateResults = parseResult(createResults);
                        console.log('I AM CREATE');
                        console.log(parsedCreateResults);
                        if(parsedCreateResults.errorMessages.length == 0){
                            window.parent.location.href = parsedCreateResults.data.url;
                        } else {
                            sourceClasses['error'].alertText = parsedCreateResults.errorMessages[0];
                            self.set('state', 'error');
                            self.notifyPropertyChange('state');
                            self.toggleProperty('resize');
                        }
                    });
                } else {
                    sourceClasses['error'].alertText = alertTextPart1 + parsedCheckResults.errorMessages[0] + alertTextPart2;
                    self.set('state', 'error');
                    self.notifyPropertyChange('state');
                    self.toggleProperty('resize');
                }
            });
        },
        goToListing : function(){
            window.parent.location.href = parent.urlPrefix + '/JobListing?id=' + this.get('app').Job_Posting__c;
        }
    }
});

// Router
App.Router.map(function() {
    this.resource('createUser', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});