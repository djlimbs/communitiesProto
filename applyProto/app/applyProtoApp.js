var fieldTypeToPartialMap = {
    'STRING' : 'textField',
    'EMAIL' : 'textField',
    'PHONE' : 'telField',
    'TEXTAREA' : 'textArea',
    'DATE' : 'date',
    'PICKLIST' : 'picklist'
};

function buildEmploymentHistoryFields(employmentHistoryFields) {
    var employmentHistoryArray = [];
    var employmentHistoryEntry = {
            fields: []
        };

    employmentHistoryFields.forEach(function(f) {
        var fieldObjWithValue = f;
        fieldObjWithValue.value = null;
        fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
        employmentHistoryEntry.fields.addObject(fieldObjWithValue);
    });

    employmentHistoryArray.addObject(employmentHistoryEntry);

    return employmentHistoryArray;
}

function buildEducationHistoryFields(educationHistoryFields) {
    var educationHistoryArray = [];
    var educationHistoryEntry = {
            fields: []
        };

    educationHistoryFields.forEach(function(f) {
        var fieldObjWithValue = f;
        fieldObjWithValue.value = null;
        fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
        educationHistoryEntry.fields.addObject(fieldObjWithValue);
    });

    educationHistoryArray.addObject(educationHistoryEntry);

    return educationHistoryArray;
}

// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.RadioButtonComponent = Ember.Component.extend({  
    tagName: 'input',
    attributeBindings: ['type', 'checked'],
    type: 'radio',
    checked: function () {
        return this.get('value') == this.get('name');
    }.property('value', 'name'),
    click: function () {
        this.set('name', this.get('value'));
    }
});

