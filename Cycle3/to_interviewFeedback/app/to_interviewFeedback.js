App = Ember.Application.create({
    rootElement: '#application'
});

App.Router.map(function(){
    this.resource('main', {path: '/'});
});

var searchTimer = null;
if(!isSF1){
    App.MainView = Ember.View.extend({
        afterRenderEvent: function() {
            $('body').tooltip({
                selector: '[data-toggle=tooltip]'
            });
        }
    });
}

Ember.Application.initializer({
    name: 'ember-select-with-nullprompt',

    initialize: function(container, application) {
        Ember.Select.reopen({
            didInsertElement: function () {
                if (this.prompt) {
                    this.$('option:first').attr('disabled', true);
                }
            }
        });
    }
});

App.MainRoute = Ember.Route.extend({
    model: function (){
        var self = this;
        /*
        Sfdc.canvas.publisher.subscribe({name: "publisher.showPanel",
            onData:function(e) {
                Sfdc.canvas.publisher.publish({name:"publisher.setValidForSubmit", payload:"true"});
        }});

        Sfdc.canvas.publisher.subscribe({name: "publisher.post", 
            onData:function(e) {
                self.controller.send('saveFeedback')
            }
        });*/

        var parsedResult = JSON.parse(jsonString);
        
        var interviews = parsedResult.app.Interviews__r;
        var interviewers = {}
        var selectValues = new Ember.A();
        if(!Ember.isEmpty(interviews)){
            interviews.records.forEach(function(interview){
                var obj = {
                    value : interview.Id + '|Interview',
                    label : Ember.isEmpty(interview.Topics__c) ? 'Interview: ' + interview.Interviewers__c : interview.Topics__c
                }

                selectValues.addObject(obj);
                interviewers[interview.Id] = Ember.isEmpty(interview.Topics__c) ? null : 'Interview with ' + interview.Interviewers__c;
            });
        }

        selectValues = selectValues.sortBy('label');
        selectValues.addObject(
            {
                value : 'null|' + labels.miscellaneous,
                label : labels.miscellaneous
            }
        )

        selectValues.addObject(
            {
                value : 'null|' + labels.finalSelection,
                label : labels.finalSelection
            }
        )

        var options = getDependentOptions(apiKey, 'Application__c', 'Outcome__c', 'Disposition__c', namespace);
        return Ember.Object.create({
            isSF1 : isSF1,
            interviewers : interviewers,
            Application_Status__c : parsedResult.app.Status__c,
            Application_Stage__c : parsedResult.app.Stage__c,
            Application_Lookup__c : parsedResult.app.Id,
            allowComments : parsedResult.allowedComments,
            allowRejection : parsedResult.allowRejection,
            allowNeutral : parsedResult.allowNeutral,
            positiveTooltip : parsedResult.positiveTooltip,
            negativeTooltip : parsedResult.negativeTooltip,
            neutralTooltip : parsedResult.neutralTooltip,
            disposition : options.Rejected,
            Positive_Feedback__c : 0,
            Negative_Feedback__c : 0,
            Neutral__c : 0,
            Rejected__c : false,
            selectValues : selectValues,
            miscRTId : parsedResult.miscRTId,
            interviewRTId : parsedResult.interviewRTId,
            additionalCriteriaFields : parsedResult.additionalCriteriaFields,
            applicantName : (parsedResult.app.First_Name__c + ' ' + parsedResult.app.Last_Name__c),
            retUrl : parsedResult.retUrl
        });
    }
});

