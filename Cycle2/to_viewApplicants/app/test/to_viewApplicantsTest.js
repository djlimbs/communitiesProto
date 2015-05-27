emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';


moduleFor('controller:ApplicantDashboard', 'ApplicantDashboard Controller', {
});

// showEmptyState
test('Method: showEmptyState - when both, apps and showLoadingState are empty - should return true', function() {
    expect(1);
    var test = {
        apps: [],
        showLoadingState: true
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('apps', test.apps);
        ctrl.set('showLoadingState', null);

        deepEqual(ctrl.get('showEmptyState'), result);       
    });
});

test('Method: showEmptyState - when apps is empty and showLoadingState is not empty - should return false', function() {
    expect(1);
    var test = {
        apps: [1],
        showLoadingState: true
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('apps', test.apps);
        ctrl.set('showLoadingState', null);

        deepEqual(ctrl.get('showEmptyState'), result);       
    });
});

test('Method: showEmptyState - when apps is empty and showLoadingState is not empty - should return false', function() {
    expect(1);
    var test = {
        apps: [],
        showLoadingState: true
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('apps', test.apps);
        ctrl.set('showLoadingState', 'Not Empty');

        deepEqual(ctrl.get('showEmptyState'), result);       
    });
});

test('Method: showEmptyState - when both, apps and showLoadingState, are not empty - should return false', function() {
    expect(1);
    var test = {
        apps: [1],
        showLoadingState: true
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('apps', test.apps);
        ctrl.set('showLoadingState', 'Not Empty');

        deepEqual(ctrl.get('showEmptyState'), result);       
    });
});

// hideLoadMore
test('Method: hideLoadMore - when both, showEmptyState and showLoadingState, are false - should return false', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('showEmptyState', false);
        ctrl.set('showLoadingState', false);

        deepEqual(ctrl.get('hideLoadMore'), result);       
    });
});

test('Method: hideLoadMore - when showEmptyState is true and showLoadingState is false - should return true', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('showEmptyState', true);
        ctrl.set('showLoadingState', false);

        deepEqual(ctrl.get('hideLoadMore'), result);       
    });
});

test('Method: hideLoadMore - when showEmptyState is false and showLoadingState is true - should return true', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('showEmptyState', false);
        ctrl.set('showLoadingState', true);

        deepEqual(ctrl.get('hideLoadMore'), result);       
    });
});

test('Method: hideLoadMore - when both, showEmptyState and showLoadingState, are true - should return true', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('showEmptyState', true);
        ctrl.set('showLoadingState', true);

        deepEqual(ctrl.get('hideLoadMore'), result);       
    });
});

// showAlert
test('Method: showAlert - when errorMsg is not empty - should return true', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('errorMsg', 'Errot Message');

        deepEqual(ctrl.get('showAlert'), result);       
    });
});

test('Method: showAlert - when errorMsg is empty - should return false', function() {
    expect(1);
    var test = {
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('errorMsg', '');

        deepEqual(ctrl.get('showAlert'), result);       
    });
});

// Actions
// saveModalState
test('Action: saveModalState - should set selectedSort, selectedStatus, showWithdrawn, showRejected and selectedSort to modalState', function() {
    expect(1);
    var test = {
    };

    var modalState = {
        selectedStage: 'selectedStage',
        selectedStatus: 'selectedStatus',
        showWithdrawn: true,
        showRejected: true,
        selectedSort: 'selectedSort'
    };

    var ctrl = this.subject();
    var result = '{\"selectedSort\":\"selectedSort\",\"selectedStatus\":\"selectedStatus\",\"showWithdrawn\":true,\"showRejected\":true}';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('selectedSort', 'selectedSort');
        ctrl.set('selectedStatus', 'selectedStatus');
        ctrl.set('showWithdrawn', true);
        ctrl.set('showRejected', true);
        ctrl.set('selectedSort', 'selectedSort');
        ctrl.send('saveModalState');

        deepEqual(JSON.stringify(ctrl.get('modalState')), result);       
    });
});


