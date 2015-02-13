Ember.TEMPLATES["components/twitter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<a class=\"twitter-timeline\"\n   width=\"100%\"\n   height=\"300\"\n   href=\"https://twitter.com/salesforcejobs\"\n   data-widget-id=\"565570508859916289\"\n   data-chrome=\"noheader nofooter\"\n   data-border-color=\"#dadee2\">\n    Tweets by @salesforcejobs\n</a>");
  
});

Ember.TEMPLATES["jobPosting"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"alert alert--success mar--sm--bm\">\n                        <button type=\"button\" class=\"close show-brkpoint--sm--only\" data-dismiss=\"alert\"><span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span></button>\n                        <button type=\"button\" class=\"close close-timeout show-brkpoint--md\">\n                            <svg class=\"close-progress\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\">\n                                <circle class=\"progress-track progress-track--success\" cx=\"20\" cy=\"20\" r=\"19\" opacity=\"0\" stroke=\"#000\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></circle>\n                                <path d=\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\" class=\"progress progress--success\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></path></svg>\n                            <span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span>\n                        </button>\n                        <strong>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "appliedMessage", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n                    </div>\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" &amp; <a href=\"communities__prototype__job--v2.html\" data-toggle=\"tooltip\" title=\"\" class=\"pointer text-primary text-underline\" data-original-title=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "otherLocationsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "otherLocationsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" others</a>\n                        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"content__section mar--md--bxl\">\n                        <h3 class=\"mar--sm--tn mar--sm--bn\"><span class=\"juicon juicon-bookmark text-faded\"></span> My saved jobs</h3>\n                        <ul class=\"list-style-type-none mar--sm--n\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "application", "in", "applications", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </ul>\n                    </div>\n                    <hr class=\"show-brkpoint--md\">\n                ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <li class=\"mar--sm--bm mar--sm--tm\">\n                                    <h4 class=\"mar--sm--n\"><a href=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.jobPostingUrl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\" target=\"_top\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.jobTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h4>\n                                    <h5 class=\"mar--sm--n text-faded\">\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.firstLocationString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.otherLocationsString", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h5>\n                                    <small class=\"label label--secondary\">Applied</small>\n                                </li>\n                            ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" &amp; <a href=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.jobPostingUrl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\" target=\"_top\" data-toggle=\"tooltip\" title=\"\" class=\"pointer text-primary text-underline\" data-original-title=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "application.otherLocationsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.otherLocationsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" others</a>\n                                        ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container brand__border-accent--top\" style=\"border-top-color: #cf5c60\">\n    <div class=\"content pad--sm--tm\">\n        <div class=\"row\">\n            <div class=\"column--md--8\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "appliedMessage", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                <nav id=\"jobNav\" class=\"relative\">\n                    <div class=\"button-group float--right show-brkpoint--md\">\n                        <button ");
  hashContexts = {'class': depth0,'disabled': depth0};
  hashTypes = {'class': "STRING",'disabled': "STRING"};
  options = {hash:{
    'class': (":button :button--primary :theme-bg-color disableApplyButton:disabled"),
    'disabled': ("disableApplyButton")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" data-toggle=\"dropdown\">Apply <span class=\"show-brkpoint--md\">Now</span></button>\n                        <ul class=\"dropdown-menu\">\n                            <li class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickApply", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"juicon juicon-envelope\"></span> Apply with email</a></li>\n                            <li class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickApplyWithLinkedIn", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> Apply with LinkedIn</a></li>\n                            <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-facebook\"></span> Apply with Facebook</a></li>\n                        </ul>\n                    </div>\n                    <h1 class=\"has-subheading page__heading\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "jobPosting.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n                    <h2 class=\"page__subheading\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "firstLocationString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "otherLocationsString", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </h2>\n                </nav>\n                <p>");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "jobPosting.Job_Description__c", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n                <hr class=\"mar--sm--txl mar--sm--bxl\">\n                <div class=\"button-group inline-block vam width--full--sm--only\">\n                    <button ");
  hashContexts = {'class': depth0,'disabled': depth0};
  hashTypes = {'class': "STRING",'disabled': "STRING"};
  options = {hash:{
    'class': (":button :button--primary :theme-bg-color :width--full--sm--only disableApplyButton:disabled"),
    'disabled': ("disableApplyButton")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" data-toggle=\"dropdown\">Apply <span class=\"show-brkpoint--md\">Now</span></button>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-envelope\"></span> Apply with email</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickApplyWithLinkedIn", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> Apply with LinkedIn</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-facebook\"></span> Apply with Facebook</a></li>\n                    </ul>\n                </div>\n                <span class=\"mar--sm--lm\">or <a href=\"#\" class=\"text-underline saveJobLink\">save this job</a> if you're not ready</span>\n            </div>\n            <div class=\"column--md--4\">\n                <div class=\"button-group width--full inline-block vam width--full--sm--only\">\n                    <button class=\"button button--secondary width--full theme-border-color theme-link-color\" data-toggle=\"dropdown\">Share Job <span class=\"juicon juicon-share\"></span></button>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-twitter\"></span> Twitter</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-linkedin\"></span> LinkedIn</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-facebook\"></span> Facebook</a></li>\n                    </ul>\n                </div>\n                <hr>\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "applications", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                <h3 class=\"mar--sm--tn mar--sm--bm\">\n                    <span class=\"juicon juicon-twitter text-faded\"></span> \n                    <a href=\"https://www.twitter.com/salesforcejobs\">@Salesforcejobs</a>\n                </h3>\n\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "salesforce-twitter", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n\n            \n        </div>\n    </div>\n</div>");
  return buffer;
  
});