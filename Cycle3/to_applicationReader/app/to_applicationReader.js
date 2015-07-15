App = Ember.Application.create({
    rootElement: '#application'
});

App.Router.map(function(){
    this.resource('main', {path: '/'});
});

var searchTimer = null;

App.ApplicationReaderView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            // iPhone CSS mod to handle scrolling with the containing div insted of the iframe
            // When Mobile Safari fixes how it resizes iframes to content, this can go away.
            if (isSF1) {
                $('#mobileMainView').css({
                    'max-height' : window.innerHeight,
                    'overflow-y' : 'scroll',
                    '-webkit-overflow-scrolling' : 'touch'
                });
            }
        });
    }
});

App.ApplicationReaderRoute = Ember.Route.extend({
    model: function (){
        parsedJson.labels = labels
        parsedJson.talentProfile.labels = labels
        var jobQuestions = Ember.A();
        var generalQuestions = Ember.A();

        if(parsedJson.application.Applicant_Responses__r && parsedJson.application.Applicant_Responses__r.records){
            parsedJson.application.Applicant_Responses__r.records.forEach(function(resp){
                if(!Ember.isEmpty(jobQuestions.findBy('Form_Element__c', resp.Form_Element__c))){
                   var foundResp =  jobQuestions.findBy('Form_Element__c', resp.Form_Element__c);
                   foundResp.Value__c += ', ' + resp.Value__c
                } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){
                   var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
                   foundResp.Value__c += resp.Value__c
                } else {
                    if(resp.Form_Element__r.Section__c == 'Job Specific'){
                        jobQuestions.addObject(Ember.Object.create(resp));
                    } else if(resp.Form_Element__r.Section__c == 'General'){
                        generalQuestions.addObject(Ember.Object.create(resp));
                    }
                }
            });
        }

        if(parsedJson.application.Evaluation_Lookups__r && parsedJson.application.Evaluation_Lookups__r.records){
            parsedJson.evaluations = parsedJson.application.Evaluation_Lookups__r.records
        }

        parsedJson.jobQuestions = jobQuestions;
        parsedJson.generalQuestions = generalQuestions;

        return Ember.Object.create(parsedJson);
    }
});

App.InterviewController = Ember.ObjectController.extend({
    formattedStartDate : function(){
        var timeSlot = this.get('namespace_Interview_Time_Slots__r').records[0];
        return moment(timeSlot.namespace_Start_Time__c).tz(this.get('parentController').get('timeZone')).format('ddd, MMM DD, YYYY @ HH:mma z').replace('am', 'a').replace('pm', 'p');
    }.property(''),
    otherText : function(){
        var totalTimeSlots = this.get('namespace_Interview_Time_Slots__r').records.length;
        if(totalTimeSlots > 1){
            return '(and ' + (totalTimeSlots - 1) + ' more)'
        } else {
            return '';
        }
    }.property('')
});

App.FeedbackController = Ember.ObjectController.extend({
    headerText : function(){
        var headerText = '';
        if(this.get('hasFinal')){
            headerText = 'Final Selection'
        } else if(Ember.isEmpty(this.get('Interview__c'))){
            headerText = 'Resume Review'
        } else if(this.get('Interview__r').Topics__c){
            headerText = this.get('Interview__r').Topics__c;
        } else {
            headerText = this.get('Interview__r').Interviewers__c
        }

        return headerText;
    }.property(''),
    icon : function(){
        var icon = '';
        var feedback = this.get('Net_Feedback_Score__c');

        if(this.get('namespace_Rejected__c')){
            icon = 'juicon-ban'
        } else if(this.get('namespace_Selected__c')){
            icon = 'juicon-check'
        } else if(feedback == 1){
            icon = 'juicon-like'
        } else if (feedback == 0){
            icon = 'juicon-question-circle'
        } else if (feedback == -1){
            icon = 'juicon-dislike'
        }

        return icon
    }.property(''),
    iconColor : function(){
        var iconColor = '';
        var feedback = this.get('Net_Feedback_Score__c');
        if(this.get('namespace_Rejected__c')){
            iconColor = 'text-error'
        } else if(feedback == 1 || this.get('namespace_Selected__c')){
            iconColor = 'text-success'
        } else if (feedback == 0){
            iconColor = 'text-info'
        } else if (feedback == -1){
            iconColor = 'text-warning';
        }

        return iconColor;
    }.property(''),
    hasFinal : function(){
        return (this.get('namespace_Rejected__c') || this.get('namespace_Selected__c'))
    }.property(''),
    criteriaFields : function(){
        var self = this;
        var processedFields = Ember.A();
        var criteriaFields = this.get('parentController').get('additionalCriteriaFields');
        //var hasCriteria = false; //if every criterifield is empty we have no criterias

        if(!Ember.isEmpty(criteriaFields)){
            criteriaFields.forEach(function(field){
                var obj = {}
                obj.label = field.label
                obj.value = self.get(field.name);
                if(!Ember.isEmpty(obj.value)){
                    //hasCriteria = true;
                }
                processedFields.addObject(obj);
            });
        }

        //this.set('hasCriteria', hasCriteria)
        return processedFields;
    }.property(''),
    formattedDate : function(){
        return moment(this.get('CreatedDate')).format('MMM DD, YYYY')
    }.property(''),
    displayPanelBottom : function(){
        var hasCriteria = this.get('hasCriteria');
        var hasComments = !Ember.isEmpty(this.get('Comments__c'));
        var hasDisposition = !Ember.isEmpty(this.get('namespace_Disposition__c'))
        return (hasCriteria || hasComments || hasDisposition)
    }.property('')
});

