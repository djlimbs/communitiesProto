// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});



App.Select2Component = Ember.TextField.extend({
    attributeBindings: ['multiple', 'data-qa-input'],
    multiple: true,
    didInsertElement: function() {
        var self = this;
        this.$().select2({
            minimumInputLength: 2,
            placeholder: 'Add Skills',
            tags: [],
            formatNoMatches: 'No Skills',
            tokenSeparators: [',']
        });
    }
});

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
        
        cont(JSON.stringify(params), function(jsonString, results){
            var parsedResults = JSON.parse($('<div>').html(jsonString).text()).data;
            parsedResults.relatedItems = parsedResults.relatedItems.sortBy('Name').slice(0, 5);
        });
    },

    actions: {
        addSkill: function(){
            this.get('skills').addObject(Ember.Object.create({
                Name : 'C#'
            }));
        }
    }
});

App.ItemsController = Ember.ObjectController.extend({
    needs: ['main'],
    skillsBinding: 'controllers.main.skills',

    actions : {
        deleteSkill : function(type){
            console.log('HALO');
            this.get('skills').removeObject(this.get('model'));
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

