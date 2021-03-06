App.setupContactInfoFields = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    applicationObj.showSavingNotification = false;
    //if (isInternal === true) {
    //    applicationObj.isContactInfoEnabled = false;
    //    applicationObj.isContactInfoIncomplete = false;
    //} else {
        applicationObj.isContactInfoEnabled = true;
        applicationObj.sectionArray.addObject('contactInfo');

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
    //}    
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

    if (hiringModel.resume.professionalSummary === true) {
        applicationObj.sectionArray.addObject('resume');
        applicationObj.resume.isProfessionalSummaryEnabled = true;

        if (!Ember.isEmpty(linkedInMap)) {
            applicationObj.resume.professionalSummary = linkedInMap.summary.substr(0, 1500);
        } else {
            applicationObj.resume.professionalSummary = parsedApplyMap.application.Professional_Summary__c;
        };

        if (Ember.isEmpty(applicationObj.resume.professionalSummary)) {
            applicationObj.isResumeIncomplete = true;
        }

        if (applicationObj.resume.isAddResumeEnabled !== true) {
            labels.resumeHeader = labels.professionalSummary;
        }
    } else {
        applicationObj.resume.isProfessionalSummaryEnabled = false;
    }

    applicationObj.isResumeEnabled = applicationObj.resume.isAddResumeEnabled || applicationObj.resume.isProfessionalSummaryEnabled;
};

App.setupSkillsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.skills.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isSkillsEnabled = true;
        applicationObj.isSkillsIncomplete = false;

        applicationObj.sectionArray.addObject('skills');

        applicationObj.skills = {
            selectedSkills: ''
        };
        var skillsArray = [];
        
        // Linkedin
        var linkedInIds = [];
        var linkedInSkills = [];

        if (!Ember.isNone(linkedInMap) && !Ember.isEmpty(linkedInMap.skills)) {
            linkedInMap.skills.values.forEach(function(skill) {
                skillsArray.addObject(skill.skill.name);
                linkedInIds.addObject(skill.id);
                linkedInSkills.addObject(skill.skill.name);
            });
        }

        // if we have data
        if (!Ember.isEmpty(parsedApplyMap.skills)) {
            var existingLinkedInSkills = parsedApplyMap.skills.filterBy('IsLinkedIn__c', true);
            if (!Ember.isEmpty(existingLinkedInSkills)) {
                linkedInSkills.addObjects(existingLinkedInSkills.getEach('Skill__r').getEach('Name'));
            }
            skillsArray.addObjects(parsedApplyMap.skills.filter(function(s) {
                return Ember.isEmpty(s.LinkedInId__c) || linkedInIds.indexOf(parseInt(s.LinkedInId__c)) !== -1;
            }).getEach('Skill__r').getEach('Name'));

        }
        
        applicationObj.linkedInSkills = linkedInSkills;

        if (!Ember.isEmpty(skillsArray)) {
            applicationObj.isSkillsIncomplete = false;
            applicationObj.skills.selectedSkills = skillsArray.join(',');
        }

        objectsForInitialSave = App.buildSkillsSaveObj(applicationObj);

        return objectsForInitialSave;
    } else {
        applicationObj.isSkillsEnabled = false;
        applicationObj.isSkillsIncomplete = false;

        return [];
    }
};

App.setupEmploymentHistorySection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    // Employment History section
    if (hiringModel.employmentHistory.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isEmploymentHistoryEnabled = true;
        applicationObj.isEmploymentHistoryIncomplete = true;
        applicationObj.sectionArray.addObject('employmentHistory');

        applicationObj.employmentHistoryYears = hiringModel.employmentHistory.selectedEmploymentHistoryYears;
        applicationObj.employmentHistoryArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.positions) && !Ember.isEmpty(linkedInMap.positions.values)) {
            var employmentHistoryObjs = App.convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
            employmentHistoryObjs.forEach(function(eh) {
                linkedInIds.addObject(eh.LinkedInId__c);
                eh.Application__c = appId;
                objectsForInitialSave.addObject(eh);
                applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock(eh));
            });
        }  

        if (!Ember.isEmpty(parsedApplyMap.employmentHistories)) {
            parsedApplyMap.employmentHistories.forEach(function(eh) {
                if (linkedInIds.indexOf(eh.LinkedInId__c) !== -1) {
                    applicationObj.employmentHistoryArray.findBy('LinkedInId__c', eh.LinkedInId__c).Employment_History__c = eh.Employment_History__c;
                    objectsForInitialSave.findBy('LinkedInId__c', eh.LinkedInId__c).Employment_History__c = eh.Employment_History__c;
                } else {
                    applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock(eh));
                    eh.Application__c = appId;
                    objectsForInitialSave.addObject(eh);
                }
            });

            // Check completeness

            var hasEmptyFields = App.checkForBlankEmploymentHistoryFields(applicationObj.employmentHistoryArray);
            var hasGap = applicationObj.employmentHistoryYears === 0 ? false : App.checkForEmploymentHistoryGaps(parsedApplyMap.employmentHistories, applicationObj.employmentHistoryYears);
            applicationObj.isEmploymentHistoryIncomplete = hasEmptyFields;

        }

        if (Ember.isEmpty(applicationObj.employmentHistoryArray)) {
            applicationObj.employmentHistoryArray.addObject(App.getEmploymentHistoryBlock());
        }

        return objectsForInitialSave;
    } else {
        applicationObj.isEmploymentHistoryEnabled = false;
        applicationObj.isEmploymentHistoryIncomplete = false;

        return [];
    }
};

