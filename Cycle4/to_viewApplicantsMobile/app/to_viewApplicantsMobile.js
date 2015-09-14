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

App.MainView = Ember.View.extend({
    didInsertElement: function() {
        var self = this;
        Ember.run.scheduleOnce('afterRender', this, function() {
            /*$('#filter-modal').on('shown.jui.modal', function() {
                console.log(this.$());
            });*/
            // iPhone CSS mod to handle scrolling with the containing div insted of the iframe
            // When Mobile Safari fixes how it resizes iframes to content, this can go away.
            if (isSF1) {  
                $('#mobileMainView').css({
                                    'max-height' : window.innerHeight,
                                    'overflow-y' : 'scroll',
                                    '-webkit-overflow-scrolling' : 'touch',
                                    'overflow-x' : 'none'
                                });

                // alert($('#mobileMainView').css('max-height'))
                // alert($('#mobileMainView').css('overflow-y'))
                // alert($('#mobileMainView').css('-webkit-overflow-scrolling'))
                // $('body').css({
                //     '-webkit-overflow-scrolling' : 'touch'
                // });
            }
        });
    }
});

App.MainController = Ember.ObjectController.extend(App.SearchAndResultsMixin, {
    isStageSelected: true,
    //currentApplicationIdBinding: 'controllers.viewApplicantsApplicationReader.application.Id',
    //isInlineFeedbackVisibleBinding: 'controllers.viewApplicantsApplicationReader.isInlineFeedbackVisible',
    shareUrl: function() {
        return window.location.href.replace(/&filter=.+/,'') + '&filter=' + encodeURIComponent(JSON.stringify(this.get('params')));
    }.property('params'),

    hideLoadMoreButton: function(){
        var modulo = this.get('results.total') > 10 ? this.get('results.total') % NUM_RESULTS_PER_SEARCH : 0;

        // console.log('MODULE: ', modulo);
        // console.log('TOTAL: ', this.get('results.total'));
        // console.log('VIEW: ', this.get('results.numberViewable'));


        return this.get('results.numberViewable') + modulo == this.get('results.total');
    }.property('results'),

    // hideLoadMoreButton: false,
    isSortByResumeFeedback: function(){
        return this.get('sortType') == 'Feedback_Score__c';
    }.property('sortType'),
    successFunction: function(self, res) {
        // console.log('SUCCES: ');

        var updateObj = {};
        var applicantId = self.get('applicantId');
        var params = self.get('params');

        App.formatResults(updateObj, res, params);
        self.setProperties(updateObj); 
        self.set('isLoadingResults', false);
    },

    setFilter: function(newFilters) {
        // console.log('CONTROLLER: ', this);

        var ctrl = this;
        var filters = this.get('filters');
        var params = {};
        var $button = this.get('$button');

        params.allOutcomes = true;
        params.stage = name;

        filters.clear();
        filters.pushObjects(newFilters);

        //ctrl.set('applicantId', applicantId);
        ctrl.notifyPropertyChange('filters');

        // $button.tooltipster('hide');
    },
    actions: {
        setIsStageSelected: function(isStageSelected) {
            this.set('isStageSelected', isStageSelected);
        },
        clickLoadMore: function() {

            // Could be done better
            var modulo = this.get('results.total') > 10 ? this.get('results.total') % NUM_RESULTS_PER_SEARCH : 0;
            if (this.get('results.numberViewable') + modulo == this.get('results.total')) {
                this.set('hideLoadMoreButton', true);
            } else {
                this.set('hideLoadMoreButton', false);
            };

            var self = this;
            var params = this.get('params');
            var numResultsPerSearch = this.get('numResultsPerSearch');
            var offset = this.get('results.numberViewable'); //+ numResultsPerSearch;

            this.set('isLoadingResults', true);

            params.offset = offset;
            params.limiter = numResultsPerSearch;
            this.set('params', params);

            var successFunction = function(self, res) {
                var updateObj = {};

                App.formatResults(updateObj, res, params);
                self.get('results.viewableApplications').addObjects(updateObj.results.viewableApplications);
                self.incrementProperty('results.numberViewable', updateObj.results.numberViewable);
                self.setProperties({
                    offset: offset,
                    isLoadingResults: false
                });
            };

            this.search(successFunction);
        },
        clickSetStageFilter: function(name) {
            var stageParams = {};

            stageParams.stage = name;

            var stageFilter = {
                name: 'stage',
                text: 'Stage and Status: ' + name + '; Any',
                params: stageParams
            };

            var outcomeParams = {};

            outcomeParams.noOutcome = true;
            outcomeParams.showHired = false;
            outcomeParams.showRejected = false;
            outcomeParams.showWithdrew = false;
            outcomeParams.allOutcomes = false;

            var outcomeFilter = {
                name: 'outcome',
                text: 'Outcome: No Outcome Yet',
                params: outcomeParams
            };

            this.setFilter([stageFilter, outcomeFilter]);
        },
        clickSetOutcomeFilter: function(name) {
            var params = {};

            params.allOutcomes = false;
            params.showHired = name === 'Hired';
            params.showRejected = name === 'Rejected';
            params.showWithdrew = name === 'Withdrew';

            var newFilter = {
                name: 'outcome',
                text: 'Outcome: ' + name,
                params: params
            }

            this.setFilter([newFilter]);
        },
        clickSetSourceFilter: function(name) {          
            var params = {};

            params.source = name;

            var sourceFilter = {
                name: 'source',
                text: 'Source: ' + name,
                params: params
            } 

            var outcomeParams = {};

            outcomeParams.noOutcome = true;
            outcomeParams.showHired = false;
            outcomeParams.showRejected = false;
            outcomeParams.showWithdrew = false;
            outcomeParams.allOutcomes = false;

            var outcomeFilter = {
                name: 'outcome',
                text: 'Outcome: No Outcome Yet',
                params: outcomeParams
            };

            this.setFilter([sourceFilter, outcomeFilter]);
        },
        clickApplicant: function(applicantId) {
            var ctrl = this;
            var filters = this.get('filters');
            var params = {};
            var $button = this.get('$button');

            params.allOutcomes = false;
            params.showHired = true;

            var newFilter = {
                name: 'outcome',
                text: 'Outcome: Hired',
                params: params
            }

            filters.clear();
            filters.pushObject(newFilter);

            // $button.tooltipster('hide');

            ctrl.set('applicantId', applicantId);
            ctrl.notifyPropertyChange('filters');
        }
    }
});


