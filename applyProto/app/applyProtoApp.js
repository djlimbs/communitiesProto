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
    'PICKLIST' : 'picklist',
    'BOOLEAN' : 'checkbox',
    'DOUBLE' : 'telField'
};

var fieldApiNameToFieldNameMap = {
    'First_Name__c' : 'firstname',
    'Last_Name__c' : 'lastname',
    'Email__c' : 'email',
    'Mobile_Phone__c' : 'phone',
    'Street_Address__c' : 'street',
    'City__c' : 'city',
    'State_Province__c' : 'state',
    'Zip_Postal__c' : 'zip',
    'Country__c' : 'country'
};

var appFieldsToLinkedInMap = {
    'First_Name__c' : 'firstName',
    'Last_Name__c' : 'lastName',
    'Email__c' : 'emailAddress',
    'Mobile_Phone__c' : 'phoneNumbers'
};

var numberToMonthMap = {
    '1' : 'January',
    '2' : 'February',
    '3' : 'March',
    '4' : 'April',
    '5' : 'May',
    '6' : 'June',
    '7' : 'July',
    '8' : 'August',
    '9' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December'
};

var employmentHistoryBlock;
var educationHistoryBlock;

// Pull in degree picklist values
var degreePicklistValues = [];

if (!Ember.isEmpty(parsedApplyMap.educationHistoryFields) 
                        && !Ember.isNone(parsedApplyMap.educationHistoryFields.findBy('name', 'Education_Level__c'))) {
    degreePicklistValues = parsedApplyMap.educationHistoryFields.findBy('name', 'Education_Level__c').picklistValues.getEach('value');
}


function getEmploymentHistoryBlock(employmentHistoryObj) {
    if (Ember.isNone(employmentHistoryBlock)) {
        employmentHistoryBlock = {
            fields: []
        };

        parsedApplyMap.employmentHistoryFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));
            if (f.name === 'Start_Month__c' || f.name === 'End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = numberToMonthMap[pv.value];
                });
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.partial = 'yearTelField';
            } else {
                fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
            }

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

        newBlock.Id = employmentHistoryObj.Id;
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

            if (f.name === 'Start_Month__c' || f.name === 'End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = numberToMonthMap[pv.value];
                });
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.partial = 'yearTelField';
            } else {
                fieldObjWithValue.partial = fieldTypeToPartialMap[f.type];
            }
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

        newBlock.Id = educationHistoryObj.Id;
    }

    return newBlock;
}

function convertLinkedInToEducationHistoryObj(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',
            Name: e.schoolName,
            Name__c: e.schoolName,
            Status__c: null,
            Start_Month__c: !Ember.isNone(e.startDate) ? String(e.startDate.month) : null,
            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,
            End_Month__c: !Ember.isNone(e.endDate) ? String(e.endDate.month) : null,
            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null
        };
    });
}

function convertLinkedInToEmploymentHistoryObj(positions) {
    return positions.map(function(p) {
        // Positions from LinkedIn only have year and month in startDate/endDate

        return {
            Name: !Ember.isNone(p.company) ? p.company.name : null,
            Job_Title__c: p.title,
            Start_Month__c: !Ember.isNone(p.startDate) ? String(p.startDate.month) : null,
            Start_Year__c: !Ember.isNone(p.startDate) ? p.startDate.year : null,
            End_Month__c: !Ember.isNone(p.endDate) ? String(p.endDate.month) : null,
            End_Year__c: !Ember.isNone(p.endDate) ? p.endDate.year : null,
            Is_Current__c: p.isCurrent,
        };
    });
}

function createApplicantRequiredDataObj(legalFormElements) {
    return legalFormElements.map(function(fe) {
        if (!Ember.isEmpty(fe.value)) {
            return {
                Id: fe.applicantRequiredDataId,
                Application__c: appId,
                Form_Element__c: fe.Id,
                Question__c: fe.Text__c,
                Value__c: fe.value
            }
        } else {
            null;
        }
    }).compact();
}

