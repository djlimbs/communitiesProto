App = Ember.Application.create({
    rootElement: '#application'
});

App.Fixtures = Ember.Object.create({
    payloadString: null    
});

// Controllers 

App.MainController = Ember.ObjectController.extend({
    init: function() {
        this._super(); //Handle inheritance, etc...
    },
    
    systemDefaultChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Default' && item.configurationPage == 'System';
    }),
    systemMappingChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Mapping' && item.configurationPage == 'System';
    }),
    systemWebsiteChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Website' && item.configurationPage == 'System';
    }),
    systemBgChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Background Check' && item.configurationPage == 'System';
    }),
    systemSearchEngineChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Search Engine' && item.configurationPage == 'System';
    }),    
    jobPostingJobBoardChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Job Board' && item.configurationPage == 'Job Posting';
    }),
    jobPostingInternalSocialChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Internal Social' && item.configurationPage == 'Job Posting';
    }),
    jobPostingSocialChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Social' && item.configurationPage == 'Job Posting';
    }),
	jobPostingAggregatorChannels: Ember.computed.filter('channelData', function(item, index, array) {
		return item.type == 'Aggregator' && item.configurationPage == 'Job Posting';
	}),
    jobPostingInternalSocialChannels: Ember.computed.filter('channelData', function(item, index, array) {
        return item.type == 'Internal Social' && item.configurationPage == 'Job Posting';
    }),
    disableCalendarLink: function() {
        return this.get('isHubConnected') !== true ? 'Disabled' : false;
    }.property('isHubConnected')
});

// determine if link is disabled
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
    isMyLink: function() {
        return nameParam == this.get('name');
    }.property('name'),
    isIntegrationHubAndIsConnected: function() {
        return this.get('isIntegrationHub') === true && this.get('isHubConnected') === true;
    }.property('isIntegrationHub', 'isHubConnected'),
    disableIntegrationHubInput: function() {
        return this.get('isIntegrationHubAndIsConnected') === true ? 'Disabled' : false;
    }.property('isIntegrationHubAndIsConnected'),
    hasICSettings: function() {
        return icSettings.findBy("Name", this.get('name')) ? true : false;
    }.property('name'),
    connectionStatus: function() {
        return this.get('isConnected') === true ? labels.connectionSuccessfullyEstablished : this.get('hasICSettings') ? labels.reconnectStatus : labels.connectionNotEstablished;
    }.property('isConnected', 'hasICSettings'),
    showAuthFields: function() {
        return !Ember.isEmpty(this.get('authFields')) && 
                    (this.get('canDisable') === false || this.get('isEnabled') === true);
    }.property('canDisable', 'isEnabled', 'authFields'),
    isButtonDisabled: function() {
        var authFields = this.get('authFields') || [];
        var populatedRequiredFields = authFields.reject(function(authField) {
            return Ember.isEmpty(authField.value) || authField.isRequired == false;
        });
        var requiredFields = authFields.reject(function(authField) {
            return authField.isRequired == false;
        });
        var needsSocialAccountToken = this.get('listName') && this.get('socialAccounts') ? (this.get('socialAccountToken') ? false : true) : false;
        
        return (populatedRequiredFields.length !== requiredFields.length || needsSocialAccountToken || this.get('isSaving') === true) ? 'disabled' : false;
    }.property('authFields.@each.value', 'isSaving', 'socialAccountToken'),
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
                Name: this.get('name') + '-' + userId,
                Enabled__c: this.get('isEnabled'),
                Field1__c: socialAccount.token,
                Field2__c: socialAccount.id,
                Field3__c: socialAccount.name,
                User__c: userId
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
            cont.removeIntegrationHubSetting(self.get('name') + '-' + userId,  function(removeRes, removeResObj) {
                self.setProperties({
                    customSettingId: null,
                    icSetting: null,
                    authFields: [],
                    isEnabled: false,
                    isConnected: false
                });

                if (removeRes) {
                    icSettings = icSettings.removeObject(icSettings.findBy("Name", self.get('name')));
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
        
        self.set('showStatus', null);

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
                            isConnected: false,
                            showStatus: true
                        });
                        reject(self);
                    } else {
                        self.setProperties({
                            isConnected: self.get('isEnabled'),
                            errorMessage: null,
                            showStatus: true
                        });
                        resolve(self);
                    }
                } else {
                    self.setProperties({
                        error: labels.pleaseContactTechnicalSupport,
                        isConnected: false,
                        showStatus: true
                    });
                    reject(self);
                }
            });
        });
    },
    verifyAndSave: function(self) {
        self.set('showStatus', null);
        
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
                Name: self.get('configurationPage') === 'System' ? self.get('name') : self.get('name') + '-' + userId,
                Enabled__c: self.get('isEnabled'),
                User__c: self.get('configurationPage') === 'System' ? 'Default' : userId
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
                            isSaving: false,
                            showStatus: true
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
                        self.set('showStatus', true);
                        resolve(self);
                    }
                } else {
                    self.setProperties({
                        error: resObj.message,
                        isConnected: false,
                        isSaving: false,
                        showStatus: true
                    });

                    reject(self);
                }
            });
        });
    },
    navigateToIntegrationHubOauth: function(self) {
        var redirectUri;
        var redirectUriPrefix = loginPrefix;
        var currentUrl = window.location.href;

        if (loginPrefix === 'login' && currentUrl.indexOf('--.') !== -1) {
            redirectUriPrefix = currentUrl.substring(8, currentUrl.indexOf('--.')) + '.my';
        }

        if (!Ember.isEmpty(extvfnamespace)) {
            redirectUri = 'https://' + redirectUriPrefix + '.salesforce.com/apex/' + extvfnamespace + '__to_creds?type=Default';
        } else {
            redirectUri = 'https://' + redirectUriPrefix + '.salesforce.com/apex/to_creds?type=Default';
        }

        var clientId = self.get('authFields')[0].value;
        var authUrl = 'https://' + loginPrefix + '.salesforce.com/services/oauth2/authorize?response_type=code&client_id='
                        + clientId + '&redirect_uri=' + redirectUri;

        window.location.href = authUrl;
    },
    performOauth: function(self) {
        var redirectUri, url = routeUri + 'connect/' + self.get('name').toLowerCase();
        
        redirectUri = window.location.href = window.location.href.split('?')[0] + '?name=' + self.get('name') + '&returnUrl=' + encodeURIComponent(this.returnUrl);
        
        $form = $('<form action="' + url + '" method="post"></form>');
        $form.append('<input name="url" type="text" value="' + redirectUri + '" />');
        if (self.get('name') == 'Facebook') {
            // $form.append('<input name="scope" type="text" value="manage_pages, publish_actions" />');
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
                window.location.href = window.location.href.split('?')[0] + '?name=' + self.get('name') + '&returnUrl=' + encodeURIComponent(this.returnUrl);
            });
        });
    },
    handleError: function(self) {
        var error = self.get('error');

        self.set('errorMessage', error);
    }
});

