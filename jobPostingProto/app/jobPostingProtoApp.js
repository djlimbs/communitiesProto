// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.SalesforceTwitterComponent = Ember.Component.extend({
    layoutName: 'components/twitter',
    didInsertElement: function() {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }
});

function updateHeight() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        parent.resizeIframe();
    });
};

var globalThis = this;

function createSaveObj(jobPosting, loggedInUser, linkedInMap) {
    var saveObj = {};

    if (!Ember.isNone(linkedInMap)) {
        if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {
            saveObj.educationHistory = createEducationHistoryObj(linkedInMap.educations.values);
        }

        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {
            saveObj.employmentHistory = createEmplyomentHistoryObj(linkedInMap.positions.values);
        }
    }

    saveObj.application = {
        Requisition__c: jobPosting.Requisition__c,
        Contact__c: loggedInUser.ContactId,
        First_Name__c: loggedInUser.FirstName,
        Last_Name__c: loggedInUser.LastName,
        Email__c: loggedInUser.Email
    };

    return saveObj;
};

function createEducationHistoryObj(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: e.degree,
            Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,
            Name: e.schoolName,
            Status__c: null,
            End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null
        };
    });
};

function createEmplyomentHistoryObj(positions) {
    return positions.map(function(p) {
        // Positions from LinkedIn only have year and month in startDate/endDate
        var startDate;
        var endDate;

        if (!Ember.isNone(p.startDate)) {
            if (!Ember.isNone(p.startDate.month)) {
                startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');
            } else {
                startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');
            }
        }

        if (!Ember.isNone(p.endDate)) {
            if (!Ember.isNone(p.endDate.month)) {
                endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');
            } else {
                endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');
            }
        }

        return {
            Name: !Ember.isNone(p.company) ? p.company.name : null,
            Job_Title__c: p.title,
            Start_Date__c: startDate,
            Is_Current__c: p.isCurrent,
            End_Date__c: endDate
        };
    });
};

Ember.View.reopen({
    willInsertElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    },
    willDestroyElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    }
});


