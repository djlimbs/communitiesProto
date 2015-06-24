Ember.TEMPLATES["interviewNewEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <div class=\"js-empty-state\">\n                            <small class=\"block pad--sm--m text-faded text-center\">Searching...</small>   \n                        </div>\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                        <ul class=\"list-group list-group--bordered mar--sm--bn mar--sm--tn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "searchResult", "in", "searchResults", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </ul>\n                    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <li class=\"list-group__item item\">\n                                    <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSearchResult", "searchResult", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("><span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></a>\n                                </li>\n                            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "participant", "in", "participants", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program7(depth0,data) {
  
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

function program9(depth0,data) {
  
  
  data.buffer.push("\n                            <div class=\"js-empty-state\">\n                            	<small class=\"block pad--sm--m text-faded text-center\">No participants exist</small>   \n                            </div>\n                        ");
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content pad--sm--m\">\n        <nav class=\"nav-bar--sf1 mar--sm--bn\">\n            <button type=\"button\" class=\"button button--primary js-save-button float--right mar--sm--only--rs mar--md--lxs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSave", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</button>\n            <button type=\"button\" class=\"button button--secondary js-save-button float--right-left mar--sm--only--rs mar--md--lxs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickCancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\n            <h2 class=\"nav-bar--sf1__title page__heading\">New Interview</h2>\n            <hr class=\"show-brkpoint--md\"/>\n        </nav>\n        <section>\n            <div class=\"row\">\n                <div class=\"column--md--3\">\n                    <h3>Participants</h3>\n                    <!--item search input-->\n                    <div class=\"form__group mar--sm--bn\">\n                        <label class=\"sr-only\">Add participant</label>\n                        <div class=\"input__wrap has-icon--right\">\n                    		<div class=\"input__icon juicon juicon-search\"></div>\n                            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("bg-1"),
    'placeholder': ("Add participants"),
    'value': ("userSearchTerm")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                        </div>\n                        <small class=\"input-error-content\">Error.</small>\n                    </div>\n                    <!--item search results-->\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isSearching", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "searchResults", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    <ul class=\"list-group list-group--bordered mar--sm--ts\" id=\"chosenParticipants\">\n                        <li class=\"list-group__item list-group__item--multi has-icon--right js-participant-item\">\n                            <div class=\"input__icon juicon juicon-user-star\"></div>\n                            <a>\n                                <span class=\"block dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "applicant.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                <small class=\"block text-faded\">Applicant</small>\n                            </a>\n                        </li>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "participants", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </ul>\n                    <!--topics multiselect-->\n                    <h3>Topics</h3>\n                    <div class=\"form__group\">\n                    	");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("interview.topics")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['select-2'] || (depth0 && depth0['select-2'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "select-2", options))));
  data.buffer.push("\n                    </div>\n                </div>\n                <div class=\"column--md--9\">\n                	");
  hashContexts = {'isOauthedIntoGoogle': depth0,'timeSlots': depth0,'deletedTimeSlots': depth0,'googleCalendars': depth0,'participants': depth0,'participantsDidChange': depth0};
  hashTypes = {'isOauthedIntoGoogle': "ID",'timeSlots': "ID",'deletedTimeSlots': "ID",'googleCalendars': "ID",'participants': "ID",'participantsDidChange': "ID"};
  options = {hash:{
    'isOauthedIntoGoogle': ("isOauthedIntoGoogle"),
    'timeSlots': ("timeSlots"),
    'deletedTimeSlots': ("deletedTimeSlots"),
    'googleCalendars': ("googleCalendars"),
    'participants': ("participants"),
    'participantsDidChange': ("participantsDidChange")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['full-calendar'] || (depth0 && depth0['full-calendar'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "full-calendar", options))));
  data.buffer.push("\n                </div>\n            </div>\n        </section>\n    </div>\n    <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"discardModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal__shell\">\n            <div class=\"modal__content\">\n                <div class=\"modal__top\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                        <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <h2 class=\"modal__heading\" id=\"myModalLabel\">New item</h2>\n                </div>\n                <div class=\"modal__body\">\n                    <div class=\"form__group\">\n                        <label><span class=\"juicon juicon-calendar\"></span> Day</label>\n                    	<div class=\"item-day\"></div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column--md--6\">\n                            <div class=\"form__group\">\n                                <label><span class=\"juicon juicon-clock\"></span> Time</label>\n                                <div class=\"select__wrap\">\n                                    <select class=\"item-time\">\n                                        <option val=\"1\">1</option>\n                                        <option val=\"2\">2</option>\n                                        <option val=\"3\">3</option>\n                                        <option val=\"4\">4</option>\n                                        <option val=\"5\">5</option>\n                                        <option val=\"6\">6</option>\n                                        <option val=\"7\">7</option>\n                                        <option val=\"8\">8</option>\n                                        <option val=\"9\">9</option>\n                                        <option val=\"10\">10</option>\n                                        <option val=\"11\">11</option>\n                                        <option val=\"12\">12</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"column--md--6\">\n                            <div class=\"form__group\">\n                                <label>AM/PM</label>\n                                <div class=\"select__wrap\">\n                                    <select class=\"item-am-pm\">\n                                        <option val=\"a\">AM</option>\n                                        <option val=\"p\">PM</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form__group\">\n                            <label>Who</label>\n                            <div class=\"select__wrap\">\n                                <select class=\"item-participant\">\n                                    <option val=\"\">Select...</option>\n                                    <option val=\"George Kenessey\">George Kenessey</option>\n                                    <option val=\"Ross Belmont\">Ross Belmont</option>\n                                </select>\n                            </div>\n                        </div>\n                </div>\n                <div class=\"modal__footer\">\n                    <button type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\">Cancel</button>\n                    <button type=\"button\" class=\"button button--primary create-item\" data-dismiss=\"modal\">Create item</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});