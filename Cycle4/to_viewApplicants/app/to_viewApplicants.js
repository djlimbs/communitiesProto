/*
var params = {
reqId : reqId,
stage : this.get('selectedStage'),
status : this.get('selectedStatus'),
ratingDirection : '>',
rating : ratingNumber,
appliedFrom : MM/DD/YYYY,
appliedTo : MM/DD/YYYY,	
source : this.get('selectedSource'),
threshold : string,
radius : number,
units : string,
location : 'latitude, longitude' of location,
showHired : boolean,
showWithdrew : this.get('showWithdrew'),
showRejected : this.get('showRejected'),
sortType : this.get('selectedSort'), //(field set field, Applied_On__c, don't know what interview score is, Last_Name__c, Feedback_Score__c
offset : self.get('offset')
};
*/

// PUT THESE IN A COMMON FILE
/*******************Applicant Reader Common**************************/
function applicationReaderProcesser(parsedJson){
    parsedJson.talentProfile.labels = labels
    parsedJson.application.formattedCreatedDate = moment(parsedJson.application.CreatedDate).format('MMM DD, YYYY')
    var jobQuestions = Ember.A();
    var generalQuestions = Ember.A();

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

    // camelize talent profile fields
    parsedJson.talentProfile.camelizedModel = App.camelizeObj(parsedJson.talentProfile);

    //if we have questions split them up into jobQuestions and generalQuestions
    var markupByScore = {
        '1': '<span class="juicon juicon-like text-success mar--sm--lxs"></span>',
        '0': '<span class="juicon juicon-question-circle text-info mar--sm--lxs"></span>',
        '-1': '<span class="juicon juicon-dislike text-error mar--sm--lxs"></span>',
        'disqualify': '<span class="juicon juicon-ban text-error mar--sm--lxs"></span>'
    };

    if(parsedJson.application.Applicant_Responses__r && parsedJson.application.Applicant_Responses__r.records){
        parsedJson.application.Applicant_Responses__r.records.forEach(function(resp){
            var scoreMarkup = resp.Disqualified__c === true ? markupByScore.disqualify : markupByScore[resp.Score__c];

            //if we have any previous found checkbox repsonses we need to group them up.
            if(!Ember.isEmpty(jobQuestions.findBy('Form_Element__c', resp.Form_Element__c))){   //this if is checking for jobQuestion checkboxes
               	var foundResp =  jobQuestions.findBy('Form_Element__c', resp.Form_Element__c);

               	if (!Ember.isEmpty(scoreMarkup)) {
               		foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
               	}
            } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){  //this if is checking for generalQuestions checkboxes
               	var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
               	if (!Ember.isEmpty(scoreMarkup)) {
               		foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
               	}
            } else {
                if (!Ember.isEmpty(scoreMarkup)) {
                	resp.Value__c += scoreMarkup;
                }
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
//Ember.LOG_BINDINGS = true

/*Ember.subscribe('render', {
  before: function(name, start, payload){
    return start
  },
  after: function(name, end, payload, start){
    var duration = Math.round(end - start)
    var template = payload.template
    console.log(name)
    console.log(payload)
    console.log(duration);
    //console.log(payload);
    if (template){ // this is to filter out anonymous templates
      console.log('rendered', template, 'took', duration, 'ms')
    }
  }
})
*/

var monthMap = null;

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

Ember.Component.reopen({
	labels: labels
});

App.CamelizeModelMixin = Ember.Mixin.create({
	camelizedModel: function() {
		var model = this.get('model');
		return App.camelizeObj(model);
	}.property('model')
});

App.Fixtures = Ember.Object.create({
	savedApplications: [],
	storedMainData: null,
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

Ember.Select.reopen({
    didInsertElement: function () {
        if (this.prompt) {
            this.$('option:first').attr('disabled', true);
        }
    }
});

App.ApplicantTotalsComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'filters', 'ctrl', 'toggleUpdateHeader'],
	isStageSelected: true,
	layoutName: 'components/viewApplicantsStageStatusTooltip',
	setFilter: function(newFilters) {
		var ctrl = this.get('ctrl');
		var filters = this.get('filters');
		var params = {};
		var $button = this.get('$button');

		params.allOutcomes = true;
		params.stage = name;

		filters.clear();
		filters.pushObjects(newFilters);

		//ctrl.set('applicantId', applicantId);
		ctrl.notifyPropertyChange('filters');

		$button.tooltipster('hide');
	},
	actions: {
		setIsStageSelected: function(isStageSelected) {
    		this.set('isStageSelected', isStageSelected);
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

			this.setFilter([sourceFilter]);
    	}
	}
});

App.FilledInfoComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'filters', 'ctrl'],
	layoutName: 'components/viewApplicantsFilledTooltip',
	actions: {
		clickApplicant: function(applicantId) {
			var ctrl = this.get('ctrl');
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

			$button.tooltipster('hide');

			ctrl.set('applicantId', applicantId);
			ctrl.notifyPropertyChange('filters');
		}
	}
});

