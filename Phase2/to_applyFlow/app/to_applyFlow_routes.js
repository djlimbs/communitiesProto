App.setupContactInfoFields = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
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
                field.partial = field.name === 'Email__c' ? 'userEmail' : App.Fixtures.fieldTypeToPartialMap[field.type];
                field.value = parsedApplyMap.application[field.name];
                field.inputName = App.Fixtures.fieldApiNameToFieldNameMap[field.name];

                // if value from application is blank, and user is applying via linked in, pull in that info.
                if (Ember.isEmpty(field.value) && !Ember.isNone(linkedInMap) 
                        && !Ember.isNone(App.Fixtures.appFieldsToLinkedInMap[field.name])) {

                    if (field.name === 'Mobile_Phone__c') {
                        if (!Ember.isEmpty(linkedInMap.phoneNumbers) && !Ember.isEmpty(linkedInMap.phoneNumbers.values)) {
                            var mobilePhoneNumberObj = linkedInMap.phoneNumbers.values.findBy('phoneType', 'mobile');

                            if (!Ember.isNone(mobilePhoneNumberObj)) {
                                field.value = mobilePhoneNumberObj.phoneNumber;
                            }
                        }
                    } else {
                        field.value = linkedInMap[App.Fixtures.appFieldsToLinkedInMap[field.name]];
                    }
                }

                applicationObj.contactFields[contactSection].addObject(field);
            }
        });
    });
};

App.setupResumeSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.resume.isEnabled === true) {
        applicationObj.resume.isAddResumeEnabled = true;
        applicationObj.isResumeIncomplete = true;
        applicationObj.sectionArray.addObject('resume');

        if (!Ember.isEmpty(parsedApplyMap.resumeFileName)) {
            applicationObj.resume.resumeFileName = parsedApplyMap.resumeFileName;
            applicationObj.resume.alreadyUploaded = true;
            applicationObj.isResumeIncomplete = false;
        }
    } else {
        applicationObj.resume.isAddResumeEnabled = false;
        applicationObj.isResumeIncomplete = false;
    }

    if (hiringModel.resume.personalStatement === true) {
        applicationObj.sectionArray.addObject('resume');
        applicationObj.resume.isPersonalStatementEnabled = true;

        if (!Ember.isEmpty(linkedInMap)) {
            applicationObj.resume.personalStatement = linkedInMap.summary.substr(0, 1500);
        } else {
            applicationObj.resume.personalStatement = parsedApplyMap.application.namespace_Personal_Statement__c;
        };

        if (Ember.isEmpty(applicationObj.resume.personalStatement)) {
            applicationObj.isResumeIncomplete = true;
        }
    } else {
        applicationObj.resume.isPersonalStatementEnabled = false;
    }

    applicationObj.isResumeEnabled = applicationObj.resume.isAddResumeEnabled || applicationObj.resume.isPersonalStatementEnabled;
};

App.setupSkillsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
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
};

App.setupEmploymentHistorySection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    // Employment History section
    if (hiringModel.employmentHistory.isEnabled === true) {
        applicationObj.isEmploymentHistoryEnabled = true;
        applicationObj.isEmploymentHistoryIncomplete = true;
        applicationObj.sectionArray.addObject('employmentHistory');

        applicationObj.employmentHistoryYears = hiringModel.employmentHistory.selectedEmploymentHistoryYears;
        applicationObj.employmentHistoryArray = [];

        if (!Ember.isEmpty(parsedApplyMap.employmentHistories)) {
            parsedApplyMap.employmentHistories.forEach(function(eh) {
                applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock(eh));
            });

            // Check completeness

            var hasEmptyFields = App.checkForBlankEmploymentHistoryFields(applicationObj.employmentHistoryArray);
            var hasGap = applicationObj.employmentHistoryYears === 0 ? false : App.checkForEmploymentHistoryGaps(parsedApplyMap.employmentHistories, applicationObj.employmentHistoryYears);
            applicationObj.isEmploymentHistoryIncomplete = hasGap || hasEmptyFields;

        }

        // if we don't have data already but have logged in via linkedin
        if (Ember.isEmpty(applicationObj.employmentHistoryArray) && !Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.positions) && !Ember.isEmpty(linkedInMap.positions.values)) {
            var employmentHistoryObjs = App.convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
            employmentHistoryObjs.forEach(function(eh) {
                applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock(eh));
            });
        }  

        if (Ember.isEmpty(applicationObj.employmentHistoryArray)) {
            applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock());
        }
    } else {
        applicationObj.isEmploymentHistoryEnabled = false;
        applicationObj.isEmploymentHistoryIncomplete = false;
    }
};

