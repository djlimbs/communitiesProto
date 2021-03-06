// Defining application controller as it automatically comes w/ currentPath which we need for navigation.
App.ApplicationController = Ember.Controller.extend({});

App.ErrorController = Ember.ObjectController.extend({});

App.OnePageController = Ember.ObjectController.extend({
    needs: ['apply', 'employmentHistory', 'educationHistory', 'projects', 'recommendations', 'recognition', 'certifications',
            'trainingDevelopment', 'publications', 'patents', 'languages', 'volunteering'],
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
                        || this.get('isProjectsIncomplete') || this.get('isRecommendationsIncomplete')
                        || this.get('isRecognitionIncomplete') || this.get('isCertificationsIncomplete')
                        || this.get('isTrainingDevelopmentIncomplete') || this.get('isPublicationsIncomplete')
                        || this.get('isPatentsIncomplete') || this.get('isLanguagesIncomplete')
                        || this.get('isVolunteeringIncomplete')
                        || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                    'isEducationHistoryIncomplete', 'isGeneralIncomplete', 'isJobSpecificIncomplete', 'isLegallyRequiredIncomplete', 
                    'isProjectsIncomplete', 'isRecommendationsIncomplete', 'isRecognitionIncomplete', 'isCertificationsIncomplete',
                    'isTrainingDevelopmentIncomplete', 'isPublicationsIncomplete', 'isPatentsIncomplete', 'isLanguagesIncomplete',
                    'isVolunteeringIncomplete', 'showSavingNotification'),
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
                var professionalSummary = null;
                var resumeBaseUrl = null;

                if (model.resume.isProfessionalSummaryEnabled) {
                    professionalSummary = model.resume.professionalSummary;
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
                                cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, false, function(resumeRes, resumeEvt) {
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
                            cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, false, function(resumeRes, resumeEvt) {
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
                } else if (model.resume.isProfessionalSummaryEnabled === true) {
                    cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, false, function(resumeRes, resumeEvt) {
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
            var projectsController = self.get('controllers.projects');
            var recommendationsController = self.get('controllers.recommendations');
            var recognitionController = self.get('controllers.recognition');
            var certificationsController = self.get('controllers.certifications');
            var trainingDevelopmentController = self.get('controllers.trainingDevelopment');
            var publicationsController = self.get('controllers.publications');
            var patentsController = self.get('controllers.patents');
            var languagesController = self.get('controllers.languages');
            var volunteeringController = self.get('controllers.volunteering');

            self.setProperties({
                errorMessage: null,
                hasStrongTag: null
            });

            saveObj.contactInfo = JSON.stringify(App.buildContactSaveObj(model));

            if (model.isSkillsEnabled) {
                saveObj.skills = JSON.stringify(App.buildSkillsSaveObj(model));
            }
            
            if (model.isEmploymentHistoryEnabled) {
                var employmentHistoryObj = App.buildEmploymentHistorySaveObj(model, employmentHistoryController, errorObj);

                /* NAMESPACE PROTO STUFF */
                employmentHistoryObj.employmentHistories.forEach(function(eh) {
                    eh.namespace_LinkedInId__c = eh.LinkedInId__c;
                });
                /**************************/

                if (employmentHistoryObj !== null) {
                    saveObj.employmentHistory = JSON.stringify(employmentHistoryObj);
                }
            }

            if (model.isEducationHistoryEnabled) {
                var educationHistoryObj = App.buildEducationHistorySaveObj(model, educationHistoryController, errorObj);

                /* NAMESPACE PROTO STUFF */
                educationHistoryObj.educationHistories.forEach(function(eh) {
                    eh.namespace_LinkedInId__c = eh.LinkedInId__c;
                });
                /**************************/

                if (educationHistoryObj !== null) {
                    saveObj.educationHistory = JSON.stringify(educationHistoryObj);
                }
            }

            saveObj.additionalInformation = {
                upsertAdditionalInformation: [],
                deleteAdditionalInformation: [],
                applicationId: appId
            };

            if (model.isProjectsEnabled) {
                var projectsObj = App.buildAdditionalInfoSaveObj('projects', model, projectsController, errorObj, false);

                if (projectsObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(projectsObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(projectsObj.deleteAdditionalInformation);
                }
            }

            if (model.isRecommendationsEnabled) {
                var recommendationsObj = App.buildAdditionalInfoSaveObj('recommendations', model, recommendationsController, errorObj, false);

                if (recommendationsObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(recommendationsObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(recommendationsObj.deleteAdditionalInformation);
                }
            }

            if (model.isRecognitionEnabled) {
                var recognitionObj = App.buildAdditionalInfoSaveObj('recognition', model, recognitionController, errorObj, true);

                if (recognitionObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(recognitionObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(recognitionObj.deleteAdditionalInformation);                }
            }

            if (model.isCertificationsEnabled) {
                var certificationsObj = App.buildAdditionalInfoSaveObj('certifications', model, certificationsController, errorObj, true);

                if (certificationsObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(certificationsObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(certificationsObj.deleteAdditionalInformation);                }
            }

            if (model.isTrainingDevelopmentEnabled) {
                var trainingDevelopmentObj = App.buildAdditionalInfoSaveObj('trainingDevelopment', model, trainingDevelopmentController, errorObj, false);

                if (trainingDevelopmentObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(trainingDevelopmentObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(trainingDevelopmentObj.deleteAdditionalInformation);                }
            }

            if (model.isPublicationsEnabled) {
                var publicationsObj = App.buildAdditionalInfoSaveObj('publications', model, publicationsController, errorObj, false);

                if (publicationsObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(publicationsObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(publicationsObj.deleteAdditionalInformation);                }
            }

            if (model.isPatentsEnabled) {
                var patentsObj = App.buildAdditionalInfoSaveObj('patents', model, patentsController, errorObj, false);

                if (patentsObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(patentsObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(patentsObj.deleteAdditionalInformation);                }
            }

            if (model.isLanguagesEnabled) {
                var languagesObj = App.buildAdditionalInfoSaveObj('languages', model, languagesController, errorObj, false);

                if (languagesObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(languagesObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(languagesObj.deleteAdditionalInformation);                }
            }

            if (model.isVolunteeringEnabled) {
                var volunteeringObj = App.buildAdditionalInfoSaveObj('volunteering', model, volunteeringController, errorObj, false);

                if (volunteeringObj !== null) {
                    saveObj.additionalInformation.upsertAdditionalInformation.addObjects(volunteeringObj.upsertAdditionalInformation);
                    saveObj.additionalInformation.deleteAdditionalInformation.addObjects(volunteeringObj.deleteAdditionalInformation);                }
            }

            /* NAMESPACE PROTO STUFF */
            saveObj.additionalInformation.upsertAdditionalInformation.forEach(function(ai) {
                Object.keys(ai).forEach(function(k) {
                    if (k.indexOf('__c') !== -1 && k.indexOf('namespace_') === -1) {
                        ai['namespace_' + k] = ai[k];
                    }
                });
            });
            /**************************/

            saveObj.additionalInformation = JSON.stringify(saveObj.additionalInformation);

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
                self.set('errorMessage', '<strong>' + labels.thereAreSomeProblemsWithYouInfo + ':</strong><br/><ul class="pad--sm--ll">' + errorObj.message + '</ul>');
                self.set('hasStrongTag', true);
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
    needs: ['application', 'contactInfo', 'resume', 'skills', 'employmentHistory', 'educationHistory', 'general', 'jobSpecific', 
                'legallyRequired', 'projects', 'recommendations', 'recognition', 'certifications', 'trainingDevelopment', 
                'publications', 'patents', 'languages', 'volunteering'],
    currentPath: function() {  
        return this.get('controllers.application.currentPath').split('.')[1];
    }.property('controllers.application.currentPath'),
    currentSectionNum: function() {
        return this.get('sectionArray').indexOf(this.get('currentPath')) + 1;
    }.property('currentPath'),
    isContactInfo: Ember.computed.equal('currentPath', 'contactInfo'),
    isLegallyRequired: Ember.computed.equal('currentPath', 'legallyRequired'),
    isFirstSection: function() {
        return this.get('currentSectionNum') === 1;
    }.property('currentSectionNum'),
    isLastSection: function() {
        return this.get('currentSectionNum') === this.get('sectionArray').length;
    }.property('currentSectionNum'),
    disableNext: function() {
        var currentPath = this.get('currentPath');
        var incompleteProperty = ('is ' + currentPath + ' incomplete').camelize();
        return this.get(incompleteProperty) || this.get('showSavingNotification') === true;
    }.property('currentPath', 'isContactInfoIncomplete', 'isResumeIncomplete', 'isSkillsIncomplete', 'isEmploymentHistoryIncomplete',
                    'isEducationHistoryIncomplete', 'isGeneralIncomplete', 'isJobSpecificIncomplete', 'isLegallyRequiredIncomplete', 
                    'isProjectsIncomplete', 'isRecommendationsIncomplete', 'isRecognitionIncomplete', 'isCertificationsIncomplete', 
                    'isTrainingDevelopmentIncomplete', 'isPublicationsIncomplete', 'isPatentsIncomplete', 'isLanguagesIncomplete', 
                    'isVolunteeringIncomplete', 'showSavingNotification'),
    disablePrevious: Ember.computed.equal('showSavingNotification', true),
    disableContactInfo: function() {
        return this.get('showSavingNotification');
    }.property('showSavingNotification'),
    disableResume: function() {
        return this.get('isContactInfoIncomplete') || this.get('showSavingNotification');
    }.property('isContactInfoIncomplete', 'showSavingNotification'),
    disableSkills: function() {
        return this.get('disableResume') || this.get('isResumeIncomplete') || this.get('showSavingNotification');
    }.property('disableResume', 'isResumeIncomplete', 'showSavingNotification'),
    disableEmploymentHistory: function() {
        return this.get('disableSkills') || this.get('isSkillsIncomplete') || this.get('showSavingNotification');
    }.property('disableSkills', 'isSkillsIncomplete', 'showSavingNotification'),
    disableEducationHistory: function() {
        return this.get('disableEmploymentHistory') || this.get('isEmploymentHistoryIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableEmploymentHistory', 'isEmploymentHistoryIncomplete','showSavingNotification'),
    disableProjects: function() {
        return this.get('disableEducationHistory')
                        || this.get('isEducationHistoryIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableEducationHistory', 'isEducationHistoryIncomplete', 'showSavingNotification'),
    disableRecommendations: function() {
        return this.get('disableProjects')
                        || this.get('isProjectsIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableProjects', 'isProjectsIncomplete', 'showSavingNotification'),
    disableRecognition: function() {
        return this.get('disableRecommendations')
                        || this.get('isRecommendationsIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableRecommendations', 'isRecommendationsIncomplete', 'showSavingNotification'),
    disableCertifications: function() {
        return this.get('disableRecognition')
                        || this.get('isRecognitionIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableRecognition', 'isRecognitionIncomplete', 'showSavingNotification'),
    disableTrainingDevelopment: function() {
        return this.get('disableCertifications')
                        || this.get('isCertificationsIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableCertifications', 'isCertificationsIncomplete', 'showSavingNotification'),
    disablePublications: function() {
        return this.get('disableTrainingDevelopment')
                        || this.get('isTrainingDevelopmentIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableTrainingDevelopment', 'isTrainingDevelopmentIncomplete', 'showSavingNotification'),
    disablePatents: function() {
        return this.get('disablePublications')
                        || this.get('isPublicationsIncomplete')
                        || this.get('showSavingNotification');
    }.property('disablePublications', 'isPublicationsIncomplete', 'showSavingNotification'),
    disableLanguages: function() {
        return this.get('disablePatents')
                        || this.get('isPatentsIncomplete')
                        || this.get('showSavingNotification');
    }.property('disablePatents', 'isPatentsIncomplete', 'showSavingNotification'),
    disableVolunteering: function() {
        return this.get('disableLanguages')
                        || this.get('isLanguagesIncomplete')
                        || this.get('showSavingNotification');
    }.property('disableLanguages', 'isLanguagesIncomplete', 'showSavingNotification'),
    disableGeneral: function() {
        return this.get('disableVolunteering') || this.get('isVolunteeringIncomplete') || this.get('showSavingNotification');
    }.property('disableVolunteering', 'isVolunteeringIncomplete', 'showSavingNotification'),
    disableJobSpecific: function() {
        return this.get('disableGeneral') || this.get('isGeneralIncomplete') || this.get('showSavingNotification');
    }.property('disableGeneral', 'isGeneralIncomplete','showSavingNotification'),
    disableLegallyRequired: function() {
        return this.get('disableJobSpecific') || this.get('isJobSpecificIncomplete') || this.get('showSavingNotification');
    }.property('disableJobSpecific', 'isJobSpecificIncomplete', 'showSavingNotification'),
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
                loginUrl += '/Apply?id%3D' + applyController.get('application').Id;// + '%26contactId%3D' + confirmObj.contactId;

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
        var professionalSummary = this.get('professionalSummary');
        var isAddResumeEnabled = this.get('isAddResumeEnabled');
        var isProfessionalSummaryEnabled = this.get('isProfessionalSummaryEnabled');

        var isResumeIncomplete = (isAddResumeEnabled === true && Ember.isEmpty(resumeFileName)) || (isProfessionalSummaryEnabled && Ember.isEmpty(professionalSummary));

        this.get('controllers.apply').set('isResumeIncomplete', isResumeIncomplete);
    }.observes('resumeFileName', 'professionalSummary'),
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
        clearProfessionalSummary: function(){
            this.set('professionalSummary', '');
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

App.AdditionalInfoFieldController = Ember.ObjectController.extend({
    isNotRequired: function() {
        return this.get('isDBRequired') !== true && this.get('isFieldSetRequired') !== true;
    }.property('isDBRequired', 'isFieldSetRequired'),
    valuesDidChange: function() {
        this.get('parentController').notifyPropertyChange('fields');
    }.observes('value')
});

App.AdditionalInfoMixin = Ember.Mixin.create({
    needs: ['apply'],
    isOnePageBinding: 'controllers.apply.isOnePage',
    isHistorySection: true,
    aIDidChenge: function() {
        var currentAis = this.get('[]');
        var incompleteFieldName = this.get('incompleteFieldName');
        var hasEmptyField = App.checkForBlankObjectFields(currentAis, this.get('allowBlankEndDates'));

        this.get('controllers.apply').set(incompleteFieldName, hasEmptyField);
    }.observes('[]', '[].@each.fields'),
    actions: {
        clickAddAI: function() {
            var blockName = this.get('blockName');
            var aiBlock = App.getObjectBlock(blockName);
            this.get('[]').addObject(aiBlock);
        },
        clickDeleteAI: function(aIToDelete) {
            var deletedArrayName = this.get('deletedArrayName');
            if (!Ember.isNone(aIToDelete.Id)) {
                this.get(deletedArrayName).addObject(aIToDelete.Id);
            }
            this.get('[]').removeObject(aIToDelete);
        }
    }
});

App.ProjectsController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'projects',
    deletedArrayName: 'deletedProjects',
    incompleteFieldName: 'isProjectsIncomplete',
    allowBlankEndDates: true,
    deletedProjects: []
});

App.RecommendationsController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'recommendations',
    deletedArrayName: 'deletedRecommendations',
    incompleteFieldName: 'isRecommendationsIncomplete',
    deletedRecommendations: []
});

App.RecognitionController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'recognition',
    deletedArrayName: 'deletedRecognitions',
    incompleteFieldName: 'isRecognitionIncomplete',
    deletedRecognitions: []
});

App.CertificationsController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'certifications',
    deletedArrayName: 'deletedCertifications',
    incompleteFieldName: 'isCertificationsIncomplete',
    allowBlankEndDates: true,
    deletedCertifications: []
});

App.TrainingDevelopmentController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'trainingDevelopment',
    deletedArrayName: 'deletedTrainingDevelopments',
    incompleteFieldName: 'isTrainingDevelopmentIncomplete',
    deletedTrainingDevelopments: []
});

App.PublicationsController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'publications',
    deletedArrayName: 'deletedPublications',
    incompleteFieldName: 'isPublicationsIncomplete',
    deletedPublications: []
});

App.PatentsController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'patents',
    deletedArrayName: 'deletedPatents',
    incompleteFieldName: 'isPatentsIncomplete',
    deletedPatents: []
});

App.LanguagesController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'languages',
    deletedArrayName: 'deletedLanguages',
    incompleteFieldName: 'isLanguagesIncomplete',
    deletedLanguages: []
});

App.VolunteeringController = Ember.ArrayController.extend(App.AdditionalInfoMixin, {
    blockName: 'volunteering',
    deletedArrayName: 'deletedVolunteerings',
    incompleteFieldName: 'isVolunteeringIncomplete',
    allowBlankEndDates: true,
    deletedVolunteerings: []
});