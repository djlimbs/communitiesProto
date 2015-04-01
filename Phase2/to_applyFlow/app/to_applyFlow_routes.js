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

App.setupResumeSection = function(parsedApplyMap, applicationObj, hiringModel) {
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
                && !Ember.isEmpty(linkedInMap.positions)) {
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
                && !Ember.isEmpty(linkedInMap.educations)) {
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

        // Using greater than or equal because checkbox questions may have more than one response.
        if (parsedApplyMap.generalApplicantResponses.length >= applicationObj.generalFormElements.length) {
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

        // Using greater than or equal because checkbox questions may have more than one response.
        if (parsedApplyMap.jobSpecificApplicantResponses.length >= applicationObj.jobSpecificFormElements.length) {
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

        // Using greater than or equal because checkbox questions may have more than one response.
        if (parsedApplyMap.legalApplicantRequiredData.length >= applicationObj.legalFormElements.length) {
            applicationObj.isLegallyRequiredIncomplete = false;
        }
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

        App.setupContactInfoFields(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        App.setupResumeSection(parsedApplyMap, applicationObj, hiringModel);
        App.setupSkillsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);        
        App.setupEmploymentHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        App.setupEducationHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        App.setupGeneralSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        App.setupJobSpecificSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        App.setupLegallyRequiredSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
        
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
    saveContactInfo: function(transition, completeApplication) {
        var self = this;
        var apply = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var contactInfoObj = {
            Id: appId
        };

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

            ['name', 'contact', 'address'].forEach(function(section) {
                apply.contactFields[section].forEach(function(f) {
                    contactInfoObj[f.name] = f.value;
                });
            });

            cont.saveContactInfo(JSON.stringify(contactInfoObj), completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
        } 
    },
    actions: {
        willTransition: function(transition) {
            var nameValues = this.controllerFor('contactInfo').get('name');
            var contactValues = this.controllerFor('contactInfo').get('contact');
            var emailToSearch = contactValues.findBy('name', 'Email__c').value;
            var firstName = nameValues.findBy('name', 'First_Name__c').value;
            var lastName = nameValues.findBy('name', 'Last_Name__c').value;
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

        // trying to post from apex
        /*
        var applyModel = this.modelFor('apply');
        var resume = this.modelFor('resume');
        var base64String = resume.base64fileData;
        var fileName = resume.resumeFileName;

        if (!Ember.isNone(base64String)) {
            console.log('upload');
            
            af_submitFile(base64String);

            $(window).one('uploadComplete', function(e) {
                console.log('uploaded');
            });

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
        }  */

        /*   
        var self = this;
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var resume = this.modelFor('resume');
        var base64String = resume.base64fileData;
        var fileName = resume.resumeFileName;

        self.controllerFor(currentPath).set('errorMessage', null);

        if (!Ember.isNone(fileName) && applyController.get('showSavingNotification') !== true) {    
            if (completeApplication !== true) {
                transition.abort();
            }

            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();
                }
            };

            applyController.set('showSavingNotification', true); 

            var feedItem = new sforce.SObject('FeedItem');
            feedItem.ContentFileName = fileName;
            feedItem.ContentData = base64String;
            feedItem.ParentId = appId;
            feedItem.Body = '#resume';

            function success(result) {
                if (result[0].getBoolean("success")) {
                    cont.updateApplicationWithResume(result[0].id, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
                } else {
                    self.controllerFor(currentPath).set('errorMessage', result[0]);
                    applyController.set('showSavingNotification', false);
                }
            }
             
            function failed(error) {
                self.controllerFor(currentPath).set('errorMessage', error);
                applyController.set('showSavingNotification', false);
            }

            sforce.connection.create([feedItem],{onSuccess : success, onFailure : failed});
        }*/
        var self = this;
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var resume = this.modelFor('resume');
        var fileName = resume.resumeFileName;
        var alreadyUploaded = resume.alreadyUploaded;
        var $iframe = $('iframe#theIframe').contents();
        var uriEncodedFilename = encodeURIComponent(fileName);

        self.controllerFor(currentPath).set('errorMessage', null);

        if (!Ember.isNone(fileName) && alreadyUploaded !== true && applyController.get('showSavingNotification') !== true) {    
            if (completeApplication !== true) {
                transition.abort();
            }

            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();
                }
            };

            applyController.set('showSavingNotification', true); 

            if (resume.isFromDropbox === true) {
                cont.createLinkAttachment(fileName, appId, function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            $iframe.find('.123').off('change');
                            cont.createFeedItem(parsedApplyMap.baseUrl, appId, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
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
            } else {
                $iframe.find('.saveFile').click();

                $('iframe#theIframe').load(function() {
                    $iframe.find('.123').off('change');            
                    cont.createFeedItem(parsedApplyMap.baseUrl, appId, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
                });
            }

            
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
        var applyModel = this.modelFor('apply');
        var applyController = this.controllerFor('apply');
        var currentPath = applyController.get('currentPath');
        var skillsModel = this.modelFor('skills');
        var selectedSkillsString = skillsModel.selectedSkills;
        var selectedSkills = [];
        
        if (applyController.get('showSavingNotification') !== true) {
            if (completeApplication !== true) {
                transition.abort();
            }
            var successCallback = function(parsedResult) {
                if (completeApplication === true) {
                    App.redirectAfterFinish(applyController.get('application'));
                } else {
                    transition.retry();
                }
            };

            applyController.set('showSavingNotification', true);

            if (!Ember.isEmpty(selectedSkillsString)) {
                selectedSkills = selectedSkillsString.split(',');
            }

            var saveObj = {
                applicationId: appId,
                skills: selectedSkills,
                flattenedSkills: selectedSkillsString.replace(/,/g, ', ')
            };

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

                if (field.name === 'Start_Year__c' || (field.name === 'End_Year__c' && isCurrentChecked === false)) {
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