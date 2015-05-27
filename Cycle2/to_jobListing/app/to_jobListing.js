// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

Ember.Handlebars.helper('formatDate', function(value, dateFormat, options) {

  var escaped = typeof value === 'string' ? Handlebars.Utils.escapeExpression(value) : value;

  return new Ember.Handlebars.SafeString(value === null ? 'N/A' : moment.utc(escaped).format(typeof dateFormat === 'string' ? dateFormat : 'MMM D, YYYY'));
});

App.SalesforceTwitterComponent = Ember.Component.extend({
    layoutName: 'components/twitter',
    didInsertElement: function() {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }
});

function findClosestLocation(self, callback){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            if (Ember.isNone(position)) {
                var primaryLocation = self.get('locations').findBy('Primary__c', true);

                applyCallback(primaryLocation);
            } else {
                var userGeo = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                var closestLocation;

                self.get('locations').forEach(function(l) {

                    if (l.Location__c !== 'Remote') {
                        var locationGeo = {
                            latitude: l.Location__r.Geographical_Location__c.latitude,
                            longitude: l.Location__r.Geographical_Location__c.longitude
                        };

                        var distance = getGeolocationDistance(userGeo, locationGeo);

                        if (Ember.isNone(closestLocation) || distance < closestLocation.distance) {
                            closestLocation = l;
                            closestLocation.distance = distance;
                        }
                    }
                    
                });

                var locationString = closestLocation.formattedLocationString;

                if (locationString.indexOf('(Primary)') !== -1) {
                    locationString = locationString.split('(Primary)')[0] + '(Primary, Closest)';
                } else if (locationString.indexOf('(Closest)') === -1) {
                    locationString += ' (Closest)';
                }

                closestLocation.set('formattedLocationString', locationString);

                callback(closestLocation);
                // find closest location.
            }
            
        }, function(error) {
            var primaryLocation = self.get('locations').findBy('Primary__c', true);

            callback(primaryLocation);
        });;
    } else {
        var primaryLocation = self.get('locations').findBy('Primary__c', true);

        callback(primaryLocation);
    }
}

function createLocationStrings(locations){
    var primaryLocation = '';
    var otherLocationsString = '';

    locations.forEach(function(jobLoc, index) {
        var location = jobLoc.Location__r;
        var locationString = '';

        locationString = location.City__c + ', ' + location.Standardized_State_Province__c;

        if (!Ember.isEmpty(location.Standardized_Country_Region__c) && location.Standardized_Country_Region__c !== 'US') {
            locationString += ', ' + location.Standardized_Country_Region__c;
        }

        if (index === 0) {
            primaryLocation = locationString;
        } else {
            otherLocationsString += locationString + ' | ';
        }
    });


    if(!Ember.isEmpty(otherLocationsString)){
        otherLocationsString = otherLocationsString.substring(0, otherLocationsString.lastIndexOf(' | '));
    }

    var obj = {
        primaryLocation: primaryLocation,
        otherLocationsString: otherLocationsString,
        otherLocationsCount: locations.length == 0 ? 0 : locations.length - 1
    };

    return obj;
};

function parsePostingLocations(locations, allowRemote) {
    var locationObjs = [];
    var combinedLocations = '';

    locations.forEach(function(jobLoc, index) {
        var location = jobLoc.Location__r;
        var locationString = '';

        locationString = location.City__c + ', ' + location.Standardized_State_Province__c;

        if (!Ember.isEmpty(location.Standardized_Country_Region__c) && location.Standardized_Country_Region__c !== 'US') {
            locationString += ', ' + location.Standardized_Country_Region__c;
        }

        if (index === 0) {
            combinedLocations = locationString += ' (Primary)';
        } else {
            combinedLocations += ' | ' + locationString;
        }

        jobLoc.formattedLocationString = locationString;
        locationObjs.addObject(Ember.Object.create(jobLoc));
    });

    if (allowRemote === true) {
        locationObjs.addObject(Ember.Object.create({
            Location__c: 'Remote',
            formattedLocationString: 'Remote'
        }));
    }

    return {
        locationObjs: locationObjs,
        locationsString: combinedLocations
    };
}

var globalThis = this;