App.setupEducationHistorySection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.educationHistory.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isEducationHistoryEnabled = true;
        applicationObj.isEducationHistoryIncomplete = true;

        applicationObj.sectionArray.addObject('educationHistory');

        applicationObj.educationHistoryArray = [];

        // if we don't have data already but have logged in via linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.educations) && !Ember.isEmpty(linkedInMap.educations.values)) {
            var educationHistoryObjs = App.convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
            educationHistoryObjs.forEach(function(eh) {
                objectsForInitialSave.addObject(eh);
                eh.Application__c = appId;
                linkedInIds.addObject(eh.LinkedInId__c);
                applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock(eh));
            });
        }  

        // if we have data already.
        if (!Ember.isEmpty(parsedApplyMap.educationHistories)) {
            parsedApplyMap.educationHistories.forEach(function(eh) {
                if (linkedInIds.indexOf(eh.LinkedInId__c) !== -1) {
                    applicationObj.educationHistoryArray.findBy('LinkedInId__c', eh.LinkedInId__c).Education_History__c = eh.Education_History__c;
                    objectsForInitialSave.findBy('LinkedInId__c', eh.LinkedInId__c).Education_History__c = eh.Education_History__c;
                } else {
                    applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock(eh));
                    eh.Application__c = appId;
                    objectsForInitialSave.addObject(eh);
                }
            });

            var hasEmptyFields = App.checkForBlankEducationHistoryFields(applicationObj.educationHistoryArray);

            applicationObj.isEducationHistoryIncomplete = hasEmptyFields;
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.educationHistoryArray)) {
            applicationObj.educationHistoryArray.addObject(App.getEducationHistoryBlock());
        }

        return objectsForInitialSave;
    } else {
        applicationObj.isEducationHistoryEnabled = false;
        applicationObj.isEducationHistoryIncomplete = false;

        return [];
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

    if (Ember.isEmpty(applicationObj.legalFormElements) || isInternal === true) {
        applicationObj.isLegalEmpty = true;
        applicationObj.isLegallyRequiredIncomplete = false;
    } else {
        applicationObj.sectionArray.addObject('legallyRequired');

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
    }
};

App.setupProjectsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.projects.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isProjectsEnabled = true;
        applicationObj.isProjectsIncomplete = true;

        applicationObj.sectionArray.addObject('projects');

        applicationObj.projectsArray = [];

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var projects = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Project');
            // if we have data already.
            if (!Ember.isEmpty(projects)) {
                projects.forEach(function(p) {
                    applicationObj.projectsArray.addObject(App.getObjectBlock('projects', p));
                    objectsForInitialSave.addObject(p);
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.projectsArray, true);

                applicationObj.isProjectsIncomplete = hasEmptyFields;
            }
        }
        
        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.projectsArray)) {
            applicationObj.isProjectsIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.projects.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.projects.typeAPIName;

            return o;
        });
    } else {
        applicationObj.isProjectsEnabled = false;
        applicationObj.isProjectsIncomplete = false;

        return [];
    }
};

App.setupRecommendationsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.recommendations.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isRecommendationsEnabled = true;
        applicationObj.isRecommendationsIncomplete = true;

        applicationObj.sectionArray.addObject('recommendations');

        applicationObj.recommendationsArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.recommendationsReceived) && !Ember.isEmpty(linkedInMap.recommendationsReceived.values)) {
            var recommendationObjs = App.convertLinkedInToRecommendationObj(linkedInMap.recommendationsReceived.values);
            recommendationObjs.forEach(function(rec) {
                linkedInIds.addObject(rec.LinkedInId__c);
                objectsForInitialSave.addObject(rec);
                applicationObj.recommendationsArray.addObject(App.getObjectBlock('recommendations', rec));
            });
        }

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var recommendations = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Recommendation');
            // if we have data already.
            if (!Ember.isEmpty(recommendations)) {
                recommendations.forEach(function(r) {
                    if (linkedInIds.indexOf(r.LinkedInId__c) !== -1) {
                        applicationObj.recommendationsArray.findBy('LinkedInId__c', r.LinkedInId__c).Recommendation__c = r.Recommendation__c;
                        objectsForInitialSave.findBy('LinkedInId__c', r.LinkedInId__c).Recommendation__c = r.Recommendation__c;
                    } else {
                        applicationObj.recommendationsArray.addObject(App.getObjectBlock('recommendations', r));
                        objectsForInitialSave.addObject(r);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.recommendationsArray);

                applicationObj.isRecommendationsIncomplete = hasEmptyFields;
            }
        }        

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.recommendationsArray)) {
            applicationObj.isRecommendationsIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.recommendations.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.recommendations.typeAPIName;

            return o;
        });
    } else {
        applicationObj.isRecommendationsEnabled = false;
        applicationObj.isRecommendationsIncomplete = false;

        return [];

    }
};