App.UpdateStatusComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'ctrl'],
	layoutName: 'components/updateStatus',
	applicationStages: function() {
		return Object.keys(this.get('ctrl.applicationStageAndStatuses')).reject(function(status) { return status === 'Any'; });
	}.property(),
	applicationStatuses: function() {
		var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
		return statuses;
	}.property('stage'),
	customInitializer: function() {
		var self = this;
		var $button = this.get('$button');
		var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
		
		$button.on('click', function(e) {
            var currentStage = self.get('ctrl.application.Stage__c');
            var currentStatus = self.get('ctrl.application.Status__c');
			if (!Ember.isNone(currentStage)) {
				self.set('stage', currentStage);
			}

			if (!Ember.isNone(statuses)) {
				self.set('status', !Ember.isNone(currentStatus) ? currentStatus : statuses[0]);
			}	
		});
			
	},
	actions: {
		clickUpdateStatus: function() {
			var self = this;
			var ctrl = this.get('ctrl');
			var appId = this.get('ctrl.application.Id');
			var bulkUpdateObj = {
				stage: this.get('stage'),
				status: this.get('status'),
				appIds: [appId]
			};
			
			cont.bulkUpdateStatus(JSON.stringify(bulkUpdateObj), function(res, evt) {
				if (res) {
					res = parseResult(res);

					if (res.isSuccess) {
						// UPDATE STORED APPS' STAGE AND STATUS
						var savedApp = App.Fixtures.get('savedApplications').findBy('application.Id', appId);
						var previousStage = savedApp.get('application.Stage__c');
						var previousStageCount = initData.stageCounts.findBy('name', previousStage);
						var newStageCount = initData.stageCounts.findBy('name', bulkUpdateObj.stage);
                        var viewApplicantsController = ctrl.get('controllers.viewApplicants');

						savedApp.set('application.Stage__c', bulkUpdateObj.stage);
						savedApp.set('application.Status__c', bulkUpdateObj.status);

						ctrl.set('application.Stage__c', bulkUpdateObj.stage);
						ctrl.set('application.Status__c', bulkUpdateObj.status);

						previousStageCount.total--;

						if (Ember.isNone(newStageCount)) {
							initData.stageCounts.addObject({
								name: bulkUpdateObj.stage,
								total: 1
							});
						} else {
							newStageCount.total++;
						}

						var newHeaderData = {};

						App.formatHeaderNumbers(newHeaderData, initData);
                        var appInResults = viewApplicantsController.get('results.viewableApplications').findBy('Id', appId);
                        var appInResultsIndex = viewApplicantsController.get('results.viewableApplications').indexOf(appInResults);
                        viewApplicantsController.set('indexToGoto', appInResultsIndex);
						viewApplicantsController.set('totalApplicants', newHeaderData.totalApplicants);
						viewApplicantsController.notifyPropertyChange('sortType');

					} else {
						// ERROR
					}
				} else {
					// ERROR
				}
			});
		}
	}
});

App.SearchFilterComponent = Ember.Component.extend(App.SearchFilterMixin, {
	layoutName: 'components/searchFilter'
});

