eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"jobSearch\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n\n\n  hashTypes = {};\n  hashContexts = {};\n  options = {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, \"searchBar\", options) : helperMissing.call(depth0, \"partial\", \"searchBar\", options))));\n  data.buffer.push(\"\\n\\n\");\n  hashTypes = {};\n  hashContexts = {};\n  options = {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, \"searchResults\", options) : helperMissing.call(depth0, \"partial\", \"searchResults\", options))));\n  return buffer;\n  \n});\n\nEmber.TEMPLATES[\"searchBar\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashContexts, hashTypes, options;\n  data.buffer.push(\"\\n                                <div class=\\\"form__group mar--sm--tm mar--md--bn\\\">\\n                                    <div class=\\\"input__wrap has-icon--right\\\">\\n                                        <div class=\\\"input__icon juicon juicon-chch\\\"></div>\\n                                        \");\n  hashContexts = {'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0};\n  hashTypes = {'type': \"STRING\",'placeholder': \"STRING\",'class': \"STRING\",'value': \"ID\"};\n  options = {hash:{\n    'type': (\"text\"),\n    'placeholder': (\"City, State or Zip\"),\n    'class': (\"bg-1\"),\n    'value': (\"nearValue\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                                    </div>\\n                                </div>\\n                            \");\n  return buffer;\n  }\n\nfunction program3(depth0,data) {\n  \n  var buffer = '', hashContexts, hashTypes;\n  data.buffer.push(\"\\n                                <div class=\\\"row\\\">\\n                                    <div class=\\\"column--sm--6\\\">\\n                                        <div class=\\\"form__group mar--md--tm mar--md--bn\\\">\\n                                            <div class=\\\"select__wrap\\\">\\n                                                <div class=\\\"input__icon juicon juicon-down\\\"></div>\\n                                                \");\n  hashContexts = {'content': depth0,'value': depth0};\n  hashTypes = {'content': \"ID\",'value': \"ID\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"select\", {hash:{\n    'content': (\"radiusOptions\"),\n    'value': (\"selectedRadius\")\n  },contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n                                            </div>\\n                                        </div>\\n                                    </div>\\n                                    <div class=\\\"column--sm--6\\\">\\n                                        <div class=\\\"form__group mar--md--tm mar--md--bn\\\">\\n                                            <div class=\\\"select__wrap\\\">\\n                                                <div class=\\\"input__icon juicon juicon-down\\\"></div>\\n                                                \");\n  hashContexts = {'content': depth0,'value': depth0};\n  hashTypes = {'content': \"ID\",'value': \"ID\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"select\", {hash:{\n    'content': (\"radiusUnits\"),\n    'value': (\"selectedUnit\")\n  },contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n                                            </div>\\n                                        </div>\\n                                    </div>\\n                                </div>\\n                            \");\n  return buffer;\n  }\n\nfunction program5(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"showResultsCount\", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                \");\n  return buffer;\n  }\nfunction program6(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                        <span class=\\\" text-white\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"numberOfJobs\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"  <span class=\\\"text-faded\\\">jobs found</span></span>\\n                    \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container\\\">\\n    <div class=\\\"community-hero mar--sm--bm\\\" style=\\\"background: #33536d;\\\">\\n        <div class=\\\"community-hero__bg\\\" style=\\\"background-image: url('http://www.salesforce.com/assets/images/careers/business-background.jpg')\\\"></div>\\n        <div class=\\\"content community-hero__content\\\" style=\\\"max-width: 700px; margin: 0 auto;\\\">\\n            <h1 class=\\\"text-center mar--md--bxl mar--md--txl\\\"><span class=\\\"text-white\\\">Find your #dreamjob</span></h1>\\n            <div class=\\\"table-group mar--md--bxl\\\">\\n                <div class=\\\"table-group__object--large block-on-small pad--sm--only--rn\\\">\\n                    <div class=\\\"row\\\">\\n                        <div class=\\\"column--md--6\\\">\\n                            <div class=\\\"form__group mar--md--bn\\\">\\n                                <div class=\\\"input__wrap has-icon--right\\\">\\n                                    <div class=\\\"input__icon juicon juicon-search\\\"></div>\\n                                    \");\n  hashContexts = {'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0};\n  hashTypes = {'type': \"STRING\",'placeholder': \"STRING\",'class': \"STRING\",'value': \"ID\"};\n  options = {hash:{\n    'type': (\"text\"),\n    'placeholder': (\"Search jobs...\"),\n    'class': (\"bg-1\"),\n    'value': (\"searchTerm\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n  data.buffer.push(\"\\n                                </div>\\n                            </div>\\n                        </div>\\n                        <div class=\\\"column--md--6\\\">\\n                            <div class=\\\"form__group mar--md--bn\\\">\\n                                <div class=\\\"select__wrap\\\">\\n                                    <div class=\\\"input__icon juicon juicon-down\\\"></div>\\n                                    \");\n  hashContexts = {'content': depth0,'value': depth0};\n  hashTypes = {'content': \"ID\",'value': \"ID\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"select\", {hash:{\n    'content': (\"jobFamilies\"),\n    'value': (\"selectedJobFamily\")\n  },contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n                                </div>\\n                            </div>\\n                        </div>\\n                        <div class=\\\"column--md--6\\\">\\n                            <div class=\\\"form__group mar--sm--tm mar--md--bn\\\">\\n                                <div class=\\\"select__wrap\\\">\\n                                    <div class=\\\"input__icon juicon juicon-location\\\"></div>\\n                                    \");\n  hashContexts = {'content': depth0,'value': depth0};\n  hashTypes = {'content': \"ID\",'value': \"ID\"};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"select\", {hash:{\n    'content': (\"locations\"),\n    'value': (\"selectedLocation\")\n  },contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n                                </div>\\n                            </div>\\n                        </div>\\n                        <div class=\\\"column--md--6\\\">\\n                            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"isNear\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n                            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"isNearMe\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n                        </div>\\n                    </div>\\n                </div>\\n                <div class=\\\"table-group__object--small pad--md--lm block-on-small width--full--sm--only mar--sm--only--bxl\\\">\\n                    <button type=\\\"button\\\" \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\":button :button--primary :width--full--sm--only :theme-bg-color isSearching:load-this\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickSearch\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Search</button>\\n                </div>\\n            </div>\\n            <h1 class=\\\"text-center mar--sm--tn mar--sm--bxl\\\">\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"searchResults\", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n            </h1>\\n        </div>\\n    </div>\\n</div>\");\n  return buffer;\n  \n});\n\nEmber.TEMPLATES[\"searchResults\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <div class=\\\"card\\\">\\n                        <div class=\\\"card__body\\\">\\n                            <a href=\\\"prototype__job.html\\\" class=\\\"float--right button button--primary  theme-bg-color mar--sm--only--rs mar--md--lxs show-brkpoint--md theme-bg-color\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"saveJob\", \"searchResult\", {hash:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Save</a>\\n\\n                             \\n\\n                            <div class=\\\"row\\\">\\n                                <div class=\\\"column--md--8\\\">\\n                                    <h1 class=\\\"page__heading has-subheading\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApply\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"searchResult.Name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</a></h1>\\n                                    <h2 class=\\\"page__subheading\\\">\\n                                        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"searchResult.firstLocationString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" \\n                                        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"searchResult.otherLocationsString\", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                                    </h2>\\n                                </div>\\n                            </div>\\n                            <div class=\\\"card__text\\\">\\n                                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"field\", \"in\", \"searchResult.fieldsToDisplay\", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                            </div>\\n                        </div>\\n                    </div>\\n                \");\n  return buffer;\n  }\nfunction program2(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\" &amp; <a href=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"searchResult.jobPostingUrl\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\" target=\\\"_top\\\" data-toggle=\\\"tooltip\\\" title=\\\"\\\" class=\\\"pointer text-primary text-underline\\\" data-original-title=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"searchResult.otherLocationsString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"searchResult.otherLocationsCount\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" others</a>\\n                                        \");\n  return buffer;\n  }\n\nfunction program4(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                                    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"field.value\", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                                \");\n  return buffer;\n  }\nfunction program5(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                                        <div class=\\\"job-field\\\">\\n                                            <h4 class=\\\"job-field-label\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"field.label\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h4>\\n                                            \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"field.value\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n                                        </div>\\n                                    \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container brand__border-accent--top\\\" style=\\\"border-top-color: #cf5c60\\\">\\n    <div class=\\\"content pad--md--txl pad--md--bl\\\">\\n        <div class=\\\"row\\\">\\n            <div class=\\\"column--md--8\\\">\\n                <div class=\\\"alert alert--success mar--md--bm hide\\\">\\n                    <button type=\\\"button\\\" class=\\\"close show-brkpoint--sm--only\\\" data-dismiss=\\\"alert\\\"><span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span></button>\\n                    <button type=\\\"button\\\" class=\\\"close close-timeout show-brkpoint--md\\\">\\n                        <svg class=\\\"close-progress\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 40 40\\\" enable-background=\\\"new 0 0 40 40\\\">\\n                            <circle class=\\\"progress-track progress-track--success\\\" cx=\\\"20\\\" cy=\\\"20\\\" r=\\\"19\\\" opacity=\\\"0\\\" stroke=\\\"#000\\\" stroke-width=\\\"2.5\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></circle>\\n                            <path d=\\\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\\\" class=\\\"progress progress--success\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></path></svg>\\n                        <span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span>\\n                    </button>\\n                    <strong>You've successfully applied for this job.</strong>\\n                </div>\\n                \");\n  hashContexts = {'itemController': depth0};\n  hashTypes = {'itemController': \"STRING\"};\n  stack1 = helpers.each.call(depth0, \"searchResult\", \"in\", \"searchResults\", {hash:{\n    'itemController': (\"jobPosting\")\n  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n            </div>\\n\\n            \");\n  hashTypes = {};\n  hashContexts = {};\n  options = {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, \"sideBar\", options) : helperMissing.call(depth0, \"partial\", \"sideBar\", options))));\n  data.buffer.push(\"\\n\\n        </div>\\n    </div>\\n</div>\");\n  return buffer;\n  \n});\n\nEmber.TEMPLATES[\"sideBar\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n        <div class=\\\"content__section mar--md--bxl\\\">\\n            <h3 class=\\\"mar--sm--tn mar--sm--bn\\\"><span class=\\\"juicon juicon-bookmark text-faded\\\"></span> My saved jobs</h3>\\n            <ul class=\\\"list-style-type-none mar--sm--n\\\">\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"application\", \"in\", \"applications\", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n            </ul>\\n        </div>\\n        <hr class=\\\"show-brkpoint--md\\\">\\n    \");\n  return buffer;\n  }\nfunction program2(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <li class=\\\"mar--sm--bm mar--sm--tm\\\">\\n                        <h4 class=\\\"mar--sm--n\\\"><a href=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"application.jobPostingUrl\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\" target=\\\"_top\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"application.jobTitle\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</a></h4>\\n                        <h5 class=\\\"mar--sm--n text-faded\\\">\\n                            \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"application.firstLocationString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" \\n                            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"application.otherLocationsString\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                        </h5>\\n                        <small class=\\\"label label--secondary\\\">Applied</small>\\n                    </li>\\n                \");\n  return buffer;\n  }\nfunction program3(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\" &amp; <a href=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"application.jobPostingUrl\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\" target=\\\"_top\\\" data-toggle=\\\"tooltip\\\" title=\\\"\\\" class=\\\"pointer text-primary text-underline\\\" data-original-title=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"application.otherLocationsString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"application.otherLocationsCount\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" others</a>\\n                            \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"column--md--4\\\">\\n    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"applications\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\\n    <div class=\\\"content__section\\\" data-twttr-id=\\\"twttr-sandbox-0\\\">\\n        <h3 class=\\\"mar--sm--tn mar--sm--bm\\\">\\n            <span class=\\\"juicon juicon-twitter text-faded\\\"></span> \\n            <a href=\\\"https://www.twitter.com/salesforcejobs\\\">@Salesforcejobs</a>\\n        </h3>\\n\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"salesforce-twitter\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n    </div>\\n</div>\\n\\n\\n\");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nvar updateHeight = function() {\n    Ember.run.scheduleOnce('afterRender', this, function() {\n        parent.resizeIframe();\n    });\n};\n\nvar globalThis = this;\n\nEmber.View.reopen({\n    willInsertElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    },\n    willDestroyElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    }\n});\n\nApp.JobSearchView = Ember.View.extend({\n    didInsertElement: function() {\n        $('body').tooltip({\n            selector: '[data-toggle=tooltip]'\n        });\n    },\n    keyPress: function(e) {\n        if (e.keyCode === 13) {\n            this.get('controller').send('clickSearch');\n        }\n    }\n});\n\n\nApp.SalesforceTwitterComponent = Ember.Component.extend({\n    layoutName: 'components/twitter',\n    didInsertElement: function() {\n        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");\n        Ember.run.later(this, updateHeight, 1000);\n    }\n});\n\n\nApp.JobSearchController = Ember.ObjectController.extend({\n    init: function() {\n        this._super();\n\n        var searchTerm\n            , nearValue;\n\n        if (!Ember.isEmpty(parent.searchTerm)) {\n            searchTerm = decodeURI(parent.searchTerm);\n            this.set('searchTerm', searchTerm);\n        }\n\n        if (!Ember.isEmpty(parent.nearValue)) {\n            nearValue = decodeURI(parent.nearValue);\n            this.set('selectedLocation', 'Near...');\n            this.set('nearValue', nearValue);\n        } else {\n            this.set('nearValue', 'San Francisco');\n            this.set('selectedLocation', 'Near...');\n        }\n\n        Ember.run.later(this, function() {\n            this.search(false);\n        }, 1000);\n    },\n    searchTerm: null,\n    selectedLocation: null,\n    selectedJobFamily: null,\n    nearValue: null,\n    selectedRadius: null,\n    selectedUnit: null,\n    numberOfJobs: function() {\n        var searchResults = this.get('searchResults');\n\n        return !Ember.isEmpty(searchResults) ? searchResults.length : 0;\n    }.property('searchResults'),\n    isAllLocations: Ember.computed.equal('selectedLocation', 'All locations'),\n    isNear: Ember.computed.equal('selectedLocation', 'Near...'),\n    isNearMe: Ember.computed.equal('selectedLocation', 'Near me'),\n    isRemote: Ember.computed.equal('selectedLocation', 'Remote/Telecommute'),\n    actions: {\n        saveJob: function(jobPosting){\n            var self = this;\n\n            console.log('SAVE:');\n\n            console.log('LOGGED IN USER')\n            console.log(this.get('loggedInUser'));\n\n            // if (this.get('loggedInUser').Id) {\n\n                if(self.get('isJobSaved')){\n                    self.set('isJobSaved', false);\n                } else {\n                    self.set('isJobSaved', true);\n                }\n\n                var jsonString = {\n                    jobPostingId: jobPosting.Id,\n                    //isJobSaved: self.get('isJobSaved'),\n                    jobName: jobPosting.Name,\n                    //candidateId: self.get('loggedInUser').Id,\n                    expressedBy: 'Recruiter', // Picklist\n                    origReqId: jobPosting.Requisition__c,\n                    //  positionId: jobPosting.Requisition__r.Position__c\n                };\n\n\n                cont.saveJob(JSON.stringify(jsonString), function(results, responseObj){\n                    if (true) {\n                        console.log('RESULTS: ');\n                        console.log(results);\n                    } else {\n                        console.log('RESPONSE OBJ: ');\n                        console.log(responseObj);\n                    };\n                });\n            // };\n\n        },\n\n\n        clickSearch: function() {\n            this.search(true);\n        }\n    },\n    findLocation: function(callback, searchTerm){\n        var self = this;\n        $.ajax({\n            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=' + self.get('apiKey')\n        }).done(callback)\n    },\n    search: function(showResultsCount) {\n        this.set('isSearching', true);\n\n        var self = this;\n\n        var searchObj = this.getProperties('searchTerm', 'selectedLocation', 'selectedJobFamily', \n                                            'nearValue', 'selectedRadius', 'selectedUnit');\n\n        var callback = function(res, evt) {\n            self.set('isSearching', false);\n            if (res) {\n                var parsedResult = parseResult(res);\n\n                var jobPostings = parsedResult.data.jobPostings;\n\n                jobPostings.forEach(function(jp) {\n                    // Build location string\n                    if (!Ember.isEmpty(jp.locations)) {\n                        var firstLocationString = '';\n                        var otherLocationsString;\n                        var otherLocationsCount = 0;\n                        jp.locations.forEach(function(l, i) {\n                            var location = '';\n\n                            location = l.Location__r.City__c + ', ' + l.Location__r.State_Province__c;\n\n                            if (!Ember.isEmpty(l.Location__r.Country_Province__c) && l.Location__r.Country_Province__c !== 'United States') {\n                                location += ', ' + l.Location__r.Country_Province__c;\n                            }\n\n                            if (i === 0) {\n                                firstLocationString = location;\n                            } else if (i === 1) {\n                                otherLocationsCount++;\n                                otherLocationsString = location;\n                            } else {\n                                otherLocationsCount++;\n                                otherLocationsString += ', ' + location;\n                            }\n                        });\n\n                        jp.firstLocationString = firstLocationString;\n                        jp.otherLocationsString = otherLocationsString;\n                        jp.otherLocationsCount = otherLocationsCount;\n                    }\n                    \n                    // Build display\n                    jp.fieldsToDisplay = [];\n                    self.get('jobPostingFieldsToDisplay').forEach(function(field) {\n                        jp.fieldsToDisplay.addObject({\n                            label: field.label,\n                            value: field.type === 'DATE' ? moment(jp[field.name]).format('MMM D, YYYY') : jp[field.name]\n                        });\n                    });\n                });\n                \n                self.set('showResultsCount', showResultsCount);\n\n                self.set('searchResults', jobPostings);\n                console.log('JOB POSTINGS');\n                console.log(jobPostings);\n            } else {\n\n            }\n        };\n\n        if (searchObj.selectedLocation === 'Near me') {\n            if (navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function(position) {\n                    searchObj.latitude = position.coords.latitude;\n                    searchObj.longitude = position.coords.longitude;\n\n                    console.log(searchObj);\n                    cont.searchJobs(JSON.stringify(searchObj), callback);\n                });\n            } else {\n                x.innerHTML = \"Geolocation is not supported by this browser.\";\n            }\n        } else if (searchObj.selectedLocation === 'Near...') {\n            var googleCallback = function(results) {\n                var location = results.results[0];\n\n                searchObj.latitude = location.geometry.location.lat\n                searchObj.longitude = location.geometry.location.lng;\n\n                cont.searchJobs(JSON.stringify(searchObj), callback);\n            };\n\n            this.findLocation(googleCallback, this.get('nearValue'));\n        } else {\n            cont.searchJobs(JSON.stringify(searchObj), callback);\n        }\n    }\n});\n\nApp.JobPostingController = Ember.ObjectController.extend({\n    jobPostingUrl: function() {\n        return parent.urlPrefix + '/JobPosting?id=' + this.get('Id');\n    }.property('Id'),\n    actions: {\n        clickApply: function() {\n            window.parent.location.href = this.get('jobPostingUrl');\n            console.log(this.get('Id'));\n        }\n    }\n});\n\n// Routes\nApp.JobSearchRoute = Ember.Route.extend( {\n    model: function(params) {\n        var jobFamilies = ['All categories'];\n\n        if (!Ember.isEmpty(parsedJobSearchMap.jobFamilies)) {\n            jobFamilies.addObjects(parsedJobSearchMap.jobFamilies.getEach('value'));\n        }\n\n        var applications = [];\n\n        if (!Ember.isEmpty(parsedJobSearchMap.applications)) {\n            parsedJobSearchMap.applications.forEach(function(app) {\n                var firstLocationString = '';\n                var otherLocationsString;\n                var otherLocationsCount = 0;\n\n                app.locations.forEach(function(l, i) {\n                    var location = '';\n\n                    location = l.Location__r.City__c + ', ' + l.Location__r.State_Province__c;\n\n                    if (!Ember.isEmpty(l.Location__r.Country_Province__c) && l.Location__r.Country_Province__c !== 'United States') {\n                        location += ', ' + l.Location__r.Country_Province__c;\n                    }\n\n                    if (i === 0) {\n                        firstLocationString = location;\n                    } else if (i === 1) {\n                        otherLocationsCount++;\n                        otherLocationsString = location;\n                    } else {\n                        otherLocationsCount++;\n                        otherLocationsString += ', ' + location;\n                    }\n                });\n\n                var applicationObj = {\n                    jobTitle: !Ember.isNone(app.Job_Posting__r) ? app.Job_Posting__r.Name : null,\n                    firstLocationString: firstLocationString,\n                    otherLocationsString: otherLocationsString,\n                    otherLocationsCount: otherLocationsCount,\n                    jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + app.Job_Posting__c\n                };\n\n                applications.addObject(applicationObj);\n            });\n        }\n\n        return {\n            radiusOptions: ['5', '10', '25', '50'],\n            radiusUnits: ['mi', 'km'],\n            locations: ['All locations', 'Near...', 'Near me', 'Remote/Telecommute'],\n            jobFamilies: jobFamilies,\n            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,\n            applications: applications,\n            apiKey: parsedJobSearchMap.apiKey,\n            loggedInUser: parsedJobSearchMap.loggedInUser,\n            jobPostings: parsedJobSearchMap.jobPostings\n        };\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('jobSearch', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/jobSearchProtoApp.js")