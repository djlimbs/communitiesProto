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

function convertLocationObjToPicklistOption(locationObj) {
    return {
        namespace_City__c: locationObj.City__c,
        namespace_Country_Region__c: locationObj.Country_Region__c,
        namespace_Location_Name__c: locationObj.Name,
        namespace_State_Province__c: locationObj.State_Province__c,
        namespace_Street_Address__c: locationObj.Street_Address__c,
        namespace_Zip_Postal_Code__c: locationObj.Zip_Postal_Code__c,
        namespace_Geographical_Location__Latitude__s: locationObj.Geographical_Location__c.latitude,
        namespace_Geographical_Location__Longitude__s: locationObj.Geographical_Location__c.longitude
    };
}

function convertInterviewTimeSlotToEventObject(interviewTimeSlotObj) {
    return {
        id: interviewTimeSlotObj.Id,
        title: 'Available',
        start: moment(interviewTimeSlotObj.namespace_Start_Time__c).zone(userTimeZone),
        end: moment(interviewTimeSlotObj.namespace_End_Time__c).zone(userTimeZone),
        className:'fc-available',
        editable: true
    };
}

// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.Fixtures = Ember.Object.create({
    isOauthedIntoGoogle: null
});

App.FullCalendarComponent = Ember.Component.extend({
	attributeBindings: ['isOauthedIntoGoogle', 'isOauthedIntoOutlook', 'timeSlots', 'deletedTimeSlots', 'googleCalendars', 'participants', 'participantsDidChange', 'isEdit', 'calendarEl'],
    classNames: ['relative'],
    currentParticipants: [],
    maxNumberOfTimeSlots: 5,
    nonOutlookUsers: [],
	afterRenderEvent: function() {
		var self = this;
        var $calendar = this.$();
        var maxNumberOfTimeSlots = this.get('maxNumberOfTimeSlots');
		var fullCalendarOptions = {
			defaultView: 'agendaWeek',
			editable: true,
			timezone: 'local',
            slotDuration: '00:15:00',
            allDaySlot: false,
            /*businessHours: {
                start: '9:00', // a start time (10am in this example)
                end: '17:00', // an end time (6pm in this example)

                dow: [ 1, 2, 3, 4, 5 ]
                // days of week. an array of zero-based day of week integers (0=Sunday)
                // (Monday-Thursday in this example)
            },*/
            scrollTime: '09:00:00',
            timezone: userTimeZone, 
            dayClick: function(day, event, element) {
                var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);

                if (currentSlots.length < maxNumberOfTimeSlots) {
                    var durationMilliseconds = self.get('durationMilliseconds') || 3600000;

                    event.id = 'available_slot_' + moment().valueOf();
                    event.title = 'Available';
                    event.start = day;
                    event.end = moment(day).add(durationMilliseconds, 'milliseconds');
                    event.className = 'fc-available';
                    event.editable = true;
                    $calendar.fullCalendar( 'renderEvent', event, true);
                }    
            },
            eventClick: function(calEvent, jsEvent, view) {
                if (calEvent.editable === true && $(jsEvent.target).hasClass('juicon')) {
                    $calendar.fullCalendar('removeEvents', calEvent._id);

                    var eventObj = self.get('timeSlots').findBy('id', calEvent.id);

                    if (!Ember.isNone(eventObj) && eventObj.id.indexOf('available_slot_') === -1) {
                        self.get('deletedTimeSlots').addObject(eventObj.id);
                    }
                }
            },
            eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                self.set('durationMilliseconds', event.end.diff(event.start, 'milliseconds'));
                console.log(event);
            },
            eventMouseover: function(event, jsEvent, view) {
                if (event.editable === true) {
                    $(this).find('.fc-content').prepend('<div class="juicon juicon-x fc-event-x"></div>');
                }
            },
            eventMouseout: function(event, jsEvent, view) {
                if (event.editable === true) {
                    $(this).find('.fc-content').find('.juicon').remove();
                }
            },
			eventSources: [
                {
                	// For timeslots.
                    events: self.get('timeSlots')
                }
            ],
            loading: function(isLoading, view) {
                if (isLoading) {
                    $calendar.prepend('<div class="load-full" style="position:absolute;"><div class="load-full-icon"></div></div>');
                } else {
                    $calendar.find('.load-full').remove();
                }
                
            }
		};

        this.set('calendarEl', $calendar);

		$calendar.fullCalendar(fullCalendarOptions);
	},
    pullParticipantsCalendarData: function() {
        var $calendar = this.$();
        Ember.run.debounce(this, function() {
            var participants = this.get('participants');
            var currentParticipants = this.get('currentParticipants');
            var $chosenParticipants = $('#chosenParticipants');

            // clear participants

            currentParticipants.forEach(function(p) {
                var eventSourceToDelete = p.eventSource;
                $calendar.fullCalendar('removeEventSource', eventSourceToDelete);
            });

            currentParticipants.clear();

            if (this.get('isOauthedIntoOutlook') === true && calendarIntegration === 'Outlook') {
                var nonOutlookUsers = this.get('nonOutlookUsers');
                var outlookToken = App.Fixtures.get('outlookToken');

                participants.forEach(function(p, i) {
                    var liIndex = i+1;
                    var liCss = $chosenParticipants.find('li:eq(' + liIndex + ')').css('box-shadow');
                    var liColor = liCss.match(/rgb\(.+\)/)[0];

                    if (nonOutlookUsers.indexOf(p.Id) === -1) {
                        var eventSourceToAdd = {
                            events: function(start, end, timezone, callback) {
                                var dateFormat = 'YYYY-MM-DDThh:mm:ss';
                                var outlookUser = p.Email;
                                var startString = moment(start).format(dateFormat) + 'Z';
                                var endString = moment(end).format(dateFormat) + 'Z';

                                var calendarDataUrl = 'https://outlook.office365.com/api/v1.0/users/' + outlookUser + '/calendarview?startDateTime=' + startString + '&endDateTime=' + endString;

                                $.ajax(
                                    {
                                        url: calendarDataUrl,
                                        type: 'GET',
                                        
                                        beforeSend: function (xhr){ 
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + outlookToken); 
                                        },
                                        success: function(json) {
                                            var events = json.value;

                                            if (!Ember.isEmpty(events)) {
                                                var busySlots = events.map(function(e) {
                                                    e.title = p.Name;
                                                    e.editable = false;
                                                    e.start = moment(e.Start).zone(userTimeZone);
                                                    e.end = moment(e.End).zone(userTimeZone);
                                                    return e;
                                                });
                                                callback(busySlots);
                                            } else {
                                                callback([]);
                                            }
                                        },
                                        failure: function(jqXHR, textStatus, err) {
                                            nonOutlookUsers.addObject(p.Id);
                                            callback([]);
                                            console.log(jqXHR);
                                        },
                                        error: function(data) {
                                            nonOutlookUsers.addObject(p.Id);
                                            callback([]);
                                        }
                                    }
                                );
                            },
                            backgroundColor: liColor,
                            borderColor: liColor
                        };

                        var newParticipant = {
                            Id: p.Id,
                            eventSource: eventSourceToAdd
                        };

                        currentParticipants.addObject(newParticipant);

                        $calendar.fullCalendar('addEventSource', newParticipant.eventSource);
                    }
                });
            } else if (this.get('isOauthedIntoGoogle') === true && calendarIntegration === 'Google') {
                var googleCalendars = this.get('googleCalendars');
                                
                // add back participants

                participants.forEach(function(p, i) {
                    if (!Ember.isNone(googleCalendars.findBy('id', p.Email))) {
                        var liIndex = i+1;
                        var liCss = $chosenParticipants.find('li:eq(' + liIndex + ')').css('box-shadow');
                        var liColor = liCss.match(/rgb\(.+\)/)[0];

                        var eventSourceToAdd = {
                            events: function(start, end, timezone, callback) {
                                var reqBody = {
                                    timeMin: start,
                                    timeMax: end,
                                    items: [{
                                        id: p.Email
                                    }]
                                };

                                var calRequest = gapi.client.calendar.freebusy.query(reqBody);

                                calRequest.execute(function(calResponse) {
                                    var freeBusy = Object.keys(calResponse.calendars).map(function(cal) {
                                        return {
                                            items: calResponse.calendars[cal].busy.map(function(e) {
                                                e.title = p.Name;
                                                e.editable = false;
                                                e.start = moment(e.start).zone(userTimeZone);
                                                e.end = moment(e.end).zone(userTimeZone);
                                                return e;
                                            })
                                        };
                                    });

                                    callback(freeBusy[0].items);
                                });
                            },
                            backgroundColor: liColor,
                            borderColor: liColor
                        };

                        var newParticipant = {
                            Id: p.Id,
                            eventSource: eventSourceToAdd
                        };

                        currentParticipants.addObject(newParticipant);

                        $calendar.fullCalendar('addEventSource', newParticipant.eventSource);
                    }
                });
            }
        }, 500);
    }.observes('participantsDidChange')
});