App.BackToTopComponent = Ember.Component.extend({
	layoutName: 'components/backToTop',
	afterRenderEvent: function() {
		var backToTop = $('#back-to-top'),
	        contentContainer = $('body .scope-container .js-profile-panel');
	    
	    function setPos() {
	        var topPos = $(window).height() - ($(window).height() / 6),
	            leftPos = contentContainer.offset().left + (contentContainer.width());
	            
	            backToTop.css('top', (topPos - 50) + 'px')
	                .css('left', (leftPos + 1) + 'px');
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
	}
});

App.ViewApplicantsView = Ember.View.extend({
	afterRenderEvent: function() {
		var ctrl = this.get('controller');

		var pressLeftOrRight = function(direction) {
			ctrl.send('clickPrevOrNext', direction);
		};

		$('body').keydown(function(e) {
			var isInlineFeedbackVisible = ctrl.get('isInlineFeedbackVisible');

			if ($('input:focus').length === 0 && $('.modal[aria-hidden="false"]').length === 0 
					&& $('textarea:focus').length ===0 && $('.tooltipster-base').length === 0
					&& !isInlineFeedbackVisible) {
				switch(e.which) {
			        case 37:
				        var buttonSelector = '.js-prev';
						$(buttonSelector).css('background-color', '#dadee2');
						setTimeout(function() {
							$(buttonSelector).css('background-color', '');
						}, 250);
			        	Ember.run.debounce(this, pressLeftOrRight, 'prev', 500);
			        break;

			        case 39: // up
			        	var buttonSelector = '.js-next';
						$(buttonSelector).css('background-color', '#dadee2');
						setTimeout(function() {
							$(buttonSelector).css('background-color', '');
						}, 250);
			        	Ember.run.debounce(this, pressLeftOrRight, 'next', 500);
			        break;

			        default: return; // exit this handler for other keys
			    }
			}
		});

		$('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        $('#share-modal').on('shown.jui.modal', function() {
        		$('#share-modal').find('input').select();
        });
	},
	click: function(e) {
		Ember.run.scheduleOnce('afterRender', this, function() {
			if ($(e.target).closest('.js-tooltipster-button').length === 0) {
				$('.js-tooltipster-button').tooltipster('hide');
			}
		});
		
		//console.log('clicked');*/
	}
});

