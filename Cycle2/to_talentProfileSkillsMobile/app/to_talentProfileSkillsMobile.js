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



App.SkillsView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {

            // iPhone CSS mod to handle scrolling with the containing div insted of the iframe
            // When Mobile Safari fixes how it resizes iframes to content, this can go away.
            if (navigator.userAgent.match(/iPhone/i) 
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)) {  
                $('#mobileMainView').css({
                                    'max-height' : window.innerHeight,
                                    'overflow-y' : 'scroll',
                                    '-webkit-overflow-scrolling' : 'touch'
                                });
            }
        });
    }
});



App.MainController = Ember.ObjectController.extend({
    currentSkills: function(){
        var arr = this.get('skills');
        return arr;
    }.property('skills'),


    searchSkills: function() {
        var self = this;
        var skills = self.get('skills');

        if(self.get('searchType') == 'searchUsers'){
            selectedUsers.forEach(function(user){
                userIds.push(user.Id);
            })
        }

        var params = {
            skillName : self.get('name'),
        }
        
        cont.foundSkills(JSON.stringify(params), function(jsonString, results){
            var parsedResults = JSON.parse($('<div>').html(jsonString).text()).data;
            parsedResults.relatedItems = parsedResults.relatedItems.sortBy('Name').slice(0, 5);
        });
    },

    actions: {
        addSkill: function(){
            this.get('skills').addObject(Ember.Object.create({
                Name : ''
            }));
        },
        clickSave: function() {
            var skills = this.get('skills');
            
            var saveObj = {
                skills: this.get('skills').getEach('Name'),
                tpId: parsedTalentProfileMap.tpId
            };
            console.log(skills);
            
            cont.saveSkills(JSON.stringify(saveObj), function(jsonString, results) {
                sforce.one.navigateToSObject(parsedTalentProfileMap.tpId);
            });
        }
    }
});

App.ItemsController = Ember.ObjectController.extend({
    needs: ['main'],
    skillsBinding: 'controllers.main.skills',
    selectedSkill: function() {
        return this.get('Name');
    }.property(),
    showSearchBox: function() {
        return !Ember.isEmpty(this.get('Name')) && this.get('selectedSkill') !== this.get('Name');
    }.property('Name', 'selectedSkill'),
    didNameChange: function() {
        var self = this;
        var selectedSkill = this.get('selectedSkill');
        var currentName = this.get('Name');

        if (selectedSkill !== currentName) {
            if(!Ember.isEmpty(currentName)){
                clearTimeout(searchTimer);
                searchTimer = window.setTimeout(function(){
                    self.searchSkills();
                }, 200)
            } else {
                clearTimeout(searchTimer);
                self.set('foundSkills', null);
            }
        }
    }.observes('Name'),
    searchSkills: function() {
        var self = this;
        var selectedSkills = self.get('skills');
        var selectedSkillIds = [];

        selectedSkills.forEach(function(skill){
            if(skill.Id){
                selectedSkillIds.addObject(skill.Id);
            }
        });

        var params = {
            searchParam : self.get('Name'),
            selectedSkills : selectedSkillIds,
        }
        
        cont.searchSkills(JSON.stringify(params), function(jsonString, results){
            var parsedResults = JSON.parse($('<div>').html(jsonString).text()).data;
            self.set('foundSkills', parsedResults.skills);
        });
    },
    actions : {
        deleteSkill : function(type){
            this.get('skills').removeObject(this.get('model'));
        },
        selectSkill: function(name, id) {
            this.setProperties({
                Id : id,
                Name : name,
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
            skills.push(skillsAssertion.Skill__r);
        });

        console.log('####');
        console.log(skills);
        
        
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

