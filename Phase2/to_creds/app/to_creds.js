App = Ember.Application.create({
    rootElement: '#application'
});

// Controllers 

App.MainController = Ember.ObjectController.extend({
    init: function() {
        this._super(); //Handle inheritance, etc...
        //Ember.run.later(this, this.checkHealth, 2000);
        if (this.isSuccess) {
            this.checkHealth();
        }
    },
    
    systemDefaultChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Default' && item.configurationPage == 'System';
    }),
    systemMappingChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Mapping' && item.configurationPage == 'System';
    }),
    systemJobBoardChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Job Board' && item.configurationPage == 'System';
    }),
    systemBgChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Background Check' && item.configurationPage == 'System';
    }),
    
    jobPostingJobBoardChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Job Board' && item.configurationPage == 'Job Posting';
    }),
    jobPostingSocialChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Social' && item.configurationPage == 'Job Posting';
    }),

    checkHealth: function() {
        var self = this;

        cont.checkHealth(function(res, resObj) {
            if (!Ember.isNone(self.get('content'))) {
                if (res) {
                    var parsedResult = parseResult(res);
                    
                    self.set('connectionerror', labels.connectionError);
                    if (Ember.isEmpty(parsedResult.errorMessages) && parseResult(parsedResult.data.response).status == 'UP') {
                        self.set('connectionerror', null);
                        self.set('connectionMessage', self.get('connectionerror'));
                    } else {
                        self.set('connectionMessage', self.get('connectionerror'));
                        $(window).scrollTop(0);
                    }
                } else { // Not often used...
                    self.set('connectionMessage', 'Drastic error.');
                    $(window).scrollTop(0);
                }
            }
        });
        
    },
    checkHealthPromise: function() {
        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {

            cont.checkHealth(function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);
                
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');
                        self.set('connectionMessage', self.get('connectionerror'));
                        $(window).scrollTop(0);
                        reject(self);

                    } else {
                        self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');

                        var subParse = parseResult(parsedResult.data.response);

                        if( subParse.status == 'UP') {
                            self.set('connectionerror', null);
                            self.set('connectionMessage', self.get('connectionerror'));
                            resolve(self);

                        } else {
                            self.set('connectionMessage', self.get('connectionerror'));
                            $(window).scrollTop(0);
                            reject(self);
                        }
                
                    }

                } else { // Not often used...
                    self.set('connectionMessage', 'Drastic error.');
                    $(window).scrollTop(0);
                    reject(self);
                }
            });

        });

    },    
    gotoObject: function(self) {
        var objectId = self.model.data.jobPosting.Id;
        if(isSF1) {
            sforce.one.navigateToSObject(objectId);
        } else {
            window.location.href = '/' + objectId;
        }
    },
    handleError: function(self) {
        self.set('errorMessage', self.get('error'));
        $(window).scrollTop(0);
    },
    actions: {
        clearInput: function(input) {
            this.set(input, null);
        }
    }
});

App.ChannelNavController = Ember.ObjectController.extend({
    needs: ['main'],
    isHubConnectedBinding: 'controllers.main.isHubConnected',
    shouldDisableLink: function() {
        return this.get('hubRequired') === true && this.get('isHubConnected') !== true ? 'Disabled' : false;
    }.property('hubRequired', 'isHubConnected')
});

