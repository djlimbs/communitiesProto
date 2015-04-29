// Defining application controller as it automatically comes w/ currentPath which we need for navigation.
App.ApplicationController = Ember.Controller.extend({});

App.OnePageController = Ember.ObjectController.extend({
    needs: ['apply', 'employmentHistory', 'educationHistory'],
    isContactInfoIncompleteBinding: 'controllers.apply.isContactInfoIncomplete', 
    isResumeIncompleteBinding: 'controllers.apply.isResumeIncomplete', 
    isSkillsIncompleteBinding: 'controllers.apply.isSkillsIncomplete', 
    isEmploymentHistoryIncompleteBinding: 'controllers.apply.isEmploymentHistoryIncomplete', 
    isEducationHistoryIncompleteBinding: 'controllers.apply.isEducationHistoryIncomplete', 
    isGeneralIncompleteBinding: 'controllers.apply.isGeneralIncomplete', 
    isJobSpecificIncompleteBinding: 'controllers.apply.isJobSpecificIncomplete', 
    isLegallyRequiredIncompleteBinding: 'controllers.apply.isLegallyRequiredIncomplete',
    disableFinish: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete') || this.get('isGeneralIncomplete') 
                        || this.get('isJobSpecificIncomplete') || this.get('isLegallyRequiredIncomplete')
                        || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                    'isEducationHistoryIncomplete', 'isGeneralIncomplete', 'isJobSpecificIncomplete', 'isLegallyRequiredIncomplete', 
                    'showSavingNotification'),
    actions: {
        clickFinish: function() {
            parent.window.scrollTo(0,0);
            this.setProperties({
                showSavingNotification: true,
                //disableFinish: true
            });

            this.saveResumeSection(this)
                .then(this.saveAppSectionsExceptResume)
                .then(this.redirectAfterFinish)
                .then(undefined, this.handleError);

        }
    },
    redirectAfterFinish: function(self) {
        var model = self.get('model');

        App.redirectAfterFinish(model.application);
    },
    saveResumeSection: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var model = self.get('model');

            if (model.isResumeEnabled !== true) {
                resolve(self);
            } else {
                var fileName = model.resume.resumeFileName;
                var alreadyUploaded = model.resume.alreadyUploaded;
                var $iframe = $('iframe#theIframe').contents();
                var personalStatement = null;
                var resumeBaseUrl = null;

                if (model.resume.isPersonalStatementEnabled) {
                    personalStatement = model.resume.personalStatement;
                }

                if (model.resume.isAddResumeEnabled === true && alreadyUploaded !== true) {
                    resumeBaseUrl = parsedApplyMap.baseUrl;
                }

                if (model.resume.isAddResumeEnabled === true && alreadyUploaded !== true && model.resume.isFromDropbox === true) {
                    cont.createLinkAttachment(fileName, appId, function(res, evt) {
                        if (res) {
                            var parsedResult = parseResult(res);

                            if (Ember.isEmpty(parsedResult.errorMessages)) {
                                $iframe.find('.fileInput').off('change');
                                cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, false, function(resumeRes, resumeEvt) {
                                    if (resumeRes) {
                                        var parsedResumeResult = parseResult(resumeRes);

                                        if (Ember.isEmpty(parsedResumeResult.errorMessages)) {
                                            self.set('resume.alreadyUploaded', true);
                                            resolve(self);
                                        } else {
                                            self.set('errorMessage', parsedResumeResult.errorMessages[0]);
                                            reject(self);
                                        }
                                    }
                                });
                            } else {
                                self.set('errorMessage', parsedResult.errorMessages[0])
                                reject(self);
                            }
                        } else {
                            self.set('errorMessage', evt.message);
                            reject(self);
                        }
                    });
                } else if (model.resume.isAddResumeEnabled === true && alreadyUploaded !== true) {
                    $iframe.find('.fileInput').off('change');            
                    $iframe.find('.saveFile').click();

                    $('iframe#theIframe').one('load', function() {
                        if ($('iframe#theIframe').contents().find('.message').length > 0) {
                            var errorMessage = $('iframe#theIframe').contents().find('.message').find('li:first').text();
                            self.set('errorMessage', errorMessage);
                            reject(self);
                        } else {
                            cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, false, function(resumeRes, resumeEvt) {
                                if (resumeRes) {
                                    var parsedResumeResult = parseResult(resumeRes);

                                    if (Ember.isEmpty(parsedResumeResult.errorMessages)) {
                                        self.set('resume.alreadyUploaded', true);
                                        resolve(self);
                                    } else {
                                        self.set('errorMessage', parsedResumeResult.errorMessages[0])
                                        reject(self);
                                    }
                                }
                            });
                        }
                    });
                } else if (model.resume.isPersonalStatementEnabled === true) {
                    cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, false, function(resumeRes, resumeEvt) {
                        if (resumeRes) {
                            var parsedResumeResult = parseResult(resumeRes);

                            if (Ember.isEmpty(parsedResumeResult.errorMessages)) {
                                resolve(self);
                            } else {
                                self.set('errorMessage', parsedResumeResult.errorMessages[0])
                                reject(self);
                            }
                        }
                    });
                } else {
                    resolve(self);
                }
            }            
        });
    },
    saveAppSectionsExceptResume: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var model = self.get('model');
            var errorObj = {
                message: ''
            };
            var saveObj = {};
            var employmentHistoryController = self.get('controllers.employmentHistory');
            var educationHistoryController = self.get('controllers.educationHistory');

            self.set('errorMessage', null);

            saveObj.contactInfo = JSON.stringify(App.buildContactSaveObj(model));

            if (model.isSkillsEnabled) {
                saveObj.skills = App.buildSkillsSaveObj(model);
            }
            
            if (model.isEmploymentHistoryEnabled) {
                var employmentHistoryObj = App.buildEmploymentHistorySaveObj(model, employmentHistoryController, errorObj);

                if (employmentHistoryObj !== null) {
                    saveObj.employmentHistory = JSON.stringify(employmentHistoryObj);
                }
            }

            if (model.isEducationHistoryEnabled) {
                var educationHistoryObj = App.buildEducationHistorySaveObj(model, educationHistoryController, errorObj);

                if (educationHistoryObj !== null) {
                    saveObj.educationHistory = JSON.stringify(educationHistoryObj);
                }
            }

            if (model.isGeneralEmpty !== true) {  
                saveObj.generalApplicantResponses = JSON.stringify({
                    applicantResponses: App.createApplicantResponseObj(model.generalFormElements),
                    applicationId: appId
                });
            }

            if (model.isJobSpecificEmpty !== true) {
                saveObj.jobSpecificApplicantResponses = JSON.stringify({
                    applicantResponses: App.createApplicantResponseObj(model.jobSpecificFormElements),
                    applicationId: appId
                });
            }

            if (model.isLegalEmpty !== true) {
                saveObj.legalApplicantRequiredData = JSON.stringify({
                    applicantRequiredDatas: App.createApplicantRequiredDataObj(model.legalFormElements),
                    applicationId: appId
                });
            }

            if (!Ember.isEmpty(errorObj.message)) {
                self.set('errorMessage', 'There are some problems with your information: <br/><br/>' + errorObj.message);
                reject(self);
            } else {
                cont.saveAppSectionsExceptResume(JSON.stringify(saveObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            resolve(self);
                        } else {
                            self.set('errorMessage', parsedResult.errorMessages[0]);
                            reject(self);
                        }
                    } else {

                    }
                });
            } 
        });
    },
    handleError: function(self) {
        console.log(self);
        self.setProperties({
            showSavingNotification: false,
            //disableFinish: false
        });
    }
});

