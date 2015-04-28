// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

function processJobPostings(jobPostings, jobPostingFieldsToDisplay){
    jobPostings.forEach(function(jp, index) {
        // Build location string
        if (!Ember.isEmpty(jp.locations)) {
            jp = $.extend(jp, createLocationStrings(jp.locations));
        }

        jp.allowRemote = jp.Requisition__r.Allow_Remote_Employees__c;
        
        // Build display
        jp.fieldsToDisplay = [];
        if (jobPostingFieldsToDisplay) {
            jobPostingFieldsToDisplay.forEach(function(field) {
                jp.fieldsToDisplay.addObject({
                    label: field.label,
                    value: field.type === 'DATE' || field.type === 'DATETIME' ? moment(jp[field.name]).format('MMM D, YYYY') : jp[field.name]
                });
            });
        };
    });

    return jobPostings;
}

function createLocationStrings(locations){

    var firstLocationString = '';
    var otherLocationsString;
    var otherLocationsCount = 0;

    locations.forEach(function(location, i) {
        location = location.Location__r;

        var locationString = '';

        locationString = location.City__c + ', ' + location.Standardized_State_Province__c;

        if (!Ember.isEmpty(location.Standardized_Country_Region__c) && location.Standardized_Country_Region__c !== 'US') {
            locationString += ', ' + location.Standardized_Country_Region__c;
        }

        if (i === 0) {
            firstLocationString = locationString;
        } else if (i === 1) {
            otherLocationsCount++;
            otherLocationsString = locationString;
        } else {
            otherLocationsCount++;
            otherLocationsString += ' | ' + locationString;
        }
    });
 
    var obj = {
        firstLocationString: firstLocationString,
        otherLocationsString: otherLocationsString,
        otherLocationsCount: otherLocationsCount
    };

    return obj;
};


// Flatten linkedIn Data
var degreePicklistValues = [];

if (!Ember.isEmpty(parsedJobSearchMap.degreeFields)) {
    degreePicklistValues = parsedJobSearchMap.degreeFields.getEach('value');
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

var updateHeight = function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        if(parent.resizeIframe){
            parent.resizeIframe();
        }
    });
};

var globalThis = this;

Ember.View.reopen({
    willInsertElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    },
    willDestroyElement: function() {
        Ember.run.debounce(globalThis, updateHeight, 100);
    }
});


// Helper to show otheR when there is one location or otherS when there are multiple locations
Ember.Handlebars.helper('locationsCount', function(counter) {
    if (parseInt(counter) == 1) {
        return 'other';
    } else {
        return 'others';
    }
});


App.PleaseLoginModalView = Ember.View.extend({
    templateName: 'pleaseLoginModal',
    didInsertElement: function() {    
    }
});


App.JobSearchView = Ember.View.extend({
    didInsertElement: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        if (parent && parent.toggleFooter) {
            parent.toggleFooter();
        }
    },
    keyPress: function(e) {
        if (e.keyCode === 13 && $('#search').attr('disabled') != 'disabled') {
            this.get('controller').send('clickSearch');
        }
    }
});


App.SalesforceTwitterComponent = Ember.Component.extend({
    layoutName: 'components/twitter',
    didInsertElement: function() {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        Ember.run.later(this, updateHeight, 1000);
    }
});