// App Controller
moduleFor('controller:App', 'App Controller', {
    needs: ['controller:applicantDashboard']
});

// downloadUrl
test('Property: downloadUrl - should be equal with / + the value of Resume_Post_Id__c', function() {
    expect(1);
    var test = {
        Resume_Post_Id__c: '070070007'
    };

    var ctrl = this.subject();
    var result = '/' + test.Resume_Post_Id__c;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('downloadUrl'), result);       
    });
});

// employmentText
test('Method: employmentText - when employmentHistory is not empty - should return a string with Job_Title + at + Employment History Name', function() {
    expect(1);
    var test = {
        employmentHistory: {
            Job_Title__c: 'Developer',
            Name: 'Appiphony'
        }
    };

    var ctrl = this.subject();
    var result = test.employmentHistory.Job_Title__c + ' at ' + test.employmentHistory.Name;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('employmentText'), result);       
    });
});

test('Method: employmentText - when employmentHistory is empty - should return a label indicating that Employment History does not exist', function() {
    expect(1);
    var test = {
        employmentHistory: null,
    };

    var ctrl = this.subject();
    var labels = {
        cardNoEmployment: 'Employment History Does Not Exist'
    };

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('employmentText'), labels.cardNoEmployment);       
    });
});

// hasOutcome
test('Method: hasOutcome - when Outcome__c is empty - should return false', function() {
    expect(1);
    var test = {
        Outcome__c: '',
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasOutcome'), false);       
    });
});

test('Method: hasOutcome - when Outcome__c is not empty - should return true', function() {
    expect(1);
    var test = {
        Outcome__c: 'Hired',
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasOutcome'), true);       
    });
});

// hasAddress
test('Method: hasAddress - when both, City__c and State_Province__c, are empty - should return false', function() {
    expect(1);
    var test = {
        City__c: '',
        State_Province__c: ''
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasAddress'), false);       
    });
});

test('Method: hasAddress - when City__c is not empty and State_Province__c is empty - should return false', function() {
    expect(1);
    var test = {
        City__c: 'Prishtina',
        State_Province__c: ''
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasAddress'), false);       
    });
});

test('Method: hasAddress - when City__c is empty and State_Province__c is not empty - should return false', function() {
    expect(1);
    var test = {
        City__c: '',
        State_Province__c: 'Kosova'
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasAddress'), false);       
    });
});

test('Method: hasAddress - when both, City__c and State_Province__c, are not empty - should return true', function() {
    expect(1);
    var test = {
        City__c: 'Prishtina',
        State_Province__c: 'Kosova'
    };

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasAddress'), true);       
    });
});

// outcomeColor
test('Method: outcomeColor - when Outcome__c equals Hired - should return label--success', function() {
    expect(1);
    var test = {
        Outcome__c: 'Hired',
    };

    var outcomeColorMap = {
        'Hired' : 'label--success',
        'Withdrew' : 'label--warning',
        'Rejected' : 'label--error'
    }

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('outcomeColor'), outcomeColorMap[test['Outcome__c']]); 
    });
});

test('Method: outcomeColor - when Outcome__c equals Withdrew - should return label--warning', function() {
    expect(1);
    var test = {
        Outcome__c: 'Withdrew',
    };

    var outcomeColorMap = {
        'Hired' : 'label--success',
        'Withdrew' : 'label--warning',
        'Rejected' : 'label--error'
    }

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('outcomeColor'), outcomeColorMap[test['Outcome__c']]); 
    });
});

test('Method: outcomeColor - when Outcome__c equals Rejected - should return label--error', function() {
    expect(1);
    var test = {
        Outcome__c: 'Rejected',
    };

    var outcomeColorMap = {
        'Hired' : 'label--success',
        'Withdrew' : 'label--warning',
        'Rejected' : 'label--error'
    }

    var ctrl = this.subject();

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('outcomeColor'), outcomeColorMap[test['Outcome__c']]); 
    });
});

