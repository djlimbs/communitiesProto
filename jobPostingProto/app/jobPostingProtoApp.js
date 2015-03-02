// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

Ember.Handlebars.helper('formatDate', function(value, dateFormat, options) {

  var escaped = typeof value === 'string' ? Handlebars.Utils.escapeExpression(value) : value;

  return new Ember.Handlebars.SafeString(value === null ? 'N/A' : moment.utc(escaped).format(typeof dateFormat === 'string' ? dateFormat : 'MMM D, YYYY'));
});

App.SalesforceTwitterComponent = Ember.Component.extend({
    layoutName: 'components/twitter',
    didInsertElement: function() {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        Ember.run.later(this, updateHeight, 500);
    }
});

function createLocationStrings(locations){

    var firstLocationString = '';
    var otherLocationsString;
    var otherLocationsCount = 0;

    locations.sortBy('Primary__c').reverse().forEach(function(l, i) {
        var location = '';

        location = l.Location__r.City__c + ', ' + l.Location__r.State_Province__c;

        if (!Ember.isEmpty(l.Location__r.Country_Province__c) && l.Location__r.Country_Province__c !== 'United States') {
            location += ', ' + l.Location__r.Country_Province__c;
        }

        if (i === 0) {
            firstLocationString = location;
        } else if (i === 1) {
            otherLocationsCount++;
            otherLocationsString = location;
        } else {
            otherLocationsCount++;
            otherLocationsString += ', ' + location;
        }
    });

    var obj = {
        firstLocationString: firstLocationString,
        otherLocationsString: otherLocationsString,
        otherLocationsCount: otherLocationsCount
    };

    return obj;
}

function parsePostingLocations(locations, allowRemote) {
    var primaryLocation;
    var returnObj = {
        locationObjs: [],
        locationsString: ''
    };

    locations.sortBy('Primary__c').reverse().forEach(function(l, i) {
        var updatedLocationObj = l;
        var location = '';

        location = l.Location__r.City__c + ', ' + l.Location__r.State_Province__c;

        if (!Ember.isEmpty(l.Location__r.Country_Province__c) && l.Location__r.Country_Province__c !== 'United States') {
            location += ', ' + l.Location__r.Country_Province__c;
        }

        if (i === 0) {
            returnObj.locationsString = location;
        } else {
            returnObj.locationsString += ' | ' + location;
        }

        updatedLocationObj.formattedLocationString = location;
        if (l.Primary__c === true) {
            updatedLocationObj.formattedLocationString += ' (Primary)';
            primaryLocation = l;
        }
        returnObj.locationObjs.addObject(Ember.Object.create(updatedLocationObj));
    });

    if (allowRemote === true) {
        returnObj.locationObjs.addObject({
            Id: 'Remote',
            formattedLocationString: 'Remote'
        });
    }

    return returnObj;
}

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
            saveObj.educationHistory = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
        }

        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {
            saveObj.employmentHistory = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
        }
    }

    saveObj.application = {
        Requisition__c: jobPosting.Requisition__c,
        Contact__c: loggedInUser.ContactId,
        First_Name__c: loggedInUser.FirstName,
        Last_Name__c: loggedInUser.LastName,
        Email__c: loggedInUser.Email,
        Street_Address__c: !Ember.isNone(linkedInMap) ? linkedInMap.mainAddress : null,
        Job_Posting__c: jobPosting.Id
    };

    return saveObj;
};

function convertLinkedInToEducationHistoryObj(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',
            Start_Date__c: !Ember.isNone(e.startDate) ? moment.utc(e.startDate.year, 'YYYY').format('YYYY-MM-DD') : null,
            Start_Month__c: !Ember.isNone(e.startDate) ? e.startDate.month : null,
            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,
            End_Month__c: !Ember.isNone(e.endDate) ? e.endDate.month : null,
            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null,
            Name: e.schoolName,
            Name__c: e.schoolName,
            Status__c: null,
            End_Date__c: !Ember.isNone(e.endDate) ? moment.utc(e.endDate.year, 'YYYY').format('YYYY-MM-DD') : null
        };
    });
}

