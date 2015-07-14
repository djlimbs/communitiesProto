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

function isStringInArray(array, string) {
    return array.indexOf(string) !== -1;
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
        title: interviewTimeSlotObj.namespace_Status__c === 'Not possible' ? 'Not possible' : 'Available',
        start: moment(interviewTimeSlotObj.namespace_Start_Time__c).zone(userTimeZone),
        end: moment(interviewTimeSlotObj.namespace_End_Time__c).zone(userTimeZone),
        className: interviewTimeSlotObj.namespace_Status__c === 'Not possible' ? 'fc-declined' : 'fc-available',
        editable: interviewTimeSlotObj.namespace_Status__c === 'Not possible' ? false : true
    };
}

function convertGooglePlaceToLocation(place) { 
    var locationObj = {
        namespace_Location_Name__c: place.name,
        namespace_Geographical_Location__Latitude__s: place.geometry.location.A,
        namespace_Geographical_Location__Longitude__s: place.geometry.location.F,
        namespace_Google_Place_Id__c: place.place_id
    };

    place.address_components.forEach(function(ac) {
        if (isStringInArray(ac.types, 'street_number')) {
            if (Ember.isEmpty(locationObj.namespace_Street_Address__c)) {
                locationObj.namespace_Street_Address__c = ac.long_name;
            } else {
                locationObj.namespace_Street_Address__c += ' ' + ac.long_name;
            }
        }

        if (isStringInArray(ac.types, 'route')) {
            if (Ember.isEmpty(locationObj.namespace_Street_Address__c)) {
                locationObj.namespace_Street_Address__c = ac.long_name;
            } else {
                locationObj.namespace_Street_Address__c += ' ' + ac.long_name;
            }
        }

        if (isStringInArray(ac.types, 'locality')) {
            locationObj.namespace_City__c = ac.long_name;
        }

        if (isStringInArray(ac.types, 'administrative_area_level_1')) {
            locationObj.namespace_State_Province__c = ac.short_name;
        }

        if (isStringInArray(ac.types, 'country')) {
            locationObj.namespace_Country_Region__c = ac.short_name;
        }

        if (isStringInArray(ac.types, 'postal_code')) {
            locationObj.namespace_Zip_Postal_Code__c = ac.long_name;
        }
    });

    return locationObj;
}

function initializeGoogleMapsAutocomplete(self) {
    var interview = self.get('interview');

    var defaultLocationCoords = {
        lat: -33.8688, 
        lng: 151.2195
    };

    if (!Ember.isNone(interview.namespace_Geographical_Location__c)) {
        defaultLocationCoords = {
            lat: interview.namespace_Geographical_Location__c.latitude,
            lng: interview.namespace_Geographical_Location__c.longitude
        };
    }

    var disablePOIStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];

    var mapOptions = {
        center: defaultLocationCoords,
        zoom: 13,
        styles: disablePOIStyles
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location
        marker.setPlace(/** @type {!google.maps.Place} */ ({
            placeId: place.place_id,
            location: place.geometry.location
        }));
        marker.setVisible(true);

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address);
        infowindow.open(map, marker);
    });

    isGoogleMapsInitialized = true;
}

function initializeGoogleMaps(self) {
    var interview = self.get('interview');
    var markers = [];

    var defaultLocationCoords = {
        lat: -33.8688, 
        lng: 151.2195
    };

    var defaultZoom = 13;

    if (!Ember.isNone(interview.namespace_Geographical_Location__c)) {
        defaultLocationCoords = {
            lat: interview.namespace_Geographical_Location__c.latitude,
            lng: interview.namespace_Geographical_Location__c.longitude
        };

        defaultZoom = 17;
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: defaultLocationCoords,
        zoom: defaultZoom
    });

    var placesService = new google.maps.places.PlacesService(map);

    // Create the search box and link it to the UI element.
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    var infowindow = new google.maps.InfoWindow({
        pixelOffset: { 
            height: 0,
            width: -25
        }
    });

    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {

            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location,
                place_id: place.place_id
            });

            google.maps.event.addListener(marker, 'click', function() {
                var thisMarker = this;
                
                placesService.getDetails({
                    placeId: this.place_id
                }, function(selectedPlace, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
                        'Place ID: ' + selectedPlace.place_id + '<br>' +
                        selectedPlace.formatted_address);
                        infowindow.open(map, thisMarker);
                        self.set('selectedGooglePlace', selectedPlace);
                    }
                });   
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
    });
    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });

    isGoogleMapsInitialized = true;
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
            var self = this;
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
                                var eventNonOutlookUsers = self.get('nonOutlookUsers');
                                var dateFormat = 'YYYY-MM-DDThh:mm:ss';
                                var outlookUser = p.Email;
                                var startString = moment(start).format(dateFormat) + 'Z';
                                var endString = moment(end).format(dateFormat) + 'Z';

                                if (eventNonOutlookUsers.indexOf(p.Id) !== -1) {
                                    callback([]);
                                } else {
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
                                }
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