App.IntegrationController = Ember.ObjectController.extend({
    needs: ['main'],
    clientIdBinding: 'controllers.main.clientId',
    clientSecretBinding: 'controllers.main.clientSecret',
    isHubConnectedBinding: 'controllers.main.isHubConnected',
    iHSettingUserEmailBinding: 'controllers.main.iHSettingUserEmail',
    returnUrl: function() {
        return returnUrl;
    }.property(),
    isIntegrationHubAndIsConnected: function() {
        return this.get('isIntegrationHub') === true && this.get('isHubConnected') === true;
    }.property('isIntegrationHub', 'isHubConnected'),
    disableIntegrationHubInput: function() {
        return this.get('isIntegrationHubAndIsConnected') === true ? 'Disabled' : false;
    }.property('isIntegrationHubAndIsConnected'),
    connectionStatus: function() {
        return this.get('isConnected') === true ? labels.connectionSuccessfullyEstablished : labels.connectionNotEstablished;
    }.property('isConnected'),
    showAuthFields: function() {
        return !Ember.isEmpty(this.get('authFields')) && 
                    (this.get('canDisable') === false || this.get('isEnabled') === true);
    }.property('canDisable', 'isEnabled', 'authFields'),
    enabledDidChange: function() {
        var authFields = this.get('authFields');
        var authFieldsValues = !Ember.isEmpty(authFields) ? authFields.getEach('value').compact() : null;
        
        if (this.get('isEnabled') === true && this.get('canVerify') === true 
                    && !Ember.isEmpty(authFieldsValues) && this.get('isIntegrationHub') !== true) {
            this.verify()
                .then(undefined, this.handleError);
        }
    }.observes('isEnabled'),
    isButtonDisabled: function() {
        var authFields = this.get('authFields') || [];
        var populatedFields = authFields.getEach('value').reject(function(val) {
            return Ember.isEmpty(val);
        });

        return populatedFields.length !== authFields.length ? 'disabled' : false
                    || this.get('isSaving') === true;
    }.property('authFields.@each.value', 'isSaving'),
    actions: {
        clickConnect: function() {
            this.set('isSaving', true);
            this.validateFields()
                .then(this.verifyAndSave)
                .then(this.navigateToIntegrationHubOauth)
                .then(undefined, this.handleError);
        },
        clickSave: function() {
            this.set('isSaving', true);
            this.validateFields()
                .then(this.verifyAndSave)
                .then(undefined, this.handleError);
        },
        clickConnectOauth: function() {
            this.set('isSaving', true);
            this.validateFields()
                .then(this.performOauth)
                .then(undefined, this.handleError);
        },
        clickSaveOauth: function() {
            this.set('isSaving', true);
            
            var socialAccount = this.get('socialAccounts').findBy('token', this.get('socialAccountToken'));
            
            this.set('saveObj', {
                Id: this.get('customSettingId'),
                Name: this.get('name'),
                Enabled__c: this.get('isEnabled'),
                Field1__c: socialAccount.token,
                Field2__c: socialAccount.id,
                Field3__c: socialAccount.name
            });
            
            this.validateFields()
                .then(this.saveCustomSetting)
                .then(undefined, this.handleError)
        },
        clickDisconnectOauth: function() {
            this.disconnectOauth()
                .then(undefined, this.handleError);
        }
    },
    disconnectOauth: function() {
        var self = this;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.removeIntegrationHubSetting(self.get('name'),  function(removeRes, removeResObj) {
                self.setProperties({
                    customSettingId: null,
                    icSetting: null,
                    authFields: [],
                    isEnabled: false,
                    isConnected: false
                });

                if (removeRes) {
                    resolve(self);
                } else {
                    self.set('errorMessage', labels.pleaseContactTechnicalSupport);
                    reject(self);
                }

            });
        });
    },
    validateFields: function() {
        // Hook to perform validation if needed.

        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            resolve(self);
        });
    },
    verify: function() {
        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Build verify object
            var verifyObj = {
                isOauth: self.get('oauth'),
                name: self.get('name'),
                values: self.get('authFields').getEach('value')
            };

            cont.verify(JSON.stringify(verifyObj), function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.setProperties({
                            error: parsedResult.errorMessages[0],
                            isConnected: false
                        });
                        reject(self);
                    } else {
                        self.setProperties({
                            isConnected: self.get('isEnabled'),
                            errorMessage: null
                        });

                        resolve(self);
                    }
                } else {
                    self.setProperties({
                        error: labels.pleaseContactTechnicalSupport,
                        isConnected: false
                    });
                    reject(self);
                }
            });
        });
    },
    verifyAndSave: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Build object to send to backend for verification + saving
            var verifyAndSaveObj = {};

            // Build verify object
            var verifyObj = {
                isOauth: self.get('oauth'),
                name: self.get('name'),
                values: self.get('authFields').getEach('value')
            };

            // Only verify if canVerify is true, it's not for Integration Hub and the integration is enabled.
            // Do NOT verify for Integration Hub as that is a special case.
            var shouldVerify = self.get('type') !== 'Default' && 
                                    self.get('canVerify') === true && self.get('isEnabled') === true;
            // Build custom setting object
            var saveObj = {
                Id: self.get('customSettingId'),
                Name: self.get('name'),
                Enabled__c: self.get('isEnabled'),
                User__c: self.get('type') === 'Default' ? userId : 'Default'
            };

            self.get('authFields').forEach(function(af, index) {
                var fieldKey = 'Field' + parseInt(index + 1) + '__c';
                saveObj[fieldKey] = af.value;
            });

            verifyAndSaveObj.saveObj = saveObj;
            verifyAndSaveObj.verifyObj = verifyObj;

            cont.verifyAndSave(JSON.stringify(verifyAndSaveObj), shouldVerify, function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.setProperties({
                            error: parsedResult.errorMessages[0],
                            isConnected: false,
                            isSaving: false
                        });
                        reject(self);
                    } else {
                        self.setProperties({
                            isConnected: self.get('isEnabled'),
                            customSettingId: parsedResult.data.integrationCredential.Id,
                            errorMessage: null,
                            tempModel: JSON.parse(JSON.stringify(self.get('model')))
                        });                        

                        if (self.get('canVerify') === false || self.get('isEnabled') === false) {
                            self.set('successfulSaveMessage', labels.yourChangesHaveBeenSaved);
                        }

                        self.set('isSaving', false);

                        resolve(self);
                    }
                } else {
                    self.setProperties({
                        error: resObj.message,
                        isConnected: false,
                        isSaving: false
                    });
                    reject(self);
                }
            });
        });
    },
    navigateToIntegrationHubOauth: function(self) {
        var redirectUri;

        if (!Ember.isEmpty(extvfnamespace)) {
            redirectUri = 'http://login.salesforce.com/apex/' + extvfnamespace + '__to_creds?type=Default';
        } else {
            redirectUri = 'http://login.salesforce.com/apex/to_creds?type=Default';
        }

        var clientId = self.get('authFields')[0].value;
        var authUrl = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id='
                        + clientId + '&redirect_uri=' + redirectUri;

        window.location.href = authUrl;
    },
    performOauth: function(self) {
        var redirectUri, url = routeUri + 'connect/' + self.get('name').toLowerCase();
        
        redirectUri = window.location.href = window.location.href.split('?')[0] + '?name=' + self.get('name') + '&returnUrl=' + encodeURIComponent(this.returnUrl);
        
        $form = $('<form action="' + url + '" method="post"></form>');
        $form.append('<input name="url" type="text" value="' + redirectUri + '" />');
        if (self.get('name') == 'Facebook') {
            $form.append('<input name="scope" type="text" value="manage_pages, publish_actions" />');
        } else if (self.get('name') == 'LinkedIn') {
            $form.append('<input name="scope" type="text" value="rw_company_admin" />');
        }
        $('body').append($form);
        $form.submit();
    },
    saveCustomSetting: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var saveMap = {
                verifyObj: {},
                saveObj: self.get('saveObj')
            }
            cont.verifyAndSave(JSON.stringify(saveMap), false, function(saveRes, saveResObj) {
                window.location.href = window.location.href.split('?')[0] + '?name=' + self.get('saveObj').Name;
            });
        });
    },
    handleError: function(self) {
        var error = self.get('error');

        self.set('errorMessage', error);
    }
});

