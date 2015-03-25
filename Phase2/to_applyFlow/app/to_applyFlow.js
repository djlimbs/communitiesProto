// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.EID = 0;

App.Fixtures = {
    fieldTypeToPartialMap: {
        'STRING' : 'textField',
        'EMAIL' : 'textField',
        'PHONE' : 'telField',
        'TEXTAREA' : 'textArea',
        'DATE' : 'date',
        'PICKLIST' : 'picklist',
        'BOOLEAN' : 'checkbox',
        'DOUBLE' : 'telField'
    },
    fieldApiNameToFieldNameMap: {
        'First_Name__c' : 'firstname',
        'Last_Name__c' : 'lastname',
        'Email__c' : 'email',
        'Mobile_Phone__c' : 'phone',
        'Street_Address__c' : 'street',
        'City__c' : 'city',
        'State_Province__c' : 'state',
        'Zip_Postal__c' : 'zip',
        'Country__c' : 'country'
    },
    appFieldsToLinkedInMap: {
        'First_Name__c' : 'firstName',
        'Last_Name__c' : 'lastName',
        'Email__c' : 'emailAddress',
        'Mobile_Phone__c' : 'phoneNumbers'
    },
    numberToMonthMap: {
        '1' : labels.January,
        '2' : labels.February,
        '3' : labels.March,
        '4' : labels.April,
        '5' : labels.May,
        '6' : labels.June,
        '7' : labels.July,
        '8' : labels.August,
        '9' : labels.September,
        '10' : labels.October,
        '11' : labels.November,
        '12' : labels.December
    },
    degreePicklistValues: []
}

// Pull in degree picklist values

if (!Ember.isEmpty(parsedApplyMap.educationHistoryFields) 
                        && !Ember.isNone(parsedApplyMap.educationHistoryFields.findBy('name', 'Education_Level__c'))) {
    App.Fixtures.degreePicklistValues = parsedApplyMap.educationHistoryFields.findBy('name', 'Education_Level__c').picklistValues.getEach('value');
}


App.getEmploymentHistoryBlock = function(employmentHistoryObj) {
    if (Ember.isNone(App.Fixtures.employmentHistoryBlock)) {
        App.Fixtures.employmentHistoryBlock = {
            fields: []
        };

        parsedApplyMap.employmentHistoryFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));
            if (f.name === 'Start_Month__c' || f.name === 'End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.label = f.name === 'Start_Month__c' ? labels.from : labels.to;
                fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = App.Fixtures.numberToMonthMap[pv.value];
                });
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.label = '';
                fieldObjWithValue.partial = 'yearTelField';
                fieldObjWithValue.picklistValues = [];

                for (i = 1900; i <= parseInt(moment().format('YYYY')); i++) {
                    fieldObjWithValue.picklistValues.addObject(i);
                }
            } else {
                fieldObjWithValue.partial = App.Fixtures.fieldTypeToPartialMap[f.type];
            }

            App.Fixtures.employmentHistoryBlock.fields.addObject(fieldObjWithValue);
        });
    }

    var newBlock = {
        eId: ++App.EID,
        fields: []
    };
        
    App.Fixtures.employmentHistoryBlock.fields.copy(true).forEach(function(f) {
        newBlock.fields.addObject(Ember.Object.create(f));
    });

    if (!Ember.isNone(employmentHistoryObj)) {
        newBlock.fields.forEach(function(f) {
            f.set('value', employmentHistoryObj[f.name]);
        });

        newBlock.Id = employmentHistoryObj.Id;
    }

    return newBlock;
}

App.getEducationHistoryBlock = function(educationHistoryObj) {
    if(Ember.isNone(App.Fixtures.educationHistoryBlock)) {
        App.Fixtures.educationHistoryBlock = {
            fields: []
        };
    
        parsedApplyMap.educationHistoryFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));

            if (f.name === 'Start_Month__c' || f.name === 'End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.label = f.name === 'Start_Month__c' ? labels.from : labels.to;
                fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = App.Fixtures.numberToMonthMap[pv.value];
                });
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.label = '';
                fieldObjWithValue.partial = 'yearTelField';
                fieldObjWithValue.picklistValues = [];

                for (i = 1900; i <= parseInt(moment().format('YYYY')); i++) {
                    fieldObjWithValue.picklistValues.addObject(i);
                }

            } else {
                fieldObjWithValue.partial = App.Fixtures.fieldTypeToPartialMap[f.type];
            }
            App.Fixtures.educationHistoryBlock.fields.addObject(fieldObjWithValue);
        });
    }
    var newBlock = {
        eId: ++App.EID,
        fields: []
    };
        
    App.Fixtures.educationHistoryBlock.fields.copy(true).forEach(function(f) {
        newBlock.fields.addObject(Ember.Object.create(f));
    });

    if (!Ember.isNone(educationHistoryObj)) {
        newBlock.fields.forEach(function(f) {
            f.set('value', educationHistoryObj[f.name]);
        });

        newBlock.Id = educationHistoryObj.Id;
    }

    return newBlock;
}