App.MainController = Ember.ObjectController.extend({
    hasValidationError: function(){
        return !Ember.isEmpty(this.get('errorMsg'));
    }.property('errorMsg'),
    chooseLike: function(){
        return this.get('Positive_Feedback__c') == 1
    }.property('Positive_Feedback__c'),
    chooseDislike: function(){
        return this.get('Negative_Feedback__c') == 1
    }.property('Negative_Feedback__c'),
    chooseUnknown: function(){
        return this.get('Neutral__c') == 1
    }.property('Neutral__c'),
    chooseDisqualified: function(){
        return this.get('Rejected__c')
    }.property('Rejected__c'),
    chooseSelected: function(){
        return this.get('Selected__c')
    }.property('Selected__c'),
    showDisposition: function(){
        return this.get('Rejected__c')
    }.property('Rejected__c'),
    selectedFinalOutcome : function(){
        this.set('Rejected__c', false)
        
        if(!Ember.isEmpty(this.get('selectedType'))){
            return this.get('selectedType').split('|')[1] == labels.finalSelection;
        }

        return false;
    }.property('selectedType'),
    hasFeedback : false,
    setType : function(){
        if(!Ember.isEmpty(this.get('selectedType'))){
            selectedType = this.get('selectedType').split('|');
            this.set('interviewText', this.get('interviewers')[selectedType[0]]);
            this.set('Interview__c', selectedType[0] == "null" ? null : selectedType[0]);
            this.set('feedbackType', selectedType[1]);
            this.set('RecordTypeId', selectedType[1] == 'Interview' ? this.get('interviewRTId') : this.get('miscRTId')); 
        }
    }.observes('selectedType'),
    actions : {
        selectedFeedback : function(choice){
            if(this.get(choice) == 1){
                this.set('hasFeedback', false);
                this.set(choice, (choice == 'Rejected__c' || choice == 'Selected__c')? false : 0);
                this.set('Disposition__c', null);
            } else {
                this.set('hasFeedback', true);
                var choices = {
                    Positive_Feedback__c : 0,
                    Negative_Feedback__c : 0,
                    Neutral__c : 0,
                    Selected__c : false,
                    Rejected__c : false
                }

                if(choice == 'Rejected__c' || choice == 'Selected__c'){
                    choices[choice] = true;
                } else {
                    choices[choice] = 1;
                    this.set('Disposition__c', null);
                }

                this.setProperties(choices);
            }
        },
        saveFeedback : function(){
            var self = this;
            this.set('feedbackError', false);
            if(this.get('hasFeedback') == false){
                this.set('feedbackError', true);
                return;
            }
            console.log('hello');
            if(this.get('Rejected__c') == true || this.get('Selected__c') == true){

                var alertChoice = confirm('Are you sure you want to ' + (this.get('Rejected__c') ? 'reject' : 'select') + ' this applicant?');
                if(!alertChoice){
                    return;
                }
            }

            var evaluation = this.get('model');

            evaluation.additionalCriteriaFields.forEach(function(field){
                evaluation[field.name] = field.selectedValue;
            });

            console.log(evaluation);
            
            var callback = function(result){
                parsedResults = parseResult(result);
                
                if(!parsedResults.isSuccess){
                    self.set('errorMsg', parsedResults.errorMessages);
                    return;
                }/*
                console.log(isSF1)
                //Sfdc.canvas.publisher.publish({name : 'publisher.refresh', payload : {feed:true}});
                if(isSF1){
                    //Sfdc.canvas.publisher.publish({ name: "publisher.close", payload:{ refresh:"true" }});
                    sforce.one.back();
                } else {
                    window.history.back();
                }*/

                var retUrl = self.get('retUrl');
            
                if(retUrl){
                    if(isSF1){
                        sforce.one.back();
                    } else {
                        window.history.back();
                    }
                } else {
                    if(isSF1){
                        sforce.one.navigateToURL(retUrl);
                    } else {
                        window.location.href = retUrl;
                    }
                }   
            }

            if(this.get('feedbackType') == labels.finalSelection){
                cont.finalOutcome(JSON.stringify(evaluation),callback);
            } else {
                cont.saveFeedback(JSON.stringify(evaluation), callback);
            }
        },
        cancel : function(){
            var retUrl = this.get('retUrl');

            if(retUrl){
                if(isSF1){
                    sforce.one.back();
                } else {
                    window.history.back();
                }
            } else {
                if(isSF1){
                    sforce.one.navigateToURL(retUrl);
                } else {
                    window.location.href = retUrl;
                }
            }
        }
    } 
});