// Routes

App.MainRoute = Ember.Route.extend({
    model: function () {
        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            var pageData = JSON.parse(rawPageData);
            var currentICSettings = JSON.parse(icSettings);

            // Check for error conditions
            if (!pageData.isSuccess) {
                // This contains the error conditions.
                pageData.connectionMessage = pageData.errorMessages[0];

                resolve(pageData); // This is the object.
            }
            
            pageData.isSystemPage = isSystemPage;
            pageData.returnUrl = returnUrl;
            
            // Process Channel Data to make it easier to find and separate from actual page data.
            var channelData = JSON.parse(pageData.data.channelData);
            pageData.data.channelData = ''; // Clear it out after we get it. (Keep it from submitting to the back-end)

            pageData.channelData = channelData._embedded.channels.sortBy('name');

            // Check if the Integration Hub is setup, as some channel data depend on it.
            var channelDataIntegrationHubSetting = pageData.channelData.findBy('type', 'Default');
            var integrationHubSettingName = !Ember.isEmpty(channelDataIntegrationHubSetting) ? channelDataIntegrationHubSetting.name : null;

            cont.getIntegrationHubSetting(integrationHubSettingName, function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        // Didn't find Integration Hub setting, it's OK.
                        //pageData.isHubConnected = false;
                    } else {
                        var integrationHubSetting = parsedResult.data.iHSettingObj.iHSetting;
                        if (!Ember.isEmpty(integrationHubSetting)) {
                            //pageData.isHubConnected = true;
                            pageData.clientId = integrationHubSetting.Field1__c;
                            pageData.clientSecret = integrationHubSetting.Field2__c;
                            pageData.iHSettingUserEmail = parsedResult.data.iHSettingObj.userEmail;

                            currentICSettings.addObject(integrationHubSetting);
                        } else {
                            //pageData.isHubConnected = false;
                        }
                    }
                } else {
                    //pageData.isHubConnected = false;
                }

                // Iterate through each channel data to properly format the required fields,
                // and populated them if a stored value is found from the custom settings.

                pageData.channelData.forEach(function(cd) {
                    if (Ember.isEmpty(cd.authParams)) {
                        cd.authParams = Ember.A();
                    }
                    // Check the Integration Credential settings we pulled back if we have one for this channel data.
                    var icSettingForField = currentICSettings.findBy('Name', cd.name);

                    cd.authFields = [];

                    cd.authParams.forEach(function(ap, index) {
                        // Values in the custom setting are stored as Field1, Field2, Field3 so we can use the iterator to create the key.
                        var fieldKey = 'Field' + parseInt(index + 1) + '__c';

                        var authField = {
                            label: ap,
                            value: !Ember.isNone(icSettingForField) ? icSettingForField[fieldKey] : null,
                            inputType: ap === 'Consumer Secret' || ap.toLowerCase() === 'password' ? 'password' : 'text' // Hard coding password field for Integration Hub
                        };

                        cd.authFields.addObject(authField);

                    });
                    
                    if (!Ember.isNone(icSettingForField)) {
                        cd.customSettingId = icSettingForField.Id;
                        cd.isConnected = cd.canDisable === false || icSettingForField.Enabled__c; // Only connect if enabled.
                        cd.isEnabled = icSettingForField.Enabled__c;
                        cd.icSetting = icSettingForField;   // Used to access other fields from the custom setting, such as refresh token on Integration Hub.
                    } else {
                        cd.isConnected = false;
                    }
                    
                });

                resolve(pageData); // This is the object.
            });
        });
    },
    isJPNoConfig: function() {
        return !(this.isSystemPage || this.isHubConnected);
    }.observes('isHubConnected', 'isSystemPage'),
    afterModel: function(model, transition, queryParams) {
        if (model.isSuccess) {
            var integrationHub = model.channelData.findBy('name', 'Integration Hub');
            this.transitionTo('integration', integrationHub.id);
        }
    }
});