App.ApplyController = Ember.ObjectController.extend({
    needs: ['application', 'contactInfo', 'resume', 'skills', 'employmentHistory', 'educationHistory', 'general', 'jobSpecific', 'legallyRequired'],
    currentPath: function() {  
        return this.get('controllers.application.currentPath').split('.')[1];
    }.property('controllers.application.currentPath'),
    currentSectionNum: function() {
        return this.get('sectionArray').indexOf(this.get('currentPath')) + 1;
    }.property('currentPath'),
    isContactInfo: Ember.computed.equal('currentPath', 'contactInfo'),
    isLegallyRequired: Ember.computed.equal('currentPath', 'legallyRequired'),
    isLastSection: function() {
        return this.get('currentSectionNum') === this.get('sectionArray').length;
    }.property('currentSectionNum'),
    disableNext: function() {
        var currentPath = this.get('currentPath');
        var incompleteProperty = ('is ' + currentPath + ' incomplete').camelize();
        return this.get(incompleteProperty) || this.get('showSavingNotification') === true;
    }.property('currentPath', 'isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                    'isEducationHistoryIncomplete', 'isGeneralIncomplete', 'isJobSpecificIncomplete', 'isLegallyRequiredIncomplete', 
                    'showSavingNotification'),
    disablePrevious: Ember.computed.equal('showSavingNotification', true),
    disableContactInfo: function() {
        return this.get('showSavingNotification');
    }.property('showSavingNotification'),
    disableResume: function() {
        return this.get('isContactInfoIncomplete') || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'showSavingNotification'),
    disableSkills: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'showSavingNotification'),
    disableEmploymentHistory: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') || this.get('isSkillsIncomplete')
                    || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'showSavingNotification'),
    disableEducationHistory: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                'showSavingNotification'),
    disableGeneral: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                       || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                       || this.get('isEducationHistoryIncomplete') || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete', 'showSavingNotification'),
    disableJobSpecific: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete') || this.get('isGeneralIncomplete')
                        || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete', 'isGeneralIncomplete', 
                            'showSavingNotification'),
    disableLegallyRequired: function() {
        return this.get('isContactInfoIncomplete') || this.get('isResumeIncomplete') 
                        || this.get('isSkillsIncomplete') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('isEducationHistoryIncomplete') || this.get('isGeneralIncomplete') 
                        || this.get('isJobSpecificIncomplete') || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 
                            'isEmploymentHistoryIncomplete', 'isEducationHistoryIncomplete', 
                            'isGeneralIncomplete', 'isJobSpecificIncomplete', 'showSavingNotification'),
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

            var prevPath = sectionArray[sectionArray.indexOf(currentPath) - 1];

            this.transitionToRoute(prevPath);
        },
        clickDone: function() {
            var currentPath = this.get('currentPath');
            var controllerPath = 'controllers.' + currentPath;
            this.get(controllerPath).send('clickDone');
        }
    }

});

