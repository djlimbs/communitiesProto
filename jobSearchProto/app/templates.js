Ember.TEMPLATES["components/twitter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<a class=\"twitter-timeline\"\n   width=\"100%\"\n   height=\"300\"\n   href=\"https://twitter.com/salesforcejobs\"\n   data-widget-id=\"565570508859916289\"\n   data-chrome=\"noheader nofooter\"\n   data-border-color=\"#dadee2\">\n    Tweets by @salesforcejobs\n</a>");
  
});

Ember.TEMPLATES["jobSearch"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "searchBar", options) : helperMissing.call(depth0, "partial", "searchBar", options))));
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "searchResults", options) : helperMissing.call(depth0, "partial", "searchResults", options))));
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "pleaseLoginModal", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["pleaseLoginModal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"scope-container brand__border-accent--top\" style=\"border-top-color: #cf5c60\">\n    <div class=\"modal fade in\" id=\"pleaseLoginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal__shell\">\n            <div class=\"modal__content\">\n                <div class=\"modal__top\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                        <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <h2 class=\"modal__heading\" id=\"myModalLabel\">Please login to save this job</h2>\n                </div>\n                <div class=\"modal__body\">\n                    You’ll need to register or log in to save this job. Would you like to do that now?</div>\n                <div class=\"modal__footer\">\n                    <button type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\">Cancel</button>\n                    <button id=\"modalOk\"  type=\"button\" class=\"button button--primary\">OK</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["searchBar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                                <div class=\"form__group mar--sm--tm mar--md--bn\">\n                                    <div class=\"input__wrap has-icon--right\">\n                                        <div class=\"input__icon juicon juicon-chch\"></div>\n                                        ");
  hashContexts = {'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'placeholder': ("City, State or Zip"),
    'class': ("bg-1"),
    'value': ("nearValue")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                                    </div>\n                                </div>\n                            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                                <div class=\"row\">\n                                    <div class=\"column--sm--6\">\n                                        <div class=\"form__group mar--md--tm mar--md--bn\">\n                                            <div class=\"select__wrap\">\n                                                <div class=\"input__icon juicon juicon-down\"></div>\n                                                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("radiusOptions"),
    'value': ("selectedRadius")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"column--sm--6\">\n                                        <div class=\"form__group mar--md--tm mar--md--bn\">\n                                            <div class=\"select__wrap\">\n                                                <div class=\"input__icon juicon juicon-down\"></div>\n                                                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("radiusUnits"),
    'value': ("selectedUnit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "showResultsCount", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <span class=\" text-white\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "numberOfJobs", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("  <span class=\"text-faded\">jobs found</span></span>\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"community-hero mar--sm--bm\" style=\"background: #33536d;\">\n        <div class=\"community-hero__bg\" style=\"background-image: url('http://www.salesforce.com/assets/images/careers/business-background.jpg')\"></div>\n        <div class=\"content community-hero__content\" style=\"max-width: 700px; margin: 0 auto;\">\n            <h1 class=\"text-center mar--md--bxl mar--md--txl\"><span class=\"text-white\">Find your #dreamjob</span></h1>\n            <div class=\"table-group mar--md--bxl\">\n                <div class=\"table-group__object--large block-on-small pad--sm--only--rn\">\n                    <div class=\"row\">\n                        <div class=\"column--md--6\">\n                            <div class=\"form__group mar--md--bn\">\n                                <div class=\"input__wrap has-icon--right\">\n                                    <div class=\"input__icon juicon juicon-search\"></div>\n                                    ");
  hashContexts = {'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'placeholder': ("Search jobs..."),
    'class': ("bg-1"),
    'value': ("searchTerm")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"column--md--6\">\n                            <div class=\"form__group mar--md--bn\">\n                                <div class=\"select__wrap\">\n                                    <div class=\"input__icon juicon juicon-down\"></div>\n                                    ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("jobFamilies"),
    'value': ("selectedJobFamily")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"column--md--6\">\n                            <div class=\"form__group mar--sm--tm mar--md--bn\">\n                                <div class=\"select__wrap\">\n                                    <div class=\"input__icon juicon juicon-location\"></div>\n                                    ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("locations"),
    'value': ("selectedLocation")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"column--md--6\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isNear", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isNearMe", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </div>\n                </div>\n                <div class=\"table-group__object--small pad--md--lm block-on-small width--full--sm--only mar--sm--only--bxl\">\n                    <button type=\"button\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":button :button--primary :width--full--sm--only :theme-bg-color isSearching:load-this")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSearch", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Search</button>\n                </div>\n            </div>\n            <h1 class=\"text-center mar--sm--tn mar--sm--bxl\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "searchResults", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </h1>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["searchResults"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"card\"> \n                        <div class=\"card__body\">\n\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "searchResult.isJobAppliedCompleted", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            \n\n                            <div class=\"row\">\n                                <div class=\"column--md--8\">\n                                    <h1 class=\"page__heading has-subheading\"><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickApply", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h1>\n\n                                    <h2 class=\"page__subheading\">\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.firstLocationString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "searchResult.otherLocationsString", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h2>\n                                </div>\n                            </div>\n                            <div class=\"card__text\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "field", "in", "searchResult.fieldsToDisplay", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </div>\n                        </div>\n                    </div>\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                                <button href=\"#\" class=\"float--right button button--success mar--sm--only--rs mar--md--lxs show-brkpoint--md\" disabled=\"disabled\">Applied</button>\n                            ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "searchResult.isJobAppliedInProgress", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <a href=\"#\" class=\"float--right button button--success mar--sm--only--rs mar--md--lxs show-brkpoint--md\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "finishApplication", "searchResult", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Finish</a>\n                                ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "searchResult.isJobSaved", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\n                                        <button href=\"#\" class=\"float--right button button--success mar--sm--only--rs mar--md--lxs show-brkpoint--md\">Saved</button> \n                                    ");
  }

