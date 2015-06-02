emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';

function updateHeight() {
    Ember.run.scheduleOnce('afterRender', this, function() {
        // parent.resizeIframe();
    });
};

labels = {
    thankYou: 'Thank you for applying!',
    youAppliedOn: 'You began applying for this job today.',
    appliedYesterday: 'You began applying for this job today.',
    appliedMultilpleDays: 'You began applying for this job (number of days) ago.',
    offeredJob: 'Congratulations! You\'ve received an offer on this job!'
};


moduleFor('controller:jobPosting', 'Job Posting Controller', {
});

// jobIsSaved
test('Method: jobIsSaved - if isJobSaved is true and application is empty - should return true', function() {
    expect(1);
    var test = {
        isJobSaved: true,
        application: null
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobIsSaved'), result);       
    });
});

test('Method: jobIsSaved - if isJobSaved is false and application is empty - should return false', function() {
    expect(1);
    var test = {
        isJobSaved: false,
        application: null
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobIsSaved'), result);       
    });
});

test('Method: jobIsSaved - if isJobSaved is true and application is not empty - should return false', function() {
    expect(1);
    var test = {
        isJobSaved: true,
        application: [{name: 1}]
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobIsSaved'), result);       
    });
});

test('Method: jobIsSaved - if isJobSaved is false and application is not empty - should return false', function() {
    expect(1);
    var test = {
        isJobSaved: false,
        application: [{name: 1}]
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('jobIsSaved'), result);       
    });
});


// hasJobOffer
test('Method: hasJobOffer - if application is not empty and has a Job_Offers__r - should return true', function() {
    expect(1);
    var test = {
        application: 
        {
            Job_Offers__r: 'not empty'
        }
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('hasJobOffer'), result);       
    });
});

test('Method: hasJobOffer - if application is not empty and does not have a Job_Offers__r - should return false', function() {
    expect(1);
    var test = {
        application: 
        {
            Job_Offers__r: null
        }
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('hasJobOffer'), result);       
    });
});

test('Method: hasJobOffer - if application is empty - should return false', function() {
    expect(1);
    var test = {
        application: null
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('hasJobOffer'), result);       
    });
});


// toggleDropdown
test('Method: toggleDropdown - if redirectUrl is not empty - should return \'dropdown\'', function() {
    expect(1);
    var test = {
        redirectUrl: ''
    };

    var ctrl = this.subject();
    var result = 'dropdown';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('redirectUrl', test.redirectUrl);
        deepEqual(ctrl.get('toggleDropdown'), result);       
    });
});

test('Method: toggleDropdown - if redirectUrl is empty - should return empty string', function() {
    expect(1);
    var test = {
        redirectUrl: 'something'
    };

    var ctrl = this.subject();
    var result = '';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('redirectUrl', test.redirectUrl);
        deepEqual(ctrl.get('toggleDropdown'), result);       
    });
});


// actionButtonColor
test('Method: actionButtonColor - if Status__c is \'In Progress\' and  Job_Offers__r is not empty - should return \'button--success\'', function() {
    expect(1);
    var test = {
        application: {
            Status__c: 'In Progress',
            Job_Offers__r: 'not empty'
        }
    };

    var ctrl = this.subject();
    var result = 'button--success';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('actionButtonColor'), result);       
    });
});

test('Method: actionButtonColor - if Status__c is \'In Progress\' and  Job_Offers__r is empty - should return \'button--primary\'', function() {
    expect(1);
    var test = {
        application: {
            Status__c: 'Applied',
            Job_Offers__r: null
        }
    };

    var ctrl = this.subject();
    var result = 'button--primary';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('actionButtonColor'), result);       
    });
});

// appliedAlertClass
test('Method: appliedAlertClass - if Status__c is \'Completed\' and  Job_Offers__r is not empty, and it has been more than 24 hrs from Applied_On__c date - should return \'alert--success\'', function() {
    expect(1);
    var test = {
        application: {
            Status__c: 'Completed',
            Job_Offers__r: {
                records: [{
                    Status__c: 'Extended'
                }]
            },
            Applied_On__c: '2007-04-25T01:32:21.196+0600'
        }
    };

    var ctrl = this.subject();
    var result = 'alert--success';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedAlertClass'), result);       
    });
});

