// For storing external IDs
EID = 0;

// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.FormBuilderView = Ember.View.extend({
    afterRenderEvent: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });
    }
});

App.Fixtures = Ember.Object.create({
    currentSection: null,
    currentHiringModel: null
});


// Routes
App.FormBuilderRoute = Ember.Route.extend( {
    model: function(params) {
        //var formElements = [];
        var general = [];
        var legal = [];

        // A dummy form element is used to allow adding form elements at the beginning or end.
        var generalDummyFormElement = Ember.Object.create({
            eId: EID++,
            Sequence_Number__c: 1,
            isNew: false,
            isEditing: false,
            isLast: true
        });

        var legalDummyFormElement = Ember.Object.create({
            eId: EID++,
            Sequence_Number__c: 1,
            isNew: false,
            isEditing: false,
            isLast: true
        });

        // Iterate through passed in list of form elements and create form element objects.
        parsedFormElementsMap.generalLegalFormElements.forEach(function(fe) {
            var newFe = Ember.Object.create(fe).getProperties('Id','Text__c','Element_Type__c','Answer_Type__c', 'Geography__c',
                                                                'Sequence_Number__c', 'Rich_Text_Content__c', 'Hiring_Model__c', 
                                                                'Section__c');
            newFe.eId = EID++;
            newFe.answers = [];

            if ((fe.Answer_Type__c === 'Radio Buttons' || fe.Answer_Type__c === 'Checkboxes') 
                    && fe.Answer_Choices__r && !Ember.isEmpty(fe.Answer_Choices__r.records)) {
                fe.Answer_Choices__r.records.forEach(function(ac) {
                    var newAc = ac;

                    newAc.eId = EID++;
                    newAc.formElementEId = newFe.eId;

                    newFe.answers.addObject(Ember.Object.create(newAc));
                });
            } else {
                newFe.answers.addObject(Ember.Object.create({
                    eId: EID++,
                    formElementEId: newFe.eId,
                    Value__c: null,
                    Score__c: 0,
                    Disqualify__c: false
                }));
            }

            if (newFe.Section__c === 'General') {
                generalDummyFormElement.incrementProperty('Sequence_Number__c');
                general.addObject(Ember.Object.create(newFe));
            } else {
                legalDummyFormElement.incrementProperty('Sequence_Number__c');
                legal.addObject(Ember.Object.create(newFe));
            }

            //formElements.addObject(Ember.Object.create(newFe));
        });
    
        //formElements.addObject(dummyFormElement);
        legal.addObject(legalDummyFormElement);
        general.addObject(generalDummyFormElement);

        var contactInfoFields = {
            name: parsedFormElementsMap.name,
            contact: parsedFormElementsMap.contact,
            address: parsedFormElementsMap.address
        };

        var hiringModelData = {};

        var hiringModelPicklistValues = parsedFormElementsMap.hiringModelPicklistValues.getEach('value');

        hiringModelPicklistValues.forEach(function(hm) {
            var hiringModel = parsedFormElementsMap.allModels.findBy('Name', hm);

            if (!Ember.isNone(hiringModel)) {

                var configObj = JSON.parse(hiringModel.Configuration_Json__c);

                // Clean up contact info hiring model object in case user has removed a field from the set.
                Object.keys(configObj.contactInfo).forEach(function(key) {
                    if (Ember.isNone(contactInfoFields.name.findBy('name', key))
                            && Ember.isNone(contactInfoFields.contact.findBy('name', key))
                            && Ember.isNone(contactInfoFields.address.findBy('name', key))) {
                        delete configObj.contactInfo[key];
                    }
                });

                hiringModelData[hm] = {
                    Id: hiringModel.Id,
                    data: configObj
                };
            } else {
                hiringModelData[hm] = {
                    Id: null,
                    data: {
                        contactInfo: {
                            First_Name__c: true,
                            Last_Name__c: true,
                            Email__c: true,
                            Mobile_Phone__c: false,
                            Street_Address__c: false,
                            City__c: false,
                            State_Province__c: false,
                            Zip_Postal_Code__c: false,
                            Country__c: false
                        },
                        resume: {
                            isEnabled: false
                        },
                        skills: {
                            isEnabled: false
                        },
                        employmentHistory: {
                            isEnabled: false
                        },
                        educationHistory: {
                            isEnabled: false
                        }
                    }
                };
            }
        });

        return Ember.Object.create({
            general: general,
            legal: legal,
            geographies: parsedFormElementsMap.allGeographies,
            hiringModelPicklistValues: hiringModelPicklistValues,
            selectedHiringModel: hiringModelPicklistValues[0],
            selectedGeography: parsedFormElementsMap.allGeographies[0].Id,
            hiringModelData: hiringModelData,
            contactInfoFields: contactInfoFields
        });
    },
    afterModel: function(model, transition) {
        // Since we turned off URL hashing to preserve browser history,
        // we'll parse the hash manually.
        if (window.location.hash.indexOf('formElements') !== -1) {
            var hashArray = window.location.hash.split('/');

            var formElementSection = hashArray[2];
            var formElementSubSection = hashArray[3];
            //window.location.hash = '';
            this.transitionTo('formElements', formElementSection, formElementSubSection);
        } else {
            this.transitionTo('contactInfo', model.selectedHiringModel);
        }
        /*if (Object.keys(transition.params.application).length === 0 
                && Object.keys(transition.params.formBuilder).length === 0
                && Ember.isNone(transition.params.formElements)) {
            this.transitionTo('contactInfo', model.selectedHiringModel);
        }*/
    },
    actions: {
        saveHiringModelData: function(modelName, saveAll) {
            var formBuilderController = this.controllerFor('formBuilder');

            if (formBuilderController.get('isSaving') !== true) {  
                formBuilderController.set('isSaving', true);
                formBuilderController.set('showSavingNotification', true);

                if (saveAll !== true) {
                    var hiringModelDataToSave = this.modelFor('formBuilder').get('hiringModelData')[modelName];
                
                    var hiringModelSaveObj = {
                        Id: hiringModelDataToSave.Id,
                        Name: modelName,
                        Configuration_Json__c: JSON.stringify(hiringModelDataToSave.data)
                    };

                    cont.saveHiringModel(JSON.stringify(hiringModelSaveObj), function(res, evt) {
                        if (res) {
                            var parsedResult = parseResult(res);

                            if (!Ember.isEmpty(parsedResult.errorMessages)) {
                                // Error handling
                            } else {
                                hiringModelDataToSave.Id = parsedResult.data.id;
                                Ember.run.later(this, function() {
                                    formBuilderController.set('isSaving', false);
                                    formBuilderController.set('showSavingNotification', false);
                                }, 1500);
                            }
                        } else {
                            // Error handling
                        }
                    });     
                } else {
                    var hiringModelData = this.modelFor('formBuilder').get('hiringModelData');
                    var hiringModelsToSave = [];

                    Object.keys(hiringModelData).forEach(function(hm) {
                        var hiringModelDataToSave = hiringModelData[hm];
                        hiringModelsToSave.addObject({
                            Id: hiringModelDataToSave.Id,
                            Name: hm,
                            Configuration_Json__c: JSON.stringify(hiringModelDataToSave.data)
                        });
                    });

                    var saveObj = {
                        hiringModelsToSave: hiringModelsToSave
                    };

                    cont.saveAllHiringModels(JSON.stringify(saveObj), function(res, evt) {
                        if (res) {
                            var parsedResult = parseResult(res);

                            if (!Ember.isEmpty(parsedResult.errorMessages)) {
                                // Error handling
                            } else {
                                Object.keys(parsedResult.data.nameToHms).forEach(function(hm) {
                                    hiringModelData[hm].Id = parsedResult.data.nameToHms[hm].Id;
                                });

                                //hiringModelDataToSave.Id = parsedResult.data.id;
                                Ember.run.later(this, function() {
                                    formBuilderController.set('isSaving', false);
                                    formBuilderController.set('showSavingNotification', false);
                                }, 1500);
                            }
                        } else {

                        }
                    });
                }
            }
        }
    }
});