App.JobPostingController = Ember.ObjectController.extend({
    appliedMessage: function() {
        if (!Ember.isNone(this.get('application'))) {
            return this.get('justApplied') === true ? 'You have successfully applied.' : 'You already applied.';
        } else {
            return null;
        }
    }.property('justApplied', 'application'),
    hasApplied: function() {
        return !Ember.isNone(this.get('application'));
    }.property('application'),
    disableApplyButton: function() {
        return this.get('hasApplied') === true ? 'disabled' : false;
    }.property('hasApplied'),
    applyWithLinkedInUrl: function() {
        var linkedInSsoUrl = this.get('linkedInSsoUrl');
        if (!Ember.isNone(linkedInSsoUrl)) {
            return linkedInSsoUrl + '?community=https://' + parent.communityUrl + '&' +
                    'startURL=' + parent.urlPrefix + '/JobPosting?id=' + this.get('jobPosting').Id + '%26applyWithLinkedIn=true';
        } else {
            return null
        }
    }.property(),
    //applyWithLinkedInUrl: function() {
    //    return parent.urlPrefix + '/Apply%20with%20LinkedIn?id=' + this.get('jobPosting').Id;
    //}.property('Id'),
    createEducationHistoryObj: function(educations) {
        return educations.map(function(e) {
            // Educations from linkedIn only have year in the startDate/endDate

            return {
                Education_Level__c: e.degree,
                Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,
                Name: e.schoolName,
                Status__c: null,
                End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null
            };
        });
    },
    createEmplyomentHistoryObj: function(positions) {
        return positions.map(function(p) {
            // Positions from LinkedIn only have year and month in startDate/endDate
            var startDate;
            var endDate;

            if (!Ember.isNone(p.startDate)) {
                if (!Ember.isNone(p.startDate.month)) {
                    startDate = moment.utc(p.startDate.month + '/' + p.startDate.year, 'M/YYYY').format('YYYY-MM-DD');
                } else {
                    startDate = moment.utc(p.startDate.year, 'YYYY').format('YYYY-MM-DD');
                }
            }

            if (!Ember.isNone(p.endDate)) {
                if (!Ember.isNone(p.endDate.month)) {
                    endDate = moment.utc(p.endDate.month + '/' + p.endDate.year, 'M/YYYY').format('YYYY-MM-DD');
                } else {
                    endDate = moment.utc(p.endDate.year, 'YYYY').format('YYYY-MM-DD');
                }
            }

            return {
                Name: !Ember.isNone(p.company) ? p.company.name : null,
                Job_Title__c: p.title,
                Start_Date__c: startDate,
                Is_Current__c: p.isCurrent,
                End_Date__c: endDate
            };
        });
    },
    actions: {
        clickApply: function() {
            console.log(this.get('jobPosting'));
            console.log(this.get('loggedInUser'));

            var jobPosting = this.get('jobPosting');
            var loggedInUser = this.get('loggedInUser');
            var linkedInMap = this.get('linkedInMap');
            var saveObj = {};

            console.log(linkedInMap);

            if (loggedInUser.UserType === 'Guest') {
                // GO TO login
                console.log('goto login'); //get URL prefix son.
                window.parent.location.href = parent.authLoginUrl;
                //window.parent.location.href='/Login';
            } else {

                if (!Ember.isNone(linkedInMap)) {

                    if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {
                        saveObj.educationHistory = this.createEducationHistoryObj(linkedInMap.educations.values);
                    }

                    if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {
                        saveObj.employmentHistory = this.createEmplyomentHistoryObj(linkedInMap.positions.values);
                    }
                }

                saveObj.application = {
                    Requisition__c: jobPosting.Requisition__c,
                    Contact__c: loggedInUser.ContactId,
                    First_Name__c: loggedInUser.FirstName,
                    Last_Name__c: loggedInUser.LastName,
                    Email__c: loggedInUser.Email
                };

                console.log(saveObj);

                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            // error handling
                        } else {
                            console.log(parsedResult);
                        }
                    } else {
                        // error handling
                    }
                });
            }
        },
        clickApplyWithLinkedIn: function() {
            if (!Ember.isNone(this.get('linkedInMap'))) {
                var self = this
                    , saveObj = createSaveObj(this.get('jobPosting'), this.get('loggedInUser'), this.get('linkedInMap'));
                
                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            // error handling
                        } else {
                            console.log(parsedResult);

                            self.set('application', parsedResult.data.application);
                            self.set('justApplied', true);
                            window.parent.scrollTo(0,0)
                        }
                    } else {
                        // error handling
                    }
                });
            } else {
                window.parent.location.href = this.get('applyWithLinkedInUrl');
            }
        }
    }
});

// Routes
App.JobPostingRoute = Ember.Route.extend( {
    model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(jobPostingMap.jpLocations)) {
                var firstLocationString = '';
                var otherLocationsString;
                var otherLocationsCount = 0;

                jobPostingMap.jpLocations.forEach(function(l, i) {
                    if (i === 0) {
                        firstLocationString = l.Location__r.Name;
                    } else if (i === 1) {
                        otherLocationsCount++;
                        otherLocationsString = l.Location__r.Name;
                    } else {
                        otherLocationsCount++;
                        otherLocationsString += ', ' + l.Location__r.Name;
                    }
                });

                jobPostingMap.firstLocationString = firstLocationString;
                jobPostingMap.otherLocationsString = otherLocationsString;
                jobPostingMap.otherLocationsCount = otherLocationsCount;
            }

            if (parent.applyWithLinkedIn === true && !Ember.isNone(jobPostingMap.linkedInMap) 
                        && Ember.isNone(jobPostingMap.application)) {
                var saveObj = createSaveObj(jobPostingMap.jobPosting, jobPostingMap.loggedInUser, jobPostingMap.linkedInMap);

                console.log(saveObj);

                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            // error handling
                        } else {
                            console.log(parsedResult);

                            jobPostingMap.application = parsedResult.data.application;
                            jobPostingMap.justApplied = true;
                            resolve(jobPostingMap);
                        }
                    } else {
                        // error handling
                    }
                });

            } else {
                resolve(jobPostingMap);
            }
        });
    }
});

// Router
App.Router.map(function() {
    this.resource('jobPosting', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});