test('Method: appliedAlertClass - if Job_Offers__r is empty and  Status__c is not \'Completed\' - should return \'alert--warning\'', function() {
    expect(1);
    var test = {
        application: {
            Status__c: 'In Progress',
            Job_Offers__r: null,
            Applied_On__c: '2007-04-25T01:32:21.196+0600'
        }
    };

    var ctrl = this.subject();
    var result = 'alert--warning';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedAlertClass'), result);       
    });
});

test('Method: appliedAlertClass - if Job_Offers__r is empty and  Status__c is \'Completed\' - should return \'alert--info\'', function() {
    expect(1);
    var test = {
        application: {
            Status__c: 'Completed',
            Job_Offers__r: null,
            Applied_On__c: '2007-04-25T01:32:21.196+0600'
        }
    };

    var ctrl = this.subject();
    var result = 'alert--info';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedAlertClass'), result);       
    });
});

test('Method: appliedAlertClass - if application is empty - should return null', function() {
    expect(1);
    var test = {
        application: null
    };

    var ctrl = this.subject();
    var result = null;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedAlertClass'), result);       
    });
});


// appliedMessage
test('Method: appliedMessage - if Job_Offers__r is empty and  Status__c is \'Completed\' - should return \'Thank you for applying!\'', function() {
    expect(1);

    // Get today's date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = mm+'/'+dd+'/'+yyyy;

    var test = {
        application: {
            Status__c: 'Completed',
            Job_Offers__r: null,
            Applied_On__c: today
        }
    };

    var ctrl = this.subject();
    var result = 'Thank you for applying!';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedMessage'), result);       
    });
});

test('Method: appliedMessage - if Job_Offers__r is empty, Status__c is \'In Progress\', and applied date is today - should return \'You began applying for this job (number of days) ago.\'', function() {
    expect(1);

    var test = {
        application: {
            Status__c: 'In Progress',
            Job_Offers__r: null,
            Applied_On__c: '2007-04-25T01:32:21.196+0600',
            CreatedDate: '2010-04-25T01:32:21.196+0600'
        }
    };

    // Get today's date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = mm+'/'+dd+'/'+yyyy;

    today = moment(today).format('MMM D, YYYY');

    var appliedDate = moment(test.application.CreatedDate).format('MMM D, YYYY');
    var daysAgo = moment(today).diff(moment(test.application.CreatedDate), 'days');

    var ctrl = this.subject();
    var result = 'You began applying for this job (number of days) ago.';

    Ember.run(function() {
        ctrl.set('content', test);

        var comp = ctrl.get('appliedMessage').split('<')[0].slice(0, -16);
        deepEqual(comp, result);       
    });
});

test('Method: appliedMessage - if Job_Offers__r is not empty and Status__c is \'Extended\' - should return \'Congratulations! You\'ve received an offer on this job!\'', function() {
    expect(1);

    var test = {
        application: {
            Status__c: 'Extended',
            Job_Offers__r: {
                records: [{
                    Status__c: 'Extended'
                }]
            },
        }
    };

    var ctrl = this.subject();
    var result = 'Congratulations! You\'ve received an offer on this job!';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('appliedMessage'), result);       
    });
});


// disableApplyButton
test('Method: disableApplyButton - if application is not empty, Job_Offers__r is empty, and Status__c is \'Completed\' - should return \'disabled\'', function() {
    expect(1);

    var test = {
        application: {
            Status__c: 'Completed',
            Job_Offers__r: null
        }
    };

    var ctrl = this.subject();
    var result = 'disabled';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('disableApplyButton'), result);       
    });
});

test('Method: disableApplyButton - if application is not empty, Job_Offers__r is not empty, and Status__c is \'Completed\' - should return false', function() {
    expect(1);

    var test = {
        application: {
            Status__c: 'Extended',
            Job_Offers__r: {
                records: [{
                    Status__c: 'Completed'
                }]
            }
        }
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('disableApplyButton'), result);       
    });
});

// Actions
// displayLocationModal
test('Action: displayLocationModal - if locations length is not equal to 1 - showLoadingState should be true', function() {
    expect(1);

    var test = {
        locations: []
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.send('displayLocationModal');

        deepEqual(ctrl.get('showLoadingState'), result);       
    });
});

test('Action: displayLocationModal - if locations length is not equal to 1 - showLoadingState should be true', function() {
    expect(1);

    var test = {
        locations: [1, 2]
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.send('displayLocationModal');

        deepEqual(ctrl.get('showLoadingState'), result);       
    });
});

