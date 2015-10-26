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
	    	value: 'Interview_Score__c'
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

		ctrl.set('applicantId', null);
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
				name: 'stageAndStatus',
				text: labels.stageAndStatus +': ' + name + '; ' + labels.any,
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
				text: labels.outcome + ': ' + labels.noOutcomeYet,
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
				text: labels.outcome + ': ' + name,
				params: params
			}

			this.setFilter([newFilter]);
    	},
    	clickSetSourceFilter: function(name) {    		
			var params = {};

			params.source = name === labels.careerSiteName ? 'Career Site' : name;

			var sourceFilter = {
				name: 'source',
				text: labels.source + ': ' + name,
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
				text: labels.outcome + ': ' + labels.noOutcomeYet,
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
				text: labels.outcome + ': ' + labels.hired,
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

App.SearchFilterComponent = Ember.Component.extend(App.SearchFilterMixin, {
	layoutName: 'components/searchFilter',
	didInsertElement: function() {
		this.$().find('#filter-modal').appendTo('.scope-container');
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

        $('#status-modal').on('shown.jui.modal', function() {
        	var filters = ctrl.get('filters');
        	var stages = ctrl.get('applicationStages');
        	stageAndStatusFilter = filters.findBy('name', 'stageAndStatus');

        	if (!Ember.isEmpty(stageAndStatusFilter)) {
        		ctrl.setProperties({
        			isFirstOpen: true,
        			selectedBulkStage: stageAndStatusFilter.params.stage,
        			selectedBulkStatus: stageAndStatusFilter.params.status
        		});
        	} else {
        		ctrl.setProperties({
        			selectedBulkStage: null,
        			selectedBulkStatus: null
        		});
        	}
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

App.ViewApplicantsApplicationReaderView = Ember.View.extend({
    emailLinkChanged: function() {
        if (!Ember.isEmpty(this.get('controller.emailLink'))) {
            this.rerender();
        }
    }.observes('controller.emailLink')
});

App.ViewApplicantsController = Ember.ObjectController.extend(App.SearchAndResultsMixin, {
	needs: ['viewApplicantsApplicationReader'],
	currentApplicationIdBinding: 'controllers.viewApplicantsApplicationReader.application.Id',
	isInlineFeedbackVisibleBinding: 'controllers.viewApplicantsApplicationReader.isInlineFeedbackVisible',
	paramsOrCurrentAppChanged: function() {
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

            this.set('shareUrl', window.location.href.substring(0, window.location.href.indexOf(window.location.search)) + '?id=' + reqId + '&' + hashFilter);
		}
	}.observes('params', 'currentApplicationId', 'results.numberViewable'),
	disablePrev: function() {
		var allApplicationIds = this.get('results.allApplicationIds');
		var currentApplicationId = this.get('currentApplicationId');
		var currentIndex = allApplicationIds.indexOf(currentApplicationId);

		return currentIndex === 0 || allApplicationIds.length === 0 ? 'disabled' : false;
	}.property('results.allApplicationIds', 'currentApplicationId'),
	disableNext: function() {
		var allApplicationIds = this.get('results.allApplicationIds');
		var currentApplicationId = this.get('currentApplicationId');
		var currentIndex = allApplicationIds.indexOf(currentApplicationId);

		return currentIndex === allApplicationIds.length - 1 || allApplicationIds.length === 0 ? 'disabled' : false;
	}.property('results.allApplicationIds', 'currentApplicationId'),
	mailLink: function() {
		var subjectString = 'Applicants for ' + this.get('requisition.Name') + ' Position';
		var bodyString = 'Hi ' + this.get('hiringManager.FirstName') + ',\n\nPlease take a look at the following applicants for the ' 
								+ this.get('requisition.Name') + ' position: ' + this.get('shareUrl'); 
		var mailLink = 'mailto:' + this.get('hiringManager.Email') + '?subject=' + encodeURIComponent(subjectString) + '&body=' + encodeURIComponent(bodyString);

		return mailLink;
	}.property('shareUrl'),
	applicationStages: function() {
		return Object.keys(this.get('applicationStageAndStatuses')).reject(function(stage) { return stage === labels.any; });
	}.property('applicationStageAndStatuses'),
	applicationStatuses: function() {
		var statuses = this.get('applicationStageAndStatuses')[this.get('selectedBulkStage')];
		
		if (!Ember.isEmpty(statuses) && this.get('isFirstOpen') === false) {
			this.set('selectedBulkStatus', null);
		} else {
			this.set('isFirstOpen', false);
		}

		return statuses;
	}.property('selectedBulkStage'),
	disableConfirmBulkUpdate: function() {
		return Ember.isEmpty(this.get('selectedBulkStage')) || Ember.isEmpty(this.get('selectedBulkStatus')) ? 'disabled' : false;
	}.property('selectedBulkStage', 'selectedBulkStatus'),
	disableConfirmBulkReject: function() {
		return Ember.isEmpty(this.get('selectedBulkDisposition')) ? 'disabled' : false;
	}.property('selectedBulkDisposition'),
	findHiredApplicantSuccessFunction: function(self, res) {
		var applicantId = self.get('applicantId');
		var updateObj = {};
		var updatedApplications = self.get('results.viewableApplications');

		App.formatResults(updateObj, res, self.get('params'));
		updatedApplications.addObjects(updateObj.results.viewableApplications);
		self.incrementProperty('results.numberViewable', updateObj.results.numberViewable);
		self.setProperties({
			offset: self.get('offset'),
			isLoadingResults: false,
			isLoadingMore: false
		});
		if (Ember.isNone(updatedApplications.findBy('Id', applicantId)) && !self.get('disableLoadMore')) {
			self.loadMore(self.findHiredApplicantSuccessFunction);
		} else {
			self.transitionToRoute('viewApplicantsApplicationReader', applicantId);
		}
	},
	successFunction: function(self, res) {
		var updateObj = {};
    	var applicantId = self.get('applicantId');
        var indexToGoto = self.get('indexToGoto');
    	var params = self.get('params');

		App.formatResults(updateObj, res, params);
		self.setProperties(updateObj);

		self.setProperties({
			isLoadingResults: false,
			isLoadingMore: false
		});

        var viewableApplications = self.get('results.viewableApplications');

		if (applicantId) {
			if (Ember.isNone(viewableApplications.findBy('Id', applicantId)) && !self.get('disableLoadMore')) {
				self.loadMore(self.findHiredApplicantSuccessFunction);
			} else if (!Ember.isNone(viewableApplications.findBy('Id', applicantId))) {
				self.transitionToRoute('viewApplicants');
				self.transitionToRoute('viewApplicantsApplicationReader', applicantId);
			} else if (viewableApplications.length > 0) {
				self.transitionToRoute('viewApplicants');
				self.transitionToRoute('viewApplicantsApplicationReader', viewableApplications[0].Id);
			} else {
				self.transitionToRoute('viewApplicants');
			}
		} else if (indexToGoto) {
            self.set('indexToGoto', null);
            var appToGoto;

            do {
                appToGoto = viewableApplications.objectAt(indexToGoto);
                indexToGoto--;
            } while (Ember.isNone(appToGoto) && indexToGoto >= 0)

            if (appToGoto) {
            	self.transitionToRoute('viewApplicants');
                self.transitionToRoute('viewApplicantsApplicationReader', appToGoto.Id);
            } else {
                self.transitionToRoute('viewApplicants');
            }
        } else {
			if (!Ember.isEmpty(updateObj.results.viewableApplications)) {
				//self.set('applicantId', null);
				self.transitionToRoute('viewApplicants');
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
									App.Fixtures.get('savedApplications').clear();
									self.set('totalApplicants', newHeaderData.totalApplicants);
									self.set('applicantId', null);
									self.notifyPropertyChange('filters');

								} else {
									self.set('errorMessage', updateRes.errorMessages[0]);
								}
							}
						});
					} else {
						self.bulkReject(lastIndexToProcess);
					}
				} else {
					self.set('errorMessage', res.errorMessages[0]);
				}
			} else {
				self.set('errorMessage', labels.sorryAnErrorOccurred);
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
									App.Fixtures.get('savedApplications').clear();
									/*
									App.Fixtures.get('savedApplications').getEach('application').setEach('Stage__c', self.get('selectedBulkStage'));
									App.Fixtures.get('savedApplications').getEach('application').setEach('Status__c', self.get('selectedBulkStatus'));
									*/

									self.set('applicantId', null);
									self.notifyPropertyChange('filters');

								} else {
									self.set('errorMessage', updateRes.errorMessages[0]);
								}
							}
						});
					} else {
						self.bulkUpdate(lastIndexToProcess);
					}
				} else {
					self.set('errorMessage', res.errorMessages[0]);
				}
			} else {
				self.set('errorMessage', labels.sorryAnErrorOccurred);
			}
		});
	},
	gotoPrevOrNextApp: function(direction) {
		var applications = this.get('results.viewableApplications');
		var currentApplicationId = this.get('currentApplicationId');
		var currentIndex = applications.indexOf(applications.findBy('Id', currentApplicationId));
		var allApplicationIds = this.get('results.allApplicationIds');

		if (applications.length - 1 === currentIndex && currentIndex < allApplicationIds.length - 1) {
			// if at end of array
			currentIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
			
			var successFunction = function(self, res) {
				var updateObj = {};
				var updatedApplications = self.get('results.viewableApplications');

				App.formatResults(updateObj, res, self.get('params'));
				updatedApplications.addObjects(updateObj.results.viewableApplications);
				self.incrementProperty('results.numberViewable', updateObj.results.numberViewable);
				self.setProperties({
					offset: self.get('offset'),
					isLoadingResults: false,
					isLoadingMore: false
				});
				self.transitionToRoute('viewApplicantsApplicationReader', updatedApplications[currentIndex].Id);
			};

			this.loadMore(successFunction);
		} else if (currentIndex === 0) {
			// if at beginning
			currentIndex = direction === 'prev' ? currentIndex : currentIndex + 1;
			this.transitionToRoute('viewApplicantsApplicationReader', applications[currentIndex].Id);
		} else {
			currentIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
			if (currentIndex < allApplicationIds.length) {
				this.transitionToRoute('viewApplicantsApplicationReader', applications[currentIndex].Id);
			}
		}

	},
	loadMore: function(successFunction) {
		var self = this;
		var params = this.get('params');
		var numResultsPerSearch = this.get('numResultsPerSearch');
		var offset = this.get('results.numberViewable'); //+ numResultsPerSearch;
		var numberTotal = this.get('results.total');
       	var resultsLeftToView = numberTotal - offset;

		this.set('isLoadingMore', true);

		params.offset = offset;
		params.limiter = resultsLeftToView < numResultsPerSearch ? resultsLeftToView : numResultsPerSearch;
		this.set('params', params);

		if (successFunction) {
			this.search(successFunction);
		} else {
			this.search();
		}
	},
    actions: {
    	clickPrevOrNext: function(direction) {
    		Ember.run.debounce(this, this.gotoPrevOrNextApp, direction, 100);
    	},
    	clickLoadMore: function() {
    		var successFunction = function(self, res) {
				var updateObj = {};

				App.formatResults(updateObj, res, self.get('params'));
				self.get('results.viewableApplications').addObjects(updateObj.results.viewableApplications);
				self.incrementProperty('results.numberViewable', updateObj.results.numberViewable);
				self.setProperties({
					offset: self.get('offset'),
					isLoadingMore: false,
					isLoadingResults: false
				});
			};

    		this.loadMore(successFunction);
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
			appToUpdate.set('application.LinkedIn_Link_Id__c', linkObj.linkId);
			this.set('application.LinkedIn_Link_Id__c', linkObj.linkId);
			this.notifyPropertyChange('application');
			App.Fixtures.set('newLinkedInLink', null);
		}
	}.observes('App.Fixtures.newLinkedInLink'),
	actions: {
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
	needs: ['viewApplicants'],
	retPage: 'to_viewApplicants',
	interviewUrl : function(){
        return '/apex/' + extnamespace + 'to_interviewView?id=' + this.get('Id') + '&retUrl=' + encodeURIComponent(this.get('controllers.viewApplicants.shareUrl'));
    }.property('parentController')
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
               || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
				isMobile = true;
			}
			
            if (isMobile) {
            	if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
            		var finalUrl = '/apex/' + extnamespace + 'to_viewApplicantsMobile?id=' + reqId + '&filter=' + filterParams;
            		cont.saveIosShareProxy(finalUrl, function(res, evt) {
            			if (res) {
            				res = parseResult(res);

            				if (res.isSuccess) {
            					window.location.href = 'salesforce1://sObject/' + res.data.iosShareProxyId + '/view';
            				} else {
            					// ERROR 
            				}
            			} else {
            				// ERROR
            			}
            		});
            		// Call remote action to create a proxy object - send decodeURIComponent(filterParams)
            		// get ID back from data, 
            		// add orgId to vf page
            		// window.location.href 'salesforce1://sObject/'+ID I GOT+'/view?sloid= ORG ID'
            		//window.location.href = 'salesforce1://sObject/'+reqId+'/view'
            	} else {
            		var mobileAddress = window.location.href.replace('#filter', '&filter').replace('viewApplicants', 'viewApplicantsMobile');
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
	                        console.log(res)
	                        if (res.isSuccess) {
	                            //alert(res.data.encodedUrl);
	                            window.location.href = window.location.protocol + '//'+window.location.host+'/one/one.app#' + res.data.encodedUrl;
	                        } else {
	                            // ERROR
	                        }
	                    } else {
	                        // ERROR
	                    }
	                });
            	}
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

	        	initData.sourceCounts.forEach(function(source){
	        		if (source.name === 'Career Site') {
	        			source.name = labels.careerSiteName;
	        		}
	        	});

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
		        					filterOptions: [labels.stageAndStatus, labels.applicationRating, labels.interviewFeedback, labels.appliedOn, labels.source, labels.threshold, labels.location, labels.outcome],
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
		        resolveObj.applicationStageAndStatuses[labels.any] = anyStatuses;

				App.formatHeaderNumbers(resolveObj, initData);

				// Format locations
				if (!Ember.isNone(initData.requisition.Job_Locations__r)) {
					initData.requisition.Job_Locations__r.records.forEach(function(location) {
						var locationLabel = location.Location__r.Name;
						var addressString = '';
						
						if (!Ember.isEmpty(location.Location__r.Street_Address__c)) {
							addressString += location.Location__r.Street_Address__c;
						}

						if (!Ember.isEmpty(location.Location__r.City__c)) {

							if (!Ember.isEmpty(addressString)) {
								addressString += ', ';
							}

							addressString += location.Location__r.City__c;
						}

						if (!Ember.isEmpty(location.Location__r.State_Province__c)) {
							if (!Ember.isEmpty(addressString)) {
								addressString += ', ';
							}

							addressString += location.Location__r.State_Province__c;
						}

						if (!Ember.isEmpty(location.Location__r.Zip_Postal_Code__c)) {
							if (!Ember.isEmpty(addressString)) {
								addressString += ' ';
							}

							addressString += location.Location__r.Zip_Postal_Code__c;
						}

						if (!Ember.isEmpty(addressString)) {
							locationLabel += ' (' + addressString + ')';
						}

						resolveObj.locations.addObject({
							geolocation: !Ember.isNone(location.Location__r.Geographical_Location__c) ? 
											location.Location__r.Geographical_Location__c.latitude + ', ' + location.Location__r.Geographical_Location__c.longitude :
											null,
							name: location.Location__r.Name,
							label: locationLabel
						});
					});
				}

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
							
							var viewApplicantsModel = self.modelFor('viewApplicants');

							application = App.applicationReaderProcesser(res.data);
							application.applicationStageAndStatuses = viewApplicantsModel.applicationStageAndStatuses;
							application.disposition = viewApplicantsModel.disposition;
							application.miscRTId = initData.miscRTId;
							application.interviewRTId = initData.interviewRTId;

							savedApplications.addObject(Ember.Object.create(application));
							
							if (!Ember.isNone(appIdParam)) {
								appIdParam = null;
								self.controllerFor('viewApplicants').set('applicantId', appIdParam);
							} else {
								self.controllerFor('viewApplicants').set('applicantId', params.id);
							}

							resolve(application);
						} else {
							reject({
								errorMessage: res.errorMessages[0]
							});
						}
					} else {
						reject({
							errorMessage: labels.sorryAnErrorOccurred
						});
					}
				});
			} else {
				resolve(application);
			}
		});
	},
	actions: {
		refreshRoute: function() {
			this.refresh();
		}
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

