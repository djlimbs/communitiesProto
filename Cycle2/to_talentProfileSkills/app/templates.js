Ember.TEMPLATES["main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSave", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--primary float--right mar--sm--only--rs mar--md--lxs js-editing js-ok-button\" style=\"display: block;\" data-qa-button=\"ok\">OK</button>\n\n            <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickCancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"float--right-left button button--secondary mar--sm--only--ls js-editing js-cancel-button\" style=\"display: block;\" data-qa-button=\"cancel\">Cancel</button>\n            <h1 class=\"nav-bar--sf1__title page__heading\" data-qa-label=\"skills\"><span class=\"js-skill-count\" data-qa-label=\"number\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "numberOfSkills", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "skillsText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n            <hr class=\"show-brkpoint--md mar--sm--bn\">\n\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "noSkills", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                \n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickEdit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"float--right button button--secondary mar--sm--only--ls js-edit-button\" data-qa-button=\"edit\"><div class=\"juicon juicon-pencil\"></div></button>\n\n                <h1 class=\"nav-bar--sf1__title page__heading\" data-qa-label=\"skills\"><span class=\"js-skill-count\" data-qa-label=\"number\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "numberOfSkills", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "skillsText", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n                <hr class=\"show-brkpoint--md mar--sm--bn\">\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, options, hashTypes, hashContexts;
  data.buffer.push("\n\n                ");
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  if (stack1 = helpers['add-skills']) { stack1 = stack1.call(depth0, options); }
  else { stack1 = (depth0 && depth0['add-skills']); stack1 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1; }
  hashTypes = {};
  hashContexts = {};
  if (!helpers['add-skills']) { stack1 = blockHelperMissing.call(depth0, 'add-skills', options); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "showSearchBox", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                <section id=\"skill-collection\" class=\"mar--sm--tm\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "selectedSkills", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </section>\n\n                \n\n            ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'type': depth0,'id': depth0,'placeholder': depth0,'value': depth0,'class': depth0,'data-qa-input': depth0};
  hashTypes = {'type': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID",'class': "STRING",'data-qa-input': "STRING"};
  options = {hash:{
    'type': ("text"),
    'id': ("skill-input"),
    'placeholder': ("Add skills"),
    'value': ("searchParam"),
    'class': ("js-editing mar--sm--tm"),
    'data-qa-input': ("input")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <ul id=\"skill-results\" class=\"list-group list-group--bordered mar--sm--n absolute bg-1\" style=\"display: block;\" data-qa-pane=\"searchBox\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "skillNameDoesNotExist", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "foundSkill", "in", "foundSkills", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </ul>\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <li class=\"list-group__item js-skill\">\n                                <a class=\"link\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSkill", "currentName", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" data-qa-link=\"add\">\n                                    Add \"<span class=\"js-skill-name js-create-skill\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\"\n                                </a>\n                            </li>\n                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            <li class=\"list-group__item js-skill\">\n                                <a class=\"link\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSkill", "foundSkill.Name", "foundSkill.Id", {hash:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" data-qa-link=\"skillName\">\n                                    <span class=\"js-skill-name\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "foundSkill.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                                </a>\n                            </li>\n                        ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <div class=\"label label--secondary mar--sm--rxs mar--sm--bxs\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            <span ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSkill", "id", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"mar--sm--lxs inline-block juicon juicon-x text-faded pointer js-remove-skill js-editing\" style=\"display: inline-block;\" data-qa-pill=\"skillName\">\n                            </span>\n                        </div>\n                    ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "noSkills", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"skill-collection\" class=\"mar--sm--tm\"></section>\n                    <div class=\"text-faded text-center pad--sm--l bg-2 js-empty-state\" style=\"\">\n                        <small data-qa-pane=\"emptyState\">\n                            \n                            No skills have been added yet. <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickEdit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"\" class=\"js-edit-button\" data-qa-link=\"addSkill\">Add a Skill</a>\n                        </small>\n                    </div>\n                ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <section id=\"skill-collection\" class=\"mar--sm--tm\"></section>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "selectedSkills", {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        <div class=\"label label--secondary mar--sm--rxs mar--sm--bxs\" data-qa-pill=\"skillName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </div>\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <nav class=\"nav-bar--sf1 mar--sm--bn\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </nav>\n\n    <section id=\"skill-chooser\">\n        <div class=\"js-skill-results-container form__group relative\">\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "editMode", {hash:{},inverse:self.program(18, program18, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        \n        </div>\n    </section>\n</div>");
  return buffer;
  
});