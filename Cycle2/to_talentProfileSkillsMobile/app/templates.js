Ember.TEMPLATES["main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <div class=\"panel__component panel__component--removable\">\n                    <button class=\"close\" type=\"button\">\n                        <span ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSkill", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"component-remove-x\"></span><span class=\"sr-only\">Close</span>\n                    </button>\n                    <div class=\"form__group mar--sm--bn\">\n                        <label class=\"sr-only\">New skill</label>\n                        ");
  hashContexts = {'value': depth0,'data-qa-input': depth0,'class': depth0};
  hashTypes = {'value': "ID",'data-qa-input': "STRING",'class': "STRING"};
  options = {hash:{
    'value': ("selectedSkills"),
    'data-qa-input': ("select2"),
    'class': ("searchThis")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['select-2'] || (depth0 && depth0['select-2'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "select-2", options))));
  data.buffer.push("\n                        <small class=\"input-error-content\">Error.</small>\n                    </div>\n                </div>\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n pad--md--m\">\n        <div class=\"panel mar--md--bm js-profile-panel mar--sm--tn mar--md--tm no-radius-on-small\">\n            <div class=\"load-block hide\">\n                <div class=\"load-block-icon juicon juicon-loading\">\n                </div>\n            </div>\n            <div class=\"panel__top\">\n                <h2 class=\"panel__heading\">\n                    Skills\n                </h2>\n            </div>\n            ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, "currentSkills", {hash:{
    'itemController': ("items")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            <div class=\"panel__component\">\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addSkill", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"button button--primary button--ghost mar--sm--tm\" type=\"button\">\n                    Add skill <span class=\"juicon juicon-plus\"></span>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});