App.setupEducationHistorySection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.educationHistory.isEnabled === true) {
        applicationObj.isEducationHistoryEnabled = true;
        applicationObj.isEducationHistoryIncomplete = true;

        applicationObj.sectionArray.addObject('educationHistory');

        applicationObj.educationHistoryArray = [];

        // if we have data already.
        if (!Ember.isEmpty(parsedApplyMap.educationHistories)) {
            parsedApplyMap.educationHistories.forEach(function(eh) {
                applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock(eh));
            });

            var hasEmptyFields = App.checkForBlankEducationHistoryFields(applicationObj.educationHistoryArray);

            applicationObj.isEducationHistoryIncomplete = hasEmptyFields;
        }

        // if we don't have data already but have logged in via linkedin
        if (Ember.isEmpty(applicationObj.educationHistoryArray) && !Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.educations) && !Ember.isEmpty(linkedInMap.educations.values)) {
            var educationHistoryObjs = App.convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
            educationHistoryObjs.forEach(function(eh) {
                applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock(eh));
            });
        }  

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.educationHistoryArray)) {
            applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock());
        }
    } else {
        applicationObj.isEducationHistoryEnabled = false;
        applicationObj.isEducationHistoryIncomplete = false;
    }
};

App.setupGeneralSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    // Check if we have general data
    applicationObj.generalFormElements = parsedApplyMap.generalFormElements;
    applicationObj.isGeneralIncomplete = true;

    if (Ember.isEmpty(applicationObj.generalFormElements)) {
        applicationObj.isGeneralEmpty = true;
        applicationObj.isGeneralIncomplete = false;
    } else {
        applicationObj.sectionArray.addObject('general');
    }

    if (!Ember.isEmpty(parsedApplyMap.generalApplicantResponses)) {
        parsedApplyMap.generalApplicantResponses.forEach(function(aR) {
            var feToUpdate = applicationObj.generalFormElements.findBy('Id', aR.Form_Element__c);

            if (!Ember.isNone(feToUpdate)) {
                if (feToUpdate.Answer_Type__c === 'Checkboxes') {
                    var answerChoiceToUpdate = feToUpdate.Answer_Choices__r.records.findBy('Id', aR.Answer_Choice__c);

                    answerChoiceToUpdate.isChecked = true;
                }

                feToUpdate.applicantResponseId = aR.Id;
                feToUpdate.value = aR.Value__c;
            }

        });

        if (!applicationObj.generalFormElements.filterBy('Element_Type__c', 'Question').isAny('applicantResponseId', undefined)) {
            applicationObj.isGeneralIncomplete = false;
        }
    }
};

App.setupJobSpecificSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    applicationObj.isJobSpecificIncomplete = true;
    applicationObj.jobSpecificFormElements = parsedApplyMap.jobSpecificFormElements;

    if (Ember.isEmpty(applicationObj.jobSpecificFormElements)) {
        applicationObj.isJobSpecificEmpty = true;
        applicationObj.isJobSpecificIncomplete = false;
    } else {
        applicationObj.sectionArray.addObject('jobSpecific');
    }

    if(!Ember.isEmpty(parsedApplyMap.jobSpecificApplicantResponses)) {
        parsedApplyMap.jobSpecificApplicantResponses.forEach(function(aR) {
            var feToUpdate = applicationObj.jobSpecificFormElements.findBy('Id', aR.Form_Element__c);

            if (!Ember.isNone(feToUpdate)) {
                if (feToUpdate.Answer_Type__c === 'Checkboxes') {
                    var answerChoiceToUpdate = feToUpdate.Answer_Choices__r.records.findBy('Id', aR.Answer_Choice__c);

                    answerChoiceToUpdate.isChecked = true;
                }

                feToUpdate.applicantResponseId = aR.Id;
                feToUpdate.value = aR.Value__c;
            }
        });

        if (!applicationObj.jobSpecificFormElements.filterBy('Element_Type__c', 'Question').isAny('applicantResponseId', undefined)) {
            applicationObj.isJobSpecificIncomplete = false;
        }
    }
};

App.setupLegallyRequiredSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    applicationObj.legalFormElements = parsedApplyMap.legalFormElements;
    applicationObj.isLegallyRequiredIncomplete = true;

    if (Ember.isEmpty(applicationObj.legalFormElements)) {
        applicationObj.isLegalEmpty = true;
        applicationObj.isLegallyRequiredIncomplete = false;
    } else {
        applicationObj.sectionArray.addObject('legallyRequired');
    }

    if(!Ember.isEmpty(parsedApplyMap.legalApplicantRequiredData)) {
        parsedApplyMap.legalApplicantRequiredData.forEach(function(aRD) {
            var feToUpdate = applicationObj.legalFormElements.findBy('Id', aRD.Form_Element__c);

            if (!Ember.isNone(feToUpdate)) {
                if (feToUpdate.Answer_Type__c === 'Checkboxes') {
                    var answerChoiceToUpdate = feToUpdate.Answer_Choices__r.records.findBy('Value__c', aRD.Value__c);

                    if (!Ember.isNone(answerChoiceToUpdate)) {
                        answerChoiceToUpdate.isChecked = true;
                    }
                }
                
                feToUpdate.applicantRequiredDataId = aRD.Id;
                feToUpdate.value = aRD.Value__c;
            }
        });

        if (!applicationObj.legalFormElements.filterBy('Element_Type__c', 'Question').isAny('applicantRequiredDataId', undefined)) {
            applicationObj.isLegallyRequiredIncomplete = false;
        }
    }
};