App.ContactInfoController = Ember.ObjectController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
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
    }.observes('name.@each.value', 'address.@each.value', 'contact.@each.value'),
    actions: {
        clickVerifyEmail: function() {
            var self = this;
            var confirmObj = this.get('confirmObj');
            var contactInfoObj = {
                Id: appId,
                Contact__c: confirmObj.newContactId
            };

            ['name', 'contact', 'address'].forEach(function(section) {
                self.get(section).forEach(function(f) {
                    contactInfoObj[f.name] = f.value;
                });
            });

            cont.saveContactInfo(JSON.stringify(contactInfoObj), false, function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('errorMessage', null);
                        
                        cont.sendVerifyEmail(confirmObj.contactId, confirmObj.appId, function(res, evt) {
                            if (res) {
                                var parsedResult = parseResult(res);
                                
                                if (parsedResult.isSuccess === true) {

                                    if (self.get('isResendingEmail') === true) {
                                        self.set('isResendingEmail', false);
                                    } else {
                                        $('#emailSentModal').modal();
                                    }
                                }
                                
                            } else {
                                self.setProperties({
                                    errorMessage: evt.message,
                                });
                            }
                        });
                    } else {
                        self.setProperties({
                            errorMessage: parsedResult.errorMessages[0],
                        });
                    }
                } else {
                    self.setProperties({
                        errorMessage: evt.message,
                    });
                }
            });

        },
        clickLogin: function() {
            var self = this;
            var confirmObj = this.get('confirmObj');
            var applyController = this.get('controllers.apply');
            var loginUrl = parent.urlPrefix + '/Login?startURL=' + parent.urlPrefix;
            var contactInfoObj = {
                Id: appId,
                Contact__c: confirmObj.contactId
            };

            if (confirmObj.hasAppliedAlready === true) {
                loginUrl += '/JobListing?id%3D' + applyController.get('application').Job_Posting__c;
                window.parent.location.href = loginUrl;

            } else {
                loginUrl += '/Apply?id%3D' + applyController.get('application').Id + '%26contactId%3D' + confirmObj.contactId;

                ['name', 'contact', 'address'].forEach(function(section) {
                    self.get(section).forEach(function(f) {
                        contactInfoObj[f.name] = f.value;
                    });
                });

                cont.saveContactInfo(JSON.stringify(contactInfoObj), false, function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            self.set('errorMessage', null);
                            
                            window.parent.location.href = loginUrl;
                        } else {
                            self.setProperties({
                                errorMessage: parsedResult.errorMessages[0],
                            });
                        }
                    } else {
                        self.setProperties({
                            errorMessage: evt.message,
                        });
                    }
                });
            }

        },
        clickResendEmail: function() {
            this.set('isResendingEmail', true);
            this.send('clickVerifyEmail');
        },
        clickNo: function() {
            //canVerifyNewEmail = false;
            this.set('isVerifyingEmail', false);
        }
    }
});