App.UploadFileView = Ember.TextField.extend({
    type: 'file',
    attributeBindings: ['resumeFileName', 'base64fileData'],
    change: function(evt) {
      var self = this;
      var input = evt.target;

      if (input.files && input.files[0]) {

        var reader = new FileReader();
        var that = this;
        var file = input.files[0];

        reader.onload = function(e) {
            var fileToUpload = e.srcElement.result;
            var base64String = fileToUpload.split('base64,')[1];

            self.set('resumeFileName', file.name);
            self.set('base64fileData', base64String);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
});

// Controllers
// Defining application controller as it automatically comes w/ currentPath which we need for navigation.
App.ApplicationController = Ember.Controller.extend({});

App.ApplyController = Ember.ObjectController.extend({
    needs: ['application'],
    currentPath: function() {  
        return this.get('controllers.application.currentPath').split('.')[1];
    }.property('controllers.application.currentPath'),
    currentSectionNum: function() {
        return this.get('sectionArray').indexOf(this.get('currentPath')) + 1;
    }.property('currentPath'),
    isContactInfo: Ember.computed.equal('currentPath', 'contactInfo'),
    isLegallyRequired: Ember.computed.equal('currentPath', 'legallyRequired'),
    disableNext: function() {
        var currentPath = this.get('currentPath');
        var incompleteProperty = ('is ' + currentPath + ' incomplete').camelize();

        return this.get(incompleteProperty);
    }.property('currentPath', 'isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                    'isEducationHistoryIncomplete', 'isGeneralIncomplete', 'isJobSpecificIncomplete', 'isLegallyRequiredIncomplete'),
    disableResume: function() {
        return this.get('isContactInfoIncomplete');
    }.property('isContactInfoIncomplete'),
    disableSkills: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete'),
    disableEmploymentHistory: function() {
        return false;
        //return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') || this.get('isSkillsIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete'),
    disableEducationHistory: function() {
        return false;
        //return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
        //                || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryComplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete'),
    disableGeneral: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete'),
    disableJobSpecific: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete') || this.get('isGeneralIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete', 'isGeneralIncomplete'),
    disableLegallyRequired: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete') || this.get('isGeneralIncomplete') || this.get('isJobSpecificIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete', 
                            'isGeneralIncomplete', 'isJobSpecificIncomplete'),
    actions: {
        clickNext: function() {
            var currentPath = this.get('currentPath');
            var sectionArray = this.get('sectionArray');

            var nextPath = sectionArray[sectionArray.indexOf(currentPath) + 1];

            this.transitionToRoute(nextPath);
        },
        clickPrevious: function() {
            var currentPath = this.get('currentPath');
            var sectionArray = this.get('sectionArray');

            var nextPath = sectionArray[sectionArray.indexOf(currentPath) - 1];

            this.transitionToRoute(nextPath);
        }
    }

});

App.ContactInfoController = Ember.ObjectController.extend({
    needs: ['apply'],
    fieldValuesDidChange: function() {
        var nameFields = this.get('name');
        var addressFields = this.get('address');
        var contactFields = this.get('contact');
        var self = this;

        var checkEmpty = function(fieldArray) {
            return fieldArray.filter(function(f) { 
                return Ember.isEmpty(f.value) || Ember.isEmpty(f.value.trim());
            }).length > 0;
        };

        var updateApplyController = function(isIncomplete) {
            var applyController = self.get('controllers.apply');

            if (!Ember.isNone(applyController) && !Ember.isNone(applyController.get('content'))) {
                applyController.set('isContactInfoIncomplete', isIncomplete);
            }
        };

        var areNameFieldsEmpty = checkEmpty(nameFields);
        var areAddressFieldsEmpty = Ember.isEmpty(addressFields) ? false : checkEmpty(addressFields);
        var areContactFieldsEmpty = Ember.isEmpty(contactFields) ? false : checkEmpty(contactFields);

        if (areNameFieldsEmpty === true || areAddressFieldsEmpty === true || areContactFieldsEmpty === true) {
            updateApplyController(true);
        } else {
            updateApplyController(false);
        }
    }.observes('name.@each.value', 'address.@each.value', 'contact.@each.value')
});

App.ResumeController = Ember.ObjectController.extend({
    needs: ['apply'],
    fileToUploadDidChange: function() {
        var resumeFileName = this.get('resumeFileName');

        if (Ember.isEmpty(resumeFileName)) {
            this.get('controllers.apply').set('isResumeIncomplete', true);
        } else {
            this.get('controllers.apply').set('isResumeIncomplete', false);
        }
    }.observes('resumeFileName'),
    actions: {
        clickUploadFromDevice: function() {
            var fileInput = $('input[type="file"]');
            fileInput.click();
        }
    }
});

App.FormElementController = Ember.ObjectController.extend({
    // Element Types
    isEtNone: function(){
        return Ember.isNone(this.get('Element_Type__c'));
    }.property(),
    isQuestion: function(){
        return this.get('Element_Type__c') === 'Question';
    }.property(),
    isRichText: function(){
        return this.get('Element_Type__c') === 'Rich Text';
    }.property(),
    isHeading: function(){
        return this.get('Element_Type__c') === 'Heading';
    }.property(),

    // Answer Types
    isAtNone: function(){
        return Ember.isNone(this.get('Answer_Type__c'));
    }.property(),
    isRadioButton: function(){
        return this.get('Answer_Type__c') === 'Radio Buttons';
    }.property(),
    isCheckbox: function(){
        return this.get('Answer_Type__c') === 'Checkboxes';
    }.property(),
    isTextField: function(){
        return this.get('Answer_Type__c') === 'Text Field';
    }.property(),
    isParagraph: function(){
        return this.get('Answer_Type__c') === 'Paragraph';
    }.property(),
    isDate: function(){
        return this.get('Answer_Type__c') === 'Date';
    }.property(),
    answerChoices: function(){
        return !Ember.isNone(this.get('Answer_Choices__r')) ? this.get('Answer_Choices__r').records : null
    }.property(),
});

// Routes
App.ApplyRoute = Ember.Route.extend( {
    model: function(params) {

        var hiringModel = JSON.parse(parsedApplyMap.hiringModel.Configuration_Json__c);

        var applicationObj = {
            resume: {
                resumeFileName: null,
                base64fileData: null,
                applicationId: parsedApplyMap.application.Id
            },
            companyLogoUrl: companyLogoUrl,
            sectionArray: ['contactInfo']
        };

        applicationObj.application = parsedApplyMap.application;

        // Setup contact info fields.
        applicationObj.contactFields = {
            name: [],
            contact: [],
            address: []
        };

        ['name', 'contact', 'address'].forEach(function(contactSection) {
            parsedApplyMap[contactSection].forEach(function(field) {
                if (hiringModel.contactInfo[field.name] === true) {
                    field.partial = fieldTypeToPartialMap[field.type];
                    field.isString = field.type === 'STRING' || field.type === 'EMAIL';
                    field.isPhone = field.type === 'PHONE';
                    applicationObj.contactFields[contactSection].addObject(field);
                }
            });
        });

        // Setup application sections
        ['resume', 'skills', 'employmentHistory', 'educationHistory'].forEach(function(appSection) {
            var applicationObjProperty = ('is ' + appSection + ' enabled').camelize();
            var applicationIncompleteProperty = ('is ' + appSection + ' incomplete').camelize();

            if (hiringModel[appSection].isEnabled === true) {
                applicationObj[applicationObjProperty] = true;
                applicationObj.sectionArray.addObject(appSection);

                // Check if we have data in it already
                applicationObj[applicationIncompleteProperty] = true;

            } else {
                applicationObj[applicationObjProperty] = false;
                applicationObj[applicationIncompleteProperty] = false;
            }
        });

        applicationObj.sectionArray.addObjects(['general', 'jobSpecific', 'legallyRequired']);

        if (hiringModel.employmentHistory.isEnabled === true) {
            applicationObj.employmentHistoryYears = hiringModel.employmentHistory.selectedEmploymentHistoryYears;
            applicationObj.employmentHistoryArray = buildEmploymentHistoryFields(parsedApplyMap.employmentHistoryFields);
        }

        if (hiringModel.educationHistory.isEnabled === true) {
            applicationObj.educationHistoryArray = buildEducationHistoryFields(parsedApplyMap.educationHistoryFields);
        }

        // Check if we have data
        applicationObj.isGeneralIncomplete = true;
        applicationObj.isJobSpecificIncomplete = true;
        applicationObj.isLegallyRequiredIncomplete = true;

        applicationObj.numSections = applicationObj.sectionArray.length;

        applicationObj.generalFormElements = parsedApplyMap.generalFormElements;
        applicationObj.jobSpecificFormElements = parsedApplyMap.jobSpecificFormElements;
        applicationObj.legalFormElements = parsedApplyMap.legalFormElements;

        console.log('***MODEL');
        console.log(applicationObj);
        return applicationObj
    },
    beforeModel: function(transition) {
        this.transitionTo('contactInfo');
    }
});

App.ContactInfoRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').contactFields;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.notifyPropertyChange('name.@each.value');
    },
    actions: {
        willTransition: function(transition) {
            var apply = this.modelFor('apply');

            console.log(apply);
            console.log('save');
        }
    }
}); 

App.GeneralRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').generalFormElements;
    }
});

