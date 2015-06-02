// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

Ember.LinkView.reopen({
    activeClass: 'active theme-bg-color'
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
        'DOUBLE' : 'telField',
        'URL' : 'textField',
        'CURRENCY' : 'telField'
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
    monthToNumberMap: {
        'January' : 1,
        'February' : 2,
        'March' : 3,
        'April' : 4,
        'May' : 5,
        'June' : 6,
        'July' : 7,
        'August' : 8,
        'September' : 9,
        'October' : 10,
        'November': 11,
        'December' : 12
    },
    numberToMonthMap: {
        1 : 'January',
        2 : 'February',
        3 : 'March',
        4 : 'April',
        5 : 'May',
        6 : 'June',
        7 : 'July',
        8 : 'August',
        9 : 'September',
        10 : 'October',
        11 : 'November',
        12 : 'December'
    },
    degreePicklistValues: [],
    sectionToTypeMap: {
        'projects' : {
            type: 'Project',
            typeAPIName: 'Project__c',
            singleRowFields: ['Name']
        },
        'recommendations' : {
            type: 'Recommendation',
            typeAPIName: 'Recommendation__c',
            singleRowFields: []
        },
        'recognition' : {
            type: 'Recognition',
            typeAPIName: 'Recognition__c',
            singleRowFields: []
        },
        'certifications' : {
            type: 'Certification',
            typeAPIName: 'Certification__c',
            singleRowFields: ['Number__c']
        },
        'trainingDevelopment' : {
            type: 'Training Activity',
            typeAPIName: 'Training_Activity__c',
            singleRowFields: []
        },
        'publications' : {
            type: 'Publication',
            typeAPIName: 'Publication__c',
            singleRowFields: []
        },
        'patents' : {
            type: 'Patent',
            typeAPIName: 'Patent__c',
            singleRowFields: []
        },
        'languages' : {
            type: 'Language',
            typeAPIName: 'Language__c',
            singleRowFields: []
        },
        'volunteering' : {
            type: 'Volunteer Work',
            typeAPIName: 'Volunteer_Work__c',
            singleRowFields: []
        }
    }
}

// Pull in degree picklist values

if (!Ember.isEmpty(parsedApplyMap) && !Ember.isEmpty(parsedApplyMap.educationHistoryFields) 
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
                //fieldObjWithValue.picklistValues.forEach(function(pv) {
                //    pv.label = App.Fixtures.numberToMonthMap[pv.value];
                //});
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
};

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
                /*fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = App.Fixtures.numberToMonthMap[pv.value];
                });*/
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.label = '';
                fieldObjWithValue.partial = 'yearTelField';
                fieldObjWithValue.picklistValues = [];
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
};

App.getProjectBlock = function(projectObj) {
    if(Ember.isNone(App.Fixtures.projectBlock)) {
        App.Fixtures.projectBlock = {
            fields: []
        };
    
        parsedApplyMap.projectFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));

            if (f.name === 'namespace_Start_Month__c' || f.name === 'namespace_End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.label = f.name === 'Start_Month__c' ? labels.from : labels.to;
                /*fieldObjWithValue.picklistValues.forEach(function(pv) {
                    pv.label = App.Fixtures.numberToMonthMap[pv.value];
                });*/
            } else if (f.name === 'namespace_Start_Year__c' || f.name === 'namespace_End_Year__c') {
                fieldObjWithValue.label = '';
                fieldObjWithValue.partial = 'yearTelField';
                fieldObjWithValue.picklistValues = [];
            } else {
                fieldObjWithValue.partial = App.Fixtures.fieldTypeToPartialMap[f.type];
            }
            
            App.Fixtures.projectBlock.fields.addObject(fieldObjWithValue);
        });
    }
    var newBlock = {
        eId: ++App.EID,
        fields: []
    };
        
    App.Fixtures.projectBlock.fields.copy(true).forEach(function(f) {
        newBlock.fields.addObject(Ember.Object.create(f));
    });

    if (!Ember.isNone(projectObj)) {
        newBlock.fields.forEach(function(f) {
            f.set('value', projectObj[f.name]);
        });

        newBlock.Id = projectObj.Id;
    }

    return newBlock;
};

