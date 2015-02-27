// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});


function createLocationStrings(locations){

    var firstLocationString = '';
    var otherLocationsString;
    var otherLocationsCount = 0;

    locations.forEach(function(l, i) {
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
};



var updateHeight = function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        parent.resizeIframe();
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
    },
    keyPress: function(e) {
        if (e.keyCode === 13) {
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
    allMyJobs: function(){
        var applications = this.get('applications');
        var savedJobs = this.get('savedJobs');

        console.log('APPLICATIONS');
        console.log(applications);
        console.log('SAVE JOBS');
        console.log(savedJobs); 

        var allMyJobsArray = applications.concat(savedJobs);

        console.log('ALL MY JOBS'); 
        console.log(allMyJobsArray)

        return allMyJobsArray;
    }.property('applications', 'savedJobs'),

    init: function() {
        this._super();

        var searchTerm
            , nearValue;

        if (!Ember.isEmpty(parent.searchTerm)) {
            searchTerm = decodeURI(parent.searchTerm);
            this.set('searchTerm', searchTerm);
        }

        if (!Ember.isEmpty(parent.nearValue)) {
            nearValue = decodeURI(parent.nearValue);
            this.set('selectedLocation', 'Near...');
            this.set('nearValue', nearValue);
        } else {
            this.set('nearValue', 'San Francisco');
            this.set('selectedLocation', 'Near...');
        }

        Ember.run.later(this, function() {
            this.search(false);
        }, 1000);
    },
    searchTerm: null,
    selectedLocation: null,
    selectedJobFamily: null,
    nearValue: null,
    selectedRadius: null,
    selectedUnit: null,
    numberOfJobs: function() {
        var searchResults = this.get('searchResults');

        return !Ember.isEmpty(searchResults) ? searchResults.length : 0;
    }.property('searchResults'),
    isAllLocations: Ember.computed.equal('selectedLocation', 'All locations'),
    isNear: Ember.computed.equal('selectedLocation', 'Near...'),
    isNearMe: Ember.computed.equal('selectedLocation', 'Near me'),
    isRemote: Ember.computed.equal('selectedLocation', 'Remote/Telecommute'),
    actions: {
        clickSearch: function() {
            this.search(true);
        }
    },
    findLocation: function(callback, searchTerm){
        var self = this;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=' + self.get('apiKey')
        }).done(callback)
    },
    search: function(showResultsCount) {
        this.set('isSearching', true);

        var self = this;

        var searchObj = this.getProperties('searchTerm', 'selectedLocation', 'selectedJobFamily', 
                                            'nearValue', 'selectedRadius', 'selectedUnit');

        var callback = function(res, evt) {
            self.set('isSearching', false);
            if (res) {
                var parsedResult = parseResult(res);

                var jobPostings = parsedResult.data.jobPostings;

                jobPostings.forEach(function(jp) {
                    // Build location string
                    if (!Ember.isEmpty(jp.locations)) {
                        var firstLocationString = '';
                        var otherLocationsString;
                        var otherLocationsCount = 0;
                        jp.locations.forEach(function(l, i) {
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

                        jp.firstLocationString = firstLocationString;
                        jp.otherLocationsString = otherLocationsString;
                        jp.otherLocationsCount = otherLocationsCount;
                    }
                    
                    // Build display
                    jp.fieldsToDisplay = [];
                    self.get('jobPostingFieldsToDisplay').forEach(function(field) {
                        jp.fieldsToDisplay.addObject({
                            label: field.label,
                            value: field.type === 'DATE' ? moment(jp[field.name]).format('MMM D, YYYY') : jp[field.name]
                        });
                    });
                });
                
                self.set('showResultsCount', showResultsCount);

                self.set('searchResults', jobPostings);
                console.log('JOB POSTINGS');
                console.log(jobPostings);
            } else {

            }
        };

        if (searchObj.selectedLocation === 'Near me') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    searchObj.latitude = position.coords.latitude;
                    searchObj.longitude = position.coords.longitude;

                    console.log(searchObj);
                    cont.searchJobs(JSON.stringify(searchObj), callback);
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        } else if (searchObj.selectedLocation === 'Near...') {
            var googleCallback = function(results) {
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

    isJobSaved: function(){
        var jobPostingId = this.get('Id');
        var savedJobs = this.get('savedJobs');
        // var applications = this.get('applications');
        // var allMyJobs = this.get('allMyJobs');

        var savedJobsIds = [];
        if (savedJobs) {
            savedJobsIds = savedJobs.getEach('jobPostingId');
        };

        return savedJobsIds.indexOf(jobPostingId) != -1 ? true : false;
    }.property('Id', 'savedJobs'),

    isJobApplied: function(){
        var jobPostingId = this.get('Id');
        var applications = this.get('applications');

        var appliedJobsIds = [];
        if (applications) {
            appliedJobsIds = applications.getEach('jobPostingId');
        };

        return appliedJobsIds.indexOf(jobPostingId) != -1 ? true : false;
    }.property('Id', 'applications'),

    jobPostingUrl: function() {
        return parent.urlPrefix + '/JobPosting?id=' + this.get('Id');
    }.property('Id'),

    actions: {
        clickApply: function() {
            window.parent.location.href = this.get('jobPostingUrl');
            console.log(this.get('Id'));
        },



        trying: function(){
            console.log('SAVEEEEEEEEEEEEEEE')
            var self = this;
            $('#pleaseLoginModal').modal({
                show: true,
                backdrop: 'static'
            });

            window.parent.scrollTo(0,0);

            $('#modalOk').click(function() {
                var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Login/';
                window.parent.location.replace(url);
                $('#modalOk').unbind('click');
            });
        },


        saveJob: function(jobPosting){
            var self = this;
            if (this.get('loggedInUser')) {
                if(!self.get('isJobSaved')){
                    self.set('isJobSaved', true);

                    var jsonString = {
                        jobPostingId: jobPosting.Id,
                        isJobSaved: self.get('isJobSaved'),
                        jobName: jobPosting.Name,
                        candidateId: self.get('loggedInUser').Id,
                        expressedBy: 'Candidate', // Picklist
                        origReqId: jobPosting.Requisition__c,
                        positionId: jobPosting.Requisition__r.Position__c,
                    };
                    console.log('JSON STRING');
                    console.log(jsonString);

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
                                        // jobPostingId: savedJob.Job_Posting__c,
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
                }
            } else {
                console.log('NOT LOGED IN')
                var self = this;
                $('#pleaseLoginModal').modal({
                    show: true,
                    backdrop: 'static'
                });

                window.parent.scrollTo(0,0);

                $('#modalOk').click(function() {
                    var url = 'https://victortestcommunity3-developer-edition.na16.force.com/dreamjob/s/Login/';
                    window.parent.location.replace(url);
                    $('#modalOk').unbind('click');
                });
            };      
        },
    }
});

// Routes
App.JobSearchRoute = Ember.Route.extend( {
    model: function(params) {
        console.log('JOB SEARCH MAP');
        console.log(parsedJobSearchMap);
        var jobFamilies = ['All categories'];

        if (!Ember.isEmpty(parsedJobSearchMap.jobFamilies)) {
            jobFamilies.addObjects(parsedJobSearchMap.jobFamilies.getEach('value'));
        }

        var applications = [];

        if (!Ember.isEmpty(parsedJobSearchMap.applications)) {
            parsedJobSearchMap.applications.forEach(function(app) {
                var firstLocationString = '';
                var otherLocationsString;
                var otherLocationsCount = 0;

                app.locations.forEach(function(l, i) {
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

                var applicationObj = { 
                    jobPostingId: app.Job_Posting__c,
                    jobTitle: !Ember.isNone(app.Job_Posting__r) ? app.Job_Posting__r.Name : null,
                    firstLocationString: firstLocationString,
                    otherLocationsString: otherLocationsString,
                    otherLocationsCount: otherLocationsCount,
                    jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + app.Job_Posting__c
                };

                applications.addObject(applicationObj);
            });
        }

        // saved jobs
        var savedJobs = [];
        if (!Ember.isEmpty(parsedJobSearchMap.savedJobs)) {              
            parsedJobSearchMap.savedJobs.forEach(function(savedJob) {
                var firstLocationString = '';
                var otherLocationsString;
                var otherLocationsCount = 0;

                var obj = createLocationStrings(savedJob.locations);

                var jobObj = {
                    jobPostingId: savedJob.Job_Posting__c,
                    jobTitle: savedJob.Name,
                    firstLocationString: obj.firstLocationString,
                    otherLocationsString: obj.otherLocationsString,
                    otherLocationsCount: obj.otherLocationsCount,
                    jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + savedJob.Job_Posting__c
                };

                savedJobs.addObject(jobObj); 
            });
        }

        return {
            radiusOptions: ['5', '10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: ['All locations', 'Near...', 'Near me', 'Remote/Telecommute'],
            jobFamilies: jobFamilies,
            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,
            applications: applications,
            apiKey: parsedJobSearchMap.apiKey,
            loggedInUser: parsedJobSearchMap.loggedInUser,
            jobPostings: parsedJobSearchMap.jobPostings,
            savedJobs: savedJobs
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