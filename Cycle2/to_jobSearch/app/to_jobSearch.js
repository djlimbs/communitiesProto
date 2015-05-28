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
    init: function() {
        this._super();
        // var hasSearchTerm = window.location.href.indexOf('searchTerm') != -1;
        // var hasNearValue = window.location.href.indexOf('nearValue') != -1;
        // if(hasSearchTerm || hasNearValue){
        //     Ember.run.later(this, function() {
        //         if (!this.get('isDestroyed') && !this.get('isDestroying')) { //For unit test
        //             this.setProperties({
        //                 searchResults : [],
        //                 currentSearchTerm : this.get('searchTerm'),
        //                 currentLocation : this.get('selectedLocation'),
        //                 currentCategory : this.get('selectedJobFamily'),
        //                 currentNearValue : this.get('nearValue'),
        //                 currentRadius : this.get('selectedRadius'),
        //                 currentUnit : this.get('selectedUnit'),
        //                 currentOffSet : 0
        //             });

        //             this.search();
        //         }
        //     }, 1000);
        // };

        if (window.location.hash) {
            var hash = window.location.hash.split('#')[1];

            // this.set('searchTerm', !Ember.isEmpty(hash.split('&')[0].slice(11)) ? hash.split('&')[0].slice(11) : '');
            // this.set('selectedLocation', !Ember.isEmpty(hash.split('&')[1].slice(17)) ? hash.split('&')[1].slice(17) : '');
            // this.set('selectedJobFamily', !Ember.isEmpty(hash.split('&')[2].slice(18)) ? hash.split('&')[2].slice(18) : '');
            // this.set('nearValue', !Ember.isEmpty(hash.split('&')[3].slice(10)) ? hash.split('&')[3].slice(10) : '');
            // this.set('selectedRadius', !Ember.isEmpty(hash.split('&')[4].slice(15)) ? hash.split('&')[4].slice(15) : '');
            // this.set('selectedUnit', !Ember.isEmpty(hash.split('&')[5].slice(13)) ? hash.split('&')[5].slice(13) : '');
            // this.set('currentOffSet', !Ember.isEmpty(hash.split('&')[6].slice(14)) ? hash.split('&')[6].slice(14) : '');

            this.set('searchTerm', hash.split('&')[0].slice(11) != ('null' || 'undefined') ? hash.split('&')[0].slice(11) : '');
            this.set('selectedLocation', hash.split('&')[1].slice(17) != ('null' || 'undefined') ? hash.split('&')[1].slice(17) : 'All Locations');
            this.set('selectedJobFamily', hash.split('&')[2].slice(18) != ('null' || 'undefined') ? hash.split('&')[2].slice(18) : 'All Categories');
            this.set('nearValue', hash.split('&')[3].slice(10) != ('null' || 'undefined') ? hash.split('&')[3].slice(10) : '');
            this.set('selectedRadius', hash.split('&')[4].slice(15) != ('null' || 'undefined') ? hash.split('&')[4].slice(15) : '5');
            this.set('selectedUnit', hash.split('&')[5].slice(13) != ('null' || 'undefined') ? hash.split('&')[5].slice(13) : 'mi');
            this.set('currentOffSet', hash.split('&')[6].slice(14) != ('null' || 'undefined') ? hash.split('&')[6].slice(14) : 0);

            console.log('$$$$$$$$$$$$$$$$$$$')
            console.log(this.get('searchTerm'));
            console.log(this.get('selectedLocation'));
            console.log(this.get('selectedJobFamily'));
            console.log(this.get('nearValue'));
            console.log(this.get('selectedRadius'));
            console.log(this.get('selectedUnit'));
            console.log(this.get('currentOffSet'));
            console.log('$$$$$$$$$$$$$$$$$$$') 

            Ember.run.later(this, function() {
                this.setProperties({
                    currentSearchTerm : this.get('searchTerm'),
                    currentLocation : this.get('selectedLocation'),
                    currentCategory : this.get('selectedJobFamily'),
                    currentNearValue : this.get('nearValue'),
                    currentRadius : this.get('selectedRadius'),
                    currentUnit : this.get('selectedUnit'),
                    //currentOffSet : parseInt(this.get('currentOffSet'))
                    currentOffSet : 0

                });

                this.search('searchButton');
            }, 0);
        };
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
        if(this.get('selectedLocation') == 'Near...' && Ember.isEmpty(this.get('nearValue'))){
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
    isAllLocations: Ember.computed.equal('selectedLocation', 'All Locations'),
    isNear: Ember.computed.equal('selectedLocation', 'Near...'),
    isNearMe: Ember.computed.equal('selectedLocation', 'Near Me'),
    isRemote: Ember.computed.equal('selectedLocation', 'Remote/Telecommute'),
    messageRecepient: '',
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
            this.search('searchButton');
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

        console.log('@@@@@@@@@')
        console.log(searchObj.currentSearchTerm)
        console.log(searchObj.currentLocation)
        console.log(searchObj.currentCategory)
        console.log(searchObj.currentNearValue)
        console.log(searchObj.currentRadius)
        console.log(searchObj.currentUnit)
        console.log(searchObj.currentOffSet)
        console.log('@@@@@@@@@')

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
                    console.log('###########################');
                    console.log(searchResults.concat(jobPostings));
                    console.log('###########################');
                    
                    self.set('searchResults', searchResults.concat(jobPostings.slice(0, 10)));
                    self.set('queryJobPostings', jobPostings.length);  //used to determine if we need to display loadmore
                };
            }
        };

        if (searchObj.currentLocation === 'Near Me') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    searchObj.latitude = position.coords.latitude;
                    searchObj.longitude = position.coords.longitude;

                    cont.searchJobs(JSON.stringify(searchObj), callback);
                }, function(err){
                    self.set('isSearching', false);
                    self.set('selectedLocation', 'Near...');
                    self.set('showWarning', true);
                    self.get('locations').removeObject('Near Me');
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        } else if (searchObj.currentLocation === 'Near...') {
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
    messageRecepientPostsBinding: 'controllers.jobSearch.messageRecepient',
    messageContentBinding: 'controllers.jobSearch.messageContent',
    othersText : function(){
        return this.get('locations').length == 2 ? 'other' : 'others'
    }.property(''),
    // showDirectReports: function(){
    //     return 'display: none;';
    // }.property(),
    // showHide: function(){
    //     return 'Show';
    // }.property(),


    // ********************************************************************
    // OLD WAY OF LINKING USERS TO ID
    // hiringManagerId: function(){
    //     return '/' + this.get('Hiring_Manager_ID__c');
    // }.property(),

    // recruiterId: function(){
    //     return '/' + this.get('Recruiter_ID__c');
    // }.property(),  
    // reportManagerId: function(){
    //     return '/' + this.get('recruiter.ManagedUsers.records.Id');
    // }.property(),    
    // ********************************************************************

    disableSaveButton: function(){
        return this.get('disableSave') ? true : false
    }.property('disableSave'),
    sendPrivateMessage: function(recepientId){
        var jobPosting = this.get('content');
        var messageContent = this.get('messageContent');
        var addedContent = 'Job Posting:' + '\n' + jobPosting.Name;
        var url = window.location.origin + '/apex/to_jobListing?id=' + jobPosting.Id;
        var message = messageContent + '\n\n' + addedContent + '\n' + url;

        cont.sendMessage(message, recepientId, function(results, responseObj){
        });
    },

    showDirectReports : false,
    showReportContent : function(){
        return this.get('showDirectReports') ? 'Hide direct reports' : 'Show direct reports';
    }.property('showDirectReports'),


    jobPostingUrl: function() {
        return window.location.origin + '/apex/to_jobPostingView?id=' + this.get('Id');
    }.property('Id'),

    actions: {
        directReportsToggle: function(id){
            this.set('showDirectReports', !this.get('showDirectReports'));
            $('#' + id).slideToggle( "fast", function(){});
        },
        jobPostingDrillIn: function() {
            window.location.hash = '';
            var searchObj = this.get('parentController').getProperties('currentSearchTerm', 'currentLocation', 'currentCategory', 
                                            'currentNearValue', 'currentRadius', 'currentUnit', 'currentOffSet');

            // var searchParamsArray = [searchObj.currentSearchTerm, searchObj.currentLocation, searchObj.currentCategory,
            //                         searchObj.currentNearValue, searchObj.currentRadius, searchObj.currentUnit, searchObj.currentOffSet];

            // var searchObjJson = JSON.stringify(searchObj);
            // console.log('%%%%%%%%%%')
            // console.log(searchObjJson);
            // console.log('%%%%%%%%%%')
            if (!(Ember.isEmpty(searchObj.currentSearchTerm) 
                    && Ember.isEmpty(searchObj.currentLocation) 
                        && Ember.isEmpty(searchObj.currentCategory))){

                window.location.hash = window.location.hash + 'searchTerm=' + searchObj.currentSearchTerm +'&' +
                                                          'selectedLocation=' + searchObj.currentLocation +'&' +
                                                          'selectedJobFamily=' + searchObj.currentCategory +'&' +
                                                          'nearValue=' + searchObj.currentNearValue +'&' +
                                                          'selectedRadius=' + searchObj.currentRadius +'&' +
                                                          'selectedUnit=' + searchObj.currentUnit +'&' +
                                                          'currentOffSet=' + searchObj.currentOffSet;
            };

            console.log('%%%%%%%%%%')
            console.log(window.location.hash);
            console.log('%%%%%%%%%%')


            // searchParamsArray.forEach(function(searchParam){
            //     if (!Ember.isEmpty(searchParam)) {
            //         window.location.hash = window.location.hash + '/' + searchParam;
            //     };
            // });

            window.parent.location.href = this.get('jobPostingUrl');
            
            // reload the page on jobTitle click and then drill in to that job posting
            // location.reload();
        },
        clickSendMessage: function(recepientId, recepientName){
            var self = this;
            self.set('messageContent', '');
            $('#privateMessageModal').modal({
                show: true,
            });
            // window.parent.scrollTo(0,0);

            self.get('parentController').set('messageRecepient', recepientName);
            // $('.form__group > .mar--sm--tn').text('Send a private message to ' + recepientName + ' about this job posting.');
            $('#modalSend').click(function() {
                $('#modalSend').unbind('click');
                self.sendPrivateMessage(recepientId);
            });
        },
        // showDirectReportsAction: function(){
        //     if (this.get('showDirectReports') == 'display: none;') {
        //         this.set('showDirectReports', 'display: block;');
        //         this.set('showHide', 'Hide');
        //     } else {
        //         this.set('showDirectReports', 'display: none;');
        //         this.set('showHide', 'Show');
        //     }
        // },
    }
});

