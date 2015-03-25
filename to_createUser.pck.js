eval("(function() {\n\n// Add a labels property to every controller so that we don't have to access the global scope (which was deprecated).\nEmber.ControllerMixin.reopen({\n    labels: labels\n});\n\n// Attribute bindings for QA locators so we can easily add them to ember markup.\nEmber.View.reopen({\n    attributeBindings: ['data-dev', 'data-qa', 'data-qa-label', 'data-qa-button', 'data-qa-input', \n                        'data-qa-link', 'data-qa-pane', 'data-qa-select', 'da-qa-modal', 'data-qa-alert',\n                        'data-qa-container'],\n    didInsertElement : function(){\n        this._super();\n\n        Ember.run.scheduleOnce('afterRender', this, this.initJUI);   \n    },\n    initJUI: function() {\n        // Initialize tooltips if they exist. This might actually be expensive since it's run every time a new view is added. Will refactor.\n        /*if ($('[data-toggle=\"tooltip\"]').length > 0) {\n            $('body').tooltip({\n                selector: '[data-toggle=tooltip]'\n            });\n        }*/\n        this.afterRenderEvent();\n    },\n    afterRenderEvent : function() {\n        // implement this hook in your own subclasses and run your jQuery logic there\n    }\n});\n\n})();//@ sourceURL=../../js/emberBase.js")

eval("(function() {\n\nEmber.TEMPLATES[\"components/twitter\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<a class=\\\"twitter-timeline\\\"\\n   width=\\\"100%\\\"\\n   height=\\\"300\\\"\\n   href=\\\"https://twitter.com/salesforcejobs\\\"\\n   data-widget-id=\\\"565570508859916289\\\"\\n   data-chrome=\\\"noheader nofooter\\\"\\n   data-border-color=\\\"#dadee2\\\">\\n    Tweets by @salesforcejobs\\n</a>\");\n  \n});\n\nEmber.TEMPLATES[\"createUser\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  \n\n\n  data.buffer.push(\"<div class=\\\"scope-container\\\">\\n    <div class=\\\"modal fade\\\" id=\\\"locationModal\\\" tabindex=\\\"-1\\\" role=\\\"dialog\\\" aria-labelledby=\\\"myModalLabel\\\" aria-hidden=\\\"true\\\">\\n        <div class=\\\"modal__shell\\\">\\n            <div class=\\\"modal__content\\\">\\n                <div class=\\\"modal__top\\\">\\n                    <!--<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\">-->\\n                    <!--<span class=\\\"close-modal-x\\\"></span><span class=\\\"sr-only\\\">Close</span>-->\\n                    <!--</button>-->\\n                    <h2 class=\\\"modal__heading\\\" id=\\\"myModalLabel\\\">Before you begin...</h2>\\n                </div>\\n                <div class=\\\"modal__body\\\">\\n                    <p class=\\\"mar--sm--tn\\\">Please confirm the location where you'd prefer to work.</p>\\n                    <div class=\\\"form__group\\\">\\n                        <div class=\\\"select__wrap\\\">\\n                            <div class=\\\"input__icon juicon juicon-down\\\"></div>\\n                            <select>\\n                                <option>Chicago, IL (Closest)</option>\\n                                <option>Boston, MA</option>\\n                                <option>London, GB, UK</option>\\n                                <option>Remote</option>\\n                                <option>San Francisco, CA (Primary)</option>\\n                                <option>Vancouver, BC, CA</option>\\n                            </select>\\n                        </div>\\n                    </div>\\n                </div>\\n                <div class=\\\"modal__footer\\\">\\n                    <button type=\\\"button\\\" class=\\\"button button--primary\\\" data-dismiss=\\\"modal\\\">OK</button>\\n                </div>\\n            </div>\\n        </div>\\n    </div>\\n    <header class=\\\"content pad--md--ts\\\">\\n        <div class=\\\"content__section show-brkpoint--md\\\">\\n            <img class=\\\"mar--sm--bxl theme-logo\\\" src=\\\"../css/img/logo-tagline-company.png\\\"/>\\n        </div>\\n    </header>\\n    <section class=\\\"content content--small pad--sm--m\\\">\\n        <div class=\\\"alert alert--success pad--sm--m mar--sm--bl\\\">\\n            <span class=\\\"part__left--fixed\\\"><span class=\\\"juicon juicon-check-circle\\\"></span></span><span class=\\\"part__body\\\">Done! Thank you for applying.</span>\\n        </div>\\n        <div class=\\\"alert alert--error pad--sm--m mar--sm--bl hide\\\">\\n            <span class=\\\"part__left--fixed\\\"><span class=\\\"juicon juicon-exclamation-circle\\\"></span></span><span class=\\\"part__body\\\">Please supply a password.</span>\\n        </div>\\n        <h3 class=\\\"mar--sm--bn\\\">\\n            Want to make it easier to accept a job offer?\\n        </h3>\\n        <p class=\\\"mar--sm--tn\\\">Specify a password now so we can create an account.</p>\\n        <div class=\\\"form__group\\\">\\n            <label for=\\\"password\\\">Password</label>\\n            <input id=\\\"password\\\" type=\\\"text\\\"/>\\n        </div>\\n        <div class=\\\"form__group\\\">\\n            <span class=\\\"part__left pad--sm--n\\\"><input type=\\\"checkbox\\\" name=\\\"showPass\\\" id=\\\"showPass\\\" checked/></span>\\n            <span class=\\\"part__body\\\"><label for=\\\"showPass\\\"> Show password</label></span>\\n        </div>\\n        <button type=\\\"button\\\" class=\\\"button button--primary\\\">Create my account</button>\\n        <span>Or just <a href=\\\"\\\" class=\\\"text-underline\\\">go back to the job</a>.</span>\\n    </section>\\n    <footer class=\\\"mar--sm--bxl content\\\">\\n        <img class=\\\"mar--sm--txl theme-logo\\\" src=\\\"../css/img/logo-tagline-company.png\\\"/>\\n        <ul class=\\\"inline-list text-left pad--sm--tm fss\\\">\\n            <li class=\\\"inline-list__item\\\">&copy; 2015</li>\\n            <li class=\\\"inline-list__item\\\"><a href=\\\"#\\\">Privacy</a></li>\\n            <li class=\\\"inline-list__item\\\"><a href=\\\"#\\\">Terms</a></li>\\n        </ul>\\n    </footer>\\n</div>\");\n  \n});\n\n})();//@ sourceURL=app/templates.js")