function createApplicantResponseObj(formElements) {
    return formElements.map(function(fe) {
        if (!Ember.isEmpty(fe.value)) {
            var applicantResponseObj = {
                Id: fe.applicantResponseId,
                Application__c: appId,
                Form_Element__c: fe.Id,
                Date__c: moment().format('YYYY-MM-DD'),
                Question__c: fe.Text__c,
                Value__c: fe.value
            };

            if (!Ember.isNone(fe.Answer_Choices__r)) {
                var answerChoice = fe.Answer_Choices__r.records.findBy('Value__c', fe.value);

                applicantResponseObj.Answer_Choice__c = answerChoice.Id;
                applicantResponseObj.Score__c = answerChoice.Score__c;
            }

            return applicantResponseObj;
        } else {
            return null;
        }
    }).compact();
}

function generateRemoteActionCallback(self, successFunction, isPromise) {
    var callback = function(res, evt) {
        if (res) {
            var parsedResult = parseResult(res);

            if (Ember.isEmpty(parsedResult.errorMessages)) {
                successFunction(parsedResult);
            } else {
                console.log(parsedResult.errorMessages[0]);
            }
        } else {
            // error
        }
    };

    return callback;
}

function checkEmployedDuring(month, ranges) {
    return ranges.any(function(r) {
        var monthMs = month.valueOf();
        return monthMs >= r.startDateMs && monthMs <= r.endDateMs;
    });
}

function checkForEmploymentHistoryGaps(employmentHistoryObjArray, employmentHistoryYears) {
    var requiredHistoryLength = employmentHistoryYears * 12;
    var employmentRanges = [];
    var monthIterator = moment().startOf('month');
    var requiredLengthIterator = 0;
    var gaplessHistoryMonths = 0;
    var hasGap = false;

    employmentHistoryObjArray.forEach(function(eh) {
        var startDate = moment(eh.Start_Month__c+'/1/'+eh.Start_Year__c, 'M/D/YYYY');
        var endDate = eh.Is_Current__c === true ? moment() : moment(eh.End_Month__c+'/1/'+eh.End_Year__c, 'M/D/YYYY');

        var startDateMs = startDate.valueOf();
        var endDateMs = endDate.valueOf();

        employmentRanges.addObject({
            startDate: startDate,
            startDateMs: startDateMs,
            endDate: endDate,
            endDateMs: endDateMs
        });
    });

    do {
        if (checkEmployedDuring(monthIterator, employmentRanges) !== true) {
            hasGap = true;
        }

        monthIterator.subtract(1, 'months');
        requiredLengthIterator++;
    } while (requiredLengthIterator <= requiredHistoryLength && hasGap === false)

    return hasGap;
}

function checkForBlankEmploymentHistoryFields(currentHistory) {
    var hasEmptyField = false;

    currentHistory.getEach('fields').forEach(function(fieldArray) {
        var isCurrentField = fieldArray.findBy('name', 'Is_Current__c');
        var isCurrentChecked;
        var endDateFields = ['End_Year__c', 'End_Month__c'];

        if (!Ember.isNone(isCurrentField)) {
            isCurrentChecked = isCurrentField.value;
        }

        fieldArray.forEach(function(field) {
            if (endDateFields.indexOf(field.name) !== -1 && isCurrentChecked !== true && Ember.isEmpty(field.value)) {
                hasEmptyField = true;
            } else if (endDateFields.indexOf(field.name) === -1 && field.name !== 'Is_Current__c' && Ember.isEmpty(field.value)) {
                hasEmptyField = true;
            }
        });
    });

    return hasEmptyField;
}

function checkForBlankEducationHistoryFields(currentHistory) {
    var hasEmptyField = false;

    currentHistory.getEach('fields').forEach(function(fieldArray) {
        var statusField = fieldArray.findBy('name', 'Status__c');
        var isCurrentlyEnrolled;
        var endDateFields = ['End_Year__c', 'End_Month__c'];

        if (!Ember.isNone(statusField)) {
            isCurrentlyEnrolled = statusField.value === 'Currently Enrolled';
        }

        fieldArray.forEach(function(field) {
            if (endDateFields.indexOf(field.name) !== -1 && isCurrentlyEnrolled !== true && Ember.isEmpty(field.value)) {
                hasEmptyField = true;
            } else if (endDateFields.indexOf(field.name) === -1 && Ember.isEmpty(field.value)) {
                hasEmptyField = true;
            }
        });
    });

    return hasEmptyField;
}

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

