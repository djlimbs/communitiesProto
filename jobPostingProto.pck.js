eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"jobPosting\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <div class=\\\"alert alert--success mar--sm--bm\\\">\\n                        <button type=\\\"button\\\" class=\\\"close show-brkpoint--sm--only\\\" data-dismiss=\\\"alert\\\"><span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span></button>\\n                        <button type=\\\"button\\\" class=\\\"close close-timeout show-brkpoint--md\\\">\\n                            <svg class=\\\"close-progress\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 40 40\\\" enable-background=\\\"new 0 0 40 40\\\">\\n                                <circle class=\\\"progress-track progress-track--success\\\" cx=\\\"20\\\" cy=\\\"20\\\" r=\\\"19\\\" opacity=\\\"0\\\" stroke=\\\"#000\\\" stroke-width=\\\"2.5\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></circle>\\n                                <path d=\\\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\\\" class=\\\"progress progress--success\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" fill=\\\"none\\\"></path></svg>\\n                            <span class=\\\"alert-close-x\\\"></span><span class=\\\"sr-only\\\">Close</span>\\n                        </button>\\n                        <strong>\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"appliedMessage\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</strong>\\n                    </div>\\n                \");\n  return buffer;\n  }\n\nfunction program3(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\" &amp; <a href=\\\"communities__prototype__job--v2.html\\\" data-toggle=\\\"tooltip\\\" title=\\\"\\\" class=\\\"pointer text-primary text-underline\\\" data-original-title=\\\"\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, \"otherLocationsString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"otherLocationsCount\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" others</a>\\n                        \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"scope-container brand__border-accent--top\\\" style=\\\"border-top-color: #cf5c60\\\">\\n    <div class=\\\"content pad--sm--tm\\\">\\n        <div class=\\\"row\\\">\\n            <div class=\\\"column--md--8\\\">\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"appliedMessage\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                <nav id=\\\"jobNav\\\" class=\\\"relative\\\">\\n                    <div class=\\\"button-group float--right show-brkpoint--md\\\">\\n                        <button \");\n  hashContexts = {'class': depth0,'disabled': depth0};\n  hashTypes = {'class': \"STRING\",'disabled': \"STRING\"};\n  options = {hash:{\n    'class': (\":button :button--primary :theme-bg-color disableApplyButton:disabled\"),\n    'disabled': (\"disableApplyButton\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" data-toggle=\\\"dropdown\\\">Apply <span class=\\\"show-brkpoint--md\\\">Now</span></button>\\n                        <ul class=\\\"dropdown-menu\\\">\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApply\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-envelope\\\"></span> Apply with email</a></li>\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApplyWithLinkedIn\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-linkedin\\\"></span> Apply with LinkedIn</a></li>\\n                            <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\"><span class=\\\"juicon juicon-facebook\\\"></span> Apply with Facebook</a></li>\\n                        </ul>\\n                    </div>\\n                    <h1 class=\\\"has-subheading page__heading\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"jobPosting.Name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h1>\\n                    <h2 class=\\\"page__subheading\\\">\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"firstLocationString\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\" \\n\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack2 = helpers['if'].call(depth0, \"otherLocationsString\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }\n  data.buffer.push(\"\\n                    </h2>\\n                </nav>\\n                <p>\");\n  hashContexts = {'unescaped': depth0};\n  hashTypes = {'unescaped': \"STRING\"};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"jobPosting.Job_Description__c\", {hash:{\n    'unescaped': (\"true\")\n  },contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</p>\\n                <hr class=\\\"mar--sm--txl mar--sm--bxl\\\">\\n                <div class=\\\"button-group inline-block vam width--full--sm--only\\\">\\n                    <button \");\n  hashContexts = {'class': depth0,'disabled': depth0};\n  hashTypes = {'class': \"STRING\",'disabled': \"STRING\"};\n  options = {hash:{\n    'class': (\":button :button--primary :theme-bg-color :width--full--sm--only disableApplyButton:disabled\"),\n    'disabled': (\"disableApplyButton\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" data-toggle=\\\"dropdown\\\">Apply <span class=\\\"show-brkpoint--md\\\">Now</span></button>\\n                    <ul class=\\\"dropdown-menu\\\">\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\"><span class=\\\"juicon juicon-envelope\\\"></span> Apply with email</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickApplyWithLinkedIn\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><span class=\\\"juicon juicon-linkedin\\\"></span> Apply with LinkedIn</a></li>\\n                        <li class=\\\"dropdown-menu__list-item\\\"><a href=\\\"#\\\"><span class=\\\"juicon juicon-facebook\\\"></span> Apply with Facebook</a></li>\\n                    </ul>\\n                </div>\\n                <span class=\\\"mar--sm--lm\\\">or <a href=\\\"#\\\" class=\\\"text-underline saveJobLink\\\">save this job</a> if you're not ready</span>\\n            </div>\\n            \\n\\n            <div class=\\\"column--md--8\\\">\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"salesforce-twitter\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"\\n\\n                \\n            </div>\\n\\n\\n        </div>\\n    </div>\\n</div>\");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nApp.SalesforceTwitterComponent = Ember.Component.extend({\n    layoutName: 'components/twitter',\n    didInsertElement: function() {\n        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");\n    }\n});\n\nfunction updateHeight() {\n    Ember.run.scheduleOnce('afterRender', this, function() {\n        parent.resizeIframe();\n    });\n};\n\nvar globalThis = this;\n\nfunction createSaveObj(jobPosting, loggedInUser, linkedInMap) {\n    var saveObj = {};\n\n    if (!Ember.isNone(linkedInMap)) {\n        if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n            saveObj.educationHistory = createEducationHistoryObj(linkedInMap.educations.values);\n        }\n\n        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n            saveObj.employmentHistory = createEmplyomentHistoryObj(linkedInMap.positions.values);\n        }\n    }\n\n    saveObj.application = {\n        Requisition__c: jobPosting.Requisition__c,\n        Contact__c: loggedInUser.ContactId,\n        First_Name__c: loggedInUser.FirstName,\n        Last_Name__c: loggedInUser.LastName,\n        Email__c: loggedInUser.Email\n    };\n\n    return saveObj;\n};\n\nfunction createEducationHistoryObj(educations) {\n    return educations.map(function(e) {\n        // Educations from linkedIn only have year in the startDate/endDate\n\n        return {\n            Education_Level__c: e.degree,\n            Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,\n            Name: e.schoolName,\n            Status__c: null,\n            End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null\n        };\n    });\n};\n\nfunction createEmplyomentHistoryObj(positions) {\n    return positions.map(function(p) {\n        // Positions from LinkedIn only have year and month in startDate/endDate\n        var startDate;\n        var endDate;\n\n        if (!Ember.isNone(p.startDate)) {\n            if (!Ember.isNone(p.startDate.month)) {\n                startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');\n            } else {\n                startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');\n            }\n        }\n\n        if (!Ember.isNone(p.endDate)) {\n            if (!Ember.isNone(p.endDate.month)) {\n                endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');\n            } else {\n                endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');\n            }\n        }\n\n        return {\n            Name: !Ember.isNone(p.company) ? p.company.name : null,\n            Job_Title__c: p.title,\n            Start_Date__c: startDate,\n            Is_Current__c: p.isCurrent,\n            End_Date__c: endDate\n        };\n    });\n};\n\nEmber.View.reopen({\n    willInsertElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    },\n    willDestroyElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    }\n});\n\n\nApp.JobPostingController = Ember.ObjectController.extend({\n    appliedMessage: function() {\n        if (!Ember.isNone(this.get('application'))) {\n            return this.get('justApplied') === true ? 'You have successfully applied.' : 'You already applied.';\n        } else {\n            return null;\n        }\n    }.property('justApplied', 'application'),\n    hasApplied: function() {\n        return !Ember.isNone(this.get('application'));\n    }.property('application'),\n    disableApplyButton: function() {\n        return this.get('hasApplied') === true ? 'disabled' : false;\n    }.property('hasApplied'),\n    applyWithLinkedInUrl: function() {\n        var linkedInSsoUrl = this.get('linkedInSsoUrl');\n        if (!Ember.isNone(linkedInSsoUrl)) {\n            return linkedInSsoUrl + '?community=https://' + parent.communityUrl + '&' +\n                    'startURL=' + parent.urlPrefix + '/JobPosting?id=' + this.get('jobPosting').Id + '%26applyWithLinkedIn=true';\n        } else {\n            return null\n        }\n    }.property(),\n    //applyWithLinkedInUrl: function() {\n    //    return parent.urlPrefix + '/Apply%20with%20LinkedIn?id=' + this.get('jobPosting').Id;\n    //}.property('Id'),\n    createEducationHistoryObj: function(educations) {\n        return educations.map(function(e) {\n            // Educations from linkedIn only have year in the startDate/endDate\n\n            return {\n                Education_Level__c: e.degree,\n                Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,\n                Name: e.schoolName,\n                Status__c: null,\n                End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null\n            };\n        });\n    },\n    createEmplyomentHistoryObj: function(positions) {\n        return positions.map(function(p) {\n            // Positions from LinkedIn only have year and month in startDate/endDate\n            var startDate;\n            var endDate;\n\n            if (!Ember.isNone(p.startDate)) {\n                if (!Ember.isNone(p.startDate.month)) {\n                    startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');\n                } else {\n                    startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');\n                }\n            }\n\n            if (!Ember.isNone(p.endDate)) {\n                if (!Ember.isNone(p.endDate.month)) {\n                    endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');\n                } else {\n                    endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');\n                }\n            }\n\n            return {\n                Name: !Ember.isNone(p.company) ? p.company.name : null,\n                Job_Title__c: p.title,\n                Start_Date__c: startDate,\n                Is_Current__c: p.isCurrent,\n                End_Date__c: endDate\n            };\n        });\n    },\n    actions: {\n        clickApply: function() {\n            console.log(this.get('jobPosting'));\n            console.log(this.get('loggedInUser'));\n\n            var jobPosting = this.get('jobPosting');\n            var loggedInUser = this.get('loggedInUser');\n            var linkedInMap = this.get('linkedInMap');\n            var saveObj = {};\n\n            console.log(linkedInMap);\n\n            if (loggedInUser.UserType === 'Guest') {\n                // GO TO login\n                console.log('goto login'); //get URL prefix son.\n                window.parent.location.href = parent.authLoginUrl;\n                //window.parent.location.href='/Login';\n            } else {\n\n                if (!Ember.isNone(linkedInMap)) {\n\n                    if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n                        saveObj.educationHistory = this.createEducationHistoryObj(linkedInMap.educations.values);\n                    }\n\n                    if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n                        saveObj.employmentHistory = this.createEmplyomentHistoryObj(linkedInMap.positions.values);\n                    }\n                }\n\n                saveObj.application = {\n                    Requisition__c: jobPosting.Requisition__c,\n                    Contact__c: loggedInUser.ContactId,\n                    First_Name__c: loggedInUser.FirstName,\n                    Last_Name__c: loggedInUser.LastName,\n                    Email__c: loggedInUser.Email\n                };\n\n                console.log(saveObj);\n\n                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                    if (res) {\n                        var parsedResult = parseResult(res);\n\n                        if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                            // error handling\n                        } else {\n                            console.log(parsedResult);\n                        }\n                    } else {\n                        // error handling\n                    }\n                });\n            }\n        },\n        clickApplyWithLinkedIn: function() {\n            if (!Ember.isNone(this.get('linkedInMap'))) {\n                var self = this\n                    , saveObj = createSaveObj(this.get('jobPosting'), this.get('loggedInUser'), this.get('linkedInMap'));\n                \n                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                    if (res) {\n                        var parsedResult = parseResult(res);\n\n                        if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                            // error handling\n                        } else {\n                            console.log(parsedResult);\n\n                            self.set('application', parsedResult.data.application);\n                            self.set('justApplied', true);\n                            window.parent.scrollTo(0,0)\n                        }\n                    } else {\n                        // error handling\n                    }\n                });\n            } else {\n                window.parent.location.href = this.get('applyWithLinkedInUrl');\n            }\n        }\n    }\n});\n\n// Routes\nApp.JobPostingRoute = Ember.Route.extend( {\n    model: function(params) {\n        return new Ember.RSVP.Promise(function(resolve, reject) {\n            if (!Ember.isEmpty(jobPostingMap.jpLocations)) {\n                var firstLocationString = '';\n                var otherLocationsString;\n                var otherLocationsCount = 0;\n\n                jobPostingMap.jpLocations.forEach(function(l, i) {\n                    if (i === 0) {\n                        firstLocationString = l.Location__r.Name;\n                    } else if (i === 1) {\n                        otherLocationsCount++;\n                        otherLocationsString = l.Location__r.Name;\n                    } else {\n                        otherLocationsCount++;\n                        otherLocationsString += ', ' + l.Location__r.Name;\n                    }\n                });\n\n                jobPostingMap.firstLocationString = firstLocationString;\n                jobPostingMap.otherLocationsString = otherLocationsString;\n                jobPostingMap.otherLocationsCount = otherLocationsCount;\n            }\n\n            if (parent.applyWithLinkedIn === true && !Ember.isNone(jobPostingMap.linkedInMap) \n                        && Ember.isNone(jobPostingMap.application)) {\n                var saveObj = createSaveObj(jobPostingMap.jobPosting, jobPostingMap.loggedInUser, jobPostingMap.linkedInMap);\n\n                console.log(saveObj);\n\n                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {\n                    if (res) {\n                        var parsedResult = parseResult(res);\n\n                        if (!Ember.isEmpty(parsedResult.errorMessages)) {\n                            // error handling\n                        } else {\n                            console.log(parsedResult);\n\n                            jobPostingMap.application = parsedResult.data.application;\n                            jobPostingMap.justApplied = true;\n                            resolve(jobPostingMap);\n                        }\n                    } else {\n                        // error handling\n                    }\n                });\n\n            } else {\n                resolve(jobPostingMap);\n            }\n        });\n    }\n});\n\n// Router\nApp.Router.map(function() {\n    this.resource('jobPosting', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/jobPostingProtoApp.js")