App.buildContactSaveObj = function(application) {
    var contactInfoObj = {
        Id: appId
    };

    ['name', 'contact', 'address'].forEach(function(section) {
        application.contactFields[section].forEach(function(f) {
            contactInfoObj[f.name] = f.value;
        });
    });    

    return contactInfoObj;
};

App.buildSkillsSaveObj = function(application) {
    var selectedSkillsString = application.skills.selectedSkills;
    var selectedSkills = [];

    if (!Ember.isEmpty(selectedSkillsString)) {
        selectedSkills = selectedSkillsString.split(',');
    }

    var skillsObj = {
        applicationId: appId,
        skills: selectedSkills,
        flattenedSkills: selectedSkillsString.replace(/,/g, ', ')
    };

    return skillsObj;
};

App.buildEmploymentHistorySaveObj = function(application, employmentHistoryController, errorObj) {
    var employmentHistoryObjArray = [];
    var flattenedEmploymentHistory = '';
    var historyIsLongEnough = false;
    var isValid = true;

    application.employmentHistoryArray.forEach(function(eh) {
        var employmentHistoryObj = {
            Id: eh.Id,
            eId: eh.eId,
            Application__c: appId
        };

        var isCurrentField = eh.fields.findBy('name', 'Is_Current__c');
        var isCurrentChecked;

        if (!Ember.isNone(isCurrentField)) {
            isCurrentChecked = isCurrentField.value;
        }

        eh.fields.forEach(function(field) {

            if (field.name === 'Start_Year__c' || (field.name === 'End_Year__c' && isCurrentChecked !== true)) {
                field.set('hasError', false);

                if (isNaN(field.value)) {
                    field.set('hasError', true);
                    isValid = false;
                } else {
                    var intValue = parseInt(field.value);
                    var highestYear = parseInt(moment().format('YYYY'));

                    if (intValue < 1900 || intValue > highestYear) {
                        field.set('hasError', true);
                        isValid = false;
                    } else {
                        employmentHistoryObj[field.name] = field.value;
                    }
                }

                if (isValid === false) {
                    errorObj.message = '<li><strong>Employment History Section:</strong><br>'
                                    + '<ul class="pad--sm--ll"><li><small>'
                                    + labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                                    + labels.and + ' ' + moment().format('YYYY')
                                    + '</small></li></ul></li>';
                }
            } else {
                employmentHistoryObj[field.name] = field.value;
            }
        });

        // add employment history to flattened string
        flattenedEmploymentHistory += employmentHistoryObj.Name + '\n'
                    + employmentHistoryObj.Job_Title__c + '\n'
                    + App.Fixtures.numberToMonthMap[employmentHistoryObj.Start_Month__c] + ' ' + employmentHistoryObj.Start_Year__c + ' - ';

        if (employmentHistoryObj.Is_Current__c == true) {
            employmentHistoryObj.End_Month__c = null;
            employmentHistoryObj.End_Year__c = null;
            flattenedEmploymentHistory += labels.present;
        } else if (!Ember.isNone(employmentHistoryObj.End_Month__c) && !Ember.isNone(employmentHistoryObj.End_Year__c)) {
            flattenedEmploymentHistory += App.Fixtures.numberToMonthMap[employmentHistoryObj.End_Month__c] + ' ' + employmentHistoryObj.End_Year__c;
        }

        flattenedEmploymentHistory += '\n\n';

        employmentHistoryObjArray.addObject(employmentHistoryObj);
    });
    
    // check months
    var hasGap = false;
    if (application.employmentHistoryYears !== 0) {
        hasGap = App.checkForEmploymentHistoryGaps(employmentHistoryObjArray, application.employmentHistoryYears);
    }

    isValid = isValid && !hasGap;

    if (isValid) {

        var employmentHistoriesObj = {
            employmentHistories: employmentHistoryObjArray,
            deletedEmploymentHistories: employmentHistoryController.get('deletedEmploymentHistories'),
            appId: appId,
            flattenedEmploymentHistory: flattenedEmploymentHistory
        };

        return employmentHistoriesObj;

    } else if (!isValid) {
        
        if (hasGap) {
            var currentMonthString = App.Fixtures.numberToMonthMap[moment().format('M')] + ' ' + moment().format('YYYY');
            var earliestMonth = moment().subtract(application.employmentHistoryYears, 'years');
            var earliestMonthString = App.Fixtures.numberToMonthMap[earliestMonth.format('M')] + ' ' + earliestMonth.format('YYYY');

            if (errorObj.message === '') {
                errorObj.message = '<li><strong>Employment History Section:</strong><br>'
                                    + '<ul class="pad--sm--ll">';
            }

            errorObj.message += '<li><small>';


            errorObj.message += labels.pleaseAccountForEveryMonthBetween + ' ' 
                                + currentMonthString + ' ' + labels.and + ' ' + earliestMonthString + ' ' + labels.inclusive + '.';
        
            errorObj.message += '</small></li></ul></li>';
        }

        return null;
    }
};