App.Select2Component = Ember.TextField.extend({
    attributeBindings: ['multiple'],
    multiple: true,
    didInsertElement: function() {
        var self = this;
        this.$().select2({
            multiple: true,
            minimumInputLength: 3,
            query: function (query) {

                var callback = function(parsedResult) {
                    var data = {
                        results: []
                    };

                    parsedResult.data.skills.forEach(function(skill) {
                        data.results.push({
                            id: skill.Name,
                            text: skill.Name
                        });
                    });

                    query.callback(data);
                };

                cont.searchSkills(query.term, generateRemoteActionCallback(self, callback, false));
            },
            createSearchChoice: function(term, data) { 
                if ($(data).filter(function() { 
                    return this.text.localeCompare(term)===0; 
                }).length===0) {
                    return {
                        id:term, 
                        text:term
                    };
                } 
            },
            initSelection : function (element, callback) {
                var data = [];
                $(element.val().split(",")).each(function () {
                    data.push({id: this, text: this});
                });
                callback(data);
            },
            placeholder: "Choose or type skills..."
        });
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

        if (file.name !== this.get('resumeFileName')) {
            reader.readAsDataURL(input.files[0]);
        } else {
            this.set('base64fileData', null);
        }
      }
    }
});

// Controllers
// Defining application controller as it automatically comes w/ currentPath which we need for navigation.
App.ApplicationController = Ember.Controller.extend({});

App.ApplyController = Ember.ObjectController.extend({
    needs: ['application', 'legallyRequired'],
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
        console.log(incompleteProperty)
        console.log(this.get(incompleteProperty));
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
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') || this.get('isSkillsIncomplete');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete'),
    disableEducationHistory: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete');
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
        },
        clickDone: function() {
            this.get('controllers.legallyRequired').send('clickDone');
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
        
        this.get('controllers.apply').set('isResumeIncomplete', Ember.isEmpty(resumeFileName) ? true : false);
    }.observes('resumeFileName'),
    actions: {
        clickUploadFromDevice: function() {
            var fileInput = $('input[type="file"]');
            fileInput.click();
        }
    }
});

App.SkillsController = Ember.ObjectController.extend({
    needs: ['apply'],
    /*skillsDidChange: function() {
        var skills = this.get('selectedSkills');

        //this.get('controllers.apply').set('isSkillsIncomplete', Ember.isEmpty(skills) ? true : false);
    }.observes('selectedSkills')*/
});

