App.Router.map(function(){
    this.resource('main', {path: '/'});
});

var searchTimer = null;
var monthMap = {}

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

            $('body').tooltip({
                selector: '[data-toggle=tooltip]'
            });
 
            //javascript snippet to make the go to top button
            $(document).ready(function() {
                var backToTop = $('#back-to-top'),
                    contentContainer = $('body .scope-container > .content');
                
                function setPos() {
                    var topPos = $(window).height() - ($(window).height() / 6),
                        leftPos = contentContainer.offset().left + (contentContainer.width());
                        
                        backToTop.css('top', topPos + 'px')
                            .css('left', leftPos + 'px');
                }
                
                setPos();
                
                $(window).resize(setPos);
                
                $(window).scroll(function() {
                    if ($(window).scrollTop() > $(window).height()) {
                        backToTop.fadeIn(250);
                    } else {
                        backToTop.fadeOut(250);
                    }
                });
                
                backToTop.click(function() {
                    $('body, html').animate({
                        scrollTop: 0
                    }, 500);
                    
                    return false;
                });
            });
        });
    }
});

Ember.Application.initializer({
    name : 'ember-null-first-prompt',
    initialize: function(container, application) {
        Ember.Select.reopen({
            didInsertElement: function () {
                if (this.prompt) {
                    this.$('option:first').attr('disabled', true);
                }
            }
        });
    }
});

App.ApplicationReaderRoute = Ember.Route.extend({
    model: function (){
        monthMap = parsedJson.monthMap;
        //parsedJson.labels = labels
        

        return Ember.Object.create(applicationReaderProcesser(parsedJson));
    }
});

App.TabController = Ember.ObjectController.extend({
    isDisabled : function(){

    }.property('parentController.selectedTab'),
});

App.InterviewController = Ember.ObjectController.extend(App.InterviewMixin, App.CamelizeModelMixin, {
    retPage : 'to_applicationReader'
});

App.FeedbackController = Ember.ObjectController.extend(App.FeedbackMixin, App.CamelizeModelMixin);

App.ApplicationReaderController = Ember.ObjectController.extend(App.ApplicationReaderMixin, {
    retPage : 'to_applicationReader'
});

App.OtherAppsController = Ember.ObjectController.extend(App.OtherAppsMixin, App.CamelizeModelMixin);

App.AdditionalInfoController = Ember.ObjectController.extend(App.AdditionalInfoMixin);


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
        return (moment(startDate).format('MMM DD, YYYY') + ' ' + text + ' ' + labels.present)
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
        return (formattedStartMonth + ' ' + startYear + ' ' + text + ' ' + labels.present);
    } else {
        formattedStartMonth = monthMap[startMonth] ? monthMap[startMonth].slice(0, 3) : '';
        formattedEndMonth = monthMap[endMonth] ? monthMap[endMonth].slice(0, 3) : '';

        return formattedStartMonth + ' ' + startYear + ' ' + text + ' ' + formattedEndMonth + ' ' + endYear ;
    }
});

Ember.Handlebars.helper('formatSize', function(size) {
    var formattedSize = '';
    if(size >= 1000){
        formattedSize = '(' + Math.floor(size/1000) + 'KB)';
    } else if (size >= 100000){
        formattedSize = '(' + Math.floor(size/100000) + 'MB)';
    } else if (size > 0) {
        formattedSize = '(' + size + 'B)';
    }

    return formattedSize;
});

App.Router.map(function() {
    this.resource('applicationReader', { path: '/' });
});