App.buildEducationHistorySaveObj = function(application, educationHistoryController, errorObj) {
    var educationHistoryObjArray = [];
    var flattenedEducationHistory = '';
    var isValid = true;

    application.educationHistoryArray.forEach(function(eh) {
        var educationHistoryObj = {
            eId: eh.eId,
            Id: eh.Id,
            Application__c: appId
        };

        eh.fields.forEach(function(field) {
            if (field.name === 'Start_Year__c' || field.name === 'End_Year__c') {
                field.set('hasError', false);

                if (isNaN(field.value)) {
                    field.set('hasError', true);
                    isValid = false;
                } else {
                    var intValue = parseInt(field.value);
                    var highestYear = parseInt(moment().format('YYYY')) + 10;

                    if (intValue < 1900 || intValue > highestYear) {
                        field.set('hasError', true);
                        isValid = false;
                    } else {
                        educationHistoryObj[field.name] = Ember.isEmpty(field.value) ? null : field.value;
                    }
                }

                if (isValid === false && errorObj.message.indexOf('Education History') === -1) { // Only add error message once.
                    errorObj.message += '<li><strong>Education History:</strong><br>'
                                    + '<ul class="pad--sm--ll"><li><small>'
                                    + labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                                    + labels.and + ' ' + moment().format('YYYY')
                                    + '</small></li></ul></li>';
                }
            } else {
                educationHistoryObj[field.name] = field.value;
            }
        });

        // add education history to flattened string
        flattenedEducationHistory += educationHistoryObj.Name + '\n'
                    + educationHistoryObj.Education_Level__c;

        if (!Ember.isNone(educationHistoryObj.Status__c)) {
            flattenedEducationHistory += ' (' + educationHistoryObj.Status__c + ')';
        } 
        
        flattenedEducationHistory += '\n' 
                                  + App.Fixtures.numberToMonthMap[educationHistoryObj.Start_Month__c] + ' ' + educationHistoryObj.Start_Year__c + ' - '
                                  + App.Fixtures.numberToMonthMap[educationHistoryObj.End_Month__c] + ' ' + educationHistoryObj.End_Year__c
                                  + '\n\n';

        educationHistoryObjArray.addObject(educationHistoryObj);
    });

    if (isValid) {
        var educationHistoriesObj = {
            educationHistories: educationHistoryObjArray,
            deletedEducationHistories: educationHistoryController.get('deletedEducationHistories'),
            appId: appId,
            flattenedEducationHistory: flattenedEducationHistory
        };

        return educationHistoriesObj;
    } else if (!isValid) {

        return null;
    }
};

App.redirectAfterFinish = function(application) {
    var redirectUrl;

    if (isUserLoggedIn === true) {
        redirectUrl = parent.urlPrefix + '/JobListing?id=' + application.Job_Posting__c;
    } else {
        redirectUrl = parent.urlPrefix + '/Thanks?source=application&appId=' + application.Id;
    }

    window.parent.location.href = redirectUrl;
};

App.ApplicationLoadingRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('loading');
  }
});

App.ApplicationRoute = Ember.Route.extend({
    model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (Ember.isEmpty(applicationRedirectUrl)) {
                            console.log('a');

                var hiringModel = JSON.parse(parsedApplyMap.hiringModel.Configuration_Json__c);

                isOnePage = hiringModel.isOnePage;

                var applicationObj = {
                    resume: {
                        resumeFileName: null,
                        base64fileData: null
                    },
                    companyLogoUrl: companyLogoUrl,
                    sectionArray: ['contactInfo'],

                };

                applicationObj.application = parsedApplyMap.application;

                var linkedInMap = parsedApplyMap.linkedInMap;

                App.setupContactInfoFields(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupResumeSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupSkillsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);        
                App.setupEmploymentHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupEducationHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupGeneralSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupJobSpecificSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupLegallyRequiredSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                
                applicationObj.numSections = applicationObj.sectionArray.length;

                console.log('***MODEL');
                console.log(applicationObj);
                
                resolve(applicationObj);
            }
        });
    },
    afterModel: function(model, transition) {
        console.log('ran?');
        if (isOnePage === true) {
            this.transitionTo('onePage');
        } else {
            this.transitionTo('apply');
        }
    }
});

