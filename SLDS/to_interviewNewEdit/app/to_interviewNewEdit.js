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
        City__c: locationObj.City__c,
        Country_Region__c: locationObj.Country_Region__c,
        Location_Name__c: locationObj.Name,
        State_Province__c: locationObj.State_Province__c,
        Street_Address__c: locationObj.Street_Address__c,
        Zip_Postal_Code__c: locationObj.Zip_Postal_Code__c,
        Geographical_Location__Latitude__s: locationObj.Geographical_Location__c ? locationObj.Geographical_Location__c.latitude : null,
        Geographical_Location__Longitude__s: locationObj.Geographical_Location__c ? locationObj.Geographical_Location__c.longitude : null
    };
}

function convertInterviewTimeSlotToEventObject(interviewTimeSlotObj) {
    return {
        id: interviewTimeSlotObj.Id,
        title: interviewTimeSlotObj.Status__c === 'Not Possible' ? labels.declined : interviewTimeSlotObj.Status__c == 'Selected' ? labels.accepted : labels.proposed,
        start: moment(interviewTimeSlotObj.Start_Time__c).utcOffset(userTimeZone),
        end: moment(interviewTimeSlotObj.End_Time__c).utcOffset(userTimeZone),
        className: interviewTimeSlotObj.Status__c === 'Not Possible' ? 'fc-declined' : 'fc-available',
        editable: interviewTimeSlotObj.Status__c === 'Not Possible' ? false : true
    };
}

function convertGooglePlaceToLocation(place) { 
    var locationObj = {
        Location_Name__c: place.name,
        Geographical_Location__Latitude__s: place.geometry.location.lat(),
        Geographical_Location__Longitude__s: place.geometry.location.lng(),
        Google_Place_Id__c: place.place_id
    };

    // Street Address field
    var streetNumber = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'street_number');
    });

    if (!Ember.isNone(streetNumber)) {
        locationObj.Street_Address__c = streetNumber.long_name;
    }

    var streetName = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'route');
    });

    if (!Ember.isNone(streetName)) {
        if (Ember.isEmpty(locationObj.Street_Address__c)) {
            locationObj.Street_Address__c = streetName.long_name;
        } else {
            locationObj.Street_Address__c += ' ' + streetName.long_name;
        }
    }

    var unitNumber = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'subpremise');
    });

    if (!Ember.isNone(unitNumber)) {
        if (Ember.isEmpty(locationObj.Street_Address__c)) {
            locationObj.Street_Address__c = unitNumber.long_name;
        } else {
            locationObj.Street_Address__c += ' #' + unitNumber.long_name;
        }
    }

    // City field
    var city = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'locality');
    });

    if (!Ember.isNone(city)) {
        locationObj.City__c = city.long_name;
    }

    // State/Province field
    var stateProvince = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'administrative_area_level_1');
    });

    if (!Ember.isNone(stateProvince)) {
        locationObj.State_Province__c = stateProvince.short_name;
    }

    // Country field
    var country = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'country');
    });

    if (!Ember.isNone(country)) {
        locationObj.Country_Region__c = country.short_name;
    }

    // Zip/Postal Code field
    var zipPostalCode = place.address_components.find(function(ac) {
        return isStringInArray(ac.types, 'postal_code');
    });

    if (!Ember.isNone(zipPostalCode)) {
        locationObj.Zip_Postal_Code__c = zipPostalCode.long_name;
    }

    return locationObj;
}