App.getRecommendationBlock = function(recommendationObj) {
    if(Ember.isNone(App.Fixtures.recommendationBlock)) {
        App.Fixtures.recommendationBlock = {
            fields: []
        };
    
        parsedApplyMap.recommendationFields.forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));

            fieldObjWithValue.partial = App.Fixtures.fieldTypeToPartialMap[f.type];
            
            App.Fixtures.projectBlock.fields.addObject(fieldObjWithValue);
        });
    }
    var newBlock = {
        eId: ++App.EID,
        fields: []
    };
        
    App.Fixtures.projectBlock.fields.copy(true).forEach(function(f) {
        newBlock.fields.addObject(Ember.Object.create(f));
    });

    if (!Ember.isNone(projectObj)) {
        newBlock.fields.forEach(function(f) {
            f.set('value', projectObj[f.name]);
        });

        newBlock.Id = projectObj.Id;
    }

    return newBlock;
};

App.getObjectBlock = function(objName, obj) {
    var blockName = (objName + ' Block').camelize();
    var fieldsName = (objName + ' Fields').camelize();

    if(Ember.isNone(App.Fixtures[blockName])) {
        App.Fixtures[blockName] = {
            fields: []
        };
    
        parsedApplyMap[fieldsName].forEach(function(f) {
            var fieldObjWithValue = JSON.parse(JSON.stringify(f));

            if (f.name === 'Start_Month__c' || f.name === 'End_Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
                fieldObjWithValue.label = f.name === 'Start_Month__c' ? labels.from : labels.to;
            } else if (f.name === 'Start_Year__c' || f.name === 'End_Year__c') {
                fieldObjWithValue.label = '';
                fieldObjWithValue.partial = 'yearTelField';
            } else if (f.name === 'Month__c') {
                fieldObjWithValue.partial = 'monthPicklist';
            } else if (f.name === 'Year__c') {
                fieldObjWithValue.partial = 'yearTelField';
            } else {
                fieldObjWithValue.partial = App.Fixtures.fieldTypeToPartialMap[f.type];
            }

            if (App.Fixtures.sectionToTypeMap[objName].singleRowFields.indexOf(f.name) !== -1) {
                fieldObjWithValue.isFullRow = true;
            }
            
            App.Fixtures[blockName].fields.addObject(fieldObjWithValue);
        });
    }
    var newBlock = {
        eId: ++App.EID,
        fields: []
    };
        
    App.Fixtures[blockName].fields.copy(true).forEach(function(f) {
        newBlock.fields.addObject(Ember.Object.create(f));
    });

    if (!Ember.isNone(obj)) {
        newBlock.fields.forEach(function(f) {
            f.set('value', obj[f.name]);
        });

        newBlock.Id = obj.Id;
    }

    return newBlock;
};

App.convertLinkedInToEducationHistoryObj = function(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: App.Fixtures.degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',
            Name: e.schoolName,
            Status__c: null,
            Start_Month__c: !Ember.isNone(e.startDate) ? App.Fixtures.numberToMonthMap[e.startDate.month] : null,
            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,
            End_Month__c: !Ember.isNone(e.endDate) ? App.Fixtures.numberToMonthMap[e.endDate.month] : null,
            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null
        };
    });
};

App.convertLinkedInToEmploymentHistoryObj = function(positions) {
    return positions.map(function(p) {
        // Positions from LinkedIn only have year and month in startDate/endDate

        return {
            Name: !Ember.isNone(p.company) ? p.company.name : null,
            Job_Title__c: p.title,
            Start_Month__c: !Ember.isNone(p.startDate) ? App.Fixtures.numberToMonthMap[p.startDate.month] : null,
            Start_Year__c: !Ember.isNone(p.startDate) ? p.startDate.year : null,
            End_Month__c: !Ember.isNone(p.endDate) ? App.Fixtures.numberToMonthMap[p.endDate.month] : null,
            End_Year__c: !Ember.isNone(p.endDate) ? p.endDate.year : null,
            Is_Current__c: p.isCurrent,
        };
    });
};

