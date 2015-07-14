// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

var searchTimer = null;



// App.AddSkillsComponent = Ember.Component.extend({
//     keyPress: function (e) {
//         var self = this;

//         if (e.which === 13) {
//             console.log('enter')
//             self.$('#skill-results').find('.active').find('#href').click();
//             console.log('THIS', self);
//             // console.log('SENT')
//             // console.log(this.get('controllers:main').get('searchParam'));

//             // this.send('selectSkill', this.get('searchParam'));
//         } 
//     },
//     keyDown: function (e) {
//         var key = e.keyCode;

//         var $listItems = $('.js-skill');

//         if ($(input).val().length >= 1) {

//             var key = e.which;
//             var $selected = $listItems.filter('.active');
//             var $current;

//             //if ( key != 40 && key != 38 && key != 13) return;

//             $listItems.removeClass('active');

//             if (key == 40) // Down key
//             {
                
//                 console.log('DOWN')

//                 if ( ! $selected.length || $selected.is(':last-child') ) {
//                     $current = $listItems.eq(0);
//                 }
//                 else {
//                     $current = $selected.next();
//                 }
//                 $current.addClass('active');
//                 $(results).scrollTop($(results).scrollTop() + $('.active').position().top);
//             }
//             else if (key == 38) // Up key
//             {
//                 console.log('UP')

//                 if ( ! $selected.length || $selected.is(':first-child') ) {
//                     $current = $listItems.last();
//                 }
//                 else {
//                     $current = $selected.prev();
//                 }
//                 $current.addClass('active');
//                 $(results).scrollTop($(results).scrollTop() + $('.active').position().top);
//             }
//             // else if ( key == 13 ) // Enter key
//             // {
//             //     console.log('enter')
//             //     console.log('LINK: ', $('body #skill-results .active#li #href'));

//             //     $('body #skill-results .active#li #href').click();


//             //     // $(skillCollection).append('<span class="label label--secondary mar--sm--rxs mar--sm--bxs">' + $($selected).text() + '<span class="mar--sm--lxs inline-block juicon juicon-x text-faded pointer js-remove-skill js-editing"></span>' + '</span>');
//             //     // $(results).slideUp('fast');
//             //     // $(input).val('');
//             //     // checkIfEmpty();
//             //     // $('.js-skill-count').text(parseInt($('.js-skill-count').text())+ 1);

//             // }
//         }
//     }
// });

var input = '#skill-input';
var results = '#skill-results';
var newSkill = '.js-create-skill';
var chosenSkill = '.js-skill';
var skillCollection = '#skill-collection';


function checkIfEmpty(){
    if($('.label').length > 0) {
        $('.js-empty-state').hide();
    } else {
        $('.js-empty-state').show();
    }
}



App.AddSkillsComponent = Ember.Component.extend({
    keyDown: function (e) {
        var key = e.keyCode;

        var $listItems = $('.js-skill');

        if ($(input).val().length >= 1) {

            var key = e.which;
            var $selected = $listItems.filter('.active');
            var $current;

            if ( key != 40 && key != 38 && key != 13) return;

            $listItems.removeClass('active');

            if (key == 40) // Down key
            {
                if ( ! $selected.length || $selected.is(':last-child') ) {
                    $current = $listItems.eq(0);
                }
                else {
                    $current = $selected.next();
                }
                $current.addClass('active');
                $(results).scrollTop($(results).scrollTop() + $('.active').position().top);

                this.set('currentSelectedSkill', $current);
            }
            else if (key == 38) // Up key
            {
                if ( ! $selected.length || $selected.is(':first-child') ) {
                    $current = $listItems.last();
                }
                else {
                    $current = $selected.prev();
                }
                $current.addClass('active');
                $(results).scrollTop($(results).scrollTop() + $('.active').position().top);

                this.set('currentSelectedSkill', $current);
            }
            else if ( key == 13 ) // Enter key
            {
                var selectedLi = this.get('currentSelectedSkill');
                $(selectedLi).find('.link').click();

                // $(skillCollection).append('<span class="label label--secondary mar--sm--rxs mar--sm--bxs">' + $($selected).text() + '<span class="mar--sm--lxs inline-block juicon juicon-x text-faded pointer js-remove-skill js-editing"></span>' + '</span>');
                // $(results).slideUp('fast');
                // $(input).val('');
                // checkIfEmpty();
                // $('.js-skill-count').text(parseInt($('.js-skill-count').text())+ 1);

            }
        }
    },
    currentSelectedSkill: '',
});











// var $listItems = $('.js-skill');

// $('input').keydown(function(e)
// {
//     console.log('HERE');


//     if ($(input).val().length >= 1) {

//         var key = e.keypress,
//                 $selected = $listItems.filter('.active'),
//                 $current;

//         if ( key != 40 && key != 38 && key != 13) return;

//         $listItems.removeClass('active');

