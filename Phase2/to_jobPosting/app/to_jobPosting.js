/* Use like: {{comma string}} and it'll add some spaces between commas.*/
Ember.Handlebars.helper('comma', function (listString, options) {
    if (!Handlebars.Utils.isEmpty(listString) && listString.indexOf(";") > -1) {
        return new Ember.Handlebars.SafeString(listString.replace(/;/g, ', '));
    } 
    return listString;
});

App = Ember.Application.create({
    rootElement: '#application'
});

App.Router.map(function(){
    this.resource('main', {path: '/'});
});

App.FieldSetController = Ember.ObjectController.extend({
    needs: "main",
    mainModelBinding: "controllers.main.model",
    requiredErrorsBinding: "controllers.main.model.requiredErrors",
    required: function() {
        return $.inArray(this.get('name'), this.get('mainModel').requiredFields) != -1;
    }.property(),
    
    requiredError: function() {
        return this.get('requiredErrors')[this.get('name')];
    }.property('requiredErrors'),
    
    requiredMessage: function() {
        return this.get('mainModel').requiredMessages[this.get('name')];
    }.property('requiredErrors'),
    
    labelId: function(){
        return this.get('name') + 'Label';
    }.property(),
    
    partial: function() {
        return partialMap[this.get('type')];
    }.property(),
    
    picklistValues: function() {
        var values = [];
        
        this.get('values').forEach(function(value) {
            values.push(value.value);
        });
        
        return values;
    }.property(),
    
    placeholder: function() {
        return labels.to_jobPosting_placeholder_custom.replace('{0}', this.get('label'));
    }.property()
});

var partialMap = {
    "BOOLEAN" : "checkbox",
    "CURRENCY" : "string",
    "DATE" : "date",
    "DOUBLE" : "string",
    "EMAIL" : "string",
    "PERCENT" : "string",
    "PHONE" : "string",
    "PICKLIST" : "picklist",
    "STRING" : "string",
    "TEXTAREA" : "textArea",
    "URL" : "string"
};

App.MainView = Ember.View.extend({
    afterRenderEvent: function() {
        $('body').tooltip({
            selector: '[data-toggle=tooltip]' // bind the tip. Just the tip.
        });
    }
});

App.LocationController = Ember.Object.extend({
    countryToStateMap: Ember.computed.alias('main.countryToStateMapData'),
    observeCountry: function() { // handles the country change.
        if (!Ember.isNone(this.get('selectedCountry')) ) {
            this.set('country', this.get('selectedCountry')); // Set the Type
            if (!Ember.isNone(this.get('countryToStateMap'))) { // From parent
                var subcategoryData = this.get('countryToStateMap').findBy('country', this.get('selectedCountry')); // Create local Var.
                if (!Ember.isNone(subcategoryData)) {
                    this.set('allowableStates', subcategoryData.state);                    
                }
            }
        } else {
            this.set('country', null); // Set the Type
            this.set('state', null);
            this.set('allowableStates', []);
        }
    }.observes('selectedCountry'),
    observeMap: function() { // Prepopulates the selects based on things in the channel.
        if (!Ember.isNone(this.get('selectedCountry')) ) {
            this.set('country', this.get('selectedCountry')); // Set the Type
            if (!Ember.isNone(this.get('countryToStateMap'))) { // From parent
                var subcategoryData = this.get('countryToStateMap').findBy('country', this.get('selectedCountry')); // Create local Var.
                if (!Ember.isNone(subcategoryData)) {
                    this.set('allowableStates', subcategoryData.state);                    
                }
            }
        } 
    }.observes('countryToStateMap')
    
})