App.EmploymentHistoryController = Ember.ArrayController.extend({
    needs: ['apply'],
    employmentHistoryYearsBinding: 'controllers.apply.employmentHistoryYears',
    employmentHistoryDidChenge: function() {
        var currentHistory = this.get('[]');
        var hasEmptyField = checkForBlankEmploymentHistoryFields(currentHistory);

        this.get('controllers.apply').set('isEmploymentHistoryIncomplete', hasEmptyField);
    }.observes('[]', '[].@each.fields'),
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

App.HistoryFieldController = Ember.ObjectController.extend({
    valuesDidChange: function() {
        this.get('parentController').notifyPropertyChange('[].@each.fields');
    }.observes('value')
});

App.EducationHistoryController = Ember.ArrayController.extend({
    needs: ['apply'],
    educationHistoryDidChenge: function() {
        var currentHistory = this.get('[]');
        var hasEmptyField = checkForBlankEducationHistoryFields(currentHistory);

        this.get('controllers.apply').set('isEducationHistoryIncomplete', hasEmptyField);
    }.observes('[]', '[].@each.fields'),
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

App.GeneralController = Ember.ArrayController.extend({
    needs: ['apply'],
    didAnswerChange: function() {
        var isGeneralIncomplete = this.get('[]').get('model').filterBy('Element_Type__c', 'Question').getEach('value').any(function(v) {
            return Ember.isNone(v) || Ember.isEmpty(v.trim());
        });

        this.get('controllers.apply').set('isGeneralIncomplete', isGeneralIncomplete); 


    }.observes('[].@each.value')
});

App.JobSpecificController = Ember.ArrayController.extend({
    needs: ['apply'],
    didAnswerChange: function() {
        var isJobSpecificIncomplete = this.get('[]').get('model').filterBy('Element_Type__c', 'Question').getEach('value').any(function(v) {
            return Ember.isNone(v) || Ember.isEmpty(v.trim());
        });

        this.get('controllers.apply').set('isJobSpecificIncomplete', isJobSpecificIncomplete); 


    }.observes('[].@each.value')
});

App.LegallyRequiredController = Ember.ArrayController.extend({
    needs: ['apply'],
    didAnswerChange: function() {
        var isLegallyRequiredIncomplete = this.get('[]').get('model').filterBy('Element_Type__c', 'Question').getEach('value').any(function(v) {
            return Ember.isNone(v) || Ember.isEmpty(v.trim());
        });

        this.get('controllers.apply').set('isLegallyRequiredIncomplete', isLegallyRequiredIncomplete); 


    }.observes('[].@each.value'),
    actions: {
        clickDone: function() {
            var formElementAnswers = this.get('[]').get('model');
            var applicantRequiredDataObj = createApplicantRequiredDataObj(formElementAnswers);
            var application = this.get('controllers.apply').get('application');
            var jobPostingId = application.Job_Posting__c;

            var callback = function(parsedResult) {
                // Use Form Element as a unique identifier since we'll never have two answer responses
                // for the same form element on an application.
                //Object.keys(parsedResult.data.feIdToARDMap).forEach(function(feId) {
                //    var aRDToUpdate = formElementAnswers.findBy('Id', feId);
                //    aRDToUpdate.applicantRequiredDataId = parsedResult.data.feIdToARDMap[feId].Id;
                //});

                window.location.href = urlPrefix + '/s/JobPosting?id=' + jobPostingId;
            };

            var legallyRequiredSaveObj = {
                applicantRequiredDatas: applicantRequiredDataObj,
                applicationId: application.Id
            };

            cont.saveApplicantRequiredData(JSON.stringify(legallyRequiredSaveObj), true, generateRemoteActionCallback(self, callback, false));
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
    }.property()
});

// Routes
App.ApplyRoute = Ember.Route.extend( {
    model: function(params) {

        var hiringModel = JSON.parse(parsedApplyMap.hiringModel.Configuration_Json__c);

        var applicationObj = {
            resume: {
                resumeFileName: null,
                base64fileData: null
            },
            companyLogoUrl: companyLogoUrl,
            sectionArray: ['contactInfo']
        };

        applicationObj.application = parsedApplyMap.application;

        var linkedInMap = parsedApplyMap.linkedInMap;

        // Setup contact info fields.
        applicationObj.contactFields = {
            nameFieldsLabel: parsedApplyMap.nameFieldsLabel,
            contactFieldsLabel: parsedApplyMap.contactFieldsLabel,
            addressFieldsLabel: parsedApplyMap.addressFieldsLabel,
            name: [],
            contact: [],
            address: []
        };

        ['name', 'contact', 'address'].forEach(function(contactSection) {
            parsedApplyMap[contactSection].forEach(function(field) {
                if (hiringModel.contactInfo[field.name] === true) {
                    field.partial = fieldTypeToPartialMap[field.type];
                    field.value = applicationObj.application[field.name];
                    field.inputName = fieldApiNameToFieldNameMap[field.name];

                    // if value from application is blank, and user is applying via linked in, pull in that info.
                    if (Ember.isEmpty(field.value) && !Ember.isNone(linkedInMap) 
                            && !Ember.isNone(appFieldsToLinkedInMap[field.name])) {

                        if (field.name === 'Mobile_Phone__c') {
                            if (!Ember.isEmpty(linkedInMap.phoneNumbers) && !Ember.isEmpty(linkedInMap.phoneNumbers.values)) {
                                var mobilePhoneNumberObj = linkedInMap.phoneNumbers.values.findBy('phoneType', 'mobile');

                                if (!Ember.isNone(mobilePhoneNumberObj)) {
                                    field.value = mobilePhoneNumberObj.phoneNumber;
                                }
                            }
                        } else {
                            field.value = linkedInMap[appFieldsToLinkedInMap[field.name]];
                        }
                    }

                    applicationObj.contactFields[contactSection].addObject(field);
                }
            });
        });

        // Setup application sections

        // Resume section
        if (hiringModel.resume.isEnabled === true) {
            applicationObj.isResumeEnabled = true;
            applicationObj.isResumeIncomplete = true;
            applicationObj.sectionArray.addObject('resume');

            if (!Ember.isEmpty(parsedApplyMap.resumeFileName)) {
                applicationObj.resume.resumeFileName = parsedApplyMap.resumeFileName;
                applicationObj.isResumeIncomplete = false;
            }
        } else {
            applicationObj.isResumeEnabled = false;
            applicationObj.isResumeIncomplete = false;
        }

        // Skills section
        if (hiringModel.skills.isEnabled === true) {
            applicationObj.isSkillsEnabled = true;
            applicationObj.isSkillsIncomplete = false;

            applicationObj.sectionArray.addObject('skills');

            applicationObj.skills = {
                selectedSkills: ''
            };

            // if we have data
            if (!Ember.isEmpty(parsedApplyMap.skills)) {
                var skillsArray = parsedApplyMap.skills.getEach('Skill__r').getEach('Name');

                applicationObj.skills.selectedSkills = skillsArray.join(',');
                applicationObj.isSkillsIncomplete = false;
            }

            // if we dont have data already but logged in via linkedin
            if (Ember.isEmpty(applicationObj.skills.selectedSkills) && !Ember.isNone(linkedInMap)
                    && !Ember.isEmpty(linkedInMap.skills)) {
                var skillsArray = [];
                linkedInMap.skills.values.forEach(function(skill) {
                    skillsArray.addObject(skill.skill.name);
                });
                applicationObj.skills.selectedSkills = skillsArray.join(',');
            }
        } else {
            applicationObj.isSkillsEnabled = false;
            applicationObj.isSkillsIncomplete = false;
        }

        // Employment History section
        if (hiringModel.employmentHistory.isEnabled === true) {
            applicationObj.isEmploymentHistoryEnabled = true;
            applicationObj.isEmploymentHistoryIncomplete = true;
            applicationObj.sectionArray.addObject('employmentHistory');

            applicationObj.employmentHistoryYears = hiringModel.employmentHistory.selectedEmploymentHistoryYears;
            applicationObj.employmentHistoryArray = [];

            if (!Ember.isEmpty(parsedApplyMap.employmentHistories)) {
                parsedApplyMap.employmentHistories.forEach(function(eh) {
                    applicationObj.employmentHistoryArray.addObject(getEmploymentHistoryBlock(eh));
                });

                // Check completeness

                var hasEmptyFields = checkForBlankEmploymentHistoryFields(applicationObj.employmentHistoryArray);
                var hasGap = checkForEmploymentHistoryGaps(parsedApplyMap.employmentHistories, applicationObj.employmentHistoryYears);
                applicationObj.isEmploymentHistoryIncomplete = hasGap || hasEmptyFields;

            }

            // if we don't have data already but have logged in via linkedin
            if (Ember.isEmpty(applicationObj.employmentHistoryArray) && !Ember.isNone(linkedInMap) 
                    && !Ember.isEmpty(linkedInMap.positions)) {
                var employmentHistoryObjs = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
                employmentHistoryObjs.forEach(function(eh) {
                    applicationObj.employmentHistoryArray.addObject(getEmploymentHistoryBlock(eh));
                });
            }  

            if (Ember.isEmpty(applicationObj.employmentHistoryArray)) {
                applicationObj.employmentHistoryArray.addObject(getEmploymentHistoryBlock());
            }
        } else {
            applicationObj.isEmploymentHistoryEnabled = false;
            applicationObj.isEmploymentHistoryIncomplete = false;
        }

        // Education History section
        if (hiringModel.educationHistory.isEnabled === true) {
            applicationObj.isEducationHistoryEnabled = true;
            applicationObj.isEducationHistoryIncomplete = true;

            applicationObj.sectionArray.addObject('educationHistory');

            applicationObj.educationHistoryArray = [];

            // if we have data already.
            if (!Ember.isEmpty(parsedApplyMap.educationHistories)) {
                parsedApplyMap.educationHistories.forEach(function(eh) {
                    applicationObj.educationHistoryArray.addObject(getEducationHistoryBlock(eh));
                });

                var hasEmptyFields = checkForBlankEducationHistoryFields(applicationObj.educationHistoryArray);

                applicationObj.isEducationHistoryIncomplete = hasEmptyFields;
            }

            // if we don't have data already but have logged in via linkedin
            if (Ember.isEmpty(applicationObj.educationHistoryArray) && !Ember.isNone(linkedInMap) 
                    && !Ember.isEmpty(linkedInMap.educations)) {
                var educationHistoryObjs = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
                educationHistoryObjs.forEach(function(eh) {
                    applicationObj.educationHistoryArray.addObject(getEducationHistoryBlock(eh));
                });
            }  

            // if we don't have any data at all.
            if (Ember.isEmpty(applicationObj.educationHistoryArray)) {
                applicationObj.educationHistoryArray.addObject(getEducationHistoryBlock());
            }
        } else {
            applicationObj.isEducationHistoryEnabled = false;
            applicationObj.isEducationHistoryIncomplete = false;
        }

        applicationObj.sectionArray.addObjects(['general', 'jobSpecific', 'legallyRequired']);

        // Check if we have general data
        applicationObj.generalFormElements = parsedApplyMap.generalFormElements;
        applicationObj.isGeneralIncomplete = true;

        if (!Ember.isEmpty(parsedApplyMap.generalApplicantResponses)) {
            parsedApplyMap.generalApplicantResponses.forEach(function(aR) {
                var feToUpdate = applicationObj.generalFormElements.findBy('Id', aR.Form_Element__c);

                if (!Ember.isNone(feToUpdate)) {
                    feToUpdate.applicantResponseId = aR.Id;
                    feToUpdate.value = aR.Value__c;
                }

            });

            if (parsedApplyMap.generalApplicantResponses.length === applicationObj.generalFormElements.length) {
                applicationObj.isGeneralIncomplete = false;
            }
        }


        // Check if we have job specific data

        applicationObj.isJobSpecificIncomplete = true;
        applicationObj.jobSpecificFormElements = parsedApplyMap.jobSpecificFormElements;

        if(!Ember.isEmpty(parsedApplyMap.jobSpecificApplicantResponses)) {
            parsedApplyMap.jobSpecificApplicantResponses.forEach(function(aR) {
                var feToUpdate = applicationObj.jobSpecificFormElements.findBy('Id', aR.Form_Element__c);

                if (!Ember.isNone(feToUpdate)) {
                    feToUpdate.applicantResponseId = aR.Id;
                    feToUpdate.value = aR.Value__c;
                }
            });

            if (parsedApplyMap.jobSpecificApplicantResponses.length === applicationObj.jobSpecificFormElements.length) {
                applicationObj.isJobSpecificIncomplete = false;
            }
        }

        // Check if we have legal data
        applicationObj.legalFormElements = parsedApplyMap.legalFormElements;
        applicationObj.isLegallyRequiredIncomplete = true;

        if(!Ember.isEmpty(parsedApplyMap.legalApplicantRequiredData)) {
            parsedApplyMap.legalApplicantRequiredData.forEach(function(aRD) {
                var feToUpdate = applicationObj.legalFormElements.findBy('Id', aRD.Form_Element__c);

                if (!Ember.isNone(feToUpdate)) {
                    feToUpdate.applicantRequiredDataId = aRD.Id;
                    feToUpdate.value = aRD.Value__c;
                }
            });

            if (parsedApplyMap.legalApplicantRequiredData.length === applicationObj.legalFormElements.length) {
                applicationObj.isLegallyRequiredIncomplete = false;
            }
        }

        applicationObj.numSections = applicationObj.sectionArray.length;

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
                Id: appId
            };

            ['name', 'contact', 'address'].forEach(function(section) {
                apply.contactFields[section].forEach(function(f) {
                    contactInfoObj[f.name] = f.value;
                });
            });

            cont.saveContactInfo(JSON.stringify(contactInfoObj), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (Ember.isEmpty(parsedResult.errorMessages)) {
                        console.log(parsedResult.data);
                    } else {
                        console.log(parsedResult.errorMessages[0]);
                    }
                } else {

                }
            });
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
            var resume = this.modelFor('resume');
            var base64String = resume.base64fileData;
            var fileName = resume.resumeFileName;

            if (!Ember.isNone(base64String)) {
                console.log('upload');
                
                cont.uploadResume(base64String, fileName, appId, function(res, evt) {
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

App.SkillsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').skills;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    },
    actions: {
        willTransition: function(transition) {
            var applyModel = this.modelFor('apply');
            var skillsModel = this.modelFor('skills');
            var selectedSkillsString = skillsModel.selectedSkills;
            var selectedSkills = [];
            
            if (!Ember.isEmpty(selectedSkillsString)) {
                selectedSkills = selectedSkillsString.split(',');
            }

            var saveObj = {
                applicationId: appId,
                skills: selectedSkills,
                flattenedSkills: selectedSkillsString.replace(/,/g, ', ')
            };

            var callback = function(parsedResult) {
                console.log(parsedResult);
            };

            cont.saveSkills(JSON.stringify(saveObj), generateRemoteActionCallback(self, callback, false));
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
            var employmentHistoryObjArray = [];
            var flattenedEmploymentHistory = '';
            var historyIsLongEnough = false;

            this.controllerFor('employmentHistory').set('errorMessage', null);

            applyModel.employmentHistoryArray.forEach(function(eh) {
                var employmentHistoryObj = {
                    Id: eh.Id,
                    eId: eh.eId,
                    Application__c: appId
                };

                eh.fields.forEach(function(field) {
                    employmentHistoryObj[field.name] = field.value;
                });

                // add employment history to flattened string
                flattenedEmploymentHistory += employmentHistoryObj.Name + '\n'
                            + employmentHistoryObj.Job_Title__c + '\n'
                            + numberToMonthMap[employmentHistoryObj.Start_Month__c] + ' ' + employmentHistoryObj.Start_Year__c + ' - ';

                if (employmentHistoryObj.Is_Current__c == true) {
                    flattenedEmploymentHistory += 'present';
                } else if (!Ember.isNone(employmentHistoryObj.End_Month__c) && !Ember.isNone(employmentHistoryObj.End_Year__c)) {
                    flattenedEmploymentHistory += numberToMonthMap[employmentHistoryObj.End_Month__c] + ' ' + employmentHistoryObj.End_Year__c;
                }

                flattenedEmploymentHistory += '\n\n';

                employmentHistoryObjArray.addObject(employmentHistoryObj);
            });

            // check months
            var hasGap = false;
            if (applyModel.employmentHistoryYears !== 0) {
                hasGap = checkForEmploymentHistoryGaps(employmentHistoryObjArray, applyModel.employmentHistoryYears);
            }

            if (hasGap === false) {
                var employmentHistoriesObj = {
                    employmentHistories: employmentHistoryObjArray,
                    appId: appId,
                    flattenedEmploymentHistory: flattenedEmploymentHistory
                };

                var successCallback = function(parsedResult) {
                    console.log(parsedResult);

                    Object.keys(parsedResult.data.eIdToEHMap).forEach(function(eId) {
                        var eHToUpdate = applyModel.employmentHistoryArray.findBy('eId', parseInt(eId));
                        eHToUpdate.Id = parsedResult.data.eIdToEHMap[eId].Id;
                    });

                    console.log(applyModel.employmentHistoryArray);
                };

                cont.saveEmploymentHistory(JSON.stringify(employmentHistoriesObj), generateRemoteActionCallback(self, successCallback, false));
            } else {
                transition.abort();
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
            var educationHistoryModel = this.modelFor('educationHistory');
            var educationHistoryObjArray = [];
            var flattenedEducationHistory = '';

            applyModel.educationHistoryArray.forEach(function(eh) {
                var educationHistoryObj = {
                    eId: eh.eId,
                    Id: eh.Id,
                    Application__c: appId
                };

                eh.fields.forEach(function(field) {
                    educationHistoryObj[field.name] = field.value;
                });

                // add education history to flattened string
                flattenedEducationHistory += educationHistoryObj.Name__c + '\n'
                            + educationHistoryObj.Education_Level__c;

                if (!Ember.isNone(educationHistoryObj.Status__c)) {
                    flattenedEducationHistory += ' (' + educationHistoryObj.Status__c + ')';
                } 
                
                flattenedEducationHistory += '\n' 
                                          + educationHistoryObj.Start_Date__c + ' - ' + educationHistoryObj.End_Date__c
                                          + '\n\n';

                educationHistoryObjArray.addObject(educationHistoryObj);
            });

            var educationHistoriesObj = {
                educationHistories: educationHistoryObjArray,
                appId: appId,
                flattenedEducationHistory: flattenedEducationHistory
            };

            var successCallback = function(parsedResult) {
                console.log(parsedResult);

                Object.keys(parsedResult.data.eIdToEHMap).forEach(function(eId) {
                    var eHToUpdate = educationHistoryModel.findBy('eId', parseInt(eId));
                    eHToUpdate.Id = parsedResult.data.eIdToEHMap[eId].Id;
                });

                console.log(applyModel.educationHistoryArray);
            };

            cont.saveEducationHistory(JSON.stringify(educationHistoriesObj), generateRemoteActionCallback(self, successCallback, false));
        }
    }
});

App.GeneralRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').generalFormElements;
    },
    actions: {
        willTransition: function(transition) {
            var formElementAnswers = this.modelFor('general');
            if (!Ember.isEmpty(formElementAnswers)) {
                var applicantResponseObj = createApplicantResponseObj(formElementAnswers);

                var callback = function(parsedResult) {
                    // Use Form Element as a unique identifier since we'll never have two answer responses
                    // for the same form element on an application.
                    Object.keys(parsedResult.data.feIdToARMap).forEach(function(feId) {
                        var aRToUpdate = formElementAnswers.findBy('Id', feId);
                        aRToUpdate.applicantResponseId = parsedResult.data.feIdToARMap[feId].Id;
                    });
                };

                var generalSaveObj = {
                    applicantResponses: applicantResponseObj
                };

                cont.saveApplicantResponses(JSON.stringify(generalSaveObj), generateRemoteActionCallback(self, callback, false));
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
            var formElementAnswers = this.modelFor('jobSpecific');
            var applicantResponseObj = createApplicantResponseObj(formElementAnswers);

            var callback = function(parsedResult) {
                // Use Form Element as a unique identifier since we'll never have two answer responses
                // for the same form element on an application.
                Object.keys(parsedResult.data.feIdToARMap).forEach(function(feId) {
                    var aRToUpdate = formElementAnswers.findBy('Id', feId);
                    aRToUpdate.applicantResponseId = parsedResult.data.feIdToARMap[feId].Id;
                });
            };

            var jobSpecificSaveObj = {
                applicantResponses: applicantResponseObj
            };

            cont.saveApplicantResponses(JSON.stringify(jobSpecificSaveObj), generateRemoteActionCallback(self, callback, false));
        }
    }
});

App.LegallyRequiredRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').legalFormElements;
    },
    actions: {
        willTransition: function(transition) {
            var formElementAnswers = this.modelFor('legallyRequired');
            var applicantRequiredDataObj = createApplicantRequiredDataObj(formElementAnswers);

            var callback = function(parsedResult) {
                // Use Form Element as a unique identifier since we'll never have two answer responses
                // for the same form element on an application.
                Object.keys(parsedResult.data.feIdToARDMap).forEach(function(feId) {
                    var aRDToUpdate = formElementAnswers.findBy('Id', feId);
                    aRDToUpdate.applicantRequiredDataId = parsedResult.data.feIdToARDMap[feId].Id;
                });
            };

            var legallyRequiredSaveObj = {
                applicantRequiredDatas: applicantRequiredDataObj
            };

            cont.saveApplicantRequiredData(JSON.stringify(legallyRequiredSaveObj), false, generateRemoteActionCallback(self, callback, false));
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
        this.resource('submit', { path: '/submit' });
    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});