function createSaveObj(jobPosting, loggedInUser, linkedInMap) {
    var saveObj = {};

    if (!Ember.isNone(linkedInMap)) {
        if (!Ember.isNone(linkedInMap.educations && !Ember.isEmpty(linkedInMap.educations.values))) {
            saveObj.educationHistory = convertLinkedInToEducationHistoryObj(linkedInMap.educations.values);
        }

        if (!Ember.isNone(linkedInMap.positions && !Ember.isEmpty(linkedInMap.positions.values))) {
            saveObj.employmentHistory = convertLinkedInToEmploymentHistoryObj(linkedInMap.positions.values);
        }
    }

    saveObj.application = {
        Requisition__c: jobPosting.Requisition_Lookup__c,
        Contact__c: loggedInUser.ContactId,
        First_Name__c: loggedInUser.FirstName,
        Last_Name__c: loggedInUser.LastName,
        Email__c: loggedInUser.Email,
        Street_Address__c: !Ember.isNone(linkedInMap) ? linkedInMap.mainAddress : null,
        Job_Posting__c: jobPosting.Id
    };

    return saveObj;
};

function convertLinkedInToEducationHistoryObj(educations) {
    return educations.map(function(e) {
        // Educations from linkedIn only have year in the startDate/endDate

        return {
            Education_Level__c: degreePicklistValues.indexOf(e.degree) !== -1 ? e.degree : 'Other',
            Name: e.schoolName,
            Status__c: null,
            Start_Month__c: !Ember.isNone(e.startDate) ? String(e.startDate.month) : null,
            Start_Year__c: !Ember.isNone(e.startDate) ? e.startDate.year : null,
            End_Month__c: !Ember.isNone(e.endDate) ? String(e.endDate.month) : null,
            End_Year__c: !Ember.isNone(e.endDate) ? e.endDate.year : null
        };
    });
}

function convertLinkedInToEmploymentHistoryObj(positions) {
    return positions.map(function(p) {
        // Positions from LinkedIn only have year and month in startDate/endDate

        return {
            Name: !Ember.isNone(p.company) ? p.company.name : null,
            Job_Title__c: p.title,
            Start_Month__c: !Ember.isNone(p.startDate) ? String(p.startDate.month) : null,
            Start_Year__c: !Ember.isNone(p.startDate) ? p.startDate.year : null,
            End_Month__c: !Ember.isNone(p.endDate) ? String(p.endDate.month) : null,
            End_Year__c: !Ember.isNone(p.endDate) ? p.endDate.year : null,
            Is_Current__c: p.isCurrent,
        };
    });
}

function getGeolocationDistance(p1, p2) {
    var rad = function(x) { return x * Math.PI / 180 };

    var R = 6371;
    var dLat  = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return Math.round(d);
}

var degreePicklistValues = [];

if (!Ember.isEmpty(jobPostingMap.degreeFields)) {
    degreePicklistValues = jobPostingMap.degreeFields.getEach('value');
}

var numberToMonthMap = {
    '1' : 'January',
    '2' : 'February',
    '3' : 'March',
    '4' : 'April',
    '5' : 'May',
    '6' : 'June',
    '7' : 'July',
    '8' : 'August',
    '9' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December'
};

App.LocationModalView = Ember.View.extend({
    templateName: 'locationModal',
    didInsertElement: function() {
        
    }
});

App.PrivateMessageModalView = Ember.View.extend({
    templateName: 'privateMessageModal',
    didInsertElement: function() {
        
    }
});

App.JobPostingView = Ember.View.extend({
    didInsertElement: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        $('body').on('touchstart.jui.dropdown', '.dropdown-menu', function (e) { 
            e.stopPropagation(); 
        });
        
        $('.dropdown-menu').on('touchstart.dropdown.data-api', function(e) { e.stopPropagation() });
    }
});