eval("(function() {\n\n// Kick off Ember\nApp = Ember.Application.create({\n    rootElement: '#application'\n});\n\nEmber.Handlebars.helper('formatDate', function(value, dateFormat, options) {\n\n  var escaped = typeof value === 'string' ? Handlebars.Utils.escapeExpression(value) : value;\n\n  return new Ember.Handlebars.SafeString(value === null ? 'N/A' : moment.utc(escaped).format(typeof dateFormat === 'string' ? dateFormat : 'MMM D, YYYY'));\n});\n\nApp.SalesforceTwitterComponent = Ember.Component.extend({\n    layoutName: 'components/twitter',\n    didInsertElement: function() {\n        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");\n        Ember.run.later(this, updateHeight, 500);\n    }\n});\n\nfunction findClosestLocation(self, callback){\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(function(position) {\n            if (Ember.isNone(position)) {\n                var primaryLocation = self.get('locations').findBy('Primary__c', true);\n\n                applyCallback(primaryLocation);\n            } else {\n                var userGeo = {\n                    latitude: position.coords.latitude,\n                    longitude: position.coords.longitude\n                };\n\n                var closestLocation;\n\n                self.get('locations').forEach(function(l) {\n\n                    if (l.Location__c !== 'Remote') {\n                        var locationGeo = {\n                            latitude: l.Location__r.Geographical_Location__c.latitude,\n                            longitude: l.Location__r.Geographical_Location__c.longitude\n                        };\n\n                        var distance = getGeolocationDistance(userGeo, locationGeo);\n\n                        if (Ember.isNone(closestLocation) || distance < closestLocation.distance) {\n                            closestLocation = l;\n                            closestLocation.distance = distance;\n                        }\n                    }\n                    \n                });\n\n                var locationString = closestLocation.formattedLocationString;\n\n                if (locationString.indexOf('(Primary)') !== -1) {\n                    locationString = locationString.split('(Primary)')[0] + '(Primary, Closest)';\n                } else if (locationString.indexOf('(Closest)') === -1) {\n                    locationString += ' (Closest)';\n                }\n\n                closestLocation.set('formattedLocationString', locationString);\n\n                callback(closestLocation);\n                // find closest location.\n            }\n            \n        }, function(error) {\n            var primaryLocation = self.get('locations').findBy('Primary__c', true);\n\n            callback(primaryLocation);\n        });;\n    } else {\n        var primaryLocation = self.get('locations').findBy('Primary__c', true);\n\n        callback(primaryLocation);\n    }\n}\n\nfunction createLocationStrings(locations){\n    var primaryLocation = '';\n    var otherLocationsString = '';\n\n    locations.forEach(function(jobLoc, index) {\n        var location = jobLoc.Location__r;\n        var locationString = '';\n\n        locationString = location.City__c + ', ' + location.Standardized_State_Province__c;\n\n        if (!Ember.isEmpty(location.Standardized_Country_Region__c) && location.Standardized_Country_Region__c !== 'US') {\n            locationString += ', ' + location.Standardized_Country_Region__c;\n        }\n\n        if (index === 0) {\n            primaryLocation = locationString;\n        } else {\n            otherLocationsString += locationString + ' | ';\n        }\n    });\n\n\n    if(!Ember.isEmpty(otherLocationsString)){\n        otherLocationsString = otherLocationsString.substring(0, otherLocationsString.lastIndexOf(' | '));\n    }\n\n    var obj = {\n        primaryLocation: primaryLocation,\n        otherLocationsString: otherLocationsString,\n        otherLocationsCount: locations.length == 0 ? 0 : locations.length - 1\n    };\n\n    return obj;\n};\n\nfunction parsePostingLocations(locations, allowRemote) {\n    var locationObjs = [];\n    var combinedLocations = '';\n\n    locations.forEach(function(jobLoc, index) {\n        var location = jobLoc.Location__r;\n        var locationString = '';\n\n        locationString = location.City__c + ', ' + location.Standardized_State_Province__c;\n\n        if (!Ember.isEmpty(location.Standardized_Country_Region__c) && location.Standardized_Country_Region__c !== 'US') {\n            locationString += ', ' + location.Standardized_Country_Region__c;\n        }\n\n        if (index === 0) {\n            combinedLocations = locationString += ' (Primary)';\n        } else {\n            combinedLocations += ' | ' + locationString;\n        }\n\n        jobLoc.formattedLocationString = locationString;\n        locationObjs.addObject(Ember.Object.create(jobLoc));\n    });\n\n    if (allowRemote === true) {\n        locationObjs.addObject(Ember.Object.create({\n            Location__c: 'Remote',\n            formattedLocationString: 'Remote'\n        }));\n    }\n\n    return {\n        locationObjs: locationObjs,\n        locationsString: combinedLocations\n    };\n}\n\nfunction updateHeight() {\n    Ember.run.scheduleOnce('afterRender', this, function() {\n        parent.resizeIframe();\n    });\n};\n\nvar globalThis = this;\n\nfunction createSaveObj(jobPosting, loggedInUser, linkedInMap) {\n    var saveObj = {};\n\n    if (!Ember.isNone(linkedInMap)) {\n        if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n            saveObj.educationHistory = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);\n        }\n\n        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n            saveObj.employmentHistory = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);\n        }\n    }\n\n    saveObj.application = {\n        Requisition__c: jobPosting.Requisition__c,\n        Contact__c: loggedInUser.ContactId,\n        First_Name__c: loggedInUser.FirstName,\n        Last_Name__c: loggedInUser.LastName,\n        Email__c: loggedInUser.Email,\n        Street_Address__c: !Ember.isNone(linkedInMap) ? linkedInMap.mainAddress : null,\n        Job_Posting__c: jobPosting.Id\n    };\n\n    return saveObj;\n};\n\nfunction convertLinkedInToEducationHistoryObj(educations) {\n    return educations.map(function(e) {\n        // Educations from linkedIn only have year in the startDate/endDate\n\n        return {\n            Education_Level__c: degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',\n            Name: e.schoolName,\n            Status__c: null,\n            Start_Month__c: !Ember.isNone(e.startDate) ? String(e.startDate.month) : null,\n            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,\n            End_Month__c: !Ember.isNone(e.endDate) ? String(e.endDate.month) : null,\n            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null\n        };\n    });\n}\n\nfunction convertLinkedInToEmploymentHistoryObj(positions) {\n    return positions.map(function(p) {\n        // Positions from LinkedIn only have year and month in startDate/endDate\n\n        return {\n            Name: !Ember.isNone(p.company) ? p.company.name : null,\n            Job_Title__c: p.title,\n            Start_Month__c: !Ember.isNone(p.startDate) ? String(p.startDate.month) : null,\n            Start_Year__c: !Ember.isNone(p.startDate) ? p.startDate.year : null,\n            End_Month__c: !Ember.isNone(p.endDate) ? String(p.endDate.month) : null,\n            End_Year__c: !Ember.isNone(p.endDate) ? p.endDate.year : null,\n            Is_Current__c: p.isCurrent,\n        };\n    });\n}\n\nfunction getGeolocationDistance(p1, p2) {\n    var rad = function(x) { return x * Math.PI / 180 };\n\n    var R = 6371;\n    var dLat  = rad(p2.latitude - p1.latitude);\n    var dLong = rad(p2.longitude - p1.longitude);\n\n    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +\n            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);\n    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));\n    var d = R * c;\n\n    return Math.round(d);\n}\n\nvar degreePicklistValues = [];\n\nif (!Ember.isEmpty(jobPostingMap.degreeFields)) {\n    degreePicklistValues = jobPostingMap.degreeFields.getEach('value');\n}\n\nvar numberToMonthMap = {\n    '1' : 'January',\n    '2' : 'February',\n    '3' : 'March',\n    '4' : 'April',\n    '5' : 'May',\n    '6' : 'June',\n    '7' : 'July',\n    '8' : 'August',\n    '9' : 'September',\n    '10' : 'October',\n    '11' : 'November',\n    '12' : 'December'\n};\n\nEmber.View.reopen({\n    willInsertElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    },\n    willDestroyElement: function() {\n        Ember.run.debounce(globalThis, updateHeight, 100);\n    }\n});\n\nApp.LocationModalView = Ember.View.extend({\n    templateName: 'locationModal',\n    didInsertElement: function() {\n        \n    }\n});\n\nApp.JobPostingView = Ember.View.extend({\n    didInsertElement: function() {\n        $('body').tooltip({\n            selector: '[data-toggle=tooltip]'\n        });\n\n        $('body').on('touchstart.jui.dropdown', '.dropdown-menu', function (e) { \n            e.stopPropagation(); \n        });\n        \n        $('.dropdown-menu').on('touchstart.dropdown.data-api', function(e) { e.stopPropagation() })\n    }\n});\n\nApp.JobPostingController = Ember.ObjectController.extend({\n    jobIsSaved: function(){\n        return this.get('isJobSaved') && Ember.isNone(this.get('application'));\n    }.property('isJobSaved', 'application'),\n    hasJobOffer : function(){\n        var application = this.get('application')\n        return !Ember.isNone(application) && !Ember.isNone(application.Job_Offers__r)\n    }.property(),\n    redirectUrl : function(){\n        var application = this.get('application');\n        var href = '';\n        \n        if (this.get('hasJobOffer')) {\n            return '/' + parent.urlPrefix.split('/')[1] + '/' + extnamespace + 'to_offerLetterCandidate?id=' + application.Job_Offers__r.records[0].Id;\n        } else if(!Ember.isNone(application) && application.Status__c === 'In Progress'){\n            return parent.urlPrefix + '/Apply?id=' + application.Id;\n        } \n        \n        return href;\n    }.property('hasJobOffer', 'application'),\n    toggleDropdown : function(){\n        return Ember.isEmpty(this.get('redirectUrl')) ? 'dropdown' : '';\n    }.property('redirectUrl'),\n    actionButtonColor : function(){\n        var application = this.get('application');\n        return !Ember.isEmpty(application) && (application.Status__c == 'In Progress' || !Ember.isEmpty(application.Job_Offers__r)) ? 'button--success' : 'button--primary';\n    }.property(),\n    actionButtonText : function(){\n        var application = this.get('application')\n    \n        if (!Ember.isNone(application) && !Ember.isNone(application.Job_Offers__r) \n                    && ['Extended', 'Accepted', 'Declined'].indexOf(application.Job_Offers__r.records[0].Status__c) !== -1) {\n            return labels.viewOffer;\n        } else if(!Ember.isNone(application) && application.Status__c === 'In Progress'){\n            return labels.finish;\n        } else {\n            return labels.apply + ' <span class=\"show-brkpoint--md\">' + labels.now + '</span>'\n        }\n    }.property(),\n    appliedAlertClass: function() {\n        var application = this.get('application');\n\n        if (!Ember.isNone(application)) {\n            var hasOffer = !Ember.isNone(application.Job_Offers__r);\n            var isToday = moment().diff(moment(application.Applied_On__c), 'hours') < 24;\n            var isCompleted = application.Status__c === 'Completed'\n\n            if ((!hasOffer && isCompleted && isToday) || (hasOffer && application.Job_Offers__r.records[0].Status__c === 'Extended')) {\n                return 'alert--success';\n            } else if (!hasOffer && !isCompleted) {\n                return 'alert--warning';\n            } else {\n                return 'alert--info';\n            }\n        } else {\n            return null;\n        }\n    }.property('application'),\n    appliedMessage: function() {\n        var application = this.get('application');\n\n        if (!Ember.isNone(application)) {\n            var hasOffer = !Ember.isNone(application.Job_Offers__r);\n            var isToday = moment().diff(moment(application.Applied_On__c), 'hours') < 24;\n            var isCompleted = application.Status__c === 'Completed'\n\n            if (!hasOffer && isCompleted && isToday) {\n                return labels.thankYou;\n            } else if (!hasOffer && isCompleted && !isToday){\n                return labels.youAppliedOn + ' ' + moment(application.Applied_On__c).format('MMM D, YYYY') + '.';\n            } else if (!hasOffer && !isCompleted) {\n                var appliedMessage = '';\n                var numDaysSinceApply = moment().diff(moment(application.CreatedDate), 'days');\n\n                if (numDaysSinceApply === 0) {\n                    appliedMessage = labels.appliedToday;\n                } else if (numDaysSinceApply === 1) {\n                    appliedMessage = labels.appliedYesterday;\n                } else {\n                    appliedMessage = labels.appliedMultilpleDays + ' ' + moment().diff(moment(application.CreatedDate), 'days') + ' ' + labels.daysAgo;\n                }\n\n                appliedMessage += ' <a href=\"' + this.get('redirectUrl') + '\" target=\"_top\">' + labels.finishNow + '</a>';\n                return appliedMessage;\n            } else if (hasOffer && application.Job_Offers__r.records[0].Status__c === 'Extended') {\n                return labels.offeredJob;\n            } else {\n                return null;\n            }\n        }\n        \n        return null;\n    }.property(),\n    disableApplyButton: function() {\n        var application = this.get('application')\n        if(!Ember.isEmpty(application) && Ember.isEmpty(application.Job_Offers__r) && application.Status__c == 'Completed'){\n            return 'disabled';\n        }\n\n        return false;\n    }.property(),\n    apply : function(applyType){\n        var self = this;\n        var applyUrl = '/apex/to_applyFlow?reqId=' + self.get('jobPosting').Requisition__c + '&jobPostingId=' + self.get('jobPosting').Id + '&source=' + self.get('utmSource');\n\n        if (self.get('selectedLocation') === 'Remote') {\n            applyUrl += '&prefersRemote=true&locationId=' + self.get('locations').findBy('Primary__c', true).Location__c;\n        } else {\n            applyUrl += '&locationId=' + self.get('selectedLocation')\n        }\n\n        if(applyType == 'email'){\n            window.parent.location.href = applyUrl;\n        } else {\n            applyUrl += '&importLinkedIn=true';\n\n            if (!Ember.isNone(self.get('linkedInMap'))) {\n                window.parent.location.href = applyUrl;\n            } else {\n                window.parent.location.href = self.get('applyWithLinkedInUrl') + applyUrl.replace(/&/g, '%26');\n            }\n        }\n    },\n    actions: {\n        displayLocationModal : function(applyType) {\n            var self = this;\n\n            if (self.get('locations').length === 1) {\n                self.apply(applyType);\n            } else {\n                var applyCallback = function(selectedLocation) {\n                    self.set('showLoadingState', false);\n                    $('#locationModal').modal({\n                        show: true,\n                    });\n\n                    parent.resizeIframe({ maximize: true });\n\n                    window.parent.scrollTo(0,0);\n\n                    if (!Ember.isNone(selectedLocation)) {\n                        self.set('selectedLocation', selectedLocation.Location__c);\n                    }\n\n                    $('#modalOk').click(function() {\n                        self.apply(applyType);\n                    });\n                };\n                self.set('showLoadingState', true);\n                findClosestLocation(self, applyCallback);\n            }\n        },\n        clickTweet: function() {\n            var jp = this.get('jobPosting');\n            var currentUrl = window.parent.location.href + '&utm_source=' + jp.Channel__c + '&utm_medium=' + jp.Type__c + '&utm_campaign=somecampaignvalue';\n            var tweetString = 'Check out this job: ' + this.get('jobPosting').Job_Title__c + ' ' + currentUrl;\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetString),\n                        'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes'\n                );\n        },\n        clickLinkedIn: function (){\n            var jp = this.get('jobPosting');\n            var url = window.location.href + '&utm_source=' + jp.Channel__c + '&utm_medium=' + jp.Type__c + '&utm_campaign=somecampaignvalue';\n            var title = jp.Job_Title__c;\n            var summary = jp.Summary__c;\n            var docTitle = document.title; // This is the document where the Share Button is\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('http://www.linkedin.com/shareArticle?mini=true&url='+ \n                        encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + \n                        '&summary=' + encodeURIComponent(summary) + '&t=' + encodeURIComponent(docTitle),\n                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');\n\n            return false;\n        },\n        clickFacebook: function (){\n            var url = window.location.href;\n            var docTitle = document.title; // This is the document where the Share Button is\n            var width = 626;\n            var height = 436;\n            var left = (screen.width / 2) - (width / 2);\n            var top = (screen.height / 2) - (height / 2);\n\n            window.open('http://www.facebook.com/sharer.php?u='+ \n                        encodeURIComponent(url)+ '&t=' + encodeURIComponent(docTitle),\n                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +\n                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');\n\n            return false;\n        },\n        toggleSaveJob: function (){\n            if(this.get('isSaving')){\n                return;\n            }\n\n            this.set('isSaving', true);\n            \n            // Check if user is loged in\n            var self = this;\n            var jobPosting = self.get('jobPosting');\n            if (this.get('loggedInUser').UserType == 'Guest') {\n                window.parent.location.href = parent.urlPrefix + '/Login?startURL=' + parent.urlPrefix + '/JobListing?id%3D' + self.get('jobPosting').Id + '%26saveJob%3Dtrue';\n                return;\n            }\n\n            var interestObj;\n            \n            if(Ember.isEmpty(this.get('savedJob'))){\n                interestObj = {\n                    Job_Posting__c: jobPosting.Id,\n                    Name: jobPosting.Name,\n                    Candidate_User__c: self.get('loggedInUser').Id,\n                    Expressed_By__c: 'Candidate', // Picklist\n                    Source_Requisition__c: jobPosting.Requisition__c,\n                    Position__c: jobPosting.Requisition__r.Position__c\n                }\n            } else {\n                interestObj = this.get('savedJob');\n            }\n            \n            var linkedInMap = this.get('linkedInMap');\n\n            if (!Ember.isNone(linkedInMap)) {\n                if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {\n                    var educationHistories = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);\n                    var flattenedEducationHistory = '';\n\n                    educationHistories.forEach(function(eh) {\n                        // add education history to flattened string\n                        flattenedEducationHistory += eh.Name__c + '\\n'\n                                    + eh.Education_Level__c;\n\n                        if (!Ember.isNone(eh.Status__c)) {\n                            flattenedEducationHistory += ' (' + eh.Status__c + ')';\n                        } \n                        \n                        flattenedEducationHistory += '\\n' \n                                                  + eh.Start_Year__c\n                                                  + ' - ' + eh.End_Year__c\n                                                  + '\\n\\n';\n                    });\n\n                    interestObj.Education_History__c = flattenedEducationHistory;\n                }\n\n                if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {\n                    var employmentHistories = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);\n                    var flattenedEmploymentHistory = '';\n\n                    employmentHistories.forEach(function(eh) {\n                        // add employment history to flattened string\n                        flattenedEmploymentHistory += eh.Name + '\\n'\n                                    + eh.Job_Title__c + '\\n';\n\n                        if (!Ember.isNone(eh.Start_Month__c)){\n                            flattenedEmploymentHistory += numberToMonthMap[eh.Start_Month__c] + ' ';\n                        }\n\n                        flattenedEmploymentHistory += eh.Start_Year__c + ' - ';\n\n                        if (eh.Is_Current__c == true) {\n                            flattenedEmploymentHistory += 'present';\n                        } else if (!Ember.isNone(eh.End_Month__c)) {\n                            flattenedEmploymentHistory += numberToMonthMap[eh.End_Month__c] + ' ';\n                        }\n\n                        if (!Ember.isNone(eh.End_Year__c)) {\n                            flattenedEmploymentHistory += eh.End_Year__c;\n                        }\n\n                        flattenedEmploymentHistory += '\\n\\n';\n                    });\n                    interestObj.Employment_History__c = flattenedEmploymentHistory;\n                }\n\n                if (!Ember.isNone(linkedInMap.skills && !Ember.isEmpty(linkedInMap.skills.values))) {\n                    var skillsArray = [];\n                    linkedInMap.skills.values.forEach(function(skill) {\n                        skillsArray.addObject(skill.skill.name);\n                    });\n                    interestObj.Skills__c = skillsArray.join(', ');\n                }\n            }\n\n            cont.saveJob(JSON.stringify(interestObj), function(results, responseObj){\n                var parsedResult = parseResult(results);\n                self.set('isSaving', false);\n                if(!Ember.isEmpty(parsedResult.data.savedJob)){\n                    var savedJob = parsedResult.data.savedJob;\n                    var jobObj = {\n                        Id : savedJob.Id,\n                        jobTitle: interestObj.Name,\n                        jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + interestObj.Job_Posting__c,\n                        otherText : jobPosting.locations.length > 2 ? labels.others : labels.other\n                    };\n\n                    jobObj = $.extend(jobObj, createLocationStrings(jobPosting.locations));\n                    self.get('allMyJobs').insertAt(0, jobObj);\n                    self.set('savedJob', savedJob);\n                    self.set('recentSave', true);\n                    self.set('isJobSaved', true);\n                } else {\n                    var savedJob = self.get('allMyJobs').findBy('Id', self.get('savedJob').Id);\n                    self.set('isJobSaved', false);\n                    self.set('savedJob', null);\n                    self.get('allMyJobs').removeObject(savedJob);\n                }\n\n                window.parent.scrollTo(0,0);\n            });\n        }\n    }\n});\n\n// Routes\nApp.JobPostingRoute = Ember.Route.extend( {\n    model: function(params) {\n        console.log('hello wtf')\n        return new Ember.RSVP.Promise(function(resolve, reject) {\n            if(!Ember.isEmpty(utmSource)){\n                var d = new Date();\n                d.setTime(d.getTime() + (365*24*60*60*1000));\n                var expires = \"expires=\"+d.toUTCString();\n                document.cookie = \"utmSource=\" + utmSource + ';' + expires;\n            }\n\n            jobPostingMap.utmSource = Ember.isEmpty(getCookie('utmSource')) ? null : getCookie('utmSource');\n            jobPostingMap.isRemoteAvailable = jobPostingMap.jobPosting.Requisition__r.Allow_Remote_Employees__c;\n\n            var parsedLocations = parsePostingLocations(jobPostingMap.jobPosting.locations, jobPostingMap.isRemoteAvailable);\n            jobPostingMap.locationString = parsedLocations.locationsString;\n            jobPostingMap.locations = parsedLocations.locationObjs;\n\n            //set the values of the field so we can use it easily on the template\n            jobPostingMap.jpFields.forEach(function(f) {\n                f.value = jobPostingMap.jobPosting[f.name];\n            });\n\n            var allMyJobs = Ember.A();\n            \n            jobPostingMap.applications.forEach(function(app) {\n                \n                var applicationObj = {\n                    jobTitle: app.Job_Posting__r.Name,\n                    jobPostingUrl: parent.urlPrefix + '/JobListing?id=' + app.Job_Posting__c,\n                    isApplication: true,\n                    hasJobOffer: !Ember.isEmpty(app.Job_Offers__r),\n                    jobOfferStatus: !Ember.isEmpty(app.Job_Offers__r) ? app.Job_Offers__r.records[0].Status__c : null,\n                    statusText: app.Status__c === 'Completed' ? 'Applied' : 'In Progress',\n                    isRemoteAvailable: app.Requisition__r.Allow_Remote_Employees__c,\n                    otherText : app.locations.length > 2 ? labels.others : labels.other\n                };\n\n                applicationObj = $.extend(applicationObj, createLocationStrings(app.locations));\n\n                if (!Ember.isEmpty(app.Job_Offers__r)) {\n                    if(app.Job_Offers__r.records[0].Status__c == 'Declined'){\n                        applicationObj.jobLabelClass = 'label--secondary';\n                    } else {\n                        applicationObj.jobLabelClass = 'label--success';\n                    }\n                } else {\n                    if (app.Status__c === 'In Progress') {\n                        applicationObj.jobLabelClass = 'label--warning';\n                    } else {\n                        applicationObj.jobLabelClass = 'label--secondary';\n                    }\n                }\n\n                allMyJobs.addObject(applicationObj);\n            });\n\n            jobPostingMap.savedJobs.forEach(function(savedJob) {\n                    var jobObj = {\n                        Id : savedJob.Id,\n                        jobTitle: savedJob.Name,\n                        jobPostingUrl: parent.urlPrefix + '/JobListing?id=' + savedJob.Job_Posting__c,\n                        isSavedJob: true,\n                        otherText : savedJob.locations.length > 2 ? labels.others : labels.other,\n                        isRemoteAvailable: savedJob.Source_Requisition__r.Allow_Remote_Employees__c,\n                    };\n                    console.log(savedJob.locations.length)\n                    console.log(jobObj);\n                    jobObj = $.extend(jobObj, createLocationStrings(savedJob.locations));\n                    allMyJobs.addObject(jobObj);\n            });\n\n            jobPostingMap.allMyJobs = allMyJobs.sortBy('CreatedDate').reverse();\n            jobPostingMap.applyWithLinkedInUrl = jobPostingMap.linkedInSsoUrl ? jobPostingMap.linkedInSsoUrl + '?community=https://' + parent.communityUrl + '&' + 'startURL=' : null;\n            resolve(jobPostingMap);\n        });\n    },\n    setupController: function(controller, model) {\n        controller.set('model', model);\n\n        if (parent.saveJob === true && Ember.isNone(model.savedJob)) {\n            controller.send('saveJob');\n        }\n    }\n});\n\nfunction getCookie(cname) {\n    var name = cname + \"=\";\n    var ca = document.cookie.split(';');\n    for(var i=0; i<ca.length; i++) {\n        var c = ca[i];\n        while (c.charAt(0)==' ') c = c.substring(1);\n        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);\n    }\n    return \"\";\n}\n\n// Router\nApp.Router.map(function() {\n    this.resource('jobPosting', { path: '/' });\n});\n\n\n// This setting disables the detail routing from showing up in the navbar.\nApp.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=app/to_createUser.js")