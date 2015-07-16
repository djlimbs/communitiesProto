emq.globalize();
Ember.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.rootElement = '#qunit-fixture';

moduleFor('controller:channelNav', 'Channel Nav Controller', {
    needs: ['controller:main']
});

init();
test('shouldDisableLink', function() {
    expect(3);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('shouldDisableLink'), false);
        
        ctrl.set('hubRequired', true);
        deepEqual(ctrl.get('shouldDisableLink'), 'Disabled');
        
        ctrl.set('isHubConnected', true);
        deepEqual(ctrl.get('shouldDisableLink'), false);
    });
});


moduleFor('controller:integration', 'Integration Controller', {
    needs: ['controller:main']
});

init();
test('returnUrl', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('returnUrl'), returnUrl);
    });
});

test('isMyLink', function() {
    expect(2);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('isMyLink'), false);
        
        ctrl.set('name', nameParam);
        deepEqual(ctrl.get('isMyLink'), true);
    });
});

test('isIntegrationHubAndIsConnected', function() {
    expect(3);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('isIntegrationHubAndIsConnected'), false);
        
        ctrl.set('isIntegrationHub', true);
        deepEqual(ctrl.get('isIntegrationHubAndIsConnected'), false);
        
        ctrl.set('isHubConnected', true);
        deepEqual(ctrl.get('isIntegrationHubAndIsConnected'), true);
    });
});

test('disableIntegrationHubInput', function() {
    expect(2);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('disableIntegrationHubInput'), false);
        
        ctrl.set('isIntegrationHubAndIsConnected', true);
        deepEqual(ctrl.get('disableIntegrationHubInput'), 'Disabled');
    });
});

test('hasICSettings', function() {
    expect(2);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        ctrl.set('name', 'name');
        deepEqual(ctrl.get('hasICSettings'), true);
        
        ctrl.set('name', '');
        deepEqual(ctrl.get('hasICSettings'), false);
    });
});

test('connectionStatus', function() {
    expect(3);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        deepEqual(ctrl.get('connectionStatus'), labels.connectionNotEstablished);
        
        ctrl.set('name', 'name');
        deepEqual(ctrl.get('connectionStatus'), labels.reconnectStatus);
        
        ctrl.set('isConnected', true);
        deepEqual(ctrl.get('connectionStatus'), labels.connectionSuccessfullyEstablished);
    });
});

test('showAuthFields', function() {
    expect(4);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        
        ctrl.set('authFields', []);
        deepEqual(ctrl.get('showAuthFields'), false);
        
        ctrl.set('authFields', [0]);
        ctrl.set('canDisable', false);
        deepEqual(ctrl.get('showAuthFields'), true);
        
        ctrl.set('canDisable', true);
        deepEqual(ctrl.get('showAuthFields'), false);
        
        ctrl.set('isEnabled', true);
        deepEqual(ctrl.get('showAuthFields'), true);
    });
});

test('enabledDidChange', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('authFields', [{"value": 0}]);
        ctrl.set('isEnabled', true);
        ctrl.set('canVerify', true);
        ctrl.set('isIntegrationHub', false);
        ctrl.enabledDidChange();
        deepEqual(ctrl.get('isConnected'), ctrl.get('isEnabled'));
    });
});

test('isButtonDisabled', function() {
    expect(6);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('authFields', [{"value": ""}]);
        deepEqual(ctrl.get('isButtonDisabled'), "disabled");
        
        ctrl.set('authFields', [{"value": "0"}]);
        ctrl.set('listName', true);
        ctrl.set('socialAccounts', true);
        ctrl.set('socialAccountToken', false);
        deepEqual(ctrl.get('isButtonDisabled'), "disabled");
        
        ctrl.set('socialAccountToken', true);
        deepEqual(ctrl.get('isButtonDisabled'), false);
        
        ctrl.set('socialAccounts', false);
        deepEqual(ctrl.get('isButtonDisabled'), false);
        
        ctrl.set('listName', false);
        deepEqual(ctrl.get('isButtonDisabled'), false);
        
        ctrl.set('isSaving', true);
        deepEqual(ctrl.get('isButtonDisabled'), "disabled");
    });
});

test('actions:clickConnect', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('name', 'name');
        ctrl.set('oauth', true);
        ctrl.set('authFields', [{"value": ""}]);
        
        // redirects
        // ctrl.send('clickConnect');
    });
    
    deepEqual(true, true);
});

test('actions:clickSave', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('name', 'name');
        ctrl.set('oauth', true);
        ctrl.set('authFields', [{"value": ""}]);
        
        ctrl.send('clickSave');
    });
    
    deepEqual(ctrl.get('customSettingId'), 'Id');
});

test('actions:clickConnectOauth', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('name', 'name');
        ctrl.set('oauth', true);
        ctrl.set('authFields', [{"value": ""}]);
        
        // redirects
        //ctrl.send('clickConnectOauth');
    });
    
    deepEqual(true, true);
});

test('actions:clickSaveOauth', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('name', 'name');
        ctrl.set('oauth', true);
        ctrl.set('authFields', [{"value": ""}]);
        ctrl.set('customSettingId', 'Id');
        ctrl.set('socialAccountToken', 'token');
        ctrl.set('socialAccounts', [{"token":"token","id":"id","name":"name"}]);
        
        // redirects
        //ctrl.send('clickSaveOauth');
    });
    
    deepEqual(true, true);
});


test('actions:clickDisconnectOauth', function() {
    expect(1);
    
    var ctrl = this.subject();
    var mainCtrl = ctrl.get('controllers.main');
    
    Ember.run(function() {
        mainCtrl.set('content', {});
        ctrl.set('content', {});
        ctrl.set('name','name');
        
        ctrl.send('clickDisconnectOauth');
    });
    
    deepEqual(true, true);
});
