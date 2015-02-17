// Standard JUI date picker component
// Usage: {{date-picker value=[date value to bind to your controller]}}
App.DatePickerComponent = Ember.Component.extend({
    attributeBindings: ['includeToday', 'disabled'],
    layoutName: 'components/datepicker',
    didInsertElement: function() {

        var self = this
            , dateValue = this.get('value')
            , disabled = this.get('disabled')
            , currentDate = moment()
            , includeToday = this.get('includeToday')
            , $element = this.$()
            , $datepicker = $element.find('.datepicker')
            , $input = $element.find('input')
            , locale = typeof localeString === 'undefined' ? 'YYYY-MM-DD' : localeString;

            $datepicker.datepicker({
                    format: locale.toLowerCase(),
                    onRender: function(date) {
                        if (disabled === true) {
                            return 'disabled';

                        } else {
                            if (includeToday === true) 
                                return date.valueOf() < moment(currentDate).subtract('days', 1).valueOf() ? 'disabled' : '';
                        }
                    }
                })
                .on('changeDate', function(event) {
                    self.set('value', moment(event.date).format('YYYY-MM-DD'));
                    $input.val(moment(event.date).format(locale));
                   
                    $datepicker.datepicker('hide');
                })
                .datepicker('setValue', moment(dateValue).toDate());

            if (!Ember.isNone(dateValue)) {
                $input.val(moment(dateValue).format(locale));
            }
    }
});

// Salesforce Rich Text Editor component
// Usage: In the body tag of the VF page you are editing, insert an apex rich text tag inside a div with id 'richTextForm'
// then in your template: {{rich-text componentId=[this elements id if you need it] value=[rich text to bind to your controller]}}
// Attributes:
// componentId - This is the Id of the element you have created, can be useful if you need to jQuery for it.
// bindingType - You can specify the component to bind its 'value' property to the 'html' or 'text' content of the rich text field.
//               If unspecified, it will not bind at all.
// autofocus - Whether the cursor should autofocus on the component when it is added to the DOM.
App.RichTextComponent = Ember.Component.extend({
    attributeBindings: ['componentId', 'bindingType', 'autofocus', 'height'],
    previousContent: '',
    didInsertElement: function() {
        var self = this
            , richTextForm= $('#richTextForm')
            , value = this.get('value')
            , bindingType = this.get('bindingType')
            , autofocus = this.get('autofocus')
            , height = this.get('height')
            , pollCounter = 0; // We should set a max amount of polling incase the component launches but the user switches the view right away.

        richTextForm.find('.cke').remove();
        this.$().append(richTextForm.html());
        this.set('componentId', this.get('elementId'));

        // We have to constantly poll for Salesforce to finish rendering the rich text field before updating its value.
        var pollForRTF = setInterval(function(){ 
            pollCounter++;

            if (pollCounter > 50) {
                clearInterval(pollForRTF);
            }

            if (!Ember.isEmpty(self.$())) { // A little more checking in case user navigates to another view right away
                var rtfField = self.$().find('iframe').contents();

                if (rtfField.length > 0 && rtfField.find('body').length > 0) {
                    clearInterval(pollForRTF);
                    
                    // This run later and re-finding of the body is a mod to make the RTF values populate in Firefox
                    Ember.run.later(this, function() {
                        if (!Ember.isEmpty(self.$())) { // A little more checking in case user navigates to another view right away
                        
                            var rtfBody = self.$().find('iframe').contents().find('body');
                            if (autofocus === true) {
                                rtfBody.focus();
                            }

                            if (!Ember.isNone(value)) {
                                rtfBody.html(value);
                            }
                            
                            if (!Ember.isNone(height)) {
                                self.$().find('.cke_contents').height(height);
                            }

                            if (bindingType === 'html') {
                                rtfBody.keyup(function(e) {
                                    var richText = $(e.target);

                                    richText.find('[style]').removeAttr('style');
                                    richText.find('[class]').removeAttr('class');

                                    var currentContent = richText.html();
                                    var previousContent = self.get('previousContent');

                                    self.set('value', currentContent);
                                    self.set('previousContent', currentContent);
                                });
                            } else if (bindingType === 'text') {
                                rtfBody.keyup(function(e) {
                                    var richText = $(e.target);

                                    richText.find('[style]').removeAttr('style');
                                    richText.find('[class]').removeAttr('class');

                                    var currentContent = richText.html();
                                    var previousContent = self.get('previousContent');

                                    self.set('value', e.target.textContent);
                                    self.set('previousContent', currentContent);
                                });
                            }
                        }
                    }, 300);
                }
            }
        }, 300);
    }
});