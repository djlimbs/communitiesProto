jsonString = '{"app":{"attributes":{"type":"Application__c","url":"/services/data/v32.0/sobjects/Application__c/a01j0000002TUyYAAW"},"Name":"Application 1","Requisition__c":"a0Kj0000000fhqsEAA","Id":"a01j0000002TUyYAAW","Requisition__r":{"attributes":{"type":"Requisition__c","url":"/services/data/v32.0/sobjects/Requisition__c/a0Kj0000000fhqsEAA"},"Job_Title__c":"Manager","Id":"a0Kj0000000fhqsEAA"}}}';
publisher = '';
apiKey = '123';
namespace = 'tobase13__';

emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';


moduleFor('controller:Main', 'Main Controller', {

});

// hasValidationError
test('Property: hasValidationError - when errorMsg is empty - should return false', function() {
    expect(1);
    var test = {
        errorMsg: '',
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasValidationError'), result);       
    });
});

test('Property: hasValidationError - when errorMsg is not empty - should return true', function() {
    expect(1);
    var test = {
        errorMsg: 'not empty',
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('hasValidationError'), result);       
    });
});

// chooseLike
test('Property: chooseLike - when Positive_Feedback__c equals 1 - should return true', function() {
    expect(1);
    var test = {
        Positive_Feedback__c: 1,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseLike'), result);       
    });
});

test('Property: chooseLike - when Positive_Feedback__c does not equal 1 - should return false', function() {
    expect(1);
    var test = {
        Positive_Feedback__c: 0,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseLike'), result);       
    });
});

// chooseDislike
test('Property: chooseDislike - when Negative_Feedback__c equals 1 - should return true', function() {
    expect(1);
    var test = {
        Negative_Feedback__c: 1,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseDislike'), result);       
    });
});

test('Property: chooseDislike - when Negative_Feedback__c does not equal 1 - should return false', function() {
    expect(1);
    var test = {
        Negative_Feedback__c: 0,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseDislike'), result);       
    });
});

// chooseUnknown
test('Property: chooseUnknown - when Neutral__c equals 1 - should return true', function() {
    expect(1);
    var test = {
        Neutral__c: 1,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseUnknown'), result);       
    });
});

test('Property: chooseUnknown - when Neutral__c does not equal 1 - should return false', function() {
    expect(1);
    var test = {
        Neutral__c: 0,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseUnknown'), result);       
    });
});

// chooseDisqualified
test('Property: chooseDisqualified - when Rejected__c is true - should return true', function() {
    expect(1);
    var test = {
        Rejected__c: true,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseDisqualified'), result);       
    });
});

test('Property: chooseDisqualified - when Rejected__c is false - should return false', function() {
    expect(1);
    var test = {
        Rejected__c: false,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseDisqualified'), result);       
    });
});

// chooseSelected
test('Property: chooseSelected - when Selected__c is true - should return true', function() {
    expect(1);
    var test = {
        Selected__c: true,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseSelected'), result);       
    });
});

test('Property: chooseSelected - when Selected__c is false - should return false', function() {
    expect(1);
    var test = {
        Selected__c: false,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('chooseSelected'), result);       
    });
});

// showDisposition
test('Property: showDisposition - when Rejected__c is true - should return true', function() {
    expect(1);
    var test = {
        Rejected__c: true,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showDisposition'), result);       
    });
});

test('Property: showDisposition - when Rejected__c is false - should return false', function() {
    expect(1);
    var test = {
        Rejected__c: false,
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('showDisposition'), result);       
    });
});

// selectedFinalOutcome
test('Property: selectedFinalOutcome - when selectedType is empty - should return false', function() {
    expect(2);
    var test = {
        selectedType: '',
    };

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        ctrl.set('content', test);

        deepEqual(ctrl.get('selectedFinalOutcome'), result);   
        deepEqual(ctrl.get('Rejected__c'), result);     
    
    });
});

// hasFeedback
test('Property: hasFeedback - should return false', function() {
    expect(1);

    var ctrl = this.subject();
    var result = false;

    Ember.run(function() {
        deepEqual(ctrl.get('hasFeedback'), result);       
    });
});

// saveFeedback
test('Property: saveFeedback - when Rejected__c is false - should return false', function() {
    expect(1);
    var test = {
        hasFeedback: false,
    };

    var ctrl = this.subject();
    var result = true;

    Ember.run(function() {
        ctrl.set('content', test);
        ctrl.send('saveFeedback');

        deepEqual(ctrl.get('feedbackError'), result);   
    });
});














