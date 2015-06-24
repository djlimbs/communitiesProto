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

// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.Fixtures = Ember.Object.create({
    isOauthedIntoGoogle: false
});

App.FullCalendarComponent = Ember.Component.extend({
	attributeBindings: ['isOauthedIntoGoogle', 'timeSlots', 'deletedTimeSlots', 'googleCalendars', 'participants', 'participantsDidChange'],
    currentParticipants: [],
	afterRenderEvent: function() {
		var self = this;
        var $calendar = this.$();
		var fullCalendarOptions = {
			defaultView: 'agendaWeek',
			editable: true,
			timezone: 'local',
            slotDuration: '00:15:00',
            businessHours: {
                start: '9:00', // a start time (10am in this example)
                end: '17:00', // an end time (6pm in this example)

                dow: [ 1, 2, 3, 4, 5 ]
                // days of week. an array of zero-based day of week integers (0=Sunday)
                // (Monday-Thursday in this example)
            },
            scrollTime: '09:00:00',
            dayClick: function(day, event, element) {
                event.id = 'available_slot_' + moment().valueOf();
                event.title = 'Available';
                event.start = day;
                event.end = moment(day).add(1, 'hours');
                event.className = 'fc-available';
                event.editable = true;
                $calendar.fullCalendar( 'renderEvent', event);

                self.get('timeSlots').addObject(event);
            },
            eventClick: function(calEvent, jsEvent, view) {
                if (calEvent.editable === true && $(jsEvent.target).hasClass('juicon')) {
                    $calendar.fullCalendar('removeEvents', calEvent._id);

                    var eventObj = self.get('timeSlots').findBy('id', calEvent.id);
                    self.get('timeSlots').removeObject(eventObj);
                    if (eventObj.id.indexOf('available_slot_') === -1) {
                        self.get('deletedTimeSlots').addObject(eventObj.id);
                    }
                }
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
                console.log(isLoading);
                if (isLoading) {
                    $('.fc-view-container').prepend('<div class="load-block"><div class="load-block-icon"></div></div>');
                } else {
                    $('.fc-view-container').find('.load-block').remove();
                }
                
            }
		};

		$calendar.fullCalendar(fullCalendarOptions);
	},
    pullParticipantsCalendarData: function() {
        var $calendar = this.$();
        Ember.run.debounce(this, function() {
            if (this.get('isOauthedIntoGoogle')) {
                var participants = this.get('participants');
                var currentParticipants = this.get('currentParticipants');
                var googleCalendars = this.get('googleCalendars');
                
                var $chosenParticipants = $('#chosenParticipants');
                // clear participants

                currentParticipants.forEach(function(p) {
                    var eventSourceToDelete = p.eventSource;
                    $calendar.fullCalendar('removeEventSource', eventSourceToDelete);
                });

                currentParticipants.clear();
                
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
                                                e.title = googleCalendars.findBy('id', cal).summary;
                                                e.editable = false;
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
    isOauthedIntoGoogle: function() {
        return App.Fixtures.get('isOauthedIntoGoogle');
    }.property('App.Fixtures.isOauthedIntoGoogle'),
    pullGoogleCalendarData: function() {
        var self = this;
        var calendarColors = ['blue', 'green', 'orange'];

        var isOauthedIntoGoogle = self.get('isOauthedIntoGoogle');

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
                    }
                });
            }
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

        if (!Ember.isEmpty(userSearchTerm)) {
            this.setProperties({
                isSearching: true,
                searchResults: null
            });

            var searchObject = {
                searchTerm: userSearchTerm,
                participants: []
            };

            cont.searchUsers(JSON.stringify(searchObject), function(res, evt) {
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
    actions: {
        clickSearchResult: function(searchResult) {
            var self = this;

            this.get('participants').addObject(searchResult);
            this.setProperties({
                isSearching: false,
                searchResults: null,
                userSearchTerm: null
            });

            function handleAuthResult(authResult) {
                var authorizeButton = $('.dev-oauth');
                if (authResult && !authResult.error) {
                    // Hide auth UI, then load client library.
                    App.Fixtures.set('authedIn', true);
                } else {
                    // Show auth UI, allowing the user to initiate authorization by
                    // clicking authorize button.
                    App.Fixtures.set('authedIn', false);
                }
            }

            if (this.get('isOauthedIntoGoogle') === false) {
                gapi.auth.authorize(
                {
                  'client_id': CLIENT_ID,
                  'scope': SCOPES
                  //'immediate': true
                }, function(authResult) {
                    if (authResult && !authResult.error) {
                        self.set('toggleParticipants', true);
                        App.Fixtures.set('isOauthedIntoGoogle', true);
                    } else {
                        App.Fixtures.set('isOauthedIntoGoogle', false);
                    }
                });
            } else {
                this.toggleProperty('participantsDidChange');
            }
        },
        clickRemoveParticipant: function(participant) {
            this.get('participants').removeObject(participant);
            this.toggleProperty('participantsDidChange');
        },
        clickSave: function() {
            var saveObj = {};
            var interview = this.get('interview');
            var participants = this.get('participants');
            var timeSlots = this.get('timeSlots');

            // format topics
            var topicIndex = 1;
            interview.topics.split(',').forEach(function(topic, i) {
                topicIndex = i + 1;
                interview['Topic' + topicIndex + '__c'] = topic;
            });

            for (var i = topicIndex + 1; i <= 10; i++) {
                interview['Topic' + i + '__c'] = null;
            }

            delete interview.Topics__c;

            // format users
            var userIndex = 1;
            participants.forEach(function(participant, i) {
                userIndex = i + 1;
                interview['User' + userIndex + '__c'] = participant.Id;
            });

            for (var i = userIndex + 1; i <= 10; i++) {
                interview['User' + i + '__c'] = null;
            }

            saveObj.interview = interview;

            // format time slots
            saveObj.timeSlots = timeSlots.map(function(ts) {
                return {
                    Id: ts.id.indexOf('available_slot_') !== -1 ? null : ts.id,
                    namespace_Interview__c: interview.Id,
                    namespace_Start_Time__c: moment(ts.start).format(),
                    namespace_End_Time__c: moment(ts.end).format(),
                    namespace_Is_Declined__c: false 
                };
            });

            saveObj.deletedTimeSlots = this.get('deletedTimeSlots');

            cont.saveInterview(JSON.stringify(saveObj), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (Ember.isEmpty(parsedResult.errorMessages)) {
                        window.location.href = '/' + interview.Application__c;
                        // give IDs to interview and timeslots.
                    } else {
                        console.log(parsedResult)
                        // BROKE DAWG
                    }
                }
            });
        },
        clickCancel: function() {
            window.location.href = '/' + this.get('interview').Application__c;
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

            // setup topics
            if (!Ember.isEmpty(interviewNewEditObj.interview.Topics__c)) {
        	   interviewNewEditObj.interview.topics = interviewNewEditObj.interview.Topics__c.replace(/; /g, ',');
            }

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

            // setup time slots
            interviewNewEditObj.timeSlots = [];

            if (!Ember.isEmpty(interviewNewEditObj.interview.namespace_Interview_Time_Slots__r)) {
                interviewNewEditObj.interview.namespace_Interview_Time_Slots__r.records.forEach(function(ts) {
                    var fullCalendarEventObj = {
                        id: ts.Id,
                        title: 'Available',
                        start: moment(ts.namespace_Start_Time__c),
                        end: moment(ts.namespace_End_Time__c),
                        className:'fc-available',
                        editable: true
                    };

                    interviewNewEditObj.timeSlots.addObject(fullCalendarEventObj);
                });
            }

            interviewNewEditObj.deletedTimeSlots = [];

        	resolve(interviewNewEditObj);
        });
    }
});

// Router
App.Router.map(function() {
    this.resource('interviewNewEdit', { path: '/' });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