// statusText
test('Method: statusText - when Outcome__c is not empty - should return Stage__c', function() {
    expect(1);

    var parentControllerContent = {
        offerStage: ''
    };
    
    var test = {
        Outcome__c: 'Hired',
        Stage__c: 'Interview'
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('statusText'), test.Stage__c); 
    });
});

test('Method: statusText - when Outcome__c is empty,  Stage__c and offerStage are equal and Job_Offers__r is not empty - should return Stage__c + (Status__c)', function() {
    expect(1);

    var parentControllerContent = {
        offerStage: 'Interview'
    };
    
    var test = {
        Outcome__c: '',
        Stage__c: 'Interview',
        Job_Offers__r: {
            records: [
                {
                    Status__c: 'Hired'
                }
            ]
        }
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('statusText'), test.Stage__c + ' (' + test.Job_Offers__r.records[0].Status__c + ')'); 
    });
});

test('Method: statusText - when Outcome__c is empty,  Stage__c and offerStage are equal and Job_Offers__r is not empty - should return Stage__c + (Status__c)', function() {
    expect(1);

    var parentControllerContent = {
        offerStage: 'Interview'
    };
    
    var test = {
        Outcome__c: '',
        Stage__c: 'Interview',
        Status__c: 'Hired'
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    Ember.run(function() {
        ctrl.set('content', test);
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('statusText'), test.Stage__c + ' (' + test.Status__c + ')'); 
    });
});

// otherAppText
var localeString = moment.localeData("{!userLocale}");
test('Method: otherAppText - when Outcome__c is empty,  Stage__c and offerStage are equal and Job_Offers__r is not empty - should return Stage__c + (Status__c)', function() {
    expect(1);

    var parentControllerContent = {
        otherApps: {
            Contact: {
                before: [1],
                after: [1, 2]
            }
        }
    };
    
    var test = {
        Contact__c: 'Contact',
        CreatedDate: '2015-1-22'
    };

    var labels = {
        others: 'Others',
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    var otherAppTextResult = '(' + (parentControllerContent.otherApps.Contact.before.length +
                 parentControllerContent.otherApps.Contact.after.length) + ' ' + labels.others + ')';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('Contact__c', 'Contact');
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('otherAppText'), otherAppTextResult);
    });
});

var localeString = moment.localeData("{!userLocale}");
test('Method: otherAppText - when Outcome__c is empty,  Stage__c and offerStage are equal and Job_Offers__r is not empty - should return Stage__c + (Status__c)', function() {
    expect(1);

    var parentControllerContent = {
        otherApps: {
            Contact: {
                before: [],
                after: [1, 2]
            }
        }
    };
    
    var test = {
        Contact__c: 'Contact',
    };

    var labels = {
        others: 'Others',
        since: new Date("2007-04-25T01:32:21.196+0600")
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    var result = '(' + (parentControllerContent.otherApps.Contact.before.length +
                 parentControllerContent.otherApps.Contact.after.length) + ' ' + labels.since + ')';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('Contact__c', 'Contact');
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('otherAppText'), result); 
    });
});

test('Method: otherAppText - when Outcome__c is empty,  Stage__c and offerStage are equal and Job_Offers__r is not empty - should return Stage__c + (Status__c)', function() {
    expect(1);

    var parentControllerContent = {
        otherApps: {
            Contact: {
                before: [],
                after: []
            }
        }
    };
    
    var test = {
        Contact__c: 'Contact',
    };

    var labels = {
        others: 'Others',
        since: new Date("2007-04-25T01:32:21.196+0600"),
        before: new Date("2010-04-25T01:32:21.196+0600"),
    };

    var ctrl = this.subject();
    ctrl.set('parentController', new App.ApplicantDashboardController);
    var parentCtrl = ctrl.get('parentController');

    var result = '(' + (parentControllerContent.otherApps.Contact.before.length +
                 parentControllerContent.otherApps.Contact.after.length) + ' ' + labels.before + ')';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('Contact__c', 'Contact');
        parentCtrl.set('content', parentControllerContent);
        ctrl.set('parentController', parentCtrl);

        deepEqual(ctrl.get('otherAppText'), result); 
    });
});

