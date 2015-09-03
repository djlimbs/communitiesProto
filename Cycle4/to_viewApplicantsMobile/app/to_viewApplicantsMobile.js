// Kick off Ember
// App = Ember.Application.create({
//     rootElement: '#application'
// });


Ember.Handlebars.helper('formatDate', function(date) {
    if(Ember.isEmpty(date)){
        return '';
    } else {
        return moment(date).format('MMM DD, YYYY');
    }
});


App.Fixtures = Ember.Object.create({
    // savedApplications: [],
    // storedMainData: null,
    emptyParams: {
        reqId: reqId,
        stage : null,
        status : null,
        ratingDirection : null,
        rating : null,
        interviewDirection: null,
        interviewScore: null,
        appliedFrom : null,
        appliedTo : null,   
        source : null,
        threshold : null,
        radius : null,
        units : null,
        location : null,
        showHired : false,
        showWithdrew : false,
        showRejected : false,
        noOutcome: false,
        allOutcomes: true,
        sortType : null, //(field set field, Applied_On__c, don't know what interview score is, Last_Name__c, Feedback_Score__c
        offset : 0
    },
    sortOptions: [
        {
            label: 'Application Rating',
            value: scoreSort // if scoreSort != Raw_Score__c, dont show maximum in filter
        },
        {
            label: 'Applied On Date',
            value: 'Applied_On__c'
        },
        {
            label: 'Interview Feedback',
            value: 'namespace_Interview_Score__c'
        },
        {
            label: 'Last Name',
            value: 'Last_Name__c'
        },
        {
            label: 'Resume Feedback',
            value: 'Feedback_Score__c'
        } 
    ]
});




App.SearchFilterComponent = Ember.Component.extend(App.SearchFilterMixin, {
    layoutName: 'components/searchFilter'
});



App.MainController = Ember.ObjectController.extend(App.SearchAndResultsMixin, {
    //currentApplicationIdBinding: 'controllers.viewApplicantsApplicationReader.application.Id',
    //isInlineFeedbackVisibleBinding: 'controllers.viewApplicantsApplicationReader.isInlineFeedbackVisible',
    shareUrl: function() {
        return window.location.href.replace(/&filter=.+/,'') + '&filter=' + encodeURIComponent(JSON.stringify(this.get('params')));
    }.property('params'),
    successFunction: function(self, res) {
        console.log('SUCCES: ');
        console.log('THE RES: ', res);

        var updateObj = {};
        var applicantId = self.get('applicantId');
        var params = self.get('params');

        App.formatResults(updateObj, res, params);
        self.setProperties(updateObj);
        self.set('isLoadingResults', false);
    },
    actions: {
        clickLoadMore: function() {
            var self = this;
            var params = this.get('params');
            var numResultsPerSearch = this.get('numResultsPerSearch');
            var offset = this.get('offset') + numResultsPerSearch;

            this.set('isLoadingResults', true);

            params.offset = offset;

            var successFunction = function(res) {
                var updateObj = {};

                App.formatResults(updateObj, res, params);
                self.get('results.viewableApplications').addObjects(updateObj.results.viewableApplications);
                self.incrementProperty('results.numberViewable', updateObj.results.numberViewable);
                self.setProperties({
                    offset: offset,
                    isLoadingResults: false
                });
            };

            this.search(params, successFunction);
        }
    }
});

