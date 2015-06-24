// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.Fixtures = Ember.Object.create({
    authedIn: false
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

App.MainController = Ember.ObjectController.extend({
    loadCalendarData: function() {
        var self = this;

        if (App.Fixtures.get('authedIn') === true) {
            gapi.client.load('calendar', 'v3', getAllCalendars);
            
            function getAllCalendars() {
                var request = gapi.client.calendar.calendarList.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                });
            
                request.execute(function(resp) {
                    var calendars = resp.items;

                    if (!Ember.isEmpty(calendars)) {
                        var reqBody = {
                            timeMin: moment().format(),
                            timeMax: moment().add('days', 15).format(),
                            items: []
                        };

                        calendars.forEach(function(cal) {
                            reqBody.items.addObject({
                                id: cal.id
                            });
                        });

                        var request = gapi.client.calendar.freebusy.query(reqBody);

                        request.execute(function(resp) {
                            console.log(resp);
                            var freeBusy = Object.keys(resp.calendars).map(function(cal) {
                                return {
                                    summary: calendars.findBy('id', cal).summary,
                                    items: resp.calendars[cal].busy
                                };
                            });

                            self.set('freeBusy', freeBusy);
                        });
                        /* Get calendar info for each
                        var calendarIds = calendars.getEach('id');
                        console.log(calendars);
                        var calFunctions = [];
                        calendars.forEach(function(cal) {
                            var getCal = new Ember.RSVP.Promise(function(resolve, reject) {
                                var request = gapi.client.calendar.events.list({
                                    'calendarId': cal.id,
                                    'timeMin': (new Date()).toISOString(),
                                    'showDeleted': false,
                                    'singleEvents': true,
                                    'maxResults': 10,
                                    'orderBy': 'startTime'
                                });

                                request.execute(function(resp) {
                                    resolve(resp);
                                });
                            });

                            calFunctions.push(getCal);
                        });

                        Ember.RSVP.Promise.all(calFunctions).then(
                            function(values) {
                                self.set('calendars', values);
                                console.log(values);
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                        */
                    }
                });
            }  
        }
    }.observes('App.Fixtures.authedIn'),
    isOauthedIn: function() {
        return App.Fixtures.get('authedIn');
    }.property('App.Fixtures.authedIn'),
    actions: {
        clickOauth: function() {
            gapi.auth.authorize(
            {
              'client_id': CLIENT_ID,
              'scope': SCOPES,
              'immediate': true
            }, handleAuthResult);

            // REST
            /*var oauthOptions = {
                response_type: 'code',
                client_id: '691270253096-16dcihcc0fhee29e0krtpkq4kntnisvc.apps.googleusercontent.com',
                login_hint: 'victor@appiphony.com',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                scope: 'https://www.googleapis.com/auth/calendar'
            };
            var oauthUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=' + oauthOptions.client_id
                            + '&response_type=' + oauthOptions.response_type
                            + '&login_hint=' + oauthOptions.login_hint
                            + '&redirect_uri=' + oauthOptions.redirect_uri
                            + '&scope=' + oauthOptions.scope;

            window.location.href = oauthUrl;*/
        },
        clickExchangeOauth: function() {
            var oauthOptions = {
                client_id: 'e5e0d681-2624-4077-b78f-a4605e2c376c',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                response_type: 'token',
                prompt: 'admin_consent',
                resource: encodeURIComponent('https://outlook.office365.com/')
            };

            var oauthUrl = 'https://login.microsoftonline.com/6dd604e1-c20e-4413-998f-b446d4a15a0c/oauth2/authorize?api-version=1.0'
                            + '&response_type=' + oauthOptions.response_type
                            + '&redirect_uri=' + oauthOptions.redirect_uri
                            + '&client_id=' + oauthOptions.client_id
                            //+ '&prompt=' + oauthOptions.prompt
                            + '&resource=' + oauthOptions.resource;

            window.location.href = oauthUrl;
        }
    }
});

App.CalendarEventController = Ember.ObjectController.extend({
    timeRange: function() {
        var start = this.get('start');
        var end = this.get('end');
        var dateFormat = 'MMM DD, YYYY - h:mm';

        if (!Ember.isEmpty(start) && !Ember.isEmpty(end)) {
            var startVal = start.dateTime || start.date;
            var endVal = end.dateTime || end.date;

            return moment(startVal).format(dateFormat) + ' to ' + moment(endVal).format(dateFormat);
        } else {
            return null;
        }
    }.property('start', 'end')
});