App.FormElementsRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('formBuilder').get(params.section.toLowerCase());
    },
    beforeModel: function(transition) {
        var section = transition.params.formElements.section;
        var subSection = transition.params.formElements.subSection;
        var formBuilderController = this.controllerFor('formBuilder');
        var formBuilderModel = this.modelFor('formBuilder');

        App.Fixtures.set('currentSection', transition.params.formElements.section);
        formBuilderController.set('currentSection', transition.params.formElements.section);

        if (section === 'Legal') {
            formBuilderModel.set('selectedGeography', subSection);
        } else {
            formBuilderModel.set('selectedHiringModel', subSection);
        }
        console.log('set params');
    },
    actions: {
        willTransition: function(transition) {
            this.controllerFor('formBuilder').send('clickSaveAndKeepWorking');
        }
    }
});

App.ContactInfoRoute = Ember.Route.extend({
    model: function(params) {
        App.Fixtures.set('currentSection', null);

        var contactInfoFields = this.modelFor('formBuilder').get('contactInfoFields');
        var selectedHiringModel = params.hiringModel;
        var hiringModelData = this.modelFor('formBuilder').get('hiringModelData')[selectedHiringModel].data.contactInfo;

        App.Fixtures.set('currentHiringModel', params.hiringModel);

        var contactInfoObj = {
            name: [],
            contact: [],
            address: []
        };

        ['name', 'contact', 'address'].forEach(function(fieldSet) {
            contactInfoFields[fieldSet].forEach(function(f) {
                contactInfoObj[fieldSet].addObject({
                    name: f.name,
                    label: f.label,
                    isRequired: f.isDBRequired === true || f.isFieldSetRequired === true,
                    isEnabled: f.isDBRequired === true || f.isFieldSetRequired === true ? true : hiringModelData[f.name] || false
                });
            });
        });

        contactInfoObj.currentHiringModel = params.hiringModel;

        if (!Ember.isNone(this.controllerFor('formBuilder').get('section'))) {
            this.controllerFor('formBuilder').set('section', null);            
        }

        return contactInfoObj;
    },
    actions: {
        saveContactInfo: function(selectedHiringModel) {
            var hiringModelData = this.modelFor('formBuilder').get('hiringModelData')[selectedHiringModel].data.contactInfo;
            var contactInfoFields = this.modelFor('contactInfo'); 

            ['name', 'contact', 'address'].forEach(function(fieldSet) {
                contactInfoFields[fieldSet].forEach(function(f) {
                    hiringModelData[f.name] = f.isEnabled;
                });
            });

            this.send('saveHiringModelData', selectedHiringModel);
        },
        willTransition: function(transition) {
            var selectedHiringModel = this.modelFor('contactInfo').currentHiringModel;
            var hiringModelData = this.modelFor('formBuilder').get('hiringModelData')[selectedHiringModel].data.contactInfo;
            var contactInfoFields = this.modelFor('contactInfo'); 

            ['name', 'contact', 'address'].forEach(function(fieldSet) {
                contactInfoFields[fieldSet].forEach(function(f) {
                    hiringModelData[f.name] = f.isEnabled;
                });
            });

            this.send('saveHiringModelData', selectedHiringModel);
        }
    }
});

