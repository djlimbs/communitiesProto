// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

monthMap = {}

App.TalentProfileViewRoute = Ember.Route.extend({
    model: function (){
        parsedTalentProfileMap.tpFields.forEach(function(f) {
            f.value = parsedTalentProfileMap.talentProfile[f.name];
        });

        monthMap = parsedTalentProfileMap.monthMap
        return parsedTalentProfileMap;
    }
});

App.TalentProfileViewController = Ember.ObjectController.extend({
    actions: {
        clickEdit: function() {
            var destUrl = '/' + ;
            if (isSF1) {
                sforce.one.navigateToURL(destUrl);
            } else {
                parent.window.location.href = destUrl;
            }
        },
        navigation : function(link){
            if(isSF1){

            } else {
                link.replace('http://', '').replace('https://', '');
                window.open('http://' + link);
            }
        }
    }
});

// Router
App.Router.map(function() {
    this.resource('talentProfileView', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

Ember.Handlebars.helper('pluralfication', function(records, name) {
    if(records.length > 1){
        if(name.charAt(name.length) == 'y'){
            return name.slice(0, name.length - 1) + 'ies';
        } else {
            return name + 's';
        }
    } else {
        return name;
    }
});

Ember.Handlebars.helper('displayDate', function(startDate, endDate, text) {
    if(Ember.isEmpty(startDate)){
        return '';
    } else if(Ember.isEmpty(endDate)){
        return (startDate + ' ' + text + ' Present')
    } else {
        return (startDate + ' ' + text + endDate)
    }
});

Ember.Handlebars.helper('displayMonthYear', function(startMonth, startYear, endMonth, endYear, text) {
    console.log(startMonth);
    if(Ember.isEmpty(startMonth) && Ember.isEmpty(startYear)){
        return '';
    } else if(Ember.isEmpty(endMonth) && Ember.isEmpty(endYear)){
        return (monthMap[startMonth] + ' ' + startYear + ' ' + text + ' Present');
    } else {
        return (monthMap[startMonth] + ' ' + startYear + ' ' + text + ' ' + monthMap[endMonth] + ' ' + endYear) ;
    }
});
