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
//
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
        //console.log(window.innerHeight);
        $(window).resize(function() {
            console.log('b');
            console.log(window.innerHeight);
            //parent.alertsize();

            //parent.alertsize(window.innerHeight);
        });
    }
});

App.JobSearchController = Ember.ObjectController.extend({
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
            this.set('isSearching', true);

            var self = this;

            var searchObj = this.getProperties('searchTerm', 'selectedLocation', 'selectedJobFamily', 
                                                'nearValue', 'selectedRadius', 'selectedUnit');

            var callback = function(res, evt) {
                self.set('isSearching', false);
                if (res) {
                    var parsedResult = parseResult(res);
                    self.set('searchResults', parsedResult.data.jobPostings);
                    console.log(parsedResult);
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
        var jobFamilies = ['All divisions'];

        if (!Ember.isEmpty(parsedJobSearchMap.jobFamilies)) {
            jobFamilies.addObjects(parsedJobSearchMap.jobFamilies.getEach('value'));
        }

        return {
            radiusOptions: ['10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: ['All locations', 'Near...', 'Near me', 'Remote/Telecommute'],
            jobFamilies: jobFamilies
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