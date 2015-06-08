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
        parsedTalentProfileMap.isSF1 = isSF1;
        return parsedTalentProfileMap;
    }
});

App.TalentProfileViewController = Ember.ObjectController.extend({
    actions: {
        clickImportLinkedIn: function(){
            var url = encodeURIComponent(window.location.href.split('&')[0]);

            var oauthObj = {
                redirectUri : url
            }

            cont.getLinkedInRedirect(JSON.stringify(oauthObj), function(res, evt) {
                var parsedResult = parseResult(res);
                console.log(parsedResult);
                var targetUrl = parsedResult.data.targetUrl;

                window.location.href = targetUrl;
            });
        },
        clickEdit: function() {
            var destUrl = '/' + this.get('talentProfile').Id;
            if (isSF1) {
                sforce.one.navigateToSObject(this.get('talentProfile').Id);
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
        if(name.charAt(name.length - 1) == 'y'){
            return name.slice(0, name.length - 1) + 'ies';
        } else {
            return name + 's';
        }
    } else {
        return name;
    }
});

Ember.Handlebars.helper('convertNewLinesToBreaks', function(text, name) {
    if(text){
        return new Ember.Handlebars.SafeString(text.replace(/\n/g, '<br/>'));
    } else {
        return '';
    }
});

Ember.Handlebars.helper('formatDate', function(startDate) {
    return moment(startDate).format('MMM DD, YYYY');
});

Ember.Handlebars.helper('displayDate', function(startDate, endDate, text) {
    if(Ember.isEmpty(startDate)){
        return '';
    } else if(Ember.isEmpty(endDate)){
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' Present')
    } else {
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' ' + moment(startDate).format('MMM DD, YYYY'))
    }
});

Ember.Handlebars.helper('displayMonthYear', function(startMonth, startYear, endMonth, endYear, text) {
    if(Ember.isEmpty(startMonth) || Ember.isEmpty(startYear)){
        return '';
    } else if(Ember.isEmpty(endMonth) && Ember.isEmpty(endYear)){
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        return (formattedStartMonth + ' ' + startYear + ' ' + text + ' Present');
    } else {
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        formattedEndMonth = monthMap[endMonth] ? monthMap[endMonth].slice(0, 3) : '';

        return formattedStartMonth + ' ' + startYear + ' ' + text + ' ' + formattedEndMonth + ' ' + endYear ;
    }
});