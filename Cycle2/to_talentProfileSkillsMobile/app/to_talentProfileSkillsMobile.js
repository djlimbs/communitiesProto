// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

var searchTimer = null;

// App.SkillsView = Ember.View.extend({
//     afterRenderEvent: function() {
//         scrollToTop();
//     }
// });



App.MainView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            if (window.innerHeight !== 0 && window.innerHeight < 65) {
                this.set('controller.isMobile', true);
            } else {
                this.set('controller.isMobile', false);
            }
        });
    }
});



App.MainController = Ember.ObjectController.extend({
    isMobile: false,
    selectedSkills: function(){
        var self = this;
        return self.get('skills');
    }.property('skills'),
    actions: {
        addSkill: function(){
            this.get('skills').addObject(Ember.Object.create({
                Name : ''
            }));
        },
        clickSave: function() {
            var self = this;
            var skills = this.get('skills');

            var eachSkill = [];
            skills.forEach(function(skill){
                if (!Ember.isEmpty(skill.name)) {
                    if (skill.name.trim().length != 0) {
                        eachSkill.push(skill.name);
                    }
                };
            });
            
            var saveObj = {
                skills: eachSkill,
                tpId: parsedTalentProfileMap.tpId
            };
            
            cont.saveSkills(JSON.stringify(saveObj), function(jsonString, results) {
                sforce.one.navigateToSObject(parsedTalentProfileMap.tpId);
            });
        },
    }
});

App.ItemsController = Ember.ObjectController.extend({
    needs: ['main'],
    skillsBinding: 'controllers.main.skills',

    
    searchParamLength: 2,
    skillNameDoesNotExist: true,
    doesSkillNameExist: function(){
        var self = this;
        var skillsAssertion = self.get('skills').slice(0, self.get('skills.length')-1);
        var skillsArray = [];

        skillsAssertion.forEach(function(skill){
            skillsArray.push(skill.name);
        });

        searchParam = self.get('name');

        if (searchParam) {
            if (skillsArray.indexOf(searchParam) == -1 && searchParam.length >= self.get('searchParamLength')) {
                self.set('skillNameDoesNotExist', true);
            } else {
                self.set('skillNameDoesNotExist', false);
            };
        };
    }.observes('name'),

    selectedSkill: function() {
        return this.get('name');
    }.property(),
    showSearchBox: function() {
        return !Ember.isEmpty(this.get('name')) && this.get('selectedSkill') !== this.get('name') 
                && (this.get('skillNameDoesNotExist') == true || this.get('foundSkills.length') > 0);
    }.property('name', 'selectedSkill', 'skillNameDoesNotExist', 'foundSkills'),
    didNameChange: function() {
        var self = this;
        var selectedSkill = this.get('selectedSkill');
        var searchParam = this.get('name');


        // if (selectedSkill !== searchParam) {
        if (searchParam) {
            console.log('SEARCH PARAM LENGTH', searchParam.length);



            if(!Ember.isEmpty(searchParam) && searchParam.length >= self.get('searchParamLength')){
                clearTimeout(searchTimer);
                searchTimer = window.setTimeout(function(){
                    self.searchSkills();
                }, 200)
            } else {
                clearTimeout(searchTimer);
                self.set('foundSkills', null);
            }
        }
    }.observes('name'),
    searchSkills: function() {
        var self = this;
        var selectedSkills = self.get('skills');
        var selectedSkillNames = [];
        var selectedSkillIds = [];

        selectedSkills.forEach(function(skill){
            if(skill.name){
                selectedSkillNames.addObject(skill.name);
            }

            if(skill.id){
                selectedSkillIds.addObject(skill.id);
            }
        });

        var params = {
            searchParam: self.get('name'),
            selectedSkillNames: selectedSkillNames,
            selectedSkillIds: selectedSkillIds,
        }
        
        cont.searchSkills(JSON.stringify(params), function(jsonString, results){
            var parsedResults = JSON.parse($('<div>').html(jsonString).text()).data;
            self.set('foundSkills', parsedResults.skills);

            console.log('RES: ', parsedResults.skills)

        });
    },
    actions : {
        deleteSkill : function(type){
            this.get('skills').removeObject(this.get('model'));
        },
        selectSkill: function(name, id) {
            this.setProperties({
                id : id,
                name : name,
                selectedSkill : name,
                foundSkills : null
            });
        }
    }
});




App.MainRoute = Ember.Route.extend({
    model: function (){
        var skillsAssertions = parsedTalentProfileMap.skillsAssertions;
        var skills = [];

        skillsAssertions.forEach(function(skillsAssertion){
            var skillsAssertion = skillsAssertion;
            var skillsAssertionObj = {
                name: skillsAssertion.Skill__r.Name,
                id: skillsAssertion.Skill__r.Id
            };
            skills.push(skillsAssertionObj);
        });
        
        return Ember.Object.create({
            skills: skills,
        });
    }
});


// // Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
// App.Router.reopen( {
//     location: 'none'
// });

Ember.ControllerMixin.reopen({
   labels: labels
});

    