function program10(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                        <a href=\"#\" class=\"float--right button button--primary  theme-bg-color mar--sm--only--rs mar--md--lxs show-brkpoint--md theme-bg-color\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveJob", "searchResult", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</a>\n                                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" &amp;\n                                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isAndroid", {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                                <a data-toggle=\"tooltip\" title=\"\" class=\"pointer text-primary text-underline\" data-original-title=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchResult.otherLocationsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n                                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.otherLocationsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                                                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.locationsCount || (depth0 && depth0.locationsCount)),stack1 ? stack1.call(depth0, "searchResult.otherLocationsCount", options) : helperMissing.call(depth0, "locationsCount", "searchResult.otherLocationsCount", options))));
  data.buffer.push("\n                                                </a>\n                                            ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                                <a href=\"#\" data-toggle=\"tooltip\" title=\"\" class=\"pointer text-primary text-underline\" data-original-title=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.otherLocationsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n                                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "searchResult.otherLocationsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.locationsCount || (depth0 && depth0.locationsCount)),stack1 ? stack1.call(depth0, "searchResult.otherLocationsCount", options) : helperMissing.call(depth0, "locationsCount", "searchResult.otherLocationsCount", options))));
  data.buffer.push("\n                                                </a>\n                                            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.value", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                        <div class=\"job-field\">\n                                            <h4 class=\"job-field-label\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        </div>\n                                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container brand__border-accent--top\" style=\"border-top-color: #cf5c60\">\n    <div class=\"content pad--md--txl pad--md--bl\">\n        <div class=\"row\">\n            <div class=\"column--md--8\">\n\n                <div class=\"alert alert--success mar--md--bm hide\">\n                    <button type=\"button\" class=\"close show-brkpoint--sm--only\" data-dismiss=\"alert\"><span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span></button>\n                    <button type=\"button\" class=\"close close-timeout show-brkpoint--md\">\n                        <svg class=\"close-progress\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\">\n                            <circle class=\"progress-track progress-track--success\" cx=\"20\" cy=\"20\" r=\"19\" opacity=\"0\" stroke=\"#000\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></circle>\n                            <path d=\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\" class=\"progress progress--success\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></path></svg>\n                        <span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <strong>You've successfully applied for this job.</strong>\n                </div> \n\n                \n                ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "searchResult", "in", "searchResults", {hash:{
    'itemController': ("jobPosting")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "sideBar", options) : helperMissing.call(depth0, "partial", "sideBar", options))));
  data.buffer.push("\n\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["sideBar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"content__section mar--md--bxl\">\n            <h3 class=\"mar--sm--tn mar--sm--bn\"><span class=\"juicon juicon-bookmark text-faded\"></span> My jobs</h3>\n            <ul class=\"list-style-type-none mar--sm--n\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "application", "in", "allMyJobs", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n        <hr class=\"show-brkpoint--md\">\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" \n                    <li class=\"mar--sm--bm mar--sm--tm\">\n                        <h4 class=\"mar--sm--n\"><a href=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.jobPostingUrl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\" target=\"_top\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.jobTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h4>\n                        <h5 class=\"mar--sm--n text-faded\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.firstLocationString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.otherLocationsString", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.isRemoteAvailable", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </h5>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.isApplication", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </li>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push(" &amp;\n                                <a href=\"#\" data-toggle=\"tooltip\" title=\"\" class=\"pointer text-primary text-underline\" data-original-title=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.otherLocationsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.otherLocationsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.locationsCount || (depth0 && depth0.locationsCount)),stack1 ? stack1.call(depth0, "application.otherLocationsCount", options) : helperMissing.call(depth0, "locationsCount", "application.otherLocationsCount", options))));
  data.buffer.push("\n                                </a>\n                            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                                <small>(remote available)</small>\n                            ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.hasJobOffer", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                                <small ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":label application.jobLabelClass")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">Offer ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.jobOfferStatus", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                            ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                                <small ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":label application.jobLabelClass")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.statusText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"column--md--4\">\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "allMyJobs", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"content__section\" data-twttr-id=\"twttr-sandbox-0\">\n        <h3 class=\"mar--sm--tn mar--sm--bm\">\n            <span class=\"juicon juicon-twitter text-faded\"></span> \n            <a href=\"https://www.twitter.com/salesforcejobs\">@Salesforcejobs</a>\n        </h3>\n\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "salesforce-twitter", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</div>\n\n\n");
  return buffer;
  
});