eval("(function() {\n\nEmber.TEMPLATES[\"profile\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;\n\n\n  data.buffer.push(\"<div class=\\\"scope-container\\\">\\n    <div class=\\\"content--readable pad--md--m pad--sm--only--n\\\">\\n        <nav id=\\\"myProfileNav\\\" class=\\\"nav-bar--sf1 mar--sm--bn\\\">\\n            <button \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"save\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" class=\\\"button button--primary float--right mar--sm--only--rs mar--md--lxs\\\">Save</button>\\n            <button \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"cancel\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" class=\\\"float--right-left button button--secondary mar--sm--only--ls\\\">Cancel</button>\\n            <h1 class=\\\"nav-bar--sf1__title page__heading\\\">My account</h1>\\n        </nav>\\n        <hr class=\\\"show-brkpoint--md\\\"/>\\n        <h3 class=\\\"section__title\\\">General info</h3>\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.log.call(depth0, \"model\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n        <div class=\\\"content__section\\\">\\n            <div class=\\\"row\\\">\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"firstName\\\" class=\\\"required-field\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.firstName\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" </label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.FirstName\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"lastName\\\" class=\\\"required-field\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.lastName\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" </label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.LastName\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n            </div>\\n            <div class=\\\"form__group\\\">\\n                <label for=\\\"title\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.title\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.Title\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n            </div>\\n            <div class=\\\"form__group\\\">\\n                <label for=\\\"companyName\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.companyName\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.CompanyName\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n            </div>\\n            <div class=\\\"form__group\\\">\\n                <label for=\\\"aboutMe\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.aboutMe\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                \");\n  hashContexts = {'value': depth0};\n  hashTypes = {'value': \"ID\"};\n  options = {hash:{\n    'value': (\"user.AboutMe\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || (depth0 && depth0.textarea)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"textarea\", options))));\n  data.buffer.push(\"\\n                <textarea id=\\\"aboutMe\\\"></textarea>\\n            </div>\\n            <div class=\\\"row\\\">\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"email\\\" class=\\\"required-field\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.email\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" </label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.Email\"),\n    'type': (\"email\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"phone\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.phone\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.Phone\"),\n    'type': (\"tel\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"cell\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.mobilePhone\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.MobilePhone\"),\n    'type': (\"tel\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"fax\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.fax\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.Fax\"),\n    'type': (\"tel\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n            </div>\\n        </div>\\n        <hr class=\\\"show-brkpoint--md\\\"/>\\n        <h3 class=\\\"section__title\\\">Address</h3>\\n        <div class=\\\"content__section\\\">\\n            <div class=\\\"form__group\\\">\\n                <label for=\\\"street\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.street\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                <textarea id=\\\"street\\\"></textarea>\\n            </div>\\n            <div class=\\\"row\\\">\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"city\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.city\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.City\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"state\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.state\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.State\"),\n    'type': (\"text\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"zip\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.postalCode\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        \");\n  hashContexts = {'value': depth0,'type': depth0};\n  hashTypes = {'value': \"ID\",'type': \"STRING\"};\n  options = {hash:{\n    'value': (\"user.PostalCode\"),\n    'type': (\"tel\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                    </div>\\n                </div>\\n                <div class=\\\"column--md--6\\\">\\n                    <div class=\\\"form__group\\\">\\n                        <label for=\\\"country\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"labels.country\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</label>\\n                        <input type=\\\"text\\\" id=\\\"country\\\"/>\\n                    </div>\\n                </div>\\n            </div>\\n        </div>\\n        <div class=\\\"clearfix mar--sm--only--tm mar--sm--only--bm\\\">\\n            <hr class=\\\"show-brkpoint--md\\\"/>\\n            <button \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"save\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" class=\\\"button button--primary float--right mar--sm--only--rs mar--md--lxs\\\">Save</button>\\n            <button \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"cancel\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" class=\\\"float--right-left button button--secondary mar--sm--only--ls\\\">Cancel</button>\\n        </nav>\\n    </div>\\n</div>  \");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nApp.ProfileController = Ember.ObjectController.extend({\n    actions : {\n        save : function(){\n            \n        }\n    }\n})\n\nApp.ProfileRoute = Ember.Route.extend({\n    model: function(params) {\n        console.log('hello');\n        parsedJson.labels = labels\n        console.log(parsedJson);\n        return parsedJson;\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('profile', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/tore_createProfile.js")