App.convertLinkedInToRecommendationObj = function(recs) {
    return recs.map(function(r) {
        return {
            Name: !Ember.isNone(r.recommender) ? r.recommender.firstName  + ' ' + r.recommender.lastName : null,
            Recommendation_Text__c: r.recommendationText,
            Recommender_Title__c : null
        };
    });
};

App.convertLinkedInToRecognitionObj = function(recs) {
    return recs.map(function(r) {
        return {
            Name: r.name,
            Description__c: r.description,
            Month__c : !Ember.isNone(r.date) ? r.date.month : null,
            Year__c : !Ember.isNone(r.date) ? r.date.year : null,
            Issuer__c : r.issuer
        };
    });
};

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
                    Value__c: ac.Value__c,
                    Answer_Choice__c: ac.Id
                };

                applicantRequiredData.addObject(applicantRequiredDataObj);
            });
        } else if (!Ember.isEmpty(fe.value)) {
            var applicantRequiredDataObj = {
                Id: fe.applicantRequiredDataId,
                Application__c: appId,
                Form_Element__c: fe.Id,
                Question__c: fe.Text__c,
                Value__c: fe.value
            };

            if (!Ember.isNone(fe.Answer_Choices__r)) { 
                var answerChoice = fe.Answer_Choices__r.records.findBy('Value__c', fe.value);

                applicantRequiredDataObj.Answer_Choice__c = answerChoice.Id;
            }

            applicantRequiredData.addObject(applicantRequiredDataObj);
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
        if (isNaN(eh.Start_Year__c) || (isNaN(eh.End_Year__c) && eh.Is_Current__c !== true)) { // if any value is invalid, break out and say there's a gap.
            return true;
        }

        var startDate = moment(eh.Start_Month__c+' 1 '+eh.Start_Year__c, 'MMMM D YYYY');
        var endDate = eh.Is_Current__c === true ? moment() : moment(eh.End_Month__c+' 1 '+eh.End_Year__c, 'MMMM D YYYY');

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
};


App.checkForBlankObjectFields = function(objects, allowBlankEndDate) {
    var hasEmptyField = false;

    var endDateFields = ['End_Month__c', 'End_Year__c', 'End_Date__c'];

    objects.getEach('fields').forEach(function(fieldArray) {
        fieldArray.forEach(function(field) {

            // Only check if allowBlankEndDate is not true, or the field is not an end date type.
            if ((allowBlankEndDate !== true && endDateFields.indexOf(field.name) !== -1) || endDateFields.indexOf(field.name) === -1) {
                if (Ember.isEmpty(field.value)) {
                    hasEmptyField = true;
                }
            }


        });
    });

    return hasEmptyField;
};

var scrollToTop = function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        var $scrollWindow = typeof parent !== "undefined" ? $(parent.window) : $(window);

        if ($scrollWindow.scrollTop() !== 0) {
            $scrollWindow.scrollTop(0);
        }
    });
};

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

App.OnePageView = Ember.View.extend({
    afterRenderEvent: function() {
        $(document).one('touchstart', function(e) {
            $('#fixZoom').focus();
        });

        if (parent && parent.toggleFooter) {
            Ember.run.later(this, function() { 
                parent.toggleFooter();
            }, 200);
        }
    }
});

App.ApplyView = Ember.View.extend({
    afterRenderEvent: function() {
        $(document).one('touchstart', function(e) {
            $('#fixZoom').focus();
        });

        if (parent && parent.toggleFooter) {
            Ember.run.later(this, function() { 
                parent.toggleFooter();
            }, 200);
        }

        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });
    }
});

App.UploadFileView = Ember.TextField.extend({
    type: 'file',
    attributeBindings: ['resumeFileName', 'alreadyUploaded', 'isFromDropbox'],
    afterRenderEvent: function() {
        var self = this;

        $('iframe#theIframe').one('load', function() {
            if (self.get('isDestroying') !== true && self.get('isDestroyed') !== true) {
                self.rerender();
            }
        });

        var $iframe = $('iframe#theIframe').contents();
        $iframe.find('.fileInput').on('change', function(evt) {
            var inputVal = $(this).val();

            if (inputVal !== '') {
                var fileName = $(this).val().split('fakepath\\')[1];
                if (fileName !== self.get('resumeFileName')) {
                    self.setProperties({
                        resumeFileName: fileName,
                        alreadyUploaded: false,
                        isFromDropbox: false
                    });

                    $iframe.find('.fileName').val(fileName);
                } else {
                    self.set('alreadyUploaded', true);
                }
            }
        });
    }
});