function convertLinkedInToEmploymentHistoryObj(positions) {
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
            Start_Month__c: !Ember.isNone(p.startDate) ? p.startDate.month : null,
            Start_Year__c: !Ember.isNone(p.startDate) ? p.startDate.year : null,
            End_Month__c: !Ember.isNone(p.endDate) ? p.endDate.month : null,
            End_Year__c: !Ember.isNone(p.endDate) ? p.endDate.year : null,
            Start_Date__c: startDate,
            Is_Current__c: p.isCurrent,
            End_Date__c: endDate
        };
    });
}

function getGeolocationDistance(p1, p2) {
    var rad = function(x) { return x * Math.PI / 180 };

    var R = 6371;
    var dLat  = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return Math.round(d);
}

var degreePicklistValues = [];

if (!Ember.isEmpty(jobPostingMap.degreeFields)) {
    degreePicklistValues = jobPostingMap.degreeFields.getEach('value');
}

var numberToMonthMap = {
    '1' : 'January',
    '2' : 'February',
    '3' : 'March',
    '4' : 'April',
    '5' : 'May',
    '6' : 'June',
    '7' : 'July',
    '8' : 'August',
    '9' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December'
};

Ember.View.reopen({
    willInsertElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    },
    willDestroyElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    }
});

App.LocationModalView = Ember.View.extend({
    templateName: 'locationModal',
    didInsertElement: function() {
        
    }
});

App.JobPostingView = Ember.View.extend({
    didInsertElement: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        $('body').on('touchstart.jui.dropdown', '.dropdown-menu', function (e) { 
            e.stopPropagation(); 
        });
        
        $('.dropdown-menu').on('touchstart.dropdown.data-api', function(e) { e.stopPropagation() })
    }
});