App.setupRecognitionSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.recognition.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isRecognitionEnabled = true;
        applicationObj.isRecognitionIncomplete = true;

        applicationObj.sectionArray.addObject('recognition');

        applicationObj.recognitionArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.honorsAwards) && !Ember.isEmpty(linkedInMap.honorsAwards.values)) {
            var recognitionObjs = App.convertLinkedInToRecognitionObj(linkedInMap.honorsAwards.values);
            recognitionObjs.forEach(function(rec) {
                linkedInIds.addObject(rec.LinkedInId__c);
                objectsForInitialSave.addObject(rec);
                applicationObj.recognitionArray.addObject(App.getObjectBlock('recognition', rec));
            });
        }  

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var recognitions = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Recognition');
            // if we have data already.
            if (!Ember.isEmpty(recognitions)) {
                recognitions.forEach(function(r) {
                    if (linkedInIds.indexOf(r.LinkedInId__c) !== -1) {
                        applicationObj.recognitionArray.findBy('LinkedInId__c', r.LinkedInId__c).Recognition__c = r.Recognition__c;
                        objectsForInitialSave.findBy('LinkedInId__c', r.LinkedInId__c).Recognition__c = r.Recognition__c;
                    } else {
                        applicationObj.recognitionArray.addObject(App.getObjectBlock('recognition', r));
                        objectsForInitialSave.addObject(r);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.recognitionArray);

                applicationObj.isRecognitionIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.recognitionArray)) {
            applicationObj.isRecognitionIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.recognition.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.recognition.typeAPIName;

            return o;
        });
    } else {
        applicationObj.isRecognitionEnabled = false;
        applicationObj.isRecognitionIncomplete = false;

        return [];
    }
};

App.setupCertificationsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.certifications.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isCertificationsEnabled = true;
        applicationObj.isCertificationsIncomplete = true;

        applicationObj.sectionArray.addObject('certifications');

        applicationObj.certificationsArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.certifications) && !Ember.isEmpty(linkedInMap.certifications.values)) {
            var certificationObjs = App.convertLinkedInToCertificationsObj(linkedInMap.certifications.values);
            certificationObjs.forEach(function(c) {
                linkedInIds.addObject(c.LinkedInId__c);
                objectsForInitialSave.addObject(c);
                applicationObj.certificationsArray.addObject(App.getObjectBlock('certifications', c));
            });
        }  

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            // if we have data already.
            var certifications = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Certification');
            // if we have data already.
            if (!Ember.isEmpty(certifications)) {
                certifications.forEach(function(c) {
                    if (linkedInIds.indexOf(c.LinkedInId__c) !== -1) {
                        applicationObj.certificationsArray.findBy('LinkedInId__c', c.LinkedInId__c).Certification__c = c.Certification__c;
                        objectsForInitialSave.findBy('LinkedInId__c', c.LinkedInId__c).Certification__c = c.Certification__c;
                    } else {
                        applicationObj.certificationsArray.addObject(App.getObjectBlock('certifications', c));
                        objectsForInitialSave.addObject(c);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.certificationsArray, true);

                applicationObj.isCertificationsIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.certificationsArray)) {
            applicationObj.isCertificationsIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.certifications.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.certifications.typeAPIName;

            return o;
        });    
    } else {
        applicationObj.isCertificationsEnabled = false;
        applicationObj.isCertificationsIncomplete = false;

        return [];
    }
};

App.setupTrainingDevelopmentSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.trainingActivities.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isTrainingDevelopmentEnabled = true;
        applicationObj.isTrainingDevelopmentIncomplete = true;

        applicationObj.sectionArray.addObject('trainingDevelopment');

        applicationObj.trainingDevelopmentArray = [];

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var trainingDevelopments = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Training Activity');
            // if we have data already.
            if (!Ember.isEmpty(trainingDevelopments)) {
                trainingDevelopments.forEach(function(t) {
                    applicationObj.trainingDevelopmentArray.addObject(App.getObjectBlock('trainingDevelopment', t));
                    objectsForInitialSave.addObject(t);
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.trainingDevelopmentArray);

                applicationObj.isTrainingDevelopmentIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.trainingDevelopmentArray)) {
            applicationObj.isTrainingDevelopmentIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.trainingDevelopment.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.trainingDevelopment.typeAPINam;

            return o;
        });
    } else {
        applicationObj.isTrainingDevelopmentEnabled = false;
        applicationObj.isTrainingDevelopmentIncomplete = false;

        return [];
    }
};