App.MainRoute = Ember.Route.extend({
    model: function () {
        pageData = JSON.parse(rawPageData);
        
        // Check for error conditions
        if (!pageData.isSuccess) {
            
            if (!Ember.isEmpty(pageData.warningMessages)) {
                pageData.warningMessage = pageData.warningMessages[0];
            } else {
                // This contains the error conditions.
                if (!Ember.isEmpty(pageData.errorMessages)) {
                    pageData.errorMessage = pageData.errorMessages[0];
                } else {
                    pageData.errorMessage = 'No requirement or job posting specified.';                    
                }
            }

            pageData.postingDurationText = '';
            pageData.payMinText = '';
            pageData.payMaxText = '';
            pageData.data.jobPosting = {};
            pageData.data.contactPosting = {};
            pageData.channelButtonSelected = true;
            return pageData;

        }

        pageData.icSettings = JSON.parse(icSettings);

        pageData.displayState = isView; // are we in new/edit or view mode?
        pageData.isSelfPost = true;
        pageData.csjpId = pageData.data.csjpId;
        pageData.hasCareerSitePosting = (pageData.csjpId != null);
        pageData.isTwitterWithCareerSitePosting = false;
        pageData.url = pageData.data.url;
        pageData.spinnerIsUp = false;
        pageData.isSocial = pageData.data.jobPosting.Type__c == SOCIAL_CHANNEL_TYPE;
        pageData.socialDisplayState = pageData.displayState && pageData.isSocial;
        
        if (pageData.data.jobPosting.Activation_Date__c) {
            var date_array = pageData.data.jobPosting.Activation_Date__c.split('-');
            pageData.date = new Date(date_array[0], date_array[1]-1, date_array[2]).toDateString().substring(4);
        } else {
            var today = new Date();
            pageData.date = today.toDateString().substring(4, 7) + ' ' + today.getDay();
        }
        
        pageData.isEdit = !Ember.isEmpty(pageData.data.jobPosting.Id);
        pageData.hasPosted = !Ember.isEmpty(pageData.data.jobPosting.Posting_Url__c);
        
        pageData.isMap = false; // Init the variable. isMap lets us know if the channel data is Monster/map type of flat Career builder type.
        
        pageData.channelData = [];
        // Process Channel Data to make it easier to find and separate from actual page data.
        if (!Ember.isEmpty(pageData.data.channelData)) {
            
            var channelData = JSON.parse(pageData.data.channelData);
            pageData.data.channelData = ''; // Clear it out after we get it. (Keep it from submitting to the back-end)            
            
            if (pageData.isEdit) {
                pageData.channelData = channelData._embedded.channels;
                
            } else {

                if (!Ember.isEmpty(pageData.data.channelCreds)) {
                    pageData.channelData = Ember.A();

                    channelData._embedded.channels.forEach(function(channel) {
                        if (channel.type == 'Job Board' ||  channel.type == SOCIAL_CHANNEL_TYPE) {
                            pageData.channelData.push(channel);
                          }
                    });
                } 
                
            }
            
            pageData.channelData.sort(function(a, b) {
                if (a.type == b.type) {
                    return a.name > b.name;
                } else {
                    return a.type > b.type;
                }
            });
        } 
        
        if (Ember.isEmpty(pageData.data.jobPosting.Activation_Date__c) && pageData.displayState) {
            pageData.data.jobPosting.Activation_Date__c = moment().format('YYYY-MM-DD');
        } 
        
        // set defaults on channel change
        pageData.postingDurationText = '';
        
        // Handle Pay Min and Max
        if (!Ember.isEmpty(pageData.data.jobPosting.Pay_Minimum__c)) {
            pageData.payMinText = pageData.data.jobPosting.Pay_Minimum__c;
        } else {
            pageData.payMinText = '';
        }

        if (!Ember.isEmpty(pageData.data.jobPosting.Pay_Maximum__c)) {
            pageData.payMaxText = pageData.data.jobPosting.Pay_Maximum__c;
        } else {
            pageData.payMaxText = '';
        }
        
        // Handle array transformations for Select2 bindings
        if (!Ember.isEmpty(pageData.data.jobPosting.Occupation__c)) {
            pageData.occupationArray = pageData.data.jobPosting.Occupation__c.split(';');
        } else {
            pageData.occupationArray = Ember.A();
        }
        if (!Ember.isEmpty(pageData.data.jobPosting.Category__c)) {
            pageData.categoryArray = pageData.data.jobPosting.Category__c.split(';');
        } else {
            pageData.categoryArray = Ember.A();
        }
        if (!Ember.isEmpty(pageData.data.jobPosting.Industry__c)) {
            pageData.industryArray = pageData.data.jobPosting.Industry__c.split(';');
        } else {
            pageData.industryArray = Ember.A();
        }
        
        pageData.categoryName = null;
        pageData.channelButtonSelected = true;
        
        pageData.countryToStateMapData = [{country: "United States", state: ['Alabama']}];
        
        // Sets up a container for the buttons - manages the display.
        pageData.button = {
            "draft": (pageData.data.jobPosting.Status__c == 'Draft'),
            "pending": (pageData.data.jobPosting.Status__c == 'Pending'),
            "active": (pageData.data.jobPosting.Status__c == 'Active'),
            "edited": (pageData.data.jobPosting.Status__c == 'Edited'),
            "deleted": (pageData.data.jobPosting.Status__c == 'Expired' || pageData.data.jobPosting.Status__c == 'Unposted'),
            "error": (pageData.data.jobPosting.Status__c == 'Error')
        }
        

        pageData.isStatusEdited = (pageData.data.jobPosting.Status__c == 'Edited');
        // Check if the channel data was populated and set data.
        if (!Ember.isEmpty(pageData.data.jobPosting.Channel__c)) {
            pageData.channelName = pageData.data.jobPosting.Channel__c;
            pageData.socialAccountName = pageData.icSettings.findBy('Name', pageData.channelName) ? pageData.icSettings.findBy('Name', pageData.channelName).Field3__c : '';
            pageData.channelButtonSelected = false;
                        
            var selectedChannelData = pageData.channelData.findBy('name', pageData.channelName);
            
            if (selectedChannelData.fields.Category__c) {
                pageData.isMap = (selectedChannelData.fields.Category__c.dataType == 'map');

                if (pageData.isMap) {
                    pageData.categoryName = pageData.data.jobPosting.Category__c;
                }
            }
        }

        //process locations into location subobjects
        pageData.locations = Ember.A();

        // If there is no prior jobposting saved, grab locations from the data
        if (pageData.data.isJobPostingEmpty) {
            pageData.data.jobLocations.forEach(function(location) {
                // process the address for display.
                //if (location.Location__r.Street_Address__c)
                var addressLine1 = '', addressLine2 = '';

                // Check for empty address.
                if (!Ember.isEmpty(location.Location__r.Street_Address__c)) {
                    var addressLines = location.Location__r.Street_Address__c.split('\n');
                    if (addressLines.length > 2 || addressLines.length == 1) { // If 1 line, just shoe-horn it in. If more than 2, then move everything to 1 line.
                        addressLine1 = location.Location__r.Street_Address__c;
                    } else {
                        addressLine1 = addressLines[0];
                        addressLine2 = addressLines[1];
                    }
                }

                pageData.locations.addObject(
                    App.LocationController.create({
                        main: pageData,
                        address1: addressLine1,
                        address2: addressLine2,
                        tempId: String((new Date()).getTime()),
                        city: location.Location__r.City__c,
                        country: convertCtyCodeName(location.Location__r.Standardized_Country_Region__c),
                        selectedCountry: convertCtyCodeName(location.Location__r.Standardized_Country_Region__c),
                        state: convertStateCodeName(location.Location__r.Standardized_Country_Region__c, location.Location__r.Standardized_State_Province__c),
                        zip: location.Location__r.Zip_Postal_Code__c                        
                    })
                );
            });

            if (pageData.locations.length == 0) {
                pageData.locations.addObject(
                    App.LocationController.create({
                        main: pageData,
                        address1: "",
                        address2: "",
                        tempId: String((new Date()).getTime()),
                        city: "",
                        country: "",
                        state: "",
                        selectedCountry: "",
                        zip: ""                        
                    })
                );
            }

        } else { // we have a prior jobposting, read the value from the posting body
            if (!Ember.isEmpty(pageData.data.jobPosting.Locations__c)) {
                var locations = JSON.parse(pageData.data.jobPosting.Locations__c);
                locations.forEach(function(location) {

                    var addressLine1 = '', addressLine2 = '';

                    // Check for empty address.
                    if (!Ember.isEmpty(location.address1)) {
                        var addressLines = location.address1.split('\n');
                        if (addressLines.length > 2 || addressLines.length == 1) { // If 1 line, just shoe-horn it in. If more than 2, then move everything to 1 line.
                            addressLine1 = location.address1;
                        } else {
                            addressLine1 = addressLines[0];
                            addressLine2 = addressLines[1];
                        }
                    }
                
                    pageData.locations.addObject(
                        App.LocationController.create({
                            main: pageData,
                            address1: addressLine1,
                            address2: addressLine2,
                            tempId: String((new Date()).getTime()),
                            selectedCountry: location.country,
                            city: location.city,
                            country: location.country,
                            state: location.state,
                            zip: location.zip                        
                        })                    
                    );
                });
            }
        }
        
        // Check for multi-line address.
        // if (!Ember.isEmpty(pageData.data.contactPosting.Contact_Street__c)) {
        //     var addressLines = pageData.data.contactPosting.Contact_Street__c.split('\n');
        //     if (addressLines.length > 2 || addressLines.length == 1) { // If 1 line, just shoe-horn it in. If more than 2, then move everything to 1 line.
        //         pageData.data.contactPosting.Contact_Street__c = pageData.data.contactPosting.Contact_Street__c;
        //         pageData.data.contactPosting.Contact_Street_2__c = '';
        //     } else {
        //         pageData.data.contactPosting.Contact_Street__c = addressLines[0];
        //         pageData.data.contactPosting.Contact_Street_2__c = addressLines[1];
        //     }
        // }
        
        pageData.contactCountry = convertCtyCodeName(pageData.data.contactPosting.Contact_Country__c);
        
        pageData.locationCount = pageData.locations.length;
        pageData.locationSizeOk = (pageData.locations.length > 1);
        pageData.locationAddOk = (pageData.locations.length < 50);
        
        pageData.data.jobPostingFields.forEach(function(field) {
            if (field.type == 'BOOLEAN') {
                field.value = pageData.data.jobPosting[field.name] ? pageData.data.jobPosting[field.name] : false;
            }
            else {
                field.value = pageData.data.jobPosting[field.name] ? pageData.data.jobPosting[field.name] : '';
            }
        });
        
        return pageData; // This is the object.
    }
});