App.ResultController = Ember.ObjectController.extend({
    needs: ['main'],
    isLinkedIn: function(){
        return this.get('Source__c') == 'LinkedIn' ? true : false;
    }.property(),
    isInternal: function(){
        // console.log('SOURCE: ', this.get('results'));

        return this.get('Source__c') == 'Internal';
    }.property(), 
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
    actions: {
        loadLinkedIn2: function(){
            sforce.one.navigateToURL('google.com');
        },
        // loadLinkedIn: function(){
        //     if(Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'))){
        //         var address = 'https://www.google.com?#q=' + this.get('First_Name__c') + ' ' + this.get('Last_Name__c') + ' site://linkedin.com'
        //         if (isSF1){
        //             sforce.one.navigateToURL(address);
        //         } else {
        //             window.location.href = address; 
        //         }
        //     } else {
        //         var address = 'https://www.linkedin.com/profile/view?id=' + this.get('LinkedIn_Profile_Id__c');

        //         if (isSF1) {
        //             if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
        //                 var now = new Date().valueOf();
        //                 setTimeout(function () {
        //                     if (new Date().valueOf() - now > 300) return;
        //                     sforce.one.navigateToURL(address);
        //                 }, 100);

        //                 sforce.one.navigateToURL('linkedin://#profile/' + this.get('LinkedIn_Profile_Id__c'));
        //             } else {
        //                 var response = confirm('Sorry, this isn’t supported yet. Would you like the information sent to you via email?');
        //                 if(response){
        //                     cont.sendLinkedInEmail(this.get('Id'), function(){});
        //                 }

        //                 sforce.one.navigateToURL(address);
        //             }
        //         } else {
        //             window.location.href = address;
        //         }
        //     }
        // },


        loadLinkedIn: function(){
            if(Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'))){
                var address = 'https://www.linkedin.com/vsearch/p?type=people&keywords=' + this.get('First_Name__c') + '+' + this.get('Last_Name__c')

                    sforce.one.navigateToURL(address);
            } else {
                var linkedInId = this.get('LinkedIn_Profile_Id__c');

                var address = 'https://touch.www.linkedin.com/#profile/' + linkedInId;

                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
                    var now = new Date().valueOf();
                    setTimeout(function () {
                    if (new Date().valueOf() - now > 300) return;
                    sforce.one.navigateToURL(address);
                }, 100);

                    sforce.one.navigateToURL('linkedin://#profile/' + linkedInId);

                } else {
                    sforce.one.navigateToURL(address);
                }

            }
        },

        viewTalentProfile : function(){
            var url = '/apex/to_talentProfileView?userId=' + this.get('Candidate_User__c');

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url;
            }
        },
        viewApplicationReader : function(){
            var url = '/apex/to_applicationReader?Id=' + this.get('Id');
            //sforce.one.navigateToURL(url); 

            if(isSF1){
                sforce.one.navigateToURL(url); 
            } else {
                window.location.href = url;
            }
        },
        // viewResume : function(){
        //     console.log('RESUME:: ');

        //     var url = '/' + this.get('Resume_Post_Id__c');

        //     if(isSF1){
        //         sforce.one.navigateToURL(url);
        //     } else {
        //         window.location.href = url;
        //     }
        // },

        viewResume: function(){
            sforce.one.navigateToFeedItemDetail(this.get('Resume_Post_Id__c'));
        }
    }
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

            // var resolveObj = {
            //     applicationStageAndStatuses: getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace),
            //     applicationSources: initData.sourceCounts.getEach('name'),
            //     maxApplicationRating: initData.maxApplicationRating,
            //     maxInterviewScore: initData.maxInterviewScore,
            //     sortOptions: App.Fixtures.get('sortOptions'),
            //     sortType: scoreSort,
            //     locations: [],
            //     filterOptions: ['Stage and Status', 'Application Rating', 'Interview Feedback', 'Applied On', 'Source', 'Threshold', 'Location', 'Outcome'],
            //     filters: [],
            //     initParams: params
            // };

            var resolveObj = {
                    applicationStageAndStatuses: getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace),
                    applicationSources: initData.sourceCounts.getEach('name'),
                    disposition: getDependentOptions(apiKey, 'Application__c', 'Outcome__c', 'Disposition__c', namespace)['Rejected'],
                    maxApplicationRating: initData.maxApplicationRating,
                    maxInterviewScore: initData.maxInterviewScore,
                    sortOptions: App.Fixtures.get('sortOptions'),
                    sortType: params.sortType,//scoreSort,
                    allowRejection: initData.allowRejection,
                    allowNeutral: initData.allowNeutral,
                    locations: [],
                    filterOptions: ['Stage and Status', 'Application Rating', 'Interview Feedback', 'Applied On', 'Source', 'Threshold', 'Location', 'Outcome'],
                    filters: [],
                    initParams: params,
                    applicantId: !Ember.isEmpty(appIdParam) ? appIdParam : null,
                    initLimiter: params.limiter,
                    requisition: initData.requisition,
                    hiringManager: !Ember.isNone(initData.requisition.Hiring_Manager__r) ? initData.requisition.Hiring_Manager__r : null
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
            

            // console.log('RESOLVE OBJ: ', resolveObj);
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