App.CalendarController = Ember.ObjectController.extend({
    isButtonDisabled: function() {
        return this.get('isEnabled') === true && Ember.isNone(this.get('selectedProvider'));
    }.property('isEnabled', 'selectedProvider'),
    settingsChanged: function() {
        if (!Ember.isEmpty(this.get('successfulSaveMessage'))) {
            this.set('successfulSaveMessage', null);
        }
    }.observes('isEnabled', 'selectedProvider'),
    isMicrosoftExchangeSelected: function() {
        return this.get('selectedProvider') === MICROSOFT_EXCHANGE_NAME;
    }.property('selectedProvider'),
    payloadStringDidChange: function() {
        var payloadString = App.Fixtures.get('payloadString');
        var self = this;

        if (!Ember.isEmpty(payloadString)) {
            cont.parseJWSAndSaveClientId(payloadString, function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (parsedResult.isSuccess === true) {
                        self.set('isConnected', true);
                        self.set('successfulSaveMessage', labels.connectionSuccessfullyEstablished);
                        self.set('customSettingId', parsedResult.data.integrationCredential.Id);
                    } else {
                        console.log(res);
                        // error handling
                    }
                } else {
                    console.log(evt);
                    // error handling
                }
            });
        }
    }.observes('App.Fixtures.payloadString'),
    connectionStatus: function() {
        return this.get('isConnected') === true ? labels.connectionSuccessfullyEstablished : this.get('hasICSettings') ? labels.reconnectStatus : labels.connectionNotEstablished;
    }.property('isConnected', 'hasICSettings'),
    hideSaveButton: function() {
        return this.get('selectedProvider') === MICROSOFT_EXCHANGE_NAME && this.get('isEnabled') === true;
    }.property('selectedProvider', 'isEnabled'),
    hideConnectionButton: function() {
        return this.get('isEnabled') !== true || this.get('selectedProvider') !== MICROSOFT_EXCHANGE_NAME;
    }.property('isEnabled', 'selectedProvider'),
    actions: {
        clickSave: function() {
            this.saveCalendarSetting()
                .then(undefined, this.handleError);
        },
        clickConnectToMicrosoftExchange: function() {
            var oauthOptions = {
                client_id: MICROSOFT_CLIENT_ID,
                redirect_uri: 'https://' + sfInstance + '.salesforce.com/apex/' + extnamespace + 'to_creds',
                response_type: 'code id_token',
                prompt: 'admin_consent',
                resource: encodeURIComponent('https://outlook.office365.com/'),
                scope: 'openid',
                nonce: 'uid-' + moment().valueOf()
            };

            var oauthUrl = 'https://login.microsoftonline.com/common/oauth2/authorize?api-version=1.0'
                            + '&response_type=' + oauthOptions.response_type
                            + '&redirect_uri=' + oauthOptions.redirect_uri
                            + '&client_id=' + oauthOptions.client_id
                            + '&prompt=' + oauthOptions.prompt
                            + '&resource=' + oauthOptions.resource
                            + '&scope=' + oauthOptions.scope
                            + '&nonce=' + oauthOptions.nonce
                            + '&state=' + oauthOptions.state;

            var strWindowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no,height=650,width=600";

            var outlookOauthWindow = window.open(oauthUrl, "Outlook", strWindowFeatures);
        },
        clickDisconnectFromMicrosoftExchange: function() {
            this.disconnectFromMicrosoftExchange()
                .then(undefined, this.handleError);
        }
    },
    saveCalendarSetting: function() {
        var self = this;
        self.set('isSaving', true);
        self.set('showStatus', null);
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Build object to send to backend for verification + saving
            var verifyAndSaveObj = {};
            var selectedProvider = self.get('selectedProvider');
            var isEnabled = self.get('isEnabled');

            // Build custom setting object
            var saveObj = {
                Id: self.get('customSettingId'),
                Name: 'Calendar',
                Field1__c: selectedProvider,
                Enabled__c: isEnabled,
                User__c: 'Default'
            };

            if (selectedProvider === GOOGLE_NAME) {
                saveObj.Field2__c = null;
            }

            if (isEnabled !== true) {
                saveObj.Field1__c = null;
                saveObj.Field2__c = null;
            }

            verifyAndSaveObj.saveObj = saveObj;

            cont.verifyAndSave(JSON.stringify(verifyAndSaveObj), false, function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (parsedResult.isSuccess !== true) {
                        self.setProperties({
                            error: parsedResult.errorMessages[0],
                            isConnected: false,
                            isSaving: false,
                            showStatus: true
                        });
                        reject(self);
                    } else {
                        self.setProperties({
                            isConnected: selectedProvider === GOOGLE_NAME ? false : self.get('isEnabled'),
                            customSettingId: parsedResult.data.integrationCredential.Id,
                            errorMessage: null,
                            tempModel: JSON.parse(JSON.stringify(self.get('model')))
                        });                        

                        self.set('successfulSaveMessage', labels.yourChangesHaveBeenSaved);
                        self.set('isSaving', false);
                        self.set('showStatus', true);
                        resolve(self);
                    }
                } else {
                    self.setProperties({
                        error: resObj.message,
                        isConnected: false,
                        isSaving: false,
                        showStatus: true
                    });

                    reject(self);
                }
            });
        });
    },
    disconnectFromMicrosoftExchange: function() {
        var self = this;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.removeIntegrationHubSetting('Calendar',  function(removeRes, removeResObj) {
                self.setProperties({
                    isEnabled: false,
                    isConnected: false,
                    selectedProvider: null
                });

                if (removeRes) {
                    icSettings = icSettings.removeObject(icSettings.findBy("Name", 'Calendar'));
                    resolve(self);
                } else {
                    self.set('errorMessage', labels.pleaseContactTechnicalSupport);
                    reject(self);
                }

            });
        });
    },
    handleError: function(self) {
        var error = self.get('error');

        self.set('errorMessage', error);
    }
});

