if (typeof App === 'undefined') {
	App = Ember.Application.create({
	    rootElement: '#application'
	});
}

App.formatHeaderNumbers = function(obj, initData) {
	obj.totalApplicants = {
        					stageCounts: [],
        					outcomeCounts: [],
        					stageSubtotal: 0,
        					total: 0,
        					sourceCounts: initData.sourceCounts,
        					sourceTotal: !Ember.isEmpty(initData.sourceCounts) ? initData.sourceCounts.getEach('total').reduce(function(a,b) { return a + b; }) : 0
        				  };

	// Format applicants totals by Stage
	initData.stages.forEach(function(stage) {
		var stageCountObj = initData.stageCounts.findBy('name', stage.value);
		var stageCount = !Ember.isNone(stageCountObj) ? stageCountObj.total : 0;

			obj.totalApplicants.stageSubtotal += stageCount;
			obj.totalApplicants.total += stageCount;

		obj.totalApplicants.stageCounts.addObject({
			name: stage.value,
			total: stageCount
		});
	});

	['Hired', 'Withdrew', 'Rejected'].forEach(function(outcome) {
		var outcomeCountObj = initData.outcomeCounts.findBy('name', outcome);
		var outcomeCount = !Ember.isNone(outcomeCountObj) ? outcomeCountObj.total : 0;

		obj.totalApplicants.total += outcomeCount;

		obj.totalApplicants.outcomeCounts.addObject({
			name: outcome,
			total: outcomeCount
		});
	});

	// Format filled info

	obj.filledInfo = {
		totalHeadCount: initData.requisition.Head_Count__c,
		numFilled: initData.hiredApplicants.length,
		hiredApplicants: initData.hiredApplicants.map(function(applicant) {
			return {
				Id: applicant.Id,
				Name: applicant.Name,
				responseDate: !Ember.isNone(applicant.Job_Offer_Lookups__r) ? applicant.Job_Offer_Lookups__r.records[0].Response_Date__c : null
			};
		})
	}

	// Format open since info

	obj.openSince = {
		approvedOnMonth: moment(initData.requisition.Approved_On__c).format('MMM'),
		approvedOnDay: moment(initData.requisition.Approved_On__c).format('DD'),
		numDaysOpen: moment().diff(moment(initData.requisition.Approved_On__c), 'days')
	}
};

App.formatResults = function(obj, res, params) {
	obj.results = {
		allApplicationIds: res.data.applicationIds,
		total: res.data.applicationIds.length,
		numberViewable: res.data.applications.length,
		viewableApplications: res.data.applications 
	};
};