App.setupPublicationsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.publications.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isPublicationsEnabled = true;
        applicationObj.isPublicationsIncomplete = true;

        applicationObj.sectionArray.addObject('publications');

        applicationObj.publicationsArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.publications) && !Ember.isEmpty(linkedInMap.publications.values)) {
            var publicationObjs = App.convertLinkedInToPublicationsObj(linkedInMap.publications.values);
            publicationObjs.forEach(function(p) {
                linkedInIds.addObject(p.LinkedInId__c);
                objectsForInitialSave.addObject(p);
                applicationObj.publicationsArray.addObject(App.getObjectBlock('publications', p));
            });
        }  

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var publications = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Publication');
            // if we have data already.
            if (!Ember.isEmpty(publications)) {
                publications.forEach(function(p) {
                    if (linkedInIds.indexOf(p.LinkedInId__c) !== -1) {
                        applicationObj.publicationsArray.findBy('LinkedInId__c', p.LinkedInId__c).Publication__c = p.Publication__c;
                        objectsForInitialSave.findBy('LinkedInId__c', p.LinkedInId__c).Publication__c = p.Publication__c;
                    } else {
                        applicationObj.publicationsArray.addObject(App.getObjectBlock('publications', p));
                        objectsForInitialSave.addObject(p);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.publicationsArray);

                applicationObj.isPublicationsIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.publicationsArray)) {
            applicationObj.isPublicationsIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.publications.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.publications.typeAPIName;
            
            return o;
        });
    } else {
        applicationObj.isPublicationsEnabled = false;
        applicationObj.isPublicationsIncomplete = false;

        return [];
    }
};

App.setupPatentsSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.patents.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isPatentsEnabled = true;
        applicationObj.isPatentsIncomplete = true;

        applicationObj.sectionArray.addObject('patents');

        applicationObj.patentsArray = [];

        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.patents) && !Ember.isEmpty(linkedInMap.patents.values)) {
            var patentObjs = App.convertLinkedInToPatentsObj(linkedInMap.patents.values);
            patentObjs.forEach(function(p) {
                linkedInIds.addObject(p.LinkedInId__c);
                objectsForInitialSave.addObject(p);
                applicationObj.patentsArray.addObject(App.getObjectBlock('patents', p));
            });
        } 

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var patents = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Patent');
            // if we have data already.
            if (!Ember.isEmpty(patents)) {
                patents.forEach(function(p) {
                    if (linkedInIds.indexOf(p.LinkedInId__c) !== -1) {
                        applicationObj.patentsArray.findBy('LinkedInId__c', p.LinkedInId__c).Patent__c = p.Patent__c;
                        objectsForInitialSave.findBy('LinkedInId__c', p.LinkedInId__c).Patent__c = p.Patent__c;
                    } else {
                        applicationObj.patentsArray.addObject(App.getObjectBlock('patents', p));
                        objectsForInitialSave.addObject(p);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.patentsArray);

                applicationObj.isPatentsIncomplete = hasEmptyFields;
            }
        }
        
        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.patentsArray)) {
            applicationObj.isPatentsIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.patents.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.patents.typeAPIName;

            return o;
        });
    } else {
        applicationObj.isPatentsEnabled = false;
        applicationObj.isPatentsIncomplete = false;

        return [];
    }
};

App.setupLanguagesSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.languages.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isLanguagesEnabled = true;
        applicationObj.isLanguagesIncomplete = true;

        applicationObj.sectionArray.addObject('languages');

        applicationObj.languagesArray = [];
 
        // Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.languages) && !Ember.isEmpty(linkedInMap.languages.values)) {
            var languageObjs = App.convertLinkedInToLanguagesObj(linkedInMap.languages.values);
            languageObjs.forEach(function(l) {
                linkedInIds.addObject(l.LinkedInId__c);
                objectsForInitialSave.addObject(l);
                applicationObj.languagesArray.addObject(App.getObjectBlock('languages', l));
            });
        } 

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var languages = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Language');
            // if we have data already.
            if (!Ember.isEmpty(languages)) {
                languages.forEach(function(l) {
                    if (linkedInIds.indexOf(l.LinkedInId__c) !== -1) {
                        applicationObj.languagesArray.findBy('LinkedInId__c', l.LinkedInId__c).Language__c = l.Language__c;
                        objectsForInitialSave.findBy('LinkedInId__c', l.LinkedInId__c).Language__c = l.Language__c;
                    } else {
                        applicationObj.languagesArray.addObject(App.getObjectBlock('languages', l));
                        objectsForInitialSave.addObject(l);
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.languagesArray);

                applicationObj.isLanguagesIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.languagesArray)) {
            applicationObj.isLanguagesIncomplete = false;
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.languages.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.languages.typeAPIName;
            
            return o;
        });
    } else {
        applicationObj.isLanguagesEnabled = false;
        applicationObj.isLanguagesIncomplete = false;

        return [];
    }
};