App.FreeBusyController = Ember.ObjectController.extend({
    timeRange: function() {
        var startVal = this.get('start');
        var endVal = this.get('end');
        var dateFormat = 'MMM DD, YYYY - h:mm';

        return moment(startVal).format(dateFormat) + ' to ' + moment(endVal).format(dateFormat);
    }.property('start', 'end')
});

App.MainRoute = Ember.Route.extend({

    model: function (){
        // Outlook TOKEN

        var lochash    = location.hash.substr(1),
            outlookToken = lochash.substr(lochash.indexOf('access_token='))
                          .split('&')[0]
                          .split('=')[1];
        var calendarDataUrl = 'https://outlook.office365.com/api/v1.0/me/events';

        var reqOptions = {

        };

        $.ajax(
            {
                url: calendarDataUrl,
                type: 'GET',
                
                beforeSend: function (xhr){ 
                    xhr.setRequestHeader('Authorization', 'Bearer ' + outlookToken); 
                },
                success: function(json) {
                    console.log(json);
                },
                failure: function(jqXHR, textStatus, err) {
                    console.log(jqXHR);
                }
            }
        );

        // EXCHANGE OAUTH

        /*
        var code = getUrlParameter('code');

        if (!Ember.isEmpty(code)) {
            var tokenOptions = {
                client_id: 'e5e0d681-2624-4077-b78f-a4605e2c376c',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                client_secret: '4PIShvsL9+ZObPMFqk0runOuvhoj8x0zBBcRv/Pl+zA=',
                code: code,
                resource: encodeURIComponent('https://outlook.office365.com/')
            };

            var tokenUrl = 'https://login.microsoftonline.com/6dd604e1-c20e-4413-998f-b446d4a15a0c/oauth2/token?api-version=1.0';

            $.ajax(
                {
                    url: tokenUrl,
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    data: {
                        code: tokenOptions.code,
                        redirect_uri: tokenOptions.redirect_uri,
                        client_id: tokenOptions.client_id,
                        client_secret: tokenOptions.client_secret,
                        grant_type: 'authorization_code',
                        resource: tokenOptions.resource
                    },
                    cache: false,
                    success: function(json) {
                        console.log(json);

                        
                        $.ajax(
                            {
                                url: url,
                                type: 'GET',
                                cache: false,
                                success: function(json) {
                                    console.log(json);
                                    return {};
                                },
                                error: function(jqXHR, textStatus, err) {
                                    console.log(jqXHR);
                                    return {};
                                }
                            }
                        );

                    },
                    error: function(jqXHR, textStatus, err) {
                        console.log(jqXHR);
                    }
                }
            );
        }        
        */
      

        // REST STYLE

        /*
        var code = getUrlParameter('code');

        if (!Ember.isEmpty(code)) {
            var keyUrl = 'https://www.googleapis.com/oauth2/v3/token?code=' + code +
                         '&client_id=691270253096-16dcihcc0fhee29e0krtpkq4kntnisvc.apps.googleusercontent.com' + 
                         '&client_secret=GXxKZ7qW1qJjpW6hXY28EW1E' +
                         '&redirect_uri=https://c.na24.visual.force.com/apex/protoGCal' +
                         '&grant_type=authorization_code';

            
            $.ajax(
                {
                    url: keyUrl,
                    type: 'POST',
                    cache: false,
                    success: function(json) {
                        var access_token = json.access_token;
                        
                        var url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=5&access_token=' + access_token;

                        $.ajax(
                            {
                                url: url,
                                type: 'GET',
                                cache: false,
                                success: function(json) {
                                    console.log(json);
                                    return {};
                                },
                                error: function(jqXHR, textStatus, err) {
                                    console.log(jqXHR);
                                    return {};
                                }
                            }
                        );

                    },
                    error: function(jqXHR, textStatus, err) {
                        console.log(jqXHR);
                    }
                }
            );
            
        } else {
            return {};
        }*/
        return {};
    }
});



// // Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