App.Select2Component = Ember.TextField.extend({
    attributeBindings: ['multiple', 'data-qa-input'],
    multiple: true,
    didInsertElement: function() {
        var self = this;
        this.$().select2({
            minimumInputLength: 2,
            placeholder: labels.chooseOrTypeSkills,
            tags: [],
            formatNoMatches: labels.chooseOrTypeSkills,
            tokenSeparators: [','],
            maximumSelectionSize: 10
        });
    }
});

App.InterviewNewEditController = Ember.ObjectController.extend({
    isAtMaxParticipants: function() {
        return this.get('participants').length >= 10 ? 'disabled' : false;
    }.property('participants'),
    isEdit: function() {
        return !Ember.isNone(this.get('interview').Id);
    }.property('interview'),
    isOauthedIntoOutlook: function() {
        return !Ember.isEmpty(App.Fixtures.get('outlookToken'));
    }.property('App.Fixtures.outlookToken'),
    isOauthedIntoGoogle: function() {
        return App.Fixtures.get('isOauthedIntoGoogle');
    }.property('App.Fixtures.isOauthedIntoGoogle'),
    pullGoogleCalendarData: function() {
        var self = this;
        var calendarColors = ['blue', 'green', 'orange'];

        var isOauthedIntoGoogle = self.get('isOauthedIntoGoogle');
        var toggleParticipants = self.get('toggleParticipants');

        if (isOauthedIntoGoogle === true) {
            gapi.client.load('calendar', 'v3', getAllCalendars);
                    
            function getAllCalendars() {
                var allCalRequest = gapi.client.calendar.calendarList.list({
                    calendarId: 'primary',
                    timeMin: moment().format(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: 'startTime'
                });
            
                allCalRequest.execute(function(allCalResponse) {
                    var calendars = allCalResponse.items;

                    if (!Ember.isEmpty(calendars)) {
                        self.set('googleCalendars', calendars);

                        if (self.get('toggleParticipants') === true) {
                            self.toggleProperty('participantsDidChange');
                            self.set('toggleParticipants', false);
                        }

                        // get interview scheduler calendar
                        /*
                        var interviewCalRequest = gapi.client.calendar.events.list({
                            calendarId: 'appiphony.com_q08ipq97c0fl6spr7b48hpq4ss@group.calendar.google.com',
                            timeMin: moment().format(),
                            showDeleted: false,
                            singleEvents: true,
                            maxResults: 10,
                            orderBy: 'startTime'
                        });

                        interviewCalRequest.execute(function(interviewResponse) {
                            console.log(interviewResponse);
                        });

                        
                        var updatedEvent = {
                            'summary': 'Google I/O 2015',
                            'location': '800 Howard St., San Francisco, CA 94103',
                            'description': 'A chance to hear more about Google\'s developer products.',
                            'start': {
                                'dateTime': '2015-07-06T09:00:00-05:00',
                                'timeZone': 'America/Chicago'
                            },
                            'end': {
                                'dateTime': '2015-07-06T10:00:00-05:00',
                                'timeZone': 'America/Chicago'
                            },
                            'attendees': [
                                {'email': 'victor@appiphony.com'}
                            ]
                        };

                        var moveEventReq = gapi.client.calendar.events.update({
                            calendarId: 'appiphony.com_q08ipq97c0fl6spr7b48hpq4ss@group.calendar.google.com',
                            eventId: 'u2576abt5udhc863j4nvpo2ej4',
                            sendNotifications: true,
                            resource: updatedEvent
                        });

                        moveEventReq.execute(function(event) {
                            console.log(event);
                            console.log('Event updated: ' + event.htmlLink);
                        });
                        */
                        /*
                        var event = {
                          'summary': 'Google I/O 2015',
                          'location': '800 Howard St., San Francisco, CA 94103',
                          'description': 'A chance to hear more about Google\'s developer products.',
                          'start': {
                            'dateTime': '2015-07-04T09:00:00-05:00',
                            'timeZone': 'America/Chicago'
                          },
                          'end': {
                            'dateTime': '2015-07-04T10:00:00-05:00',
                            'timeZone': 'America/Chicago'
                          },
                          'attendees': [
                            {'email': 'victor@appiphony.com'},
                            {'email': 'burhan@appiphony.com'}
                          ]
                        };

                        var addEventToInterviewReq = gapi.client.calendar.events.insert({
                            calendarId: 'appiphony.com_q08ipq97c0fl6spr7b48hpq4ss@group.calendar.google.com',
                            sendNotifications: true,
                            supportsAttachments: true,
                            resource: event
                        });

                        addEventToInterviewReq.execute(function(event) {
                            console.log(event);
                            console.log('Event created: ' + event.htmlLink);
                        }); */
                    }
                });
            }
        } else if (toggleParticipants === true) {

            $('#oauthIntoGoogleModal').modal();
            
        }
    }.observes('isOauthedIntoGoogle'),
    userSearchTermDidChange: function() {
        var userSearchTerm = this.get('userSearchTerm');
        var isSearching = this.get('isSearching');

        if (!isSearching) {
            Ember.run.debounce(this, this.searchForUser, 400);
        }
    }.observes('userSearchTerm'),
    searchForUser: function() {
        var self = this;
        var userSearchTerm = this.get('userSearchTerm');
        var participants = this.get('participants');

        if (!Ember.isEmpty(userSearchTerm)) {
            this.setProperties({
                isSearching: true,
                searchResults: null
            });

            var searchObject = {
                searchTerm: userSearchTerm,
                participants: !Ember.isNone(participants) ? participants.getEach('Id') : []
            };

            cont.searchParticipants(JSON.stringify(searchObject), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (Ember.isEmpty(parsedResult.errorMessages)) {
                        var searchResults = parsedResult.data.users;

                        self.setProperties({
                            searchResults: searchResults,
                            isSearching: false
                        });
                    } else {
                        // UH OH
                    }
                }
            });
        } else {
            this.set('searchResults', null);
        } 
    },
    saveInterview: function(saveObj) {
        cont.saveInterview(JSON.stringify(saveObj), function(res, evt) {
            if (res) {
                var parsedResult = parseResult(res);

                if (Ember.isEmpty(parsedResult.errorMessages)) {
                    window.location.href = retUrl;
                } else {
                    console.log(parsedResult)
                    // BROKE DAWG
                }
            }
        });
    },
    actions: {
        clickSearchResult: function(searchResult) {
            var self = this;

            this.get('participants').addObject(searchResult);
            this.setProperties({
                isSearching: false,
                searchResults: null,
                userSearchTerm: null
            });

            if (this.get('isOauthedIntoGoogle') === false) {
                self.set('toggleParticipants', true);
                $('#oauthIntoGoogleModal').modal();
            } else {
                this.toggleProperty('participantsDidChange');
            }
        },
        clickRemoveParticipant: function(participant) {
            this.get('participants').removeObject(participant);
            this.toggleProperty('participantsDidChange');
        },
        clickSave: function() {
            var self = this;
            var saveObj = {};
            var interview = this.get('interview');
            var participants = this.get('participants');
            var $calendar = this.get('calendarEl');
            var allCalendarEvents = $calendar.fullCalendar('clientEvents');
            var timeSlots = allCalendarEvents.filterBy('editable', true);
            var selectedLocation = this.get('selectedLocation');

            var isEdit = this.get('isEdit');
            var originalTopics = this.get('originalTopics');
            var originalTimeSlots = this.get('originalTimeSlots');
            var originalParticipants = this.get('originalParticipants');
            var originalLocationName = this.get('originalLocationName');
            var originalLogisticalDetails = this.get('originalLogisticalDetails');
            var scheduleDidChange = false;

            this.set('isSaving', true);

            // format topics
            if (!Ember.isEmpty(interview.topics)) {
                var topicIndex = 1;
                interview.topics.split(',').forEach(function(topic, i) {
                    topicIndex = i + 1;
                    interview['Topic' + topicIndex + '__c'] = topic;
                });

                for (var i = topicIndex + 1; i <= 10; i++) {
                    interview['Topic' + i + '__c'] = null;
                }

                delete interview.Topics__c;
            }

            interview.namespace_Geographical_Location__Latitude__s;
            interview.namespace_Geographical_Location__Longitude__s;
            delete interview.namespace_Geographical_Location__c;

            // format users
            var userIndex = 1;
            var interviewersString;
            participants.forEach(function(participant, i) {
                userIndex = i + 1;
                interview['User' + userIndex + '__c'] = participant.Id;

                if (i === 0) {
                    interviewersString = participant.Name; 
                } else if (i === 1 && participants.length === 2) {
                    interviewersString += ' and ' + participant.Name;
                } else {
                    interviewersString += '; ' + participant.Name;
                }
            });

            interview.Interviewers__c = interviewersString;

            for (var i = userIndex + 1; i <= 10; i++) {
                interview['User' + i + '__c'] = null;
            }

            saveObj.interview = interview;

            // format time slots
            saveObj.timeSlots = timeSlots.map(function(ts) {
                return {
                    Id: ts.id.indexOf('available_slot_') !== -1 ? null : ts.id,
                    namespace_Interview__c: interview.Id,
                    namespace_Start_Time__c: moment(ts.start).format().substring(0,19) + userTimeZone,
                    namespace_End_Time__c: moment(ts.end).format().substring(0,19) + userTimeZone,
                    namespace_Is_Declined__c: false 
                };
            });

            saveObj.deletedTimeSlots = this.get('deletedTimeSlots');

            // save location info
            if (!Ember.isNone(selectedLocation)) {
                Object.keys(selectedLocation).forEach(function(key) { 
                    saveObj.interview[key] = selectedLocation[key];
                });
            }

            // check for topic changes
            /*
            if (interview.topics !== originalTopics) {
                scheduleDidChange = true;
            }
            */

            // check for participant changes
            if (participants.length !== originalParticipants.length) {
                scheduleDidChange = true;
            } else {
                originalParticipants.forEach(function(op){
                    if (Ember.isNone(participants.findBy('Id', op.Id))) {
                        scheduleDidChange = true;
                    }
                });
            }

            // check for time slot changes
            if (timeSlots.length !== originalTimeSlots.length) {
                scheduleDidChange = true;
            } else {
                originalTimeSlots.forEach(function(ots) {
                    if (Ember.isEmpty(saveObj.timeSlots.filter(function(ts) {
                        return moment(ots.namespace_Start_Time__c).valueOf() === moment(ts.namespace_Start_Time__c).valueOf()
                                && moment(ots.namespace_End_Time__c).valueOf() === moment(ts.namespace_End_Time__c).valueOf();
                    }))) { 
                        scheduleDidChange = true;
                    }
                });
            }

            // check for location changes
            if (saveObj.interview.namespace_Location_Name__c !== originalLocationName) {
                scheduleDidChange = true;
            }

            // check for logistical detail changes
            if (saveObj.interview.namespace_Logistical_Details__c !== originalLogisticalDetails) {
                scheduleDidChange = true;
            }

            // check if there's only a single timeslot
            if (timeSlots.length === 1) {
                $('#sendCalendarInvitationsModal').modal();

                $('.js-cancelSendInvitations').one('click', function() {
                    self.set('isSaving', false);
                });

                $('.js-confirmSendInvitations').one('click', function() {
                    // do the ICS invite stuff.

                    self.saveInterview(saveObj);
                });
            } else if (scheduleDidChange === true && isEdit === true) {
                $('#updateInvitationModal').modal();

                $('.js-confirmSave').one('click', function() {
                    self.saveInterview(saveObj);
                });
            } else {
                this.saveInterview(saveObj);
            }      
        },
        clickCancel: function() {
            window.location.href = retUrl;
        },
        clickOauthIntoGoogle: function() {
            gapi.auth.authorize(
            {
              'client_id': CLIENT_ID,
              'scope': SCOPES
            }, function(authResult) {
                if (authResult && !authResult.error) {
                    App.Fixtures.set('isOauthedIntoGoogle', true);
                } else {
                    App.Fixtures.set('isOauthedIntoGoogle', false);
                }
            });
        }
    }
});