// cardErrorType
test('Method: cardErrorType - when Outcome__c is not empty - should return an empty string', function() {
    expect(1);
    
    var test = {
        Outcome__c: 'not empty',
    };

    var labels = {
    };

    var ctrl = this.subject();

    var result = '';

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('cardErrorType'), result); 
    });
});

test('Method: cardErrorType - when Outcome__c is equal to Problem - should return has-problem-error', function() {
    expect(1);
    
    var test = {
        Outcome__c: '',
    };

    var labels = {
    };

    var ctrl = this.subject();

    var result = 'has-problem-error';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('cardColor', 'Problem')

        deepEqual(ctrl.get('cardErrorType'), result); 
    });
});

test('Method: cardErrorType - when Outcome__c is equal to Warning - should return has-problem-warning', function() {
    expect(1);
    
    var test = {
        Outcome__c: '',
    };

    var labels = {
    };

    var ctrl = this.subject();

    var result = 'has-problem-warning';

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.set('cardColor', 'Warning')

        deepEqual(ctrl.get('cardErrorType'), result); 
    });
});

// linkedInLinkText
test('Method: linkedInLinkText - when LinkedIn_Profile_Id__c is not empty - should return cardProfile label', function() {
    expect(1);
    
    var test = {
        LinkedIn_Profile_Id__c: 'id',
    };

    var labels = {
        cardProfile: 'Card Profile',
        cardSearch: 'Card Search'
    };

    var ctrl = this.subject();
    var result = labels.cardProfile;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('linkedInLinkText'), result); 
    });
});

test('Method: linkedInLinkText - when LinkedIn_Profile_Id__c is not empty - should return cardSearch label', function() {
    expect(1);
    
    var test = {
        LinkedIn_Profile_Id__c: '',
    };

    var labels = {
        cardProfile: 'Card Profile',
        cardSearch: 'Card Search'
    };

    var ctrl = this.subject();
    var result = labels.cardSearch;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('linkedInLinkText'), result); 
    });
});

// linkedInAddress
test('Method: linkedInAddress - when LinkedIn_Profile_Id__c is not empty - should return linkedIn address', function() {
    expect(1);
    
    var test = {
        LinkedIn_Profile_Id__c: 'id'
    };

    var ctrl = this.subject();
    var result = 'https://www.linkedin.com/profile/view?id=' + test.LinkedIn_Profile_Id__c;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('linkedInAddress'), result); 
    });
});

test('Method: linkedInAddress - when LinkedIn_Profile_Id__c is empty - should return searched for linkedIn address results', function() {
    expect(1);
    
    var test = {
        LinkedIn_Profile_Id__c: '',
        First_Name__c: 'John',
        Last_Name__c: 'Smith'
    };

    var ctrl = this.subject();
    var result = 'https://www.linkedin.com/pub/dir/?first=' + test.First_Name__c + '&last=' + test.Last_Name__c;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('linkedInAddress'), result); 
    });
});

// loadAddress
test('Method: loadAddress - should return full address', function() {
    expect(1);
    
    var test = {
        Street_Address__c: 'NorthAve',
        City__c: 'Chicago',
        State_Province__c: 'IL',
        Country__c: 'US'
    };

    var ctrl = this.subject();
    var result = 'https://www.google.com/maps/place/' + test.Street_Address__c + ' ' + test.City__c + ' ' + test.State_Province__c + ' ' + test.Country__c;

    Ember.run(function() {
        ctrl.set('content', test);
        deepEqual(ctrl.get('loadAddress'), result); 
    });
});




