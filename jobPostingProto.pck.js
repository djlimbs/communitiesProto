eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"jobPosting\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <div class=\\\"alert alert--success mar--sm--bm\\\">\\n                        <button type=\\\"button\\\" class=\\\"close show-brkpoint--sm--only\\\" data-dismiss=\\\"alert\\\"><span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span></button>\\n                        <button type=\\\"button\\\" class=\\\"close close-timeout show-brkpoint--md\\\">\\n                            <svg class=\\\"close-progress\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 40 40\\\" enable-background=\\\"new 0 0 40 40\\\">\\n                                <circle class=\\\"progress-track progress-track--success\\\" cx=\\\"20\\\" cy=\\\"20\\\" r=\\\"19\\\" opacity=\\\"0\\\" stroke=\\\"#000\\\" stroke-width=\\\"2.5\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></circle>\\n                                <path d=\\\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\\\" class=\\\"progress progress--success\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></path></svg>\\n                            <span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span>\\n                        </button>\\n                        <strong>\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"appliedMessage\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</strong>\\n                    </div>\\n                \");\n  return buffer;\n  }\n\nfunction program3(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\" &amp; <a href=\\\"communities__prototype__job--v2.html\\\" data-toggle=\\\"tooltip\\\" title=\\\"\\\" class=\\\"pointer text-primary text-underline\\\" data-original-title=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"otherLocationsString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"otherLocationsCount\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" others</a>\\n                        \");\n  return buffer;\n  }\n\nfunction program5(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <div class=\\\"content__section mar--md--bxl\\\">\\n                        <h3 class=\\\"mar--sm--tn mar--sm--bn\\\"><span class=\\\"juicon juicon-bookmark text-faded\\\"></span> My saved jobs</h3>\\n                        <ul class=\\\"list-style-type-none mar--sm--n\\\">\\n                            \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"savedJob\", \"in\", \"savedJobs\", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                        </ul>\\n                    </div>\\n                    <hr class=\\\"show-brkpoint--md\\\">\\n                \");\n  return buffer;\n  }\nfunction program6(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                                <li class=\\\"mar--sm--bm mar--sm--tm\\\">\\n                                    <h4 class=\\\"mar--sm--n\\\"><a href=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"application.jobPostingUrl\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\" target=\\\"_top\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"savedJob.Name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</a></h4>\\n                                    <h5 class=\\\"mar--sm--n text-faded\\\">\\n                                        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"savedJob.Candidate__c\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" | \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"savedJob.Position__r.Name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" <br/>\\n\\n                                        \\n                                    </h5>\\n                                    <small class=\\\"label label--secondary\\\">Applied</small>\\n                                </li>\\n                            \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container brand__border-accent--top\\\" style=\\\"border-top-color: #cf5c60\\\">\\n    \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.view.call(depth0, \"locationModal\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n    <div class=\\\"content pad--sm--tm\\\">\\n        <div class=\\\"row\\\">\\n            <div class=\\\"column--md--8\\\">\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"appliedMessage\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                <nav id=\\\"jobNav\\\" class=\\\"relative\\\">\\n                    <div class=\\\"button-group float--right show-brkpoint--md\\\">\\n                        <button \");\n  hashContexts = {'class': depth0,'disabled': depth0};\n  hashTypes = {'class': \"STRING\",'disabled': \"STRING\"};\n  options = {hash:{\n    'class': (\":button :button--primary :theme-bg-color disableApplyButton:disabled\"),\n    'disabled': (\"disableApplyButton\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" data-toggle=\\\"dropdown\\\">Apply <span class=\\\"show-brkpoint--md\\\">Now</span></button>\\n                        <ul class=\\\"dropdown-menu\\\">\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApply\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-envelope\\\"></span> Apply with email</a></li>\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApplyWithLinkedIn\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-linkedin\\\"></span> Apply with LinkedIn</a></li>\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\"><span class=\\\"juicon juicon-facebook\\\"></span> Apply with Facebook</a></li>\\n                        </ul>\\n                    </div>\\n                    <h1 class=\\\"has-subheading page__heading\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"jobPosting.Name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h1>\\n                    <h2 class=\\\"page__subheading\\\">\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"firstLocationString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" \\n\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"otherLocationsString\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n                    </h2>\\n                </nav>\\n                <p>\");\n  hashContexts = {'unescaped': depth0};\n  hashTypes = {'unescaped': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"jobPosting.Job_Description__c\", {hash:{\n    'unescaped': (\"true\")\n  },contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</p>\\n                <hr class=\\\"mar--sm--txl mar--sm--bxl\\\">\\n                <div class=\\\"button-group inline-block vam width--full--sm--only\\\">\\n                    <button \");\n  hashContexts = {'class': depth0,'disabled': depth0};\n  hashTypes = {'class': \"STRING\",'disabled': \"STRING\"};\n  options = {hash:{\n    'class': (\":button :button--primary :theme-bg-color :width--full--sm--only disableApplyButton:disabled\"),\n    'disabled': (\"disableApplyButton\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" data-toggle=\\\"dropdown\\\">Apply <span class=\\\"show-brkpoint--md\\\">Now</span></button>\\n                    <ul class=\\\"dropdown-menu dropdown-menu--up\\\">\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApply\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-envelope\\\"></span> Apply with email</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApplyWithLinkedIn\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-linkedin\\\"></span> Apply with LinkedIn</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\"><span class=\\\"juicon juicon-facebook\\\"></span> Apply with Facebook</a></li>\\n                    </ul>\\n                </div>\\n                <span class=\\\"mar--sm--lm\\\">or <a href=\\\"#\\\" class=\\\"text-underline saveJobLink\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"saveJob\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">save this job</a> if you're not ready</span>\\n            </div>\\n            <div class=\\\"column--md--4 mar--sm--only--txl\\\">\\n                <div class=\\\"button-group width--full inline-block vam width--full--sm--only\\\">\\n                    <button class=\\\"button button--secondary width--full theme-border-color theme-link-color\\\" data-toggle=\\\"dropdown\\\">Share Job <span class=\\\"juicon juicon-share\\\"></span></button>\\n                    <ul class=\\\"dropdown-menu\\\">\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickTweet\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-twitter\\\"></span> Twitter</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickLinkedIn\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-linkedin\\\"></span> LinkedIn</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickFacebook\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-facebook\\\"></span> Facebook</a></li>\\n\\n\\n\\n                        \\n                    </ul>\\n                </div>\\n                <hr>\\n\\n\\n\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"savedJobs\", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n\\n                \\n\\n                <h3 class=\\\"mar--sm--tn mar--sm--bm\\\">\\n                    <span class=\\\"juicon juicon-twitter text-faded\\\"></span> \\n                    <a href=\\\"https://www.twitter.com/salesforcejobs\\\">@Salesforcejobs</a>\\n                </h3>\\n\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"salesforce-twitter\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n            </div>\\n\\n            \\n        </div>\\n    </div>\\n</div>\");\n  return buffer;\n  \n});\n\nEmber.TEMPLATES[\"locationModal\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<div class=\\\"modal fade\\\" id=\\\"locationModal\\\" tabindex=\\\"-1\\\" role=\\\"dialog\\\" aria-labelledby=\\\"myModalLabel\\\" aria-hidden=\\\"true\\\">\\n    <div class=\\\"modal__shell\\\">\\n        <div class=\\\"modal__content\\\">\\n            <div class=\\\"modal__top\\\">\\n                <!--<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\">-->\\n                    <!--<span class=\\\"close-modal-x\\\"></span><span class=\\\"sr-only\\\">Close</span>-->\\n                <!--</button>-->\\n                <h2 class=\\\"modal__heading\\\" id=\\\"myModalLabel\\\">Before you begin...</h2>\\n            </div>\\n            <div class=\\\"modal__body\\\">\\n                <p class=\\\"mar--sm--tn\\\">Please confirm the location where you'd prefer to work.</p>\\n                <div class=\\\"form__group\\\">\\n                    <div class=\\\"select__wrap\\\">\\n                        <div class=\\\"input__icon juicon juicon-down\\\"></div>\\n                        <select>\\n                            <option>San Francisco, CA (Closest)</option>\\n                            <option>Boston, MA</option>\\n                            <option>London, GB, UK</option>\\n                            <option>Remote</option>\\n                            <option>Chicago, IL</option>\\n                            <option>Vancouver, BC, CA</option>\\n                        </select>\\n                    </div>\\n                </div>\\n            </div>\\n            <div class=\\\"modal__footer\\\">\\n                <button id=\\\"modalOk\\\" type=\\\"button\\\" class=\\\"button button--primary\\\" data-dismiss=\\\"modal\\\">OK</button>\\n            </div>\\n        </div>\\n    </div>\\n</div>\");\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nApp.SalesforceTwitterComponent = Ember.Component.extend({\n    layoutName: 'components/twitter',\n    didInsertElement: function() {\n        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");\n        Ember.run.later(this, updateHeight, 500);\n    }\n});\n\nfunction createLocationStrings(locations){\n\n    var firstLocationString = '';\n    var otherLocationsString;\n    var otherLocationsCount = 0;\n\n    locations.forEach(function(l, i) {\n        var location = '';\n\n        location = l.Location__r.City__c + ', ' + l.Location__r.State_Province__c;\n\n        if (!Ember.isEmpty(l.Location__r.Country_Province__c) && l.Location__r.Country_Province__c !== 'United States') {\n            location += ', ' + l.Location__r.Country_Province__c;\n        }\n\n        if (i === 0) {\n            firstLocationString = location;\n        } else if (i === 1) {\n            otherLocationsCount++;\n            otherLocationsString = location;\n        } else {\n            otherLocationsCount++;\n            otherLocationsString += ', ' + location;\n        }\n    });\n\n    var obj = {\n        firstLocationString: firstLocationString,\n        otherLocationsString: otherLocationsString,\n        otherLocationsCount: otherLocationsCount\n    };\n\n    return obj;\n};\n\nfunction updateHeight() {\n    Ember.run.scheduleOnce('afterRender', this, function() {\n        parent.resizeIframe();\n    });\n};\n\nvar globalThis = this;\n\nfunction createSaveObj(jobPosting, loggedInUser, linkedInMap) {\n    var saveObj = {};\n\n    if (!Ember.isNone(linkedInMap)) {\n        if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n            saveObj.educationHistory = createEducationHistoryObj(linkedInMap.educations.values);\n        }\n\n        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n            saveObj.employmentHistory = createEmploymentHistoryObj(linkedInMap.positions.values);\n        }\n    }\n\n    saveObj.application = {\n        Requisition__c: jobPosting.Requisition__c,\n        Contact__c: loggedInUser.ContactId,\n        First_Name__c: loggedInUser.FirstName,\n        Last_Name__c: loggedInUser.LastName,\n        Email__c: loggedInUser.Email,\n        Street_Address__c: !Ember.isNone(linkedInMap) ? linkedInMap.mainAddress : null,\n        Job_Posting__c: jobPosting.Id\n    };\n\n    return saveObj;\n};\n\nfunction createEducationHistoryObj(educations) {\n    return educations.map(function(e) {\n        // Educations from linkedIn only have year in the startDate/endDate\n\n        return {\n            Education_Level__c: e.degree,\n            Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,\n            Name: e.schoolName,\n            Status__c: null,\n            End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null\n        };\n    });\n};\n\nfunction createEmploymentHistoryObj(positions) {\n    return positions.map(function(p) {\n        // Positions from LinkedIn only have year and month in startDate/endDate\n        var startDate;\n        var endDate;\n\n        if (!Ember.isNone(p.startDate)) {\n            if (!Ember.isNone(p.startDate.month)) {\n                startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');\n            } else {\n                startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');\n            }\n        }\n\n        if (!Ember.isNone(p.endDate)) {\n            if (!Ember.isNone(p.endDate.month)) {\n                endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');\n            } else {\n                endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');\n            }\n        }\n\n        return {\n            Name: !Ember.isNone(p.company) ? p.company.name : null,\n            Job_Title__c: p.title,\n            Start_Date__c: startDate,\n            Is_Current__c: p.isCurrent,\n            End_Date__c: endDate\n        };\n    });\n};\n\nEmber.View.reopen({\n    willInsertElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    },\n    willDestroyElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    }\n});\n\nApp.LocationModalView = Ember.View.extend({\n    templateName: 'locationModal',\n    didInsertElement: function() {\n        \n    }\n});\n\nApp.JobPostingView = Ember.View.extend({\n    didInsertElement: function() {\n        $('body').tooltip({\n            selector: '[data-toggle=tooltip]'\n        });\n\n        $('body').on('touchstart.jui.dropdown', '.dropdown-menu', function (e) { \n            e.stopPropagation(); \n        });\n        \n        $('.dropdown-menu').on('touchstart.dropdown.data-api', function(e) { e.stopPropagation() })\n    }\n});\n\nApp.JobPostingController = Ember.ObjectController.extend({\n    appliedMessage: function() {\n        if (!Ember.isNone(this.get('application'))) {\n            return this.get('justApplied') === true ? 'Thank you for applying!' : 'Thank you for applying!';\n        } else {\n            return null;\n        }\n    }.property('justApplied', 'application'),\n    hasApplied: function() {\n        return !Ember.isNone(this.get('application'));\n    }.property('application'),\n    disableApplyButton: function() {\n        return this.get('hasApplied') === true ? 'disabled' : false;\n    }.property('hasApplied'),\n    applyWithLinkedInUrl: function() {\n        var linkedInSsoUrl = this.get('linkedInSsoUrl');\n        if (!Ember.isNone(linkedInSsoUrl)) {\n            return linkedInSsoUrl + '?community=https://' + parent.communityUrl + '&' +\n                    'startURL=' + parent.urlPrefix + '/JobPosting?id=' + this.get('jobPosting').Id + '%26applyWithLinkedIn=true';\n        } else {\n            return null\n        }\n    }.property(),\n    //applyWithLinkedInUrl: function() {\n    //    return parent.urlPrefix + '/Apply%20with%20LinkedIn?id=' + this.get('jobPosting').Id;\n    //}.property('Id'),\n    createEducationHistoryObj: function(educations) {\n        return educations.map(function(e) {\n            // Educations from linkedIn only have year in the startDate/endDate\n\n            return {\n                Education_Level__c: e.degree,\n                Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,\n                Name: e.schoolName,\n                Status__c: null,\n                End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null\n            };\n        });\n    },\n    createEmplyomentHistoryObj: function(positions) {\n        return positions.map(function(p) {\n            // Positions from LinkedIn only have year and month in startDate/endDate\n            var startDate;\n            var endDate;\n\n            if (!Ember.isNone(p.startDate)) {\n                if (!Ember.isNone(p.startDate.month)) {\n                    startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');\n                } else {\n                    startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');\n                }\n            }\n\n            if (!Ember.isNone(p.endDate)) {\n                if (!Ember.isNone(p.endDate.month)) {\n                    endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');\n                } else {\n                    endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');\n                }\n            }\n\n            return {\n                Name: !Ember.isNone(p.company) ? p.company.name : null,\n                Job_Title__c: p.title,\n                Start_Date__c: startDate,\n                Is_Current__c: p.isCurrent,\n                End_Date__c: endDate\n            };\n        });\n    },\n    actions: {\n        clickApply: function() {\n            $('#locationModal').modal({\n                show: true,\n                backdrop: 'static'\n            });\n\n            window.parent.scrollTo(0,0);\n\n            $('#modalOk').click(function() {\n                $('#modalOk').unbind('click');\n\n                window.open('https://djlimbs.github.io/communitiesProto/applyflow/prototype/communities__prototype__apply-flow.html');\n            });\n            //window.open('https://djlimbs.github.io/communitiesProto/applyflow/prototype/communities__prototype__apply-flow.html');\n            /*console.log(this.get('jobPosting'));\n            console.log(this.get('loggedInUser'));\n\n            var jobPosting = this.get('jobPosting');\n            var loggedInUser = this.get('loggedInUser');\n            var linkedInMap = this.get('linkedInMap');\n            var saveObj = {};\n\n            console.log(linkedInMap);\n\n            if (loggedInUser.UserType === 'Guest') {\n                // GO TO login\n                console.log('goto login'); //get URL prefix son.\n                window.parent.location.href = parent.authLoginUrl;\n                //window.parent.location.href='/Login';\n            } else {\n\n                if (!Ember.isNone(linkedInMap)) {\n\n                    if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n                        saveObj.educationHistory = this.createEducationHistoryObj(linkedInMap.educations.values);\n                    }\n\n                    if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n                        saveObj.employmentHistory = this.createEmplyomentHistoryObj(linkedInMap.positions.values);\n                    }\n                }\n\n                saveObj.application = {\n                    Requisition__c: jobPosting.Requisition__c,\n                    Contact__c: loggedInUser.ContactId,\n                    First_Name__c: loggedInUser.FirstName,\n                    Last_Name__c: loggedInUser.LastName,\n                    Email__c: loggedInUser.Email\n                };\n\n                console.log(saveObj);\n\n                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                    if (res) {\n                        var parsedResult = parseResult(res);\n\n                        if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                            // error handling\n                        } else {\n                            console.log(parsedResult);\n                        }\n                    } else {\n                        // error handling\n                    }\n                });\n            }*/\n        },\n        clickApplyWithLinkedIn: function() {\n            var self = this;\n\n            $('#locationModal').modal({\n                show: true,\n                backdrop: 'static'\n            });\n\n            window.parent.scrollTo(0,0);\n\n            $('#modalOk').click(function() {\n                $('#modalOk').unbind('click');\n\n                if (!Ember.isNone(self.get('linkedInMap'))) {\n                    var saveObj = createSaveObj(self.get('jobPosting'), self.get('loggedInUser'), self.get('linkedInMap'));\n                    \n                    cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                        if (res) {\n                            var parsedResult = parseResult(res);\n\n                            if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                                // error handling\n                            } else {\n                                console.log(parsedResult);\n\n                                self.set('application', parsedResult.data.application);\n                                self.set('justApplied', true);\n                                window.parent.scrollTo(0,0)\n                            }\n                        } else {\n                            // error handling\n                        }\n                    });\n                } else {\n                    window.parent.location.href = self.get('applyWithLinkedInUrl');\n                }            \n            });\n        },\n        clickTweet: function() {\n            var currentUrl = window.parent.location.href;\n            var tweetString = 'Check out this #dreamjob at #Salesforce ' + currentUrl;\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetString),\n                        'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes'\n                );\n        },\n        clickLinkedIn: function (){\n            var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Home';\n            var title = 'Title';\n            var source = 'https://www.appiphony.com'; // This does not show up anywhere except on url\n            var summary = 'Summary';\n            var docTitle = document.title; // This is the document where the Share Button is\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('http://www.linkedin.com/shareArticle?mini=true&url='+ \n                        encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + \n                        '&source=' + encodeURIComponent(source) + '&summary=' + encodeURIComponent(summary) + '&t=' + encodeURIComponent(docTitle),\n                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');\n\n            return false;\n        },\n        clickFacebook: function (){\n            var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Home';\n            var docTitle = document.title; // This is the document where the Share Button is\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('http://www.facebook.com/sharer.php?u='+ \n                        encodeURIComponent(url)+ '&t=' + encodeURIComponent(docTitle),\n                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');\n\n            return false;\n        },\n\n        saveJob: function (){\n            var self = this;\n\n            var jobPosting = self.get('jobPosting');\n\n            var jsonString = {\n                jobName: jobPosting.Name,\n                candidateId: self.get('loggedInUser').Id,\n                expressedBy: 'Recruiter', // Picklist\n                origReqId: jobPosting.Requisition__c,\n                positionId: jobPosting.Requisition__r.Position__c\n            };\n\n\n            cont.saveJob(JSON.stringify(jsonString), function(results, responseObj){\n                if (results) {\n                    console.log('RESULTS: ');\n                    var parsedResult = parseResult(results);\n                    \n                    self.set('savedJobs', parsedResult.data.allSavedJobs);\n                } else {\n                        // error handling\n                }\n            });\n        },\n\n\n        // clickTry: function (){\n        //     FB.ui({\n        //       method: 'share_open_graph',\n        //       action_type: 'og.likes',\n        //       action_properties: JSON.stringify({\n        //           object:'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s',\n        //       })\n        //     }, function(response){});\n        // },\n\n\n        clickTry: function (){\n            FB.ui({\n                method: 'feed',\n                name: 'Facebook Dialogs',\n                link: '',\n                picture: 'http://fbrell.com/f8.jpg',\n                caption: 'Reference Documentation',\n                description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',\n                \n                method: 'share_open_graph',\n                action_type: 'og.likes',\n                action_properties: JSON.stringify({\n                    object:'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s',\n              })\n            }, function(response){});\n        },\n\n\n\n\n\n    }\n});\n\n// Routes\nApp.JobPostingRoute = Ember.Route.extend( {\n    model: function(params) {\n        return new Ember.RSVP.Promise(function(resolve, reject) {\n            var applications = [];\n\n            if (!Ember.isEmpty(jobPostingMap.applications)) {\n                jobPostingMap.applications.forEach(function(app) {\n                    var firstLocationString = '';\n                    var otherLocationsString;\n                    var otherLocationsCount = 0;\n\n                    var obj = createLocationStrings(app.locations);\n\n                    var applicationObj = {\n                        jobTitle: app.Job_Posting__r.Name,\n                        firstLocationString: obj.firstLocationString,\n                        otherLocationsString: obj.otherLocationsString,\n                        otherLocationsCount: obj.otherLocationsCount,\n                        jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + app.Job_Posting__c\n                    };\n\n                    applications.addObject(applicationObj);\n                });\n            }\n\n            jobPostingMap.applications = applications;\n\n            if (!Ember.isEmpty(jobPostingMap.jpLocations)) {\n                var firstLocationString = '';\n                var otherLocationsString;\n                var otherLocationsCount = 0;\n\n                var obj = createLocationStrings(jobPostingMap.jpLocations);\n\n                jobPostingMap.firstLocationString = obj.firstLocationString;\n                jobPostingMap.otherLocationsString = obj.otherLocationsString;\n                jobPostingMap.otherLocationsCount = obj.otherLocationsCount;\n            }\n\n\n            // saved jobs\n            if (!Ember.isEmpty(jobPostingMap.allSavedJobs)) {\n                var allSavedJobs = jobPostingMap.allSavedJobs; \n                console.log('ALL SAVED JOBS')\n                console.log(allSavedJobs);\n\n\n            }\n\n\n            if (parent.applyWithLinkedIn === true && !Ember.isNone(jobPostingMap.linkedInMap) \n                        && Ember.isNone(jobPostingMap.application)) {\n                var saveObj = createSaveObj(jobPostingMap.jobPosting, jobPostingMap.loggedInUser, jobPostingMap.linkedInMap);\n\n                console.log(saveObj);\n\n                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                    if (res) {\n                        var parsedResult = parseResult(res);\n\n                        if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                            // error handling\n                        } else {\n                            console.log(parsedResult);\n\n                            jobPostingMap.application = parsedResult.data.application;\n                            jobPostingMap.justApplied = true;\n                            resolve(jobPostingMap);\n                        }\n                    } else {\n                        // error handling\n                    }\n                });\n\n            } else {\n                resolve(jobPostingMap);\n            }\n        });\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('jobPosting', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/jobPostingProtoApp.js")