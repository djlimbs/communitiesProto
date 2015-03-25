eval("(function() {\n\n// Add a labels property to every controller so that we don't have to access the global scope (which was deprecated).\nEmber.ControllerMixin.reopen({\n    labels: labels\n});\n\n// Attribute bindings for QA locators so we can easily add them to ember markup.\nEmber.View.reopen({\n    attributeBindings: ['data-dev', 'data-qa', 'data-qa-label', 'data-qa-button', 'data-qa-input', \n                        'data-qa-link', 'data-qa-pane', 'data-qa-select', 'da-qa-modal', 'data-qa-alert',\n                        'data-qa-container'],\n    didInsertElement : function(){\n        this._super();\n\n        Ember.run.scheduleOnce('afterRender', this, this.initJUI);   \n    },\n    initJUI: function() {\n        // Initialize tooltips if they exist. This might actually be expensive since it's run every time a new view is added. Will refactor.\n        /*if ($('[data-toggle=\"tooltip\"]').length > 0) {\n            $('body').tooltip({\n                selector: '[data-toggle=tooltip]'\n            });\n        }*/\n        this.afterRenderEvent();\n    },\n    afterRenderEvent : function() {\n        // implement this hook in your own subclasses and run your jQuery logic there\n    }\n});\n\n})();//@ sourceURL=../../js/emberBase.js")

eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"createUser\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"showHeaderText\", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n            <p class=\\\"mar--sm--tn\\\">Specify a password now so we can create an account.</p>\\n        \");\n  return buffer;\n  }\nfunction program2(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n                <h3 class=\\\"mar--sm--bn\\\">\\n                    Want to make it easier to accept a job offer?\\n                </h3>\\n            \");\n  }\n\nfunction program4(depth0,data) {\n  \n  \n  data.buffer.push(\"\\n            <span>Or just <a href=\\\"\\\" class=\\\"text-underline\\\">go back to the job</a>.</span>\\n        \");\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container\\\">\\n    <header class=\\\"content pad--md--ts\\\">\\n        <div class=\\\"content__section show-brkpoint--md\\\">\\n            <img class=\\\"mar--sm--bxl theme-logo\\\" src=\\\"../css/img/logo-tagline-company.png\\\"/>\\n        </div>\\n    </header>\\n    <section class=\\\"content content--small pad--sm--m\\\">\\n        <div \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\":alert alertColor :pad--sm--m :mar--sm--bl\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\">\\n            <span class=\\\"part__left--fixed\\\">\\n                <span \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\":juicon alertIcon\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\"></span>\\n            </span>\\n            <span class=\\\"part__body\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"alertText\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</span>\\n        </div>\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"showBodyText\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n        <div class=\\\"form__group\\\">\\n            <label for=\\\"password\\\">Password</label>\\n            <input id=\\\"password\\\" \");\n  hashContexts = {'type': depth0,'value': depth0};\n  hashTypes = {'type': \"ID\",'value': \"ID\"};\n  options = {hash:{\n    'type': (\"inputType\"),\n    'value': (\"password\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\"/>\\n        </div>\\n        <div class=\\\"form__group\\\">\\n            <span class=\\\"part__left pad--sm--n\\\">\\n                \");\n  hashContexts = {'type': depth0,'checked': depth0};\n  hashTypes = {'type': \"STRING\",'checked': \"ID\"};\n  options = {hash:{\n    'type': (\"checkbox\"),\n    'checked': (\"showPass\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n            </span>\\n            <span class=\\\"part__body\\\"><label for=\\\"showPass\\\"> Show password</label></span>\\n        </div>\\n        <button type=\\\"button\\\" class=\\\"button button--primary\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"buttonText\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</button>\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"showJobLink\", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n    </section>\\n</div>\");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nvar sourceClasses = {\n    application : {\n        icon : 'juicon-check-circle',\n        color : 'alert--success',\n        alertText : 'Done! Thank you for applying.',\n        buttonText : 'Create my account'\n    },\n    applyEmail : {\n        icon : 'juicon-info-circle',\n        color : 'alert--info',\n        alertText : 'Your application for the Account Executive position was completed on Mar 17, 2015.',\n        buttonText : 'Create my account'\n    },\n    offerEmail : {\n        icon : 'juicon-exclamation-circle',\n        color : 'alert--warning',\n        alertText : 'Specify a password now so we can create an account and provide you access to your offer.',\n        buttonText : 'Create account and view offer'\n    },\n    error : {\n        icon : 'juicon-exclamation-circle',\n        color : 'alert--success',\n        alertText : 'Please supply a password.',\n        buttonText : 'Create my account'\n    }\n}\n\nApp.CreateUserRoute = Ember.Route.extend({\n    model: function (){\n        console.log('hello');\n        test = {\n            source : source,\n            state : source\n        }\n\n        return test;\n    }\n});\n\nApp.CreateUserController = Ember.ObjectController.extend({\n    alertIcon : function(){\n        return sourceClasses[this.get('state')].icon;\n    }.property('state'),\n    alertColor : function(){\n        return sourceClasses[this.get('state')].color;\n    }.property('state'),\n    alertText : function(){\n        return sourceClasses[this.get('state')].alertText;\n    }.property('state'),\n    buttonText : function(){\n        return sourceClasses[this.get('state')].buttonText;\n    }.property('state'),\n    showJobLink : function(){\n        return this.get('source') == 'application';\n    }.property(),\n    showHeader : function(){\n        return this.get('source') == 'application';  \n    }.property(),\n    showBodyText : function(){\n        return this.get('source') != 'offerEmail';\n    }.property(),\n    inputType : function(){\n        return this.get('showPass') ? 'text' : 'password'\n    }.property('showPass'),\n    actions : {\n        createUser : function(){\n            \n        }\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('createUser', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/to_createUser.js")