App.ResumeController = Ember.ObjectController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    errorMessageBinding: 'controllers.apply.errorMessage',
    fileToUploadDidChange: function() {
        var resumeFileName = this.get('resumeFileName');
        var personalStatement = this.get('personalStatement');
        var isAddResumeEnabled = this.get('isAddResumeEnabled');
        var isPersonalStatementEnabled = this.get('isPersonalStatementEnabled');

        var isResumeIncomplete = (isAddResumeEnabled === true && Ember.isEmpty(resumeFileName)) || (isPersonalStatementEnabled && Ember.isEmpty(personalStatement));

        this.get('controllers.apply').set('isResumeIncomplete', isResumeIncomplete);
    }.observes('resumeFileName', 'personalStatement'),
    actions: {
        clickUploadFromDevice: function() {
            var fileInput = $('iframe#theIframe').contents().find('input.fileInput');
            fileInput.click();
        },
        clickUploadFromDropbox: function(){
            var self = this;
            var currentFileName = this.get('resumeFileName');
            Dropbox.choose({
                success: function(file){
                    $('iframe#theIframe').contents().find('.fileInput').val('');
                    self.set('resumeFileName', file[0].link);
                    self.set('isFromDropbox', true);
                    self.set('alreadyUploaded', false);
                },
                linktype : 'preview',
                multiselect : false,
                extensions : ['.pdf', '.doc', '.docx']
            });
        },
        clearPersonalStatement: function(){
            this.set('personalStatement', '');
        }
    }
});

App.SkillsController = Ember.ObjectController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage'
});

App.EmploymentHistoryController = Ember.ArrayController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    employmentHistoryYearsBinding: 'controllers.apply.employmentHistoryYears',
    deletedEmploymentHistories: [],
    doesNotRequireGaplessYears: Ember.computed.equal('employmentHistoryYears', 0),
    isHistorySection: true,
    employmentHistoryDidChenge: function() {
        var currentHistory = this.get('[]');
        var hasEmptyField = App.checkForBlankEmploymentHistoryFields(currentHistory);

        this.get('controllers.apply').set('isEmploymentHistoryIncomplete', hasEmptyField);
    }.observes('[]', '[].@each.fields'),
    actions: {
        clickAddEmploymentHistory: function() {
            var employmentHistoryBlock = App.getEmploymentHistoryBlock();
            this.get('[]').addObject(employmentHistoryBlock);
        },
        clickDeleteEmploymentHistory: function(employmentHistoryToDelete) {
            console.log('clicked');
            if (!Ember.isNone(employmentHistoryToDelete.Id)) {
                this.get('deletedEmploymentHistories').addObject(employmentHistoryToDelete.Id);
            }
            this.get('[]').removeObject(employmentHistoryToDelete);
        }
    }
});

