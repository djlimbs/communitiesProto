Ember.TEMPLATES["_applicationDetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n    <section id=\"summary\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"summary\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.summary", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            <p data-qa-label=\"summaryValue\" class=\"mar--sm--tn\">\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "talentProfile.Summary__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "talentProfile.Summary__c", options))));
  data.buffer.push("\n            </p>\n        </div>\n    </section>\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            <article class=\"mar--sm--bm\">\n                <div data-qa-card=\"interview\" class=\"card mar--sm--tm\">\n                    <div class=\"card__body\">\n                        <div class=\"mar--sm--bs\"><span class=\"juicon juicon-calendar text-faded mar--sm--rs pad--sm--rxs\"></span>\n                            <a data-qa-link=\"interview\" ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("interviewUrl")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "formattedStartDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "isSF1", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</a>\n                            <span data-qa-label=\"interviewStatus\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":status statusColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                        </div>\n                        <div class=\"row pad--sm--lxl\">\n                            <div class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn pad--sm--only--bs\">\n                                <h4 data-qa-label=\"interviewers\" class=\"mar--sm--n\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.interviewers", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.Interviewers__c", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            </div>\n                            <div class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn\">\n                                <h4 data-qa-label=\"topics\" class=\"mar--sm--n\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.topics", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.Topics__c", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            </div>\n                        </div>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isCompleted", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </div>\n                </div>\n            </article>\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("<span class=\"text-faded\"> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "otherText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Interviewers__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <span data-qa-label=\"noInterviews\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Topics__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <span data-qa-label=\"noTopics\"class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <div class=\"row pad--sm--lxl mar--sm--ts\">\n                                <div class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn pad--sm--only--bs\">\n                                    <h4 data-qa-label=\"feedback\" class=\"mar--sm--n\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.feedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Feedback_Provided__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </div>\n                            </div>\n                        ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <div class=\"js-component-controls mar--sm--tm\">\n                <button data-qa-button=\"addInterview\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addInterview", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm\">\n                    <span data-qa-label=\"addInterview\" class=\"juicon juicon-plus\"></span> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.addInterview", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </button>\n            </div>\n        ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            <article class=\"mar--sm--bm\">\n                <div data-qa-card=\"evaluation\" class=\"card mar--sm--tm\">\n                    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":card__body displayPanelBottom::pad--sm--bn")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                        <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":row displayPanelBottom:panel__top :pad--sm--n displayPanelBottom:pad--sm--txs displayPanelBottom:mar--sm--bm")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" style=\"height: auto\">\n                            <div class=\"column--md--8 dots\">\n                                <div class=\"part__left--fixed mar--sm--rs pad--sm--rxs\" style=\"display: inline-block; line-height: 0;\">\n                                    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":juicon icon iconColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></div>\n                                </div>\n                                <div class=\"part__body--fixed pad--md--bm pad--sm--only--bs\" style=\"display: inline-block; max-width:88%;\">\n                                    <h4 data-qa-label=\"feedbackCardTitle\" class=\"card__heading dots\">\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "headerText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </h4>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "hasFinal", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                                </div>\n                            </div>\n                            <div class=\"column--md--4 text-right-left mar--sm--only--bm\" style=\"line-height: 16px\">\n                                <small data-qa-label=\"createdByDate\" class=\"text-faded mar--sm--only--lxl mar--sm--only--bm\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "CreatedBy.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" &bull; ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "formattedDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                            </div>\n                        </div>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "hasFinal", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.Disposition__c", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.Comments__c", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </div>\n                </div>\n            </article>\n        ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Interview__r.Topics__c", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            <div data-qa-label=\"feedbackInterviewers\" class=\"text-faded dots\"><small>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.interviewWith", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Interview__r.Interviewers__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small></div>\n                                        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "criteriaFields", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <div data-qa-label=\"criterieaFields\" class=\"row pad--sm--lxl\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "criteriaFields", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                            ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                        <div class=\"panel__body column--md--6 pad--sm--tn\">\n                                            <h4 class=\"mar--sm--n\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "value", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </div>\n                                    ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                                <span class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                            ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <div class=\"row pad--sm--lxl\">\n                                <div data-qa-label=\"disposition\" class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn\">\n                                    <h4 data-qa-label=\"dispositionTitle\" class=\"mar--sm--n\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.disposition", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Disposition__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </div>\n                            </div>\n                        ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                            <div data-qa-label=\"comments\" class=\"block\">\n                                \"");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Comments__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Comments__c", options))));
  data.buffer.push("\"\n                            </div>\n                        ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "childrenObjects", options) : helperMissing.call(depth0, "partial", "childrenObjects", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                <strong data-qa-label=\"score\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("application.ratingColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.rating", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.score", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.showMax", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</span>\n            ");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("<span data-qa-label=\"maxScore\" class=\"text-faded\"> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.outOf", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Maximum_Score__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <strong data-qa-label=\"noRating\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.rating", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" N/A</strong>\n            ");
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"panel__component\">\n            <label data-qa-label=\"jobSpecificQuestions\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.jobSpecificQuestions", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "jobQuestions", {hash:{},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    ");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <article class=\"card mar--sm--tm mar--sm--bxs\">\n                    <div class=\"card__body\">\n                        <div><small data-qa-label=\"jobQuestion\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Question__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small></div>\n                        <div data-qa-label=\"jobValue\" class=\"mar--sm--txs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Value__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                    </div>\n                </article>\n            ");
  return buffer;
  }

function program43(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"panel__component\">\n            <label data-qa-label=\"generalQuestions\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.generalQuestions", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "generalQuestions", {hash:{},inverse:self.noop,fn:self.program(44, program44, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    ");
  return buffer;
  }
function program44(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <article class=\"card mar--sm--tm mar--sm--bxs\">\n                    <div class=\"card__body\">\n                        <div><small data-qa-label=\"generalQuestion\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Question__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small></div>\n                        <div data-qa-label=\"generalValue\" class=\"mar--sm--txs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Value__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                    </div>\n                </article>\n            ");
  return buffer;
  }

function program46(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "contactRow", {hash:{},inverse:self.noop,fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        ");
  return buffer;
  }
function program47(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div data-qa-label=\"rowValue\" class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                        <label data-qa-label=\"rowLabel\" class=\"block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "value", {hash:{},inverse:self.program(50, program50, data),fn:self.program(48, program48, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div> \n                ");
  return buffer;
  }
function program48(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                            ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program50(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <div data-qa-label=\"rowNotProvided\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                        ");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "talentProfile.Summary__c", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<section id=\"interview\">\n    <div class=\"list-heading\">\n        <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.interviews", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n    </div>\n    <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n        ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "interviews", {hash:{
    'itemController': ("interview")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "isSF1", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n</section>\n<section id=\"feedback\">\n    <div class=\"list-heading\">\n        <h4 data-qa-label=\"feedbackTitle\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.feedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n    </div>\n    <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n        ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "evaluations", {hash:{
    'itemController': ("feedback")
  },inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        <div class=\"js-component-controls mar--sm--tm\">\n            <button data-qa-button=\"provideFeedback\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "provideFeedback", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm\">\n                <span data-qa-label=\"provideFeedback\" class=\"juicon juicon-chat\"></span> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.provideFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </button>\n        </div>\n    </div>\n</section>\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "talentProfile", "as", "tp", {hash:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<section id=\"application-form\">\n    <div class=\"list-heading\">\n        <h4 data-qa-label=\"applicationForm\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.applicationForm", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n    </div>\n    <div class=\"panel__body pad--sm--bn\">\n        <p class=\"mar--sm--tn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "application.hasScore", {hash:{},inverse:self.program(38, program38, data),fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </p>\n    </div>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "jobQuestions", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "generalQuestions", {hash:{},inverse:self.noop,fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n<section id=\"contact-information\">\n    <div class=\"list-heading\">\n        <h4 data-qa-label=\"contactInformation\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.contactInformation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n    </div>\n    <div data-qa-rows=\"contactRows\" class=\"panel__body pad--sm--bn\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "contactRow", "in", "contactRows", {hash:{},inverse:self.noop,fn:self.program(46, program46, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["_applicationReaderModalApplicant"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Job_Posting_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                        <small data-qa-label=\"outcome\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":label outcomeColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Outcome__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n    <div class=\"column--sm--9 column--md--12\">\n        <div class=\"card__body pad--sm--bs\">\n            <div class=\"card__top\">\n                <h4 data-qa-label=\"jobTitle\" class=\"card__heading dots\">");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Requisition_Lookup__r", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n                <h5 data-qa-label=\"status\" class=\"card__subheading dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.cardStatus", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "statusText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "hasOutcome", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </h5>\n            </div>\n        </div>\n        <div class=\"content\">\n            <div class=\"form__group mar--sm--bn\">\n                <small class=\"block dots\" data-qa-label=\"source\"><label>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.cardSource", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Source__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            </div>\n            <div class=\"form__group mar--sm--bn\">\n                <small class=\"block dots\" data-qa-label=\"employment\" ><label>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.cardEmployment", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "employmentText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            </div>\n            <div class=\"form__group\">\n                <small class=\"block dots\" data-qa-label=\"createdDate\"><label><span class=\"juicon juicon-calendar\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.otherCreated", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || (depth0 && depth0.formatDate)),stack1 ? stack1.call(depth0, "CreatedDate", options) : helperMissing.call(depth0, "formatDate", "CreatedDate", options))));
  data.buffer.push("</small>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_applicationReaderProvideFeedback"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div id=\"feedback-tooltip\" class=\"hide\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top pad--sm--bm\">\n                <button class=\"close\" data-dismiss=\"modal\" type=\"button\"><span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span></button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Provide Feedback</h2>\n            </div>\n            <div class=\"modal__body\">\n                <div class=\"form__group mar--sm--bs\">\n                    <label>Regarding</label>\n                    <div class=\"select__wrap\">\n                        <div class=\"input__icon juicon juicon-down\"></div>\n                        <select id=\"regardingSelect4\">\n                            <option value=\"TF\" selected=\"\">Team Fit</option>\n                            <option value=\"FO\">Final Outcome</option>\n                        </select>\n                    </div>\n                </div>\n                <div id=\"TFcontrols4\">\n                    <div class=\"form__group mar--sm--tm\">\n                        <label class=\"block required-field\">Overall Feedback</label>\n                        <div class=\"button-group feedbackButtons\">\n                            <button id=\"likeButton4\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Thumbs up\"><span class=\"juicon juicon-like\"></span></button>\n                            <button id=\"dislikeButton4\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Thumbs down\"><span class=\"juicon juicon-dislike\"></span></button>\n                            <button id=\"notsureButton4\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Not sure\"><span class=\"juicon juicon-question-circle\"></span></button>\n                        </div>\n                    </div>\n                    <div class=\"form__group mar--sm--bs\">\n                        <label>Comment</label>\n                        <textarea placeholder=\"Type something here\"></textarea>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal__footer\"><a href=\"#\" class=\"float--right button button--primary\" data-dismiss=\"modal\">Save</a><a href=\"#\" class=\"float--right button button--secondary mar--sm--rs\" data-dismiss=\"modal\">Cancel</a></div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["_applicationView"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                        &nbsp;<small data-qa-label=\"outcome\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":label outcomeColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Outcome__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                        &nbsp;<a href=\"#\" class=\"js-status-button js-tooltip\">Update</a></h5>\n                    ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                            <span ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("application.ratingColor")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.score", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.showMax", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(out of ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Maximum_Score__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"text-faded\"> N/A</span>\n                        ");
  }