App.setupVolunteeringSection = function(parsedApplyMap, applicationObj, hiringModel, linkedInMap) {
    if (hiringModel.volunteering.isEnabled === true) {
        var objectsForInitialSave = [];

        applicationObj.isVolunteeringEnabled = true;
        applicationObj.isVolunteeringIncomplete = true;

        applicationObj.sectionArray.addObject('volunteering');

        applicationObj.volunteeringArray = [];

        // if we don't have data already but have logged in via Linkedin
        var linkedInIds = [];

        if (!Ember.isNone(linkedInMap) 
                && !Ember.isEmpty(linkedInMap.volunteer) && !Ember.isEmpty(linkedInMap.volunteer.volunteerExperiences)
                && !Ember.isEmpty(linkedInMap.volunteer.volunteerExperiences.values)) {
            var volunteerObjs = App.convertLinkedInToVolunteerObj(linkedInMap.volunteer.volunteerExperiences.values);
            volunteerObjs.forEach(function(v) {
                linkedInIds.addObject(v.LinkedInId__c);
                objectsForInitialSave.addObject(v);
                applicationObj.volunteeringArray.addObject(App.getObjectBlock('volunteering', v));
            });
        }

        if(!Ember.isEmpty(parsedApplyMap.additionalInformation)) {
            var volunteerings = parsedApplyMap.additionalInformation.filterBy('Type__c', 'Volunteer Work');
            // if we have data already.
            if (!Ember.isEmpty(volunteerings)) {
                volunteerings.forEach(function(v) {
                    if (linkedInIds.indexOf(v.LinkedInId__c) !== -1) {
                        applicationObj.volunteeringArray.findBy('LinkedInId__c', v.LinkedInId__c).Volunteer_Work__c = v.Volunteer_Work__c;
                        objectsForInitialSave.findBy('LinkedInId__c', v.LinkedInId__c).Volunteer_Work__c = v.Volunteer_Work__c;
                    } else {
                        objectsForInitialSave.addObject(v);
                        applicationObj.volunteeringArray.addObject(App.getObjectBlock('volunteering', v));
                    }
                });

                var hasEmptyFields = App.checkForBlankObjectFields(applicationObj.volunteeringArray, true);

                applicationObj.isVolunteeringIncomplete = hasEmptyFields;
            }
        }

        // if we don't have any data at all.
        if (Ember.isEmpty(applicationObj.volunteeringArray)) {
            applicationObj.isVolunteeringIncomplete = false;
            //applicationObj.volunteeringArray.addObject(App.getObjectBlock('volunteering'));
        }

        return objectsForInitialSave.map(function(o) {
            o.namespace_Application__c = appId;
            o.namespace_Type__c = App.Fixtures.sectionToTypeMap.volunteering.type;
            o.namespace_TypeAPIName__c = App.Fixtures.sectionToTypeMap.volunteering.typeAPIName;

            return o;
        });
    } else {
        applicationObj.isVolunteeringEnabled = false;
        applicationObj.isVolunteeringIncomplete = false;

        return [];
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
    var linkedInSkills = application.linkedInSkills || [];

    if (!Ember.isEmpty(selectedSkillsString)) {
        selectedSkills = selectedSkillsString.split(',');
    }

    selectedSkills = selectedSkills.map(function(s) {
        return {
            name: s,
            isLinkedIn: linkedInSkills.indexOf(s) !== -1
        };
    });

    var skillsObj = {
        applicationId: appId,
        skills: selectedSkills,
        flattenedSkills: selectedSkillsString.replace(/,/g, ', ')
    };

    return skillsObj;
};

App.buildEmploymentHistorySaveObj = function(application, employmentHistoryController, errorObj) {
    var employmentHistoryObjArray = [];
    var historyIsLongEnough = false;
    var isValid = true;

    application.employmentHistoryArray.forEach(function(eh) {
        var isThisOneValid = true;
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
                    isThisOneValid = false;
                } else {
                    var intValue = parseInt(field.value);
                    var highestYear = parseInt(moment().format('YYYY'));

                    if (intValue < 1900 || intValue > highestYear) {
                        field.set('hasError', true);
                        isValid = false;
                        isThisOneValid = false;
                    } else {
                        employmentHistoryObj[field.name] = field.value;
                    }
                }

            } else {
                employmentHistoryObj[field.name] = field.value;
            }
        });
    
        if (isThisOneValid === false) {
            if (errorObj.message.indexOf('Employment History') === -1) { // only add error once.
                errorObj.message = '<li><strong>' + labels.employmentHistory + ':</strong><br>';
            }

            errorObj.message += '<ul class="pad--sm--ll"><li><small>'
                        + employmentHistoryObj.Name + ': '
                        + labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                        + labels.and + ' ' + moment().format('YYYY')
                        + '</small></li></ul></li>';
        }

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
            appId: appId
        };

        return employmentHistoriesObj;

    } else if (!isValid) {
        
        if (hasGap) {
            var currentMonthString = App.Fixtures.numberToMonthMap[moment().format('M')] + ' ' + moment().format('YYYY');
            var earliestMonth = moment().subtract(application.employmentHistoryYears, 'years');
            var earliestMonthString = App.Fixtures.numberToMonthMap[earliestMonth.format('M')] + ' ' + earliestMonth.format('YYYY');

            if (errorObj.message === '') {
                errorObj.message = '<li><strong>' + labels.employmentHistory + ':</strong><br>'
                                    + '<ul class="pad--sm--ll">';
            }

            errorObj.message += '<ul class="pad--sm--ll"><li><small>' + labels.pleaseAccountForEveryMonthBetween + ' ' 
                                + currentMonthString + ' ' + labels.and + ' ' + earliestMonthString + ' ' + labels.inclusive + '.'
                                + '</small></li></ul></li>';
        }

        return null;
    }
};

