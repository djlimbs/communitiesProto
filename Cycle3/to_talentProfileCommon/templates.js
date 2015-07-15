Ember.TEMPLATES["_childrenObjects"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data,depth1) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"projects\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"projects\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.projects", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"projectName\">");
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

function program4(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"recognition\">\n        <div class=\"list-heading\">\n            <h4 data-qa-recognition=\"recognition\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.recognition", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"recognitionName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
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

function program10(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"traning\">\n        <div class=\"list-heading\">\n            <h4 class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.trainingAndDevelopment", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"trainingName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(8, program8, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
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

function program14(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"otherSkills\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"skills\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.skills", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <span data-qa-label=\"skillNames\" class=\"label label--secondary inline-block mar--sm--bxs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Skill__r.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n            ");
  return buffer;
  }

function program17(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"publications\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"publications\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.publications", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"publicationName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(8, program8, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
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
function program19(depth0,data) {
  
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

function program21(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"patents\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"patents\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.patents", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"patentName\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Link__c", {hash:{},inverse:self.program(8, program8, data),fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </h3>\n                    <small data-qa-label=\"patentNumberAndOffice\" class=\"text-faded block\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Number__c", {hash:{},inverse:self.program(28, program28, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <small data-qa-label=\"patentDateAndStatus\" class=\"text-faded\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Date__c", {hash:{},inverse:self.program(33, program33, data),fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <p data-qa-label=\"patentSummary\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Summary__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Summary__c", options))));
  data.buffer.push("\n                    </p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program23(depth0,data) {
  
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

function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Office__c", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Office__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || (depth0 && depth0.formatDate)),stack1 ? stack1.call(depth0, "Date__c", options) : helperMissing.call(depth0, "formatDate", "Date__c", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "Status__c", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Status__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program35(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"recommendations\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"recommendations\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.recommendations", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <div class=\"card mar--sm--tm\">\n                        <div class=\"card__body\">\n                            <p data-qa-label=\"recommendationText\" class=\"mar--sm--n\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Recommendation_Text__c", {hash:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
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
function program37(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                                    \"");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Recommendation_Text__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Recommendation_Text__c", options))));
  data.buffer.push("\"\n                                ");
  return buffer;
  }

function program39(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"certifications\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"certifications\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.certifications", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"test panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program40(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"certificationName\">");
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
  stack1 = helpers['if'].call(depth0, "Issuer__c", {hash:{},inverse:self.program(44, program44, data),fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </small>\n                    <small data-qa-label=\"certificationDate\" class=\"text-faded\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.displayMonthYearRange || (depth0 && depth0.displayMonthYearRange)),stack1 ? stack1.call(depth0, "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options) : helperMissing.call(depth0, "displayMonthYearRange", "Start_Month__c", "Start_Year__c", "End_Month__c", "End_Year__c", "to", options))));
  data.buffer.push("</small>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Number__c", {hash:{},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Number__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program46(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"employment\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"employment\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.employment", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program47(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"employmentTitle\">");
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
  data.buffer.push("</small>\n                    <p data-qa-label=\"employmentDate\" >");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.convertNewLinesToBreaks || (depth0 && depth0.convertNewLinesToBreaks)),stack1 ? stack1.call(depth0, "Description__c", options) : helperMissing.call(depth0, "convertNewLinesToBreaks", "Description__c", options))));
  data.buffer.push("</p>\n                    <hr class=\"hr-alt\"/>\n                </article>\n            ");
  return buffer;
  }

function program49(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"educations\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"education\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.education", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(50, program50, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program50(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"educationName\">");
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
  data.buffer.push("</small>\n                </article>\n            ");
  return buffer;
  }

function program52(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"languages\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"languages\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.languages", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            <ul class=\"mar--sm--tn\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(53, program53, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </div>\n    </section>\n");
  return buffer;
  }
function program53(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <li data-qa-label=\"languageName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Proficiency_Level__c", {hash:{},inverse:self.noop,fn:self.program(54, program54, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n                ");
  return buffer;
  }
function program54(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("(");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Proficiency_Level__c", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")");
  return buffer;
  }

function program56(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <section id=\"volunteering\">\n        <div class=\"list-heading\">\n            <h4 data-qa-label=\"volunteering\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.volunteering", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n        </div>\n        <div class=\"panel__body pad--sm--bn\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "records", {hash:{},inverse:self.noop,fn:self.program(57, program57, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </section>\n");
  return buffer;
  }