App.ViewApplicantsController = Ember.ObjectController.extend(App.SearchAndResultsMixin, {
	needs: ['viewApplicantsApplicationReader'],
	currentApplicationIdBinding: 'controllers.viewApplicantsApplicationReader.application.Id',
	isInlineFeedbackVisibleBinding: 'controllers.viewApplicantsApplicationReader.isInlineFeedbackVisible',
	shareUrlChanged: function() {
		if (!Ember.isEmpty(this.get('params'))) {
			var params = JSON.parse(JSON.stringify(this.get('params')));

			Object.keys(params).forEach(function(key) {
				if (Ember.isNone(params[key])) {
					delete params[key];
				}
			});

			params.limiter = this.get('results.numberViewable') || this.get('numResultsPerSearch');
			var hashFilter='filter=' + encodeURIComponent(JSON.stringify(params)); 
			if (!Ember.isEmpty(this.get('currentApplicationId'))) {
				hashFilter += '&appId=' + this.get('currentApplicationId');
			}

            if (history.replaceState) {
                history.replaceState(undefined, undefined, '#' + hashFilter);
            } else {
                window.location.hash = hashFilter;
            }

		}
	}.observes('shareUrl'),
	shareUrl: function() {
		if (!Ember.isEmpty(this.get('params'))) {
			var params = JSON.parse(JSON.stringify(this.get('params')));

			Object.keys(params).forEach(function(key) {
				if (Ember.isNone(params[key])) {
					delete params[key];
				}
			});

			params.limiter = this.get('results.numberViewable') || this.get('numResultsPerSearch');
			var shareUrl = window.location.href.replace(/&filter=.+/,'') + '&filter=' + encodeURIComponent(JSON.stringify(params)); 
			if (!Ember.isEmpty(this.get('currentApplicationId'))) {
				shareUrl += '&appId=' + this.get('currentApplicationId');
			}

			return shareUrl;
		} else {
			return null;
		}
	}.property('params', 'currentApplicationId', 'results.numberViewable'),
	mailLink: function() {
		var subjectString = 'Applicants for ' + this.get('requisition.Name') + ' Position';
		var bodyString = 'Hi ' + this.get('hiringManager.FirstName') + ',\n\nPlease take a look at the following applicants for the ' 
								+ this.get('requisition.Name') + ' position: ' + this.get('shareUrl'); 
		var mailLink = 'mailto:' + this.get('hiringManager.Email') + '?subject=' + encodeURIComponent(subjectString) + '&body=' + encodeURIComponent(bodyString);

		return mailLink;
	}.property('shareUrl'),
	applicationStages: function() {
		return Object.keys(this.get('applicationStageAndStatuses')).reject(function(stage) { return stage === 'Any'; });
	}.property('applicationStageAndStatuses'),
	applicationStatuses: function() {
		var statuses = this.get('applicationStageAndStatuses')[this.get('selectedBulkStage')];
		if (!Ember.isEmpty(statuses)) {
			this.set('selectedBulkStatus', statuses[0]);
		}
		return statuses;
	}.property('selectedBulkStage'),
	successFunction: function(self, res) {
		var updateObj = {};
    	var applicantId = self.get('applicantId');
        var indexToGoto = self.get('indexToGoto');
    	var params = self.get('params');

		App.formatResults(updateObj, res, params);
		self.setProperties(updateObj);

		self.set('isLoadingResults', false);

        var viewableApplications = self.get('results.viewableApplications');

		if (applicantId && !Ember.isNone(viewableApplications.findBy('Id', applicantId))) {
			//self.set('applicantId', null);
			self.transitionToRoute('viewApplicantsApplicationReader', applicantId);
		} else if (indexToGoto) {
            self.set('indexToGoto', null);
            var appToGoto;

            do {
                appToGoto = viewableApplications.objectAt(indexToGoto);
                indexToGoto--;
            } while (Ember.isNone(appToGoto) && indexToGoto >= 0)

            if (appToGoto) {
                self.transitionToRoute('viewApplicantsApplicationReader', appToGoto.Id);
            } else {
                self.transitionToRoute('viewApplicants');
            }
        } else {
			if (!Ember.isEmpty(updateObj.results.viewableApplications)) {
				//self.set('applicantId', null);
				self.transitionToRoute('viewApplicantsApplicationReader', updateObj.results.viewableApplications[0].Id);
			} else {
				self.transitionToRoute('viewApplicants');
			}
		}
	},
	noResultsFound: function() {
		return Ember.isEmpty(this.get('results.viewableApplications'));
	}.property('results.viewableApplications'),
	bulkReject: function(startIndex) {
		var self = this;
		var lastIndexToProcess = startIndex + BULK_AMOUNT;
		var appIds = this.get('results.allApplicationIds');
		var bulkRejectObj = {
			disposition: this.get('selectedDisposition'),
			appIds: appIds.slice(startIndex, lastIndexToProcess)
		};

		cont.bulkReject(JSON.stringify(bulkRejectObj), function(res, evt) {
			if (res) {
				res = parseResult(res);

				if (res.isSuccess) {
					if (lastIndexToProcess >= appIds.length) {
						cont.getUpdatedHeaderData(reqId, function(updateRes, updateEvt) {
							if (updateRes) {
								updateRes = parseResult(updateRes);

								if (updateRes.isSuccess) {
									var newHeaderData = {};

									initData.stageCounts = updateRes.data.headerData.stageCounts;
									initData.outcomeCounts = updateRes.data.headerData.outcomeCounts;

									App.formatHeaderNumbers(newHeaderData, initData);
									self.set('totalApplicants', newHeaderData.totalApplicants);
									self.notifyPropertyChange('filters');

								} else {
									// ERROR
								}
							}
						});
					} else {
						self.bulkReject(lastIndexToProcess);
					}
				} else {
					// ERROR
				}
			} else {
				// ERROR
			}
		});
	},
	bulkUpdate: function(startIndex) {
		var self = this;
		var lastIndexToProcess = startIndex + BULK_AMOUNT;
		var appIds = this.get('results.allApplicationIds');
		var bulkUpdateObj = {
			stage: this.get('selectedBulkStage'),
			status: this.get('selectedBulkStatus'),
			appIds: this.get('results.allApplicationIds').slice(startIndex, lastIndexToProcess)
		};
		
		cont.bulkUpdateStatus(JSON.stringify(bulkUpdateObj), function(res, evt) {
			if (res) {
				res = parseResult(res);

				if (res.isSuccess) {
					if (lastIndexToProcess >= appIds.length) {
						cont.getUpdatedHeaderData(reqId, function(updateRes, updateEvt) {
							if (updateRes) {
								updateRes = parseResult(updateRes);

								if (updateRes.isSuccess) {
									var newHeaderData = {};

									initData.stageCounts = updateRes.data.headerData.stageCounts;
									initData.outcomeCounts = updateRes.data.headerData.outcomeCounts;

									App.formatHeaderNumbers(newHeaderData, initData);
									self.set('totalApplicants', newHeaderData.totalApplicants);
									
									// UPDATE STORED APPS' STAGE AND STATUS
									App.Fixtures.get('savedApplications').getEach('application').setEach('Stage__c', self.get('selectedBulkStage'));
									App.Fixtures.get('savedApplications').getEach('application').setEach('Status__c', self.get('selectedBulkStatus'));

									self.notifyPropertyChange('filters');

								} else {
									// ERROR
								}
							}
						});
					} else {
						self.bulkUpdate(lastIndexToProcess);
					}
				} else {
					// ERROR
				}
			} else {
				// ERROR
			}
		});
	},
	gotoPrevOrNextApp: function(direction) {
		var applications = this.get('results.viewableApplications');
		var currentApplicationId = this.get('currentApplicationId');
		var currentIndex = applications.indexOf(applications.findBy('Id', currentApplicationId));

		if (applications.length - 1 === currentIndex) {
			// if at end of array
			currentIndex = direction === 'prev' ? currentIndex - 1 : 0;
		} else if (currentIndex === 0) {
			// if at beginning
			currentIndex = direction === 'prev' ? applications.length - 1 : currentIndex + 1;
		} else {
			currentIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
		}

		this.transitionToRoute('viewApplicantsApplicationReader', applications[currentIndex].Id);
	},
    actions: {
    	clickPrevOrNext: function(direction) {
    		Ember.run.debounce(this, this.gotoPrevOrNextApp, direction, 100);
    	},
    	clickLoadMore: function() {
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
    	clickConfirmBulkReject: function() {
    		this.set('isLoadingResults', true);
    		this.bulkReject(0);
    	},
    	clickConfirmBulkUpdate: function() {
    		var self = this;
    		var bulkUpdateObj = {
    			stage: this.get('selectedBulkStage'),
    			status: this.get('selectedBulkStatus'),
    			appIds: this.get('results.allApplicationIds')
    		};
    		
    		this.set('isLoadingResults', true);
    		this.bulkUpdate(0);
    	}
    }
});

App.ViewApplicantsApplicationReaderController = Ember.ObjectController.extend(App.ApplicationReaderMixin, {
	needs: ['viewApplicants'],
	//shareUrlBinding: 'controllers.viewApplicants.shareUrl',
	selectedTab: 'application',
	retPage: 'to_viewApplicants',
	isInlineFeedbackVisible: false,
	updateApplicationLinkedInLinkId: function() {
		var linkObj = App.Fixtures.get('newLinkedInLink');

		if (!Ember.isNone(linkObj) && linkObj.appId === this.get('application.Id')) {
			var appToUpdate = App.Fixtures.get('savedApplications').findBy('application.Id', linkObj.appId);
			appToUpdate.set('application.namespace_LinkedIn_Link_Id__c', linkObj.linkId);
			this.set('application.namespace_LinkedIn_Link_Id__c', linkObj.linkId);
			this.notifyPropertyChange('application');
			App.Fixtures.set('newLinkedInLink', null);
		}
	}.observes('App.Fixtures.newLinkedInLink'),
	actions: {
		clickProvideFeedbackInline: function() {
			if (!this.get('isInlineFeedbackVisible')) {
				$('.js-feedback-card').slideDown();
			} else {
				$('.js-feedback-card').slideUp();
			}

			this.toggleProperty('isInlineFeedbackVisible');
		},
		addInterview : function(){
            var url = '/apex/'+ extnamespace + 'to_interviewNewEdit?appId=' + this.get('application').Id + 
                      '&retUrl=' + encodeURIComponent(this.get('controllers.viewApplicants.shareUrl'));

            if(isSF1){
                sforce.one.navigateToURL(url);
            } else {
                window.location.href = url
            }
        }
	}
});

App.ResultController = Ember.ObjectController.extend({
	alertStatusClass: function() {
		var alertStatus = this.get('Alert_Status__c');
		return Ember.isEmpty(alertStatus) ? null : alertStatus === 'Warning' ? 'has-problem-warning' : 'has-problem-error';
	}.property('parentController.results.viewableApplications'),
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

App.InterviewController = Ember.ObjectController.extend(App.InterviewMixin, App.CamelizeModelMixin, {
	retPage: 'to_viewApplicants'
});

App.FeedbackController = Ember.ObjectController.extend(App.FeedbackMixin, App.CamelizeModelMixin);

App.OtherAppsController = Ember.ObjectController.extend(App.OtherAppsMixin, App.CamelizeModelMixin);

App.AdditionalInfoController = Ember.ObjectController.extend(App.AdditionalInfoMixin);

App.ViewApplicantsRoute = Ember.Route.extend({
    beforeModel: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // IF IS MOBILE THRU REG EX CHECK
            var isMobile = false; //initiate as false
            // device detection
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
               || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

            if (isMobile) {
                var mobileAddress = window.location.href.replace('viewApplicants', 'viewApplicantsMobile');
                // NAVIGATE TO SF1 VERSION

                var objectToBase64Encode = {
                    "componentDef":"one:alohaPage",
                    "attributes":{
                    "values":
                        {
                            "address": mobileAddress
                        }
                    }
                }

                cont.convertShareUrlTo64(JSON.stringify(objectToBase64Encode), function(res, evt) {
                    if (res) {
                        res = parseResult(res);

                        if (res.isSuccess) {
                            window.location.href = window.location.protocol + '//' + window.location.host + '/one/one.app#' + res.data.encodedUrl;
                        } else {
                            // ERROR
                        }
                    } else {
                        // ERROR
                    }
                });
            } else {
                resolve({});
            }
        });
    },
    model: function (){
        return new Ember.RSVP.Promise(function(resolve, reject) {
        	var storedMainData = App.Fixtures.get('storedMainData');

        	if (!Ember.isNone(storedMainData)) {
        		resolve(storedMainData);
        	} else {
        		var params = JSON.parse(JSON.stringify(App.Fixtures.get('emptyParams'))); 

	        	if (Ember.isEmpty(filterParams)) {
	    			// Empty params
		        	params.noOutcome = true;
		        	params.allOutcomes = false;
		        	params.sortType = scoreSort;
	        	} else {
	        		Ember.merge(params,JSON.parse(decodeURIComponent(filterParams)));

	        		if (params.showHired || params.showRejected || params.showWithdrew || params.noOutcome) {
	        			params.allOutcomes = false;
	        		}

	        		if (!params.sortType) {
	        			params.sortType = scoreSort;
	        		}
	        	}

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

				console.log(resolveObj);
				App.Fixtures.set('storedMainData', resolveObj);
				resolve(resolveObj);
        	}
        });
    },
    afterModel: function(model, transition) {
    	//this.transitionTo('viewApplicantsApplicationReader', model.results.viewableApplications[0].Id);
    }
});