App.IntegrationRoute = Ember.Route.extend({
    model: function(params) {
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {

            var integration = self.modelFor('main').channelData.findBy('id', params.id);

            if (errorParam === 'access_denied') {
                // If coming back from connected app oauth with an error

                integration.isConnected = false;

                cont.removeIntegrationHubSetting(integration.name, function(removeRes, removeResObj) {
                    // Clear out the Integration Hub data

                    integration.customSettingId = null;
                    integration.icSetting = null;
                    integration.authFields.forEach(function(af) {
                        af.value = null;
                    });

                    if (removeRes) {
                        integration.errorMessage = labels.pleaseEnsureYouAllowAccess;
                    } else {
                        integration.errorMessage = labels.pleaseContactTechnicalSupport;
                    }

                    resolve(integration);
                });
            } else if (!Ember.isEmpty(token1Param)) {
                if (nameParam == TWITTER_CHANNEL_NAME && !Ember.isEmpty(token2Param)) {
                    var twitterSettings = self.modelFor('main').channelData.findBy('name', nameParam);
                    var twitterSettingsId = twitterSettings ? twitterSettings.Id : null;

                    var verifyObj = {
                        isOauth: twitterSettings.oauth,
                        name: twitterSettings.name,
                        values: [token1Param, token2Param]
                    };

                    cont.verify(JSON.stringify(verifyObj), function(res, resObj) {
                        if (res) {
                            var parsedResult = parseResult(res);
                            if (parsedResult.isSuccess) {
                                var saveMap = {
                                    verifyObj: {},
                                    saveObj: {
                                        Id: twitterSettingsId,
                                        Name: nameParam,
                                        Field1__c: token1Param,
                                        Field2__c: token2Param,
                                        Field3__c: parsedResult.data.socialAccounts[0].name,
                                        Enabled__c: true
                                    }
                                };

                                cont.verifyAndSave(JSON.stringify(saveMap), false, function(saveRes, saveResObj) {
                                    window.location.href = window.location.href.split('?')[0] + '?name=' + nameParam + '&returnUrl=' + encodeURIComponent(self.modelFor('main').returnUrl);
                                });
                            } else {
                                integration.errorMessage = parsedResult.errorMessages[0];
                                resolve(integration);
                            }
                        } else {
                            integration.errorMessage = resObj.errorMessages[0];
                            resolve(integration);
                        }
                    });
                } else if (nameParam && nameParam != TWITTER_CHANNEL_NAME) {
                    var channelSettings = self.modelFor('main').channelData.findBy('name', nameParam);
                    var channelSettingsId = channelSettings ? channelSettings.Id : null;

                    var verifyObj = {
                        isOauth: channelSettings.oauth,
                        name: channelSettings.name,
                        values: [null, null, token1Param]
                    };

                    cont.verify(JSON.stringify(verifyObj), function(res, resObj) {
                        if (res) {
                            var parsedResult = parseResult(res);
                            if (parsedResult.isSuccess) {
                                var channel = self.modelFor('main').channelData.findBy('name', nameParam);
                                if (channel) {
                                    channel.socialAccounts = parsedResult.data.socialAccounts;
                                    channel.socialAccountToken = '';
                                }
                                resolve(integration);
                            } else {
                                integration.errorMessage = parsedResult.errorMessages[0];
                                resolve(integration);
                            }
                        } else {
                            integration.errorMessage = resObj.errorMessages[0];
                            resolve(integration);
                        }
                    });
                } else {
                    // window.location.href = window.location.href.split('?')[0];
                    return;
                }
            } else if (typeParam === 'Default' && !Ember.isEmpty(codeParam)) {
                // If coming back from connected app oauth, ping the hub to verify.

                nameParam = '';

                cont.verifyIntegrationHub(integration.name, codeParam, function(iHRes, iHResObj) {
                    if (iHRes) {
                        var ihParsedResult = parseResult(iHRes);
                        if (!Ember.isEmpty(ihParsedResult.errorMessages)) {
                            integration.errorMessage = ihParsedResult.errorMessages[0];
                            integration.isConnected = false;

                            resolve(integration);
                        } else {
                            if (ihParsedResult.data.isValid === true) {
                                integration.isConnected = true;

                                var customSettingObj = {
                                    Id: integration.customSettingId,
                                    Field3__c: ihParsedResult.data.refreshToken
                                };
                                // Save down refresh token and reload route.

                                var saveMap = {
                                    verifyObj: {},
                                    saveObj: customSettingObj
                                };

                                cont.verifyAndSave(JSON.stringify(saveMap), false, function(saveRes, saveResObj) {
                                    if (saveRes) {
                                        window.location.href = window.location.href.split('?')[0];
                                    } else {
                                        window.location.href = window.location.href.split('?')[0];
                                    }
                                });

                            } else {
                                integration.isConnected = false;

                                // If verify for integration hub failed, we want to wipe out the custom setting.
                                cont.removeIntegrationHubSetting(integration.name, function(removeRes, removeResObj) {
                                    integration.customSettingId = null;
                                    integration.icSetting = null;
                                    integration.authFields.forEach(function(af) {
                                        af.value = null;
                                    });
                                    
                                    if (removeRes) {
                                        integration.errorMessage = labels.pleaseDoubleCheckTheCredentials;                                        
                                    } else {
                                        integration.errorMessage = labels.pleaseContactTechnicalSupport;
                                    }

                                    resolve(integration);
                                });
                            }

                        }
                    } else {
                        integration.isConnected = false;
                        integration.customSettingId = null;
                        integration.icSetting = null;
                        integration.authFields.forEach(function(af) {
                            af.value = null;
                        });
                        integration.errorMessage = labels.pleaseContactTechnicalSupport;  

                        resolve(integration);
                    }
                });
            } else if (integration.type === 'Default') {
                // Always verify refresh token is valid when hitting Integration Hub route
                var refreshToken = !Ember.isNone(integration.icSetting) ? integration.icSetting.Field3__c : null;
                
                if (!Ember.isEmpty(refreshToken)) {
                    cont.verifyRefreshToken(integration.name, refreshToken, function(rtRes, rtResObj) {
                        if (rtRes) {
                            var rtParsedResult = parseResult(rtRes);

                            if (!Ember.isEmpty(rtParsedResult.errorMessages)) {
                                integration.errorMessage = rtParsedResult.errorMessages[0];
                                integration.isConnected = false;

                                resolve(integration);
                            } else {
                                if (rtParsedResult.data.isValid === true) {
                                    integration.isConnected = true;
                                    
                                    resolve(integration);
                                } else {
                                    integration.isConnected = false;
                                    integration.icSetting.Field3__c = null;
                                    integration.customSettingId = null;
                                    integration.icSetting = null;
                                    integration.authFields.forEach(function(af) {
                                        af.value = null;
                                    });

                                    cont.removeIntegrationHubSetting(integration.name, function(removeRes, removeResObj) {
                                        if (removeRes) {
                                            // Clear out the Integration Hub data
                                            integration.errorMessage = labels.pleaseConnectTotheIHAgain;
                                        } else {
                                            integration.errorMessage = labels.pleaseContactTechnicalSupport;  
                                        }

                                        resolve(integration);
                                    });
                                }
                            }
                        } else {
                            integration.isConnected = false;
                            integration.icSetting.Field3__c = null;
                            integration.customSettingId = null;
                            integration.icSetting = null;
                            integration.authFields.forEach(function(af) {
                                af.value = null;
                            });

                            integration.errorMessage = labels.pleaseContactTechnicalSupport;  

                            resolve(integration);
                            // VF remoting error handling
                        }
                    });
                } else {
                    // If we don't have a refresh token, we aren't connected.
                    // Delete any existing Integration Hub custom setting then move on.
                    integration.isConnected = false;

                    if (!Ember.isEmpty(integration.customSettingId)) {
                        cont.removeIntegrationHubSetting(integration.name, function(removeRes, removeResObj) {
                            if (removeRes) {
                                window.location.href = window.location.href.split('?')[0];
                            } else {
                                window.location.href = window.location.href.split('?')[0];
                            }
                        });
                    } else {
                        resolve(integration);
                    }
                }
            } else {
                resolve(integration);
            }
        }); 
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model,
            isIntegrationHub: model.type == 'Default',
            errorMessage: model.errorMessage,
            successfulSaveMessage: null,
            tempModel: JSON.parse(JSON.stringify(model))
        });

        if (model.type === 'Default') {
            this.controllerFor('main').set('isHubConnected', model.isConnected);
        }
        
        // predetermined channel?
        if (firstLoad) {
            if (model.isConnected && nameParam && typeParam != 'Default') {
                var integrationHub = this.modelFor('main').channelData.findBy('name', nameParam);
                if (integrationHub) {
                    this.transitionTo('integration', integrationHub.id);
                    firstLoad = false;
                }
            } else {
                if (!isSystemPage) {
                    // try to set to first job board
                    var firstChannel = this.modelFor('main').channelData.find(function(item) {
                        return item.type == 'Job Board' && item.configurationPage == 'Job Posting';
                    });
                    if (firstChannel) {
                        this.transitionTo('integration', firstChannel.id);
                        firstLoad = false;
                    } else {
                        // try to set to first social
                        firstChannel = this.modelFor('main').channelData.find(function(item) {
                            return item.type == 'Social' && item.configurationPage == 'Job Posting';
                        });
                        if (firstChannel) {
                            this.transitionTo('integration', firstChannel.id);
                            firstLoad = false;
                        }
                    }
                }
            }
        }
    },
    actions: {
        willTransition: function(transition) {
            var tempModel = this.controller.get('tempModel');

            var cancelObj = {
                isEnabled: tempModel.isEnabled,
                authFields: tempModel.authFields
            };

            this.controller.setProperties(cancelObj);
        }
    }
});

App.Router.map(function(){
    this.resource('main', {path: '/'}, function() {
        this.resource('integration', { path: '/:id' });
    });
});

// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});