// Views

App.MainView = Ember.View.extend({
    didInsertElement: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });
    }
});

// Routes

App.MainRoute = Ember.Route.extend({
    beforeModel: function() {
        var lochash = location.hash.substr(1);

        if (lochash.indexOf('id_token') !== -1) {
            var outlookCode = lochash.substr(lochash.indexOf('id_token=')).split('&')[0].split('=')[1];
            if (window.opener) {
                var payloadString = outlookCode.split('.')[1];
                window.opener.setOutlookPayloadString(payloadString);
                
                //window.opener.setOutlookOauthCode(outlookCode);
                window.close();
            }
        }
    },
    model: function () {
        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            var pageData = JSON.parse(rawPageData);
            var currentICSettings = icSettings;

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
                        pageData.isHubConnected = false;
                        pageData.isJPNoConfig = !pageData.isSystemPage;
                    } else {
                        var integrationHubSetting = parsedResult.data.iHSettingObj.iHSetting;
                        if (!Ember.isEmpty(integrationHubSetting)) {
                            //pageData.isHubConnected = true;
                            pageData.clientId = integrationHubSetting.Field1__c;
                            pageData.clientSecret = integrationHubSetting.Field2__c;
                            pageData.iHSettingUserEmail = parsedResult.data.iHSettingObj.userEmail;

                            currentICSettings.addObject(integrationHubSetting);
                            pageData.isJPNoConfig = !pageData.isSystemPage && Ember.isEmpty(currentICSettings.findBy('Name', 'Career Site'));
                            pageData.isHubConnected = true;
                        } else {
                            pageData.isHubConnected = false;
                            pageData.isJPNoConfig = !pageData.isSystemPage;
                        }
                    }
                } else {
                    pageData.isHubConnected = false;
                }
                
                jobPostingDescribe = jobPostingDescribe.sortBy('name');
                chatterGroups = chatterGroups.sortBy('name');
                
                // CUSTOM CHANNEL (HARD-CODED)
                
                // hard-coded channel
                /*pageData.channelData.push({
                    id: "0",
                    name: "Calendar",
                    type: "Custom",
                    canVerify: false,
                    canDisable: true,
                    hubRequired: false,
                    oauth: true,
                    socialAccounts: false,
                    authParams: [{
                        name: "PROVIDER",
                        inputType: "PICKLIST",
                        required: true,
                        tooltip: false
                    }],
                    configurationPage: "System"
                });*/
                
                // Iterate through each channel data to properly format the required fields,
                // and populated them if a stored value is found from the custom settings
                pageData.channelData.forEach(function(cd) {
                    if (Ember.isEmpty(cd.authParams)) {
                        cd.authParams = Ember.A();
                    }
                    // Check the Integration Credential settings we pulled back if we have one for this channel data.
                    var icSettingForField = currentICSettings.findBy('Name', pageData.isSystemPage ? cd.name : cd.name + '-' + userId);
                    cd.authFields = [];

                    var selectValues = null;
                    if (cd.name == 'Indeed') {
                        selectValues = jobPostingDescribe;
                    }
                    else if (cd.name == 'Chatter') {
                        selectValues = chatterGroups;
                    }
                    
                    cd.authParams.forEach(function(ap, index) {
                        // Values in the custom setting are stored as Field1, Field2, Field3, Field4, Field5, Field6, Field7 so we can use the iterator to create the key.
                        var fieldKey = 'Field' + parseInt(index + 1) + '__c';
                        var inputTypeMap = {
                            string : "text",
                            password : "password",
                            picklist : "select"
                        }
                        var authField = {
                            content: inputTypeMap[ap.inputType.toLowerCase()] == 'select' ? selectValues : null,
                            hasTooltip : ap.tooltip,
                            inputType: inputTypeMap[ap.inputType.toLowerCase()],
                            isSelect : inputTypeMap[ap.inputType.toLowerCase()] == 'select',
                            isRequired: ap.required,
                            label: ap.name,
                            tooltip : labels["tooltip_" + cd.name.toLowerCase() + "_" + ap.name.replace(' ','').toLowerCase()],
                            value: !Ember.isNone(icSettingForField) ? icSettingForField[fieldKey] : null
                        };
                        cd.authFields.push(authField);
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
    afterModel: function(model, transition, queryParams) {
        if (model.isSuccess) {
            if (nameParam && typeParam != 'Default') {
                var integrationHub = model.channelData.findBy('name', nameParam);
                if (integrationHub) {
                    this.transitionTo('integration', integrationHub.id);
                }
            } else {
                if (!isSystemPage) {
                    // try to set to first job board
                    var firstChannel = model.channelData.find(function(item) {
                        return item.type == 'Job Board' && item.configurationPage == 'Job Posting';
                    });
                    if (firstChannel) {
                        this.transitionTo('integration', firstChannel.id);
                    } else {
                        // try to set to first social
                        firstChannel = model.channelData.find(function(item) {
                            return item.type == 'Social' && item.configurationPage == 'Job Posting';
                        });
                        if (firstChannel) {
                            this.transitionTo('integration', firstChannel.id);
                        }
                    }
                } else {
                    var integrationHub = model.channelData.findBy('name', 'Integration Hub');
                    this.transitionTo('integration', integrationHub.id);
                }
            }
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
                                        Name: nameParam + '-' + userId,
                                        Field1__c: token1Param,
                                        Field2__c: token2Param,
                                        Field3__c: parsedResult.data.socialAccounts[0].name,
                                        Enabled__c: true,
                                        User__c: userId
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
                var redirectUri;
                var currentUrl = window.location.href;
                var redirectUriPrefix = loginPrefix;

                if (loginPrefix === 'login' && currentUrl.indexOf('--c.') !== -1) {
                    redirectUriPrefix = currentUrl.substring(8, currentUrl.indexOf('--c.')) + '.my';
                }

                if (!Ember.isEmpty(extvfnamespace)) {
                    redirectUri = 'https://' + redirectUriPrefix + '.salesforce.com/apex/' + extvfnamespace + '__to_creds?type=Default';
                } else {
                    redirectUri = 'https://' + redirectUriPrefix + '.salesforce.com/apex/to_creds?type=Default';
                }

                nameParam = '';

                cont.verifyIntegrationHub(integration.name, codeParam, redirectUri, function(iHRes, iHResObj) {
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
                // verify credentials
                if (integration.canVerify) {
                    var currentICSettings = icSettings;
                    var icSettingForField = currentICSettings.findBy('Name', integration.name);
                    
                    if (!icSettingForField) {
                        resolve(integration);
                        return;
                    }

                    var verifyObj = {
                        "isOauth" : integration.oauth,
                        "name" : integration.name,
                        "values" : [icSettingForField.Field1__c, icSettingForField.Field2__c]
                    };
                    
                    cont.verify(JSON.stringify(verifyObj), function(res, resObj) {
                        if (res) {
                            var parsedResult = parseResult(res);

                            if (!Ember.isEmpty(parsedResult.errorMessages)) {
                                integration.isConnected = false;
                                
                                resolve(integration);
                            } else {
                                integration.isConnected = integration.isEnabled;

                                resolve(integration);
                            }
                        } else {
                            integration.isConnected = false;
                            
                            reject(integration);
                        }
                    });
                } else {
                    resolve(integration);
                }
            }
        }); 
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model,
            isIntegrationHub: model.type == 'Default',
            enablePostingTo: model.name == 'Chatter' ? labels.enablePostingToChatter.replace('{0}', model.name) : labels.enablePostingTo.replace('{0}', model.name),
            errorMessage: model.errorMessage,
            successfulSaveMessage: null,
            showStatus: true,
            tempModel: JSON.parse(JSON.stringify(model))
        });

        if (model.type === 'Default') {
            this.controllerFor('main').set('isHubConnected', model.isConnected);
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
        this.resource('calendar', { path: '/' });
    });
});

App.CalendarRoute = Ember.Route.extend({
    model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var calendarIc = icSettings.findBy('Name', 'Calendar');
            var calendar = {
                selectContent: [
                    {
                        "name" : GOOGLE_NAME,
                        "value" : GOOGLE_NAME
                    },
                    {
                        "name" : MICROSOFT_EXCHANGE_NAME,
                        "value" : MICROSOFT_EXCHANGE_NAME
                    }
                ]
            };

            if (!Ember.isNone(calendarIc)) {
                calendar.isEnabled = calendarIc.Enabled__c;
                calendar.selectedProvider = calendarIc.Field1__c;
                calendar.isConnected = calendarIc.Field1__c === MICROSOFT_EXCHANGE_NAME && !Ember.isEmpty(calendarIc.Field2__c);
                calendar.customSettingId = calendarIc.Id;
            }
            
            resolve(calendar);
        });
    }
});

// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});
