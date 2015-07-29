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
        namespace_Geographical_Location__Latitude__s: locationObj.Geographical_Location__c ? locationObj.Geographical_Location__c.latitude : null,
        namespace_Geographical_Location__Longitude__s: locationObj.Geographical_Location__c ? locationObj.Geographical_Location__c.longitude : null
    };
}

function convertInterviewTimeSlotToEventObject(interviewTimeSlotObj) {
    return {
        id: interviewTimeSlotObj.Id,
        title: interviewTimeSlotObj.namespace_Status__c === 'Not possible' ? 'Not possible' : interviewTimeSlotObj.namespace_Status__c == 'Selected' ? 'Accepted' : 'Available',
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

function initializeGoogleMaps(self) {
    var interview = self.get('interview');
    var markers = [];

    var defaultLocationCoords = {
        lat: -33.8688, 
        lng: 151.2195
    };

    var defaultZoom = 17;
    var latitudeOffset = .0005;

    var infowindow = new google.maps.InfoWindow({
        disableAutoPan: true,
        pixelOffset: { 
            height: 0,
            width: 0
        }
    });

    if (!Ember.isNone(interview.namespace_Geographical_Location__c)) {
        var position = new google.maps.LatLng(interview.namespace_Geographical_Location__c.latitude,interview.namespace_Geographical_Location__c.longitude);
        
        var marker = new google.maps.Marker({
            place_id: interview.namespace_Google_Place_Id__c,
            position: position,
            title: interview.namespace_Location_Name__c
        });
        
        defaultLocationCoords = {
            lat: position.A + latitudeOffset,
            lng: position.F
        };
        
        infowindow.setPosition(position);
        
        var content = [
            '<strong>' + interview.namespace_Location_Name__c + '</strong>',
            '',
            ''
        ];
        
        if (interview.namespace_Street_Address__c) {
            content[1] = interview.namespace_Street_Address__c;
        }
        if (interview.namespace_City__c && interview.namespace_State_Province__c) {
            content[2] = interview.namespace_City__c + ' ' + interview.namespace_State_Province__c;
        }
        if (interview.namespace_Zip_Postal_Code__c) {
            if (content[2] != '') {
                content[2] += ', ';
            }
            content[2] += interview.namespace_Zip_Postal_Code__c;
        }
        if (interview.namespace_Country_Region__c) {
            if (content[2] != '') {
                content[2] += ' ';
            }
            content[2] += interview.namespace_Country_Region__c;
        }
        
        infowindow.setContent('<div>' + content.join('<br>') + '</div>');
        
        markers.push(marker);
        
        google.maps.event.addListener(marker, 'click', function() {
            var thisMarker = this;
            
            placesService.getDetails({
                placeId: this.place_id
            }, function(selectedPlace, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var content = [
                        '<strong>' + selectedPlace.name + '</strong>',
                        '',
                        ''
                    ];
                    
                    var location = convertGooglePlaceToLocation(selectedPlace);
                    
                    if (location.namespace_Street_Address__c) {
                        content[1] = location.namespace_Street_Address__c;
                    }
                    if (location.namespace_City__c && location.namespace_State_Province__c) {
                        content[2] = location.namespace_City__c + ' ' + location.namespace_State_Province__c;
                    }
                    if (location.namespace_Zip_Postal_Code__c) {
                        if (content[2] != '') {
                            content[2] += ', ';
                        }
                        content[2] += location.namespace_Zip_Postal_Code__c;
                    }
                    if (location.namespace_Country_Region__c) {
                        if (content[2] != '') {
                            content[2] += ' ';
                        }
                        content[2] += location.namespace_Country_Region__c;
                    }
                    
                    infowindow.setContent('<div>' + content.join('<br>') + '</div>');
                    infowindow.open(map, thisMarker);
                    
                    var markerPosition = thisMarker.getPosition();
                    map.setCenter(new google.maps.LatLng(markerPosition.lat() + latitudeOffset, markerPosition.lng()));
                    map.setZoom(defaultZoom);
                    
                    self.set('selectedGooglePlace', selectedPlace);
                    self.set('disableLocationSave', false);
                }
            });   
        });
        
        defaultZoom = 17;
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: defaultLocationCoords,
        zoom: defaultZoom,
        styles: [{
            featureType: "poi",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit.station",
            stylers: [{
                visibility: "off"
            }]
        }]
    });
    
    var placesService = new google.maps.places.PlacesService(map);

    // Create the search box and link it to the UI element.
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(map);
        infowindow.open(map, marker);
    }
    
    $('#center-button').on('click', function() {
        // Try HTML5 geolocation
        if(navigator.geolocation) {
            var $self = $(this);
            $self.addClass('load-this');
            $self.addClass('disabled');
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(pos);
                map.setZoom(defaultZoom);
                
                $self.removeClass('load-this');
                $self.removeClass('disabled');
            }, function() {
                $self.removeClass('load-this');
                $self.removeClass('disabled');
            });
          } else {
              // do nothing
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
                        var content = [
                            '<strong>' + selectedPlace.name + '</strong>',
                            '',
                            ''
                        ];
                        
                        var location = convertGooglePlaceToLocation(selectedPlace);
                        
                        if (location.namespace_Street_Address__c) {
                            content[1] = location.namespace_Street_Address__c;
                        }
                        if (location.namespace_City__c && location.namespace_State_Province__c) {
                            content[2] = location.namespace_City__c + ' ' + location.namespace_State_Province__c;
                        }
                        if (location.namespace_Zip_Postal_Code__c) {
                            if (content[2] != '') {
                                content[2] += ', ';
                            }
                            content[2] += location.namespace_Zip_Postal_Code__c;
                        }
                        if (location.namespace_Country_Region__c) {
                            if (content[2] != '') {
                                content[2] += ' ';
                            }
                            content[2] += location.namespace_Country_Region__c;
                        }
                        
                        infowindow.setContent('<div>' + content.join('<br>') + '</div>');
                        infowindow.open(map, thisMarker);
                        
                        var markerPosition = thisMarker.getPosition();
                        map.setCenter(new google.maps.LatLng(markerPosition.lat() + latitudeOffset, markerPosition.lng()));
                        map.setZoom(defaultZoom);
                        
                        self.set('selectedGooglePlace', selectedPlace);
                        self.set('disableLocationSave', false);
                    }
                });   
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
        }
        
        // select marker if only 1
        if (markers.length == 1) {
            google.maps.event.trigger(markers[0], 'click');
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
    attributeBindings: ['isOauthedIntoGoogle', 'isOauthedIntoOutlook', 'timeSlots', 'deletedTimeSlots', 'googleCalendars', 'participants', 'participantsDidChange', 'isEdit', 'calendarEl', 'numberOfTimeSlots'],
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
                    
                    self.set('numberOfTimeSlots', currentSlots.length + 1);
                }    
            },
            eventClick: function(calEvent, jsEvent, view) {
                if (calEvent.editable === true && $(jsEvent.target).hasClass('juicon')) {
                    $calendar.fullCalendar('removeEvents', calEvent._id);

                    var eventObj = self.get('timeSlots').findBy('id', calEvent.id);

                    if (!Ember.isNone(eventObj) && eventObj.id.indexOf('available_slot_') === -1) {
                        self.get('deletedTimeSlots').addObject(eventObj.id);
                    }
                    
                    var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);
                    self.set('numberOfTimeSlots', currentSlots.length);
                }
            },
            eventDrop: function(event, delta, revertFunc) {
                event.title = 'Available';
            },
            eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                self.set('durationMilliseconds', event.end.diff(event.start, 'milliseconds'));
            },
            // X button for time slots
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
        this.set('numberOfTimeSlots', $calendar.fullCalendar('clientEvents').filterBy('editable', true).length);
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
                    //if (!Ember.isNone(googleCalendars.findBy('id', p.Email))) {
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
                    //}
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
        if (!visited) {
            $('#gettingStartedModal').modal();
        }
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
    isDisabled: function() {
        var isNew = Ember.isEmpty(this.get('interview.namespace_Status__c'));
        var isDraft = this.get('interview.namespace_Status__c') === 'Draft';
        var hasParticipants = !Ember.isEmpty(this.get('participants'));
        var hasTimeSlots = this.get('numberOfTimeSlots') > 0;
        
        return !isNew && !isDraft && (!hasParticipants || !hasTimeSlots);
    }.property('participantsDidChange', 'numberOfTimeSlots'),
    pullGoogleCalendarData: function() {
        var self = this;
        var calendarColors = ['blue', 'green', 'orange'];

        var isOauthedIntoGoogle = self.get('isOauthedIntoGoogle');
        var toggleParticipants = self.get('toggleParticipants');

        if (isOauthedIntoGoogle === true) {
            gapi.client.load('calendar', 'v3', getAllCalendars);
                    
            function getAllCalendars() {
                if (self.get('toggleParticipants') === true) {
                    self.toggleProperty('participantsDidChange');
                    self.set('toggleParticipants', false);
                }
                /*var allCalRequest = gapi.client.calendar.calendarList.list({
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
                    }
                });*/
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
                        console.log(parsedResult);
                        // UH OH
                    }
                }
            });
        } else {
            this.set('searchResults', null);
        } 
    },
    saveInterview: function(saveObj) {
        var self = this;
        
        self.presaveInterview(saveObj, function(_saveObj) {
                cont.saveInterview(JSON.stringify(_saveObj), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);
                    
                    if (Ember.isEmpty(parsedResult.errorMessages)) {
                        self.sendEmails({
                            interviewId : parsedResult.data.interview.Id,
                            message : self.get('updatedInformationMessage') ? self.get('updatedInformationMessage') : '',
                            removedInterviewers : self.get('removedParticipants'),
                            topicsChanged : false
                        });
                    } else {
                        console.log(parsedResult)
                        // BROKE DAWG
                    }
                }
            });
        });
    },
    sendEmails: function(jsonData) {
        cont.sendEmails(JSON.stringify(jsonData), function(res, evt) {
            if (res) {
                var parsedResult = parseResult(res);
                
                if (Ember.isEmpty(parsedResult.errorMessages)) {
                    window.location.href = retUrl;
                } else {
                    console.log(parsedResult);
                }
            }
        });
    },
    presaveInterview: function(saveObj, callback) {
        if (saveObj.interview.namespace_Geographical_Location__Latitude__s != null && saveObj.interview.namespace_Geographical_Location__Longitude__s != null) {
            $.ajax({
                url:"https://maps.googleapis.com/maps/api/timezone/json?location=" + saveObj.interview.namespace_Geographical_Location__Latitude__s + "," + saveObj.interview.namespace_Geographical_Location__Longitude__s + "&timestamp=" + (Math.round((new Date().getTime())/1000)).toString() + "&sensor=false",
                success: function(data) {
                    saveObj.interview.namespace_Location_Time_Zone__c = data.timeZoneId;
                    callback(saveObj);
                }
            });
        } else {
            callback(saveObj);
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
            var userIndex = 0;
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

            interview.Interviewers__c = interviewersString ? interviewersString : '';

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
                    namespace_Status__c: ts.title == 'Accepted' ? 'Selected' : 'Possible'
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
                    saveObj.interview.namespace_Geographical_Location__Latitude__s = null;
                    saveObj.interview.namespace_Geographical_Location__Longitude__s = null;
                    saveObj.interview.namespace_Location_Name__c = null;
                    saveObj.interview.namespace_Location_Time_Zone__c = null;
                    saveObj.interview.namespace_State_Province__c = null;
                    saveObj.interview.namespace_Street_Address__c = null;
                    saveObj.interview.namespace_Zip_Postal_Code__c = null;
                    saveObj.interview.namespace_Location_Type__c = selectedLocation.namespace_Location_Name__c;
                    
                    delete saveObj.interview.namespace_Geographical_Location__c;
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
            self.set('removedParticipants', []);
            originalParticipants.forEach(function(op){
                if (Ember.isNone(participants.findBy('Id', op.Id))) {
                    self.get('removedParticipants').addObject(op.Id);
                }
            });

            // check if interview has added participants
            var addedParticipants = [];
            participants.forEach(function(p) {
                if (Ember.isNone(originalParticipants.findBy('Id', p.Id))) {
                    addedParticipants.addObject(p.Id);
                }
            });

            if (!Ember.isEmpty(self.get('removedParticipants')) || !Ember.isEmpty(addedParticipants)) {
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

            // check for location changes and logistical detail changes
            if (saveObj.interview.namespace_Location_Name__c !== originalLocationName ||
                saveObj.interview.namespace_Logistical_Details__c !== originalLogisticalDetails) {
                scheduleDidChange = true;
            }

            if (Ember.isEmpty(interview.namespace_Status__c) || interview.namespace_Status__c === 'Draft') {
                // Saving a new or draft interview.

                if (numTimeSlots > 1 && areParticipantsSelected && isLocationSelected) {
                    // if we have multiple time slots and necessary data has been filled out

                    $('#sendEmailToApplicantModal').modal();

                    $('.js-confirmsendEmails').off('click');
                    $('.js-justSave').off('click');

                    $('.js-confirmsendEmails').one('click', function() {
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
                        saveObj.interview.namespace_Date_and_Time__c = moment(saveObj.timeSlots[0].namespace_Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                        saveObj.interview.namespace_End_Time__c = moment(saveObj.timeSlots[0].namespace_End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                        saveObj.interview.namespace_Status__c = 'Accepted';
                        saveObj.timeSlots[0].namespace_Status__c = 'Selected';
                        self.saveInterview(saveObj);
                    });
                } else {
                    saveObj.interview.namespace_Status__c = 'Draft';
                    this.saveInterview(saveObj);
                }      
            } else if (interview.namespace_Status__c === 'Proposed') {
                // Updating a proposed interview.
                if (numTimeSlots === 1 && areParticipantsSelected && isLocationSelected) {
                    // if there's only a single timeslot and necessary info has been filled out
                    $('#sendICSModal').modal();
                    $('.js-confirmSendInvitations').off('click');
                    $('.js-confirmSendInvitations').one('click', function() {
                        saveObj.interview.namespace_Date_and_Time__c = moment(saveObj.timeSlots[0].namespace_Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                        saveObj.interview.namespace_End_Time__c = moment(saveObj.timeSlots[0].namespace_End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                        saveObj.interview.namespace_Status__c = 'Accepted';
                        saveObj.timeSlots[0].namespace_Status__c = 'Selected';
                        self.saveInterview(saveObj);
                    });
                } else {
                    this.saveInterview(saveObj);
                }
            } else if (interview.namespace_Status__c === 'Accepted' || interview.namespace_Status__c === 'Declined' || interview.namespace_Status__c === 'Canceled') {
                if (scheduleDidChange === true && numTimeSlots > 0 && areParticipantsSelected && isLocationSelected) {
                    $('#updateInvitationModal').modal();

                    $('.js-confirmSave').one('click', function() {
                        if (numTimeSlots === 1) {
                            saveObj.interview.namespace_Date_and_Time__c = moment(saveObj.timeSlots[0].namespace_Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                            saveObj.interview.namespace_End_Time__c = moment(saveObj.timeSlots[0].namespace_End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                            saveObj.interview.namespace_Status__c = 'Accepted';
                            saveObj.timeSlots[0].namespace_Status__c = 'Selected';
                        } else if (numTimeSlots > 1) {
                            var acceptedTimeSlot;
                            if (acceptedTimeSlot = saveObj.timeSlots.findBy('namespace_Status__c', 'Selected')) {
                                saveObj.interview.namespace_Date_and_Time__c = moment(acceptedTimeSlot.namespace_Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                                saveObj.interview.namespace_End_Time__c = moment(acceptedTimeSlot.namespace_End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                                acceptedTimeSlot.namespace_Status__c = 'Possible';
                            }
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
        clickRemoveLocation: function() {
            this.set('selectedLocation', null);
            this.set('selectedLocation', this.get('availableLocations')[0]);
            this.set('interview.namespace_City__c', this.get('selectedLocation.namespace_City__c'));
            this.set('interview.namespace_Country_Region__c', this.get('selectedLocation.namespace_Country_Region__c'));
            this.set('interview.namespace_Geographical_Location__c', {
                latitude: this.get('selectedLocation.namespace_Geographical_Location__Latitude__s'),
                longitude: this.get('selectedLocation.namespace_Geographical_Location__Longitude__s')
            });
            this.set('interview.namespace_Location_Name__c', this.get('selectedLocation.namespace_Location_Name__c'));
            this.set('interview.namespace_State_Province__c', this.get('selectedLocation.namespace_State_Province__c'));
            this.set('interview.namespace_Street_Address__c', this.get('selectedLocation.namespace_Street_Address__c'));
            this.set('interview.namespace_Zip_Posting_Code__c', this.get('selectedLocation.namespace_Zip_Posting_Code__c'));
            
            // no 'In person' interview?
            if (!Ember.isEmpty(this.get('interview.namespace_Location_Type__c')) &&
                this.get('interview.namespace_Location_Type__c') !== 'In person'
            ) {
                this.set('selectedLocation', {
                    namespace_Location_Name__c: this.get('interview.namespace_Location_Type__c')
                });
            }
            
            this.set('googlePlaceSelected', false);
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
            
            this.set('disableLocationSave', true);
            $('#googleMapsModal').modal();

        },
        clickSelectGoogleLocation: function() {
            var selectedGooglePlace = this.get('selectedGooglePlace');
            if (!Ember.isNone(selectedGooglePlace)) {
                this.set('selectedLocation', convertGooglePlaceToLocation(selectedGooglePlace));
                this.set('googlePlaceSelected', true);
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
                // replacing a location
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
                // no location selected yet
                // set selected location to match first option
                else {
                    interviewNewEditObj.selectedLocation = interviewNewEditObj.availableLocations[0];
                    interviewNewEditObj.interview.namespace_City__c = interviewNewEditObj.selectedLocation.namespace_City__c;
                    interviewNewEditObj.interview.namespace_Country_Region__c = interviewNewEditObj.selectedLocation.namespace_Country_Region__c;
                    interviewNewEditObj.interview.namespace_Geographical_Location__c = {
                        latitude: interviewNewEditObj.selectedLocation.namespace_Geographical_Location__Latitude__s,
                        longitude: interviewNewEditObj.selectedLocation.namespace_Geographical_Location__Longitude__s
                    };
                    interviewNewEditObj.interview.namespace_Location_Name__c = interviewNewEditObj.selectedLocation.namespace_Location_Name__c;
                    interviewNewEditObj.interview.namespace_State_Province__c = interviewNewEditObj.selectedLocation.namespace_State_Province__c;
                    interviewNewEditObj.interview.namespace_Street_Address__c = interviewNewEditObj.selectedLocation.namespace_Street_Address__c;
                    interviewNewEditObj.interview.namespace_Zip_Posting_Code__c = interviewNewEditObj.selectedLocation.namespace_Zip_Posting_Code__c;
                    
                    // no 'In person' interview?
                    if (!Ember.isEmpty(interviewNewEditObj.interview.namespace_Location_Type__c) &&
                        interviewNewEditObj.interview.namespace_Location_Type__c !== 'In person'
                    ) {
                        interviewNewEditObj.selectedLocation = {
                            namespace_Location_Name__c: interviewNewEditObj.interview.namespace_Location_Type__c
                        };
                    }
                }

                interviewNewEditObj.deletedTimeSlots = [];
                interviewNewEditObj.calendarEl = null;
                interviewNewEditObj.googlePlaceSelected = interviewNewEditObj.interview.namespace_Google_Place_Id__c ? true : false;

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

