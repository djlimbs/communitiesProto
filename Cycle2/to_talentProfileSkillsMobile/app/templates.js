Ember.TEMPLATES["main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                <div class=\"panel__component panel__component--removable\">\n                    <button class=\"close\" type=\"button\">\n                        <span ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSkill", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"component-remove-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <div class=\"form__group mar--sm--bn\">\n                        <label class=\"sr-only\">New skill</label>\n                        ");
  hashContexts = {'type': depth0,'class': depth0,'data-qa': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'data-qa': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("searchThis"),
    'data-qa': ("input"),
    'value': ("skill.Name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                        <small class=\"input-error-content\">Error.</small>\n                    </div>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "skill.showSearchBox", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                        <ul class=\"list-group list-group--bordered searchResults mar--sm--bn\">\n                            <li class=\"list-group__item item\">\n                                <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSkill", "skill.Name", "skill.Id", {hash:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Use \"<span class=\"itemName createItem\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "skill.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\"</a>\n                            </li>\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "foundSkill", "in", "skill.foundSkills", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </ul>\n                    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <li class=\"list-group__item item\">\n                                    <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSkill", "foundSkill.Name", "foundSkill.Id", {hash:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"itemName\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "foundSkill.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span></a>\n                                </li>\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n pad--md--m\">\n        <div class=\"panel mar--md--bm js-profile-panel mar--sm--tn mar--md--tm no-radius-on-small\">\n            <div class=\"load-block hide\">\n                <div class=\"load-block-icon juicon juicon-loading\">\n                </div>\n            </div>\n            <div class=\"panel__top\">\n                <button ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":float--right :button :button--primary :mar--sm--only--rs isLoading:load-this")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSave", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" data-qa-button=\"save\">Save</button>\n                <h2 class=\"panel__heading\">\n                    Skills\n                </h2>\n            </div>\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack2 = helpers.each.call(depth0, "skill", "in", "currentSkills", {hash:{
    'itemController': ("items")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n            <div class=\"panel__component\">\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSkill", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--primary button--ghost mar--sm--tm\" type=\"button\">\n                    Add skill <span class=\"juicon juicon-plus\"></span>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});