App.ApplicationReaderController = Ember.ObjectController.extend({
    actions : {
        provideFeedback : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewFeedback?id=' + this.get('application').Id + 
                      '&retUrl=/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        },
        addInterview : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewNewEdit?appId=' + this.get('application').Id + 
                      '&retUrl=/apex/' + extnamespace + 'to_applicationReader?id=' + this.get('application').Id

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        }
    }
});


Ember.Handlebars.helper('pluralfication', function(records, name) {
    if(records.length > 1){
        if(name.charAt(name.length - 1) == 'y'){
            return name.slice(0, name.length - 1) + 'ies';
        } else {
            return name + 's';
        }
    } else {
        return name;
    }
});

Ember.Handlebars.helper('convertNewLinesToBreaks', function(text, name) {
    if(text){
        return new Ember.Handlebars.SafeString(text.replace(/\n/g, '<br/>'));
    } else {
        return '';
    }
});

Ember.Handlebars.helper('formateDateWithPartition', function(date, secondPart, text) {
    if(Ember.isEmpty(date) && Ember.isEmpty(secondPart)){
        return '';
    } else if(Ember.isEmpty(date)){
        return secondPart;
    } else if(Ember.isEmpty(secondPart)){
        return moment(date).format('MMM DD, YYYY');
    } else {
        return moment(date).format('MMM DD, YYYY') + ' ' + text + ' ' + secondPart;
    }
});

Ember.Handlebars.helper('formatDate', function(date) {
    if(Ember.isEmpty(date)){
        return '';
    } else {
        return moment(date).format('MMM DD, YYYY');
    }
});

Ember.Handlebars.helper('displayDate', function(startDate, endDate, text) {
    if(Ember.isEmpty(startDate)){
        return '';
    } else if(Ember.isEmpty(endDate)){
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' Present')
    } else {
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' ' + moment(endDate).format('MMM DD, YYYY'))
    }
});

Ember.Handlebars.helper('displayMonthYear', function(month, year) {
    if(Ember.isEmpty(month) || Ember.isEmpty(year)){
        return '';
    } else {
        formattedMonth = monthMap[month] ? monthMap[month].slice(0, 3) : '';
        return formattedMonth + ' ' + year;
    }
});

Ember.Handlebars.helper('displayMonthYearRange', function(startMonth, startYear, endMonth, endYear, text) {
    if(Ember.isEmpty(startMonth) || Ember.isEmpty(startYear)){
        return '';
    } else if(Ember.isEmpty(endMonth) || Ember.isEmpty(endYear)){
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        return (formattedStartMonth + ' ' + startYear + ' ' + text + ' Present');
    } else {
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        formattedEndMonth = monthMap[endMonth] ? monthMap[endMonth].slice(0, 3) : '';

        return formattedStartMonth + ' ' + startYear + ' ' + text + ' ' + formattedEndMonth + ' ' + endYear ;
    }
});

App.Router.map(function() {
    this.resource('applicationReader', { path: '/' });
});