App.ApplyRoute = Ember.Route.extend( {
    model: function(params) {
        console.log('apply');
        return this.modelFor('application');
    },
    afterModel: function(transition) {
        if (isBackFromDropboxOauth) {
            this.transitionTo('resume');
        } else {
            this.transitionTo('contactInfo');
        }
    }
});

App.OnePageRoute = Ember.Route.extend({
    model: function(params){
        return this.modelFor('application');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set('uploadFromDropbox', isBackFromDropboxOauth);
        this.controllerFor('apply').set('model', model);
        this.controllerFor('apply').set('isOnePage', true);
        //this.controllerFor('apply').set('uploadFromDropbox', isBackFromDropboxOauth);
        //this.controllerFor('contactInfo').set('model', model.contactFields);
        console.log(model);
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
    saveContactInfo: function(transition, completeApplication) {
        var self = this;
        var apply = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');

        applyController.set('errorMessage', null);

        var successCallback = function(parsedResult) {
            if (completeApplication === true) {
                App.redirectAfterFinish(applyController.get('application'));
            } else {
                transition.retry();
            }
        };

        if (applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }

            applyController.set('showSavingNotification', true);

            var contactInfoObj = App.buildContactSaveObj(apply);

            cont.saveContactInfo(JSON.stringify(contactInfoObj), completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
        } 
    },
    actions: {
        willTransition: function(transition) {
            var isVerifyingEmail = this.controllerFor('contactInfo').get('isVerifyingEmail');

            this.controllerFor('contactInfo').set('transitionTarget', null);

            if (isVerifyingEmail) {
                this.controllerFor('contactInfo').set('transitionTarget', transition.targetName);
                transition.abort();
            } else {
                this.saveContactInfo(transition, false);
            }
        },
        clickDone: function() {
            this.saveContactInfo(null, true);
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
    uploadResume: function(transition, completeApplication) {
        var self = this;
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var resume = this.modelFor('resume');
        var resumeController = this.controllerFor('resume');
        var fileName = resume.resumeFileName;
        var alreadyUploaded = resume.alreadyUploaded;
        var $iframe = $('iframe#theIframe').contents();
        var uriEncodedFilename = encodeURIComponent(fileName);
        var resumeBaseUrl = null;
        var personalStatement = null;

        self.controllerFor(currentPath).set('errorMessage', null);

        if ((!Ember.isNone(fileName) || resume.isPersonalStatementEnabled === true) 
                        && (alreadyUploaded !== true || !Ember.isEmpty(resumeController.get('personalStatement'))) 
                        && applyController.get('showSavingNotification') !== true) {    
            if (completeApplication !== true) {
                transition.abort();
            }

            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    resumeController.set('alreadyUploaded', true);
                    transition.retry();
                }
            };

            applyController.set('showSavingNotification', true); 

            if (resume.isPersonalStatementEnabled === true) {
                personalStatement = resumeController.get('personalStatement');
            }

            if (resume.isAddResumeEnabled === true && alreadyUploaded !== true) {
                resumeBaseUrl = parsedApplyMap.baseUrl;
            }

            if (resume.isFromDropbox === true && alreadyUploaded !== true) {
                cont.createLinkAttachment(fileName, appId, function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            $iframe.find('.fileInput').off('change');
                            cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
                        } else {
                            self.setProperties({
                                errorMessage: parsedResult.errorMessages[0],
                            });
                            applyController.set('showSavingNotification', false);
                        }
                    } else {
                        self.setProperties({
                            errorMessage: evt.message,
                        });
                        applyController.set('showSavingNotification', false);
                    }
                });
            } else if (resume.isAddResumeEnabled === true && alreadyUploaded !== true) {
                $iframe.find('.fileInput').off('change');            
                $iframe.find('.saveFile').click();

                $('iframe#theIframe').one('load', function() {
                    if ($('iframe#theIframe').contents().find('.message').length > 0) {
                        var errorMessage = $('iframe#theIframe').contents().find('.message').find('li:first').text();
                        resumeController.set('errorMessage', errorMessage);
                        applyController.set('showSavingNotification', false);
                    } else {
                        cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
                    }
                });
            } else {
                cont.completeResumeSection(resumeBaseUrl, personalStatement, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
            }           
        } else {
            $iframe.find('.fileInput').off('change');
        }
    },
    actions: {
        willTransition: function(transition) {
            this.uploadResume(transition, false);
        },
        clickDone: function() {
            this.uploadResume(null, true);
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
    saveSkills: function(transition, completeApplication) {
        var self = this;
        var apply = this.controllerFor('apply');
        var currentPath = apply.get('currentPath');
        
        if (apply.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }
            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(apply.get('application'));
                } else {
                    transition.retry();
                }
            };

            apply.set('showSavingNotification', true);

            var saveObj = App.buildSkillsSaveObj(apply.get('model'));

            cont.saveSkills(JSON.stringify(saveObj), completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
        }  
    },
    actions: {
        willTransition: function(transition) {
            this.saveSkills(transition, false);   
        },
        clickDone: function() {
            this.saveSkills(null, true);
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
    saveEmploymentHistory: function(transition, completeApplication) {
        var self = this;
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var employmentHistoryObjArray = [];
        var flattenedEmploymentHistory = '';
        var historyIsLongEnough = false;
        var isValid = true;
        var sectionArray = applyModel.sectionArray;
        var currentPath = applyController.get('currentPath');
        var errorMessage = '';

        applyController.set('errorMessage', null);
        this.controllerFor(currentPath).set('errorMessage', null);

        applyModel.employmentHistoryArray.forEach(function(eh) {
            var employmentHistoryObj = {
                Id: eh.Id,
                eId: eh.eId,
                Application__c: appId
            };

            var isCurrentField = eh.fields.findBy('name', 'Is_Current__c');
            var isCurrentChecked;

            if (!Ember.isNone(isCurrentField)) {
                isCurrentChecked = isCurrentField.value;
            }

            eh.fields.forEach(function(field) {

                if (field.name === 'Start_Year__c' || (field.name === 'End_Year__c' && isCurrentChecked !== true)) {
                    field.set('hasError', false);

                    if (isNaN(field.value)) {
                        field.set('hasError', true);
                        isValid = false;
                    } else {
                        var intValue = parseInt(field.value);
                        var highestYear = parseInt(moment().format('YYYY'));

                        if (intValue < 1900 || intValue > highestYear) {
                            field.set('hasError', true);
                            isValid = false;
                        } else {
                            employmentHistoryObj[field.name] = field.value;
                        }
                    }

                    if (isValid === false) {
                        errorMessage = labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                                        + labels.and + ' ' + moment().format('YYYY');
                    }
                } else {
                    employmentHistoryObj[field.name] = field.value;
                }
            });

            // add employment history to flattened string
            flattenedEmploymentHistory += employmentHistoryObj.Name + '\n'
                        + employmentHistoryObj.Job_Title__c + '\n'
                        + App.Fixtures.numberToMonthMap[employmentHistoryObj.Start_Month__c] + ' ' + employmentHistoryObj.Start_Year__c + ' - ';

            if (employmentHistoryObj.Is_Current__c == true) {
                employmentHistoryObj.End_Month__c = null;
                employmentHistoryObj.End_Year__c = null;
                flattenedEmploymentHistory += labels.present;
            } else if (!Ember.isNone(employmentHistoryObj.End_Month__c) && !Ember.isNone(employmentHistoryObj.End_Year__c)) {
                flattenedEmploymentHistory += App.Fixtures.numberToMonthMap[employmentHistoryObj.End_Month__c] + ' ' + employmentHistoryObj.End_Year__c;
            }

            flattenedEmploymentHistory += '\n\n';

            employmentHistoryObjArray.addObject(employmentHistoryObj);
        });
        
        // check months
        var hasGap = false;
        if (applyModel.employmentHistoryYears !== 0) {
            hasGap = App.checkForEmploymentHistoryGaps(employmentHistoryObjArray, applyModel.employmentHistoryYears);
        }

        isValid = isValid && !hasGap;

        if (isValid && applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }

            applyController.set('showSavingNotification', true);

            var employmentHistoriesObj = {
                employmentHistories: employmentHistoryObjArray,
                deletedEmploymentHistories: this.controllerFor('employmentHistory').get('deletedEmploymentHistories'),
                appId: appId,
                flattenedEmploymentHistory: flattenedEmploymentHistory
            };

            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();

                    Object.keys(parsedResult.data.eIdToEHMap).forEach(function(eId) {
                        var eHToUpdate = applyModel.employmentHistoryArray.findBy('eId', parseInt(eId));
                        eHToUpdate.Id = parsedResult.data.eIdToEHMap[eId].Id;
                    });
                }
            };

            cont.saveEmploymentHistory(JSON.stringify(employmentHistoriesObj), completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
        } else if (!isValid && transition && sectionArray.indexOf(transition.targetName) > sectionArray.indexOf(currentPath)) {
            
            if (hasGap) {
                var currentMonthString = App.Fixtures.numberToMonthMap[moment().format('M')] + ' ' + moment().format('YYYY');
                var earliestMonth = moment().subtract(applyModel.employmentHistoryYears, 'years');
                var earliestMonthString = App.Fixtures.numberToMonthMap[earliestMonth.format('M')] + ' ' + earliestMonth.format('YYYY');

                if (errorMessage !== '') {
                    errorMessage += '</br>';
                }

                errorMessage += labels.pleaseAccountForEveryMonthBetween + ' ' 
                                    + currentMonthString + ' ' + labels.and + ' ' + earliestMonthString + ' ' + labels.inclusive + '.';
            }

            this.controllerFor(currentPath).set('errorMessage', errorMessage);
            transition.abort();
        } else if (!isValid) {

            if (hasGap) {
                var currentMonthString = App.Fixtures.numberToMonthMap[moment().format('M')] + ' ' + moment().format('YYYY');
                var earliestMonth = moment().subtract(applyModel.employmentHistoryYears, 'years');
                var earliestMonthString = App.Fixtures.numberToMonthMap[earliestMonth.format('M')] + ' ' + earliestMonth.format('YYYY');

                if (errorMessage !== '') {
                    errorMessage += '</br>';
                }

                errorMessage += labels.pleaseAccountForEveryMonthBetween + ' ' 
                                    + currentMonthString + ' ' + labels.and + ' ' + earliestMonthString + ' ' + labels.inclusive + '.';
            }

            this.controllerFor(currentPath).set('errorMessage', errorMessage);
        }            
        
    },
    actions: {
        clickDone: function() {
            this.saveEmploymentHistory(null, true);
        },
        willTransition: function(transition) {
            this.saveEmploymentHistory(transition, false);
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
    saveEducationHistory: function(transition, completeApplication) {
        var self = this;
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var educationHistoryModel = this.modelFor('educationHistory');
        var educationHistoryObjArray = [];
        var flattenedEducationHistory = '';
        var isValid = true;
        var sectionArray = applyModel.sectionArray;
        var currentPath = applyController.get('currentPath');
        var errorMessage = '';

        applyController.setProperties('errorMessage', null);

        applyModel.educationHistoryArray.forEach(function(eh) {
            var educationHistoryObj = {
                eId: eh.eId,
                Id: eh.Id,
                Application__c: appId
            };

            eh.fields.forEach(function(field) {
                if (field.name === 'Start_Year__c' || field.name === 'End_Year__c') {
                    field.set('hasError', false);

                    if (isNaN(field.value)) {
                        field.set('hasError', true);
                        isValid = false;
                    } else {
                        var intValue = parseInt(field.value);
                        var highestYear = parseInt(moment().format('YYYY')) + 10;

                        if (intValue < 1900 || intValue > highestYear) {
                            field.set('hasError', true);
                            isValid = false;
                        } else {
                            educationHistoryObj[field.name] = Ember.isEmpty(field.value) ? null : field.value;
                        }
                    }

                    if (isValid === false) {
                        errorMessage = labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                                        + labels.and + ' ' + moment().add(10, 'years').format('YYYY');
                    }
                } else {
                    educationHistoryObj[field.name] = field.value;
                }
            });

            // add education history to flattened string
            flattenedEducationHistory += educationHistoryObj.Name + '\n'
                        + educationHistoryObj.Education_Level__c;

            if (!Ember.isNone(educationHistoryObj.Status__c)) {
                flattenedEducationHistory += ' (' + educationHistoryObj.Status__c + ')';
            } 
            
            flattenedEducationHistory += '\n' 
                                      + App.Fixtures.numberToMonthMap[educationHistoryObj.Start_Month__c] + ' ' + educationHistoryObj.Start_Year__c + ' - '
                                      + App.Fixtures.numberToMonthMap[educationHistoryObj.End_Month__c] + ' ' + educationHistoryObj.End_Year__c
                                      + '\n\n';

            educationHistoryObjArray.addObject(educationHistoryObj);
        });

        if (isValid && applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }
            applyController.set('showSavingNotification', true);

            var educationHistoriesObj = {
                educationHistories: educationHistoryObjArray,
                deletedEducationHistories: this.controllerFor('educationHistory').get('deletedEducationHistories'),
                appId: appId,
                flattenedEducationHistory: flattenedEducationHistory
            };

            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();

                    Object.keys(parsedResult.data.eIdToEHMap).forEach(function(eId) {
                        var eHToUpdate = educationHistoryModel.findBy('eId', parseInt(eId));
                        eHToUpdate.Id = parsedResult.data.eIdToEHMap[eId].Id;
                    });
                }
            };

            cont.saveEducationHistory(JSON.stringify(educationHistoriesObj), completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
        } else if (!isValid && transition && sectionArray.indexOf(transition.targetName) > sectionArray.indexOf(currentPath)) {
            transition.abort();
            this.controllerFor(currentPath).set('errorMessage', errorMessage);
        } else if (!isValid) {
            this.controllerFor(currentPath).set('errorMessage', errorMessage);
        }
    },
    actions: {
        clickDone: function() {
            this.saveEducationHistory(null, true);
        },
        willTransition: function(transition) {
            this.saveEducationHistory(transition, false);
        }
    }
});