App.InterviewNewEditRoute = Ember.Route.extend({
    model: function (){
        return new Ember.RSVP.Promise(function(resolve, reject) {
        	var interviewNewEditObj = {
        		interview: parsedInterviewNewEditJson.interview,
                applicant: parsedInterviewNewEditJson.applicant
        	};

            interviewNewEditObj.originalLogisticalDetails = interviewNewEditObj.interview.namespace_Logistical_Details__c;

            // setup topics
            if (!Ember.isEmpty(interviewNewEditObj.interview.Topics__c)) {
        	   interviewNewEditObj.interview.topics = interviewNewEditObj.interview.Topics__c.replace(/; /g, ',');
            }

            interviewNewEditObj.originalTopics = interviewNewEditObj.interview.topics;

            // setup participants
            interviewNewEditObj.participants = [];
            for (var i = 1; i <= 10; i++) {
                var interviewer = interviewNewEditObj.interview['User' + i + '__r'];
                if (!Ember.isNone(interviewer)) {
                    interviewNewEditObj.participants.addObject(interviewer);
                }
            }
            interviewNewEditObj.toggleParticipants = !Ember.isEmpty(interviewNewEditObj.participants);
            interviewNewEditObj.participantsDidChange = false;

            interviewNewEditObj.originalParticipants = interviewNewEditObj.participants.copy(true);

            // setup time slots
            interviewNewEditObj.timeSlots = [];
            interviewNewEditObj.originalTimeSlots = [];

            if (!Ember.isEmpty(interviewNewEditObj.interview.namespace_Interview_Time_Slots__r)) {
                interviewNewEditObj.interview.namespace_Interview_Time_Slots__r.records.forEach(function(ts) {
                    var fullCalendarEventObj = convertInterviewTimeSlotToEventObject(ts);

                    interviewNewEditObj.timeSlots.addObject(fullCalendarEventObj);
                });

                interviewNewEditObj.originalTimeSlots = interviewNewEditObj.interview.namespace_Interview_Time_Slots__r.records;
            }

            // setup locations
            interviewNewEditObj.availableLocations = [];
            var applicationLocation = parsedInterviewNewEditJson.jobLocations.findBy('Location__c', parsedInterviewNewEditJson.application.Location__c);
            var appLocationPicklistOption = convertLocationObjToPicklistOption(applicationLocation.Location__r);

            interviewNewEditObj.availableLocations.addObject(appLocationPicklistOption);

            parsedInterviewNewEditJson.jobLocations.removeObject(applicationLocation);
            parsedInterviewNewEditJson.jobLocations.forEach(function(jl) {
                interviewNewEditObj.availableLocations.addObject(convertLocationObjToPicklistOption(jl.Location__r));
            });

            // if a location is selected
            var currentLocationName = interviewNewEditObj.interview.namespace_Location_Name__c;
            if (!Ember.isEmpty(currentLocationName)) {
                var selectedLocation = interviewNewEditObj.availableLocations.findBy('namespace_Location_Name__c', currentLocationName);

                if (Ember.isNone(selectedLocation)) {
                    selectedLocation = {
                        namespace_City__c: interviewNewEditObj.interview.namespace_City__c,
                        namespace_Country_Region__c: interviewNewEditObj.interview.namespace_Country_Region__c,
                        namespace_Location_Name__c: interviewNewEditObj.interview.namespace_Location_Name__c,
                        namespace_State_Province__c: interviewNewEditObj.interview.namespace_State_Province__c,
                        namespace_Street_Address__c: interviewNewEditObj.interview.namespace_Street_Address__c,
                        namespace_Zip_Postal_Code__c: interviewNewEditObj.interview.namespace_Zip_Postal_Code__c
                    };

                    interviewNewEditObj.availableLocations.addObject(selectedLocation);
                }

                interviewNewEditObj.selectedLocation = selectedLocation;

                interviewNewEditObj.originalLocationName = selectedLocation.namespace_Location_Name__c;
            }

            interviewNewEditObj.deletedTimeSlots = [];

            interviewNewEditObj.calendarEl = null;

            if (Ember.isEmpty(retUrl)) {
                retUrl = '/' + interviewNewEditObj.interview.Application__c;
            }

        	resolve(interviewNewEditObj);
        });
    }
});

// Router
App.Router.map(function() {
    this.resource('interviewNewEdit', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

