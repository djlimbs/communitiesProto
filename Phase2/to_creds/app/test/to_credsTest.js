emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';

// Main Controller
moduleFor('controller:main', 'Main Controller', {});

// main.init, main.checkHealth
test('Main Init', function() {
    expect(1);

    var ctrl = this.subject();
    
    // NO ERROR
    Ember.run(function() {
        var cont = {
            checkHealth: function(callback) {
                var res = "{\"errorMessages\":[],\"data\":{\"response\":\"{\\\"status\\\":\\\"UP\\\"}\"}}";
                var resObj;
                
                callback(res, resObj);
            }
        };
        
        ctrl.init();
        deepEqual(ctrl.get('connectionMessage'), null);
    });
    
    // ERROR
    Ember.run(function() {
        var cont = {
            checkHealth: function(callback) {
                var res = "{\"errorMessages\":[\"ERROR\"]}";
                var resObj;
                
                callback(res, resObj);
            }
        };
        
        ctrl.init();
        deepEqual(ctrl.get('connectionMessage'), labels.connectionError);
    });
});


moduleFor('controller:main', 'Main Controller', {
    needs: ["controller:main"]
});

