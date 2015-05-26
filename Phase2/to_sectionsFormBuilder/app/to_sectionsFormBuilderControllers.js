App.ApplicationController = Ember.Controller.extend({

});

// Controllers
App.FormBuilderController = Ember.ObjectController.extend(App.FormBuilderMixin, App.SectionCheck, {
    needs: ['application', 'applicationSection'],
    currentPathBinding: 'controllers.application.currentPath',
    sectionBinding: 'controllers.applicationSection.section',
    currentSection: 'General',
    isInGeneral: function() {
        return App.Fixtures.get('currentSection') === 'General';
    }.property('App.Fixtures.currentSection'),
    isInLegal: function() {
        return App.Fixtures.get('currentSection') === 'Legal';
    }.property('App.Fixtures.currentSection'),
    isInOnePage: function() {
        console.log(this.get('currentPath'));
        return this.get('currentPath') === 'formBuilder.onePage';
    }.property('currentPath'),
    formElements: function() {
        return this.get('general').concat(this.get('legal'));
    }.property('general', 'legal'),
    hiringModelDidChange: function() {
        var currentPathString = this.get('currentPath');
        if (!Ember.isNone(currentPathString)) {
            var currentPath = currentPathString.split('.')[1];
            var currentSection = App.Fixtures.get('currentSection');
            var selectedHiringModel = this.get('selectedHiringModel');

            if (currentPath === 'formElements' || Ember.isNone(currentSection)) {
                this.transitionToRoute(currentPath, selectedHiringModel);
            } else {
                this.transitionToRoute(currentPath, currentSection, selectedHiringModel);
            }

        }
    }.observes('selectedHiringModel'),
    geographyDidChange: function() {
        var currentPathString = this.get('currentPath');

        if (!Ember.isNone(currentPathString)) {
            var currentPath = currentPathString.split('.')[1];
            var currentSection = App.Fixtures.get('currentSection');
            var selectedGeography = this.get('selectedGeography');

            if (currentPath === 'formElements') {
                this.transitionToRoute(currentPath, selectedGeography);
            }
        }

    }.observes('selectedGeography')
});

App.FormElementsController = Ember.ArrayController.extend(App.FormElementsMixin, App.SectionCheck, {
    isInGeneralBinding: 'controllers.formBuilder.isInGeneral',
    isInLegalBinding: 'controllers.formBuilder.isInLegal',    
    selectedHiringModelBinding: 'controllers.formBuilder.selectedHiringModel',
    selectedGeographyBinding: 'controllers.formBuilder.selectedGeography',
    hasFormElements: function() {
        return this.get('formElementsToDisplay').length > 1;
    }.property('formElementsToDisplay'),
    formElementsToDisplay: function() {
        var currentSection = this.get('currentSection')
            , selectedHiringModel = this.get('selectedHiringModel')
            , selectedGeography = this.get('selectedGeography')
            , arrangedContent = this.get('arrangedContent');

        if (currentSection === 'General') {
            return arrangedContent.filter(function(fe) {
                return fe.Hiring_Model__c === selectedHiringModel || fe.isLast === true || fe.isNew === true;
            });
        } else if (currentSection === 'Legal') {
            return arrangedContent.filter(function(fe) {
                return fe.Geography__c === selectedGeography || fe.isLast === true || fe.isNew === true;
            });
        }
    }.property('currentSection', 'selectedHiringModel', 'selectedGeography', 'arrangedContent', '[]'),
    sortProperties: ['Sequence_Number__c']
});

App.FormElementController = Ember.ObjectController.extend(App.FormElementMixin, App.SectionCheck, {
    isInGeneralBinding: 'controllers.formBuilder.isInGeneral',
    isInLegalBinding: 'controllers.formBuilder.isInLegal',
    isQuestionType: Ember.computed.equal('Element_Type__c', 'Question'),
    sectionDidChange: function() {
        if (this.get('isInEditMode') === true) {
            this.send('clickCancel');
        }
    }.observes('currentSection')
});

App.AnswerController = Ember.ObjectController.extend(App.AnswerMixin, App.SectionCheck, {
    isInLegalBinding: 'controllers.formBuilder.isInLegal'
});

App.ApplicationSectionController = Ember.ObjectController.extend({
    employmentHistoryYears: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
});

App.FieldController = Ember.ObjectController.extend({
    isRequired: function() {
        console.log(this.get('model'));
        console.log(this.get('isDBRequired'));
        console.log(this.get('isFieldSetRequired'));
        return this.get('isDBRequired') === true || this.get('isFieldSetRequired') === true;
    }.property('isDBRequired', 'isFieldSetRequired')
});

App.OnePageController = Ember.ObjectController.extend({
    hiringModels: function() {
        var hiringModelData = this.get('model');
        var hiringModels = [];

        Object.keys(hiringModelData).forEach(function(hm) {
            hiringModels.addObject({
                name: hm,
                isOnePage: hiringModelData[hm].data.isOnePage
            });
        });

        return hiringModels;
    }.property(),
    isOnePageDidChange: function() {
        var model = this.get('model');
        this.get('hiringModels').forEach(function(hm){
            model[hm.name].data.isOnePage = hm.isOnePage;
        });
    }.observes('hiringModels.@each.isOnePage')
});