App.JobPostingController = Ember.ObjectController.extend({
    allMyJobs: function(){
        var applications = this.get('applications');
        var savedJobs = this.get('savedJobs');

        var allMyJobsArray = applications.concat(savedJobs).sortBy('CreatedDate').reverse();

        return allMyJobsArray;
    }.property('applications', 'savedJobs'),

    jobIsSaved: function(){
        return this.get('isJobSaved') && Ember.isNone(this.get('application'));
    }.property('isJobSaved', 'application'),
    jobOfferUrl: function() {
        var application = this.get('application');
        if (!Ember.isNone(application) && !Ember.isNone(application.Job_Offers__r) 
                    && ['Extended', 'Accepted', 'Declined'].indexOf(application.Job_Offers__r.records[0].Status__c) !== -1) {
            return '/' + parent.urlPrefix.split('/')[1] + '/to_offerLetterCandidate?id=' + application.Job_Offers__r.records[0].Id;
        } else {
            return null;
        }
    }.property('application'),
    continueApplicationUrl: function() {
        var application = this.get('application');
        if (!Ember.isNone(application) && application.Status__c === 'In Progress') {
            return '/' + parent.urlPrefix.split('/')[1] + '/apply?id=' + application.Id;
        } else {
            return null;
        }
    }.property('application'),
    appliedAlertClass: function() {
        var application = this.get('application');

        if (this.get('justApplied') === true) {
            return 'alert--success';
        } else if (!Ember.isNone(application)) {
            if (Ember.isNone(application.Job_Offers__r) && application.Status__c === 'In Progress') {
                return 'alert--warning';
            } else if (!Ember.isNone(application.Job_Offers__r) && application.Job_Offers__r.records[0].Status__c === 'Extended') {
                return 'alert--success';
            } else {
                return 'alert--info';
            }
        } else {
            return null;
        }
    }.property('application'),
    appliedMessage: function() {
        var application = this.get('application');
        if (!Ember.isNone(application)) {
            if (this.get('justApplied') === true) {
                return 'Thank you for applying!';
            } else if (Ember.isNone(application.Job_Offers__r) && application.Status__c === 'In Progress') {
                var continueApplicationUrl = this.get('continueApplicationUrl');
                var appliedMessage = '';
                var numDaysSinceApply = moment().diff(moment(application.CreatedDate), 'days');

                if (numDaysSinceApply === 0) {
                    appliedMessage = 'You began applying for this job today. <a href="' + continueApplicationUrl + '" target="_top">Finish now</a>';
                } else if (numDaysSinceApply === 1) {
                    appliedMessage = 'You began applying for this job 1 day ago. <a href="' + continueApplicationUrl + '" target="_top">Finish now</a>';
                } else {
                    appliedMessage = 'You began applying for this job ' + moment().diff(moment(application.CreatedDate), 'days') + 
                                        ' days ago. <a href="' + continueApplicationUrl + '" target="_top">Finish now</a>';
                }

                return appliedMessage;
            } else if (!Ember.isNone(application.Job_Offers__r) && application.Job_Offers__r.records[0].Status__c === 'Extended') {
                return 'Congratulations! You\'ve received an offer on this job!';
            } else if (!Ember.isNone(application.Job_Offers__r) && ['Accepted', 'Declined'].indexOf(application.Job_Offers__r.records[0].Status__c) !== -1) {
                return null;
            } else {
                return 'You applied for this job on ' + moment(application.Applied_On__c).format('MMM D, YYYY') + '.';
            }
        } else {
            return null;
        }
    }.property('justApplied', 'application'),
    justApplied: function() {
        var application = this.get('application');
        return !Ember.isNone(application) && Ember.isNone(application.Job_Offers__r) 
                && application.Status__c === 'Completed' && moment().diff(moment(application.Applied_On__c), 'hours') < 24;
    }.property('application'),
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
    actions: {
        clickApply: function() {
            var self = this;

            if (self.get('locations').length === 1) {
                
                var applyObj = {
                    requisitionId: self.get('jobPosting').Requisition__c,
                    jobPostingId: self.get('jobPosting').Id,
                    location: self.get('locations')[0].Id
                };

                var applyUrl = '/' + parent.urlPrefix.split('/')[1] + '/apply?reqId=' + applyObj.requisitionId + '&jobPostingId=' + applyObj.jobPostingId + '&location=' + applyObj.location;

                console.log(applyUrl);
                //window.open(applyUrl);
            } else {
                var applyCallback = function(selectedLocation) {
                    $('#locationModal').modal({
                        show: true,
                        backdrop: 'static'
                    });

                    window.parent.scrollTo(0,0);

                    if (!Ember.isNone(selectedLocation)) {
                        self.set('selectedLocation', selectedLocation.Id);
                    }

                    $('#modalOk').click(function() {
                        $('#modalOk').unbind('click');

                        var applyObj = {
                            requisitionId: self.get('jobPosting').Requisition__c,
                            jobPostingId: self.get('jobPosting').Id,
                            location: self.get('selectedLocation')
                        };

                        if (self.get('selectedLocation') === 'Remote') {
                            applyObj.location = self.get('locations').findBy('Primary__c', true).Id,
                            applyObj.prefersRemote = true;    
                        }

                        var applyUrl = '/' + parent.urlPrefix.split('/')[1] + '/apply?reqId=' + applyObj.requisitionId + '&jobPostingId=' + applyObj.jobPostingId + '&location=' + applyObj.location;

                        if (applyObj.prefersRemote === true) {
                            applyUrl += '&prefersRemote=true';
                        }
                        console.log(applyUrl);
                        window.parent.location.href = applyUrl;
                    });
                };

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {

                        if (Ember.isNone(position)) {
                            var primaryLocation = self.get('locations').findBy('Primary__c', true);

                            applyCallback(primaryLocation);
                        } else {
                            var userGeo = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            };

                            var closestLocation;

                            self.get('locations').forEach(function(l) {

                                if (l.Id !== 'Remote') {
                                    var locationGeo = {
                                        latitude: l.Location__r.Geographical_Location__Latitude__s,
                                        longitude: l.Location__r.Geographical_Location__Longitude__s
                                    };

                                    var distance = getGeolocationDistance(userGeo, locationGeo);

                                    if (Ember.isNone(closestLocation) || distance < closestLocation.distance) {
                                        closestLocation = l;
                                        closestLocation.distance = distance;
                                    }
                                }
                                
                            });

                            var locationString = closestLocation.formattedLocationString;

                            if (locationString.indexOf('(Primary)') !== -1) {
                                locationString = locationString.split('(Primary)')[0] + '(Primary, Closest)';
                            } else {
                                locationString += ' (Closest)';
                            }

                            closestLocation.set('formattedLocationString', locationString);
                            console.log(closestLocation);

                            applyCallback(closestLocation);
                            // find closest location.
                        }
                        
                    }, function(error) {
                        var primaryLocation = self.get('locations').findBy('Primary__c', true);

                        applyCallback(primaryLocation);
                    });;
                } else {
                    var primaryLocation = self.get('locations').findBy('Primary__c', true);

                    applyCallback(primaryLocation);
                }
            }
        },
        clickApplyWithLinkedIn: function() {
            var self = this;

            $('#locationModal').modal({
                show: true,
                backdrop: 'static'
            });

            window.parent.scrollTo(0,0);

            $('#modalOk').click(function() {
                $('#modalOk').unbind('click');

                /*if (!Ember.isNone(self.get('linkedInMap'))) {
                    var saveObj = createSaveObj(self.get('jobPosting'), self.get('loggedInUser'), self.get('linkedInMap'));
                    
                    cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {
                        if (res) {
                            var parsedResult = parseResult(res);

                            if (!Ember.isEmpty(parsedResult.errorMessages)) {
                                // error handling
                            } else {
                                //console.log(parsedResult);

                                self.set('application', parsedResult.data.application);
                                self.set('justApplied', true);
                                window.parent.scrollTo(0,0)
                            }
                        } else {
                            // error handling
                        }
                    });
                } else {
                    window.parent.location.href = self.get('applyWithLinkedInUrl');
                }      */      
            });
        },
        clickTweet: function() {
            var currentUrl = window.parent.location.href;
            var tweetString = 'Check out this #dreamjob at #Salesforce ' + currentUrl;
            var width = 626;
            var height = 436;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetString),
                        'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes'
                );
        },
        clickLinkedIn: function (){
            var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Home';
            var title = 'Title';
            var source = 'https://www.appiphony.com'; // This does not show up anywhere except on url
            var summary = 'Summary';
            var docTitle = document.title; // This is the document where the Share Button is
            var width = 626;
            var height = 436;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('http://www.linkedin.com/shareArticle?mini=true&url='+ 
                        encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + 
                        '&source=' + encodeURIComponent(source) + '&summary=' + encodeURIComponent(summary) + '&t=' + encodeURIComponent(docTitle),
                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');

            return false;
        },
        clickFacebook: function (){
            var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Home';
            var docTitle = document.title; // This is the document where the Share Button is
            var width = 626;
            var height = 436;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('http://www.facebook.com/sharer.php?u='+ 
                        encodeURIComponent(url)+ '&t=' + encodeURIComponent(docTitle),
                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');

            return false;
        },

        saveJob: function (){
            // Check if user is loged in
            var self = this;

            if (this.get('loggedInUser').UserType !== 'Guest') {
                if(self.get('isJobSaved')){
                    self.set('isJobSaved', false);
                } else {
                    self.set('isJobSaved', true);
                }

                var jobPosting = self.get('jobPosting');
                var linkedInMap = this.get('linkedInMap');

                //console.log('JOB POSTING: ')
                //console.log(jobPosting);

                var jsonString = {
                    Job_Posting__c: jobPosting.Id,
                    isJobSaved: self.get('isJobSaved'),
                    Name: jobPosting.Name,
                    Candidate__c: self.get('loggedInUser').Id,
                    Expressed_By__c: 'Candidate', // Picklist
                    Orig_Requisition__c: jobPosting.Requisition__c,
                    Position__c: jobPosting.Requisition__r.Position__c
                };

                if (!Ember.isNone(linkedInMap)) {
                    if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {
                        var educationHistories = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
                        var flattenedEducationHistory = '';

                        educationHistories.forEach(function(eh) {
                            // add education history to flattened string
                            flattenedEducationHistory += eh.Name__c + '\n'
                                        + eh.Education_Level__c;

                            if (!Ember.isNone(eh.Status__c)) {
                                flattenedEducationHistory += ' (' + eh.Status__c + ')';
                            } 
                            
                            flattenedEducationHistory += '\n' 
                                                      + eh.Start_Year__c
                                                      + ' - ' + eh.End_Year__c
                                                      + '\n\n';
                        });

                        jsonString.Education_History__c = flattenedEducationHistory;
                    }

                    if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {
                        var employmentHistories = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
                        var flattenedEmploymentHistory = '';

                        employmentHistories.forEach(function(eh) {
                            // add employment history to flattened string
                            flattenedEmploymentHistory += eh.Name + '\n'
                                        + eh.Job_Title__c + '\n';

                            if (!Ember.isNone(eh.Start_Month__c)){
                                flattenedEmploymentHistory += numberToMonthMap[eh.Start_Month__c] + ' ';
                            }

                            flattenedEmploymentHistory += eh.Start_Year__c + ' - ';

                            if (eh.Is_Current__c == true) {
                                flattenedEmploymentHistory += 'present';
                            } else if (!Ember.isNone(eh.End_Month__c)) {
                                flattenedEmploymentHistory += numberToMonthMap[eh.End_Month__c] + ' ';
                            }

                            if (!Ember.isNone(eh.End_Year__c)) {
                                flattenedEmploymentHistory += eh.End_Year__c;
                            }

                            flattenedEmploymentHistory += '\n\n';
                        });
                        jsonString.Employment_History__c = flattenedEmploymentHistory;
                    }

                    if (!Ember.isNone(linkedInMap.skills && !Ember.isEmpty(linkedInMap.skills.values))) {
                        var skillsArray = [];
                        linkedInMap.skills.values.forEach(function(skill) {
                            skillsArray.addObject(skill.skill.name);
                        });
                        jsonString.Skills__c = skillsArray.join(', ');
                    }
                }

                cont.saveJob(JSON.stringify(jsonString), function(results, responseObj){
                    if (results) {
                        var parsedResult = parseResult(results);
                        console.log('RESULTS 2: ');
                        console.log(parsedResult.data.savedJobs);

                        var savedJobs = [];

                        if (!Ember.isEmpty(parsedResult.data.savedJobs)){
                            parsedResult.data.savedJobs.forEach(function(savedJob) {
                                var firstLocationString = '';
                                var otherLocationsString;
                                var otherLocationsCount = 0;

                                var obj = createLocationStrings(savedJob.locations);

                                var jobObj = {
                                    jobTitle: savedJob.Name,
                                    firstLocationString: obj.firstLocationString,
                                    otherLocationsString: obj.otherLocationsString,
                                    otherLocationsCount: obj.otherLocationsCount,
                                    jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + savedJob.Job_Posting__c
                                };

                                savedJobs.addObject(jobObj); 
                            });
                        }    

                        self.set('savedJobs', savedJobs);


                    } else {
                            // error handling
                    }
                });
            } else {
                var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Login?startURL=' +
                            parent.urlPrefix + '/JobPosting?id%3D' + self.get('jobPosting').Id + '%26saveJob%3Dtrue';
                window.parent.location.href = url;
            };


            
        },

        // changeButton: function(){
        //     if(this.get('isJobSaved')){
        //         this.set('isJobSaved', false);
        //     } else {
        //         this.set('isJobSaved', true);
        //     }

        // },


        // clickTry: function (){
        //     FB.ui({
        //       method: 'share_open_graph',
        //       action_type: 'og.likes',
        //       action_properties: JSON.stringify({
        //           object:'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s',
        //       })
        //     }, function(response){});
        // },


        clickTry: function (){
            FB.ui({
                method: 'feed',
                name: 'Facebook Dialogs',
                link: '',
                picture: 'http://fbrell.com/f8.jpg',
                caption: 'Reference Documentation',
                description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',
                
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object:'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s',
              })
            }, function(response){});
        },





    }
});