App.SearchFilterMixin = Ember.Mixin.create({
	init: function() {
		this._super();
		this.initializeParams();
	},
	attributeBindings: ['filters', 'ctrl'],
	comparisons: [{
		label: 'Greater Than',
		value: '>'
	},
	{
		label: 'Less Than',
		value: '<'
	}],
	thresholds: ['Warning', 'Problem'],
	availableRadii: [5, 10, 25, 50],
	availableUnits: ['mi', 'km'],
	filterPartial: function() {
		var selectedFilter = this.get('selectedFilter');

		return !Ember.isEmpty(selectedFilter) ? 'components/searchFilter' + selectedFilter.camelize().capitalize() : null;
	}.property('selectedFilter'),
	applicationStages: function() {
		return Object.keys(this.get('applicationStageAndStatuses'));
	}.property(),
	applicationStatuses: function() {
		var statuses = this.get('applicationStageAndStatuses')[this.get('stage')];
		if (!Ember.isNone(statuses)) {
			this.set('status', statuses[0]);
			return statuses.concat(['Any']);
		} else {
			return [];
		}
	}.property('stage'),
	noOutcomeChecked: function() {
		if (this.get('noOutcome') === true) {
			this.setProperties({
				showRejected: false,
				showWithdrew: false,
				showHired: false
			});
		}
	}.observes('noOutcome').on('init'),
	showRejectedChecked: function() {
		if (this.get('showRejected') === true) {
			this.set('noOutcome', false);
		}
	}.observes('showRejected'),
	showHiredChecked: function() {
		if (this.get('showHired') === true) {
			this.set('noOutcome', false);
		}
	}.observes('showHired'),
	showWithdrewChecked: function() {
		if (this.get('showWithdrew') === true) {
			this.set('noOutcome', false);
		}
	}.observes('showWithdrew'),
	maxApplicationRatingVal: function() {
		return this.get('ctrl.maxApplicationRatingVal');
	}.property(),
	maxInterviewScore: function() {
		return this.get('ctrl.maxInterviewScore')[0].score;
	}.property(),
	actions: {
		clickAdd: function() {
			this.setProperties({
				selectedFilter: null,
				stage: null,
				status: null,
				ratingDirection : null,
				rating : null,
				appliedFrom : null,
				appliedTo : null,	
				source : null,
				threshold : null,
				radius : null,
				units : null,
				location : null,
				showHired: false,
				showWithdrew: false,
				showRejected: false,
				noOutcome: false
			});
		},
		clickOK: function() {
			var selectedFilter = this.get('selectedFilter');
			var setFilterName = ('set ' + selectedFilter + ' filter').camelize();
			this[setFilterName]();
		},
		clickCancel: function() {
			// reset filter modal.
		},
		clickRemoveFilter: function(filter) {
    		this.get('filters').removeObject(filter);
    		this.get('ctrl').notifyPropertyChange('filters');

    	}
	},
	setFilter: function(filterName, filterParamNames, textFunction, customParamsFunction) {
		var filterParams = this.getProperties(filterParamNames);
		var filterText = textFunction(filterParams);
		var filters = this.get('filters');

		// if (filterParamNames.indexOf('rating') !== -1) {
		// 	filterParams.rating = parseInt(filterParams.rating);
		// }
		if (customParamsFunction) {
			customParamsFunction(filterParams);
		}

		var newFilter = {
			name: filterName,
			text: filterText,
			params: filterParams
		}

		var existingFilter = filters.findBy('name', filterName);

		if (!Ember.isNone(existingFilter)) {
			filters.replace(filters.indexOf(existingFilter), 1, [newFilter]);
		} else {
			filters.pushObject(newFilter);
		}

		this.get('ctrl').notifyPropertyChange('filters');
	},
	setStageAndStatusFilter: function() {
		var textFunction = function(filterParams) {
			return 'Stage and Status: ' + (filterParams.stage || 'Any') + '; ' + (filterParams.status || 'Any');
		};

		var customParamsFunction = function(params) {
			if (params.stage === 'Any') {
				params.stage = null;
			}

			if (params.status === 'Any') {
				params.status = null;
			}
		};

		this.setFilter('stageAndStatus', 'stage status'.w(), textFunction, customParamsFunction);
	},
	setApplicationRatingFilter: function() {
		var comparisons = this.get('comparisons');
		var textFunction = function(filterParams) {
			return 'Application Rating: ' + comparisons.findBy('value', filterParams.ratingDirection).label + ' ' + filterParams.rating;
		};

		this.setFilter('applicationRating', 'ratingDirection rating'.w(), textFunction);
	},
	setInterviewFeedbackFilter: function() {
		var comparisons = this.get('comparisons');
		var textFunction = function(filterParams) {
			return 'Interview Feedback: ' + comparisons.findBy('value', filterParams.interviewDirection).label + ' ' + filterParams.interviewScore;
		};

		this.setFilter('interviewFeedback', 'interviewDirection interviewScore'.w(), textFunction);
	},
	setAppliedOnFilter: function() {
		var textFunction = function(filterParams) {
			var dateFormat = 'MMM DD, YYYY';
			var filterText = 'Applied On: '; 

			if (Ember.isEmpty(filterParams.appliedFrom)) {
				filterText += 'Before ' + moment(filterParams.appliedTo).format(dateFormat);
			} else if (Ember.isEmpty(filterParams.appliedTo)) {
				filterText += 'After ' + moment(filterParams.appliedFrom).format(dateFormat);
			} else {
				filterText += moment(filterParams.appliedFrom).format(dateFormat) + ' to ' + moment(filterParams.appliedTo).format(dateFormat);
			}

			return filterText;
		};

		this.setFilter('appliedOn', 'appliedFrom appliedTo'.w(), textFunction);
	},
	setSourceFilter: function() {
		var textFunction = function(filterParams) {
			return 'Source: ' + filterParams.source;
		};

		this.setFilter('source', 'source'.w(), textFunction);
	},
	setThresholdFilter: function() {
		var textFunction = function(filterParams) {
			return 'Threshold: ' + filterParams.threshold;
		};

		this.setFilter('threshold', 'threshold'.w(), textFunction);
	},
	setLocationFilter: function() {
		var locations = this.get('locations');

		var textFunction = function(filterParams) {
			return 'Location: ' + filterParams.radius + ' ' + filterParams.units + ' from ' + locations.findBy('geolocation', filterParams.location).name;
		}

		this.setFilter('location', 'radius units location'.w(), textFunction);
	},
	setOutcomeFilter: function() {
		var textFunction = function(params) {
			var filterText = 'Outcome: ';

			if (params.noOutcome) {
				filterText += 'No Outcome';
			}

			if (params.showHired) {
				filterText += 'Hired, ';
			} else {
				params.showHired = false;
			}

			if (params.showRejected) {
				filterText += 'Rejected, ';
			} else {
				params.showRejected = false;
			}

			if (params.showWithdrew) {
				filterText += 'Withdrew, ';
			} else {
				params.showWithdrew = false;
			}

			params.allOutcomes = false;

			if (params.noOutcome !== true) {
				filterText = filterText.substring(0, filterText.lastIndexOf(','));
			}

			return filterText;
		};

		this.setFilter('outcome', 'showHired showRejected showWithdrew noOutcome allOutcomes'.w(), textFunction);
	},
	initializeParams: function() {
		var params = this.get('params');

		this.setProperties(params);
		// check for stage and status

		if (!Ember.isEmpty(params.stage) || !Ember.isEmpty(params.status)) {
			this.setStageAndStatusFilter();
		}

		if (!Ember.isEmpty(params.ratingDirection) && !Ember.isEmpty(params.rating)) {
			this.setApplicationRatingFilter();
		}

		if (!Ember.isEmpty(params.interviewDirection) && !Ember.isEmpty(params.interviewRating)) {
			this.setInterviewFeedbackFilter();
		}

		if (!Ember.isEmpty(params.appliedFrom) || !Ember.isEmpty(params.appliedTo)) {
			this.setAppliedOnFilter();
		}

		if(!Ember.isEmpty(params.source)) {
			this.setSourceFilter();
		} 

		if (!Ember.isEmpty(params.threshold)) {
			this.setThresholdFilter();
		}

		if (!Ember.isEmpty(params.radius) && !Ember.isEmpty(params.units) && !Ember.isEmpty(params.location)) {
			this.setLocationFilter();
		}

		if (!params.allOutcomes) {
			this.setOutcomeFilter();
		}
	}
});