App.MainController = Ember.ObjectController.extend({
    init: function() {
        this._super(); //Handle inheritance, etc...
        //Ember.run.later(this, this.checkHealth, 2000);
        this.checkHealth();
    },
    checkHealth: function() {
        var self = this;

        cont.checkHealth(function(res, resObj) {
            if (res) {
                var parsedResult = parseResult(res);
                
                if (!Ember.isEmpty(parsedResult.errorMessages)) {
                    self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');
                    self.set('connectionMessage', self.get('connectionerror'));
                    $(window).scrollTop(0);

                } else {
                    self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');

                    var subParse = parseResult(parsedResult.data.response);

                    if( subParse.status == 'UP') {
                        self.set('connectionerror', null);
                        self.set('connectionMessage', self.get('connectionerror'));

                    } else {
                        self.set('connectionMessage', self.get('connectionerror'));
                        $(window).scrollTop(0);
                    }
                
                }

            } else { // Not often used...
                self.set('connectionMessage', 'Drastic error.');
                $(window).scrollTop(0);
            }
        });
        
    },
    checkHealthPromise: function() {
        var self = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {

            cont.checkHealth(function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);
                
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');
                        self.set('connectionMessage', self.get('connectionerror'));
                        $(window).scrollTop(0);
                        reject(self);

                    } else {
                        self.set('connectionerror', 'Connection error: please contact your system administrator if this persists.');

                        var subParse = parseResult(parsedResult.data.response);

                        if( subParse.status == 'UP') {
                            self.set('connectionerror', null);
                            self.set('connectionMessage', self.get('connectionerror'));
                            resolve(self);

                        } else {
                            self.set('connectionMessage', self.get('connectionerror'));
                            $(window).scrollTop(0);
                            reject(self);
                        }
                
                    }

                } else { // Not often used...
                    self.set('connectionMessage', 'Drastic error.');
                    $(window).scrollTop(0);
                    reject(self);
                }
            });

        });

    },    
    // Handle filtering the numbers only of the postingDurationText text.

    // Duration Filter
    onDurationTextChange: function() {
        Ember.run.debounce(this, this.applyDurationFilter, 500); // 1/2 second.
    }.observes('postingDurationText'),
    applyDurationFilter: function() { // Function called by debounce.
        // Filter non integer and min/max issues here. 1-999. // Strip out leading zeros.
        var rawNumber = this.get('postingDurationText').replace(/[^0-9]/g, '').replace(/^0+/g, '');
        // if (Ember.isEmpty(rawNumber)) {
        //     rawNumber = "30";
        // }

        this.set('data.jobPosting.Duration__c', rawNumber );
        this.set('postingDurationText', rawNumber );
    },
    // Pay Minimum
    onPayMinTextChange: function() {
        Ember.run.debounce(this, this.applyPayMinFilter, 500); // 1/2 second.
    }.observes('payMinText'),
    applyPayMinFilter: function() { // Function called by debounce.
        // Filter non integer and min/max issues here. 1-999. & Strip out leading zeros.
        var rawNumber = this.get('payMinText').replace(/[^0-9\.]/g, '').replace(/^0+/g, '').replace(/\.$/g, '');
        
        if (rawNumber == '.00') {
            rawNumber = '';
        }
        
        this.set('data.jobPosting.Pay_Minimum__c', rawNumber );
        this.set('payMinText', rawNumber );
    },

    // Pay Maximum
    onPayMaxTextChange: function() {
        Ember.run.debounce(this, this.applyPayMaxFilter, 500); // 1/2 second.
    }.observes('payMaxText'),
    applyPayMaxFilter: function() { // Function called by debounce.
        // Filter non integer and min/max issues here. 1-999. & Strip out leading zeros.
        var rawNumber = this.get('payMaxText').replace(/[^0-9\.]/g, '').replace(/^0+/g, '').replace(/\.$/g, '');

        if (rawNumber == '.00') {
            rawNumber = '';
        }

        this.set('data.jobPosting.Pay_Maximum__c', rawNumber );
        this.set('payMaxText', rawNumber );
    },
    
    // Title
    onTitleChange: function() {
        Ember.run.debounce(this, function() {
            if (this.get('data.jobPosting.Job_Title__c')) {
                this.set('socialTitleLimit', this.get('fields.Job_Title__c.maxLength') - this.get('data.jobPosting.Job_Title__c').length);
            }
        }, 500);
    }.observes('data.jobPosting.Job_Title__c'),
    
    // Summary
    onSummaryChange: function() {
        Ember.run.debounce(this, function() {
            if (this.get('data.jobPosting.Summary__c')) {
                this.set('socialSummaryLimit', this.get('fields.Summary__c.maxLength') - this.get('data.jobPosting.Summary__c').length);
            }
        }, 500);
    }.observes('data.jobPosting.Summary__c'),
    
    // Message
    onMessageChange: function() {
        Ember.run.debounce(this, function() {
            if (this.get('data.jobPosting.Message__c')) {
                this.set('socialMessageLimit', this.get('fields.Message__c.maxLength') - this.get('data.jobPosting.Message__c').length);
            }
        }, 500);
    }.observes('data.jobPosting.Message__c'),

    observeCategory: function() {
        if (!Ember.isNone(this.get('categoryName'))) {
            this.set('data.jobPosting.Category__c', this.get('categoryName')); // Set the Type
            if (!Ember.isNone(this.get('occupationMapData'))) {
                var subcategoryData = this.get('occupationMapData').findBy('category', this.get('categoryName')); // Create local Var.
                this.set('occupationData', subcategoryData.occupation);
            }
        }
    }.observes('categoryName'),
    observeContactCountry: function() {
        if (!Ember.isNone(this.get('contactCountry'))) {
            this.set('data.contactPosting.Contact_Country__c', this.get('contactCountry')); // Set the Type
            if (!Ember.isNone(this.get('countryToStateMapData'))) {
                var subcategoryData = this.get('countryToStateMapData').findBy('country', this.get('contactCountry')); // Create local Var.
                if (!Ember.isNone(subcategoryData)) {
                    this.set('contactAllowableStates', subcategoryData.state);
                }
            }
        } else { // saving the blank without overwriting what they had in the state value.
            this.set('data.contactPosting.Contact_Country__c', this.get('contactCountry')); // Set the Type
        }
    }.observes('contactCountry'),
    observeChannel: function() {
        if (!Ember.isNone(this.get('channelName'))) {
            var specificChannelData = this.get('channelData').findBy('name', this.get('channelName')); // Create local Var.
            this.set('data.jobPosting.Channel__c', this.get('channelName')); // Set the channel
            this.set('channelButtonSelected', false);
            this.set('isSelfPost', this.get('channelName') == CAREER_SITE_CHANNEL_NAME);
            
            this.set('data.jobPosting.Type__c', specificChannelData.type); // Set the Type
            this.set('fields', specificChannelData.fields); // Set flattened fields map for the specifc channel.
            this.set('blocks', specificChannelData.blocks);
            
            if (this.get('fields').Posting_Duration__c) {
                if (!Ember.isEmpty(this.get('data.jobPosting.Duration__c'))) {
                    this.set('postingDurationText', this.get('data.jobPosting.Duration__c'));
                } else {
                    this.set('postingDurationText', '30');
                }
            } else {
                this.set('postingDurationText', '');
            }
            
            var job_title = this.get('data.jobPosting.Job_Title__c') ? this.get('data.jobPosting.Job_Title__c') : "";
            this.set('data.jobPosting.Job_Title__c', job_title.substring(0,specificChannelData.fields.Job_Title__c.maxLength));
            
            if (this.get('data.jobPosting.Type__c') == SOCIAL_CHANNEL_TYPE) {
                this.set('isSocial', true);
                
                // truncate!
                var summary = this.get('data.jobPosting.Summary__c') ? this.get('data.jobPosting.Summary__c') : "";
                var message = this.get('data.jobPosting.Message__c') ? this.get('data.jobPosting.Message__c') : "";
                
                this.set('data.jobPosting.Job_Title__c', job_title.substring(0, this.get('fields.Job_Title__c.maxLength')));
                this.set('data.jobPosting.Summary__c',  summary.substring(0, this.get('fields.Summary__c.maxLength')));
                
                // make sure these values are empty string instead of null
                this.set('data.jobPosting.Message__c', message);
                
                // set limits
                this.set('socialTitleLimit', this.get('fields.Job_Title__c.maxLength') - this.get('data.jobPosting.Job_Title__c').length);
                this.set('socialSummaryLimit', this.get('fields.Summary__c.maxLength') - this.get('data.jobPosting.Summary__c').length);
                this.set('socialMessageLimit', this.get('fields.Message__c.maxLength') - this.get('data.jobPosting.Message__c').length);
            } else {
                this.set('isSocial', false);
                this.set('socialTitleLimit', null);
                this.set('socialSummaryLimit', null);
                this.set('socialMessageLimit', null);
            }
            
            if (this.get('channelName') == TWITTER_CHANNEL_NAME) {
                this.set('isTwitterWithCareerSitePosting', this.get('hasCareerSitePosting'));
            } else {
                this.set('isTwitterWithCareerSitePosting', false);
            }

            this.set('isMap', (!Ember.isNone(specificChannelData.fields.Category__c) && specificChannelData.fields.Category__c.dataType == 'map'));

            // Setup validation by channel.
            var requiredFields = Ember.A(); //this.get('pageData.requiredFields');
            var minimumFields = Ember.A(); //this.get('pageData.minimumFields');
            var maximumFields = Ember.A(); //this.get('pageData.minimumFields');
            var fieldNames = _.keys(specificChannelData.fields);

            fieldNames.forEach(function(key) {
                // Get the specific field by key and set the data.
                var field = specificChannelData.fields[key];
                if (field.isRequired) {
                    requiredFields.push(key);
                }
                if (!Ember.isNone(field.minLength)) {
                    minimumFields.push(key);
                }
                if (!Ember.isNone(field.maxLength)) {
                    maximumFields.push(key);
                }
            });
            // Set the data into the page useful for later stuff...
            this.set('requiredFields', requiredFields);
            this.set('minimumFields', minimumFields);
            this.set('maximumFields', maximumFields);
            this.set('requiredErrors', {});
            this.set('requiredMessages', {});

            // Process the Country/State pickers.
            if (!Ember.isNone(specificChannelData.fields['Contact_Country__c']) && specificChannelData.fields['Contact_Country__c'].dataType == 'map') {
                var countries = _.keys(specificChannelData.fields.Contact_Country__c.values);
                this.set('allowableCountries', countries);
        
                var countryToState = Ember.A();
                countries.forEach(function(key) {
                    // Resolve the inner maps and use that keyset with the current cty to build a list.
                    var keys = [];
                    specificChannelData.fields.Contact_Country__c.values[key].forEach(function(arrayItem) {
                        keys.push(_.keys(arrayItem)[0]);
                    });
                    countryToState.push({
                        country: key,
                        state: keys
                    });
                });

                this.set('countryToStateMapData', countryToState);

                // TODO - handle previously set values for the locations:
                if (!Ember.isEmpty(this.get('data.contactPosting.Contact_Country__c'))) {
                    var subcategoryData = countryToState.findBy('country', this.get('data.contactPosting.Contact_Country__c')); 
                    if (!Ember.isNone(subcategoryData)) {
                        this.set('contactAllowableStates', subcategoryData.state);
                    } else {
                        this.set('contactAllowableStates', []); // Blank it for now...                    
                    }    
                } else {
                    this.set('contactAllowableStates', []); // Blank it for now...                    
                }


// Iterate over all the locations and set accordingly?
/*
                if (!Ember.isEmpty(this.get('data.jobPosting.Category__c'))) {
                    var subcategoryData = categoryToOccupations.findBy('category', this.get('data.jobPosting.Category__c')); 
                    this.set('occupationData', subcategoryData.occupation);
                } else {
                    this.set('occupationData', []); // Blank it for now...                    
                }
*/                
            }
            
            // If the category is a type of Map, then set the category keys for occupations.
            if (!Ember.isNone(specificChannelData.fields['Category__c']) && specificChannelData.fields['Category__c'].dataType == 'map') {

                // Get the category outside keys.
                var categoryKeys = _.keys(specificChannelData.fields.Category__c.values);
                this.set('categoryData', categoryKeys);
        
                var categoryToOccupations = Ember.A();
                categoryKeys.forEach(function(key) {
                    // Resolve the inner maps and use that keyset with the current category to build a list.
                    var keys = [];
                    specificChannelData.fields.Category__c.values[key].forEach(function(arrayItem) {
                        keys.push(_.keys(arrayItem)[0]);
                    });
                    categoryToOccupations.push({
                        category: key,
                        occupation: keys
                    });
                });

                this.set('occupationMapData', categoryToOccupations);
                if (!Ember.isEmpty(this.get('data.jobPosting.Category__c'))) {
                    var subcategoryData = categoryToOccupations.findBy('category', this.get('data.jobPosting.Category__c')); 
                    this.set('occupationData', subcategoryData.occupation);
                } else {
                    this.set('occupationData', []); // Blank it for now...                    
                }

            } else if (!Ember.isNone(specificChannelData.fields.Category__c)) {
                this.set('categoryData', specificChannelData.fields.Category__c.values);
            }
            
            // Else this is not a map.
        }
    }.observes('channelName'),
    validateFields: function(mySelf) {
        var self = mySelf,
            valid = true,
            topError = '',
            requiredFields = self.get('requiredFields'),
            minimumFields = self.get('minimumFields'),
            maximumFields = self.get('maximumFields');

        function addError(errorMessage) {
            topError += topError !== '' ? '<br/>' + errorMessage : errorMessage;
        }

        // Reset any errors on the page...
        self.set('requiredErrors', {});

        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Validate the required fields aren't blank
            requiredFields.forEach(function(req) {
                if (Ember.isEmpty(self.get('model.data.jobPosting.' + req))) {
                    self.set('model.requiredErrors.' + req, true);
                    self.set('model.requiredMessages.' + req, 'Required');
                    valid = false;
                } 
            });

            // Validate that minimum fields are met.
            minimumFields.forEach(function(req) {
                if (!Ember.isEmpty(self.get('model.data.jobPosting.' + req))) {
                    if (self.get('model.data.jobPosting.' + req).length < self.get('fields.' + req + '.minLength') ) {
                        self.set('model.requiredErrors.' + req, true);
                        self.set('model.requiredMessages.' + req, "Field must be " + self.get('fields.' + req + '.minLength') + " characters long.");
                        valid = false;
                    }
                } 
            });
            
            // Validate that maximum fields are met.
            maximumFields.forEach(function(req) {
                if (!Ember.isEmpty(self.get('model.data.jobPosting.' + req))) {
                    if (self.get('model.data.jobPosting.' + req).length > self.get('fields.' + req + '.maxLength') ) {
                        self.set('model.requiredErrors.' + req, true);
                        self.set('model.requiredMessages.' + req, "Field must be less than " + self.get('fields.' + req + '.maxLength') + " characters long.");
                        valid = false;
                    }
                } 
            });

            if (self.get('blocks').locations) {
                // Validate addresses aren't blank and that we have at least one complete one.
                var blankIndicies = Ember.A();
                self.get('locations').forEach(function(req) {
                    if (Ember.isEmpty(req.address1) && Ember.isEmpty(req.city) && Ember.isEmpty(req.state) && Ember.isEmpty(req.zip) && Ember.isEmpty(req.country)) {
                        blankIndicies.push(req);
                    }
                });

                if (blankIndicies.length == self.get('locations').length) {
                    // All are blank.
                    self.set('locations', Ember.A()); // clear it out, then add an item.
                    self.get('locations').addObject(App.LocationController.create({
                                tempId: String((new Date()).getTime()),
                                address1: '',
                                address2: '',
                                city: '',
                                country: null,
                                state: null,
                                selectedCountry: '',
                                main: self.model,
                                zip: '',
                                address1Error: false,
                                cityError: false,
                                stateError: false,
                                zipError: false,
                                countryError: false
                            }));

                } else if (blankIndicies.length != 0) {
                    // Remove some blank items.
                    self.set('locations', _.difference(self.get('locations'), blankIndicies));
                }

                self.get('locations').forEach(function(req) {
                    if (Ember.isEmpty(req.address1)) {
                        req.set('address1Error', true);
                        valid = false;
                    } else {
                        req.set('address1Error', false);
                    }

                    if (Ember.isEmpty(req.city)) {
                        req.set('cityError', true);
                        valid = false;
                    } else {
                        req.set('cityError', false);
                    }
                
                    if (Ember.isEmpty(req.state)) {
                        req.set('stateError', true);
                        valid = false;
                    } else {
                        req.set('stateError', false);
                    }
                
                    if (Ember.isEmpty(req.zip)) {
                        req.set('zipError', true);
                        valid = false;
                    } else {
                        req.set('zipError', false);
                    }
                
                    if (Ember.isEmpty(req.country)) {
                        req.set('countryError', true);
                        valid = false;
                    } else {
                        req.set('countryError', false);
                    }

                });
                
                self.notifyPropertyChange('locations');
            }

            if (valid === true) {
                // remove the address2 from the json
                var tempLocations = Ember.A();
                self.get('locations').forEach(function(location) {
                    if (!Ember.isEmpty(location.address2)) {
                        location.set('address1', location.address1 + '\n' + location.address2);
                        location.set('address2', '');
                    }
                    tempLocations.push({
                        address1: location.address1,
                        address2: location.address2,
                        city: location.city,
                        country: location.country,
                        state: location.state,
                        zip: location.zip
                    });
                });
                
                self.set('model.data.jobPosting.Locations__c', JSON.stringify(tempLocations));
                self.set('locations', Ember.A()); // Remove circular reference
                self.set('unboundSelf', JSON.parse(JSON.stringify(self)) );
                resolve(self);
            } else {
                self.set('error', labels.to_error_req_fields);
                reject(self);
            }
        });
            
    },
    presave: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.getActiveCareerSiteJobPostingId(JSON.stringify(self.model.data.jobPosting), function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('error', labels.to_jobPosting_error_autocreate + ' ' + parsedResult.errorMessages.join('.\n'));
                        reject(self);
                    } else {
                        self.set('model.data.csjpId', parsedResult.data.csjpId);
                        resolve(self);
                    }
                } else {
                    self.set('error', resObj.message);
                    reject(self);
                }
            });
        });
    },
    save: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.saveJobPosting(JSON.stringify(self.get('unboundSelf').model.data), function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('error', parsedResult.errorMessages[0]);
                        reject(self);
                    } else {
                        self.set('model.data.jobPosting.Id', parsedResult.data.jobPostingId);
                        resolve(self);
                    }
                } else {
                    self.set('error', resObj.message);
                    reject(self);
                }
            });  
        });        
    },
    sendData: function(myself) {
        var self = myself;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (self.model.isSelfPost) {
                self.setStatus({
                    "responseData" : {
                        "url" : self.model.data.url + '/s/JobListing?id=' + self.model.data.csjpId +
                            "&utm_source=" + encodeURIComponent(self.model.data.jobPosting.Channel__c) +
                            "&utm_medium=" + encodeURIComponent(self.model.data.jobPosting.Type__c)
                    },
                    "status" : "Active"
                });
                
                resolve(self);
            } else {
                cont.postToBoard(self.get('model.data.jobPosting.Id'), function(res, resObj) { 
                    if (res) {
                        var parsedResult = parseResult(res);
                        console.log(parsedResult);
                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            self.set('error', parsedResult.errorMessages[0]);
                            reject(self);
                        } else { // This was successful.
                            // grab the data from the response.
                            var data = parseResult(parsedResult.data.response);
                            self.setStatus(data);
                            
                            resolve(self);
                        }
                    } else {
                        self.set('error', resObj.message);
                        reject(self);
                    }
                });
            }
        });
    },
    setStatus: function(data) {
        var self = this;
        var statusToSet = data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase();
        
        self.set('model.isStatusEdited', false);
        
        self.set('model.data.jobPosting.Status__c', statusToSet); 
        self.set('model.button', {
            "draft": (self.model.data.jobPosting.Status__c == 'Draft'),
            "pending": (self.model.data.jobPosting.Status__c == 'Pending'),
            "active": (self.model.data.jobPosting.Status__c == 'Active'),
            "edited": (self.model.data.jobPosting.Status__c == 'Edited'),
            "deleted": (self.model.data.jobPosting.Status__c == 'Expired' || self.model.data.jobPosting.Status__c == 'Unposted'),
            "error": (self.model.data.jobPosting.Status__c == 'Error')
        });
        
        self.notifyPropertyChange('model.button');
        
        if (statusToSet == 'Error') {
            self.set('model.data.jobPosting.Status_Message__c', data.errorMessages[0]);
        } else {
            self.set('model.data.jobPosting.Posting_Url__c', data.responseData.url); // Switch this to the posting URL
            
            if (!self.get('isSelfPost')) {
                self.set('model.data.jobPosting.Apply_Url__c', self.model.data.url + '/s/JobListing?id=' + self.model.data.csjpId +
                    "&utm_source=" + encodeURIComponent(self.model.data.jobPosting.Channel__c) +
                    "&utm_medium=" + encodeURIComponent(self.model.data.jobPosting.Type__c)); // Where to apply to?
            }
        }
        // Save this data.
        self.set('locations', Ember.A()); // Remove circular reference
        self.set('unboundSelf', JSON.parse(JSON.stringify(self)) ); // Always set an unbound self.
    },
    sendRemoveData: function(myself) {
        var self = myself;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (self.model.isSelfPost) {
                self.setStatus({
                    "responseData" : {
                        "url" : self.model.data.url + '/s/JobListing?id=' + self.model.data.csjpId +
                            "&utm_source=" + encodeURIComponent(self.model.data.jobPosting.Channel__c) +
                            "&utm_medium=" + encodeURIComponent(self.model.data.jobPosting.Type__c)
                    },
                    "status" : "Unposted"
                });
                
                resolve(self);
            } else {
                cont.postRemovalToBoard(self.get('model.data.jobPosting.Id'), function(res, resObj) {
                    if (res) {
                        var parsedResult = parseResult(res);
                    
                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            self.set('error', parsedResult.errorMessages[0]);
                            reject(self);
                        } else {
                            // grab the data from the response.
                            var data = parseResult(parsedResult.data.response);
                            
                            self.setStatus(data);
                            
                            resolve(self);
                        }
                    } else {
                        self.set('error', resObj.message);
                        reject(self);
                    }
                });
            }
        });
    },    
    removeObject: function(myself) {
        var self = myself;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.removeRecord(self.get('model.data.jobPosting.Id'), function(res, resObj) { 
                if (res) {
                    var parsedResult = parseResult(res);
                    
                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('error', parsedResult.errorMessages[0]);
                        reject(self);

                    } else {
                        self.set('locations', Ember.A()); // Remove circular reference
                        self.set('model.isStatusEdited', false);
                        self.set('model.data.jobPosting.Status__c', parsedResult.data.deleted);   
                        self.set('unboundSelf', JSON.parse(JSON.stringify(self)) ); // Always set an unbound self.

                        self.set('model.button', {
                            "draft": (self.model.data.jobPosting.Status__c == 'Draft'),
                            "pending": (self.model.data.jobPosting.Status__c == 'Pending'),
                            "active": (self.model.data.jobPosting.Status__c == 'Active'),
                            "edited": (self.model.data.jobPosting.Status__c == 'Edited'),
                            "deleted": (self.model.data.jobPosting.Status__c == 'Expired' || self.model.data.jobPosting.Status__c == 'Unposted'),
                            "error": (self.model.data.jobPosting.Status__c == 'Error')
                        })
                        self.notifyPropertyChange('model.button');
                        
                        resolve(self);
                    }

                } else {
                    self.set('error', resObj.message);
                    reject(self);
                }
            });
        });
        
    },
    gotoObject: function(self) {
        var objectId = self.model.data.jobPosting.Id;
        if(isSF1) {
            sforce.one.navigateToSObject(objectId);
        } else {
            window.location.href = '/' + objectId;
        }
    },
    gotoReq: function(self) {
        var objectId = self.model.data.jobPosting.Requisition__c;    
        if(isSF1) {
            sforce.one.navigateToSObject(objectId);
        } else {
            window.location.href = '/' + objectId;
        }
    },
    handleError: function(self) {
        self.set('model.spinnerIsUp', false);
        self.set('errorMessage', self.get('error'));
        $(window).scrollTop(0);
    },
    maxLocations: 50,
    locationButtonShowHide: function() {
        this.set('locationSizeOk', (this.get('locationCount') > 1));
        this.set('locationAddOk', (this.get('locationCount') < this.get('maxLocations')));
    },
    postOkMessage: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (self.model.data.jobPosting.Status__c != 'Error') {
                self.set('postOk', true);
                Ember.run.later((function() {
                    self.set('postOk', false);
                }), 5000);
            }
            resolve(self);
        });
    },
    spinnerUp: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            self.set('model.spinnerIsUp', true);
            resolve(self);
        });
    }, 
    spinnerDown: function(self) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            self.set('model.spinnerIsUp', false);
            resolve(self);
        });
    },
    actions: {
        onDurationDefault: function() {
            if (Ember.isEmpty(this.get('data.jobPosting.Duration__c'))) {
                this.set('data.jobPosting.Duration__c', 30 );
                this.set('postingDurationText', 30 );
            }
        },
        deleteClick: function() {
            // Reset Errors
            this.set('errorMessage', null);                
            // If draft, then we can remove and redirect to the req
            var self = this;
            var objectId = this.get('data.jobPosting.Requisition__c');

            if (this.get('data.jobPosting.Status__c') == 'Draft' || 
                (this.get('data.jobPosting.Status__c') == 'Edited' && Ember.isEmpty(this.get('data.jobPosting.Posting_Url__c')))) {

                cont.removeRecord(self.get('model.data.jobPosting.Id'), function(res, resObj) { 
                    if (res) {
                        var parsedResult = parseResult(res);
                    
                        if (!Ember.isEmpty(parsedResult.errorMessages)) {
                            self.set('error', parsedResult.errorMessages[0]);
                            reject(self);

                        } else {
                            // deleted, go to the Req.
                            if(isSF1) {
                                sforce.one.navigateToSObject(objectId);
                            } else {
                                window.location.href = '/' + objectId;
                            }
                        }

                    } else {
                        self.set('error', resObj.message);
                        reject(self);
                    }
                });

            } else {
                // If something else, then we may "soft-delete" 
                this.checkHealthPromise()
                    .then(this.spinnerUp)
                    .then(this.sendRemoveData)
                    .then(this.save)
                    .then(this.removeObject)
                    .then(this.gotoReq)
                    .then(this.spinnerDown)
                    .then(undefined, this.handleError);
            }
        },
        editClick: function() {
            var objectId = this.get('data.jobPosting.Id')
//            if(isSF1) {
//                sforce.one.editRecord(objectId);
//            } else {
            if (!Ember.isEmpty(vfNamespace)) {
                window.location.href = '/apex/' + vfNamespace + '__to_jobPosting?id=' + objectId; 
            } else {
                window.location.href = '/apex/c__to_jobPosting?id=' + objectId; 
            }
                
//            }
        },
        sendClick: function () {
            // Reset Errors
            this.set('errorMessage', null);
            
            this.checkHealthPromise()
                .then(this.spinnerUp)
                .then(this.presave)
                .then(this.sendData)
                .then(this.save)
                .then(this.postOkMessage)
                .then(this.spinnerDown)
                .then(undefined, this.handleError);
        },
        sendClickWithoutPresave: function () {
            // Reset Errors
            this.set('errorMessage', null);
            
            this.checkHealthPromise()
                .then(this.spinnerUp)
                .then(this.sendData)
                .then(this.save)
                .then(this.postOkMessage)
                .then(this.spinnerDown)
                .then(undefined, this.handleError);
        },
        saveClick: function () {
            var self = this;

            // Reset Errors
            self.set('errorMessage', null);

            // Update the Status if we are an edit and making changes AND this has been saved at least once.
            if (self.get('isEdit') && self.get('hasPosted') ) {
                // no need to post for Career Sites
                if ( self.get('isSelfPost')) {
                    self.set('data.jobPosting.Status__c', 'Active');
                } else {
                    self.set('data.jobPosting.Status__c', 'Edited');
                }
            } else {
                self.set('data.jobPosting.Status__c', 'Draft');
            }
            // field set values
            if (self.get('isSelfPost')) {
                self.get('data.jobPostingFields').forEach(function(field) {
                    if (field.type == 'TEXTAREA' && field.isHTML) {
                        // Handle the rich text block
                        var templateContent = $('#' + field.componentId + ' iframe.cke_reset:first').contents().find('body');
                        templateContent.find('[style]').removeAttr('style');
                        templateContent.find('[class]').removeAttr('class');
                        templateContent = templateContent.html();
                        self.set('data.jobPosting.' + field.name, templateContent);
                    } else {
                        self.set('data.jobPosting.' + field.name, field.value);
                    }
                });
            }
            
            // Consolidate multiValue strings
            self.set('data.jobPosting.Industry__c', self.get('industryArray').join(";")); //Convert array to string. 

            if (self.get('isMap')) { // If Category is a map, then occupations is in play, else just consolidated the Category string.
                self.set('data.jobPosting.Occupation__c', self.get('occupationArray').join(";")); //Convert array to string. 

            } else { // NOT A MAP, BUT CATEGORY IS AN ARRAY.
                self.set('data.jobPosting.Category__c', self.get('categoryArray').join(";")); //Convert array to string. 
                self.set('data.jobPosting.Occupation__c', '');
            }


            // consolidate the addresses and write them to the JobPosting object.
//            this.set('data.jobPosting.Locations__c', JSON.stringify(this.get('locations')));
            
            // Set the title
            self.set('data.jobPosting.Name', self.get('data.jobPosting.Channel__c') + ' (' + self.get('data.jobPosting.Job_Title__c') + ')' )

            //Handled the contact information
            self.set('data.jobPosting.Contact_Name__c', self.get('data.contactPosting.Contact_Name__c'));
            self.set('data.jobPosting.Contact_Company__c', self.get('data.contactPosting.Contact_Company__c'));

            self.set('data.jobPosting.Contact_Email__c', self.get('data.contactPosting.Contact_Email__c'));
            self.set('data.jobPosting.Contact_Phone__c', self.get('data.contactPosting.Contact_Phone__c'));
            self.set('data.jobPosting.Contact_Fax__c', self.get('data.contactPosting.Contact_Fax__c'));
            if (Ember.isEmpty(self.get('data.contactPosting.Contact_Street_2__c'))) {
                self.set('data.jobPosting.Contact_Street__c', self.get('data.contactPosting.Contact_Street__c'));                 
            } else {
                self.set('data.jobPosting.Contact_Street__c', self.get('data.contactPosting.Contact_Street__c') + '\n' + self.get('data.contactPosting.Contact_Street_2__c'));
                // this.set('data.contactPosting.Contact_Street_2__c', ''); // Don't null it out! Needs to get written!
            }
            self.set('data.jobPosting.Contact_City__c', self.get('data.contactPosting.Contact_City__c'));
            self.set('data.jobPosting.Contact_State_Province__c', self.get('data.contactPosting.Contact_State_Province__c'));
            self.set('data.jobPosting.Contact_Zip_Postal_Code__c', self.get('data.contactPosting.Contact_Zip_Postal_Code__c'));
            self.set('data.jobPosting.Contact_Country__c', self.get('data.contactPosting.Contact_Country__c'));
            
            // End consolidation
            self.validateFields(self)
                .then(self.spinnerUp)
                .then(self.save)
                .then(self.gotoObject)
                .then(undefined, self.handleError);
            
        },
        cancelClick: function () {
            if(isSF1) {
                sforce.one.back(true);
            } else {
                if (Ember.isEmpty(returnUrl)) {
                    var objectId = this.get('data.jobPosting.Id');

                    if (Ember.isEmpty(objectId)) {
                        // Go to the req.
                        objectId = this.get('data.jobPosting.Requisition__c');
                    }    

                    if (!Ember.isEmpty(objectId)) {
                        window.location.href = '/' + objectId;    
                    } else {
                        window.history.back();
                    }
                    
                } else {
                    window.location.href = returnUrl;
                }
            }
        },
        removeLocation: function(location) {
            var self = this;
            if (this.get('locationCount') > 1) {
                self.get('locations').removeObject(location);
                this.set('locationCount', self.get('locationCount')-1);
                this.locationButtonShowHide();
                self.notifyPropertyChange('locations');
            }
        },
        addLocation: function() {
            var self = this;
            if (this.get('locationCount') < this.get('maxLocations')) {
                self.get('locations').addObject(
                                        App.LocationController.create({
                                                    tempId: String((new Date()).getTime()),
                                                    address1: '',
                                                    address2: '',
                                                    city: '',
                                                    country: null,
                                                    state: null,
                                                    selectedCountry: '',
                                                    main: self.model,
                                                    zip: '',
                                                    address1Error: false,
                                                    cityError: false,
                                                    stateError: false,
                                                    zipError: false,
                                                    countryError: false
                                                }));
                this.set('locationCount', self.get('locationCount')+1);
                this.locationButtonShowHide();
                self.notifyPropertyChange('locations');

            }
        },
        clearInput: function(input) {
            this.set(input, null);
        }
        
    },

});