App.ResultController = Ember.ObjectController.extend({
    alertStatusClass: function() {
        var alertStatus = this.get('Alert_Status__c');
        return Ember.isEmpty(alertStatus) ? null : alertStatus === 'Warning' ? 'has-problem-warning' : 'has-problem-error';
    }.property(),
    applicationRatingVal: function() {
        return this.get(scoreSort);
    }.property('parentController.results.viewableApplications'),
    hasApplicationRatingVal: function() {
        return !Ember.isNone(this.get(scoreSort));
    }.property('parentController.results.viewableApplications'),
    ratingClass: function() {
        return this.get('applicationRatingVal') >= 0 ? 'text-success' : 'text-error'; 
    }.property('applicationRatingVal'),
    resultPartial: function() {
        var sortTypeLabel = this.get('parentController.sortOptions').findBy('value', this.get('parentController.sortType')).label;
        return (sortTypeLabel + ' Results').camelize(); 
    }.property('parentController.sortType'),
    resumeFeedbackScore: function() {
        var evaluations = this.get('Evaluation_Lookups__r');
        var resumeFeedbackObj = {
            negativeFeedback: 0,
            positiveFeedback: 0,
            neutralFeedback: 0
        };

        if (!Ember.isNone(evaluations)) {
            var resumeEvals = evaluations.records.filter(function(eval) {
                return Ember.isNone(eval.Interview__c);
            });

            resumeEvals.forEach(function(eval) {
                resumeFeedbackObj.negativeFeedback += eval.Negative_Feedback__c;
                resumeFeedbackObj.positiveFeedback += eval.Positive_Feedback__c;
                resumeFeedbackObj.neutralFeedback += eval.Neutral__c;
            });
        }

        return resumeFeedbackObj;
    }.property('parentController.sortType'),
    interviewFeedbackScore: function() {
        var evaluations = this.get('Evaluation_Lookups__r');
        var interviewFeedbackObj = {
            negativeFeedback: 0,
            positiveFeedback: 0,
            neutralFeedback: 0
        };

        if (!Ember.isNone(evaluations)) {
            var interviewEvals = evaluations.records.filter(function(eval) {
                return !Ember.isNone(eval.Interview__c);
            });

            interviewEvals.forEach(function(eval) {
                interviewFeedbackObj.negativeFeedback += eval.Negative_Feedback__c;
                interviewFeedbackObj.positiveFeedback += eval.Positive_Feedback__c;
                interviewFeedbackObj.neutralFeedback += eval.Neutral__c;
            });
        }

        return interviewFeedbackObj;
    }.property('parentController.sortType'),
});


App.MainRoute = Ember.Route.extend({
        model: function (){
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var params; 

            if (Ember.isEmpty(filterParams)) {
                // Empty params

                params = JSON.parse(JSON.stringify(App.Fixtures.get('emptyParams')));

                params.noOutcome = true;
                params.allOutcomes = false;
                params.sortType = scoreSort;
            } else {
                params = JSON.parse(decodeURIComponent(filterParams));
            }

            var resolveObj = {
                applicationStageAndStatuses: getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace),
                applicationSources: initData.sourceCounts.getEach('name'),
                maxApplicationRating: initData.maxApplicationRating,
                maxInterviewScore: initData.maxInterviewScore,
                sortOptions: App.Fixtures.get('sortOptions'),
                sortType: scoreSort,
                locations: [],
                filterOptions: ['Stage and Status', 'Application Rating', 'Interview Feedback', 'Applied On', 'Source', 'Threshold', 'Location', 'Outcome'],
                filters: [],
                initParams: params
            };

            var anyStatuses = [];
            Object.keys(resolveObj.applicationStageAndStatuses).forEach(function(key) {
                anyStatuses.addObjects(resolveObj.applicationStageAndStatuses[key]);
            });
            resolveObj.applicationStageAndStatuses['Any'] = anyStatuses;

            App.formatHeaderNumbers(resolveObj, initData);
            //App.formatResults(resolveObj, res, params);
            // Format locations
            if (!Ember.isNone(initData.requisition.Job_Locations__r)) {
                initData.requisition.Job_Locations__r.records.forEach(function(location) {
                    resolveObj.locations.addObject({
                        geolocation: !Ember.isNone(location.Location__r.Geographical_Location__c) ? 
                                        location.Location__r.Geographical_Location__c.latitude + ', ' + location.Location__r.Geographical_Location__c.longitude :
                                        null,
                        name: location.Location__r.Name,
                        label: location.Location__r.Name
                    });
                });
            }

            // Format filters
            //resolveObj.filters.addObjects(App.convertParamsToFilters(params));
            

            console.log('RESOLVE OBJ: ', resolveObj);
            // App.Fixtures.set('storedMainData', resolveObj);
            resolve(resolveObj);
        });
    },
    afterModel: function(model, transition) {
        //this.transitionTo('viewApplicantsApplicationReader', model.results.viewableApplications[0].Id);
    }
});

// Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen({
    location: 'none'
});