App.GeneralRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').generalFormElements;
    },
    saveGeneralFormElements: function(transition, completeApplication) {
        var formElementAnswers = this.modelFor('general');
        if (!Ember.isEmpty(formElementAnswers)) {
            var self = this;
            var applyController = this.controllerFor('apply');
            var currentPath = applyController.get('currentPath');
            this.controllerFor(currentPath).set('errorMessage', null);

            if (applyController.get('showSavingNotification') !== true) {
                if (completeApplication !== true) {
                    transition.abort();
                }

                var applicantResponseObj = App.createApplicantResponseObj(formElementAnswers);
                applyController.set('showSavingNotification', true);
                
                var callback = function(parsedResult) {
                    if (completeApplication === true) {
                        App.redirectAfterFinish(applyController.get('application'));
                    } else {
                        transition.retry();

                        // Use Form Element as a unique identifier since we'll never have two answer responses
                        // for the same form element on an application.
                        Object.keys(parsedResult.data.feIdToARMap).forEach(function(feId) {
                            var aRToUpdate = formElementAnswers.findBy('Id', feId);
                            aRToUpdate.applicantResponseId = parsedResult.data.feIdToARMap[feId].Id;
                        });
                    }
                };

                var generalSaveObj = {
                    applicantResponses: applicantResponseObj,
                    applicationId: appId
                };

                cont.saveApplicantResponses(JSON.stringify(generalSaveObj), completeApplication, 'General', App.generateRemoteActionCallback(self, callback, false, currentPath));
            }     
        } 
    },
    actions: {
        willTransition: function(transition) {
            this.saveGeneralFormElements(transition, false);
        },
        clickDone: function() {
            this.saveGeneralFormElements(null, true);
        }
    }
});


