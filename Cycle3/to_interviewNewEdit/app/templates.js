Ember.TEMPLATES["_oauthIntoGoogleModal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\" id=\"oauthIntoGoogleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"discardModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                </button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Google Calendar</h2>\n            </div>\n            <div class=\"modal__body\">\n                To complete this action, you'll need to sign into Google Calendar.\n            </div>\n            <div class=\"modal__footer\">\n                <button type=\"button\" class=\"button button--primary create-item\" data-dismiss=\"modal\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickOauthIntoGoogle", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Continue</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_sendCalendarInvitationsModal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"modal fade\" id=\"sendCalendarInvitationsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"discardModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                </button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Send Calendar Invitations</h2>\n            </div>\n            <div class=\"modal__body\">\n                Since you've only chosen one time slot, calendar invitations will be sent to all participants now. The applicant does not need to offer their availability and confirm. \n            </div>\n            <div class=\"modal__footer\">\n                <button type=\"button\" class=\"button button--secondary js-cancelSendInvitations\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"button button--primary js-confirmSendInvitations\" data-dismiss=\"modal\">Continue</button>\n            </div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["_updateInvitationModal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\" id=\"updateInvitationModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"discardModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                </button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Update Invitation</h2>\n            </div>\n            <div class=\"modal__body\">\n                If you wish, you can include extra details in the calendar invitations that will be highlighted as a change for the participants.\n                <div class=\"form__group\">\n                    ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("updatedInformationMessage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || (depth0 && depth0.textarea)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n                </div>\n            </div>\n            <div class=\"modal__footer\">\n                <button type=\"button\" class=\"button button--primary js-confirmSave\" data-dismiss=\"modal\">Continue</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["interviewNewEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Edit");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("New");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                        <ul class=\"list-group list-group--bordered mar--sm--bn mar--sm--tn\" style=\"max-height: 300px; overflow: scroll;\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "searchResult", "in", "searchResults", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </ul>\n                    ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <li class=\"list-group__item item\">\n                                    <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSearchResult", "searchResult", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                                        <span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                        <small class=\"block text-faded dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.Title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    </a>\n                                </li>\n                            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "participant", "in", "participants", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <li class=\"list-group__item list-group__item--multi has-icon--right js-participant-item\">\n                                    <div class=\"input__icon juicon juicon-x\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickRemoveParticipant", "participant", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("></div>\n                                    <a>\n                                        <span class=\"block dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "participant.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                        <small class=\"block text-faded dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "participant.Title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    </a>\n                                </li>\n                            ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n                            <div class=\"js-empty-state\">\n                            	<small class=\"block pad--sm--m text-faded text-center\">No participants exist</small>   \n                            </div>\n                        ");
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content pad--sm--m\">\n        <nav class=\"nav-bar--sf1 mar--sm--bn\">\n            <button type=\"button\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":button :button--primary :js-save-button :float--right :mar--sm--only--rs :mar--md--lxs isSaving:load-this")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSave", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</button>\n            <button type=\"button\" class=\"button button--secondary js-save-button float--right-left mar--sm--only--rs mar--md--lxs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickCancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\n            <h2 class=\"nav-bar--sf1__title page__heading\">");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isEdit", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" Interview</h2>\n            <hr class=\"show-brkpoint--md\"/>\n        </nav>\n        <section>\n            <div class=\"row\">\n                <div class=\"column--md--3\">\n                    <h3>Participants</h3>\n                    <!--item search input-->\n                    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":form__group mar--sm--bn isSearching:load-this")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                        <label class=\"sr-only\">Add participant</label>\n                        <div class=\"input__wrap has-icon--right\">\n                    		<div class=\"input__icon juicon juicon-search\"></div>\n                            ");
  hashContexts = {'type': depth0,'class': depth0,'disabled': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'disabled': "ID",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("bg-1"),
    'disabled': ("isAtMaxParticipants"),
    'placeholder': ("Add participants"),
    'value': ("userSearchTerm")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                        </div>\n                        <small class=\"input-error-content\">Error.</small>\n                    </div>\n                    <!--item search results-->\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "searchResults", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    <ul class=\"list-group list-group--bordered mar--sm--ts\" id=\"chosenParticipants\">\n                        <li class=\"list-group__item list-group__item--multi has-icon--right js-participant-item\">\n                            <div class=\"input__icon juicon juicon-user-star\"></div>\n                            <a>\n                                <span class=\"block dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "applicant.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                <small class=\"block text-faded\">Applicant</small>\n                            </a>\n                        </li>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "participants", {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </ul>\n                    <!--topics multiselect-->\n                    <h3>Topics</h3>\n                    <div class=\"form__group\">\n                    	");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("interview.topics")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['select-2'] || (depth0 && depth0['select-2'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "select-2", options))));
  data.buffer.push("\n                    </div>\n                    <h3>Location</h3>\n                    <div class=\"form__group\">\n                        <div class=\"select__wrap\">\n                            <div class=\"input__icon juicon juicon-down\"></div>\n                            ");
  hashContexts = {'content': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'value': depth0,'prompt': depth0,'data-qa-input': depth0};
  hashTypes = {'content': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'value': "ID",'prompt': "ID",'data-qa-input': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("availableLocations"),
    'optionLabelPath': ("content.namespace_Location_Name__c"),
    'optionValuePath': ("content"),
    'value': ("selectedLocation"),
    'prompt': ("labels.pleaseSelect"),
    'data-qa-input': ("select")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </div>\n                    </div>\n                    <h3>Logistical Details</h3>\n                    <div class=\"form__group\">\n                        ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("interview.namespace_Logistical_Details__c")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || (depth0 && depth0.textarea)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n                    </div>\n                </div>\n                <div class=\"column--md--9\">\n                	");
  hashContexts = {'isOauthedIntoGoogle': depth0,'isOauthedIntoOutlook': depth0,'timeSlots': depth0,'deletedTimeSlots': depth0,'googleCalendars': depth0,'participants': depth0,'participantsDidChange': depth0,'isEdit': depth0,'calendarEl': depth0};
  hashTypes = {'isOauthedIntoGoogle': "ID",'isOauthedIntoOutlook': "ID",'timeSlots': "ID",'deletedTimeSlots': "ID",'googleCalendars': "ID",'participants': "ID",'participantsDidChange': "ID",'isEdit': "ID",'calendarEl': "ID"};
  options = {hash:{
    'isOauthedIntoGoogle': ("isOauthedIntoGoogle"),
    'isOauthedIntoOutlook': ("isOauthedIntoOutlook"),
    'timeSlots': ("timeSlots"),
    'deletedTimeSlots': ("deletedTimeSlots"),
    'googleCalendars': ("googleCalendars"),
    'participants': ("participants"),
    'participantsDidChange': ("participantsDidChange"),
    'isEdit': ("isEdit"),
    'calendarEl': ("calendarEl")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['full-calendar'] || (depth0 && depth0['full-calendar'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "full-calendar", options))));
  data.buffer.push("\n                </div>\n            </div>\n        </section>\n    </div>\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "oauthIntoGoogleModal", options) : helperMissing.call(depth0, "partial", "oauthIntoGoogleModal", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "updateInvitationModal", options) : helperMissing.call(depth0, "partial", "updateInvitationModal", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "sendCalendarInvitationsModal", options) : helperMissing.call(depth0, "partial", "sendCalendarInvitationsModal", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
});