App.JobSearchController = Ember.ObjectController.extend({
    theLinkedInMap: function(){
        return this.get('linkedInMap');
    }.property(),
    init: function() {
        this._super();

        if (!Ember.isEmpty(searchTerm) || !Ember.isEmpty(nearValue)) {
            Ember.run.later(this, function() {
                if (!this.get('isDestroyed') && !this.get('isDestroying')) { //For unit test

                    this.setProperties({
                        currentSearchTerm : this.get('searchTerm'),
                        currentLocation : this.get('selectedLocation'),
                        currentCategory : this.get('selectedJobFamily'),
                        currentNearValue : this.get('nearValue'),
                        currentRadius : this.get('selectedRadius'),
                        currentUnit : this.get('selectedUnit'),
                        currentOffSet : 0
                    });

                    this.search(false);
                }
            }, 1000);
        }
    },
    currentOffSet : 0,
    offsetStep : 10,
    selectedJobFamily: null,
    selectedRadius: null,
    selectedUnit: null,
    searchDisabled : false,
    showWarning: false,
    jobsText : function(){
        return this.get('searchResults').length == 1 ? 'job' : 'jobs'
    }.property(''),
    changedLocation : function(){
        this.set('searchDisabled', false);
    }.observes('selectedLocation'),
    disableSearch : function(){
        return this.get('searchDisabled') ? 'disabled' : false;
    }.property('searchDisabled'),
    disableSearchOnNear : function(){
        Ember.run.debounce(this, this.disableSearchOnNearCallback, 100);
    }.observes('selectedLocation', 'nearValue'),
    disableSearchOnNearCallback : function(){
        if(this.get('selectedLocation') == labels.near && Ember.isEmpty(this.get('nearValue'))){
            this.set('searchDisabled', true);
        } else {
            this.set('searchDisabled', false);
        }
    },
    showEmptyState : function(){
        return Ember.isEmpty(this.get('searchResults')) && !this.get('isSearching') && !this.get('showWarning')
    }.property('isSearching', 'searchResults'),
    showLoadMore : function(){
        if(Ember.isEmpty(this.get('queryJobPostings'))){
            return false;
        }

        return (!this.get('showEmptyState') && this.get('queryJobPostings') > this.get('offsetStep'))
    }.property('queryJobPostings', 'showEmptyState'),
    numberOfJobs: function() {
        var searchResults = this.get('searchResults');

        return !Ember.isEmpty(searchResults) ? searchResults.length : 0;
    }.property('searchResults'),
    isAllLocations: Ember.computed.equal('selectedLocation', 'All locations'),
    isNear: Ember.computed.equal('selectedLocation', labels.near),
    isNearMe: Ember.computed.equal('selectedLocation', labels.nearMe),
    isRemote: Ember.computed.equal('selectedLocation', labels.remote),
    actions: {
        loadMore : function(){
            this.set('currentOffSet', this.get('currentOffSet') + this.get('offsetStep'));
            this.search(true);
        },
        clickSearch: function() {
            this.setProperties({
                searchResults : [],
                currentSearchTerm : this.get('searchTerm'),
                currentLocation : this.get('selectedLocation'),
                currentCategory : this.get('selectedJobFamily'),
                currentNearValue : this.get('nearValue'),
                currentRadius : this.get('selectedRadius'),
                currentUnit : this.get('selectedUnit'),
                currentOffSet : 0
            });
            this.search(true);
        }
    },
    findLocation: function(callback, searchTerm){
        var self = this;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=' + self.get('apiKey').Field1__c
        }).done(callback)
    },
    search: function(showResultsCount) {
        var self = this;
        self.set('isSearching', true);
        self.set('queryJobPostings', 0);
        self.set('showWarning', false);

        var searchObj = self.getProperties('currentSearchTerm', 'currentLocation', 'currentCategory', 
                                            'currentNearValue', 'currentRadius', 'currentUnit', 'currentOffSet');

        var callback = function(res, evt) {
            self.set('isSearching', false);
            if (res) {
                var parsedResult = parseResult(res);
                var jobPostings = parsedResult.data.jobPostings;
                var searchResults = self.get('searchResults');

                processJobPostings(jobPostings, self.get('jobPostingFieldsToDisplay'));
                //we will return up to 11 job postings to determine if we need to load more or not. So we only want the first 10.
                self.set('searchResults', searchResults.concat(jobPostings.slice(0,10)));
                self.set('queryJobPostings', jobPostings.length);  //used to determine if we need to display loadmore
            }
        };

        if (searchObj.currentLocation === labels.nearMe) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    searchObj.latitude = position.coords.latitude;
                    searchObj.longitude = position.coords.longitude;

                    cont.searchJobs(JSON.stringify(searchObj), callback);
                }, function(err){
                    self.set('isSearching', false);
                    self.set('selectedLocation', labels.near);
                    self.set('showWarning', true);
                    self.get('locations').removeObject(labels.nearMe);
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        } else if (searchObj.currentLocation === labels.near) {
            var googleCallback = function(results) {
                if(results.status == 'ZERO_RESULTS'){
                    self.set('isSearching', false);
                    self.set('searchResults', []);
                    self.set('queryJobPostings', 0);
                    return;
                }

                var location = results.results[0];

                searchObj.latitude = location.geometry.location.lat
                searchObj.longitude = location.geometry.location.lng;

                cont.searchJobs(JSON.stringify(searchObj), callback);
            };

            this.findLocation(googleCallback, this.get('nearValue'));
        } else {
            cont.searchJobs(JSON.stringify(searchObj), callback);
        }
    }
});



