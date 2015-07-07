// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.Fixtures = Ember.Object.create({
    authedIn: false
});

cert = '-----BEGIN CERTIFICATE-----\n' +
'MIIEjDCCA3SgAwIBAgIJAOH8/2qYwAJ6MA0GCSqGSIb3DQEBBQUAMIGKMQswCQYD\n' +
'VQQGEwJVUzERMA8GA1UECBMISWxsaW5vaXMxEDAOBgNVBAcTB0NoaWNhZ28xEjAQ\n' +
'BgNVBAoTCUFwcGlwaG9ueTEMMAoGA1UECxMDRGV2MQ8wDQYDVQQDEwZWaWN0b3Ix\n' +
'IzAhBgkqhkiG9w0BCQEWFHZpY3RvckBhcHBpcGhvbnkuY29tMB4XDTE1MDcwMjAy\n' +
'MzIyOVoXDTE2MDcwMTAyMzIyOVowgYoxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhJ\n' +
'bGxpbm9pczEQMA4GA1UEBxMHQ2hpY2FnbzESMBAGA1UEChMJQXBwaXBob255MQww\n' +
'CgYDVQQLEwNEZXYxDzANBgNVBAMTBlZpY3RvcjEjMCEGCSqGSIb3DQEJARYUdmlj\n' +
'dG9yQGFwcGlwaG9ueS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB\n' +
'AQDSL53z9ji8AkJKY0maEUZx6LRXGbCuHy4fdZVj3M8Vu/ZX12bZpZYfMQGlJHdK\n' +
'Cbf6sX+5Hja6FyF1cym/xhZbWCl88CjthnVgpx9t/jbIRlfpm+u2BxY7r3BWer0Z\n' +
'8rWLNtMU1b84tod8cwR0LT43+AgaABvdRMgL/JbYE7xIwL41qkExhb7yWBjKvdPu\n' +
'HVc8dSnMX0MBe1COuMxavngHFxuy354NVS0iCT0epdrzzJK4rSwGZ7eKvbtDoqDW\n' +
'3dR5U5Esv6Zc4ciDOSALx7jhop/rnN832d2SAUHJ3ixRWfVYd1Z+LR6P5g/QJoTm\n' +
'75WixCu8rP7BtFnM2HKteVDtAgMBAAGjgfIwge8wHQYDVR0OBBYEFOibTF6JN5lb\n' +
'3XSac40MEgyMip9vMIG/BgNVHSMEgbcwgbSAFOibTF6JN5lb3XSac40MEgyMip9v\n' +
'oYGQpIGNMIGKMQswCQYDVQQGEwJVUzERMA8GA1UECBMISWxsaW5vaXMxEDAOBgNV\n' +
'BAcTB0NoaWNhZ28xEjAQBgNVBAoTCUFwcGlwaG9ueTEMMAoGA1UECxMDRGV2MQ8w\n' +
'DQYDVQQDEwZWaWN0b3IxIzAhBgkqhkiG9w0BCQEWFHZpY3RvckBhcHBpcGhvbnku\n' +
'Y29tggkA4fz/apjAAnowDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEA\n' +
'eWejkCPEm47Z/7OeJMbZpaVKZERbYHV7h8bgCNIPc5LStRue2yD4M1Yy8qE2V9at\n' +
'4crxn199f6BY44iZ8xMvyGPa2QYnjsIvANjV622v8RQSK0J/q4ZajTDFSp12gQFr\n' +
'XWWG0WgOvxpvUaJsr9nKjXEIJu3Pk0kSh8PQbaWfCbPrr3uWLM/6sW7pOhaefTQz\n' +
'sFzm5waDp3zIgnbNo9MMBdxhtbqyVvqXHqtM5Hcf38tInuVtaNPXalCIRUh22G+u\n' +
'gAlmm8AVgVFgnd6PoCNvTxUCbF6OH593pbDkU4Eu1VwUSuFiL8B7kqsJ+ch94KQX\n' +
'au54vQUsbQ9e+mrSfVi2ag==\n' +
'-----END CERTIFICATE-----';

encryptedKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIEogIBAAKCAQEA0i+d8/Y4vAJCSmNJmhFGcei0Vxmwrh8uH3WVY9zPFbv2V9dm\n' +
'2aWWHzEBpSR3Sgm3+rF/uR42uhchdXMpv8YWW1gpfPAo7YZ1YKcfbf42yEZX6Zvr\n' +
'tgcWO69wVnq9GfK1izbTFNW/OLaHfHMEdC0+N/gIGgAb3UTIC/yW2BO8SMC+NapB\n' +
'MYW+8lgYyr3T7h1XPHUpzF9DAXtQjrjMWr54Bxcbst+eDVUtIgk9HqXa88ySuK0s\n' +
'Bme3ir27Q6Kg1t3UeVORLL+mXOHIgzkgC8e44aKf65zfN9ndkgFByd4sUVn1WHdW\n' +
'fi0ej+YP0CaE5u+VosQrvKz+wbRZzNhyrXlQ7QIDAQABAoIBAHjeBw/+vHtpNSO/\n' +
'2thtLLxeXC5mSJKovYY7wM+vb6qI701uQefQ7/Y54T9NLAf4dMMGBXO3qzLyEDyR\n' +
'ICX2zG500U7WcEK++oq9MDa5ZFlhEjb1geOoSaHC7m/cnxfn2XwX5+RoUlFTra/k\n' +
'GGCSj9/xkv8Ypu1kG0HBXCEfoDuZCCuwZWvrMADtuZLaEw5biXtCB4T+gil3qDJp\n' +
'QqAvSmDEHP1sXd51dWWKtysZCcn9MIclWynng6vlKKUiahKauznlzgclSmHRZuVp\n' +
'5/VhQoTfRjoAhOI8O6u/FZoPM6hfVZbK1EHK4ioJDzYrL0Ay9No7oINVRr8WQViY\n' +
'Q5Mr54UCgYEA7ZlUvBLFthih8qvuTDmCJ59QUQvGRwjNF+yl5qp0o7reGAmqli98\n' +
'QagCo7gEAYCabzag0y4NKV5tXtyz23uWNax0LEWvwjtHUN5SVzqE7QCCjOBUXsfF\n' +
'BrwS/0BftvqYH/RybSOTm8IPejjZQc7q1mpQGGx4Qqn5I6QTxZgm54MCgYEA4nbL\n' +
'EYue8okKyl290mjiBbegJOm4kddJ1TMhfOZkwImBA0UnV10kXk1SV0EDKC2jRqUU\n' +
'Vw6OPOGGwsD/eRZCcEWs6ttXo8vFaBOJfVxzWF328z0D1YojRIoXQIaDZg0cGLFd\n' +
'qnSImOGVVn99iR49RPnjdyP1jDG6MJAhS3DTCs8CgYB/1Qsd1QvCmSYophAjup0o\n' +
'LDLOKAOZnEacJJptrC/tF1D+pdS90PaNbJNe+lZNaJ+uTjng5Nn38/HsI9owsCF0\n' +
'5z/pweR6H+KSw8qRW87ApJGYsekyxVBf+zhNVJkqnVDTgHU/+vAj0Rj6rTNWkLkQ\n' +
'e0p0mYdqdoCwiEqK+P2VeQKBgGvW9cxdGEuWRrUm/oV7vGXMk04AnguU4WvM9V1s\n' +
'uP2WfQD5pUpM6EyftV4nb0Fquh2h7pWmMMV8/5cuIHmgx/J+u2D7Iji1iEOPSiGQ\n' +
'LL0fwcEChRjitvikaX4oj9nA1GhNzbSl2YYzpdGS1Ey/QZ3fARpy3TLtWyRU/gXW\n' +
'rCixAoGANSqeDyZUbD5gycIo6votOscXDx5n1TqXCJxQwautRKytRtbFlyosO1E7\n' +
'Kz/odru7+1B/P29dS4Vd2Sk4XFhI6MvPjJ1/rUAWOAYNYTUTFC4i7SxvYQ/bcmli\n' +
'URnvXRLj5uErD2nOvx/IEpETM47Yht+BMSz2U6FSMXI7pyzpeKM=\n' +
'-----END RSA PRIVATE KEY-----';
/*cert = '-----BEGIN CERTIFICATE-----\n' +
'MIIBfTCCASegAwIBAgIBTDANBgkqhkiG9w0BAQUFADAiMQswCQYDVQQGEwJVUzET\n' +
'MBEGA1UECgwKSlMtVEVTVC1DQTAeFw0xMzA1MDEyMzU5NTlaFw0yMzA1MDEyMzU5\n' +
'NTlaMCIxCzAJBgNVBAYTAlVTMRMwEQYDVQQDDApUZXN0IFVzZXIxMFwwDQYJKoZI\n' +
'hvcNAQEBBQADSwAwSAJBAOtpGHibL8Ue+MXPPufkcrNES40rCT5LRIU9MjTZ8/7o\n' +
'wG5bAsiFA9Xxh3uZK1T5QA64jNJVbp2ojHAtNyWPuwsCAwEAAaNIMEYwDAYDVR0T\n' +
'AQH/BAIwADALBgNVHQ8EBAMCB4AwKQYDVR0fBCIwIDAeoBygGoYYaHR0cDovL3Rl\n' +
'c3QuY29tL2pzY2EuY3JsMA0GCSqGSIb3DQEBBQUAA0EAhdWSpPIhyRxkPeV4GzY/\n' +
'FBStyXUqZyRqleidv/3aXkQCvCxV5Y8tZ7yRNy+9Vm9YBGaIaUWUs1CdCENCOX01\n' +
'LA==\n' +
'-----END CERTIFICATE-----';
*/
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
    getOutlookData: function() {
        var outlookToken = App.Fixtures.get('outlookToken');
        if (!Ember.isEmpty(outlookToken)) {
            var calendarDataUrl = 'https://outlook.office365.com/api/v1.0/me/calendars';
            calendarDataUrl = 'https://outlook.office365.com/api/v1.0/users/victor@appiphony.onmicrosoft.com/calendarview?startDateTime=2015-06-15T01:00:00Z&endDateTime=2015-07-10T01:00:00Z';
            calendarDataUrl = 'https://outlook.office365.com/api/v1.0/users/victor@appiphony.onmicrosoft.com/contacts/';
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
        }
    }.observes('App.Fixtures.outlookToken'),
    getOutlookToken: function() {
        var outlookCode = App.Fixtures.get('outlookCode');

        if (!Ember.isEmpty(outlookCode)) {
            /*var tokenOptions = {
                client_id: '4ef594ad-4009-4a5a-a99f-363506bfb342',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                client_secret: 'qh4EkIgocm2MmKhe6zyu9sDf70o+gotRqjyNmx/x6d8=',
                code: outlookCode,
                resource: encodeURIComponent('https://outlook.office365.com/')
            };

            var tokenUrl = 'https://login.microsoftonline.com/4ef594ad-4009-4a5a-a99f-363506bfb342/oauth2/token?api-version=1.0';

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
            );*/
        }
    }.observes('App.Fixtures.outlookCode'),
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
            var self = this;
            // get jwt token

            var certificate = new X509();
            certificate.readCertPEM(cert);

            //var decryptedKeyHex = PKCS5PKEY.getDecryptedKeyHex(encryptedKey, '1234');

            var rsa = KEYUTIL.getKey(encryptedKey);


            // Header
            var oHeader = {alg: 'RS256', x5t: 'esP3MgXN7p3orKVYzGWR0I5lF4Y='};
            // Payload
            var oPayload = {};
            var tNow = KJUR.jws.IntDate.get('now');
            var tEnd = KJUR.jws.IntDate.get('now + 1day');
            oPayload.iss = "e5e0d681-2624-4077-b78f-a4605e2c376c";
            oPayload.sub = "e5e0d681-2624-4077-b78f-a4605e2c376c";
            oPayload.nbf = tNow;
            oPayload.exp = tEnd;
            oPayload.jti = "id123456";
            oPayload.aud = "https://login.microsoftonline.com/6dd604e1-c20e-4413-998f-b446d4a15a0c/oauth2/token";
            // Sign JWT, password=616161
            var sHeader = JSON.stringify(oHeader);
            var sPayload = JSON.stringify(oPayload);
            var sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, rsa);

            var tokenOptions = {
                client_id: 'e5e0d681-2624-4077-b78f-a4605e2c376c',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                grant_type: 'client_credentials',
                client_assertion:sJWT,
                resource: 'https://outlook.office365.com/'
            };

            var tokenUrl = 'https://login.microsoftonline.com/6dd604e1-c20e-4413-998f-b446d4a15a0c/oauth2/token?api-version=1.0';

            $.ajax(
                {
                    url: tokenUrl,
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    data: {
                        client_assertion_type: tokenOptions.client_assertion_type,
                        client_id: tokenOptions.client_id,
                        redirect_uri: tokenOptions.redirect_uri,
                        grant_type: tokenOptions.grant_type,
                        resource: tokenOptions.resource,
                        client_assertion: tokenOptions.client_assertion
                    },
                    cache: false,
                    success: function(json) {
                        App.Fixtures.set('outlookToken', json.access_token);
                    },
                    error: function(jqXHR, textStatus, err) {
                        console.log(jqXHR);
                    }
                }
            );

            /*var oauthOptions = {
                client_id: '4ef594ad-4009-4a5a-a99f-363506bfb342',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                response_type: 'code id_token',
                prompt: 'admin_consent',
                resource: encodeURIComponent('https://c.na24.visual.force.com/apex/protoGCal'),
                scope: 'openid',
                nonce: 'a'
            };

            var oauthUrl = 'https://login.microsoftonline.com/6dd604e1-c20e-4413-998f-b446d4a15a0c/oauth2/authorize?api-version=1.0'
                            + '&response_type=' + oauthOptions.response_type
                            + '&redirect_uri=' + oauthOptions.redirect_uri
                            + '&client_id=' + oauthOptions.client_id
                            + '&prompt=' + oauthOptions.prompt
                            + '&resource=' + oauthOptions.resource
                            + '&scope=' + oauthOptions.scope
                            + '&nonce=' + oauthOptions.nonce;

            var strWindowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no,height=650,width=600";

            var outlookOauthWindow = window.open(oauthUrl, "Outlook", strWindowFeatures);*/
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
        
        var lochash = location.hash.substr(1);

        if (lochash.indexOf('code') !== -1) {
            var outlookCode = lochash.substr(lochash.indexOf('code=')).split('&')[0].split('=')[1];
            if (window.opener) {
                window.opener.setOutlookOauthCode(outlookCode);
                //window.close();
            }
        }
            
        /*var calendarDataUrl = 'https://outlook.office365.com/api/v1.0/me/events';

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
        );*/

        // EXCHANGE OAUTH

        /*
        var code = getUrlParameter('code');

        if (!Ember.isEmpty(code)) {
            var tokenOptions = {
                client_id: 'e5e0d681-2624-4077-b78f-a4605e2c376c',
                redirect_uri: 'https://c.na24.visual.force.com/apex/protoGCal',
                client_secret: 'qh4EkIgocm2MmKhe6zyu9sDf70o+gotRqjyNmx/x6d8=',
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