App.JobSpecificRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').jobSpecificFormElements;
    },
    saveJobSpecificFormElements: function(transition, completeApplication) {
        var self = this;
        var formElementAnswers = this.modelFor('jobSpecific');
        var applicantResponseObj = App.createApplicantResponseObj(formElementAnswers);
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        this.controllerFor(currentPath).set('errorMessage', null);

        if (applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }

            applyController.set('showSavingNotification', true);

            var callback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();

                    // Use Form Element as a unique identifier since we'll never have two answer responses
                    // for the same form element on an application.
                    Object.keys(parsedResult.data.feIdToARMap).forEach(function(feId) {
                        var aRToUpdate = formElementAnswers.findBy('Id', feId);
                        aRToUpdate.applicantResponseId = parsedResult.data.feIdToARMap[feId].Id;
                    });
                }
            };

            var jobSpecificSaveObj = {
                applicantResponses: applicantResponseObj,
                applicationId: appId
            };

            cont.saveApplicantResponses(JSON.stringify(jobSpecificSaveObj), completeApplication, 'Job Specific', App.generateRemoteActionCallback(self, callback, false, currentPath));
        }
    },
    actions: {
        willTransition: function(transition) {
            this.saveJobSpecificFormElements(transition, false);
        },
        clickDone: function() {
            this.saveJobSpecificFormElements(null, true);
        }
    }
});

