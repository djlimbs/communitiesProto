Ember.TEMPLATES["jobPosting"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"alert alert--success mar--sm--bm\">\n                        <button type=\"button\" class=\"close show-brkpoint--sm--only\" data-dismiss=\"alert\"><span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span></button>\n                        <button type=\"button\" class=\"close close-timeout show-brkpoint--md\">\n                            <svg class=\"close-progress\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\">\n                                <circle class=\"progress-track progress-track--success\" cx=\"20\" cy=\"20\" r=\"19\" opacity=\"0\" stroke=\"#000\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></circle>\n                                <path d=\"M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z\" class=\"progress progress--success\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" fill=\"none\"></path></svg>\n                            <span class=\"alert-close-x\"></span><span class=\"sr-only\">Close</span>\n                        </button>\n                        <strong>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "appliedMessage", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n                    </div>\n                ");
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
  data.buffer.push("</h1>\n                    <h2 class=\"page__subheading\">Chicago, IL</h2>\n                </nav>\n                <p>");
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
  data.buffer.push("><span class=\"juicon juicon-linkedin\"></span> Apply with LinkedIn</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-facebook\"></span> Apply with Facebook</a></li>\n                    </ul>\n                </div>\n                <span class=\"mar--sm--lm\">or <a href=\"#\" class=\"text-underline saveJobLink\">save this job</a> if you're not ready</span>\n            </div>\n            <div class=\"column--md--4 mar--sm--only--txl\">\n                <div class=\"button-group width--full inline-block vam width--full--sm--only\">\n                    <button class=\"button button--secondary width--full theme-border-color theme-link-color\" data-toggle=\"dropdown\">Share Job <span class=\"juicon juicon-share\"></span></button>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-twitter\"></span> Twitter</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-linkedin\"></span> LinkedIn</a></li>\n                        <li class=\"dropdown-menu__list-item\"><a href=\"#\"><span class=\"juicon juicon-facebook\"></span> Facebook</a></li>\n                    </ul>\n                </div>\n                <hr>\n                <h3 class=\"mar--sm--tn mar--sm--bn\"><span class=\"juicon juicon-twitter text-faded\"></span> Recent tweets <a href=\"#\">@Salesforce</a></h3>\n                <ul class=\"list-style-type-none\">\n                    <li class=\"card\">\n                        <div class=\"card__body\">\n                            <span>\"</span><a href=\"#\" class=\"text-faded\">As a software developer, you will be part of Salesforce's Data Science Team.</a><span>\"</span>\n                        </div>\n                    </li>\n                    <li class=\"card\">\n                        <div class=\"card__body\">\n                            <span>\"</span><a href=\"#\" class=\"text-faded\">As a software developer, you will be part of Salesforce's Data Science Team.</a><span>\"</span>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});