App.JobPostingController = Ember.ObjectController.extend({
    needs: ['jobSearch'],
    loggedInUserBinding: 'controllers.jobSearch.loggedInUser',
    applicationsBinding: 'controllers.jobSearch.applications',
    savedJobsBinding: 'controllers.jobSearch.savedJobs',
    allMyJobsBinding: 'controllers.jobSearch.allMyJobs',
    theLinkedInMapBinding: 'controllers.jobSearch.theLinkedInMap',
    othersText : function(){
        return this.get('locations').length == 2 ? 'other' : 'others'
    }.property(''),
    isJobSaved: function(){
        var jobPostingId = this.get('Id');
        var savedJobs = this.get('savedJobs');

        var savedJobsIds = [];
        if (savedJobs) {
            savedJobsIds = savedJobs.getEach('jobPostingId');
        };

        return savedJobsIds.indexOf(jobPostingId) != -1 ? true : false;
    }.property('Id', 'savedJobs'),

    isJobAppliedCompleted: function(){
        //var jobPostingId = this.get('Id');
        var applications = this.get('applications');

        return applications.filterBy('jobPostingId', this.get('Id')).isAny('statusText', 'Applied');
    }.property('Id', 'applications'),

    isJobAppliedInProgress: function(){
        var applications = this.get('applications');

        return applications.filterBy('jobPostingId', this.get('Id')).isAny('statusText', 'In Progress');
    }.property('Id', 'applications'),

    jobPostingUrl: function() {
        return parent.urlPrefix + '/JobListing?id=' + this.get('Id');
    }.property('Id'),

    disableSaveButton: function(){
        return this.get('disableSave') ? true : false
    }.property('disableSave'),

    actions: {
        jobPostingDrillIn: function() {
            window.parent.location.href = this.get('jobPostingUrl');
            
            // reload the page on jobTitle click and then drill in to that job posting
            // location.reload(); 
        },

        finishApplication: function(){
            var applicationId = this.get('applications').filterBy('jobPostingId', this.get('Id'))[0].id;
            var url = parent.urlPrefix + '/Apply?id=' + applicationId;
            window.parent.location.href = url;
        },

        saveJob: function(){
            var self = this;
            self.set('disableSave', true);

            if (this.get('loggedInUser').UserType !== 'Guest') {
                if(!self.get('isJobSaved')){

                    var jobPosting = this.get('content');
                    var linkedInMap = this.get('theLinkedInMap');

                    var jsonString = {
                        Application__c: '',
                        Job_Posting__c: jobPosting.Id,
                        Name: jobPosting.Job_Title__c,
                        Candidate_User__c: self.get('loggedInUser').Id,
                        Expressed_By__c: 'Candidate', // Picklist
                        Source_Requisition__c: jobPosting.Requisition__c,
                        Position__c: jobPosting.Requisition__r.Position__c,
                        Education_History__c: '',
                        Employment_History__c: '',
                        Skills__c: '',
                        locations: jobPosting.locations,
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

                            //if(parsedResult.isSuccess){
                            if (parsedResult.data.newJobId) {
                                self.set('isJobSaved', true);

                                var obj = createLocationStrings(jsonString.locations);
                                var newJob = {
                                    jobTitle: jsonString.Name,
                                    firstLocationString: obj.firstLocationString,
                                    otherLocationsString: obj.otherLocationsString,
                                    otherLocationsCount: obj.otherLocationsCount,
                                    jobPostingUrl: parent.urlPrefix + '/JobListing?id=' + jsonString.Job_Posting__c,
                                    isRemoteAvailable: jobPosting.Requisition__r.Allow_Remote_Employees__c,
                                    jobPostingId: jsonString.Job_Posting__c
                                };

                                var savedJobs = self.get('savedJobs');
                                savedJobs.addObject(newJob);

                                var allMyJobs = self.get('allMyJobs');
                                allMyJobs.insertAt(0, newJob);
                            };

                        } else {
                            self.set('errorMsg', parsedResults.errorMessages);
                            self.set('disableSave', false);
                        }
                    });
                }
            } else {
                var self = this;
                self.set('disableSave', false);

                $('#pleaseLoginModal').modal({ 
                    show: true,
                });

                $('#modalOk').click(function() {
                    var url = parent.urlPrefix + '/Login/';
                    window.parent.location.href = url;
                    $('#modalOk').unbind('click');
                });
            };
        },
    }
});