App.LegallyRequiredRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').legalFormElements;
    },
    saveLegallyRequiredFormElements: function(transition, completeApplication) {
        var formElementAnswers = this.modelFor('legallyRequired');
        var applicantRequiredDataObj = App.createApplicantRequiredDataObj(formElementAnswers);
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var self = this;

        if (applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }            

            applyController.set('showSavingNotification', true);

            var callback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();

                    // Use Form Element as a unique identifier since we'll never have two answer responses
                    // for the same form element on an application.
                    Object.keys(parsedResult.data.feIdToARDMap).forEach(function(feId) {
                        var aRDToUpdate = formElementAnswers.findBy('Id', feId);
                        aRDToUpdate.applicantRequiredDataId = parsedResult.data.feIdToARDMap[feId].Id;
                    });
                }
            };

            var legallyRequiredSaveObj = {
                applicantRequiredDatas: applicantRequiredDataObj,
                applicationId: appId
            };

            cont.saveApplicantRequiredData(JSON.stringify(legallyRequiredSaveObj), completeApplication, App.generateRemoteActionCallback(self, callback, false, currentPath));
        }
    },
    actions: {
        willTransition: function(transition) {
            this.saveLegallyRequiredFormElements(transition, false);
        },
        clickDone: function() {
            this.saveLegallyRequiredFormElements(null, true)
        }
    }
});