App.buildEducationHistorySaveObj = function(application, educationHistoryController, errorObj) {
    var educationHistoryObjArray = [];
    var isValid = true;

    application.educationHistoryArray.forEach(function(eh) {
        var isThisOneValid = true;

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
                    isThisOneValid = false;
                } else {
                    var intValue = parseInt(field.value);
                    var highestYear = parseInt(moment().format('YYYY')) + 10;

                    if (intValue < 1900 || intValue > highestYear) {
                        field.set('hasError', true);
                        isValid = false;
                        isThisOneValid = false;
                    } else {
                        educationHistoryObj[field.name] = Ember.isEmpty(field.value) ? null : field.value;
                    }
                }

                
            } else {
                educationHistoryObj[field.name] = field.value;
            }
        });

        if (isThisOneValid === false) {

            if (errorObj.message.indexOf('Education History') === -1) { // Only add header once.
                errorObj.message += '<li><strong>' + labels.educationHistory + ':</strong><br>'
            }    

            errorObj.message += '<ul class="pad--sm--ll"><li><small>'
                        + educationHistoryObj.Name + ': '
                        + labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                        + labels.and + ' ' + moment().add(10, 'years').format('YYYY')
                        + '</small></li></ul></li>';
        }

        educationHistoryObjArray.addObject(educationHistoryObj);
    });

    if (isValid) {
        var educationHistoriesObj = {
            educationHistories: educationHistoryObjArray,
            deletedEducationHistories: educationHistoryController.get('deletedEducationHistories'),
            appId: appId
        };

        return educationHistoriesObj;
    } else if (!isValid) {

        return null;
    }
};

App.buildAdditionalInfoSaveObj = function(sectionName, application, sectionController, errorObj, shouldValidate) {
    var additionalInfoArray = [];
    var isValid = true;
    var sectionArrayName = sectionName + 'Array';
    var sectionArray = application[sectionArrayName];
    var deletedArrayName = sectionController.get('deletedArrayName');

    sectionArray.forEach(function(el) {
        var additionalInfoObj = {
            eId: el.eId,
            Id: el.Id,
            namespace_Application__c: appId,
            namespace_Type__c: App.Fixtures.sectionToTypeMap[sectionName].type,
            namespace_TypeAPIName__c: App.Fixtures.sectionToTypeMap[sectionName].typeAPIName
        };

        el.fields.forEach(function(f) {
            // proto namespace, delete in production
            var fieldName = f.name.indexOf('__c') !== -1 ? 'namespace_' + f.name : f.name;

            if (shouldValidate === true) {
                var isCurrent;

                if (fieldName === 'namespace_Start_Year__c' || fieldName === 'namespace_Year__c' 
                                    || (fieldName === 'namespace_End_Year__c' && isCurrent !== true)) {
                    f.set('hasError', false);

                    if (!Ember.isEmpty(f.value) && isNaN(f.value)) {
                        f.set('hasError', true);
                        isValid = false;
                    } else {
                        var intValue = parseInt(f.value);
                        var highestYear = parseInt(moment().format('YYYY'));

                        if (intValue < 1900 || intValue > highestYear) {
                            f.set('hasError', true);
                            isValid = false;
                        } else {
                            additionalInfoObj[fieldName] = f.value
                        }
                    }

                    if (isValid === false) {
                        errorMessage = labels.pleaseEnterAYearBetween + ' ' + '1900' + ' ' 
                                        + labels.and + ' ' + moment().format('YYYY');
                    }
                } else {
                    additionalInfoObj[fieldName] = f.value
                }
            } else {
                additionalInfoObj[fieldName] = f.value;
            }
        });

        additionalInfoArray.addObject(additionalInfoObj);
    });

    if (isValid === false) {
        errorObj.errorMessage = errorMessage;
        return null;
    } else {
        return {
            upsertAdditionalInformation: additionalInfoArray,
            deleteAdditionalInformation: sectionController.get(deletedArrayName),
            applicationId: appId
        };
    }
};