App.Select2Component = Ember.Select.extend({
    attributeBindings: ['maximumSelectionSize', 'placeholder', 'valueArray' ],
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.applySelect);
    },
    applySelect: function() {
        if (this._state == 'inDOM') {
            var self = this;
            var $el = this.$();
            $el.select2({
                placeholder: this.get('placeholder'),
                maximumSelectionSize: this.get('maximumSelectionSize'),
                
            });
            // $el.select2().on('change', function(e) {
            //     self.set('valueArray', e.val);
            // });
            $el.select2('val', this.get('valueArray')); 

            this.on('change', function(e) {
                self.set('valueArray', e.val);
            });


        };


   // },
   //  contentDidChange: function() {
   //      // Apply the update...
   //      var self = this;
   //      var $el = this.$();
    },
    updateSelect2: function() { // Rerender the select2 container with new values, etc.
        this.rerender();
    }.observes('content')
});



var convertCtyCodeName = function(code) {
    if (code == 'US') {
        return "United States";
    } else if (code == 'CA' ){
        return "Canada";
    } else {
        return code;
    }
}

var convertStateCodeName = function(cty, state) {
    code = cty + ':' + state;
    if (code == "CA:AB") { return "Alberta" }
    if (code == "CA:BC") { return "British Columbia" }
    if (code == "CA:MB") { return "Manitoba" }
    if (code == "CA:NB") { return "New Brunswick" }
    if (code == "CA:NL") { return "Newfoundland and Labrador" }
    if (code == "CA:NT") { return "Northwest Territories" }
    if (code == "CA:NS") { return "Nova Scotia" }
    if (code == "CA:NU") { return "Nunavut" }
    if (code == "CA:ON") { return "Ontario" }
    if (code == "CA:PE") { return "Prince Edward Island" }
    if (code == "CA:QC") { return "Quebec" }
    if (code == "CA:SK") { return "Saskatchewan" }
    if (code == "CA:YT") { return "Yukon Territory" }
    if (code == "US:AL") { return "Alabama" }
    if (code == "US:AK") { return "Alaska" }
    if (code == "US:AS") { return "American Samoa" }
    if (code == "US:AZ") { return "Arizona" }
    if (code == "US:AR") { return "Arkansas" }
    if (code == "US:CA") { return "California" }
    if (code == "US:CO") { return "Colorado" }
    if (code == "US:CT") { return "Connecticut" }
    if (code == "US:DE") { return "Delaware" }
    if (code == "US:DC") { return "District of Columbia" }
    if (code == "US:FL") { return "Florida" }
    if (code == "US:GA") { return "Georgia" }
    if (code == "US:GU") { return "Guam" }
    if (code == "US:HI") { return "Hawaii" }
    if (code == "US:ID") { return "Idaho" }
    if (code == "US:IL") { return "Illinois" }
    if (code == "US:IN") { return "Indiana" }
    if (code == "US:IA") { return "Iowa" }
    if (code == "US:KS") { return "Kansas" }
    if (code == "US:KY") { return "Kentucky" }
    if (code == "US:LA") { return "Louisiana" }
    if (code == "US:ME") { return "Maine" }
    if (code == "US:MH") { return "Marshall Islands" }
    if (code == "US:MD") { return "Maryland" }
    if (code == "US:MA") { return "Massachusetts" }
    if (code == "US:MI") { return "Michigan" }
    if (code == "US:FM") { return "Micronesia" }
    if (code == "US:MN") { return "Minnesota" }
    if (code == "US:MS") { return "Mississippi" }
    if (code == "US:MO") { return "Missouri" }
    if (code == "US:MT") { return "Montana" }
    if (code == "US:NE") { return "Nebraska" }
    if (code == "US:NV") { return "Nevada" }
    if (code == "US:NH") { return "New Hampshire" }
    if (code == "US:NJ") { return "New Jersey" }
    if (code == "US:NM") { return "New Mexico" }
    if (code == "US:NY") { return "New York" }
    if (code == "US:NC") { return "North Carolina" }
    if (code == "US:ND") { return "North Dakota" }
    if (code == "US:MP") { return "Northern Mariana Islands" }
    if (code == "US:OH") { return "Ohio" }
    if (code == "US:OK") { return "Oklahoma" }
    if (code == "US:OR") { return "Oregon" }
    if (code == "US:PW") { return "Palau" }
    if (code == "US:PA") { return "Pennsylvania" }
    if (code == "US:PR") { return "Puerto Rico" }
    if (code == "US:RI") { return "Rhode Island" }
    if (code == "US:SC") { return "South Carolina" }
    if (code == "US:SD") { return "South Dakota" }
    if (code == "US:TN") { return "Tennessee" }
    if (code == "US:TX") { return "Texas" }
    if (code == "US:UT") { return "Utah" }
    if (code == "US:VT") { return "Vermont" }
    if (code == "US:VI") { return "Virgin Islands (US)" }
    if (code == "US:VA") { return "Virginia" }
    if (code == "US:WA") { return "Washington" }
    if (code == "US:WV") { return "West Virginia" }
    if (code == "US:WI") { return "Wisconsin" }
    if (code == "US:WY") { return "Wyoming" }
    return state;    
}