App.ContactInfoView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();

        var self = this;
        var contactController = this.get('controller');
        var nameValues = contactController.get('name');

        this.$().find('[data-dev="userEmail"]').on('blur', function(e) {
            var emailToSearch = e.target.value;
            var firstName = nameValues.findBy('name', 'First_Name__c').value;
            var lastName = nameValues.findBy('name', 'Last_Name__c').value;
            var lastSearchedEmail = contactController.get('lastSearchedEmail');
            
            // Check if the newly typed email matches what the user last typed. If different, verify.
            if (lastSearchedEmail !== emailToSearch) {
                canVerifyNewEmail = true;
                contactController.set('lastSearchedEmail', emailToSearch);
            } else {
                canVerifyNewEmail = false;
            }

            if (isUserLoggedIn !== true
                    && canVerifyNewEmail === true 
                    && !Ember.isEmpty(e.target.value)
                    && !Ember.isEmpty(firstName)
                    && !Ember.isEmpty(lastName)) {

                contactController.set('isVerifyingEmail', true);

                var userInfoObj = {
                    emailToSearch:  emailToSearch,
                    firstName: firstName,
                    lastName: lastName,
                    jobPostingId: contactController.get('controllers.apply').get('application').Job_Posting__c,
                    appId: appId
                };

                cont.findUserByEmail(JSON.stringify(userInfoObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);
                        var confirmObj = {
                            email: emailToSearch,
                            appId: appId
                        };

                        contactController.set('isVerifyingEmail', false);

                        if (!Ember.isEmpty(parsedResult.data.userId)) {

                            if (parsedResult.data.isLinkedInUser === true) {
                                $('#verifyLinkedInUserModal').modal();
                                scrollToTop();
                            } else {
                                $('#verifyUserModal').modal();
                                scrollToTop();
                            }

                            confirmObj.userId = parsedResult.data.userId;
                            confirmObj.contactId = parsedResult.data.contactId;
                            confirmObj.hasAppliedAlready = parsedResult.data.hasAppliedAlready;
                        } else if (!Ember.isEmpty(parsedResult.data.contactId)) {
                            $('#verifyContactModal').modal();
                            scrollToTop();
                            confirmObj.contactId = parsedResult.data.contactId;
                            confirmObj.newContactId = parsedResult.data.newContactId;
                        } else { // No matches found
                            if (!Ember.isEmpty(contactController.get('transitionTarget'))) {
                                contactController.transitionToRoute(contactController.get('transitionTarget'));
                            }
                        }

                        contactController.set('confirmObj', confirmObj);

                        console.log(parsedResult);
                        
                    } else {
                        console.log(evt);
                    }
                });
            }
        });
    }
});

App.ResumeView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.SkillsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.EmploymentHistoryView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.EducationHistoryView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.ProjectsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.RecommendationsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.RecognitionView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.CertificationsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.TrainingDevelopmentView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.PublicationsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.PatentsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.LanguagesView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.VolunteeringView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.GeneralView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.JobSpecificView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

App.LegallyRequiredView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});

// Router
App.Router.map(function() {
    this.route('application_loading');
    this.resource('onePage');
    this.resource('apply', function() {
        this.resource('contactInfo');
        this.resource('resume');
        this.resource('skills');
        this.resource('employmentHistory');
        this.resource('educationHistory');
        this.resource('projects');
        this.resource('recommendations');
        this.resource('recognition');
        this.resource('certifications');
        this.resource('trainingDevelopment');
        this.resource('publications');
        this.resource('patents');
        this.resource('languages');
        this.resource('volunteering');
        this.resource('general');
        this.resource('jobSpecific');
        this.resource('legallyRequired');
        this.resource('submit');
    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});