App.redirectAfterFinish = function(application) {
    var redirectUrl;

    if (isUserLoggedIn === true) {
        if (isInternal === true) {
            redirectUrl = '/apex/to_jobPostingView?id=' + application.Job_Posting__c;
        } else {
            redirectUrl = parent.urlPrefix + '/JobListing?id=' + application.Job_Posting__c;
        }
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
            if (Ember.isEmpty(applicationRedirectUrl) || Ember.isEmpty(parsedApplyMap.application.Status__c)) {
                var hiringModel = JSON.parse(parsedApplyMap.hiringModel.Configuration_Json__c);

                var applicationObj = {
                    resume: {
                        resumeFileName: null,
                        base64fileData: null
                    },
                    companyLogoUrl: companyLogoUrl,
                    sectionArray: [],

                };

                var initialSaveObj = {};

                applicationObj.application = parsedApplyMap.application;

                var linkedInMap = parsedApplyMap.linkedInMap;

                App.setupContactInfoFields(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupResumeSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                initialSaveObj.skills = App.setupSkillsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);        
                initialSaveObj.employmentHistory = App.setupEmploymentHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                initialSaveObj.educationHistory = App.setupEducationHistorySection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);

                // Extra sections
                initialSaveObj.additionalInformation = [];
                initialSaveObj.additionalInformation.addObjects(App.setupProjectsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupRecommendationsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupRecognitionSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupCertificationsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupTrainingDevelopmentSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupPublicationsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupPatentsSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupLanguagesSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                initialSaveObj.additionalInformation.addObjects(App.setupVolunteeringSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap));
                //

                App.setupGeneralSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupJobSpecificSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                App.setupLegallyRequiredSection(parsedApplyMap, applicationObj, hiringModel, linkedInMap);
                
                applicationObj.numSections = applicationObj.sectionArray.length;

                console.log('***MODEL');
                console.log(applicationObj);
                  
                if (Ember.isEmpty(parsedApplyMap.application.Status__c)) {
                    var saveObj = {};

                    if (isUserLoggedIn === true || !Ember.isNone(parsedApplyMap.linkedInMap)) {
                        saveObj.contactInfo = JSON.stringify(App.buildContactSaveObj(applicationObj));
                    }

                    saveObj.professionalSummary = applicationObj.resume.professionalSummary;

                    /* NAMESPACE PROTO STUFF */
                    initialSaveObj.additionalInformation.forEach(function(ai) {
                        Object.keys(ai).forEach(function(k) {
                            if (k.indexOf('__c') !== -1 && k.indexOf('namespace_') === -1) {
                                ai['namespace_' + k] = ai[k];
                            }
                        });
                    });

                    initialSaveObj.employmentHistory.forEach(function(eh) {
                        eh.namespace_Employment_History__c = eh.Employment_History__c;
                        eh.namespace_LinkedInId__c = eh.LinkedInId__c;
                    });

                    initialSaveObj.educationHistory.forEach(function(eh) {
                        eh.namespace_Education_History__c = eh.Education_History__c;
                        eh.namespace_LinkedInId__c = eh.LinkedInId__c;
                    });
                    /**************************/

                    if (!Ember.isEmpty(initialSaveObj.employmentHistory)) {
                        saveObj.employmentHistory = JSON.stringify({
                            employmentHistories: initialSaveObj.employmentHistory,
                            deletedEmploymentHistories: []
                        });
                    }
                    
                    if (!Ember.isEmpty(initialSaveObj.educationHistory)) {
                        saveObj.educationHistory = JSON.stringify({
                            educationHistories: initialSaveObj.educationHistory,
                            deletedEducationHistories: []
                        });
                    }
                    
                    if (!Ember.isEmpty(initialSaveObj.additionalInformation)) {
                        saveObj.additionalInformation = JSON.stringify({
                            upsertAdditionalInformation: initialSaveObj.additionalInformation,
                            deleteAdditionalInformation: []
                        });
                    }
                    

                    if (!Ember.isEmpty(initialSaveObj.skills)) {
                        saveObj.skills = JSON.stringify(initialSaveObj.skills);
                    }

                    saveObj.appId = appId;

                    cont.saveApplicationInitialState(JSON.stringify(saveObj), function(res, evt) {
                        var parsedResult = parseResult(res);

                        if (parsedResult.isSuccess === true) {
                            var currentUrlBase = window.parent.location.href.split('?')[0];
                            var destinationUrl = currentUrlBase + '?id=' + appId;

                            if (isSF1) {
                                sforce.one.redirectToUrl('/apex/to_applyFlow?id=' + appId);
                            } else {
                                window.parent.location.replace(destinationUrl);
                            }
                            //resolve(applicationObj);
                        } else if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            applicationObj.errorMessage = parsedResult.errorMessages[0];
                            reject(applicationObj);
                        }
                    });
                } else {
                    resolve(applicationObj);
                }
            }
        });
    },
    beforeModel: function(model, transition) {
        if (parsedApplyMap) {
            var hiringModel = JSON.parse(parsedApplyMap.hiringModel.Configuration_Json__c);

            isOnePage = hiringModel.isOnePage;

            if (isOnePage === true) {
                this.transitionTo('onePage');
            } else {
                this.transitionTo('apply');
            }
        }
    },
    actions: {
        error: function(model, transition) {
            //transition.abort();
            this.controllerFor('error').set('model', model);
            this.render('error', {
                into: 'application',
                controller: 'error'
            });
        }
    }
});

App.ApplyRoute = Ember.Route.extend( {
    model: function(params) {
        return this.modelFor('application');
    },
    afterModel: function(model, transition) {
        this.transitionTo(model.sectionArray[0]);
    }
});

