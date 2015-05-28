Ember.TEMPLATES["main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"scope-container\">\n    <div class=\"content content--readable pad--sm--n pad--md--m\">\n        <div class=\"panel js-profile-panel mar--sm--tn no-radius-on-small\">\n            <div class=\"load-block hide\">\n                <div class=\"load-block-icon juicon juicon-loading\">\n                </div>\n            </div>\n            <div class=\"panel__top\">\n                <h2 class=\"panel__heading\">\n                    Skills\n                </h2>\n            </div>\n            <div class=\"panel__body pad--sm--bn\">\n                <div class=\"form__group\">\n                    <label class=\"sr-only\">Add skills</label>\n                        ");
  hashContexts = {'value': depth0,'data-qa-input': depth0};
  hashTypes = {'value': "ID",'data-qa-input': "STRING"};
  options = {hash:{
    'value': ("selectedSkills"),
    'data-qa-input': ("select2")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['select-2'] || (depth0 && depth0['select-2'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "select-2", options))));
  data.buffer.push("\n                    <ul class=\"select2-results\"> </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});