App.ApplicationSectionRoute = Ember.Route.extend({
    model: function(params) {
        var section = params.section;
        var hiringModel = params.hiringModel;
        var hiringModelData = this.modelFor('formBuilder').get('hiringModelData')[hiringModel].data[section];
        
        App.Fixtures.set('currentSection', section);
        App.Fixtures.set('currentHiringModel', params.hiringModel);

        return hiringModelData;
    },
    renderTemplate: function(controller, model) {
        this.render(App.Fixtures.get('currentSection'), {
            controller: controller
        });
    },
    actions: {
        willTransition: function(transition) {
            var hiringModel = App.Fixtures.get('currentHiringModel');

            this.send('saveHiringModelData', hiringModel);
        }
    }
});

App.OnePageRoute = Ember.Route.extend({
    model: function(params) {
        var hiringModelData = this.modelFor('formBuilder').get('hiringModelData');

        return hiringModelData;
    },
    actions: {
        willTransition: function(transition) {
            this.send('saveHiringModelData', null, true);
        }
    }
});

// Router
App.Router.map(function() {
    this.resource('formBuilder', { path: '/' }, function() {
        this.resource('formElements', { path: 'formElements/:section/:subSection' });
        this.resource('applicationSection', { path: 'application/:section/:hiringModel' });
        this.resource('contactInfo', { path: 'contactInfo/:hiringModel' });
        this.resource('onePage', { path: '/onePage' });
    });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});