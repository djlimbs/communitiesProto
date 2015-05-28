emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';


moduleFor('controller:jobSearch', 'Job Search Controller', {
});

// theLinkedInMap
test('Method: theLinkedInMap - if user is logged in with linked in - should return user\'s linked in data', function() {
    expect(1);
    var test = {
        linkedInMap: {
            firstName: 'Burhan',
            lastName: 'Islami',
            phoneNumber: '773 844 3157',
        }
    };

    var ctrl = this.subject();
    var result = test.linkedInMap;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('theLinkedInMap'), result);       
    });
});

// currentOffSet
test('Property: currentOffSet - initial state - should return 0', function() {
    expect(1);
    var test = {};
    var parentControllerContent = {};

    var ctrl = this.subject();  
    ctrl.set('parentController', new App.JobSearchController);
    var parentCtrl = ctrl.get('parentController');  
    var result = 0;

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        deepEqual(ctrl.get('currentOffSet'), result);
    });
});


// offsetStep
test('Property: offsetStep - initial state - should return 10', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = 10;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('offsetStep'), result);       
    });
});

// selectedJobFamily
test('Property: selectedJobFamily - initial state - should return null', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = null;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('selectedJobFamily'), result);       
    });
});

// selectedRadius
test('Property: selectedRadius - initial state - should return null', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = null;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('selectedRadius'), result);       
    });
});

// selectedUnit
test('Property: selectedUnit - initial state - should return null', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = null;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('selectedUnit'), result);       
    });
});

// searchDisabled
test('Property: searchDisabled - initial state - should return false', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('searchDisabled'), result);       
    });
});

// showWarning
test('Property: showWarning - initial state - should return false', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('showWarning'), result);       
    });
});

// jobsText
test('Method: jobsText - when searchResults length is equal to 1 - should the string \'job\'', function() {
    expect(1);
    var test = {
        searchResults: [1]
    };

    var ctrl = this.subject();
    var result = 'job';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobsText'), result);       
    });
});

test('Method: jobsText - when searchResults length is greater than 1 - should the string \'jobs\'', function() {
    expect(1);
    var test = {
        searchResults: [1, 2]
    };

    var ctrl = this.subject();
    var result = 'jobs';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobsText'), result);       
    });
});

test('Method: jobsText - when searchResults length is greater than 1 - should the string \'jobs\'', function() {
    expect(1);
    var test = {
        searchResults: [1, 2, 3, 4, 5, 6, 7]
    };

    var ctrl = this.subject();
    var result = 'jobs';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobsText'), result);       
    });
});

// changedLocation
test('Method: changedLocation - should return searchDisabled as false', function() {
    expect(1);
    var test = {};

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('searchDisabled'), result);       
    });
});

// disableSearch
test('Method: disableSearch - when searchDisabled is false - should return false', function() {
    expect(1);
    var test = {
        searchDisabled: false
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('searchDisabled', test.searchDisabled);

        deepEqual(ctrl.get('disableSearch'), result);       
    });
});

test('Method: disableSearch - when searchDisabled is true - should return the string \'disabled\'', function() {
    expect(1);
    var test = {
        searchDisabled: true
    };

    var ctrl = this.subject();
    var result = 'disabled';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('searchDisabled', test.searchDisabled);

        deepEqual(ctrl.get('disableSearch'), result);       
    });
});

// disableSearchOnNearCallback
test('Method: disableSearchOnNearCallback - when nearValue is empty - should return false', function() {
    expect(1);
    var test = {
        nearValue: '',
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('nearValue', test.nearValue);

        deepEqual(ctrl.get('searchDisabled'), result);       
    });
});

// showEmptyState
test('Method: showEmptyState - when searchResults is empty, isSearching and showWarning are false - should return true', function() {
    expect(1);
    var test = {
        searchResults: null,
        isSearching: false,
        showWarning: false
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showEmptyState'), result);
    });
});

test('Method: showEmptyState - when searchResults is not empty, isSearching and showWarning are false - should return false', function() {
    expect(1);
    var test = {
        searchResults: 'something',
        isSearching: true,
        showWarning: true
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showEmptyState'), result);
    });
});

test('Method: showEmptyState - when searchResults is empty, isSearching is true and showWarning is false - should return false', function() {
    expect(1);
    var test = {
        searchResults: null,
        isSearching: true,
        showWarning: false
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showEmptyState'), result);
    });
});

test('Method: showEmptyState - when searchResults is not empty, isSearching is false and showWarning is true - should return false', function() {
    expect(1);
    var test = {
        searchResults: 'something',
        isSearching: false,
        showWarning: true
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showEmptyState'), result);
    });
});