function program10(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-question-circle\" data-toggle=\"tooltip\" title=\"Neutral Interview Feedback\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "neutralFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Neutral</small>\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Mobile_Phone__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <span data-qa-label=\"noPhone\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                            ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isSF1", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <span data-qa-label=\"location\"> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.City__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.State_Province__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                            ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <a data-qa-link=\"address\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadGoogleMaps", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.City__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.State_Province__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                            ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.cardNoAddress", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "applicationReaderModalApplicant", options) : helperMissing.call(depth0, "partial", "applicationReaderModalApplicant", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"panel js-profile-panel mar--sm--tn\">\n    <div class=\"panel__top\">\n        <div class=\"float--left\">\n            <div class=\"part__body--fixed pad--sm--txs\">\n                <h4 class=\"card__heading dots\"><a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("application.Id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.First_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Last_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h4>\n                <h5 class=\"card__subheading dots\" style=\"display: inline-block\">Status: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "statusText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasOutcome", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n        </div>\n        <button type=\"button\" class=\"button button--primary button--ghost mar--sm--only--ts width--full--sm--only js-feedback-button js-tooltip float--right-left\">\n            <span class=\"juicon juicon-chat\"></span> Provide feedback\n        </button>\n    </div>\n    <!-- Identity section only appears in sf1 -->\n    <section>\n        <div class=\"panel__body pad--sm--bs\">\n            <div class=\"row\">\n                <div class=\"column--md--6\">\n                    <small class=\"block dots mar--sm--bxs\"><label>Source:</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Source__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small class=\"block dots mar--sm--bxs\"><label>Applied On:</label> Dec 10, 2015 @ 11:23 AM (<a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openApplicationModal", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" >");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "otherAppsLength", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" more</a>)</small>\n                    <small class=\"block dots mar--sm--bxs\"><label>Employment:</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "employmentText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                </div>\n                <div class=\"column--md--2\">\n                    <small class=\"block dots mar--sm--bxs\">\n                        <label>\n                            <span class=\"juicon juicon-list\" data-toggle=\"tooltip\" title=\"Application Rating\"></span>\n                        </label> \n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.hasScore", {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-like\" data-toggle=\"tooltip\" title=\"Positive Interview Feedback\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "positiveFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Positive</small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-dislike\" data-toggle=\"tooltip\" title=\"Negative Interview Feedback\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "negativeFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Negative</small>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "allowNeutral", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n                <div class=\"column--md--4\">\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-envelope\" data-toggle=\"tooltip\" title=\"Email\"></span></label> <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("mailto:application.Email__c")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Email__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-phone\" data-toggle=\"tooltip\" title=\"Phone\"></span></label> \n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.Mobile_Phone__c", {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</small>\n                    <small class=\"block dots mar--sm--bxs\">\n                        <label>\n                            <span class=\"juicon juicon-location\" data-toggle=\"tooltip\" title=\"Location\">\n                        </label>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasAddress", {hash:{},inverse:self.program(21, program21, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </small>\n                </div>\n            </div>\n        </div>\n    </section>\n    <section class=\"button-switch-container pad--sm--m pad--sm--bn\">\n        <span class=\"button-group--collapse button-switch\">\n            <div class=\"button button--success\" data-trigger=\"application\" data-group=\"view\">Application</div>\n            <div class=\"button button--success disabled\" data-trigger=\"resume\" data-group=\"view\">Resume</div>\n            <div class=\"button button--success disabled\" data-trigger=\"linkedin\" data-group=\"view\">LinkedIn</div>\n        </span>\n    </section>\n    <div class=\"mar--sm--tm\">\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "applicationDetails", options) : helperMissing.call(depth0, "partial", "applicationDetails", options))));
  data.buffer.push("\n    </div>\n    <div class=\"hide\">\n        <section id=\"resume1\">\n            <div class=\"panel__body pad--sm--bs\">\n                <iframe src=\"https://na24.salesforce.com/sfc/p/1a000000H6T7/a/1a000000KzDp/m5PDZy3HBGd2uEe2Vyyf5FQHQFj7Sy_4STJ5M8O5nV8\"></iframe>\n            </div>\n        </section>\n    </div>\n    <div class=\"hide\">\n        <section id=\"linkedin1\">\n            <div class=\"panel__body pad--sm--bs\">\n                <img src=\"../docs/linkedin-csa.png\">\n            </div>\n        </section>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"applicantModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top pad--sm--m\">\n                <button data-qa-button=\"close\" type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span>\n                </button>\n                <h3 data-qa-label=\"applications\" class=\"modal__heading\" id=\"myModalLabel\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.otherApplications", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                <h4 data-qa-label=\"name\" class=\"mar--sm--n\"><span class=\"text-faded \">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></h4>\n            </div>\n            <div class=\"modal__body pad--sm--n\">\n                ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack2 = helpers.each.call(depth0, "otherApps", {hash:{
    'itemController': ("otherApps")
  },inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n            <div class=\"modal__footer pad--sm--m\">\n                <button type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.close", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</button>\n            </div>\n        </div>\n    </div>\n</div><div class=\"panel js-profile-panel mar--sm--tn\">\n    <div class=\"panel__top\">\n        <div class=\"float--left\">\n            <div class=\"part__body--fixed pad--sm--txs\">\n                <h4 class=\"card__heading dots\"><a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("application.Id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.First_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Last_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h4>\n                <h5 class=\"card__subheading dots\" style=\"display: inline-block\">Status: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "statusText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasOutcome", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n        </div>\n        <button type=\"button\" class=\"button button--primary button--ghost mar--sm--only--ts width--full--sm--only js-feedback-button js-tooltip float--right-left\">\n            <span class=\"juicon juicon-chat\"></span> Provide feedback\n        </button>\n    </div>\n    <!-- Identity section only appears in sf1 -->\n    <section>\n        <div class=\"panel__body pad--sm--bs\">\n            <div class=\"row\">\n                <div class=\"column--md--6\">\n                    <small class=\"block dots mar--sm--bxs\"><label>Source:</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Source__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small class=\"block dots mar--sm--bxs\"><label>Applied On:</label> Dec 10, 2015 @ 11:23 AM (<a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openApplicationModal", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" >");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "otherAppsLength", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" more</a>)</small>\n                    <small class=\"block dots mar--sm--bxs\"><label>Employment:</label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "employmentText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                </div>\n                <div class=\"column--md--2\">\n                    <small class=\"block dots mar--sm--bxs\">\n                        <label>\n                            <span class=\"juicon juicon-list\" data-toggle=\"tooltip\" title=\"Application Rating\"></span>\n                        </label> \n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.hasScore", {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-like\" data-toggle=\"tooltip\" title=\"Positive Interview Feedback\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "positiveFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Positive</small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-dislike\" data-toggle=\"tooltip\" title=\"Negative Interview Feedback\"></span></label> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "negativeFeedback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Negative</small>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "allowNeutral", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n                <div class=\"column--md--4\">\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-envelope\" data-toggle=\"tooltip\" title=\"Email\"></span></label> <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("mailto:application.Email__c")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Email__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></small>\n                    <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-phone\" data-toggle=\"tooltip\" title=\"Phone\"></span></label> \n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "application.Mobile_Phone__c", {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</small>\n                    <small class=\"block dots mar--sm--bxs\">\n                        <label>\n                            <span class=\"juicon juicon-location\" data-toggle=\"tooltip\" title=\"Location\">\n                        </label>\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasAddress", {hash:{},inverse:self.program(21, program21, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </small>\n                </div>\n            </div>\n        </div>\n    </section>\n    <section class=\"button-switch-container pad--sm--m pad--sm--bn\">\n        <span class=\"button-group--collapse button-switch\">\n            <div class=\"button button--success\" data-trigger=\"application\" data-group=\"view\">Application</div>\n            <div class=\"button button--success disabled\" data-trigger=\"resume\" data-group=\"view\">Resume</div>\n            <div class=\"button button--success disabled\" data-trigger=\"linkedin\" data-group=\"view\">LinkedIn</div>\n        </span>\n    </section>\n    <div class=\"mar--sm--tm\">\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "applicationDetails", options) : helperMissing.call(depth0, "partial", "applicationDetails", options))));
  data.buffer.push("\n    </div>\n    <div class=\"hide\">\n        <section id=\"resume1\">\n            <div class=\"panel__body pad--sm--bs\">\n                <iframe src=\"https://na24.salesforce.com/sfc/p/1a000000H6T7/a/1a000000KzDp/m5PDZy3HBGd2uEe2Vyyf5FQHQFj7Sy_4STJ5M8O5nV8\"></iframe>\n            </div>\n        </section>\n    </div>\n    <div class=\"hide\">\n        <section id=\"linkedin1\">\n            <div class=\"panel__body pad--sm--bs\">\n                <img src=\"../docs/linkedin-csa.png\">\n            </div>\n        </section>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"applicantModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top pad--sm--m\">\n                <button data-qa-button=\"close\" type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span>\n                </button>\n                <h3 data-qa-label=\"applications\" class=\"modal__heading\" id=\"myModalLabel\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.otherApplications", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                <h4 data-qa-label=\"name\" class=\"mar--sm--n\"><span class=\"text-faded \">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></h4>\n            </div>\n            <div class=\"modal__body pad--sm--n\">\n                ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack2 = helpers.each.call(depth0, "otherApps", {hash:{
    'itemController': ("otherApps")
  },inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n            <div class=\"modal__footer pad--sm--m\">\n                <button type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.close", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_childrenObjects"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"projects\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"projects\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.projects", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "projects.records", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"projectName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                    <small data-qa-label=\"projectDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayDate || (depth0 && depth0.displayDate)),stack1 ? stack1.call(depth0, "Start_Date__c", "End_Date__c", "to", options) : helperMissing.call(depth0, "displayDate", "Start_Date__c", "End_Date__c", "to", options))));
  data.buffer.push("</small>\n                    <p data-qa-label=\"projectDescription\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"recognition\">\n        <div class=\"list-heading\">\n            <h4 data-qa-recognition=\"recognition\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.recognition", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "recognition.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"recognitionName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.link", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </h3>\n                    <small data-qa-label=\"recognitionIssuer\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Issuer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small data-qa-label=\"recognitionDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYear || (depth0 && depth0.displayMonthYear)),stack1 ? stack1.call(depth0, "Month__c", "Year__c", options) : helperMissing.call(depth0, "displayMonthYear", "Month__c", "Year__c", options))));
  data.buffer.push("</small>\n                    <p data-qa-label=\"recognitionDescription\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <a data-qa-link=\"recognitionNameWithLink\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"traning\">\n        <div class=\"list-heading\">\n            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.trainingAndDevelopment", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "ta.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"trainingName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.link", {hash:{},inverse:self.program(8, program8, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </h3>\n                    <small data-qa-label=\"trainingSource\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Source__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small data-qa-label=\"trainingDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || (depth0 && depth0.formatDate)),stack1 ? stack1.call(depth0, "Date__c", options) : helperMissing.call(depth0, "formatDate", "Date__c", options))));
  data.buffer.push("</small>\n                    <p data-qa-label=\"trainingDescription\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <a data-qa-link=\"trainingNameWithLink\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"otherSkills\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"skills\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.skills", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "sa.records", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <span data-qa-label=\"skillNames\" class=\"label label--secondary inline-block mar--sm--bxs\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Skill__r", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </span>\n            ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"publications\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"publications\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.publications", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "publications.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"publicationName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.link", {hash:{},inverse:self.program(8, program8, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </h3>\n                    <small data-qa-label=\"publicationDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formateDateWithPartition || (depth0 && depth0.formateDateWithPartition)),stack1 ? stack1.call(depth0, "Date__c", "Publisher__c", "●", options) : helperMissing.call(depth0, "formateDateWithPartition", "Date__c", "Publisher__c", "●", options))));
  data.buffer.push("</small>\n                    <p data-qa-label=\"publicationDescription\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <a data-qa-link=\"publicationNameWithLink\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"patents\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"patents\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.patents", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "patents.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"patentName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.link", {hash:{},inverse:self.program(8, program8, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </h3>\n                    <small data-qa-label=\"patentNumberAndOffice\" class=\"text-faded block\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.number", {hash:{},inverse:self.program(29, program29, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <small data-qa-label=\"patentDateAndStatus\" class=\"text-faded\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.date", {hash:{},inverse:self.program(34, program34, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <p data-qa-label=\"patentSummary\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Summary__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Summary__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <a data-qa-link=\"patentNameWithLink\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                        ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model.Office__c", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || (depth0 && depth0.formatDate)),stack1 ? stack1.call(depth0, "Date__c", options) : helperMissing.call(depth0, "formatDate", "Date__c", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "Status__c", {hash:{},inverse:self.noop,fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program32(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"recommendations\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"recommendations\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.recommendations", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "recs.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program37(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <div class=\"card mar--sm--tn\">\n                        <div class=\"card__body\">\n                            <p data-qa-label=\"recommendationText\" class=\"mar--sm--n\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.recommendationText", {hash:{},inverse:self.noop,fn:self.program(38, program38, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </p>\n                            <div data-qa-label=\"recommendationTitle\" class=\"text-right\">\n                                <p data-qa-label=\"recommendationName\" class=\"mar--sm--bn\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </p>\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Recommender_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </div>\n                        </div>\n                    </div>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program38(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                    \"");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Recommendation_Text__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Recommendation_Text__c", options))));
  data.buffer.push("\"\n                                ");
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"certifications\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"certifications\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.certifications", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"test panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "certs.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"certificationName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                    <small data-qa-label=\"certificationIssuer\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Issuer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.issuer", {hash:{},inverse:self.program(45, program45, data),fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <small data-qa-label=\"certificationDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYearRange || (depth0 && depth0.displayMonthYearRange)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYearRange", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Number__c", {hash:{},inverse:self.noop,fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program43(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program47(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"employment\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"employment\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.employment", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "empHists.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(48, program48, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program48(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"employmentTitle\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Job_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                    <small data-qa-label=\"employmentName\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small data-qa-label=\"employmentDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYearRange || (depth0 && depth0.displayMonthYearRange)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYearRange", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "camelizedModel.description", {hash:{},inverse:self.noop,fn:self.program(49, program49, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "fieldSet", {hash:{},inverse:self.noop,fn:self.program(51, program51, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program49(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                        <p data-qa-label=\"employmentDate\" class=\"mar--sm--bn\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("</p>\n                    ");
  return buffer;
  }

function program51(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                        <div class=\"panel__body pad--sm--n\">\n                            <div class=\"row pad--sm--rxxl\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "fieldSet", {hash:{},inverse:self.noop,fn:self.program(52, program52, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </div>\n                        </div>\n                    ");
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                    <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--tm mar--md--tm\">\n                                        <label class=\"block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "value", {hash:{},inverse:self.program(55, program55, data),fn:self.program(53, program53, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </div>\n                                ");
  return buffer;
  }
function program53(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                                            ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program55(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            <div data-qa-label=\"notProvided\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                                        ");
  return buffer;
  }

function program57(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"educations\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"education\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.education", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "eduHists.records", {hash:{},inverse:self.noop,fn:self.program(58, program58, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program58(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"educationName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                    <small data-qa-label=\"educationLevel\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Education_Level__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small data-qa-label=\"educationDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYearRange || (depth0 && depth0.displayMonthYearRange)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYearRange", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                </article>\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "fieldSet", {hash:{},inverse:self.noop,fn:self.program(59, program59, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program59(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"panel__body pad--sm--n\">\n                        <div class=\"row pad--sm--rxxl mar--md--bm\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "fieldSet", {hash:{},inverse:self.noop,fn:self.program(60, program60, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </div>\n                ");
  return buffer;
  }
function program60(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "value", {hash:{},inverse:self.program(63, program63, data),fn:self.program(61, program61, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                            ");
  return buffer;
  }
function program61(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                                        ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    ");
  return buffer;
  }

function program63(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                        <div data-qa-label=\"notProvided\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                                    ");
  return buffer;
  }

function program65(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"languages\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"languages\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.languages", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            <ul class=\"mar--sm--tn\">\n                ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "languages.records", {hash:{
    'itemController': ("additionalInfo")
  },inverse:self.noop,fn:self.program(66, program66, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n    </section>\n");
  return buffer;
  }
function program66(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <li data-qa-label=\"languageName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "camelizedModel.proficiencyLevel", {hash:{},inverse:self.noop,fn:self.program(67, program67, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n                ");
  return buffer;
  }
function program67(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Proficiency_Level__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program69(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"volunteering\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"volunteering\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.volunteering", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "vw.records", {hash:{},inverse:self.noop,fn:self.program(70, program70, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program70(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 class=\"mar--sm--n\" data-qa-label=\"volunteeringName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                    <small data-qa-label=\"volunteeringRole\" class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Role__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                    <small data-qa-label=\"volunteeringDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYearRange || (depth0 && depth0.displayMonthYearRange)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYearRange", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                    <p data-qa-label=\"volunteeringDescription\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("\n                    </p>\n                </article>\n            ");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Projects__r", "as", "projects", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Recognition__r", "as", "recognition", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Training_Activities__r", "as", "ta", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Skill_Assertions__r", "as", "sa", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Publications__r", "as", "publications", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Patents__r", "as", "patents", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Recommendations__r", "as", "recs", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Certifications__r", "as", "certs", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Employment_Histories__r", "as", "empHists", {hash:{},inverse:self.noop,fn:self.program(47, program47, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Education_Histories__r", "as", "eduHists", {hash:{},inverse:self.noop,fn:self.program(57, program57, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Languages__r", "as", "languages", {hash:{},inverse:self.noop,fn:self.program(65, program65, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "tp.Volunteer_Work__r", "as", "vw", {hash:{},inverse:self.noop,fn:self.program(69, program69, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["_viewApplicantsApplication"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"column--md--9 pad--sm--bm\">\n    <div id=\"candidate1\" class=\"active\">\n        <div class=\"content pad--sm--n\">\n            <!-- Get markup below from Application Reader -->\n            <div class=\"panel js-profile-panel mar--sm--tn\">\n                <div class=\"panel__top\">\n                    <div class=\"float--left\">\n                        <!--<div class=\"part__left--fixed avatar-container--md pad--sm--txs\">\n                            <img src=\"https://randomuser.me/api/portraits/med/women/69.jpg\" alt=\"\"/>\n                        </div>-->\n                        <div class=\"part__body--fixed pad--sm--txs\">\n                            <h4 class=\"card__heading dots\"><a href=\"#\">Lynn Shaw</a></h4>\n                            <h5 class=\"card__subheading dots\" style=\"display: inline-block\">Status: Application (In progress)&nbsp;<a href=\"#\" class=\"js-status-button js-tooltip\">Update</a></h5>\n                        </div>\n                    </div>\n                    <button type=\"button\" class=\"button button--primary button--ghost mar--sm--only--ts width--full--sm--only js-feedback-button js-tooltip float--right-left\">\n                        <span class=\"juicon juicon-chat\"></span> Provide feedback\n                    </button>\n                </div>\n                <!-- Identity section only appears in sf1 -->\n                <section id=\"identity1\" class=\"part\">\n                    <div class=\"panel__body pad--sm--bs\">\n                        <div class=\"row\">\n                            <div class=\"column--md--6\">\n                                <small class=\"block dots mar--sm--bxs\"><label>Source:</label> Internal</small>\n                                <small class=\"block dots mar--sm--bxs\"><label>Applied On:</label> Dec 10, 2015 @ 11:23 AM (<a href=\"#\">2 more</a>)</small>\n                                <small class=\"block dots mar--sm--bxs\"><label>Employment:</label> Developer at Appiphony, LLC</small>\n                            </div>\n                            <div class=\"column--md--2\">\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-list\" data-toggle=\"tooltip\" title=\"Application Rating\"></span></label> <span class=\"text-success\">10</span> (out of 10)</small>\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-like\" data-toggle=\"tooltip\" title=\"Positive Interview Feedback\"></span></label> 1 Positive</small>\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-dislike\" data-toggle=\"tooltip\" title=\"Negative Interview Feedback\"></span></label> 0 Negative</small>\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-question-circle\" data-toggle=\"tooltip\" title=\"Neutral Interview Feedback\"></span></label> 0 Neutral</small>\n                            </div>\n                            <div class=\"column--md--4\">\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-envelope\" data-toggle=\"tooltip\" title=\"Email\"></span></label> <a href=\"#\">lynn.shaw@gmail.com</a></small>\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-phone\" data-toggle=\"tooltip\" title=\"Phone\"></span></label> Not requested</small>\n                                <small class=\"block dots mar--sm--bxs\"><label><span class=\"juicon juicon-location\" data-toggle=\"tooltip\" title=\"Location\"></label> <a href=\"http://maps.google.com\" target=\"maps\">Chicago, IL</a></small>\n                            </div>\n                        </div>\n                    </div>\n                </section>\n                <section class=\"button-switch-container pad--sm--m pad--sm--bn\">\n                    <span class=\"button-group--collapse button-switch\">\n                        <div class=\"button button--success\" data-trigger=\"application\" data-group=\"view\">Application</div>\n                        <div class=\"button button--success disabled\" data-trigger=\"resume\" data-group=\"view\">Resume</div>\n                        <div class=\"button button--success disabled\" data-trigger=\"linkedin\" data-group=\"view\">LinkedIn</div>\n                    </span>\n                </section>\n                <div class=\"js-application mar--sm--tm\">\n                    <section id=\"summary1\">\n                        <div class=\"list-heading relative\">\n                            <h4 class=\"list-heading__title\">Summary</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <p class=\"mar--sm--tn\">\n                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan sed tellus id lobortis. Vestibulum velit est, accumsan non commodo vitae, auctor eget urna. Maecenas nibh ante, vestibulum ut lectus nec, venenatis fringilla dui. Fusce eget enim sollicitudin risus efficitur faucibus. Aenean laoreet justo sed sodales auctor. Pellentesque tincidunt feugiat quam. Nulla sed condimentum nisi, non convallis velit. Aliquam erat volutpat. Sed ut orci quis elit convallis mollis. In sed porttitor nunc, vitae volutpat sem.\n                            </p>\n                        </div>\n                    </section>\n                    <section id=\"application-form1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Application Form</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <p class=\"mar--sm--tn\"><strong>Rating: <span class=\"text-success\">10</span></strong><span class=\"text-faded\"> (out of 10)</span></p>\n                        </div>\n                        <div class=\"panel__component\">\n                            <label>Job Specific Questions</label>\n                            <!-- Question -->\n                            <article class=\"card mar--sm--tm mar--sm--bxs\">\n                                <div class=\"card__body\">\n                                    <div><small>Which of the following technologies have you used in a production setting?</small></div>\n                                    <div class=\"mar--sm--txs\">HTML; CSS; JavaScript</div>\n                                </div>\n                            </article>\n                            <!-- /Question -->\n                            <!-- Question -->\n                            <article class=\"card mar--sm--tm mar--sm--bxs\">\n                                <div class=\"card__body\">\n                                    <div><small>What is your experience level for Apex?</small></div>\n                                    <div class=\"mar--sm--txs\">Intermediate</div>\n                                </div>\n                            </article>\n                            <!-- /Question -->\n                        </div>\n                        <div class=\"panel__component\">\n                            <label>General Questions</label>\n                            <!-- Question -->\n                            <article class=\"card mar--sm--tm mar--sm--bxs\">\n                                <div class=\"card__body\">\n                                    <div><small>Do you enjoy working in a fast-paced environment?</small></div>\n                                    <div class=\"mar--sm--txs\">Yes, sometimes</div>\n                                </div>\n                            </article>\n                            <!-- /Question -->\n                            <!-- Question -->\n                            <article class=\"card mar--sm--tm mar--sm--bxs\">\n                                <div class=\"card__body\">\n                                    <div><small>Do you require sponsorship?</small></div>\n                                    <div class=\"mar--sm--txs\">No</div>\n                                </div>\n                            </article>\n                            <!-- /Question -->\n                        </div>\n                    </section>\n                    <section id=\"feedback1\">\n                        <div class=\"list-heading relative\">\n                            <h4 class=\"list-heading__title\">Feedback</h4>\n                            <button type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm add-button js-reveal-feedback\">\n                                <span class=\"juicon juicon-chat\"></span> Provide feedback\n                            </button>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n                            <article class=\"mar--sm--bm\">\n                                <!-- Feedback card -->\n                                <div class=\"card mar--sm--tm js-feedback-card\">\n                                    <div class=\"card__body pad--sm--bn\">\n                                        <div class=\"form__group\">\n                                            <label class=\"\">Regarding</label>\n                                            <div class=\"select__wrap\">\n                                                <div class=\"input__icon juicon juicon-down\"></div>\n                                                <select id=\"regardingSelect1\">\n                                                    <option value=\"TF\" selected=\"\">Team Fit</option>\n                                                    <option value=\"FO&quot;&quot;\">Final Outcome</option>\n                                                </select>\n                                            </div>\n                                        </div>\n                                        <div id=\"TFcontrols1\">\n                                            <div class=\"form__group\">\n                                                <label class=\"block required-field\">Feedback</label>\n                                                <div class=\"button-group feedbackButtons\">\n                                                    <button id=\"likeButton1\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Thumbs up\"><span class=\"juicon juicon-like\"></span></button>\n                                                    <button id=\"dislikeButton1\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Thumbs down\"><span class=\"juicon juicon-dislike\"></span></button>\n                                                    <button id=\"notsureButton1\" class=\"button button--secondary feedbackButton\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Not sure\"><span class=\"juicon juicon-question-circle\"></span></button>\n                                                </div>\n                                            </div>\n                                            <div class=\"form__group mar--sm--bs\">\n                                                <label>Comment</label>\n                                                <textarea placeholder=\"Type something here\"></textarea>\n                                            </div>\n                                        </div>  \n                                    </div>\n                                    <div class=\"panel__body\">\n                                        <a href=\"#\" class=\"float--right button button--primary\">Save</a>\n                                        <a href=\"#\" class=\"float--right button button--secondary mar--sm--rs js-cancel-feedback\">Cancel</a>\n                                    </div>\n                                </div>\n                                <!-- /Feedback card --> \n                                <div class=\"card mar--sm--tm\">\n                                    <div class=\"card__body pad--sm--bn\">\n                                        <div class=\"row pad--sm--n\" style=\"height: auto\">\n                                            <div class=\"column--md--8\">\n                                                <div class=\"part__left--fixed inline-block\" style=\"display: inline-block; position: relative; top:-5px;\">\n                                                    <div class=\"juicon juicon-like text-success\"></div>\n                                                </div>\n                                                <div class=\"part__body--fixed pad--md--bm pad--sm--only--bs pad--sm--bn\" style=\"display: inline-block\">\n                                                    <h4 class=\"card__heading dots\">Resume Review</h4>\n                                                </div>\n                                            </div>\n                                            <div class=\"column--md--4 text-right-left mar--sm--only--bm\">\n                                                <small class=\"text-faded mar--sm--only--lxl pad--sm--only--lxs pad--sm--only--lxs mar--sm--only--bm\" style=\"line-height: 16px; position: relative; top:-5px;\">Mitch B. &bull; Jun 1, 2015</small>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"interview1\">\n                        <div class=\"list-heading relative\">\n                            <h4 class=\"list-heading__title\">Interview</h4>\n                            <button type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm add-button\">\n                                <span class=\"juicon juicon-plus\"></span> Add interview\n                            </button>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n                            <article class=\"mar--sm--bm\">\n                                <div class=\"card mar--sm--tm\">\n                                    <div class=\"card__body\">\n                                        <div class=\"mar--sm--bs\"><span class=\"juicon juicon-calendar text-faded mar--sm--rm pad--sm--txs table-cell vertical-align-top\"></span><span class=\"table-cell pad--sm--lm\"><a href=\"#\">Tue, Jun 16, 2015 @ 11:00a CDT</a> <span class=\"text-faded\">(and 2 more)</span> <span class=\"status proposed\">Proposed</span></span></div>\n                                        <div class=\"row pad--sm--lxl\">\n                                            <div class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn pad--sm--only--bs\">\n                                                <h4 class=\"mar--sm--n\">Interviewers</h4>\n                                                Mitch Bennett\n                                            </div>\n                                            <div class=\"panel__body column--md--6 pad--sm--tn pad--sm--bn\">\n                                                <h4 class=\"mar--sm--n\">Topics</h4>\n                                                Perl\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"projects1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Projects</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">TalentObjects 1.0 release</h3>\n                                <small class=\"text-faded\">Oct 2014 to Mar 2015</small>\n                                <p>\n                                    Responsible for the user experience design (UI concepts and task flows) of a recruiting module for a world-class workforce engagement solution.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">ASU Online redesign</h3>\n                                <small class=\"text-faded\">Jul 2008 to Feb 2009</small>\n                                <p>\n                                    Redesigned ASU Online to focus on increasing prospective student enrollments. Implemented ongoing SEO and content strategy plan to continually increase conversions and brand trust.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"recognition1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Recognition</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Force.com MVP 2014 (Renewed)</a></h3>\n                                <small class=\"text-faded block\">Salesforce.com</small>\n                                <small class=\"text-faded\">Jan 1, 2014</small>\n                                <p>\n                                    The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Force.com MVP 2013 (Renewed)</a></h3>\n                                <small class=\"text-faded block\">Salesforce.com</small>\n                                <small class=\"text-faded\">Jan 6, 2013</small>\n                                <p>\n                                    The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"training1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Training and Development</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Managing Product Definition and Design</a></h3>\n                                <small class=\"text-faded block\">Cooper U</small>\n                                <small class=\"text-faded\">Jun 1, 2015</small>\n                                <p>\n                                    Students walk away knowing how to: communicate business and customer goals in clear, actionable, memorable ways; use narrative to craft a compelling product vision; ensure cross-functional teams understand that vision and how to make decisions in service of it; generate product requirements that are grounded in the best user experience.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Cranky Talk Workshop for New Speakers</a></h3>\n                                <small class=\"text-faded block\">Dan Willis et. al.</small>\n                                <small class=\"text-faded\">Aug 22, 2013</small>\n                                <p>\n                                    Cranky Talk is an intense, day-long workshop for people intent on being exceptional public speakers.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"skills1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Skills</h4>\n                        </div>\n                        <div class=\"panel__body\">\n                            <span class=\"label label--secondary\">Salesforce.com</span> <span class=\"label label--secondary\">Force.com</span> <span class=\"label label--secondary\">Peer Training</span> <span class=\"label label--secondary\">Community Stewardship</span>\n                        </div>\n                    </section>\n                    <section id=\"publications1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Publications</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">UX Design on the Salesforce1 Platform</a></h3>\n                                <small class=\"text-faded\">May 14, 2015 ● Peachpit Press</small>\n                                <p>\n                                    A short book on how to design compelling experiences for enterprise apps using the Salesforce1 Platform.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Design Is a Job</a></h3>\n                                <small class=\"text-faded\">April 10, 2012 ● A Book Apart</small>\n                                <p>\n                                    Ross Belmont wants to help you do your job better. From contracts to selling design, from working with clients to working with each other, you’ll learn why navigating the business of design is just as important as the craft of it. Cultivated from his own experience, Ross packs this brief book with knowledge you can’t afford not to know.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"patents1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Patents</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\"><a href=\"#\">Security device for computers</a></h3>\n                                <small class=\"text-faded block\">US5016758 A (USPTO)</small>\n                                <small class=\"text-faded\">Feb 7, 2011 (Granted)</small>\n                                <p>\n                                    A security device for computing devices wherein a strong flexible cable is fastened at one end to a lock, carried on a hanger, or to a bar on a clothing stand, which cable passes through part of the housing and the other end of the cable is detachably secured in the lock to releasably secure the machine.\n                                </p>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"recommendations1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Recommendations</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <div class=\"card\">\n                                    <div class=\"card__body\">\n                                        <p class=\"mar--sm--n\">\n                                            “Ross is a talented UX designer, writer, speaker and workshop facilitator. He is also an authentic, generous and thoughtful human being who gives himself fully to the things he is passionate about. As a speaker and writer, his ideas are insightful and his prose is clean, clear and engaging. As a workshop facilitator I’ve never seen anyone better.”\n                                        </p>\n                                        <div class=\"text-right\">\n                                            <a href=\"#\" class=\"block\">\n                                                Dave Gray\n                                            </a>\n                                            Co-founder at Boardthing.com\n                                        </div>\n                                    </div>\n                                </div>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <div class=\"card\">\n                                    <div class=\"card__body\">\n                                        <p class=\"mar--sm--n\">\n                                            “Ross is a highly talented and thoughtful User Experience Designer. He’s able to easily tackle complex information architecture problems, creating user experiences that are intuitive, fun and creative. His humor and collaborative attitude make him a pleasure to work with. I’d be happy to work with him again, given the opportunity.”\n                                        </p>\n                                        <div class=\"text-right\">\n                                            <a href=\"#\" class=\"block\">\n                                                John Devoy\n                                            </a>\n                                            Assistant Vice Provost Digital Marketing Strategy @ ASU Online\n                                        </div>\n                                    </div>\n                                </div>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"certifications1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Certifications</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">Force.com Developer</h3>\n                                <small class=\"text-faded block\">Salesforce.com (DEV 401)</small>\n                                <small class=\"text-faded\">July 2009 to Present</small>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"employment1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Employment</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">Chief Experience Designer</h3>\n                                <small class=\"text-faded block\">Appiphony, LLC</small>\n                                <small class=\"text-faded\">May 2010 to Present</small>\n                                <p>\n                                    I am extremely proud to have formalized a design-driven development practice for our ISV clients. My goal in doing so is to bring the best design thinking anywhere to software on the Force.com platform. Appiphony’s leadership and developers understand the benefits good design can bring, and we are doing the best work in our market.\n                                </p>\n                                <div class=\"panel__body pad--sm--n\">\n                                    <div class=\"row pad--sm--rxxl\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm mar--md--bm\">\n                                            <label class=\"block\">Reference Name</label>\n                                            John Doe\n                                        </div> \n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm mar--md--bm\">\n                                            <label class=\"block\">Reference Company</label>\n                                            IBM\n                                        </div>\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm mar--md--bm\">\n                                            <label class=\"block\">Reference Phone Number</label>\n                                            847-555-5555\n                                        </div>\n                                    </div>\n                                </div>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">Architect</h3>\n                                <small class=\"text-faded block\">EDL Consulting</small>\n                                <small class=\"text-faded\">July 2009 - May 2010</small>\n                                <p>\n                                    EDL Consulting is a national technology services firm specializing in the intelligent integration of eCommerce, CRM and business intelligence solutions to improve business performance. EDL solves the complex systems integration issues behind state-of-the-art technology solutions to make organizations more successful. The solutions EDL builds generate revenue, result in cost savings, promote differentiation and make it easier for clients to do business with their customers.\n                                </p>\n                                <div class=\"panel__body pad--sm--n\">\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Reference Name</label>\n                                            None Provided\n                                        </div> \n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Reference Company</label>\n                                            None Provided\n                                        </div>\n                                    </div>\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Reference Phone Number</label>\n                                            None Provided\n                                        </div>\n                                    </div>\n                                </div>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"education1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Education</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bn\">\n                                <div class=\"mar--sm--bm\">\n                                    <h3 class=\"mar--sm--n\">University of Illinois at Urbana-Champaign</h3>\n                                    <small class=\"text-faded block\">BS, MIS</small>\n                                    <small class=\"text-faded\">1996-2000</small>\n                                </div>\n                                <div class=\"panel__body pad--sm--n mar--sm--bn\">\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">GPA</label>\n                                            3.2\n                                        </div> \n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Honors &amp; Awards</label>\n                                            National Scholar Award\n                                        </div>\n                                    </div>\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Societies</label>\n                                            National Society of Collegiate Scholars (NSCS)\n                                        </div>\n                                    </div>\n                                </div>\n                                <hr class=\"hr-alt mar--sm--tn\"/>\n                            </article>\n                            <article class=\"mar--sm--bn\">\n                                <div class=\"mar--sm--bm\">\n                                    <h3 class=\"mar--sm--n\">University of Illinois at Urbana-Champaign</h3>\n                                    <small class=\"text-faded block\">BS, MIS</small>\n                                    <small class=\"text-faded\">1996-2000</small>\n                                </div>\n                                <div class=\"panel__body pad--sm--n mar--sm--bn\">\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">GPA</label>\n                                            None Provided\n                                        </div> \n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Honors &amp; Awards</label>\n                                            None Provided\n                                        </div>\n                                    </div>\n                                    <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                        <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                            <label class=\"block\">Societies</label>\n                                            None Provided\n                                        </div>\n                                    </div>\n                                </div>\n                                <hr class=\"hr-alt mar--sm--tn\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"languages1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Languages</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <ul class=\"mar--sm--tn pad--sm--lm\">\n                                <li>English (Native or bilingual proficiency)</li>\n                                <li>Japanese (Elementary proficiency)</li>\n                                <li>Spanish (Limited working proficiency)</li>\n                            </ul>\n                        </div>\n                    </section>\n                    <section id=\"volunteering1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Volunteering</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <article class=\"mar--sm--bm\">\n                                <h3 class=\"mar--sm--n\">CASA of Kane County</h3>\n                                <small class=\"text-faded\">Board Member</small>\n                                <p>\n                                    CASA Kane County recruits, trains and supervises community volunteers who serve as Court Appointed Special Advocates (CASAs) for children in court due to abuse, neglect or private guardianship.\n                                </p>\n                                <hr class=\"hr-alt\"/>\n                            </article>\n                        </div>\n                    </section>\n                    <section id=\"contact-information1\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Contact Information</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">First Name</label>\n                                    Freddie\n                                </div> \n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Last Name</label>\n                                    George\n                                </div>\n                            </div>\n                            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Email</label>\n                                    <a href=\"mailto:freddie.george@gmail.com\">freddie.george@gmail.com</a>\n                                </div> \n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Mobile Phone</label>\n                                    847-555-5555\n                                </div>\n                            </div>\n                            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Street Address</label>\n                                    318 West Adams St.\n                                </div> \n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">City</label>\n                                    Chicago\n                                </div>\n                            </div>\n                            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">State/Province</label>\n                                    IL\n                                </div> \n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Zip/Postal Code</label>\n                                    60606\n                                </div>\n                            </div>\n                            <div class=\"row pad--sm--rxxl mar--md--bm\">\n                                <div class=\"column--sm--6 column--xs--only--12 pad--sm--only--bm\">\n                                    <label class=\"block\">Country</label>\n                                    United States\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n                <div class=\"js-resume hide\">\n                    <section id=\"resume1\">\n                        <div class=\"panel__body pad--sm--bs\">\n                            <iframe src=\"https://na24.salesforce.com/sfc/p/1a000000H6T7/a/1a000000KzDp/m5PDZy3HBGd2uEe2Vyyf5FQHQFj7Sy_4STJ5M8O5nV8\"></iframe>\n                        </div>\n                    </section>\n                </div>\n                <div class=\"js-linkedin hide\">\n                    <section id=\"linkedin1\">\n                        <div class=\"panel__body pad--sm--bs\">\n                            <img src=\"../docs/linkedin-csa.png\">\n                        </div>\n                    </section>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["_viewApplicantsFilledTooltip"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"modal__top pad--sm--bm\">\n    <button class=\"close\" data-dismiss=\"modal\" type=\"button\"><span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span></button>\n    <h2 class=\"modal__heading\" id=\"myModalLabel\">Positions Filled</h2>\n</div>\n<div class=\"modal__body\">\n    <table>\n        <thead>\n            <tr>\n                <th><label>Applicant</label></th>\n                <th><label>Offer Accepted</label></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>John Smith</td>\n                <td>Jul 22, 2015</td>\n            </tr>\n            <tr>\n                <td>Jane Doe</td>\n                <td>Aug 10, 2015</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n<div class=\"modal__footer\">\n    <button class=\"button button--primary js-save\" data-dismiss=\"modal\" type=\"button\">OK</button>\n</div>");
  
});

Ember.TEMPLATES["_viewApplicantsFilterAndResults"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'tagName': depth0,'class': depth0};
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  options = {hash:{
    'tagName': ("li"),
    'class': ("list-group__item applicant-entry alertStatusClass")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "viewApplicantsApplicationReader", "application.Id", options) : helperMissing.call(depth0, "link-to", "viewApplicantsApplicationReader", "application.Id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <a href=\"#candidate1\" class=\"pad--sm--m\">\n                            <h4 class=\"card__heading dots\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.First_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.Last_Name__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                            <h5 class=\"card__subheading dots\">Rating: <span class=\"text-success\">10</span> (out of 10)</h5>\n                        </a>\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"column--md--3\">\n    <div class=\"card\">\n        \n        <!-- Filters and Results -->\n        <section class=\"pad--sm--m pad--sm--bl\">\n            ");
  hashContexts = {'ctrl': depth0,'filters': depth0,'filterOptions': depth0,'applicationStageAndStatuses': depth0,'applicationSources': depth0,'locations': depth0};
  hashTypes = {'ctrl': "ID",'filters': "ID",'filterOptions': "ID",'applicationStageAndStatuses': "ID",'applicationSources': "ID",'locations': "ID"};
  options = {hash:{
    'ctrl': ("controller"),
    'filters': ("filters"),
    'filterOptions': ("filterOptions"),
    'applicationStageAndStatuses': ("applicationStageAndStatuses"),
    'applicationSources': ("applicationSources"),
    'locations': ("locations")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['search-filter'] || (depth0 && depth0['search-filter'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "search-filter", options))));
  data.buffer.push("\n            <h3 class=\"mar--sm--n\">Sort</h3>\n            <div class=\"form-group\">\n                <div class=\"select__wrap\">\n                    <div class=\"input__icon juicon juicon-down\"></div>\n                    ");
  hashContexts = {'class': depth0,'content': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'value': depth0};
  hashTypes = {'class': "STRING",'content': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'class': ("pad--sm--rxl small"),
    'content': ("sortOptions"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'value': ("sortType")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </div>\n            </div>\n        </section>\n        <!-- /Filters and Results -->\n        \n        <section class=\"pad--sm--m border-top bg-2\">\n            <h3 class=\"mar--sm--n\">Results: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "results.numberViewable", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<span class=\"text-faded\">/");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "results.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></h3>\n            <div class=\"mar--sm--bm\">\n                <a href=\"#\" data-toggle=\"modal\" data-target=\"#reject-modal\"><small>Reject</small></a> | <a href=\"#\" data-toggle=\"modal\" data-target=\"#status-modal\"><small>Update Status</small></a> | <a href=\"#\" data-toggle=\"modal\" data-target=\"#share-modal\" id=\"share-modal-trigger\"><small>Share</small></a>\n            </div>\n            <ul id=\"contentNav\" class=\"list-group list-group--bordered mar--sm--bn bg-1 applicant-list-group\">\n                ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack2 = helpers.each.call(depth0, "application", "in", "results.viewableApplications", {hash:{
    'itemController': ("result")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </ul>\n            <div class=\"text-center mar--sm--tm\">\n                <a href=\"#\" class=\"button button--secondary button--full js-load-more\"><small>Load More</small></a>\n            </div>\n        </section>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_viewApplicantsHeader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"content pad--md--tm pad--md--bn pad--sm--only--n pad--sm--tm\">\n    <nav id=\"formBuildNav\" class=\"nav-bar--sf1 mar--sm--bn review-header\">\n        <div class=\"mar--sm--txl\">\n            <span class=\"button-group--collapse mar--sm--only--bm float--right-left\">\n                <div class=\"button button--secondary text-center js-prev\"><span class=\"show-brkpoint--md\"><span class=\"juicon juicon-chevron-left\">&nbsp;</span></span>Prev</div>\n                <div class=\"button button--secondary text-center js-next\">Next<span class=\"show-brkpoint--md\">&nbsp;<span class=\"juicon juicon-chevron-right\"></span></span></div>\n            </span>\n            <div class=\"review-stats-container\">\n                <div class=\"review-stats text-center\">\n                    <ul class=\"review-row\">\n                        <li class=\"js-stage-status-button js-tooltipster-button cursor-pointer\">\n                            <label class=\"block\"><small>Total</small></label>\n                            <span class=\"large-number\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "totalApplicants.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span><span class=\"juicon juicon-chart-bar text-faded\"></span>\n                        </li>\n                        <li class=\"js-filled-button js-tooltipster-button cursor-pointer\">\n                            <label class=\"block\"><small>Filled</small></label>\n                            <span class=\"large-number\">2<span class=\"text-faded\">/5</span></span><span class=\"juicon juicon-list text-faded\"></span>\n                        </li>\n                        <li>\n                            <label class=\"block\"><small>Open Since</small></label>\n                            <div class=\"cal-container\">\n                                <div class=\"top\">\n                                    <p>Jul</p>\n                                </div>\n                                <div class=\"bottom\">\n                                    <p>22</p>\n                                </div>\n                            </div>\n                            <label>(18 days)</label>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <h1 class=\"nav-bar--sf1__title has-subheading page__heading show-brkpoint--sm\">Applicants</h1>\n            <h2 class=\"nav-bar--sf1__subtitle page__subheading\"><a href=\"#\">Inside Sales Rep</a></h2>\n        </div>\n    </nav>\n    <hr class=\"show-brkpoint--md\"/>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["applicationReader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <h3 class=\"nav-bar--sf1__subtitle page__subheading\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Job_Posting_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n            ");
  return buffer;
  }

  data.buffer.push("<div id=\"mobileMainView\" class=\"scope-container\">\n    <nav class=\"nav-bar--sf1 ar-container pad--sm--rn pad--sm--ln mar--sm--bn content\">\n        <div class=\"content ar-container pad--md--tm pad--sm--rn pad--sm--ln\">\n            <h2 class=\"nav-bar--sf1__title page__heading has-subheading has-subtitle\">Application</h2>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "application.Requisition_Lookup__r", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <hr class=\"show-brkpoint--md mar--sm--bn\"/>\n    </nav>\n    <div class=\"content ar-container mar--sm--tm mar--sm--bm pad--sm--n\">\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "applicationView", options) : helperMissing.call(depth0, "partial", "applicationView", options))));
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterApplicationRating"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div>\n    <div class=\"row\">\n        <div class=\"column column--md--8\">\n            <label>Is</label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'value': depth0};
  hashTypes = {'content': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("comparisons"),
    'optionLabelPath': ("content.label"),
    'optionValuePath': ("content.value"),
    'value': ("ratingDirection")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n        <div class=\"column column--md--4 pad--sm--tl\">\n            <div class=\"input__wrap\">\n                ");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("number"),
    'value': ("rating")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                <small class=\"text-faded\">Max: 10</small>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterAppliedOn"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n    <div class=\"row\">\n        <div class=\"column column--md--6\">\n            <label>From</label>\n            ");
  hashContexts = {'value': depth0,'name': depth0,'valueFormat': depth0};
  hashTypes = {'value': "ID",'name': "STRING",'valueFormat': "STRING"};
  options = {hash:{
    'value': ("appliedFrom"),
    'name': ("appliedFrom"),
    'valueFormat': ("MM/DD/YYYY")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['date-picker'] || (depth0 && depth0['date-picker'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "date-picker", options))));
  data.buffer.push("\n        </div>\n        <div class=\"column column--md--6\">\n            <label>To</label>\n            ");
  hashContexts = {'value': depth0,'name': depth0,'valueFormat': depth0};
  hashTypes = {'value': "ID",'name': "STRING",'valueFormat': "STRING"};
  options = {hash:{
    'value': ("appliedTo"),
    'name': ("appliedTo"),
    'valueFormat': ("MM/DD/YYYY")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['date-picker'] || (depth0 && depth0['date-picker'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "date-picker", options))));
  data.buffer.push("\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterInterviewFeedback"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\n    <div class=\"row\">\n        <div class=\"column column--md--8\">\n            <label>Is</label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                <select>\n                    <option value=\"option1\">Greater Than</option>\n                    <option value=\"option2\">Less Than</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"column column--md--4 pad--sm--tl\">\n            <div class=\"input__wrap\">\n                <input type=\"number\"/>\n            </div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["components/_searchFilterLocation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n    <div class=\"row\">\n        <div class=\"column column--md--8\">\n            <label>Less Than<!-- <span data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" class=\"has-tooltip juicon juicon-info-circle\" data-original-title=\"Distance from the applicant's address to the primary location\"></span>--></label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("availableRadii"),
    'value': ("radius")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n        <div class=\"column column--md--4 pad--sm--tl\">\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("availableUnits"),
    'value': ("units")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n        <div class=\"column column--md--12 mar--sm--tm\">\n            <label>From</label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'value': depth0};
  hashTypes = {'content': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("locations"),
    'optionLabelPath': ("content.name"),
    'optionValuePath': ("content.geolocation"),
    'value': ("location")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterOutcome"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n    <div class=\"row input__group\">\n        <div class=\"column column--md--6 mar--sm--tm\">\n            ");
  hashContexts = {'type': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("showHired")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<label>Hired</label>\n        </div>\n        <div class=\"column column--md--6 mar--sm--tm\">\n            ");
  hashContexts = {'type': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("showWithdrew")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<label>Withdrew</label>\n        </div>\n        <div class=\"column column--md--6 mar--sm--tm\">\n            ");
  hashContexts = {'type': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("showRejected")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<label>Rejected</label>\n        </div>\n        <div class=\"column column--md--6 mar--sm--tm\">\n            ");
  hashContexts = {'type': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("noOutcome")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<label>No Outcome</label>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterSource"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n    <label>Equals</label>\n    <div class=\"select__wrap\">\n        <div class=\"input__icon juicon juicon-down\"></div>\n        ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("applicationSources"),
    'value': ("source")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterStageAndStatus"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n    <div class=\"mar--sm--bm\">\n        <div class=\"form-group\">\n            <label>Stage</label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("applicationStages"),
    'value': ("stage")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n    </div>\n    <div class=\"mar--sm--bn\">\n        <div class=\"form-group\">\n            <label>Status</label>\n            <div class=\"select__wrap\">\n                <div class=\"input__icon juicon juicon-down\"></div>\n                ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("applicationStatuses"),
    'value': ("status")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/_searchFilterThreshold"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"js-field-group\">\n    <label>Equals</label>\n    <div class=\"select__wrap\">\n        <div class=\"input__icon juicon juicon-down\"></div>\n        ");
  hashContexts = {'content': depth0,'value': depth0};
  hashTypes = {'content': "ID",'value': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("thresholds"),
    'value': ("threshold")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/datepicker"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"row input__group\" data-qa-container=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n    <div class=\"column--md--8\">\n        ");
  hashContexts = {'type': depth0,'value': depth0,'readonly': depth0,'data-qa-input': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'readonly': "BOOLEAN",'data-qa-input': "ID"};
  options = {hash:{
    'type': ("text"),
    'value': ("value"),
    'readonly': (true),
    'data-qa-input': ("name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    <div class=\"column--md--4\">\n        <button style=\"border-left: none;\" type=\"button\" class=\"button button--secondary datepicker\" data-date-format=\"\" data-date=\"\" data-qa-button=\"datepicker\">\n            <span class=\"juicon juicon-calendar\"></span>\n        </button>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/searchFilter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li><a href=\"#\" class=\"juicon juicon-x text-error part__left vam pad--sm--rs\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickRemoveFilter", "filter", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("></a><span class=\"part__body\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "filter.text", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></li>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"clearfix\">\n    <h3 class=\"mar--sm--n float--left\">Filters</h3>\n    <small class=\"float--right pad--sm--txs\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#filter-modal\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickAdd", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Add</a></small>\n</div>\n<ul class=\"filters mar--sm--tn\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "filter", "in", "filters", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n<div class=\"modal fade\" id=\"filter-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                </button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Add Condition</h2>\n            </div>\n            <div class=\"modal__body\">\n                <div class=\"form__group\">\n                    <label for=\"filterStage\">Field</label>\n                    <div class=\"select__wrap\">\n                        <div class=\"input__icon juicon juicon-down\"></div>\n                        ");
  hashContexts = {'content': depth0,'value': depth0,'prompt': depth0};
  hashTypes = {'content': "ID",'value': "ID",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
    'content': ("filterOptions"),
    'value': ("selectedFilter"),
    'prompt': ("--")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </div>\n                </div>\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "filterPartial", options) : helperMissing.call(depth0, "partial", "filterPartial", options))));
  data.buffer.push("\n            </div>\n            <div class=\"modal__footer\">\n                <button type=\"button\" class=\"button button--secondary\" data-dismiss=\"modal\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickCancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\n                <button type=\"button\" class=\"button button--primary filterOK\" data-dismiss=\"modal\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickOK", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">OK</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/tooltipster"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"filled-tooltip\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/viewApplicantsStageStatusTooltip"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"js-stage\">\n                        <table class=\"mar--sm--ts\">\n                            <thead>\n                                <tr>\n                                    <th><label>Stage</label></th>\n                                    <th><label>Applicants</label></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "stageCount", "in", "data.stageCounts", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </tbody>\n                            <thead>\n                                <tr class=\"bg-2\">\n                                    <th><label>Subtotal</label></th>\n                                    <th><label>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "data.stageSubtotal", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "outcomeCount", "in", "data.outcomeCounts", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </tbody>\n                            <tfoot>\n                                <tr class=\"bg-2\">\n                                    <th><label>Total</label></th>\n                                    <th><label>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "data.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label></th>\n                                </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <tr>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "stageCount.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "stageCount.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                    </tr>\n                                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <tr>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outcomeCount.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outcomeCount.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                    </tr>\n                                ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"js-source\">\n                        <table class=\"mar--sm--ts\">\n                            <thead>\n                                <tr>\n                                    <th><label>Source</label></th>\n                                    <th><label>Applicants</label></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "source", "in", "data.sourceCounts", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </tbody>\n                            <tfoot>\n                                <tr class=\"bg-2\">\n                                    <th><label>Total</label></th>\n                                    <th><label>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "data.sourceTotal", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label></th>\n                                </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                    <tr>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "source.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "source.total", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                                    </tr>\n                                ");
  return buffer;
  }

  data.buffer.push("<div id=\"filled-tooltip\">\n    <div class=\"modal__shell\">\n        <div class=\"modal__content\">\n            <div class=\"modal__top pad--sm--bm\">\n                <button class=\"close\" data-dismiss=\"modal\" type=\"button\"><span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span></button>\n                <h2 class=\"modal__heading\" id=\"myModalLabel\">Total Applicants</h2>\n            </div>\n            <div class=\"modal__body\">\n                <div class=\"clearfix\">\n                    <span class=\"button-group--collapse button-switch\">\n                        <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":button :button--success isStageSelected::disabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" data-trigger=\"stage\" data-group=\"filter\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setIsStageSelected", true, {hash:{},contexts:[depth0,depth0],types:["STRING","BOOLEAN"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">By Stage</div>\n                        <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":button :button--success isStageSelected:disabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" data-trigger=\"source\" data-group=\"filter\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setIsStageSelected", false, {hash:{},contexts:[depth0,depth0],types:["STRING","BOOLEAN"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">By Source</div>\n                    </span>\n                </div>\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isStageSelected", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n            <div class=\"modal__footer\">\n                <button class=\"button button--primary js-save\" data-dismiss=\"modal\" type=\"button\">OK</button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["error"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content pad--md--ts pad--sm--only--n pad--sm--tm\">\n        <div class=\"wizardContent\">\n            <div class=\"alert alert--error mar--md--bm\" data-qa-alert=\"errorMessage\">\n                ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errorMessage", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content pad--md--ts pad--sm--only--n pad--sm--tm\">\n        <div class=\"content__section\">\n            <div class=\"load-block\">\n                <div class=\"load-block-icon\"></div>\n            </div>\n        </div>\n    </div>\n</div>");
  
});

Ember.TEMPLATES["talentProfileView"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <button type=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickEdit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--secondary float--right js-edit-page\">\n                            <span data-qa-button=\"editButton\" class=\"juicon juicon-pencil\"></span>\n                        </button>\n                    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <section id=\"identity\" style=\"display: block;\">\n                    <div class=\"panel__body\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "talentProfile.User__r", {hash:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </section>\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "talentProfile.User__r", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <div class=\"part__left--fixed pad--sm--n\">\n                                    <div data-qa-image=\"userPhoto\" class=\"img-container img-container--lg\"><img src=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "SmallPhotoUrl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n                                    </div>\n                                </div>\n                                <div class=\"part__body width--full pad--sm--lm pad--sm--rm\">\n                                        <h5 data-qa-link=\"userName\" class=\"mar--sm--n relatedPerson\"><a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToUser", "Id", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h5>\n                                        <h5 data-qa-label=\"userTitle\" class=\"text-faded mar--sm--n\">\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        </h5>\n                                </div>\n                            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "talentProfile.Contact__r", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <div class=\"part__body width--full\">\n                                    <h5 data-qa-link=\"userName\" class=\"mar--sm--n relatedPerson\"><span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></h5>\n                                </div>\n                            ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                <section id=\"custom-fields\">\n                    <div class=\"js-section-view\">\n                        <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":panel__body isChatterView::pad--sm--tn")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                            <div class=\"row pad--sm--rxxl\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "field", "in", "tpFields", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            </div>\n                        </div>\n                    </div>\n                </section>\n            ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                    <div class=\"column--sm--6 column--xs--only--12\">\n                                        <label data-qa-lable=\"fieldSetLabel\" class=\"block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.value", {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </div> \n                                ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                                            <div data-qa-label=\"fieldSetValue\" data-qa-label=\"fieldSetValue\">");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.value", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            <div data-qa-label=\"notProvided\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.notProvided", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                                        ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Summary__c", {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth0),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "childrenObjects", options) : helperMissing.call(depth0, "partial", "childrenObjects", options))));
  data.buffer.push("\n            ");
  return buffer;
  }
function program17(depth0,data,depth1) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"summary\">\n                        <div class=\"list-heading\">\n                            <h4 data-qa-label=\"summary\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.summary", {hash:{},contexts:[depth1],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <p data-qa-label=\"summaryValue\" class=\"mar--sm--tn\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Summary__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Summary__c", options))));
  data.buffer.push("\n                            </p>\n                        </div>\n                    </section>\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":content :content--readable :pad--sm--n isSF1::pad--sm--tm")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n        <div class=\"panel mar--sm--bm js-panel\">\n            <div class=\"panel__top\">\n                <div class=\"js-view-buttons\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isChatterView", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n                <h2 data-qa-label=\"talentProfile\" class=\"panel__heading\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.talentProfile", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </h2>\n            </div>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "isChatterView", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "tpFields", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['with'].call(depth0, "talentProfile", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["viewApplicants"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n	    	");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "viewApplicantsFilledTooltip", options) : helperMissing.call(depth0, "partial", "viewApplicantsFilledTooltip", options))));
  data.buffer.push("\n	    ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "viewApplicantsHeader", options) : helperMissing.call(depth0, "partial", "viewApplicantsHeader", options))));
  data.buffer.push("\n    \n    <div class=\"content\">\n        <div class=\"row\">\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "viewApplicantsFilterAndResults", options) : helperMissing.call(depth0, "partial", "viewApplicantsFilterAndResults", options))));
  data.buffer.push("\n            <div class=\"column--md--9 pad--sm--bm\">\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n        </div>\n    </div>\n    <div class=\"hide\">\n	    ");
  hashContexts = {'buttonClass': depth0};
  hashTypes = {'buttonClass': "STRING"};
  options = {hash:{
    'buttonClass': ("js-filled-button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['tool-tipster'] || (depth0 && depth0['tool-tipster'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "tool-tipster", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	    ");
  hashContexts = {'data': depth0,'buttonClass': depth0};
  hashTypes = {'data': "ID",'buttonClass': "STRING"};
  options = {hash:{
    'data': ("totalApplicants"),
    'buttonClass': ("js-stage-status-button")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['applicant-totals'] || (depth0 && depth0['applicant-totals'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "applicant-totals", options))));
  data.buffer.push("\n    </div>\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["viewApplicantsApplicationReader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"content pad--sm--n\">\n	");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "applicationView", options) : helperMissing.call(depth0, "partial", "applicationView", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
});