// Routes
App.JobPostingRoute = Ember.Route.extend( {
    model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var applications = [];

            if (!Ember.isEmpty(jobPostingMap.applications)) {
                jobPostingMap.applications.forEach(function(app) {
                    var firstLocationString = '';
                    var otherLocationsString;
                    var otherLocationsCount = 0;

                    var obj = createLocationStrings(app.locations);

                    var applicationObj = {
                        jobTitle: app.Job_Posting__r.Name,
                        firstLocationString: obj.firstLocationString,
                        otherLocationsString: obj.otherLocationsString,
                        otherLocationsCount: obj.otherLocationsCount,
                        jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + app.Job_Posting__c,
                        isApplication: true,
                        hasJobOffer: !Ember.isEmpty(app.Job_Offers__r),
                        jobOfferStatus: !Ember.isEmpty(app.Job_Offers__r) ? app.Job_Offers__r.records[0].Status__c : null,
                        statusText: app.Status__c === 'Completed' ? 'Applied' : 'In Progress',
                        isRemoteAvailable: app.Requisition__r.Allow_Remote_Employees__c
                    };

                    if (!Ember.isEmpty(app.Job_Offers__r)) {
                        if (['Accepted', 'Extended'].indexOf(app.Job_Offers__r.records[0].Status__c) !== -1) {
                            applicationObj.jobLabelClass = 'label--success';
                        } else {
                            applicationObj.jobLabelClass = 'label--secondary';
                        }
                    } else {
                        if (app.Status__c === 'In Progress') {
                            applicationObj.jobLabelClass = 'label--warning';
                        } else {
                            applicationObj.jobLabelClass = 'label--secondary';
                        }
                    }

                    applications.addObject(applicationObj);
                });
            }

            jobPostingMap.applications = applications;

            jobPostingMap.isRemoteAvailable = jobPostingMap.jobPosting.Requisition__r.Allow_Remote_Employees__c;

            if (!Ember.isEmpty(jobPostingMap.jpLocations)) {
                var parsedLocations = parsePostingLocations(jobPostingMap.jpLocations, jobPostingMap.isRemoteAvailable);
                jobPostingMap.locationString = parsedLocations.locationsString;
                jobPostingMap.locations = parsedLocations.locationObjs;
            }

            // saved jobs
            var savedJobs = [];
            if (!Ember.isEmpty(jobPostingMap.savedJobs)) {                
                jobPostingMap.savedJobs.forEach(function(savedJob) {
                    if (Ember.isNone(savedJob.Application__r) || 
                            (!Ember.isNone(savedJob.Application__r) && savedJob.Application__r.Job_Posting__c !== savedJob.Job_Posting__c)) {


                        var firstLocationString = '';
                        var otherLocationsString;
                        var otherLocationsCount = 0;

                        var obj = createLocationStrings(savedJob.locations);

                        var jobObj = {
                            jobTitle: savedJob.Name,
                            firstLocationString: obj.firstLocationString,
                            otherLocationsString: obj.otherLocationsString,
                            otherLocationsCount: obj.otherLocationsCount,
                            jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + savedJob.Job_Posting__c,
                            isSavedJob: true
                        };

                        savedJobs.addObject(jobObj); 
                    }
                });
            }
            jobPostingMap.savedJobs = savedJobs;

            jobPostingMap.jpFields.forEach(function(f) {
                f.value = jobPostingMap.jobPosting[f.name];
            });

            if (parent.applyWithLinkedIn === true && !Ember.isNone(jobPostingMap.linkedInMap) 
                        && Ember.isNone(jobPostingMap.application)) {
                var saveObj = createSaveObj(jobPostingMap.jobPosting, jobPostingMap.loggedInUser, jobPostingMap.linkedInMap);


                cont.applyToJob(JSON.stringify(saveObj), function(res, evt) {
                    if (res) {
                        var parsedResult = parseResult(res);

                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            // error handling
                        } else {
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
    },
    setupController: function(controller, model) {
        controller.set('model', model);

        if (parent.saveJob === true && Ember.isNone(model.savedJob)) {
            controller.send('saveJob');
        }
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