// showLoadMore
test('Method: showLoadMore - when queryJobPostings is empty - should return false', function() {
    expect(1);
    var test = {
        queryJobPostings: null,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('queryJobPostings', test.queryJobPostings);
        ctrl.set('showEmptyState', test.showEmptyState);
        ctrl.set('offsetStep', test.offsetStep);

        deepEqual(ctrl.get('showLoadMore'), result);
    });
});

test('Method: showLoadMore - when queryJobPostings is not empty, showEmptyState is greater than offsetStep - should return showEmptyState', function() {
    expect(1);
    var test = {
        queryJobPostings: 5,
        showEmptyState: true,
        offsetStep: 1
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('queryJobPostings', test.queryJobPostings);
        ctrl.set('showEmptyState', test.showEmptyState);
        ctrl.set('offsetStep', test.offsetStep);

        deepEqual(ctrl.get('showLoadMore'), result);
    });
});

test('Method: showLoadMore - when queryJobPostings is not empty, showEmptyState is greater than offsetStep - should return showEmptyState', function() {
    expect(1);
    var test = {
        queryJobPostings: 5,
        showEmptyState: false,
        offsetStep: 1
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('queryJobPostings', test.queryJobPostings);
        ctrl.set('showEmptyState', test.showEmptyState);
        ctrl.set('offsetStep', test.offsetStep);

        deepEqual(ctrl.get('showLoadMore'), result);
    });
});


// numberOfJobs
test('Method: numberOfJobs - when searchResults is not empty - should return the length of searchResults', function() {
    expect(1);
    var test = {
        searchResults: [1, 2, 3]
    };

    var ctrl = this.subject();
    var result = 3;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('searchResults', test.searchResults);

        deepEqual(ctrl.get('numberOfJobs'), result);
    });
});

test('Method: numberOfJobs - when searchResults is empty - should return 0', function() {
    expect(1);
    var test = {
        searchResults: []
    };

    var ctrl = this.subject();
    var result = 0;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('searchResults', test.searchResults);

        deepEqual(ctrl.get('numberOfJobs'), result);
    });
});


// Items Controller
moduleFor('controller:jobPosting', 'Job Posting Controller', {
    needs: ['controller:jobSearch']
});

// othersText
test('Method: othersText - when locations length is not equal to 2 or less - should return others', function() {
    expect(1);
    var test = {
        locations: [1]
    };
    var parentControllerContent = {};

    var ctrl = this.subject();
    ctrl.set('parentController', new App.JobSearchController);
    var parentCtrl = ctrl.get('parentController'); 
    var result = 'others';


    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        deepEqual(ctrl.get('othersText'), result);       
    });
});

test('Method: othersText - when locations length is equal to 2 or less - should return other', function() {
    expect(1);
    var test = {
        locations: [1, 2]
    };
    var parentControllerContent = {
        currentSearchTerm: '',
        currentLocation: '',
        currentCategory : '',
        currentNearValue : '',
        currentRadius : '',
        currentUnit : '',
        currentOffSet : 0
    };


    var ctrl = this.subject();
    ctrl.set('parentController', new App.JobSearchController);
    var parentCtrl = ctrl.get('parentController'); 
    var result = 'other';

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        deepEqual(ctrl.get('othersText'), result);       
    });
});

test('Method: othersText - when locations length is not equal to 2 or less - should return others', function() {
    expect(1);
    var test = {
        locations: [1, 2, 3]
    };

    var ctrl = this.subject();
    var result = 'others';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('othersText'), result);       
    });
});

// isJobSaved
test('Method: isJobSaved - when job is not saved - should return false', function() {
    expect(1);
    var parentControllerContent = {
        Id: 1,
        savedJobs: [
            {
                jobPosting: 'Dev',
                jobPostingId: 7
            }
        ]
    };

    var ctrl = this.subject();  
    ctrl.set('parentController', new App.JobSearchController);
    var parentCtrl = ctrl.get('parentController');  
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        parentCtrl.set('savedJobs', parentControllerContent.savedJobs);
        
        deepEqual(ctrl.get('isJobSaved'), result);
    });
});


// jobPostingUrl
test('Method: jobPostingUrl - should return job posting url', function() {
    var test = {
        Id: 111
    };

    var ctrl = this.subject();
    var result = 'JobListing?id=';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobPostingUrl').split('/')[1], result + test.Id);       
    });
});

// disableSaveButton
test('Method: disableSaveButton - when disableSave is false - should return false', function() {
    expect(1);
    var test = {
        disableSave: false
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('disableSaveButton'), result);       
    });
});

test('Method: disableSaveButton - when disableSave is true - should return true', function() {
    expect(1);
    var test = {
        disableSave: true
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('disableSaveButton'), result);       
    });
});