// Routes
App.JobSearchRoute = Ember.Route.extend( {
    model: function(params) {
        var categories = Ember.A();

        if (!Ember.isEmpty(parsedJobSearchMap.categories)) {
            categories.addObjects(parsedJobSearchMap.categories.getEach('value'));
        }
        categories = categories.sort();
        categories.unshift('All Categories');
        var applications = [];

        if (!Ember.isEmpty(parsedJobSearchMap.applications)) {
            parsedJobSearchMap.applications.forEach(function(app) {
                var obj = createLocationStrings(app.locations);

                var applicationObj = { 
                    id: app.Id,
                    jobPostingId: app.Job_Posting__c,
                    jobTitle: !Ember.isNone(app.Job_Posting__r) ? app.Job_Posting__r.Job_Title__c : null,
                    firstLocationString: obj.firstLocationString,
                    otherLocationsString: obj.otherLocationsString,
                    otherLocationsCount: obj.otherLocationsCount,
                    jobPostingUrl: parent.urlPrefix + '/JobListing?id=' + app.Job_Posting__c,
                    isApplication: true,
                    hasJobOffer: !Ember.isEmpty(app.Job_Offers__r),
                    jobOfferStatus: !Ember.isEmpty(app.Job_Offers__r) ? app.Job_Offers__r.records[0].Status__c : null,
                    statusText: app.Status__c === 'Completed' ? 'Applied' : 'In Progress',
                    isRemoteAvailable: app.Requisition__r.Allow_Remote_Employees__c,
                    createdDate: app.CreatedDate
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

        // saved jobs
        var savedJobs = [];
        if (!Ember.isEmpty(parsedJobSearchMap.savedJobs)) {              
            parsedJobSearchMap.savedJobs.forEach(function(savedJob) {
                var obj = createLocationStrings(savedJob.locations);

                var jobObj = {
                    jobPostingId: savedJob.Job_Posting__c,
                    jobTitle: savedJob.Name,
                    firstLocationString: obj.firstLocationString,
                    otherLocationsString: obj.otherLocationsString,
                    otherLocationsCount: obj.otherLocationsCount,
                    jobPostingUrl: parent.urlPrefix + '/JobListing?id=' + savedJob.Job_Posting__c,
                    isRemoteAvailable: savedJob.Source_Requisition__r.Allow_Remote_Employees__c,
                    createdDate: savedJob.CreatedDate
                };

                savedJobs.addObject(jobObj); 
            });
        }

        var allMyJobsArray = applications.concat(savedJobs).sortBy('createdDate').reverse();


        var locations = [labels.allLocations, labels.near, labels.nearMe];
        if (parsedJobSearchMap.hasRemote) {
            locations.push(labels.remote);
        }
        var searchResults = [];

        if(Ember.isEmpty(searchTerm) && Ember.isEmpty(nearValue)){
            searchResults = processJobPostings(parsedJobSearchMap.recentPosts, parsedJobSearchMap.jobPostingFieldsToDisplay)
        }

        return {
            searchResults : searchResults,
            radiusOptions: ['5', '10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: locations,
            categories: categories,
            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,
            applications: applications,
            apiKey: parsedJobSearchMap.apiKey,
            loggedInUser: parsedJobSearchMap.loggedInUser,
            jobPostings: parsedJobSearchMap.jobPostings,
            savedJobs: savedJobs,
            searchTerm : Ember.isEmpty(searchTerm) ? null : searchTerm,
            selectedLocation : Ember.isEmpty(nearValue) ? null : labels.near,
            nearValue : Ember.isEmpty(nearValue) ? null : nearValue,
            isSearching : !Ember.isEmpty(searchTerm) || !Ember.isEmpty(nearValue),
            linkedInMap: parsedJobSearchMap.linkedInMap,
            linkedInSsoUrl: parsedJobSearchMap.linkedInSsoUrl,
            allMyJobs: allMyJobsArray
        };
    }
});

// Router
App.Router.map(function() {
    this.resource('jobSearch', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});