App.JobPostingController = Ember.ObjectController.extend({
    jobIsSaved: function(){
        return this.get('isJobSaved') && Ember.isNone(this.get('application'));
    }.property('isJobSaved', 'application'),
    hasJobOffer : function(){
        var application = this.get('application')
        return !Ember.isNone(application) && !Ember.isNone(application.Job_Offers__r)
    }.property(),
    redirectUrl : function(){
        var application = this.get('application');
        var href = '';
        
        if (this.get('hasJobOffer')) {
            return '/' + parent.urlPrefix.split('/')[1] + '/' + extnamespace + 'to_offerLetterCandidate?id=' + application.Job_Offers__r.records[0].Id;
        } else if(!Ember.isNone(application) && application.Status__c === 'In Progress'){
            return parent.urlPrefix + '/Apply?id=' + application.Id;
        } 
        
        return href;
    }.property('hasJobOffer', 'application'),
    toggleDropdown : function(){
        return Ember.isEmpty(this.get('redirectUrl')) ? 'dropdown' : '';
    }.property('redirectUrl'),
    actionButtonColor : function(){
        var application = this.get('application');
        return !Ember.isEmpty(application) && (application.Status__c == 'In Progress' || !Ember.isEmpty(application.Job_Offers__r)) ? 'button--success' : 'button--primary';
    }.property(),
    actionButtonText : function(){
        var application = this.get('application')
    
        if (!Ember.isNone(application) && !Ember.isNone(application.Job_Offers__r) 
                    && ['Extended', 'Accepted', 'Declined'].indexOf(application.Job_Offers__r.records[0].Status__c) !== -1) {
            return 'View Offer'//labels.viewOffer;
        } else if(!Ember.isNone(application) && application.Status__c === 'In Progress'){
            return 'Finish' //labels.finish;
        } else {
            return 'Apply <span class="show-brkpoint--md">Now</span>' //labels.apply + ' <span class="show-brkpoint--md">' + labels.now + '</span>'
        }
    }.property(),
    appliedAlertClass: function() {
        var application = this.get('application');

        if (!Ember.isNone(application)) {
            var hasOffer = !Ember.isNone(application.Job_Offers__r);
            var isToday = moment().diff(moment(application.Applied_On__c), 'hours') < 24;
            var isCompleted = application.Status__c === 'Completed'

            if ((!hasOffer && isCompleted && isToday) || (hasOffer && application.Job_Offers__r.records[0].Status__c === 'Extended')) {
                return 'alert--success';
            } else if (!hasOffer && !isCompleted) {
                return 'alert--warning';
            } else {
                return 'alert--info';
            }
        } else {
            return null;
        }
    }.property('application'),
    appliedMessage: function() {
        var application = this.get('application');

        if (!Ember.isNone(application)) {
            var hasOffer = !Ember.isNone(application.Job_Offers__r);
            var isToday = moment().diff(moment(application.Applied_On__c), 'hours') < 24;
            var isCompleted = application.Status__c === 'Completed'

            if (!hasOffer && isCompleted && isToday) {
                return labels.thankYou;
            } else if (!hasOffer && isCompleted && !isToday){
                return labels.youAppliedOn + ' ' + moment(application.Applied_On__c).format('MMM D, YYYY') + '.';
            } else if (!hasOffer && !isCompleted) {
                var appliedMessage = '';
                var numDaysSinceApply = moment().diff(moment(application.CreatedDate), 'days');

                if (numDaysSinceApply === 0) {
                    appliedMessage = labels.appliedToday;
                } else if (numDaysSinceApply === 1) {
                    appliedMessage = labels.appliedYesterday;
                } else {
                    appliedMessage = labels.appliedMultilpleDays + ' ' + moment().diff(moment(application.CreatedDate), 'days') + ' ' + labels.daysAgo;
                }

                appliedMessage += ' <a href="' + this.get('redirectUrl') + '" target="_top">' + labels.finishNow + '</a>';
                return appliedMessage;
            } else if (hasOffer && application.Job_Offers__r.records[0].Status__c === 'Extended') {
                return labels.offeredJob;
            } else {
                return null;
            }
        }
        
        return null;
    }.property(),
    disableApplyButton: function() {
        var application = this.get('application')
        if(!Ember.isEmpty(application) && Ember.isEmpty(application.Job_Offers__r) && application.Status__c == 'Completed'){
            return 'disabled';
        }

        return false;
    }.property(),
    apply : function(applyType){
        var self = this;
        var applyUrl = 'to_applyFlow?reqId=' + self.get('jobPosting').Requisition_Lookup__c + '&jobPostingId=' + self.get('jobPosting').Id

        if (self.get('selectedLocation') === 'Remote') {
            applyUrl += '&prefersRemote=true&locationId=' + self.get('locations').findBy('Primary__c', true).Location__c;
        } else {
            applyUrl += '&locationId=' + self.get('selectedLocation')
        }

        if(applyType == 'email'){
            window.parent.location.href = applyUrl;
        } else {
            applyUrl += '&importLinkedIn=true';

            if (!Ember.isNone(self.get('linkedInMap'))) {
                window.parent.location.href = applyUrl;
            } else {
                window.parent.location.href = self.get('applyWithLinkedInUrl') + applyUrl.replace(/&/g, '%26');
            }
        }
    },
    showReport : false,
    showReportText : function(){
        return this.get('showReport') ? 'Hide direct reports' : 'Show direct reports';
    }.property('showReport'),
    disableSend : function(){
        return this.get('recipientId') == this.get('loggedInUser').Id ? 'disabled' : false;
    }.property('recipientId'),
    noMinions : function(){
        return Ember.isEmpty(this.get('minions'));
    }.property('minions'),
    actions: {
        saveRecipientData : function(recipientId, recipientName){
            this.set('recipientId', recipientId);
            this.set('recipientName', recipientName);
        },
        sendMessage: function(){
            var self = this;
            var message = self.get('chatterMessage');
            message += '\n\n Job Posting: \n' + self.get('jobPosting').Job_Title__c + '\n\n ' + window.location.href.split('&')[0];

            cont.sendChatterMessage(message, self.get('recipientId'), function(){
                self.set('chatterMessage', '');
            });
        },
        toggleReport: function(){
            this.set('showReport', !this.get('showReport'));
            $('.directReports').slideToggle( "fast", function(){});
        },
        displayLocationModal : function(applyType) {
            var self = this;

            if (self.get('locations').length === 1) {
                self.apply(applyType);
            } else {
                var applyCallback = function(selectedLocation) {
                    self.set('showLoadingState', false);
                    $('#locationModal').modal({
                        show: true,
                    });

                    var bodyHeight = $('body').height();
                    var modalHeight = $('.modal__shell').outerHeight(true);

                    if (modalHeight > bodyHeight) {
                        $('body').height(modalHeight);
                    }
                    
                    window.scrollTo(0,0);

                    if (!Ember.isNone(selectedLocation)) {
                        self.set('selectedLocation', selectedLocation.Location__c);
                    }

                    $('#modalOk').click(function() {
                        self.apply(applyType);
                    });
                };
                self.set('showLoadingState', true);
                findClosestLocation(self, applyCallback);
            }
        },
        shareOnTwitter: function() {
            var utmParams = '&utm_campaign=social&utm_medium=Social&utm_source=Twitter';
            var url = this.get('publicJpUrl').split('&')[0] + utmParams;
            var jobTitle = this.get('jobPosting').Job_Title__c;
            var tweetString = 'Check out this job: ' + jobTitle; 
            var width = 626;
            var height = 436; 
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('http://www.twitter.com/share?text=' + encodeURIComponent(tweetString) + '&url=' + encodeURIComponent(url),
                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');

            return false;
        },
        shareOnLinkedIn: function (){
            var utmParams = '&utm_campaign=social&utm_medium=Social&utm_source=LinkedIn';
            var url = this.get('publicJpUrl').split('&')[0] + utmParams;
            var source = ''; // This does not show up anywhere except on url
            var width = 626;
            var height = 436;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('http://www.linkedin.com/shareArticle?mini=true&url='+ 
                        encodeURIComponent(url) + 
                        '&source=' + encodeURIComponent(source),
                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');

            return false;
        },
        shareOnFacebook: function (){
            var utmParams = '&utm_campaign=social&utm_medium=Social&utm_source=Facebook';
            var url = this.get('publicJpUrl').split('&')[0] + utmParams;
            var docTitle = document.title; // This is the document where the Share Button is
            var width = 626;
            var height = 436;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            window.open('http://www.facebook.com/sharer.php?u='+ 
                        encodeURIComponent(url) + '&t=' + encodeURIComponent(docTitle),
                        'sharer', 'toolbar=0, status=0, width=' + width + ',height=' + height + ',top=' + top + ',left=' + left +
                        'menubar=no, toolbar=no, resizable=yes, scrollbars=yes');
 
            return false;
        }
    }
});    

// Routes
App.JobPostingRoute = Ember.Route.extend( {
    model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            jobPostingMap.isRemoteAvailable = jobPostingMap.jobPosting.Requisition_Lookup__r.Allow_Remote_Employees__c;

            var parsedLocations = parsePostingLocations(jobPostingMap.jobPosting.locations, jobPostingMap.isRemoteAvailable);
            jobPostingMap.locationString = parsedLocations.locationsString;
            jobPostingMap.locations = parsedLocations.locationObjs;

            //set the values of the field so we can use it easily on the template
            jobPostingMap.jpFields.forEach(function(f) {
                f.value = jobPostingMap.jobPosting[f.name];
            });

            //jobPostingMap.applyWithLinkedInUrl = jobPostingMap.linkedInSsoUrl ? jobPostingMap.linkedInSsoUrl + '?community=https://' + parent.communityUrl + '&' + 'startURL=' : null;
            resolve(jobPostingMap);
        });
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});

// Router
App.Router.map(function() {
    this.resource('jobPosting', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});