function applicationReaderProcesser(parsedJson){
    parsedJson.talentProfile.labels = labels
    parsedJson.application.formattedCreatedDate = moment(parsedJson.application.CreatedDate).format('MMM DD, YYYY')
    var jobQuestions = Ember.A();
    var generalQuestions = Ember.A();

    if(Ember.isEmpty(parsedJson.photoUrl)){
        parsedJson.photoUrl = defaultIconUrl;
    }

    contactRows = Ember.A();
    contactRow = Ember.A();

    //we need to split up the additional contact fields into a 2d array where each row is a max length of 2 items. 
    //This is done so the css is able to handle uneven height of the fields.
    parsedJson.contactFields.forEach(function(f){
        if(contactRow.length == 2){
            contactRows.push(contactRow);
            contactRow = Ember.A();
        }

        f.value = parsedJson.application[f.name];
        contactRow.push(f);
    });

    contactRows.push(contactRow);
    parsedJson.contactRows = contactRows;

    //find the values of the fields that are in the field set
    if(parsedJson.talentProfile.Education_Histories__r && parsedJson.talentProfile.Education_Histories__r.records){
        parsedJson.talentProfile.Education_Histories__r.records.forEach(function(edu){
            var fieldSet = [];
            parsedJson.eduFields.forEach(function(f) {
                f.value = edu[f.name];
                fieldSet.push(f);
            });

            edu.fieldSet = fieldSet;
        })
    }

    //find the values of the fields that are in the field set
    if(parsedJson.talentProfile.Employment_Histories__r && parsedJson.talentProfile.Employment_Histories__r.records){
        parsedJson.talentProfile.Employment_Histories__r.records.forEach(function(employ){
            var fieldSet = [];
            parsedJson.employFields.forEach(function(f) {
                f.value = employ[f.name];
                fieldSet.push(f);
            });

            employ.fieldSet = fieldSet;
        })
    }

    parsedJson.talentProfile.camelizedModel = App.camelizeObj(parsedJson.talentProfile);

    //if we have questions split them up into jobQuestions and generalQuestions
    if(parsedJson.application.Applicant_Responses__r && parsedJson.application.Applicant_Responses__r.records){
        parsedJson.application.Applicant_Responses__r.records.forEach(function(resp){
            //if we have any previous found checkbox repsonses we need to group them up.
            if(!Ember.isEmpty(jobQuestions.findBy('Form_Element__c', resp.Form_Element__c))){   //this if is checking for jobQuestion checkboxes
               var foundResp =  jobQuestions.findBy('Form_Element__c', resp.Form_Element__c);
               foundResp.Value__c += ', ' + resp.Value__c
            } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){  //this if is checking for generalQuestions checkboxes
               var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
               foundResp.Value__c += ', ' + resp.Value__c
            } else {
                if(resp.Form_Element__r.Section__c == 'Job Specific'){
                    jobQuestions.addObject(Ember.Object.create(resp));
                } else if(resp.Form_Element__r.Section__c == 'General'){
                    generalQuestions.addObject(Ember.Object.create(resp));
                }
            }
        });
    }

    parsedJson.positiveFeedback = 0;
    parsedJson.negativeFeedback = 0;
    parsedJson.neutralFeedback = 0;

    if(parsedJson.application.Evaluation_Lookups__r && parsedJson.application.Evaluation_Lookups__r.records){
        parsedJson.evaluations = parsedJson.application.Evaluation_Lookups__r.records
        parsedJson.evaluations.forEach(function(evaluation){
            if(evaluation.Interview__c != null){
                if(evaluation.Positive_Feedback__c != 0){
                    parsedJson.positiveFeedback += 1;
                } else if(evaluation.Negative_Feedback__c != 0){
                    parsedJson.negativeFeedback += 1;
                } else {
                    parsedJson.neutralFeedback += 1
                }

                evaluation.Interview__r.camelizedModel = App.camelizeObj(evaluation.Interview__r);
            }
        })
    }

    parsedJson.application.showMax = parsedJson.scoreSort == 'Raw_Score__c' //if the scoring type isn't the default Raw_Score don't show the maximum
    parsedJson.application.score = parsedJson.application[parsedJson.scoreSort];

    if(parsedJson.application.showMax){
        parsedJson.application.hasScore = !Ember.isEmpty(parsedJson.application.score) && !Ember.isEmpty(parsedJson.application.Maximum_Score__c);
    } else {
        parsedJson.application.hasScore = !Ember.isEmpty(parsedJson.application.score);
    }
    

    if(parsedJson.application.hasScore){
        if(parsedJson.application.score >= 0) {
            parsedJson.application.ratingColor = 'text-success';
        } else if(parsedJson.application.score < 0) {
            parsedJson.application.ratingColor = 'text-error';
        }
    }

    parsedJson.selectedTab = 'application';
    parsedJson.application = Ember.Object.create(parsedJson.application);
    //helper function defined in toHelpers allows us to get a list of dependent picklists to use.
    parsedJson.statusOptions = getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace);
    parsedJson.jobQuestions = jobQuestions;
    parsedJson.generalQuestions = generalQuestions;
    parsedJson.selectedStage = parsedJson.application.Stage__c;
    parsedJson.selectedStatus = parsedJson.application.Status__c;
    parsedJson.firstTime = true;
    parsedJson.isSF1 = isSF1;

    return parsedJson;
}