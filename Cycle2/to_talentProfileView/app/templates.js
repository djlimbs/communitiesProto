Ember.TEMPLATES["talentProfileView"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <button type=\"button\" class=\"button button--primary float--right mar--sm--ls\">\n                            <span class=\"juicon juicon-download\"></span>\n                            Import from LinkedIn\n                        </button>\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <section id=\"identity\" style=\"display: block;\">\n                    <div class=\"panel__body\">\n                        <div class=\"part__left--fixed pad--sm--n\">\n                            <div class=\"img-container img-container--lg\"><img src=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "SmallPhotoUrl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n                            </div>\n                        </div>\n                        <div class=\"part__body width--full pad--sm--lm pad--sm--rm\">\n                                <h5 class=\"mar--sm--n relatedPerson\"><a href=\"/");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "Id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h5>\n                                <h5 class=\"text-faded mar--sm--n\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </h5>\n                        </div>\n                    </div>\n                </section>\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <div class=\"column--md--6\">\n                                    <label class=\"block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.label", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.value", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div> \n                            ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n                                        <div data-qa-label=\"fieldSetValue\">");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.value", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                                    ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n                                        <div data-qa-label=\"fieldSetValue\">Not Provided</div>\n                                    ");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Summary__c", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Projects__r", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Recognition__r", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Performance_Ratings__r", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Training_Activities__r", {hash:{},inverse:self.noop,fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Skill_Assertions__r", {hash:{},inverse:self.noop,fn:self.program(38, program38, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Publications__r", {hash:{},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Patents__r", {hash:{},inverse:self.noop,fn:self.program(44, program44, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Recommendations__r", {hash:{},inverse:self.noop,fn:self.program(56, program56, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Certifications__r", {hash:{},inverse:self.noop,fn:self.program(59, program59, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Employment_Histories__r", {hash:{},inverse:self.noop,fn:self.program(63, program63, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Education_Histories__r", {hash:{},inverse:self.noop,fn:self.program(66, program66, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Languages__r", {hash:{},inverse:self.noop,fn:self.program(69, program69, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Volunteer_Work__r", {hash:{},inverse:self.noop,fn:self.program(73, program73, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"summary\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Summary</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <p class=\"mar--sm--tn\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Summary__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </p>\n                        </div>\n                    </section>\n                ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"projects\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Project", options) : helperMissing.call(depth0, "pluralfication", "records", "Project", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayDate || (depth0 && depth0.displayDate)),stack1 ? stack1.call(depth0, "Start_Date__c", "End_Date__c", "to", options) : helperMissing.call(depth0, "displayDate", "Start_Date__c", "End_Date__c", "to", options))));
  data.buffer.push("</small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"recognition\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Recognition</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h3>\n                                    <small class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Issuer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Month__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Year__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n                                        ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"performanceRatings\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Performance Rating", options) : helperMissing.call(depth0, "pluralfication", "records", "Performance Rating", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(27, program27, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h3>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Date__c", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Job_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <div class=\"card mar--sm--tm\">\n                                        <div class=\"card__body\">\n                                            <p class=\"mar--sm--n\">\n                                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </p>\n                                            <div class=\"text-right\">\n                                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Reviewer_Link__c", {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Reviewer_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                            <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" target>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Rating_Score__c", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n                                        ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Rating_Score__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Rating_Score__c", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Date__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ● ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                                    <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigation", "Reviewer_Link__c", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\" class=\"block\">\n                                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Reviewer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                                    </a>\n                                                ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Reviewer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                                ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"traning\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Training Activity", options) : helperMissing.call(depth0, "pluralfication", "records", "Training Activity", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h3>\n                                    <small class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Source__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Date__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"otherSkills\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Skill", options) : helperMissing.call(depth0, "pluralfication", "records", "Skill", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program39(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <span class=\"label label--secondary inline-block mar--sm--bxs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Skill__r.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                            ");
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"publications\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Publication", options) : helperMissing.call(depth0, "pluralfication", "records", "Publication", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h3>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Date__c", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Publisher__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"patents\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Patent", options) : helperMissing.call(depth0, "pluralfication", "records", "Patent", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(45, program45, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program45(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </h3>\n                                    <small class=\"text-faded block\">\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Number__c", {hash:{},inverse:self.program(49, program49, data),fn:self.program(46, program46, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </small>\n                                    <small class=\"text-faded\">\n                                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Date__c", {hash:{},inverse:self.program(54, program54, data),fn:self.program(51, program51, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Summary__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }
function program46(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Office__c", {hash:{},inverse:self.noop,fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }
function program47(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program49(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program51(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Date__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Status__c", {hash:{},inverse:self.noop,fn:self.program(52, program52, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program54(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program56(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"recommendations\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Recommendation", options) : helperMissing.call(depth0, "pluralfication", "records", "Recommendation", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(57, program57, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program57(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <div class=\"card mar--sm--tm\">\n                                        <div class=\"card__body\">\n                                            <p class=\"mar--sm--n\">\n                                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Recommendation_Text__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </p>\n                                            <div class=\"text-right\">\n                                                <p>\n                                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                                </p>\n                                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Recommender_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }

function program59(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"certifications\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Certification", options) : helperMissing.call(depth0, "pluralfication", "records", "Certification", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"test panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(60, program60, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program60(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Number__c", {hash:{},inverse:self.noop,fn:self.program(61, program61, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\n                                    <small class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Issuer__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYear || (depth0 && depth0.displayMonthYear)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYear", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }
function program61(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program63(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"employment\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Employment</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(64, program64, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program64(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Job_Title__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                                    <small class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYear || (depth0 && depth0.displayMonthYear)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYear", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                                    <hr class=\"hr-alt\"/>\n                                </article>\n                            ");
  return buffer;
  }

function program66(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"educations\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Education</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(67, program67, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program67(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                                    <small class=\"text-faded block\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Education_Level__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYear || (depth0 && depth0.displayMonthYear)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "-", options) : helperMissing.call(depth0, "displayMonthYear", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "-", options))));
  data.buffer.push("</small>\n                                </article>\n                            ");
  return buffer;
  }

function program69(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"languages\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.pluralfication || (depth0 && depth0.pluralfication)),stack1 ? stack1.call(depth0, "records", "Language", options) : helperMissing.call(depth0, "pluralfication", "records", "Language", options))));
  data.buffer.push("</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            <ul class=\"mar--sm--tn\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(70, program70, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            </ul>\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program70(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                                    <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Proficiency_Level__c", {hash:{},inverse:self.noop,fn:self.program(71, program71, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n                                ");
  return buffer;
  }
function program71(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Proficiency_Level__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program73(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"volunteering\">\n                        <div class=\"list-heading\">\n                            <h4 class=\"list-heading__title\">Volunteering</h4>\n                        </div>\n                        <div class=\"panel__body pad--sm--bn\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(74, program74, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </section>\n                ");
  return buffer;
  }
function program74(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <article class=\"mar--sm--bm\">\n                                    <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n                                    <small class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Role__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n                                    <p>\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Description__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                    </p>\n                                </article>\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n pad--sm--tm\">\n        <div class=\"panel mar--sm--bm js-panel\">\n            <div class=\"panel__top\">\n                <div class=\"js-view-buttons\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isOwner", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    <button type=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickEdit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--secondary float--right js-edit-page\">\n                        <span class=\"juicon juicon-pencil\"></span>\n                    </button>\n                </div>\n                <h2 class=\"panel__heading\">\n                    Talent Profile\n                </h2>\n            </div>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "talentProfile.User__r", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <section id=\"custom-fields\">\n                <div class=\"js-section-view\">\n                    <div class=\"panel__body pad--sm--tn\">\n                        <div class=\"row pad--sm--rxxl\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "field", "in", "tpFields", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </div>\n                </div>\n            </section>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "talentProfile", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n</div>");
  return buffer;
  
});