App.convertLinkedInToEducationHistoryObj = function(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: App.Fixtures.degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',
            Name: e.schoolName,
            Status__c: null,
            Start_Month__c: !Ember.isNone(e.startDate) ? String(e.startDate.month) : null,
            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,
            End_Month__c: !Ember.isNone(e.endDate) ? String(e.endDate.month) : null,
            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null
        };
    });
}

App.convertLinkedInToEmploymentHistoryObj = function(positions) {
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

App.createApplicantRequiredDataObj = function(legalFormElements) {
    var applicantRequiredData = [];

    legalFormElements.forEach(function(fe) {
        if (fe.Answer_Type__c === 'Checkboxes') {
            var answerChoices = fe.Answer_Choices__r.records.filterBy('isChecked', true);

            answerChoices.forEach(function(ac) {
                var applicantRequiredDataObj = {
                    Application__c: appId,
                    Form_Element__c: fe.Id,
                    Question__c: fe.Text__c,
                    Value__c: ac.Value__c
                };

                applicantRequiredData.addObject(applicantRequiredDataObj);
            });
        } else if (!Ember.isEmpty(fe.value)) {
            applicantRequiredData.addObject({
                Id: fe.applicantRequiredDataId,
                Application__c: appId,
                Form_Element__c: fe.Id,
                Question__c: fe.Text__c,
                Value__c: fe.value
            });
        }
    });

    return applicantRequiredData;
}

App.createApplicantResponseObj = function(formElements) {
    var applicantResponses = [];

    formElements.forEach(function(fe) {
        if (fe.Answer_Type__c === 'Checkboxes') {
            var answerChoices = fe.Answer_Choices__r.records.filterBy('isChecked', true);

            answerChoices.forEach(function(ac) {
                var applicantResponseObj = {
                    Application__c: appId,
                    Form_Element__c: fe.Id,
                    Date__c: moment().format('YYYY-MM-DD'),
                    Question__c: fe.Text__c,
                    Value__c: ac.Value__c,
                    Answer_Choice__c: ac.Id,
                    Score__c: ac.Score__c
                };

                applicantResponses.addObject(applicantResponseObj);
            });
        } else if (!Ember.isEmpty(fe.value)) {
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

            applicantResponses.addObject(applicantResponseObj);
        }
    });

    return applicantResponses;
}

App.generateRemoteActionCallback = function(self, successFunction, isPromise, currentPath) {
    var callback = function(res, evt) {
        if (res) {
            var parsedResult = parseResult(res);

            if (Ember.isEmpty(parsedResult.errorMessages)) {
                self.controllerFor(currentPath).set('errorMessage', null);

                Ember.run.later(this, function() {
                    self.controllerFor('apply').set('showSavingNotification', false);
                }, 1000);

                if (successFunction) {
                    successFunction(parsedResult);
                }
            } else {
                self.controllerFor(currentPath).setProperties({
                    errorMessage: parsedResult.errorMessages[0],
                });
                self.controllerFor('apply').set('showSavingNotification', false);
            }
        } else {
            self.controllerFor(currentPath).setProperties({
                errorMessage: evt.message,
            });
            self.controllerFor('apply').set('showSavingNotification', false);
        }
    };

    return callback;
}

App.checkEmployedDuring = function(month, ranges) {
    return ranges.any(function(r) {
        var monthMs = month.valueOf();
        return monthMs >= r.startDateMs && monthMs <= r.endDateMs;
    });
}

App.checkForEmploymentHistoryGaps = function(employmentHistoryObjArray, employmentHistoryYears) {
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
        if (App.checkEmployedDuring(monthIterator, employmentRanges) !== true) {
            hasGap = true;
        }

        monthIterator.subtract(1, 'months');
        requiredLengthIterator++;
    } while (requiredLengthIterator <= requiredHistoryLength && hasGap === false)

    return hasGap;
}

App.checkForBlankEmploymentHistoryFields = function(currentHistory) {
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

App.checkForBlankEducationHistoryFields = function(currentHistory) {
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

var updateHeight = function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        parent.resizeIframe();
    });
};

var globalThis = this;

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

App.RadioButtonComponent = Ember.Component.extend({  
    tagName: 'input',
    attributeBindings: ['type', 'checked', 'data-qa-input'],
    type: 'radio',
    checked: function () {
        return this.get('value') == this.get('name');
    }.property('value', 'name'),
    click: function () {
        this.set('name', this.get('value'));
    }
});

App.Select2Component = Ember.TextField.extend({
    attributeBindings: ['multiple', 'data-qa-input'],
    multiple: true,
    didInsertElement: function() {
        var self = this;
        this.$().select2({
            minimumInputLength: 2,
            placeholder: labels.chooseOrTypeSkills,
            tags: [],
            formatNoMatches: labels.chooseOrTypeSkills,
            tokenSeparators: [',']
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
            var fileToUpload;
            if (e.target && e.target.result) {
                fileToUpload = e.target.result;
            }
            
            var base64String = fileToUpload.split('base64,')[1];

            self.set('resumeFileName', file.name);
            self.set('base64fileData', base64String);
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