App.SearchAndResultsMixin = Ember.Mixin.create({
	results: {
		viewableApplications: [],
		allApplicationIds: [],
		total: 0
	},
	offset: 0,
	numResultsPerSearch: 2,
	disableLoadMore: function() {
		return this.get('results.numberViewable') === this.get('results.total') ? 'disabled' : false;
	}.property('results.numberViewable', 'results.totalApplicants'),
	filtersOrSortChanged: function() {
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.set('offset', 0);
			this.set('isLoadingResults', true);
			this.updateParams();
		});
	}.observes('filters', 'sortType'),
    updateParams: function() {
    	var self = this;
    	var filterParams = this.get('filters').getEach('params');
        var params = JSON.parse(JSON.stringify(App.Fixtures.get('emptyParams')));
       	var initLimiter = this.get('initLimiter');
       	var numResultsPerSearch = this.get('numResultsPerSearch');
       	var numberViewable = this.get('results.numberViewable');

        if (filterParams.length === 0) {
        	params.allOutcomes = true;
        	params.noOutcome = false;
        } else {
        	params.allOutcomes = !params.noOutcome && !params.showHired && !params.showWithdrew && !params.showRejected;
        	filterParams.forEach(function(paramObj) {
	    		Ember.merge(params, paramObj);
	    	});
        }
    	
    	params.sortType = this.get('sortType');

    	params.limiter = initLimiter || numberViewable;

    	if (Ember.isEmpty(params.limiter) || params.limiter === 0) {
    		params.limiter = numResultsPerSearch;
    	}

    	this.set('params', params);
    	this.set('offset', 0);//Ember.isNone(initLimiter) ? 0 : (initLimiter - numResultsPerSearch));

    	Ember.run.debounce(this, this.search, 300);
    },
    search: function(successFunction) {
		var self = this;

		var functionToRun = successFunction || self.get('successFunction');
    	cont.getFilteredApplicants(self.get('params'), function(res, evt) {
    		if (res) {

    			res = parseResult(res);

    			if (res.isSuccess) {
    				self.set('initLimiter', null);
    				functionToRun(self, res);
    			} else {
    				self.set('errorMessage', res.errorMessages[0]);
    				// error handling
    			}
    		} else {
    			self.set('errorMessage', 'Something broke');
    			// error handling
    		}
    	});    	
    },
    isScoreSortCustom: function () {
		return scoreSort !== 'Raw_Score__c';
	}.property(),
	maxApplicationRatingVal: function() {
		return !this.get('isScoreSortCustom') ? this.get('maxApplicationRating')[0].score : null;
	}.property()
});