App.ViewApplicantsApplicationReaderRoute = Ember.Route.extend({
	model: function(params) {
		var self = this;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			var savedApplications = App.Fixtures.get('savedApplications');
			var application = App.Fixtures.get('savedApplications').findBy('application.Id', params.id);

			if (Ember.isNone(application)) {
				cont.getApplicantData(params.id, function(res, evt) {
					if (res) {
						res = parseResult(res);

						if (res.isSuccess) {
							if (Ember.isNone(monthMap)) {
								monthMap = res.data.monthMap;
							}
							
							application = applicationReaderProcesser(res.data);
							application.applicationStageAndStatuses = self.modelFor('viewApplicants').applicationStageAndStatuses;
							application.disposition = self.modelFor('viewApplicants').disposition;
							application.regardingSelectValues = [];
							application.interviewers = {};

							application.regardingSelectValues.addObject({
				                value : 'null|' + labels.miscellaneous,
				                label : labels.miscellaneous
				            });

							if(!Ember.isEmpty(application.interviews)){
					            application.interviews.forEach(function(interview){
					                var obj = {
					                    value : interview.Id + '|Interview',
					                    label : Ember.isEmpty(interview.Topics__c) ? 'Interview: ' + interview.Interviewers__c : interview.Topics__c
					                }

					                application.regardingSelectValues.addObject(obj);
					                application.interviewers[interview.Id] = Ember.isEmpty(interview.Topics__c) ? null : 'Interview with ' + interview.Interviewers__c;
					            });
					        }

				            application.regardingSelectValues.addObject({
				                value : 'null|' + labels.finalSelection,
				                label : labels.finalSelection   
					        });

							savedApplications.addObject(Ember.Object.create(application));
							
							if (!Ember.isNone(appIdParam)) {
								appIdParam = null;
								self.controllerFor('viewApplicants').set('applicantId', appIdParam);
							} else {
								self.controllerFor('viewApplicants').set('applicantId', params.id);
							}
							console.log('RESOLVE');
							resolve(application);
						} else {
							reject({});
							// ERRROR
						}
					} else {
						reject({});
						// ERROR
					}
				});
			} else {
				console.log('from db resolve');
				resolve(application);
			}
		});
	}
});

// Router
App.Router.map(function() {
    this.resource('viewApplicants', { path: '/' }, function() {
    	this.resource('viewApplicantsApplicationReader', { path: '/:id' });
    });
});


// // This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