App.InterviewNewEditView = Ember.View.extend({
    afterRenderEvent: function() {
        //$('#gettingStartedModal').modal();
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
                    maxResults: 100,
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
    pullOutlookCalendarData: function() {
        if (this.get('isOauthedIntoOutlook') === true) {
            this.toggleProperty('participantsDidChange');
        }
    }.observes('isOauthedIntoOutlook'),
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
            var applicant = this.get('applicant');

            var isEdit = this.get('isEdit');
            var originalTopics = this.get('originalTopics');
            var originalTimeSlots = this.get('originalTimeSlots');
            var originalParticipants = this.get('originalParticipants');
            var originalLocationName = this.get('originalLocationName');
            var originalLogisticalDetails = this.get('originalLogisticalDetails');
            var scheduleDidChange = false;
            var areParticipantsSelected = false;
            var areTopicsSelected = false;
            var isLocationSelected = false;
            var numTimeSlots = 0;

            this.set('isSaving', true);

            // format topics
            var topicIndex = 1;

            if (!Ember.isEmpty(interview.topics)) {
                interview.topics.split(',').forEach(function(topic, i) {
                    topicIndex = i + 1;
                    interview['Topic' + topicIndex + '__c'] = topic;
                });

                topicIndex++;

                delete interview.Topics__c;

                areTopicsSelected = true;
            }

            for (var i = topicIndex; i <= 10; i++) {
                interview['Topic' + i + '__c'] = null;
            }

            // format participants
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

            if (!Ember.isEmpty(participants)) {
                areParticipantsSelected = true;
            }

            // format time slots
            saveObj.timeSlots = timeSlots.map(function(ts) {
                return {
                    Id: ts.id.indexOf('available_slot_') !== -1 ? null : ts.id,
                    namespace_Interview__c: interview.Id,
                    namespace_Start_Time__c: moment(ts.start).format().substring(0,19) + userTimeZone,
                    namespace_End_Time__c: moment(ts.end).format().substring(0,19) + userTimeZone,
                    namespace_Status__c: 'Possible' 
                };
            });

            saveObj.deletedTimeSlots = this.get('deletedTimeSlots');

            numTimeSlots = timeSlots.length;

            // save location info
            if (!Ember.isNone(selectedLocation) && selectedLocation.namespace_Location_Name__c !== 'Select...') {
                // Don't save location data if it's a custom one.
                if (parsedInterviewNewEditJson.locationTypeValues.indexOf(selectedLocation.namespace_Location_Name__c) !== -1) {
                    saveObj.interview.namespace_Location_Name__c = null;
                    saveObj.interview.namespace_City__c = null;
                    saveObj.interview.namespace_Country_Region__c = null;
                    saveObj.interview.namespace_Location_Name__c = null;
                    saveObj.interview.namespace_State_Province__c = null;
                    saveObj.interview.namespace_Street_Address__c = null;
                    saveObj.interview.namespace_Zip_Postal_Code__c = null;
                    saveObj.interview.namespace_Location_Type__c = selectedLocation.namespace_Location_Name__c;
                } else {
                    saveObj.interview.namespace_Location_Type__c = 'In person';
                    Object.keys(selectedLocation).forEach(function(key) { 
                        saveObj.interview[key] = selectedLocation[key];
                    });

                    saveObj.interview.namespace_Geographical_Location__Latitude__s = selectedLocation.namespace_Geographical_Location__Latitude__s;
                    saveObj.interview.namespace_Geographical_Location__Longitude__s = selectedLocation.namespace_Geographical_Location__Longitude__s;

                    delete saveObj.interview.namespace_Geographical_Location__c;
                }

                isLocationSelected = true;
            }

            // check for topic changes
            /*
            if (interview.topics !== originalTopics) {
                scheduleDidChange = true;
            }
            */

            // check if interview has removed participants
            var removedParticipants = [];
            originalParticipants.forEach(function(op){
                if (Ember.isNone(participants.findBy('Id', op.Id))) {
                    removedParticipants.addObject(op.Id);
                }
            });

            // check if interview has added participants
            var addedParticipants = [];
            participants.forEach(function(p) {
                if (Ember.isNone(originalParticipants.findBy('Id', p.Id))) {
                    addedParticipants.addObject(p.Id);
                }
            });

            if (!Ember.isEmpty(removedParticipants) || !Ember.isEmpty(addedParticipants)) {
                scheduleDidChange = true;
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


            if (Ember.isEmpty(interview.namespace_Status__c) || interview.namespace_Status__c === 'Draft') {
                // Saving a new or draft interview.

                if (numTimeSlots > 1 && areParticipantsSelected && isLocationSelected) {
                    // if we have multiple time slots and necessary data has been filled out

                    $('#sendEmailToApplicantModal').modal();

                    $('.js-confirmSendEmail').off('click');
                    $('.js-justSave').off('click');

                    $('.js-confirmSendEmail').one('click', function() {
                        saveObj.emailProxies = [{
                            Template__c: 'Time Slot Selector',
                            Application__c: parsedInterviewNewEditJson.application.Id,
                            Email__c: parsedInterviewNewEditJson.application.Email__c
                        }];
                        saveObj.interview.namespace_Status__c = 'Proposed';
                        self.saveInterview(saveObj);
                    });

                    $('.js-justSave').one('click', function() {
                        saveObj.interview.namespace_Status__c = 'Draft';
                        self.saveInterview(saveObj);
                    });
                } else if (numTimeSlots === 1 && areParticipantsSelected && isLocationSelected) {
                    // if there's only a single timeslot and necessary info has been filled out

                    $('#sendICSModal').modal();

                    $('.js-confirmSendInvitations').off('click');

                    $('.js-confirmSendInvitations').one('click', function() {
                        // do the ICS invite stuff.
                        saveObj.emailProxies = [{
                            Template__c: 'ICS Accepted Applicant',
                            Application__c: parsedInterviewNewEditJson.application.Id,
                            Email__c: parsedInterviewNewEditJson.application.Email__c
                        }];

                        // add every interviewer's ICS.

                        participants.forEach(function(p) {
                            saveObj.emailProxies.addObject({
                                Template__c: 'ICS Accepted Interviewer',
                                Application__c: parsedInterviewNewEditJson.application.Id,
                                Email__c: p.Email
                            });
                        });
                        saveObj.interview.namespace_Start_Time__c = moment(saveObj.timeSlots[0].namespace_Start_Time__c).utc().format('YYYYMMDDTHHmmss') + 'Z';
                        saveObj.interview.namespace_End_Time__c = moment(saveObj.timeSlots[0].namespace_End_Time__c).utc().format('YYYYMMDDTHHmmss') + 'Z';
                        saveObj.interview.namespace_Status__c = 'Accepted';
                        self.saveInterview(saveObj);
                    });
                } else {
                    saveObj.interview.namespace_Status__c = !Ember.isEmpty(interview.namespace_Status__c) ? interview.namespace_Status__c : 'Draft';
                    this.saveInterview(saveObj);
                }      
            } else if (interview.namespace_Status__c === 'Proposed') {
                // Updating a proposed interview.

                this.saveInterview(saveObj);

            } else if (interview.namespace_Status__c === 'Accepted' || interview.namespace_Status__c === 'Declined' || interview.namespace_Status__c === 'Canceled') {
                if (scheduleDidChange === true && numTimeSlots > 0 && areParticipantsSelected && isLocationSelected) {
                    $('#updateInvitationModal').modal();

                    $('.js-confirmSave').one('click', function() {
                        saveObj.emailProxies = [];

                        if (!Ember.isEmpty(removedParticipants)) {
                            // Send cancellation ICS to removed interviewer.
                            removedParticipants.forEach(function(rp) {
                                saveObj.emailProxies.addObject({
                                    Template__c: 'ICS Remove Interviewer', // MAKE THIS TEMPLATE
                                    Application__c: parsedInterviewNewEditJson.application.Id,
                                    Email__c: rp.Email__c
                                });
                            });
                            
                        }

                        if (numTimeSlots === 1) {
                            // add applicant's ICS.
                            saveObj.emailProxies.addObject({
                                Template__c: 'ICS Accepted Applicant',
                                Application__c: parsedInterviewNewEditJson.application.Id,
                                Email__c: parsedInterviewNewEditJson.application.Email__c
                            });

                            // add every interviewer's ICS.

                            participants.forEach(function(p) {
                                saveObj.emailProxies.addObject({
                                    Template__c: 'ICS Accepted Interviewer',
                                    Application__c: parsedInterviewNewEditJson.application.Id,
                                    Email__c: p.Email
                                });
                            });
                            saveObj.interview.namespace_Start_Time__c = moment(saveObj.timeSlots[0].namespace_Start_Time__c).utc().format('YYYYMMDDTHHmmss') + 'Z';
                            saveObj.interview.namespace_End_Time__c = moment(saveObj.timeSlots[0].namespace_End_Time__c).utc().format('YYYYMMDDTHHmmss') + 'Z';

                            saveObj.interview.namespace_Status__c = 'Accepted';
                        }

                        if (numTimeSlots > 1) {

                            saveObj.emailProxies.addObject({
                                Template__c: 'Time Slot Selector',
                                Application__c: parsedInterviewNewEditJson.application.Id,
                                Email__c: parsedInterviewNewEditJson.application.Email__c
                            });

                            saveObj.interview.namespace_Status__c = 'Proposed';
                            saveObj.interview.namespace_Status__c = 'Proposed';
                        }

                        self.saveInterview(saveObj);
                    });
                } else {
                    self.saveInterview(saveObj);
                }
            }
            
        },
        clickCancel: function() {
            window.location.href = retUrl;
        },
        clickCancelModal: function() {
            this.setProperties({
                isSaving: false,
                saveObj: null
            });
        },
        clickOauthIntoGoogle: function() {
            var oauthOptions = {
                response_type: 'code',
                client_id: CLIENT_ID,
                redirect_uri: GOOGLE_REDIRECT_URI,
                state: encodeURIComponent(window.location.href),
                scope: SCOPES
            };

            var oauthUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=' + oauthOptions.client_id
                            + '&response_type=' + oauthOptions.response_type
                            + '&redirect_uri=' + oauthOptions.redirect_uri
                            + '&state=' + oauthOptions.state
                            + '&scope=' + oauthOptions.scope;


            var strWindowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no,height=650,width=600";

            var outlookOauthWindow = window.open(oauthUrl, "Google", strWindowFeatures);
            /*
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
            */
        },
        clickSelectLocation: function(location) {
            this.set('selectedLocation', location);
        },
        clickSelectCustomLocation: function(locationName) {
            this.set('selectedLocation', {
                namespace_Location_Name__c: locationName
            });
        },
        clickSelectGoogleMaps: function() {
            if (!isGoogleMapsInitialized) {
                initializeGoogleMaps(this);
            }
            $('#googleMapsModal').modal();

        },
        clickSelectGoogleLocation: function() {
            var selectedGooglePlace = this.get('selectedGooglePlace');
            if (!Ember.isNone(selectedGooglePlace)) {
                this.set('selectedLocation', convertGooglePlaceToLocation(selectedGooglePlace));
            }
        }
    }
});