App.LegallyRequiredRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').legalFormElements;
    }
});

App.JobSpecificRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').jobSpecificFormElements;
    }
});

App.ResumeRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').resume;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.notifyPropertyChange('resumeFileName');
    },
    actions: {
        willTransition: function(transition) {
            if (transition.targetName !== 'contactInfo') {
                console.log(this.modelFor('resume'));
                var resume = this.modelFor('resume');
                console.log('upload');
                //cont.uploadResume(resume.base64String, resume.applicationId, function(res, evt) {
                //    if (res) {
                //        console.log(res);
                //    } else {
                //        // error
                //    }
                //});
            }
        }
    }
});

App.EmploymentHistoryRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').employmentHistoryArray;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});

App.EducationHistoryRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').educationHistoryArray;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});

// Router
App.Router.map(function() {
    this.resource('apply', { path: '/' }, function() {
        this.resource('contactInfo', { path: '/contactInfo' });
        this.resource('resume', { path: '/resume' });
        this.resource('skills', { path: '/skills' });
        this.resource('employmentHistory', { path: '/employmentHistory' });
        this.resource('educationHistory', { path: '/educationHistory' });
        this.resource('general', { path: '/general' });
        this.resource('jobSpecific', { path: '/jobSpecific' });
        this.resource('legallyRequired', { path: '/legallyRequired' });

    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});