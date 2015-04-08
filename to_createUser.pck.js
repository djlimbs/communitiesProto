eval("(function() {\n\n// Add a labels property to every controller so that we don't have to access the global scope (which was deprecated).\nEmber.ControllerMixin.reopen({\n    labels: labels\n});\n\n// Attribute bindings for QA locators so we can easily add them to ember markup.\nEmber.View.reopen({\n    attributeBindings: ['data-dev', 'data-qa', 'data-qa-label', 'data-qa-button', 'data-qa-input', \n                        'data-qa-link', 'data-qa-pane', 'data-qa-select', 'da-qa-modal', 'data-qa-alert',\n                        'data-qa-container'],\n    didInsertElement : function(){\n        this._super();\n\n        Ember.run.scheduleOnce('afterRender', this, this.initJUI);   \n    },\n    initJUI: function() {\n        // Initialize tooltips if they exist. This might actually be expensive since it's run every time a new view is added. Will refactor.\n        /*if ($('[data-toggle=\"tooltip\"]').length > 0) {\n            $('body').tooltip({\n                selector: '[data-toggle=tooltip]'\n            });\n        }*/\n        this.afterRenderEvent();\n    },\n    afterRenderEvent : function() {\n        // implement this hook in your own subclasses and run your jQuery logic there\n    }\n});\n\n})();//@ sourceURL=../../js/emberBase.js")

eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"createUser\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n        <span/>\\n    \");\n  }\n\nfunction program3(depth0,data) {\n  \n  var buffer = '', stack1, hashContexts, hashTypes, options;\n  data.buffer.push(\"\\n            <div \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\":alert alertColor :pad--sm--m :mar--sm--bl\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\">\\n                <span class=\\\"part__left--fixed\\\">\\n                    <span data-qa-icon=\\\"alertIcon\\\" \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\":juicon alertIcon\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\"></span>\\n                </span>\\n                <span data-qa-label=\\\"alertText\\\" class=\\\"part__body\\\">\");\n  hashContexts = {'unescaped': depth0};\n  hashTypes = {'unescaped': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"alertText\", {hash:{\n    'unescaped': (\"true\")\n  },contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</span>\\n            </div>\\n        \");\n  return buffer;\n  }\n\nfunction program5(depth0,data) {\n  \n  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;\n  data.buffer.push(\"\\n            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"showBodyText\", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n            <div class=\\\"form__group\\\">\\n                <label data-qa-label=\\\"password\\\" for=\\\"password\\\">Password</label>\\n                \");\n  hashContexts = {'type': depth0,'value': depth0,'data-qa-input': depth0};\n  hashTypes = {'type': \"ID\",'value': \"ID\",'data-qa-input': \"STRING\"};\n  options = {hash:{\n    'type': (\"inputType\"),\n    'value': (\"password\"),\n    'data-qa-input': (\"password\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n            </div>\\n            <div class=\\\"form__group\\\">\\n                <span class=\\\"part__left pad--sm--n\\\">\\n                    \");\n  hashContexts = {'type': depth0,'checked': depth0,'data-qa-input': depth0};\n  hashTypes = {'type': \"STRING\",'checked': \"ID\",'data-qa-input': \"STRING\"};\n  options = {hash:{\n    'type': (\"checkbox\"),\n    'checked': (\"showPass\"),\n    'data-qa-input': (\"showPassword\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                </span>\\n                <span class=\\\"part__body\\\"><label data-qa-label=\\\"showPassword\\\" for=\\\"showPass\\\"> Show password</label></span>\\n            </div>\\n            <button \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"createUser\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" type=\\\"button\\\" class=\\\"button button--primary\\\" data-qa-button=\\\"createUser\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"buttonText\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</button>\\n            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"showJobLink\", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n        \");\n  return buffer;\n  }\nfunction program6(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"showHeaderText\", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                <p data-qa-label=\\\"subHeaderText\\\" class=\\\"mar--sm--tn\\\">Specify a password now so we can create an account.</p>\\n            \");\n  return buffer;\n  }\nfunction program7(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n                    <h3 data-qa-label=\\\"headerText\\\" class=\\\"mar--sm--bn\\\">\\n                        Want to make it easier to accept a job offer?\\n                    </h3>\\n                \");\n  }\n\nfunction program9(depth0,data) {\n  \n  var buffer = '', stack1, hashContexts, hashTypes, options;\n  data.buffer.push(\"\\n                <span>Or just <a data-qa-link=\\\"jobListing\\\" \");\n  hashContexts = {'href': depth0};\n  hashTypes = {'href': \"STRING\"};\n  options = {hash:{\n    'href': (\"listingPage\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" target=\\\"_top\\\" class=\\\"text-underline\\\">go back to the job</a>.</span>\\n            \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container\\\">\\n    <header class=\\\"content pad--md--ts\\\">\\n        <div class=\\\"content__section show-brkpoint--md\\\">\\n            <img data-qa-image=\\\"logo\\\" class=\\\"mar--sm--bxl theme-logo\\\" \");\n  hashContexts = {'src': depth0};\n  hashTypes = {'src': \"STRING\"};\n  options = {hash:{\n    'src': (\"companyLogo\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\"/>\\n        </div>\\n    </header>\\n    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"resize\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n    <section class=\\\"content content--small pad--sm--m\\\">\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"showAlert\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"showBody\", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n    </section>\\n</div>\");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nvar updateHeight = function() {\n    Ember.run.scheduleOnce('afterRender', this, function() {\n        parent.resizeIframe();\n    });\n};\n\nvar globalThis = this;\nvar alertTextPart1 = 'Sorry, but the user account could not be created.</br>';\nvar alertTextPart2 = '</br>The System Administrator has been notified';\n\n\n\nEmber.View.reopen({\n    willInsertElement: function() {\n        if (parent.resizeIframe) {\n            Ember.run.debounce(globalThis, updateHeight, 100);\n        }\n    },\n    willDestroyElement: function() {\n        if (parent.resizeIframe) {\n            Ember.run.debounce(globalThis, updateHeight, 100);\n        }\n    }\n});\n\nvar sourceClasses = {\n    application : {\n        icon : 'juicon-check-circle',\n        color : 'alert--success',\n        alertText : 'Done! Thank you for applying.',\n        buttonText : 'Create my account',\n        showAlert : true\n    },\n    applyEmail : {\n        icon : 'juicon-info-circle',\n        color : 'alert--info',\n        alertText : 'Your application for the Account Executive position was completed on',\n        buttonText : 'Create my account',\n        showAlert : true\n    },\n    offerEmail : {\n        icon : 'juicon-exclamation-circle',\n        color : 'alert--warning',\n        alertText : 'Specify a password now so we can create an account and provide you access to your offer.',\n        buttonText : 'Create account and view offer',\n        showAlert : true\n    },\n    verifyEmail : {\n        icon : 'juicon-exclamation-circle',\n        color : 'alert--warning',\n        alertText : 'Specify a password now so we can create an account.',\n        buttonText : 'Create my account and continue applying',\n        showAlert : true    \n    },\n    error : {\n        icon : 'juicon-exclamation-circle',\n        color : 'alert--error',\n        alertText : 'Please supply a password.',\n        buttonText : 'Create my account',\n        showAlert : true\n    }\n}\n\nApp.CreateUserRoute = Ember.Route.extend({\n    model: function (){\n        console.log('wtf 6');\n        parsedJSON.state = parsedJSON.source;\n        \n        if(parsedJSON.source == 'applyEmail'){\n            sourceClasses.applyEmail.alertText += ' ' + moment(parsedJSON.app.CreatedDate).format('MMM DD, YYYY');\n        }\n\n        if(!parsedJSON.tokenVerified){\n            sourceClasses.error.alertText = 'Your token is invalid';   \n            parsedJSON.state = 'error';\n        }\n\n        return parsedJSON;\n    }\n});\n\nApp.CreateUserController = Ember.ObjectController.extend({\n    showAlert : function(){\n        return sourceClasses[this.get('state')].showAlert;\n    }.property('state'),\n    alertIcon : function(){\n        return sourceClasses[this.get('state')].icon;\n    }.property('state'),\n    alertColor : function(){\n        return sourceClasses[this.get('state')].color;\n    }.property('state'),\n    alertText : function(){\n        return sourceClasses[this.get('state')].alertText;\n    }.property('state'),\n    buttonText : function(){\n        return sourceClasses[this.get('state')].buttonText;\n    }.property(),\n    showJobLink : function(){\n        return this.get('source') == 'application';\n    }.property(),\n    showBodyText : function(){\n        return this.get('source') != 'offerEmail' && this.get('source') != 'verifyEmail';\n    }.property(),\n    inputType : function(){\n        return this.get('showPass') ? 'text' : 'password'\n    }.property('showPass'),\n    showBody : function(){\n        return this.get('tokenVerified') && !this.get('loggedIn')\n    }.property(),\n    listingPage : function(){\n        return parent.urlPrefix + '/JobListing?id=' + this.get('app').Job_Posting__c;\n    }.property(),\n    resize : true,\n    showPass : true,\n    actions : {\n        createUser : function(){\n            var self = this;\n            console.log('I AM password ' + self.get('password'));\n            if(Ember.isEmpty(self.get('password'))){\n                self.set('state', 'error');\n                sourceClasses['error'].alertText = 'Please supply a password.';\n                self.notifyPropertyChange('state');\n                return;\n            }\n            //remote actions don't have access to the current page so we need to pass the url in from the frontend.\n            cont.checkUser(self.get('app').Id, self.get('baseUrl'), function(checkResults, resultObj){\n                var parsedCheckResults = parseResult(checkResults);\n                console.log(parsedCheckResults);\n                if(parsedCheckResults.errorMessages.length == 0){\n                    console.log('no problems');\n                    cont.createUser(self.get('password'), self.get('app').Id, sourceContact, self.get('source'), joId, function(createResults, resultObj){\n                        var parsedCreateResults = parseResult(createResults);\n                        console.log('I AM CREATE');\n                        console.log(parsedCreateResults);\n                        if(parsedCreateResults.errorMessages.length == 0){\n                            window.parent.location.href = parsedCreateResults.data.url;\n                        } else {\n                            sourceClasses['error'].alertText = parsedCreateResults.errorMessages[0];\n                            self.set('state', 'error');\n                            self.notifyPropertyChange('state');\n                            self.toggleProperty('resize');\n                        }\n                    });\n                } else {\n                    sourceClasses['error'].alertText = alertTextPart1 + parsedCheckResults.errorMessages[0] + alertTextPart2;\n                    self.set('state', 'error');\n                    self.notifyPropertyChange('state');\n                    self.toggleProperty('resize');\n                }\n            });\n        },\n        goToListing : function(){\n            window.parent.location.href = parent.urlPrefix + '/JobListing?id=' + this.get('app').Job_Posting__c;\n        }\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('createUser', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/to_createUser.js")