//         if ( key == 40 ) // Down key
//         {
//             if ( ! $selected.length || $selected.is(':last-child') ) {
//                 $current = $listItems.eq(0);
//             }
//             else {
//                 $current = $selected.next();
//             }
//             $current.addClass('active');
//             $(results).scrollTop($(results).scrollTop() + $('.active').position().top);
//         }
//         else if ( key == 38 ) // Up key
//         {
//             if ( ! $selected.length || $selected.is(':first-child') ) {
//                 $current = $listItems.last();
//             }
//             else {
//                 $current = $selected.prev();
//             }
//             $current.addClass('active');
//             $(results).scrollTop($(results).scrollTop() + $('.active').position().top);
//         }
//         else if ( key == 13 ) // Enter key
//         {
//             $(skillCollection).append('<span class="label label--secondary mar--sm--rxs mar--sm--bxs">' + $($selected).text() + '<span class="mar--sm--lxs inline-block juicon juicon-x text-faded pointer js-remove-skill js-editing"></span>' + '</span>');
//             $(results).slideUp('fast');
//             $(input).val('');
//             checkIfEmpty();
//             $('.js-skill-count').text(parseInt($('.js-skill-count').text())+ 1);
//         }
//     }
// });





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

App.SkillsView = Ember.View.extend({
    afterRenderEvent: function() {
        scrollToTop();
    }
});


App.MainController = Ember.ObjectController.extend({
    editMode: false,
    searchParamLength: 2,

    currentName: function(){
        return this.get('searchParam');
    }.property('searchParam'),
    skillsText: function(){
        var self = this;
        return self.get('skills.length') == 1 ? 'Skill' : 'Skills';
    }.property('skills.length'),

    skillNameDoesNotExist: true,
    doesSkillNameExist: function(){
        var self = this;
        var skillsAssertion = self.get('skills');
        var skillsArray = [];

        skillsAssertion.forEach(function(skill){
            skillsArray.push(skill.name);
        });

        searchParam = self.get('searchParam');

        if (searchParam) {
            if (skillsArray.indexOf(searchParam) == -1 && searchParam.length >= self.get('searchParamLength')) {
                self.set('skillNameDoesNotExist', true);
            } else {
                self.set('skillNameDoesNotExist', false);
            };
        };
    }.observes('searchParam'),


    numberOfSkills: 0,
    noSkills: function(){

        return (this.get('skills.length') == 0) ? true : false;
    }.property('skills.length'),
    didSkillsChange: function(){
        var self = this;
        self.set('numberOfSkills', self.get('skills').length);
    }.observes('skills.length'),

	selectedSkills: function(){
        var self = this;
        return self.get('skills');
    }.property('skills'),
    selectedSkill: function() {
        return this.get('searchParam');
    }.property(),
    // showSearchBox: function() {
    //     return !Ember.isEmpty(this.get('searchParam')) && this.get('selectedSkill') !== this.get('searchParam');
    // }.property('searchParam', 'selectedSkill'),

    // showSearchBox: function() {
    //     return !Ember.isEmpty(this.get('searchParam')) && this.get('searchParam.length') >= this.get('searchParamLength')
    //             && (this.get('skillNameDoesNotExist') == true || this.get('foundSkills') != null);
    // }.property('searchParam'),

    showSearchBox: function() {
        return !Ember.isEmpty(this.get('searchParam'))
                && (this.get('skillNameDoesNotExist') == true || this.get('foundSkills') != null);
    }.property('searchParam', 'selectedSkill', 'skillNameDoesNotExist', 'foundSkills'),

    didNameChange: function() {
        var self = this;
        var selectedSkill = self.get('selectedSkill');
        var searchParam = self.get('searchParam');

        if (searchParam) {
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
    }.observes('searchParam'),
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
            searchParam: self.get('searchParam'),
            selectedSkillNames: selectedSkillNames,
            selectedSkillIds: selectedSkillIds,
        }
        
        cont.searchSkills(JSON.stringify(params), function(jsonString, results){
            var parsedResults = JSON.parse($('<div>').html(jsonString).text()).data;
            self.set('foundSkills', parsedResults.skills);

            console.log('RES: ', parsedResults.skills)

        });
    },
    actions: {
        clickEdit: function(){
            this.set('tempSkills', JSON.parse(JSON.stringify(this.get('skills'))));
            this.set('editMode', true);
        },
        clickCancel: function(){
            this.set('skills', this.get('tempSkills'));
            this.set('editMode', false);
        },
        clickSave: function() {
            var self = this;
            var skills = this.get('skills');

            console.log('SKILLZ: ', skills)
            
            var saveObj = {
                skills: this.get('skills').getEach('name'),
                tpId: parsedTalentProfileMap.tpId
            };
            
            cont.saveSkills(JSON.stringify(saveObj), function(jsonString, results) {
                if (results.statusCode == 200) {
                    self.set('editMode', false);
                };
            });
        },
        selectSkill: function(name, id) {
            console.log('CLICKED: ');


            var skill = {
                name: name,
                id: id
            };

            var skills = this.get('skills').addObject(skill).sortBy('name');
            this.set('skills', skills);

            this.setProperties({
                id : id,
                name : name,
                selectedSkill : name,
                foundSkills : null,
                searchParam: ''
            });
        },
        deleteSkill : function(id){
            var skill = this.get('skills').findBy('id', id);
            this.get('skills').removeObject(skill);
        }
    }

});


App.MainRoute = Ember.Route.extend({
    model: function (){
        // console.log('#########################');
        // console.log(parsedTalentProfileMap);
        // console.log('#########################');


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
            skills: skills.sortBy('name'),
        });
    }
});


// // Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});


// close results if clicked outside
$('body').on('click', function(){
    $('#skill-results').slideUp('fast');
});

