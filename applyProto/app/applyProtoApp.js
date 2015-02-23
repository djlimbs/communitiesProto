// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.EID = 0;

var fieldTypeToPartialMap = {
    'STRING' : 'textField',
    'EMAIL' : 'textField',
    'PHONE' : 'telField',
    'TEXTAREA' : 'textArea',
    'DATE' : 'date',
    'PICKLIST' : 'picklist'
};

var appFieldsToLinkedInMap = {
    'First_Name__c' : 'firstName',
    'Last_Name__c' : 'lastName',
    'Email__c' : 'emailAddress',
    'BS' : 'Bachelor\'s Degree'
};

var employmentHistoryBlock;
var educationHistoryBlock;

function getEmploymentHistoryBlock(employmentHistoryObj) {
    if (Ember.isNone(employmentHistoryBlock)) {
        employmentHistoryBlock = {
            fields: []
        };

        parsedApplyMap.employmentHistoryFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));

            fieldObjWithValue.value = null;
            fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
            employmentHistoryBlock.fields.addObject(fieldObjWithValue);
        });
    }

    var newBlock = {
        eId: ++App.EID,
        fields: employmentHistoryBlock.fields.copy(true)
    };
        
    if (!Ember.isNone(employmentHistoryObj)) {
        newBlock.fields.forEach(function(f) {
            f.value = employmentHistoryObj[f.name];
        });
    }

    return newBlock;
}

function getEducationHistoryBlock(educationHistoryObj) {
    if(Ember.isNone(educationHistoryBlock)) {
        educationHistoryBlock = {
            fields: []
        };
    
        parsedApplyMap.educationHistoryFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));
            fieldObjWithValue.value = null;
            fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
            educationHistoryBlock.fields.addObject(fieldObjWithValue);
        });
    }

    var newBlock = {
        eId: ++App.EID,
        fields: educationHistoryBlock.fields.copy(true)
    };

    if (!Ember.isNone(educationHistoryObj)) {
        newBlock.fields.forEach(function(f) {
            f.value = educationHistoryObj[f.name];
        });
    }

    return newBlock;
}

function createEducationHistoryObj(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: e.degree,
            Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,
            Name: e.schoolName,
            Name__c: e.schoolName,
            Status__c: null,
            End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null
        };
    });
};

function createEmploymentHistoryObj(positions) {
    return positions.map(function(p) {
        // Positions from LinkedIn only have year and month in startDate/endDate
        var startDate;
        var endDate;

        if (!Ember.isNone(p.startDate)) {
            if (!Ember.isNone(p.startDate.month)) {
                startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');
            } else {
                startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');
            }
        }

        if (!Ember.isNone(p.endDate)) {
            if (!Ember.isNone(p.endDate.month)) {
                endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');
            } else {
                endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');
            }
        }

        return {
            Name: !Ember.isNone(p.company) ? p.company.name : null,
            Job_Title__c: p.title,
            Start_Date__c: startDate,
            Is_Current__c: p.isCurrent,
            End_Date__c: endDate
        };
    });
};

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

            //cont.uploadResume(base64String, 'a0Yj0000001ltYK', function(res, evt) {
            //    console.log(res);
            //});
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
    isEmploymentHistoryIncomplete: false,
    isEducationHistoryIncomplete: false,
    isGeneralIncomplete: false,
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
        return false;
        //return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
        //                || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
        //                || this.get('isEducationHistoryIncomplete');
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

App.EmploymentHistoryController = Ember.ArrayController.extend({
    actions: {
        clickAddEmploymentHistory: function() {
            var employmentHistoryBlock = getEmploymentHistoryBlock();
            this.get('[]').addObject(employmentHistoryBlock);
        },
        clickDeleteEmploymentHistory: function(employmentHistoryToDelete) {
            this.get('[]').removeObject(employmentHistoryToDelete);
        }
    }
});