App.LocationController = Ember.ObjectController.extend({
    isSelected: function() {
        var selectedLocation = this.get('parentController.selectedLocation');
        if (!Ember.isEmpty(selectedLocation)) {
            return this.get('namespace_Location_Name__c') === selectedLocation.namespace_Location_Name__c;
        } else {
            return false;
        }
    }.property('parentController.selectedLocation')
});

App.InterviewNewEditRoute = Ember.Route.extend({
    beforeModel: function() {
        var code = getUrlParameter('code');

        if (!Ember.isEmpty(code)) {
            if (window.opener) {
                window.opener.setGoogleOauthCode(code);
                window.close();
            }
        }
    },
    model: function (){
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(parsedInterviewNewEditJson.errorMessage)) {
                reject(parsedInterviewNewEditJson);
            } else {
                var interviewNewEditObj = {
                    interview: parsedInterviewNewEditJson.interview,
                    applicant: parsedInterviewNewEditJson.application
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

                interviewNewEditObj.customLocations = parsedInterviewNewEditJson.locationTypeValues.map(function(lt) {
                    return {
                        namespace_Location_Name__c: lt
                    };
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
                } else if (!Ember.isEmpty(interviewNewEditObj.interview.namespace_Location_Type__c) && interviewNewEditObj.interview.namespace_Location_Type__c !== 'In person') {
                    interviewNewEditObj.selectedLocation = {
                        namespace_Location_Name__c: interviewNewEditObj.interview.namespace_Location_Type__c
                    };
                } else {
                    interviewNewEditObj.selectedLocation = interviewNewEditObj.availableLocations[0];
                }

                interviewNewEditObj.deletedTimeSlots = [];

                interviewNewEditObj.calendarEl = null;

                if (Ember.isEmpty(retUrl)) {
                    retUrl = '/' + interviewNewEditObj.interview.Application__c;
                }
                console.log('****MODEL');
                console.log(interviewNewEditObj);
                resolve(interviewNewEditObj);
            }
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

