// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

function processJobPostings(jobPostings, jobPostingFieldsToDisplay){
    if (jobPostings) {
        jobPostings.forEach(function(jp, index) {
            // Build location string
            if (!Ember.isEmpty(jp.locations)) {
                jp = $.extend(jp, createLocationStrings(jp.locations));
            }

            jp.allowRemote = jp.Remote_Available__c;
            
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
    };
}

function createLocationStrings(allLocations){
    var firstLocationString = '';
    var otherLocationsString;
    var otherLocationsCount = 0;

    if (allLocations) {
        var locations = allLocations.sortBy('Location__r.City__c');

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
    };
 
    var obj = {
        firstLocationString: firstLocationString,
        otherLocationsString: otherLocationsString,
        otherLocationsCount: otherLocationsCount
    };

    return obj;
};


var globalThis = this;

App.DirectReportsView = Ember.View.extend({
    templateName: 'directReports',
    didInsertElement: function() {
    },
});

App.JobSearchView = Ember.View.extend({
    didInsertElement: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });
    },
    keyPress: function(e) {
        if (e.keyCode === 13 && $('#search').attr('disabled') != 'disabled') {
            this.get('controller').send('clickSearch');
        }
    }
});



App.JobSearchController = Ember.ObjectController.extend({
    init: function() {
        this._super();
        
        if(isSF1 && /Android/i.test(navigator.userAgent)) {
            var params = window.location.href.split('to_jobSearch')[1] + '&';

            var searchTerm = params.match(/searchTerm=([^&]*)/);
            var selectedLocation = params.match(/selectedLocation=([^&]*)/);
            var selectedJobFamily = params.match(/selectedJobFamily=([^&]*)/);
            var nearValue = params.match(/nearValue=([^&]*)/);
            var selectedRadius = params.match(/selectedRadius=([^&]*)/);
            var selectedUnit = params.match(/selectedUnit=([^&]*)/);
            var currentOffSet = params.match(/currentOffSet=([^&]*)/);


            if (searchTerm != (null && 'null')) {
                this.set('searchTerm', searchTerm[1].replace('+', ' ')); 
                this.set('currentSearchTerm', this.get('searchTerm'));
            } else {
                this.set('searchTerm', '');
                this.set('currentSearchTerm', this.get('searchTerm'));
            }

            if (selectedLocation != (null && 'null')) {
                var thisSelectedLocation = selectedLocation[1];
                if(thisSelectedLocation.indexOf('+') != -1){
                    this.set('selectedLocation', thisSelectedLocation.replace('+', ' '));
                } else if (thisSelectedLocation.indexOf('%2F') != -1) {
                    this.set('selectedLocation', thisSelectedLocation.replace('%2F', '/'));
                } else {
                    this.set('selectedLocation', thisSelectedLocation);
                }
                this.set('currentLocation', this.get('selectedLocation'));
            } else {
                this.set('selectedLocation', labels.allLocations);
                this.set('currentLocation', this.get('selectedLocation'));
            }

            if (selectedJobFamily != (null && 'null')) {
                this.set('selectedJobFamily', selectedJobFamily[1].replace('+', ' ')); 
                this.set('currentCategory', this.get('selectedJobFamily'));
            } else {
                this.set('selectedJobFamily', labels.allCategories); 
                this.set('currentCategory', this.get('selectedJobFamily'));
            }

            if (nearValue != (null && 'null')) {
                var near = nearValue[1];
                if (near == (null || 'null')) {
                    this.set('nearValue', '');
                } else {
                    this.set('nearValue', near.replace('+', ''));
                };
                this.set('currentNearValue', this.get('nearValue'));
            } else {
                this.set('nearValue', '');
                this.set('currentNearValue', this.get('nearValue'));
            }

            if (selectedRadius != (null && 'null')) {
                var radius = selectedRadius[1];
                if (radius == (null || 'null' || '')) {
                    this.set('selectedRadius', '50'); 
                } else {
                    this.set('selectedRadius', radius); 
                }
                this.set('currentRadius', this.get('selectedRadius'));
            } else {
                this.set('selectedRadius', '50');
                this.set('currentRadius', this.get('selectedRadius'));
            }

            if (selectedUnit != (null && 'null')) {
                var unit = selectedUnit[1];
                if (unit == (null || 'null' || 'undefined')) {
                    this.set('selectedUnit', 'mi'); 
                } else {
                    this.set('selectedUnit', unit); 
                }
                this.set('currentUnit', this.get('selectedUnit'));
            } else {
                this.set('selectedUnit', 'mi');
                this.set('currentUnit', this.get('selectedUnit'));
            }

            this.set('currentOffSet', 0); 
            
            Ember.run.later(this, function() {
                this.search('searchButton');
            }, 0);  

        } else if (isSF1 && window.location.href.indexOf('searchTerm') !== -1 && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.hash = window.location.href.match(/searchTerm=(.*)&?/)[1];
        }

        if (window.location.hash) {
            var hash = decodeURIComponent(window.location.hash.slice(1)).replace(/\+/g, ' ');

            this.set('searchTerm', hash.split('&')[0].slice(11) != ('null' || 'undefined') ? hash.split('&')[0].slice(11) : '');
            this.set('selectedLocation', hash.split('&')[1].slice(17) != ('null' || 'undefined') ? hash.split('&')[1].slice(17) : labels.allLocations);
            this.set('selectedJobFamily', hash.split('&')[2].slice(18) != ('null' || 'undefined') ? hash.split('&')[2].slice(18) : labels.allCategories);
            this.set('nearValue', hash.split('&')[3].slice(10) != ('null' || 'undefined') ? hash.split('&')[3].slice(10) : '');
            this.set('selectedRadius', hash.split('&')[4].slice(15) != ('null' || 'undefined') ? hash.split('&')[4].slice(15) : '50');
            this.set('selectedUnit', hash.split('&')[5].slice(13) != ('null' || 'undefined') ? hash.split('&')[5].slice(13) : 'mi');
            this.set('currentOffSet', hash.split('&')[6].slice(14) != ('null' || 'undefined') ? hash.split('&')[6].slice(14) : 0);

            Ember.run.later(this, function() {
                this.setProperties({
                    currentSearchTerm : this.get('searchTerm'),
                    currentLocation : this.get('selectedLocation'),
                    currentCategory : this.get('selectedJobFamily'),
                    currentNearValue : this.get('nearValue'),
                    currentRadius : this.get('selectedRadius'),
                    currentUnit : this.get('selectedUnit'),
                    currentOffSet : 0

                });

                this.search('searchButton');
            }, 0);
        };
    },
    currentOffSet : 0,
    offsetStep : 10,
    selectedJobFamily: null,
    selectedRadius: '50',
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
    isAllLocations: Ember.computed.equal('selectedLocation', labels.allLocations),
    isNear: Ember.computed.equal('selectedLocation', labels.near),
    isNearMe: Ember.computed.equal('selectedLocation', labels.nearMe),
    isRemote: Ember.computed.equal('selectedLocation', labels.remoteTelecommute),
    actions: {
        loadMore : function(){
            this.set('currentOffSet', this.get('currentOffSet') + this.get('offsetStep'));
            this.search();
        },
        clickSearch: function() {
            this.setProperties({
                // Dont clear results before new results come back
                // searchResults : [], 
                currentSearchTerm : this.get('searchTerm'),
                currentLocation : this.get('selectedLocation'),
                currentCategory : this.get('selectedJobFamily'),
                currentNearValue : this.get('nearValue'),
                currentRadius : this.get('selectedRadius'),
                currentUnit : this.get('selectedUnit'),
                currentOffSet : 0
            });

            // Setting the Hash to Save Search State
            window.location.hash = '';
            var myHash = '';
            if (!(Ember.isEmpty(this.get('searchTerm')) 
                    && Ember.isEmpty(this.get('selectedLocation')) 
                        && Ember.isEmpty(this.get('selectedJobFamily')))){

                myHash = 'searchTerm=' + this.get('searchTerm') +'&' +
                          'selectedLocation=' + this.get('selectedLocation') +'&' +
                          'selectedJobFamily=' + this.get('selectedJobFamily') +'&' +
                          'nearValue=' + this.get('nearValue') +'&' +
                          'selectedRadius=' + this.get('selectedRadius') +'&' +
                          'selectedUnit=' + this.get('selectedUnit') +'&' +
                          'currentOffSet=' + 0;
            };
            if (isSF1) {
                if(/Android/i.test(navigator.userAgent)) {
                    var searchTerm = this.get('searchTerm');
                    var selectedLocation = this.get('selectedLocation');
                    var selectedJobFamily = this.get('selectedJobFamily');
                    var nearValue = this.get('nearValue');
                    var selectedRadius = this.get('selectedRadius');
                    var selectedUnit = this.get('selectedUnit');
                    var currentOffSet = 0;

                    var url = encodeURIComponent('/apex/' + namespace + 'to_jobSearch?searchTerm=' + searchTerm + 
                                                                        '&selectedLocation=' + selectedLocation + 
                                                                        '&selectedJobFamily=' + selectedJobFamily + 
                                                                        '&nearValue=' + nearValue + 
                                                                        '&selectedRadius=' + selectedRadius + 
                                                                        '&selectedUnit=' + selectedUnit + 
                                                                        '&currentOffSet=' + currentOffSet);

                    sforce.one.navigateToURL(url);
                } else {
                    sforce.one.navigateToURL('/apex/' + namespace + 'to_jobSearch?searchTerm=' + encodeURIComponent(myHash));
                }
            } else {
                window.location.hash = myHash;
                this.search('searchButton');
            }
        },
    },
    findLocation: function(callback, searchTerm){
        var self = this;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=' + self.get('apiKey').Field1__c
        }).done(callback)
    },
    search: function(calledBy) {
        var self = this;
        self.set('isSearching', true);
        self.set('queryJobPostings', 0);
        self.set('showWarning', false);

        var searchObj = self.getProperties('currentSearchTerm', 'currentLocation', 'currentCategory', 
                                           'currentNearValue', 'currentRadius', 'currentUnit', 'currentOffSet');

        var callback = function(res, evt) {
            // Clear results after new results come back only seach is caled from search button
            if (calledBy == 'searchButton') {
                self.set('searchResults', []);
            }
            self.set('isSearching', false);

            if (res) {
                var parsedResult = parseResult(res);
                var jobPostings = parsedResult.data.jobPostings;
                var searchResults = self.get('searchResults');

                processJobPostings(jobPostings, self.get('jobPostingFieldsToDisplay'));
                //we will return up to 11 job postings to determine if we need to load more or not. So we only want the first 10.
                if (jobPostings) {
                    self.set('searchResults', searchResults.concat(jobPostings.slice(0, 10)));
                    self.set('queryJobPostings', jobPostings.length);  //used to determine if we need to display loadmore
                };
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
                searchObj.latitude = location.geometry.location.lat;
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
    othersText : function(){
        return this.get('locations').length == 2 ? 'other' : 'others'
    }.property(''),
    
    jobPostingUrl: function() {
        return window.location.origin + '/apex/' + namespace + 'to_jobPostingView?id=' + this.get('Id');
    }.property('Id'),

    actions: {
        jobPostingDrillIn: function() {
            var showEdit = userCanEdit == 'true' ? '&preview=true' : '';

            if (isSF1) {
                sforce.one.navigateToURL('/apex/' + namespace + 'to_jobPostingView?id=' + this.get('Id') + showEdit);
            } else {
                window.parent.location.href = this.get('jobPostingUrl') + showEdit;
            };
        },
    }
});

// Routes
App.JobSearchRoute = Ember.Route.extend( {
    model: function(params) {
        // Categories
        var categories = Ember.A();
        if (!Ember.isEmpty(parsedJobSearchMap.categories)) {
            categories.addObjects(parsedJobSearchMap.categories.getEach('value'));
        }
        categories = categories.sort();
        categories.unshift(labels.allCategories);

        // Locations
        var locations = [labels.allLocations, labels.near, labels.nearMe];
        if (parsedJobSearchMap.hasRemote) {
            locations.push(labels.remoteTelecommute);
        }

        // Search Results
        var searchResults = [];
        
        if (!window.location.hash) {
            searchResults = processJobPostings(parsedJobSearchMap.recentPosts, parsedJobSearchMap.jobPostingFieldsToDisplay);
        }

        return {
            searchResults: searchResults,
            radiusOptions: ['5', '10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: locations,
            categories: categories,
            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,
            apiKey: parsedJobSearchMap.apiKey,
            jobPostings: parsedJobSearchMap.jobPostings,
            searchTerm: Ember.isEmpty(searchTerm) ? null : searchTerm,
            selectedLocation: Ember.isEmpty(nearValue) ? null : labels.near,
            nearValue: Ember.isEmpty(nearValue) ? null : nearValue,
            isSearching: !Ember.isEmpty(searchTerm) || !Ember.isEmpty(nearValue),
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

Ember.ControllerMixin.reopen({
   labels: labels,
});