function initializeGoogleMaps(self) {
    var interview = self.get('interview');
    var selectedLocation = self.get('selectedLocation');
    var initialLocation;
    var markers = [];

    var defaultLocationCoords = {
        lat: 0, 
        lng: 0
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

    if (Ember.isNone(selectedLocation) || 
            Ember.isNone(selectedLocation.Geographical_Location__Latitude__s) || 
            Ember.isNone(selectedLocation.Geographical_Location__Longitude__s)) {
        initialLocation = interview;
    } else {
        initialLocation = selectedLocation;
    }

    var interviewLatitude;
    var interviewLongitude;

    if (!Ember.isNone(initialLocation.Geographical_Location__c)) {
        interviewLatitude = initialLocation.Geographical_Location__c.latitude;
        interviewLongitude = initialLocation.Geographical_Location__c.longitude;
    } else {
        interviewLatitude = initialLocation.Geographical_Location__Latitude__s;
        interviewLongitude = initialLocation.Geographical_Location__Longitude__s;
    }

    if (!Ember.isNone(interviewLatitude) && !Ember.isNone(interviewLongitude)) {
        var position = new google.maps.LatLng(interviewLatitude,interviewLongitude);
        
        var marker = new google.maps.Marker({
            place_id: interview.Google_Place_Id__c,
            position: position,
            title: initialLocation.Location_Name__c
        });
        
        defaultLocationCoords = {
            lat: position.lat() + latitudeOffset,
            lng: position.lng()
        };
        
        infowindow.setPosition(position);
        
        var content = [
            '<strong>' + initialLocation.Location_Name__c + '</strong>',
            '',
            ''
        ];
        
        if (initialLocation.Street_Address__c) {
            content[1] = initialLocation.Street_Address__c;
        }
        if (initialLocation.City__c && initialLocation.State_Province__c) {
            content[2] = initialLocation.City__c + ' ' + initialLocation.State_Province__c;
        }
        if (initialLocation.Zip_Postal_Code__c) {
            if (content[2] != '') {
                content[2] += ', ';
            }
            content[2] += initialLocation.Zip_Postal_Code__c;
        }
        if (initialLocation.Country_Region__c) {
            if (content[2] != '') {
                content[2] += ' ';
            }
            content[2] += initialLocation.Country_Region__c;
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
                    
                    if (location.Street_Address__c) {
                        content[1] = location.Street_Address__c;
                    }
                    if (location.City__c && location.State_Province__c) {
                        content[2] = location.City__c + ' ' + location.State_Province__c;
                    }
                    if (location.Zip_Postal_Code__c) {
                        if (content[2] != '') {
                            content[2] += ', ';
                        }
                        content[2] += location.Zip_Postal_Code__c;
                    }
                    if (location.Country_Region__c) {
                        if (content[2] != '') {
                            content[2] += ' ';
                        }
                        content[2] += location.Country_Region__c;
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
    
    $('#gotoMyLocation').on('click', function() {
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

                Ember.run.later(this, function() {
                    $('#pac-input').val('');
                    $('#pac-input').focus();
                }, 200);
            }, function() {
                $('.geolocation-alert').addClass('visible');
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
                        
                        if (location.Street_Address__c) {
                            content[1] = location.Street_Address__c;
                        }
                        if (location.City__c && location.State_Province__c) {
                            content[2] = location.City__c + ' ' + location.State_Province__c;
                        }
                        if (location.Zip_Postal_Code__c) {
                            if (content[2] != '') {
                                content[2] += ', ';
                            }
                            content[2] += location.Zip_Postal_Code__c;
                        }
                        if (location.Country_Region__c) {
                            if (content[2] != '') {
                                content[2] += ' ';
                            }
                            content[2] += location.Country_Region__c;
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

    google.maps.event.addListenerOnce(map, 'idle', function() {
        Ember.run.later(self, function() {
            $('#pac-input').focus();
        }, 200);
    });

    isGoogleMapsInitialized = true;

    self.set('map', map);
    self.set('infowindow', infowindow);
}

// Kick off Ember
Ember.Object.reopen({
    assetsLocation: assetsLocation
});

App = Ember.Application.create({
    rootElement: '#application'
});

_AljsApp = App;

App.Fixtures = Ember.Object.create({
    isOauthedIntoGoogle: null
});

App.TopicsInputComponent = Ember.TextField.extend({
    attributeBindings: ['topics'],
    keyUp: function(e) {
        if (e.keyCode === 188 || e.keyCode === 13) {
            this.get('topics').addObject(this.get('value').replace(',', ''));
            this.set('value', null);
            console.log(this.get('value'));
        }
    }
});

App.FullCalendarComponent = Ember.Component.extend({
    attributeBindings: ['isOauthedIntoGoogle', 'isOauthedIntoOutlook', 'timeSlots', 'deletedTimeSlots', 'googleCalendars', 'participants', 
                            'notifyCalendarToUpdate', 'calendarEl', 'numberOfTimeSlots', 'timeSlotsChanged', 'notifyCalendarToRemoveParticipants'],
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
                    event.title = labels.proposed;
                    event.start = day;
                    event.end = moment(day).add(durationMilliseconds, 'milliseconds');
                    event.className = 'fc-available';
                    event.editable = true;
                    $calendar.fullCalendar( 'renderEvent', event, true);
                    
                    self.set('numberOfTimeSlots', currentSlots.length + 1);

                    self.set('timeSlotsChanged', true);

                    var acceptedTimeSlot = currentSlots.findBy('title', labels.accepted);

                    if (!Ember.isNone(acceptedTimeSlot)) {
                        acceptedTimeSlot.title = labels.proposed;
                        $calendar.fullCalendar('updateEvent', acceptedTimeSlot);
                    }

                    if (currentSlots.length + 1 === maxNumberOfTimeSlots) {
                        $('.fc-view-container').addClass('fc-not-allowed');
                    }
                }    
            },
            eventClick: function(calEvent, jsEvent, view) {
                if (calEvent.editable === true && $(jsEvent.target).hasClass('close-btn')) {
                    var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);

                    $calendar.fullCalendar('removeEvents', calEvent._id);

                    var eventObj = self.get('timeSlots').findBy('id', calEvent.id);

                    if (!Ember.isNone(eventObj) && eventObj.id.indexOf('available_slot_') === -1) {
                        self.get('deletedTimeSlots').addObject(eventObj.id);
                    }
                    
                    var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);
                    self.set('numberOfTimeSlots', currentSlots.length);
                    self.set('timeSlotsChanged', true);

                    if (currentSlots.length - 1 < maxNumberOfTimeSlots) {
                        $('.fc-view-container').removeClass('fc-not-allowed');
                    }

                    var acceptedTimeSlot = currentSlots.findBy('title', labels.accepted);

                    if (!Ember.isNone(acceptedTimeSlot)) {
                        acceptedTimeSlot.title = labels.proposed;
                        $calendar.fullCalendar('updateEvent', acceptedTimeSlot);
                    }
                }
            },
            eventDrop: function(event, delta, revertFunc) {
                event.title = labels.proposed;
                self.set('timeSlotsChanged', true);

                var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);
                var acceptedTimeSlot = currentSlots.findBy('title', labels.accepted);

                if (!Ember.isNone(acceptedTimeSlot)) {
                    acceptedTimeSlot.title = labels.proposed;
                    $calendar.fullCalendar('updateEvent', acceptedTimeSlot);
                }
            },
            eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                event.title = labels.proposed;
                self.set('durationMilliseconds', event.end.diff(event.start, 'milliseconds'));
                self.set('timeSlotsChanged', true);

                var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);
                var acceptedTimeSlot = currentSlots.findBy('title', labels.accepted);

                if (!Ember.isNone(acceptedTimeSlot)) {
                    acceptedTimeSlot.title = labels.proposed;
                    $calendar.fullCalendar('updateEvent', acceptedTimeSlot);
                }
            },
            // X button for time slots
            eventMouseover: function(event, jsEvent, view) {
                if (event.editable === true) {
                    $(this).find('.fc-content').prepend('<div style="position: absolute; right: 0; top: -2px;"><span class="close-btn">x</span></div>');
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

        var currentSlots = $calendar.fullCalendar('clientEvents').filterBy('editable', true);
        this.set('numberOfTimeSlots', currentSlots.length);

        if (currentSlots.length === maxNumberOfTimeSlots) {
            $('.fc-view-container').addClass('fc-not-allowed');
        }
    },
    removeParticipantCalendars: function() {
        var currentParticipants = this.get('currentParticipants');
        var $calendar = this.$();

        currentParticipants.forEach(function(p) {
            var eventSourceToDelete = p.eventSource;
            $calendar.fullCalendar('removeEventSource', eventSourceToDelete);
        });
    }.observes('notifyCalendarToRemoveParticipants'),
    pullParticipantsCalendarData: function() {
        var $calendar = this.$();
        var pullCalendarData = function() {
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
                    var liColorArray = liCss.match(/rgb\(.+?\)/) || liCss.match(/#.+/);
                    var liColor = !Ember.isNone(liColorArray) ? liColorArray[0] : null;

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
                                                        e.title = labels.busy;
                                                        e.editable = false;
                                                        e.start = moment(e.Start).utcOffset(userTimeZone);
                                                        e.end = moment(e.End).utcOffset(userTimeZone);
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
                                
                participants.forEach(function(p, i) {
                    var liIndex = i+1;
                    var liCss = $chosenParticipants.find('li:eq(' + liIndex + ')').css('box-shadow');
                    var liColorArray = liCss.match(/rgb\(.+?\)/) || liCss.match(/#.+/);
                    var liColor = !Ember.isNone(liColorArray) ? liColorArray[0] : null;
                    var emailComponents = p.Email.split('@');
                    var email = emailComponents[0].replace('.', '').replace(/\+.+/g, '') + '@' + emailComponents[1];
                    
                    var eventSourceToAdd = {    
                        events: function(start, end, timezone, callback) {
                            var reqBody = {
                                timeMin: start,
                                timeMax: end,
                                items: [{
                                    id: email
                                }]
                            };

                            var calRequest = gapi.client.calendar.freebusy.query(reqBody);

                            calRequest.execute(function(calResponse) {
                                if (calResponse.code !== 401) {
                                    var freeBusy = Object.keys(calResponse.calendars).map(function(cal) {
                                        return {
                                            items: calResponse.calendars[cal].busy.map(function(e) {
                                                e.title = labels.busy;
                                                e.editable = false;
                                                e.start = moment(e.start).utcOffset(userTimeZone);
                                                e.end = moment(e.end).utcOffset(userTimeZone);
                                                return e;
                                            })
                                        };
                                    });

                                    callback(freeBusy[0].items);
                                } else {
                                    callback([]);
                                }   
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
                });
            }
        };

        Ember.run.debounce(this, pullCalendarData, 500);
    }.observes('notifyCalendarToUpdate')
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
        var self = this;

        if (!visited) {
            $('#gettingStartedModal').modal();
        }

        $('#updateInvitationModal').on('shown.jui.modal', function() {
            Ember.run.later(this, function() {
                $('.js-updateTextArea').focus();
            }, 300);
        });

        // $('body').tooltip({
        //     selector: '[data-toggle=tooltip]'
        // });

        $('.js-userSearchInput').on('focusout', function(e) {
            if ($(e.relatedTarget).closest('.js-searchResults').length === 0) {
                self.get('controller').set('userSearchTerm', null);
            }
        });

        $('.js-searchResults').on('focusout', function(e) {
            var $newFocusedElement = $(e.relatedTarget);

            if ($newFocusedElement.closest('.js-searchResults').length === 0 && $newFocusedElement.closest('.js-userSearchInput').length === 0) {
                self.get('controller').set('userSearchTerm', null);
            }
        });

        $('.js-locationDropdown').on('focusout', function(e) {
            if ($(e.relatedTarget).closest('.js-locationDropdown').length === 0) {
                self.get('controller').set('isLocationDropdownOpen', false);
            }
        });
    }
});

App.InterviewNewEditController = Ember.ObjectController.extend({
    isLocationDropdownOpen: false,
    statusClass: function() {
        var status = this.get('interview').Status__c;

        return !Ember.isNone(status) ? status.toLowerCase() : 'draft';
    }.property(''),
    isAtMaxParticipants: function() {
        return this.get('participants').length >= 10 ? 'disabled' : false;
    }.property('participants'),
    isEdit: function() {
        return !Ember.isNone(this.get('interview').Id);
    }.property(),
    isOauthedIntoOutlook: function() {
        return !Ember.isEmpty(App.Fixtures.get('outlookToken'));
    }.property('App.Fixtures.outlookToken'),
    isOauthedIntoGoogle: function() {
        return App.Fixtures.get('isOauthedIntoGoogle');
    }.property('App.Fixtures.isOauthedIntoGoogle'),
    googleUserDisplayName: function() {
        return App.Fixtures.get('googleUserDisplayName');
    }.property('App.Fixtures.googleUserDisplayName'),
    isDisabled: function() {
        var interviewStatus = this.get('interview.Status__c');

        var isNew = Ember.isEmpty(interviewStatus);
        var isDraft = interviewStatus === 'Draft';
        var isDeclinedOrCanceled = interviewStatus === 'Declined' || interviewStatus === 'Canceled';
        var timeSlotsChanged = this.get('timeSlotsChanged');
        var whereChanged = this.get('whereChanged');
        var hasParticipants = !Ember.isEmpty(this.get('participants'));
        var hasTimeSlots = this.get('numberOfTimeSlots') > 0;
        
        return (!isNew && !isDraft && (!hasParticipants || !hasTimeSlots)) || (isDeclinedOrCanceled && !timeSlotsChanged && !whereChanged) || this.get('isSaving');
    }.property('participants', 'numberOfTimeSlots', 'timeSlotsChanged', 'whereChanged'),
    isSelectedLocationInPersonOrGoogle: function() {
        return !Ember.isNone(this.get('availableLocations').findBy('Location_Name__c', this.get('selectedLocation').Location_Name__c)) || this.get('googlePlaceSelected') === true;
    }.property('selectedLocation', 'googlePlaceSelected'),
    noLocationsAvailable: function() {
        return Ember.isEmpty(this.get('availableLocations').rejectBy('Location_Name__c', this.get('selectedLocation').Location_Name__c));
    }.property('selectedLocation', 'availableLocations'),
    selectedLocationAddress: function() {
        var selectedLocation = this.get('selectedLocation');
        var address = '';
        if (selectedLocation.Street_Address__c) {
            address += selectedLocation.Street_Address__c;
        }

        if (selectedLocation.City__c) {
            if (!Ember.isEmpty(address)) {
                address += ', ';
            }

            address += selectedLocation.City__c;
        }

        if (selectedLocation.State_Province__c) {
            if (!Ember.isEmpty(address)) {
                address += ', ';
            }

            address += selectedLocation.State_Province__c;
        }

        if (selectedLocation.Zip_Postal_Code__c) {
            if (!Ember.isEmpty(address)) {
                address += ' ';
            }

            address += selectedLocation.Zip_Postal_Code__c;
        }

        return address;
    }.property('selectedLocation'),
    pullGoogleCalendarData: function() {
        var self = this;

        var isOauthedIntoGoogle = self.get('isOauthedIntoGoogle');
        var shouldNotifyCalendar = self.get('shouldNotifyCalendar');

        if (isOauthedIntoGoogle === true) {
            if (self.get('shouldNotifyCalendar') === true) {
                self.toggleProperty('notifyCalendarToUpdate');
                self.set('shouldNotifyCalendar', false);
            }
        } else if (shouldNotifyCalendar === true) {

            $('#oauthIntoGoogleModal').modal();

            $('#oauthIntoGoogleModal').one('hidden.jui.modal', function() {
                openGoogleOauthModal = false;
            });
            
        }
    }.observes('isOauthedIntoGoogle'),
    pullOutlookCalendarData: function() {
        if (this.get('isOauthedIntoOutlook') === true) {
            this.toggleProperty('notifyCalendarToUpdate');
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
        var applicant = this.get('applicant');

        if (!Ember.isEmpty(userSearchTerm)) {
            this.setProperties({
                isSearching: true,
                searchResults: null
            });

            var searchObject = {
                searchTerm: userSearchTerm,
                participants: !Ember.isNone(participants) ? participants.getEach('Id') : []
            };

            if (!Ember.isNone(applicant.Candidate_User__c)) {
                searchObject.participants.addObject(applicant.Candidate_User__c);
            }

            cont.searchParticipants(JSON.stringify(searchObject), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (parsedResult.isSuccess) {
                        var searchResults = parsedResult.data.users;

                        self.setProperties({
                            searchResults: searchResults,
                            isSearching: false
                        });
                    } else {
                        self.set('errorMessage', parsedResult.errorMessages[0]);
                    }
                }
            });
        } else {
            this.set('searchResults', null);
        } 
    },
    saveInterview: function(saveObj) {
        var self = this;
        
        self.set('isSaving', true);
        
        self.presaveInterview(saveObj, function(_saveObj) {
            cont.saveInterview(JSON.stringify(_saveObj), function(res, evt) {
                if (res) {
                    var parsedResult = parseResult(res);
                    
                    if (parsedResult.isSuccess) {
                        if (parsedResult.data && parsedResult.data.interview) {
                            self.set('interview', parsedResult.data.interview);
                        }
                        
                        if (saveObj.interview.Status__c !== 'Draft') {
                            self.sendEmails({
                                interviewId : parsedResult.data.interview.Id,
                                removedInterviewers : self.get('removedParticipants'),
                                previousStatus : self.get('previousStatus'),
                                interviewersChanged : self.get('interviewersChanged'),
                                scheduleChanged : self.get('scheduleChanged'),
                                locationChanged : self.get('locationChanged'),
                                topicsChanged : self.get('topicsChanged')
                            });                         
                        } else {
                            window.location.href = retUrl;
                        }
                    } else {
                        self.setProperties({
                            errorMessage: parsedResult.errorMessages[0],
                            isSaving: false
                        });
                    }
                }
            });
        });
    },
    sendEmails: function(jsonData) {
        var self = this;

        cont.sendEmails(self.get('interview.Email_Token__c'), JSON.stringify(jsonData), function(res, evt) {
            if (res) {
                var parsedResult = parseResult(res);
            
                if (parsedResult.isSuccess) {
                    window.location.href = retUrl;
                } else {
                    self.setProperties({
                        errorMessage: parsedResult.errorMessages[0],
                        isSaving: false
                    });
                }
            }
        });
    },
    presaveInterview: function(saveObj, callback) {
        if (saveObj.interview.Geographical_Location__Latitude__s != null && saveObj.interview.Geographical_Location__Longitude__s != null) {
            $.ajax({
                url:"https://maps.googleapis.com/maps/api/timezone/json?location=" + saveObj.interview.Geographical_Location__Latitude__s + "," + saveObj.interview.Geographical_Location__Longitude__s + "&timestamp=" + (Math.round((new Date().getTime())/1000)).toString() + "&sensor=false",
                success: function(data) {
                    saveObj.interview.Location_Time_Zone__c = data.timeZoneId;
                    callback(saveObj);
                }
            });
        } else {
            callback(saveObj);
        }
    },
    formatTopics: function(interview, topics) {
        var topicIndex = 1;

        if (!Ember.isEmpty(interview.topics)) {
            topics.forEach(function(topic, i) {
                topicIndex = i + 1;
                interview['Topic' + topicIndex + '__c'] = topic;
            });

            topicIndex++;

            delete interview.Topics__c;
        }

        for (var i = topicIndex; i <= 10; i++) {
            interview['Topic' + i + '__c'] = null;
        }
    },
    formatParticipants: function(interview, participants) {
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

        interview.Interviewers__c = interviewersString ? interviewersString : labels.notProvided;

        for (var i = userIndex + 1; i <= 10; i++) {
            interview['User' + i + '__c'] = null;
        }
    },
    formatLocation: function(interview, selectedLocation) {
        if (!Ember.isNone(selectedLocation) && selectedLocation.Location_Name__c !== labels.select) {
            interview.Location_Name__c = null;
            interview.City__c = null;
            interview.Country_Region__c = null;
            interview.Geographical_Location__Latitude__s = null;
            interview.Geographical_Location__Longitude__s = null;
            interview.Location_Name__c = null;
            interview.Location_Time_Zone__c = null;
            interview.State_Province__c = null;
            interview.Street_Address__c = null;
            interview.Zip_Postal_Code__c = null;
            // Don't save location data if it's a custom one.
            if (parsedInterviewNewEditJson.locationTypeValues.indexOf(selectedLocation.Location_Name__c) !== -1) {
                interview.Location_Name__c = selectedLocation.Location_Name__c;
                interview.Location_Type__c = selectedLocation.Location_Name__c;                    
            } else {
                interview.Location_Type__c = 'In Person';
                Object.keys(selectedLocation).forEach(function(key) { 
                    interview[key] = selectedLocation[key] || null;
                });

                interview.Geographical_Location__Latitude__s = selectedLocation.Geographical_Location__Latitude__s;
                interview.Geographical_Location__Longitude__s = selectedLocation.Geographical_Location__Longitude__s;
            }

            delete interview.Geographical_Location__c;
        }
    },
    formatTimeSlots: function(interview, timeSlots) {
        return timeSlots.map(function(ts) {
            return {
                Id: ts.id.indexOf('available_slot_') !== -1 ? null : ts.id,
                Interview__c: interview.Id,
                Start_Time__c: moment(ts.start).format().substring(0,19) + userTimeZone,
                End_Time__c: moment(ts.end).format().substring(0,19) + userTimeZone,
                Status__c: ts.title == labels.accepted ? 'Selected' : 'Possible'
            };
        });
    },
    checkForChanges: function(saveObj) {
        var self = this;
        var $calendar = this.get('calendarEl');

        var interview = this.get('interview');
        var topics = Ember.isEmpty(interview.topics) ? [] : interview.topics;
        var participants = this.get('participants');
        var allCalendarEvents = $calendar.fullCalendar('clientEvents');
        var timeSlots = allCalendarEvents.filterBy('editable', true);
        
        var originalParticipants = this.get('originalParticipants');
        var originalTopics = Ember.isEmpty(this.get('originalTopics')) ? [] : this.get('originalTopics');
        var originalTimeSlots = this.get('originalTimeSlots');
        var originalLocationName = this.get('originalLocationName');
        var originalLocationType = this.get('originalLocationType');
        var originalLogisticalDetails = this.get('originalLogisticalDetails');

        // Check for topic changes
        this.set('topicsChanged', topics.length > 0 && ($(topics).not(originalTopics).length !== 0 || $(originalTopics).not(topics).length !== 0));

        // Check for interviewers changes
        self.set('removedParticipants', []);
        originalParticipants.forEach(function(op){
            if (Ember.isNone(participants.findBy('Id', op.Id))) {
                self.get('removedParticipants').addObject(op.Id+':'+op.Name+':'+op.Email);
            }
        });

        var addedParticipants = [];
        participants.forEach(function(p) {
            if (Ember.isNone(originalParticipants.findBy('Id', p.Id))) {
                addedParticipants.addObject(p.Id);
            }
        });

        self.set('interviewersChanged', !Ember.isEmpty(self.get('removedParticipants')) || !Ember.isEmpty(addedParticipants));

        // check for time slot changes
        self.set('scheduleChanged', false);

        if (timeSlots.length !== originalTimeSlots.length) {
            this.set('scheduleChanged', true);
        } else {
            originalTimeSlots.forEach(function(ots) {
                if (Ember.isEmpty(saveObj.timeSlots.filter(function(ts) {
                    // Find all timeslots that are the same.
                    return moment(ots.Start_Time__c).valueOf() === moment(ts.Start_Time__c).valueOf()
                            && moment(ots.End_Time__c).valueOf() === moment(ts.End_Time__c).valueOf()
                            && ots.Status__c === ts.Status__c;
                }))) { 
                    self.set('scheduleChanged', true);
                }
            });
        }

        // check for location change
        var saveObjCompareDetails = saveObj.interview.Logistical_Details__c || '';
        var originalCompareDetails = originalLogisticalDetails || '';

        var saveObjCompareLocation = saveObj.interview.Location_Name__c || saveObj.interview.Location_Type__c;
        var originalCompareLocation = originalLocationName || originalLocationType; 

        if (saveObjCompareLocation !== originalCompareLocation ||
            saveObjCompareDetails !== originalCompareDetails) {
            self.set('locationChanged', true);
        } else {
            self.set('locationChanged', false);
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

            this.notifyPropertyChange('participants');
            if (this.get('isOauthedIntoGoogle') === false && openGoogleOauthModal === true) {
                self.set('shouldNotifyCalendar', true);
                $('#oauthIntoGoogleModal').modal();

                $('#oauthIntoGoogleModal').one('hidden.jui.modal', function() {
                    openGoogleOauthModal = false;
                });
            } else {
                this.toggleProperty('notifyCalendarToUpdate');
            }
        },
        clickRemoveParticipant: function(participant) {
            this.get('participants').removeObject(participant);
            this.notifyPropertyChange('participants');
            this.toggleProperty('notifyCalendarToUpdate');
        },
        clickSave: function() {
            var self = this;
            var saveObj = {};
            var $calendar = this.get('calendarEl');

            var interview = this.get('interview');
            var participants = this.get('participants');
            var allCalendarEvents = $calendar.fullCalendar('clientEvents');
            var topics = Ember.isEmpty(interview.topics) ? [] : interview.topics;
            var timeSlots = allCalendarEvents.filterBy('editable', true);
            var selectedLocation = this.get('selectedLocation');
            var applicant = this.get('applicant');

            var areParticipantsSelected = !Ember.isEmpty(participants);
            var areTopicsSelected = !Ember.isEmpty(interview.topics);
            var isLocationSelected = !Ember.isNone(selectedLocation) && selectedLocation.Location_Name__c !== labels.select;
            var numTimeSlots = timeSlots.length;

            this.set('isSaving', true);

            // Format data for save object
            this.formatTopics(interview, topics);
            this.formatParticipants(interview, participants);
            this.formatLocation(interview, selectedLocation);

            saveObj.interview = interview;
            saveObj.timeSlots = this.formatTimeSlots(interview, timeSlots); 
            saveObj.deletedTimeSlots = this.get('deletedTimeSlots');

            // Check for changes
            this.checkForChanges(saveObj);
             
            this.set('previousStatus', interview.Status__c);

            this.set('saveObj', saveObj);

            // Branching logic for modals/saving.
            if (Ember.isEmpty(interview.Status__c) || interview.Status__c === 'Draft') {//|| interview.Status__c === 'Canceled' || (interview.Status__c === 'Declined' && Ember.isNone(interview.Start_Time__c))) {
                // Saving a new or draft interview.

                if (numTimeSlots > 1 && areParticipantsSelected && isLocationSelected) {
                // if we have multiple time slots and necessary data has been filled out

                    $('#sendEmailToApplicantModal').modal();
                    $('#sendEmailToApplicantModal').one('hidden.jui.modal', function() {
                        self.set('isSaving', false);
                    });

                } else if (numTimeSlots === 1 && areParticipantsSelected && isLocationSelected) {
                // if there's only a single timeslot and necessary info has been filled out
                    $('#sendICSModal').modal();
                    $('#sendICSModal').one('hidden.jui.modal', function() {
                        self.set('isSaving', false);
                    });
                } else {
                    saveObj.interview.Status__c = 'Draft';
                    this.saveInterview(saveObj);
                }      
            } else if (interview.Status__c === 'Proposed') {
                // Updating a proposed interview.
                if (numTimeSlots === 1 && areParticipantsSelected && isLocationSelected) {
                    // if there's only a single timeslot and necessary info has been filled out
                    $('#sendICSModal').modal();
                    $('#sencICSModal').one('hidden.jui.modal', function() {
                        self.set('isSaving', false);
                    });
                } else {
                    this.saveInterview(saveObj);
                }
            } else if (interview.Status__c === 'Accepted') {
                if ((this.get('scheduleChanged') === true || this.get('locationChanged') === true) 
                        && numTimeSlots > 0 && areParticipantsSelected && isLocationSelected) {
                    
                    $('#updateInvitationModal').modal();
                    $('#updateInvitationModal').one('hidden.jui.modal', function() {
                        self.set('isSaving', false);
                    });
                } else if (this.get('topicsChanged') === true) {
                    $('#topicsChangedModal').modal();
                    $('#topicsChangedModal').one('hidden.jui.modal', function() {
                        self.set('isSaving', false);
                    });
                } else {
                    self.saveInterview(saveObj);
                }
            } else if (interview.Status__c === 'Declined') {
                if (this.get('scheduleChanged') === true && numTimeSlots > 0 && areParticipantsSelected && isLocationSelected) {
                    // Schedule/location changed
                    if (Ember.isEmpty(interview.Start_Time__c) && numTimeSlots > 1) {
                        // If there are more than 1 timeslots and never accepted, new modal
                        $('#reproposeNotAcceptedModal').modal();
                        $('#reproposeNotAcceptedModal').one('hidden.jui.modal', function() {
                            self.set('isSaving', false);
                        });
                    } else if (Ember.isEmpty(interview.Start_Time__c) && numTimeSlots === 1) {
                        // If never accepted and there's only 1 timeslot, show modal to set to accepted
                        $('#sendICSModal').modal();
                        $('#sencICSModal').one('hidden.jui.modal', function() {
                            self.set('isSaving', false);
                        });
                    } else if (!Ember.isEmpty(interview.Start_Time__c)) {
                        $('#updateInvitationModal').modal();
                        $('#updateInvitationModal').one('hidden.jui.modal', function() {
                            self.set('isSaving', false);
                        });
                    }
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
        },
        clickSignOutOfGoogle: function() {
            var self = this;
            cont.deleteGoogleUserIC(googleTokenICId, function(res, evt) {
                if (res) {
                    res = parseResult(res);

                    if (res.isSuccess) {
                        App.Fixtures.set('isOauthedIntoGoogle', false);
                        gapi.auth.setToken({ access_token: 'invalid' });
                        openGoogleOauthModal = true;
                        self.toggleProperty('notifyCalendarToRemoveParticipants');
                        googleTokenICId = null;
                    } else {
                        // ERROR
                    }
                } else {
                    // ERROR
                }
            });
        },
        clickSelectLocation: function(location) {
            this.setProperties({
                selectedLocation: location,
                googlePlaceSelected: false,
                whereChanged: true
            });
            this.set('interview.Google_Place_Id__c', null);
        },
        clickSelectCustomLocation: function(locationName) {
            this.set('selectedLocation', {
                Location_Name__c: locationName
            });
            this.setProperties({
                googlePlaceSelected: false,
                whereChanged: true
            });
        },
        clickSelectGoogleMaps: function() {
            this.set('disableLocationSave', true);
            var $googleMapsModal = $('#googleMapsModal');

            $googleMapsModal.modal()
            $googleMapsModal.one('shown.jui.modal', function() {
                Ember.run.later(this, function() {
                    $('#pac-input').focus();
                }, 200);
            });

            $googleMapsModal.one('hidden.jui.modal', function() {
                Ember.run.later(this, function() {
                    $('#pac-input').val('');
                }, 200);
            });
            
            if (!isGoogleMapsInitialized) {
                initializeGoogleMaps(this);
            } else {
                var map = this.get('map');
                var infowindow = this.get('infowindow');
                var selectedLocation = this.get('selectedLocation');

                if (!Ember.isNone(selectedLocation)) {

                    if (Ember.isNone(selectedLocation.Geographical_Location__Latitude__s) 
                        || Ember.isNone(selectedLocation.Geographical_Location__Longitude__s)) {
                        selectedLocation = this.get('availableLocations')[0];
                    }

                    if (!Ember.isNone(selectedLocation.Geographical_Location__Latitude__s) 
                        && !Ember.isNone(selectedLocation.Geographical_Location__Longitude__s)) {
                        var latitudeOffset = .0005;

                        /*var infowindow = new google.maps.InfoWindow({
                            disableAutoPan: true,
                            pixelOffset: { 
                                height: 0,
                                width: 0
                            }
                        });*/

                        var position = new google.maps.LatLng(selectedLocation.Geographical_Location__Latitude__s,selectedLocation.Geographical_Location__Longitude__s);
                            
                        var marker = new google.maps.Marker({
                            place_id: selectedLocation.Google_Place_Id__c,
                            position: position,
                            title: selectedLocation.Location_Name__c
                        });
                        
                        defaultLocationCoords = {
                            lat: position.lat() + latitudeOffset,
                            lng: position.lng()
                        };
                        
                        infowindow.setPosition(defaultLocationCoords);
                        
                        var content = [
                            '<strong>' + selectedLocation.Location_Name__c + '</strong>',
                            '',
                            ''
                        ];
                        
                        if (selectedLocation.Street_Address__c) {
                            content[1] = selectedLocation.Street_Address__c;
                        }
                        if (selectedLocation.City__c && selectedLocation.State_Province__c) {
                            content[2] = selectedLocation.City__c + ' ' + selectedLocation.State_Province__c;
                        }
                        if (selectedLocation.Zip_Postal_Code__c) {
                            if (content[2] != '') {
                                content[2] += ', ';
                            }
                            content[2] += selectedLocation.Zip_Postal_Code__c;
                        }
                        if (selectedLocation.Country_Region__c) {
                            if (content[2] != '') {
                                content[2] += ' ';
                            }
                            content[2] += selectedLocation.Country_Region__c;
                        }
                        
                        infowindow.setContent('<div>' + content.join('<br>') + '</div>');
                        marker.setMap(map);

                        // Slight delay for Firefox/IE
                        Ember.run.later(this, function() { 
                            infowindow.open(map, marker); 
                            map.setCenter(defaultLocationCoords);
                        }, 300);
                    }
                }
            }
        },
        clickSelectGoogleLocation: function() {
            var selectedGooglePlace = this.get('selectedGooglePlace');
            if (!Ember.isNone(selectedGooglePlace)) {
                this.setProperties({
                    selectedLocation: convertGooglePlaceToLocation(selectedGooglePlace),
                    googlePlaceSelected: true,
                    whereChanged: true
                });
            }
        },
        clickGeoLocationClose: function() {
            $('.geolocation-alert').removeClass('visible');
        },
        clickSendEmail: function() {
            var saveObj = this.get('saveObj');

            saveObj.interview.Status__c = 'Proposed';
            this.saveInterview(saveObj);
        },
        clickJustSave: function() {
            var saveObj = this.get('saveObj');

            saveObj.interview.Status__c = 'Draft';
            this.saveInterview(saveObj);
        },
        clickSendInvitations: function() {
            var saveObj = this.get('saveObj');

            saveObj.interview.Start_Time__c = moment(saveObj.timeSlots[0].Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
            saveObj.interview.End_Time__c = moment(saveObj.timeSlots[0].End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
            saveObj.interview.Status__c = 'Accepted';
            saveObj.timeSlots[0].Status__c = 'Selected';
            this.saveInterview(saveObj);
        },
        clickConfirmSave: function() {
            var saveObj = this.get('saveObj');
            var numTimeSlots = saveObj.timeSlots.length;
            
            if (numTimeSlots === 1) {
                saveObj.interview.Start_Time__c = moment(saveObj.timeSlots[0].Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                saveObj.interview.End_Time__c = moment(saveObj.timeSlots[0].End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                saveObj.interview.Status__c = 'Accepted';
                saveObj.timeSlots[0].Status__c = 'Selected';
            } else if (numTimeSlots > 1 && (saveObj.interview.Status__c !== 'Accepted' || this.get('scheduleChanged') === true)) {
                // Only set this to proposed and change the accepted timeslot to possible, if the interview status is not accepted
                // OR the schedule has changed.
                var acceptedTimeSlot;
                if (acceptedTimeSlot = saveObj.timeSlots.findBy('Status__c', 'Selected')) {
                    saveObj.interview.Start_Time__c = moment(acceptedTimeSlot.Start_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                    saveObj.interview.End_Time__c = moment(acceptedTimeSlot.End_Time__c).utc().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
                    acceptedTimeSlot.Status__c = 'Possible';
                }
                saveObj.interview.Status__c = 'Proposed';
            }
            
            saveObj.updatedInformationMessage = this.get('updatedInformationMessage');

            this.saveInterview(saveObj);
        },
        clickConfirmSendTopicsChange: function() {
            var saveObj = this.get('saveObj');

            this.saveInterview(saveObj);
        },
        clickRemoveTopic: function(topic) {
            this.get('interview.topics').removeObject(topic);
        },
        clickToggleDropdown: function() {
            this.toggleProperty('isLocationDropdownOpen');
        }
    }
});

App.LocationController = Ember.ObjectController.extend({
    isSelected: function() {
        var selectedLocation = this.get('parentController.selectedLocation');
        if (!Ember.isEmpty(selectedLocation)) {
            return this.get('Location_Name__c') === selectedLocation.Location_Name__c;
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
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(parsedInterviewNewEditJson.errorMessage)) {
                reject(parsedInterviewNewEditJson);
            } else {
                var interviewNewEditObj = {
                    interview: parsedInterviewNewEditJson.interview,
                    applicant: parsedInterviewNewEditJson.application
                };

                interviewNewEditObj.originalLogisticalDetails = interviewNewEditObj.interview.Logistical_Details__c;

                self.setupTopics(interviewNewEditObj);
                self.setupParticipants(interviewNewEditObj);
                self.setupTimeSlots(interviewNewEditObj);
                self.setupLocations(interviewNewEditObj);
                self.setupInitialLocation(interviewNewEditObj);

                interviewNewEditObj.deletedTimeSlots = [];
                interviewNewEditObj.calendarEl = null;
                interviewNewEditObj.googlePlaceSelected = !Ember.isEmpty(interviewNewEditObj.interview.Google_Place_Id__c);

                if (Ember.isEmpty(retUrl)) {
                    retUrl = '/' + interviewNewEditObj.interview.Application__c;
                }
                console.log('****MODEL');
                console.log(interviewNewEditObj);
                resolve(interviewNewEditObj);
            }
        });
    },
    setupTopics: function(interviewNewEditObj) {
        if (!Ember.isEmpty(interviewNewEditObj.interview.Topics__c)) {
            interviewNewEditObj.interview.topics = interviewNewEditObj.interview.Topics__c.split(';');
        }

        interviewNewEditObj.originalTopics = interviewNewEditObj.interview.topics;
    },
    setupParticipants: function(interviewNewEditObj) {
        interviewNewEditObj.participants = [];
        for (var i = 1; i <= 10; i++) {
            var interviewer = interviewNewEditObj.interview['User' + i + '__r'];
            if (!Ember.isNone(interviewer)) {
                interviewNewEditObj.participants.addObject(interviewer);
            }
        }
        interviewNewEditObj.shouldNotifyCalendar = !Ember.isEmpty(interviewNewEditObj.participants);
        interviewNewEditObj.notifyCalendarToUpdate = false;

        interviewNewEditObj.originalParticipants = interviewNewEditObj.participants.copy(true);
    },
    setupTimeSlots: function(interviewNewEditObj) {
        interviewNewEditObj.timeSlots = [];
        interviewNewEditObj.originalTimeSlots = [];

        if (!Ember.isEmpty(interviewNewEditObj.interview.Interview_Time_Slots__r)) {
            interviewNewEditObj.interview.Interview_Time_Slots__r.records.forEach(function(ts) {
                var fullCalendarEventObj = convertInterviewTimeSlotToEventObject(ts);

                interviewNewEditObj.timeSlots.addObject(fullCalendarEventObj);
            });

            interviewNewEditObj.originalTimeSlots = interviewNewEditObj.interview.Interview_Time_Slots__r.records.filter(function(ts) {
                return ts.Status__c === 'Possible' || ts.Status__c === 'Selected';
            });
        }
    },
    setupLocations: function(interviewNewEditObj) {
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
                Location_Name__c: lt
            };
        });
    },
    setupInitialLocation: function(interviewNewEditObj) {
        var currentLocationName = interviewNewEditObj.interview.Location_Name__c;
        // replacing a location
        if (!Ember.isEmpty(currentLocationName) && interviewNewEditObj.interview.Location_Type__c === 'In Person') {
            var selectedLocation = interviewNewEditObj.availableLocations.findBy('Location_Name__c', currentLocationName);

            if (Ember.isNone(selectedLocation) || !Ember.isEmpty(interviewNewEditObj.interview.Google_Place_Id__c)) {
                selectedLocation = {
                    City__c: interviewNewEditObj.interview.City__c,
                    Country_Region__c: interviewNewEditObj.interview.Country_Region__c,
                    Location_Name__c: interviewNewEditObj.interview.Location_Name__c,
                    State_Province__c: interviewNewEditObj.interview.State_Province__c,
                    Street_Address__c: interviewNewEditObj.interview.Street_Address__c,
                    Zip_Postal_Code__c: interviewNewEditObj.interview.Zip_Postal_Code__c,
                    Geographical_Location__Latitude__s: !Ember.isNone(interviewNewEditObj.interview.Geographical_Location__c.latitude) ? interviewNewEditObj.interview.Geographical_Location__c.latitude : null,
                    Geographical_Location__Longitude__s: !Ember.isNone(interviewNewEditObj.interview.Geographical_Location__c.longitude) ? interviewNewEditObj.interview.Geographical_Location__c.longitude : null
                };

                interviewNewEditObj.availableLocations.addObject(selectedLocation);
            }

            interviewNewEditObj.selectedLocation = selectedLocation;

            interviewNewEditObj.originalLocationName = selectedLocation.Location_Name__c;
        // no location selected yet
        // set selected location to match first option
        } else {
            interviewNewEditObj.selectedLocation = interviewNewEditObj.availableLocations[0];
            interviewNewEditObj.interview.City__c = interviewNewEditObj.selectedLocation.City__c;
            interviewNewEditObj.interview.Country_Region__c = interviewNewEditObj.selectedLocation.Country_Region__c;
            interviewNewEditObj.interview.Geographical_Location__c = {
                latitude: interviewNewEditObj.selectedLocation.Geographical_Location__Latitude__s,
                longitude: interviewNewEditObj.selectedLocation.Geographical_Location__Longitude__s
            };
            interviewNewEditObj.interview.Location_Name__c = interviewNewEditObj.selectedLocation.Location_Name__c;
            interviewNewEditObj.interview.State_Province__c = interviewNewEditObj.selectedLocation.State_Province__c;
            interviewNewEditObj.interview.Street_Address__c = interviewNewEditObj.selectedLocation.Street_Address__c;
            interviewNewEditObj.interview.Zip_Posting_Code__c = interviewNewEditObj.selectedLocation.Zip_Posting_Code__c;

            // If a custom location is picked
            if (!Ember.isEmpty(interviewNewEditObj.interview.Location_Type__c) && interviewNewEditObj.interview.Location_Type__c !== 'In Person') {
                interviewNewEditObj.selectedLocation = {
                    Location_Name__c: interviewNewEditObj.interview.Location_Type__c
                };

                interviewNewEditObj.originalLocationType = interviewNewEditObj.interview.Location_Type__c;
            }
        }
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

