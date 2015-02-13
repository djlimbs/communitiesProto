// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

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
        }

        Ember.run.later(this, function() {
            this.send('clickSearch');
        }, 1000);
    },
    searchTerm: null,
    selectedLocation: null,
    selectedJobFamily: null,
    nearValue: null,
    selectedRadius: null,
    selectedUnit: null,
    areSearchTermsEmpty: function() {
        return Ember.isEmpty(this.get('searchTerm')) 
                    && this.get('selectedLocation') === 'All locations'
                    && this.get('selectedJobFamily') === 'All categories';
    }.property('searchTerm', 'selectedLocation', 'selectedJobFamily'),
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

                    console.log(jobPostings);
                    self.set('searchResults', jobPostings);
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
            } else {
                cont.searchJobs(JSON.stringify(searchObj), callback);
            }
        }
    }
});

App.JobPostingController = Ember.ObjectController.extend({
    jobPostingUrl: function() {
        return parent.urlPrefix + '/JobPosting?id=' + this.get('Id');
    }.property('Id'),
    actions: {
        clickApply: function() {
            window.parent.location.href = this.get('jobPostingUrl');
            console.log(this.get('Id'));
        }
    }
});

// Routes
App.JobSearchRoute = Ember.Route.extend( {
    model: function(params) {
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
                    jobTitle: app.Job_Posting__r.Name,
                    firstLocationString: firstLocationString,
                    otherLocationsString: otherLocationsString,
                    otherLocationsCount: otherLocationsCount,
                    jobPostingUrl: parent.urlPrefix + '/JobPosting?id=' + app.Job_Posting__c
                };

                applications.addObject(applicationObj);
            });
        }

        return {
            radiusOptions: ['5', '10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: ['All locations', 'Near...', 'Near me', 'Remote/Telecommute'],
            jobFamilies: jobFamilies,
            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,
            applications: applications
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