App.HistoryFieldController = Ember.ObjectController.extend({
    valuesDidChange: function() {
        this.get('parentController').notifyPropertyChange('fields');
    }.observes('value'),
    isCurrentChanged: function() {
        if (this.get('name') === 'Is_Current__c') {
            this.get('parentController').set('isCurrentChecked', this.get('value'));
        }
    }.observes('name', 'value').on('init'),
    shouldDisableEndDateFields: function() {
        return ['End_Month__c', 'End_Year__c'].indexOf(this.get('name')) !== -1 && this.get('parentController.isCurrentChecked') === true ? 'disabled' : false;
    }.property('name', 'parentController.isCurrentChecked')
});

App.HistoryBlockController = Ember.ObjectController.extend({
    fieldDidChange: function() {
        this.get('parentController').notifyPropertyChange('[].@each.fields');
    }.observes('fields'),
});

App.EducationHistoryController = Ember.ArrayController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    deletedEducationHistories: [],
    isHistorySection: true,
    educationHistoryDidChenge: function() {
        var currentHistory = this.get('[]');
        var hasEmptyField = App.checkForBlankEducationHistoryFields(currentHistory);

        this.get('controllers.apply').set('isEducationHistoryIncomplete', hasEmptyField);
    }.observes('[]', '[].@each.fields'),
    actions: {
        clickAddEducationHistory: function() {
            var educationHistoryBlock = App.getEducationHistoryBlock();
            this.get('[]').addObject(educationHistoryBlock);
        },
        clickDeleteEducationHistory: function(educationHistoryToDelete) {
            if (!Ember.isNone(educationHistoryToDelete.Id)) {
                this.get('deletedEducationHistories').addObject(educationHistoryToDelete.Id);
            }
            this.get('[]').removeObject(educationHistoryToDelete);
        }
    }
});

App.GeneralController = Ember.ArrayController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    didAnswerChange: function() {
        var isGeneralIncomplete = false;

        this.get('[]').get('model').filterBy('Element_Type__c', 'Question').forEach(function(fe) {
            if (fe.Answer_Type__c === 'Checkboxes' && Ember.isEmpty(fe.Answer_Choices__r.records.filterBy('isChecked', true))) {
                isGeneralIncomplete = true;
            } else if (fe.Answer_Type__c !== 'Checkboxes' && (Ember.isNone(fe.value) || Ember.isEmpty(fe.value.trim()))) {
                isGeneralIncomplete = true;
            }
        });
            
        this.get('controllers.apply').set('isGeneralIncomplete', isGeneralIncomplete); 

    }.observes('[].@each.value').on('init')
});

App.JobSpecificController = Ember.ArrayController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    didAnswerChange: function() {
        var isJobSpecificIncomplete = false;

        this.get('[]').get('model').filterBy('Element_Type__c', 'Question').forEach(function(fe) {
            if (fe.Answer_Type__c === 'Checkboxes' && Ember.isEmpty(fe.Answer_Choices__r.records.filterBy('isChecked', true))) {
                isJobSpecificIncomplete = true;
            } else if (fe.Answer_Type__c !== 'Checkboxes' && (Ember.isNone(fe.value) || Ember.isEmpty(fe.value.trim()))) {
                isJobSpecificIncomplete = true;
            }
        });
        this.get('controllers.apply').set('isJobSpecificIncomplete', isJobSpecificIncomplete); 

    }.observes('[].@each.value').on('init')
});

App.LegallyRequiredController = Ember.ArrayController.extend({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    didAnswerChange: function() {
        var isLegallyRequiredIncomplete = false;

        this.get('[]').get('model').filterBy('Element_Type__c', 'Question').forEach(function(fe) {
            if (fe.Answer_Type__c === 'Checkboxes' && Ember.isEmpty(fe.Answer_Choices__r.records.filterBy('isChecked', true))) {
                isLegallyRequiredIncomplete = true;
            } else if (fe.Answer_Type__c !== 'Checkboxes' && (Ember.isNone(fe.value) || Ember.isEmpty(fe.value.trim()))) {
                isLegallyRequiredIncomplete = true;
            }
        });

        this.get('controllers.apply').set('isLegallyRequiredIncomplete', isLegallyRequiredIncomplete); 
    }.observes('[].@each.value').on('init')
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
    didCheckboxChange: function() {
        this.get('parentController').notifyPropertyChange('[].@each.value');
    }.observes('answerChoices.@each.isChecked')
});