function program57(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <article class=\"mar--sm--bm\">\n                    <h3 data-qa-label=\"volunteeringName\">");
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

  data.buffer.push("<div>hello2431232112</div>\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Projects__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Recognition__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(4, program4, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Training_Activities__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(10, program10, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Skill_Assertions__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Publications__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Patents__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(21, program21, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Recommendations__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(35, program35, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Certifications__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(39, program39, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Employment_Histories__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(46, program46, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Education_Histories__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(49, program49, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Languages__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(52, program52, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "Volunteer_Work__r", {hash:{},inverse:self.noop,fn:self.programWithDepth(56, program56, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["applicationReader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n\">\n        <button id=\"back-to-top\" class=\"button button--primary\" style=\"border-top-left-radius: 0; border-bottom-left-radius: 0; position: fixed; display: none\"><span class=\"juicon juicon-upward\"></span></button>\n        <div class=\"panel mar--md--bm js-profile-panel mar--sm--tn mar--md--tm no-radius-on-small\">\n            <div class=\"panel__top\">\n                <div class=\"js-edit-buttons\">\n                    <button class=\"button button--secondary float--right mar--sm--ls\" data-toggle=\"modal\" data-target=\"#status-modal\" type=\"button\">\n                        Change Status\n                    </button>\n                </div>\n                <h2 class=\"panel__heading has-subheading\">\n                    Application\n                </h2>\n                <h3 class=\"panel__subheading\">\n                    Sr. Sales Engineer\n                </h3>\n            </div>\n            <!-- Identity section only appears in sf1 -->\n            <section id=\"identity\" class=\"part\">\n                <div class=\"panel__body pad--sm--bs\">\n                    <div class=\"part__left--fixed avatar-container--md\">\n                        <img src=\"https://randomuser.me/api/portraits/med/men/15.jpg\" alt=\"\"/>\n                    </div>\n                    <div class=\"part__body--fixed\">\n                        <h4 class=\"card__heading dots\"><a href=\"#\">Freddie George</a></h4>\n                        <h5 class=\"card__subheading dots\" style=\"display: inline-block\">Status: Offer (in progress)</h5>\n                        <a href=\"#\"><span class=\"juicon juicon-pencil fsxs lh-normal\" style=\"display: inline;\"></span></a>\n                    </div>\n                </div>\n                <div class=\"content\">\n                    <div class=\"form__group mar--sm--bn\">\n                        <small class=\"block dots\"><label>Source:</label> Internal</small>\n                    </div>\n                    <div class=\"form__group mar--sm--bn\">\n                        <small class=\"block dots\"><label>Employment:</label> Customer Service Rep, CalTech</small>\n                    </div>\n                    \n                    <div class=\"row mar--sm--ts mar--sm--bs\">\n                        <div class=\"column--md--6 pad--sm--only--ts pad--sm--only--bs form__group mar--sm--bn\">\n                            <small class=\"block dots\"><label><span class=\"juicon juicon-document\"></span><a href=\"#\"> Resume (35k)</a></label></small>\n                        </div>\n                        <div class=\"column--md--6 pad--sm--only--ts pad--sm--only--bs form__group mar--sm--bn\">\n                            <small class=\"block dots\"><label><span class=\"juicon juicon-linkedin\"></span><a href=\"#\"> Profile</a></label></small>\n                        </div>\n                        <div class=\"column--md--6 pad--sm--only--ts pad--sm--only--bs form__group mar--sm--bn\">\n                            <small class=\"block dots\"><label><span class=\"juicon juicon-location\"></span></label> Chicago, IL</small>\n                        </div>\n                        <div class=\"column--md--6 pad--sm--only--ts pad--sm--only--bs form__group mar--sm--bn\">\n                            <small class=\"block dots\"><label><span class=\"juicon juicon-calendar\"></span></label> Dec 20</small>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <section id=\"summary\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Summary</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <p class=\"mar--sm--tn\">\n                        This is typically a paragraph or two that gives an overview of the person’s value as an employee. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.\n                    </p>\n                    <p class=\"mar--sm--tn\">\n                        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.\n                    </p>\n                </div>\n            </section>\n            <section id=\"interview\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Interview</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <div class=\"mar--sm--bs\"><span class=\"juicon juicon-calendar text-faded mar--sm--rm\"></span><a href=\"#\">Tue, Jun 16, 2015 @ 11:00a CDT</a></div>\n                                Mitch Bennett &bull; HTML, CSS, JavaScript</div>\n                        </div>\n                    </article>\n                    <div class=\"js-component-controls\">\n                        <button type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm\">\n                            <span class=\"juicon juicon-plus\"></span> Add\n                        </button>\n                    </div>\n                </div>\n            </section>\n            <section id=\"feedback\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Feedback</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn pad--sm--tn\">\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <div class=\"row panel__top pad--sm--n pad--sm--txs mar--sm--bm\" style=\"height: auto\">\n                                    <div class=\"column--md--8\">\n                                        <div class=\"part__left--fixed\">\n                                            <div class=\"juicon juicon-ban text-error\"></div>\n                                        </div>\n                                        <div class=\"part__body--fixed pad--md--bm pad--sm--only--bs\">\n                                            <h4 class=\"card__heading dots\">Final Selection</h4>\n                                        </div>\n                                    </div>\n                                    <div class=\"column--md--4 text-right-left mar--sm--only--bm\">\n                                        <small class=\"text-faded mar--sm--only--lxl mar--sm--only--bm\">Jun 25, 2015</small>\n                                    </div>\n                                </div>\n                                <div class=\"block\">\n                                    \"Does not have enough experience to manage the workload.\" <em>&mdash;&nbsp;Jane Aaron</em>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <div class=\"row panel__top pad--sm--n pad--sm--txs mar--sm--bm\" style=\"height: auto\">\n                                    <div class=\"column--md--8\">\n                                        <div class=\"part__left--fixed\">\n                                            <div class=\"juicon juicon-like text-success\"></div>\n                                        </div>\n                                        <div class=\"part__body--fixed pad--md--bm pad--sm--only--bs\">\n                                            <h4 class=\"card__heading dots\">Regarding HTML, CSS, JavaScript</h4>\n                                            <div class=\"text-faded dots\"><small>Interview with George K. and Nicole S.</small></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"column--md--4 text-right-left mar--sm--only--bm\">\n                                        <small class=\"text-faded mar--sm--only--lxl mar--sm--only--bm\">Jun 16, 2015</small>\n                                    </div>\n                                </div>\n                                <div class=\"row pad--sm--lxl\">\n                                    <div class=\"panel__body column--md--6 pad--sm--tn\">\n                                        <h4>Tech Skills</h4>\n                                        Meets expectations\n                                    </div>\n                                    <div class=\"panel__body column--md--6 pad--sm--tn\">\n                                        <h4>People Skills</h4>\n                                        Exceeds expectations\n                                    </div>\n                                </div>\n                                <div class=\"block\">\n                                    \"Freddie was a pleasure to talk to and really knows how to touch buttons on computers.\" <em>&mdash;&nbsp;Mitch Bennett</em>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"card mar--sm--tm\">\n                            <div class=\"card__body\">\n                                <div class=\"row panel__top pad--sm--n pad--sm--txs mar--sm--bm\" style=\"height: auto\">\n                                    <div class=\"column--md--8\">\n                                        <div class=\"part__left--fixed\">\n                                            <div class=\"juicon juicon-like text-success\"></div>\n                                        </div>\n                                        <div class=\"part__body--fixed pad--md--bm pad--sm--only--bs\">\n                                            <h4 class=\"card__heading dots\">Resume Review</h4>\n                                        </div>\n                                    </div>\n                                    <div class=\"column--md--4 text-right-left mar--sm--only--bm\">\n                                        <small class=\"text-faded mar--sm--only--lxl mar--sm--only--bm\">Jun 1, 2015</small>\n                                    </div>\n                                </div>\n                                <div class=\"block\">\n                                    \"Freddie was a pleasure to talk to and really knows how to touch buttons on computers.\" <em>&mdash;&nbsp;Mitch Bennett</em>\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                    <div class=\"js-component-controls\">\n                        <button type=\"button\" class=\"button button--primary button--ghost width--full js-add-component mar--sm--bm\">\n                            <span class=\"juicon juicon-chat\"></span> Provide feedback\n                        </button>\n                    </div>\n                </div>\n            </section>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "childrenObjects", options) : helperMissing.call(depth0, "partial", "childrenObjects", options))));
  data.buffer.push("\n            <section id=\"projects\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Projects</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">TalentObjects 1.0 release</h3>\n                        <small class=\"text-faded\">Oct 2014 to Mar 2015</small>\n                        <p>\n                            Responsible for the user experience design (UI concepts and task flows) of a recruiting module for a world-class workforce engagement solution.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">ASU Online redesign</h3>\n                        <small class=\"text-faded\">Jul 2008 to Feb 2009</small>\n                        <p>\n                            Redesigned ASU Online to focus on increasing prospective student enrollments. Implemented ongoing SEO and content strategy plan to continually increase conversions and brand trust.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"recognition\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Recognition</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Force.com MVP 2014 (Renewed)</a></h3>\n                        <small class=\"text-faded block\">Salesforce.com</small>\n                        <small class=\"text-faded\">Jan 1, 2014</small>\n                        <p>\n                            The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Force.com MVP 2013 (Renewed)</a></h3>\n                        <small class=\"text-faded block\">Salesforce.com</small>\n                        <small class=\"text-faded\">Jan 6, 2013</small>\n                        <p>\n                            The Force.com MVP Program recognizes outstanding contributors and technological leaders in the Force.com cloud platform ecosystems. These Force.com MVPs are being called out for willingly sharing their expertise with others, demonstrating stewardship of the community in which they play an integral part, advancing the community body of knowledge and strengthening the developer network.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"training\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Training and Development</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Managing Product Definition and Design</a></h3>\n                        <small class=\"text-faded block\">Cooper U</small>\n                        <small class=\"text-faded\">Jun 1, 2015</small>\n                        <p>\n                            Students walk away knowing how to: communicate business and customer goals in clear, actionable, memorable ways; use narrative to craft a compelling product vision; ensure cross-functional teams understand that vision and how to make decisions in service of it; generate product requirements that are grounded in the best user experience.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Cranky Talk Workshop for New Speakers</a></h3>\n                        <small class=\"text-faded block\">Dan Willis et. al.</small>\n                        <small class=\"text-faded\">Aug 22, 2013</small>\n                        <p>\n                            Cranky Talk is an intense, day-long workshop for people intent on being exceptional public speakers.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"skills\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Skills</h4>\n                </div>\n                <div class=\"panel__body\">\n                    <span class=\"label label--secondary\">Salesforce.com</span> <span class=\"label label--secondary\">Force.com</span> <span class=\"label label--secondary\">Peer Training</span> <span class=\"label label--secondary\">Community Stewardship</span>\n                </div>\n            </section>\n            <section id=\"publications\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Publications</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">UX Design on the Salesforce1 Platform</a></h3>\n                        <small class=\"text-faded\">May 14, 2015 ● Peachpit Press</small>\n                        <p>\n                            A short book on how to design compelling experiences for enterprise apps using the Salesforce1 Platform.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Design Is a Job</a></h3>\n                        <small class=\"text-faded\">April 10, 2012 ● A Book Apart</small>\n                        <p>\n                            Ross Belmont wants to help you do your job better. From contracts to selling design, from working with clients to working with each other, you’ll learn why navigating the business of design is just as important as the craft of it. Cultivated from his own experience, Ross packs this brief book with knowledge you can’t afford not to know.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"patents\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Patents</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\"><a href=\"#\">Security device for computers</a></h3>\n                        <small class=\"text-faded block\">US5016758 A (USPTO)</small>\n                        <small class=\"text-faded\">Feb 7, 2011 (Granted)</small>\n                        <p>\n                            A security device for computing devices wherein a strong flexible cable is fastened at one end to a lock, carried on a hanger, or to a bar on a clothing stand, which cable passes through part of the housing and the other end of the cable is detachably secured in the lock to releasably secure the machine.\n                        </p>\n                    </article>\n                </div>\n            </section>\n            <section id=\"recommendations\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Recommendations</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross is a talented UX designer, writer, speaker and workshop facilitator. He is also an authentic, generous and thoughtful human being who gives himself fully to the things he is passionate about. As a speaker and writer, his ideas are insightful and his prose is clean, clear and engaging. As a workshop facilitator I’ve never seen anyone better.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        Dave Gray\n                                    </a>\n                                    Co-founder at Boardthing.com\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <div class=\"card\">\n                            <div class=\"card__body\">\n                                <p class=\"mar--sm--n\">\n                                    “Ross is a highly talented and thoughtful User Experience Designer. He’s able to easily tackle complex information architecture problems, creating user experiences that are intuitive, fun and creative. His humor and collaborative attitude make him a pleasure to work with. I’d be happy to work with him again, given the opportunity.”\n                                </p>\n                                <div class=\"text-right\">\n                                    <a href=\"#\" class=\"block\">\n                                        John Devoy\n                                    </a>\n                                    Assistant Vice Provost Digital Marketing Strategy @ ASU Online\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                </div>\n            </section>\n            <section id=\"certifications\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Certifications</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">Force.com Developer</h3>\n                        <small class=\"text-faded block\">Salesforce.com (DEV 401)</small>\n                        <small class=\"text-faded\">July 2009 to Present</small>\n                    </article>\n                </div>\n            </section>\n            <section id=\"employment\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Employment</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">Chief Experience Designer</h3>\n                        <small class=\"text-faded block\">Appiphony, LLC</small>\n                        <small class=\"text-faded\">May 2010 to Present</small>\n                        <p>\n                            I am extremely proud to have formalized a design-driven development practice for our ISV clients. My goal in doing so is to bring the best design thinking anywhere to software on the Force.com platform. Appiphony’s leadership and developers understand the benefits good design can bring, and we are doing the best work in our market.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">Architect</h3>\n                        <small class=\"text-faded block\">EDL Consulting</small>\n                        <small class=\"text-faded\">July 2009 - May 2010</small>\n                        <p>\n                            EDL Consulting is a national technology services firm specializing in the intelligent integration of eCommerce, CRM and business intelligence solutions to improve business performance. EDL solves the complex systems integration issues behind state-of-the-art technology solutions to make organizations more successful. The solutions EDL builds generate revenue, result in cost savings, promote differentiation and make it easier for clients to do business with their customers.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n            <section id=\"education\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Education</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">University of Illinois at Urbana-Champaign</h3>\n                        <small class=\"text-faded block\">BS, MIS</small>\n                        <small class=\"text-faded\">1996-2000</small>\n                    </article>\n                </div>\n            </section>\n            <section id=\"languages\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Languages</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <ul class=\"mar--sm--tn pad--sm--lm\">\n                        <li>English (Native or bilingual proficiency)</li>\n                        <li>Japanese (Elementary proficiency)</li>\n                        <li>Spanish (Limited working proficiency)</li>\n                    </ul>\n                </div>\n            </section>\n            <section id=\"volunteering\">\n                <div class=\"list-heading\">\n                    <h4 class=\"list-heading__title\">Volunteering</h4>\n                </div>\n                <div class=\"panel__body pad--sm--bn\">\n                    <article class=\"mar--sm--bm\">\n                        <h3 class=\"mar--sm--n\">CASA of Kane County</h3>\n                        <small class=\"text-faded\">Board Member</small>\n                        <p>\n                            CASA Kane County recruits, trains and supervises community volunteers who serve as Court Appointed Special Advocates (CASAs) for children in court due to abuse, neglect or private guardianship.\n                        </p>\n                        <hr class=\"hr-alt\"/>\n                    </article>\n                </div>\n            </section>\n        </div>\n    </div>\n    <div aria-hidden=\"true\" aria-labelledby=\"none\" class=\"modal fade\" id=\"status-modal\" role=\"dialog\" tabindex=\"-1\">\n        <div class=\"modal__shell\">\n            <div class=\"modal__content\">\n                <div class=\"modal__top pad--sm--bm\">\n                    <button class=\"close\" data-dismiss=\"modal\" type=\"button\">\n                        <span class=\"close-modal-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <h2 class=\"modal__heading\" id=\"myModalLabel\">Update Status</h2>\n                </div>\n                <div class=\"modal__body\">\n                    <div class=\"mar--sm--bm\">\n                        Stage\n                        <div class=\"select__wrap\">\n                            <div class=\"input__icon juicon juicon-down\"></div>\n                            <select>\n                                <option value=\"option1\">Option 1</option>\n                                <option value=\"option2\">Option 2</option>\n                                <option value=\"option3\">Option 3</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"mar--sm--bn\">\n                        Status\n                        <div class=\"select__wrap\">\n                            <div class=\"input__icon juicon juicon-down\"></div>\n                            <select>\n                                <option value=\"option1\">Option 1</option>\n                                <option value=\"option2\">Option 2</option>\n                                <option value=\"option3\">Option 3</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal__footer\">\n                    <button class=\"button button--primary js-save\" data-dismiss=\"modal\" type=\"button\">OK</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
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

function program16(depth0,data,depth1) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "Summary__c", {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth1),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "childrenObjects", options) : helperMissing.call(depth0, "partial", "childrenObjects", options))));
  data.buffer.push("\n            ");
  return buffer;
  }
function program17(depth0,data,depth2) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                    <section id=\"summary\">\n                        <div class=\"list-heading\">\n                            <h4 data-qa-label=\"summary\" class=\"list-heading__title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "labels.summary", {hash:{},contexts:[depth2],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
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
  stack2 = helpers['with'].call(depth0, "talentProfile", {hash:{},inverse:self.noop,fn:self.programWithDepth(16, program16, data, depth0),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n    </div>\n</div>");
  return buffer;
  
});