// Routes
App.JobSearchRoute = Ember.Route.extend( {
    model: function(params) {
        console.log('//////////////////////////////////////');
        console.log('JOB SERCH MAP: ', parsedJobSearchMap);
        console.log('//////////////////////////////////////');

        // Categories
        var categories = Ember.A();
        if (!Ember.isEmpty(parsedJobSearchMap.categories)) {
            categories.addObjects(parsedJobSearchMap.categories.getEach('value'));
        }
        categories = categories.sort();
        categories.unshift('All Categories');

        // Locations
        var locations = ['All Locations', 'Near...', 'Near Me'];
        if (parsedJobSearchMap.hasRemote) {
            locations.push('Remote/Telecommute');
        }

        // Search Results
        var searchResults = [];
        
        var hasSearchTerm = window.location.href.indexOf('searchTerm') != -1;
        var hasNearValue = window.location.href.indexOf('nearValue') != -1;

        if(!hasSearchTerm && !hasNearValue){
            searchResults = processJobPostings(parsedJobSearchMap.recentPosts, parsedJobSearchMap.jobPostingFieldsToDisplay)
        }

        return {
            searchResults : searchResults,
            radiusOptions: ['5', '10', '25', '50'],
            radiusUnits: ['mi', 'km'],
            locations: locations,
            categories: categories,
            jobPostingFieldsToDisplay: parsedJobSearchMap.jobPostingFieldsToDisplay,
            apiKey: parsedJobSearchMap.apiKey,
            jobPostings: parsedJobSearchMap.jobPostings,
            searchTerm : Ember.isEmpty(searchTerm) ? null : searchTerm,
            selectedLocation : Ember.isEmpty(nearValue) ? null : 'Near...',
            nearValue : Ember.isEmpty(nearValue) ? null : nearValue,
            isSearching : !Ember.isEmpty(searchTerm) || !Ember.isEmpty(nearValue),
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

// $(document).ready(function() {
//     console.log('HERE')
//     console.log(window.location.hash);
//     console.log('HERE')


//     if (window.location.hash) {
//         console.log('TRUE')
//     } else {
//         console.log('FALSE')
//     };
// });