App.EducationHistoryController = Ember.ArrayController.extend({
    actions: {
        clickAddEducationHistory: function() {
            var educationHistoryBlock = getEducationHistoryBlock();
            this.get('[]').addObject(educationHistoryBlock);
        },
        clickDeleteEducationHistory: function(educationHistoryToDelete) {
            this.get('[]').removeObject(educationHistoryToDelete);
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

        var linkedInMap = parsedApplyMap.linkedInMap;

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
                    field.value = applicationObj.application[field.name];

                    // if value from application is blank, and user is applying via linked in, pull in that info.
                    if (Ember.isEmpty(field.value) && !Ember.isNone(linkedInMap) 
                            && !Ember.isNone(appFieldsToLinkedInMap[field.name])) {
                        field.value = linkedInMap[appFieldsToLinkedInMap[field.name]];
                    }

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
            applicationObj.employmentHistoryArray = [];

            // if we don't have data already but have logged in via linkedin
            if (Ember.isEmpty(applicationObj.employmentHistoryArray) && !Ember.isNone(linkedInMap) 
                    && !Ember.isEmpty(linkedInMap.positions)) {
                var employmentHistoryObjs = createEmploymentHistoryObj(linkedInMap.positions.values);
                employmentHistoryObjs.forEach(function(eh) {
                    applicationObj.employmentHistoryArray.addObject(getEmploymentHistoryBlock(eh));
                });
            } else {
                applicationObj.employmentHistoryArray.addObject(getEmploymentHistoryBlock());
            }
        }

        if (hiringModel.educationHistory.isEnabled === true) {
            applicationObj.educationHistoryArray = [];

            // if we don't have data already but have logged in via linkedin
            if (Ember.isEmpty(applicationObj.educationHistoryArray) && !Ember.isNone(linkedInMap) 
                    && !Ember.isEmpty(linkedInMap.educations)) {
                var educationHistoryObjs = createEducationHistoryObj(linkedInMap.educations.values);
                educationHistoryObjs.forEach(function(eh) {
                    applicationObj.educationHistoryArray.addObject(getEducationHistoryBlock(eh));
                });
            } else {
                applicationObj.educationHistoryArray.addObject(getEducationHistoryBlock());
            }
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
            var contactInfoObj = {
                Id: apply.application.Id
            };

            ['name', 'contact', 'address'].forEach(function(section) {
                apply.contactFields[section].forEach(function(f) {
                    contactInfoObj[f.name] = f.value;
                });
            });

            // cont.saveContactInfo(JSON.stringify(contactInfoObj), function(res, evt) {
            //     if (res) {
            //         var parsedResult = parseResult(res);

            //         if (Ember.isEmpty(parsedResult.errorMessages)) {
            //             console.log(parsedResult.data);
            //         } else {
            //             console.log(parsedResult.errorMessages[0]);
            //         }
            //     } else {

            //     }
            // });
        }
    }
}); 

App.GeneralRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').generalFormElements;
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var generalIndex = sectionArray.indexOf('general');

            if (transition.targetName === sectionArray[generalIndex + 1]) {
                var formElementAnswers = this.modelFor('general');
                console.log(formElementAnswers);
            }
        }
    }
});

App.LegallyRequiredRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').legalFormElements;
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var legallyRequiredIndex = sectionArray.indexOf('legallyRequired');

            if (transition.targetName === sectionArray[legallyRequiredIndex + 1]) {
                var formElementAnswers = this.modelFor('legallyRequired');
                console.log(formElementAnswers);
            }
        }
    }
});

App.JobSpecificRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').jobSpecificFormElements;
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var jobSpecificIndex = sectionArray.indexOf('jobSpecific');

            if (transition.targetName === sectionArray[jobSpecificIndex + 1]) {
                var formElementAnswers = this.modelFor('jobSpecific');
                console.log(formElementAnswers);
            }
        }
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
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var resumeIndex = sectionArray.indexOf('resume');

            if (transition.targetName === sectionArray[resumeIndex + 1]) {
                var resume = this.modelFor('resume');
                var base64String = resume.base64fileData;
                var applicationId = resume.applicationId;
                var fileName = resume.resumeFileName;

                cont.uploadResume(base64String, fileName, applicationId, function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);
                        console.log(parsedResult);
                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            console.log(parsedResult.data);
                        } else {
                            console.log(parsedResult.errorMessages[0]);
                        }
                    } else {
                        console.log(evt);
                        // error
                    }
                });
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
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var employmentHistoryIndex = sectionArray.indexOf('employmentHistory');

            if (transition.targetName === sectionArray[employmentHistoryIndex + 1]) {
                var employmentHistoryObjArray = [];

                applyModel.employmentHistoryArray.forEach(function(eh) {
                    var employmentHistoryObj = {};

                    eh.fields.forEach(function(field) {
                        employmentHistoryObj[field.name] = field.value;
                    });

                    employmentHistoryObjArray.addObject(employmentHistoryObj);
                });

                console.log(employmentHistoryObjArray);
            }
        }
    }
});

App.EducationHistoryRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').educationHistoryArray;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var sectionArray = applyModel.sectionArray;
            var educationHistoryIndex = sectionArray.indexOf('educationHistory');

            if (transition.targetName === sectionArray[educationHistoryIndex + 1]) {
                var educationHistoryObjArray = [];

                applyModel.educationHistoryArray.forEach(function(eh) {
                    var educationHistoryObj = {};

                    eh.fields.forEach(function(field) {
                        educationHistoryObj[field.name] = field.value;
                    });

                    educationHistoryObjArray.addObject(educationHistoryObj);
                });

                console.log(educationHistoryObjArray);
            }
        }
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