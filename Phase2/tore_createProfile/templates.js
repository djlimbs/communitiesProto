Ember.TEMPLATES["components/twitter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<a class=\"twitter-timeline\"\n   width=\"100%\"\n   height=\"300\"\n   href=\"https://twitter.com/salesforcejobs\"\n   data-widget-id=\"565570508859916289\"\n   data-chrome=\"noheader nofooter\"\n   data-border-color=\"#dadee2\">\n    Tweets by @salesforcejobs\n</a>");
  
});

Ember.TEMPLATES["jobPosting"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers['if'].call(depth0, "recentSave", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <div class=\"alert alert--success mar--sm--bm saveAlert\">\n                            <strong data-qa-label=\"savedJobPreviously\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.yourJobHasBeenSaved", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>\n                        </div>\n                    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                        <div class=\"alert alert--info mar--sm--bm saveAlert\">\n                            <strong data-qa-label=\"savedJobToday\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.youSavedThisJobOn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "savedJob.CreatedDate", options) : helperMissing.call(depth0, "formatDate", "savedJob.CreatedDate", options))));
  data.buffer.push(".</strong>\n                        </div>\n                    ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":alert appliedAlertClass :mar--sm--bm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <strong data-qa-label=\"applied\">");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "appliedMessage", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</strong>\n                    </div>\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" | <small>");
  stack1 = helpers._triageMustache.call(depth0, "labels.remoteAvailable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <h4 data-qa-label=\"fieldSetLabel\" class=\"job-field-label\">");
  stack1 = helpers._triageMustache.call(depth0, "field.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n                    <p data-qa-label=\"fieldSetValue\">");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.value", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</p>\n                ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <div class=\"button-group inline-block vam width--full--sm--only\">\n                        <a data-qa-button=\"bottomActionButton\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("redirectUrl"),
    'class': (":button actionButtonColor :theme-bg-color :width--full--sm--only disableApplyButton:disabled"),
    'disabled': ("disableApplyButton"),
    'data-toggle': ("toggleDropdown")
  },hashTypes:{'href': "ID",'class': "STRING",'disabled': "STRING",'data-toggle': "ID"},hashContexts:{'href': depth0,'class': depth0,'disabled': depth0,'data-toggle': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "actionButtonText", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</a>\n                        <ul class=\"dropdown-menu dropdown-menu--up\">\n                            <li data-qa-button=\"bottomApplyEmail\" class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayLocationModal", "email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-envelope\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.applyWithEmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                            <li data-qa-button=\"bottomApplyLinkedIn\" class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayLocationModal", "linkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.applyWithLinkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                        </ul>\n                    </div>\n                ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers['if'].call(depth0, "jobIsSaved", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <span data-qa-label=\"removeJob\" class=\"mar--sm--lm dontSaveJobText\"><a data-qa-link=\"removeJob\" href=\"#\" class=\"text-underline dontSaveJobLink text-error\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSaveJob", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "labels.iAmNotInterestedInThisJob", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></span>\n                    ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <span data-qa-label=\"saveJob\" class=\"mar--sm--lm\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.or", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <a data-qa-link=\"saveJob\" href=\"#\" class=\"text-underline saveJobLink\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSaveJob", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "labels.saveThisJob", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.ifYouAreNotReady", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                    ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <hr/>\n\n                    <div class=\"content__section mar--md--bxl\">\n                        <h3 data-qa-label=\"myJobs\" class=\"mar--sm--tn mar--sm--bn\"><span class=\"juicon juicon-bookmark text-faded\"></span> My jobs</h3>\n                        <ul class=\"list-style-type-none mar--sm--n\">\n                            ");
  stack1 = helpers.each.call(depth0, "application", "in", "allMyJobs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </ul>\n                    </div>\n                    <hr class=\"show-brkpoint--md\">\n                ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \n                                <li class=\"mar--sm--bm mar--sm--tm\">\n                                    <h4 data-qa-label=\"jobTitle\" class=\"mar--sm--n\"><a data-qa-link=\"jobListing\" href=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.jobPostingUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" target=\"_top\">");
  stack1 = helpers._triageMustache.call(depth0, "application.jobTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></h4>\n                                    <h5 class=\"mar--sm--n text-faded\" data-qa-lable=\"primaryLocation\">\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "application.primaryLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n                                        ");
  stack1 = helpers['if'].call(depth0, "application.otherLocationsString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  stack1 = helpers['if'].call(depth0, "application.isRemoteAvailable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h5>\n                                    ");
  stack1 = helpers['if'].call(depth0, "application.isApplication", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </li>\n                            ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" &amp; <a data-qa-link=\"locationJobListing\" data-qa-label=\"otherLocations\"data-toggle=\"tooltip\" title=\"\" class=\"text-primary\" data-original-title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.otherLocationsString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">");
  stack1 = helpers._triageMustache.call(depth0, "application.otherLocationsCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "application.otherText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n                                        ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                            <small data-qa-label=\"remote\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.remoteAvailable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n                                        ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                        ");
  stack1 = helpers['if'].call(depth0, "application.hasJobOffer", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                            <small data-qa-label=\"offerStatus\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":label application.jobLabelClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Offer ");
  stack1 = helpers._triageMustache.call(depth0, "application.jobOfferStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n                                        ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                            <small data-qa-label=\"applicationStatus\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":label application.jobLabelClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "application.statusText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n                                        ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container brand__border-accent--top\" style=\"border-top-color: #cf5c60\">\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":load-full showLoadingState::hide")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        <div class=\"load-full-icon\"></div>\n    </div>\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "locationModal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n    <div class=\"content pad--sm--tm\">\n        <div class=\"row\">\n            <div class=\"column--md--8\">\n                ");
  stack1 = helpers['if'].call(depth0, "jobIsSaved", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "appliedMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                <nav id=\"jobNav\" class=\"relative\">\n                    <div class=\"button-group float--right show-brkpoint--md\">\n                        <a  data-qa-button=\"actionButton\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("redirectUrl"),
    'class': (":button actionButtonColor :theme-bg-color disableApplyButton:disabled"),
    'disabled': ("disableApplyButton"),
    'data-toggle': ("toggleDropdown")
  },hashTypes:{'href': "ID",'class': "STRING",'disabled': "STRING",'data-toggle': "ID"},hashContexts:{'href': depth0,'class': depth0,'disabled': depth0,'data-toggle': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" target=\"_top\">");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "actionButtonText", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</a>\n                        <ul class=\"dropdown-menu\">\n                            <li data-qa-button=\"applyEmail\"class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayLocationModal", "email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-envelope\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.applyWithEmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                            <li data-qa-button=\"applyLinkedIn\" class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayLocationModal", "linkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.applyWithLinkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                        </ul>\n                    </div>\n                    <h1 data-qa-label=\"postName\" class=\"has-subheading page__heading\">");
  stack1 = helpers._triageMustache.call(depth0, "jobPosting.Name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n                    <h2 data-qa-label=\"locations\" class=\"page__subheading wsn\">");
  stack1 = helpers._triageMustache.call(depth0, "locationString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers['if'].call(depth0, "isRemoteAvailable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n                </nav>\n                ");
  stack1 = helpers.each.call(depth0, "field", "in", "jpFields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                <hr class=\"mar--sm--txl mar--sm--bxl\">\n                ");
  stack1 = helpers.unless.call(depth0, "hasJobOffer", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  stack1 = helpers.unless.call(depth0, "application", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n            <div class=\"column--md--4 mar--sm--only--txl\">\n                <div class=\"button-group width--full inline-block vam width--full--sm--only\">\n                    <button class=\"button button--secondary width--full theme-border-color theme-link-color\" data-toggle=\"dropdown\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.shareJob", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <span class=\"juicon juicon-share\"></span></button>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickTweet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-twitter\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.twitter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickLinkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> ");
  stack1 = helpers._triageMustache.call(depth0, "labels.linkedIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n                    </ul>\n                </div>\n                ");
  stack1 = helpers['if'].call(depth0, "allMyJobs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            \n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["locationModal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\" id=\"locationModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top\">\n                <h2 data-qa-label=\"locationTitle\" class=\"modal__heading\" id=\"myModalLabel\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.beforeYouBegin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n            </div>\n            <div class=\"modal__body\">\n                <p data-qa-label=\"confirmLocation\" class=\"mar--sm--tn\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.confirmLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                <div class=\"form__group\">\n                    <div class=\"select__wrap\">\n                        <div class=\"input__icon juicon juicon-down\"></div>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("locations"),
    'optionValuePath': ("content.Location__c"),
    'optionLabelPath': ("content.formattedLocationString"),
    'value': ("selectedLocation"),
    'data-qa-select': ("locationSelect")
  },hashTypes:{'content': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'value': "ID",'data-qa-select': "STRING"},hashContexts:{'content': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'value': depth0,'data-qa-select': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal__footer\">\n                <button data-qa-button=\"cancel\" type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</button>\n                <button id=\"modalOk\" data-qa-button=\"ok\" type=\"button\" class=\"button button--primary\" data-dismiss=\"modal\">");
  stack1 = helpers._triageMustache.call(depth0, "labels.ok", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});