App.OnePageRoute = Ember.Route.extend({
    model: function(params){
        return this.modelFor('application');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        this.controllerFor('apply').set('model', model);
        this.controllerFor('apply').set('isOnePage', true);
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
        var $iframe = isInternal === true ? null : $('iframe#theIframe').contents();
        var uriEncodedFilename = encodeURIComponent(fileName);
        var resumeBaseUrl = null;
        var professionalSummary = null;

        self.controllerFor(currentPath).set('errorMessage', null);

        if ((!Ember.isNone(fileName) || resume.isProfessionalSummaryEnabled === true) 
                        && (alreadyUploaded !== true || !Ember.isEmpty(resumeController.get('professionalSummary'))) 
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

            if (resume.isProfessionalSummaryEnabled === true) {
                professionalSummary = resumeController.get('professionalSummary') || null;
            }

            if (resume.isAddResumeEnabled === true && alreadyUploaded !== true && !Ember.isEmpty(fileName)) {
                resumeBaseUrl = parsedApplyMap.baseUrl;
            }

            if (resume.isFromDropbox === true && alreadyUploaded !== true) {
                cont.createLinkAttachment(fileName, appId, function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (Ember.isEmpty(parsedResult.errorMessages)) {
                            $iframe.find('.fileInput').off('change');
                            cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
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
            } else if (resume.isAddResumeEnabled === true && alreadyUploaded !== true && !Ember.isEmpty(fileName)) {
                $iframe.find('.fileInput').off('change');            
                $iframe.find('.saveFile').click();

                $('iframe#theIframe').one('load', function() {
                    if ($('iframe#theIframe').contents().find('.message').length > 0) {
                        var errorMessage = $('iframe#theIframe').contents().find('.message').find('li:first').text();
                        resumeController.set('errorMessage', errorMessage);
                        applyController.set('showSavingNotification', false);
                    } else {
                        cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
                    }
                });
            } else {
                cont.completeResumeSection(resumeBaseUrl, professionalSummary, appId, completeApplication, App.generateRemoteActionCallback(self, successCallback, false, currentPath));
            }           
        } else {
            if ($iframe) {
                $iframe.find('.fileInput').off('change');
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
        //var flattenedEmploymentHistory = '';
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
                //flattenedEmploymentHistory: flattenedEmploymentHistory
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
        //var flattenedEducationHistory = '';
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
                appId: appId
                //flattenedEducationHistory: flattenedEducationHistory
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

App.saveAdditionalInfo = function(section, self, transition, completeApplication, shouldValidate) {
    var errorObj = {};
    var applyModel = self.modelFor('apply');
    var applyController = self.controllerFor('apply');
    var sectionController = self.controllerFor(section);
    var sectionModel = self.modelFor(section);
    var sectionArray = applyModel.sectionArray;
    var additionalInfoSaveObj = App.buildAdditionalInfoSaveObj(section, applyModel, sectionController, errorObj, shouldValidate);
    var currentPath = applyController.get('currentPath');

    sectionController.set('errorMessage', null);

    if (!Ember.isEmpty(errorObj.errorMessage) && transition && sectionArray.indexOf(transition.targetName) > sectionArray.indexOf(currentPath)) {
        transition.abort();
        sectionController.set('errorMessage', errorObj.errorMessage);
    } else if (!Ember.isEmpty(errorObj.errorMessage)) {
        sectionController.set('errorMessage', errorObj.errorMessage);
    } else if (applyController.get('showSavingNotification') !== true) {
        if (completeApplication !== true) {
            transition.abort();
        }            

        applyController.set('showSavingNotification', true);

        var callback = function(parsedResult) {
            if (completeApplication === true) {
                App.redirectAfterFinish(applyController.get('application'));
            } else {
                transition.retry();

                // UPDATE ADDITIONAL INFO OBJS
                Object.keys(parsedResult.data.eIdToAIMap).forEach(function(eId) {
                    var aIToUpdate = sectionModel.findBy('eId', parseInt(eId));
                    aIToUpdate.Id = parsedResult.data.eIdToAIMap[eId].Id;
                });

                sectionController.get(sectionController.get('deletedArrayName')).clear();
            }
        };

        cont.upsertAdditionalInformation(JSON.stringify(additionalInfoSaveObj), completeApplication, App.generateRemoteActionCallback(self, callback, false, currentPath));
    }

};

App.ProjectsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').projectsArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('projects', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('projects', this, null, true, false);
        }
    }
});

App.RecommendationsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').recommendationsArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('recommendations', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('recommendations', this, null, true, false);
        }
    }
});

App.RecognitionRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').recognitionArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('recognition', this, transition, false, true);
        },
        clickDone: function() {
            App.saveAdditionalInfo('recognition', this, null, true, true);
        }
    }
});

App.CertificationsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').certificationsArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('certifications', this, transition, false, true);
        },
        clickDone: function() {
            App.saveAdditionalInfo('certifications', this, null, true, true);
        }
    }
});

App.TrainingDevelopmentRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').trainingDevelopmentArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('trainingDevelopment', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('trainingDevelopment', this, null, true, false);
        }
    }
});

App.PublicationsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').publicationsArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('publications', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('publications', this, null, true, false);
        }
    }
});

App.PatentsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').patentsArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('patents', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('patents', this, null, true, false);
        }
    }
});

App.LanguagesRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').languagesArray;
    },
    actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('languages', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('languages', this, null, true, false);
        }
    }
});

App.VolunteeringRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('apply').volunteeringArray;
    },
   actions: {
        willTransition: function(transition) {
            App.saveAdditionalInfo('volunteering', this, transition, false, false);
        },
        clickDone: function() {
            App.saveAdditionalInfo('volunteering', this, null, true, false);
        }
    }
});