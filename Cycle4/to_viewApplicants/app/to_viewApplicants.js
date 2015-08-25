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
    parsedJson.talentProfile.camelizedModel = camelizeObj(parsedJson.talentProfile);

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

                evaluation.Interview__r.camelizedModel = camelizeObj(evaluation.Interview__r);
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
    console.log('AAAAAA');
    console.log(parsedJson);
    return parsedJson;
}




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

function camelizeObj(obj) {
	var camelizedObj = {};

	Object.keys(obj).forEach(function(key) {
		camelizedObj[key.replace('__c','').camelize()] = obj[key];
	});

	return camelizedObj;
};

App.CamelizeModelMixin = Ember.Mixin.create({
	camelizedModel: function() {
		var model = this.get('model');
		camelizeObj(model);
	}.property('model')
});

App.formatHeaderNumbers = function(obj, res) {
	obj.totalApplicants = {
        					stageCounts: [],
        					outcomeCounts: [],
        					stageSubtotal: 0,
        					total: 0,
        					sourceCounts: res.data.sourceCounts,
        					sourceTotal: res.data.sourceCounts.getEach('total').reduce(function(a,b) { return a + b; })
        				  };

	// Format applicants totals by Stage
	res.data.stages.forEach(function(stage) {
		var stageCountObj = res.data.stageCounts.findBy('name', stage.value);
		var stageCount = !Ember.isNone(stageCountObj) ? stageCountObj.total : 0;

			obj.totalApplicants.stageSubtotal += stageCount;
			obj.totalApplicants.total += stageCount;

		obj.totalApplicants.stageCounts.addObject({
			name: stage.value,
			total: stageCount
		});
	});

	['Hired', 'Withdrew', 'Rejected'].forEach(function(outcome) {
		var outcomeCountObj = res.data.outcomeCounts.findBy('name', outcome);
		var outcomeCount = !Ember.isNone(outcomeCountObj) ? outcomeCountObj.total : 0;

		obj.totalApplicants.total += outcomeCount;

		obj.totalApplicants.outcomeCounts.addObject({
			name: outcome,
			total: outcomeCount
		});
	});

	// Format filled info

	obj.filledInfo = {
		totalHeadCount: res.data.requisition.Head_Count__c,
		numFilled: res.data.hiredApplicants.length,
		hiredApplicants: res.data.hiredApplicants.map(function(applicant) {
			return {
				Id: applicant.Id,
				Name: applicant.Name,
				responseDate: !Ember.isNone(applicant.Job_Offer_Lookups__r) ? applicant.Job_Offer_Lookups__r.records[0].Response_Date__c : null
			};
		})
	}

	// Format open since info

	obj.openSince = {
		approvedOnMonth: moment(res.data.requisition.Approved_On__c).format('MMM'),
		approvedOnDay: moment(res.data.requisition.Approved_On__c).format('DD'),
		numDaysOpen: moment().diff(moment(res.data.requisition.Approved_On__c), 'days')
	}
};

App.formatResults = function(obj, res, params) {
	obj.results = {
		total: res.data.applicationIds.length,
		numberViewable: res.data.applications.length,
		viewableApplications: res.data.applications 
	};
};

App.Fixtures = Ember.Object.create({
	savedApplications: [],
	initData: null,
	emptyParams: {
		reqId: reqId,
		stage : null,
		status : null,
		ratingDirection : null,
		rating : null,
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

App.ToolTipsterComponent = Ember.Component.extend({
	attributeBindings: ['data'],
	layoutName: 'components/tooltipster',
	$button: function() {
		return $('.' + this.get('buttonClass'));
	}.property('buttonClass'),
	initializeToolTipstser: function() {
		var self = this;
		var $button = this.get('$button');
		var content = '<div id="' + this.get('elementId') + '" class="ember-view">' + this.$().html() + '</div>';
		
		var tooltipOptions = {
            contentAsHTML: true,
            trigger: 'click',
            autoClose: false,
            offsetY: -100,
            offsetX: -10,
            delay: 0,
            onlyOne: true,
            position: 'bottom',
            updateAnimation: false,
            functionBefore: function(origin, continueTooltip) {
            	$('.js-tooltipster-button').not($button).tooltipster('hide');
            	continueTooltip();
            },
            functionReady: function(origin, tooltip) {
            	var $shell = tooltip.find('.tooltipster-content');
            	$shell.contents().remove();
            	$shell.append(self.$());
            },
            content: this.$()
        };

		$button.tooltipster(tooltipOptions);

        $('body').on('click', '[data-dismiss="modal"]', function() { // Bind dismiss-modal to close tooltips
            $button.tooltipster('hide');
        });
	},
	afterRenderEvent: function() {
		this.initializeToolTipstser();
	}
});

App.ApplicantTotalsComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data'],
	isStageSelected: true,
	layoutName: 'components/viewApplicantsStageStatusTooltip',
	actions: {
		setIsStageSelected: function(isStageSelected) {
    		this.set('isStageSelected', isStageSelected);
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

			params.allOutcomes = false;
			params.showHired = true;

			var newFilter = {
				name: 'outcome',
				text: 'Outcome: Hired',
				params: params
			}

			filters.clear();
			filters.pushObject(newFilter);

			ctrl.set('applicantId', applicantId);
			ctrl.notifyPropertyChange('filters');
		}
	}
});

App.ProvideFeedbackComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'ctrl'],
	layoutName: 'components/provideFeedback',
	actions: {
		clickSave: function() {
			var ctrl = this.get('ctrl');

			console.log(ctrl);
		}
	}
});

App.UpdateStatusComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'ctrl'],
	layoutName: 'components/updateStatus',
	applicationStages: function() {
		return Object.keys(this.get('ctrl.applicationStageAndStatuses'));
	}.property(),
	applicationStatuses: function() {
		var statuses = this.get('ctrl.applicationStageAndStatuses')[this.get('stage')];
		if (!Ember.isNone(statuses)) {
			this.set('status', statuses[0]);
		}
		return statuses;
	}.property('stage'),
	/*stageChanged: function() {
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.get('$button').tooltipster('content', this.$());
		});
	}.observes('stage')*/
});

App.SearchFilterComponent = Ember.Component.extend({
	attributeBindings: ['filters', 'ctrl'],
	layoutName: 'components/searchFilter',
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
		}
		return statuses;
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
	setFilter: function(filterName, filterParamNames, textFunction) {
		var filterParams = this.getProperties(filterParamNames);
		var filterText = textFunction(filterParams);
		var filters = this.get('filters');

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
			return 'Stage and Status: ' + filterParams.stage + '; ' + filterParams.status;
		};

		this.setFilter('stageAndStatus', 'stage status'.w(), textFunction);
	},
	setApplicationRatingFilter: function() {
		var comparisons = this.get('comparisons');
		var textFunction = function(filterParams) {
			return 'Application Rating: ' + comparisons.findBy('value', filterParams.ratingDirection).label + ' ' + filterParams.rating;
		};

		this.setFilter('applicationRating', 'ratingDirection rating'.w(), textFunction);
	},
	setInterviewFeedbackFilter: function() {

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

		this.setFilter('outcome', 'showHired showRejected showWithdrew noOutcome'.w(), textFunction);
	}
});

App.ViewApplicantsView = Ember.View.extend({
	afterRenderEvent: function() {
		var ctrl = this.get('controller');

		var pressLeftOrRight = function(direction) {
			if ($('input:focus').length === 0 && $('.modal[aria-hidden="false"]').length === 0) {
				
				ctrl.send('clickPrevOrNext', direction);
			}
		};

		$('body').keydown(function(e) {
			switch(e.which) {
		        case 37:
			        var buttonSelector = '.js-prev';
					$(buttonSelector).css('background-color', '#dadee2');
					setTimeout(function() {
						$(buttonSelector).css('background-color', '');
					}, 250);
		        	Ember.run.debounce(this, pressLeftOrRight, 'prev', 500);
		        	console.log('a');
		        break;

		        case 39: // up
		        	var buttonSelector = '.js-next';
					$(buttonSelector).css('background-color', '#dadee2');
					setTimeout(function() {
						$(buttonSelector).css('background-color', '');
					}, 250);
		        	Ember.run.debounce(this, pressLeftOrRight, 'next', 500);
		        	console.log('b');
		        break;

		        default: return; // exit this handler for other keys
		    }
		});
	}
});

App.ViewApplicantsController = Ember.ObjectController.extend({
	offset: 0,
	numResultsPerSearch: 2,
	needs: ['viewApplicantsApplicationReader'],
	currentApplicationIdBinding: 'controllers.viewApplicantsApplicationReader.application.Id',
	disableLoadMore: function() {
		return this.get('results.numberViewable') === this.get('results.total') ? 'disabled' : false;
	}.property('results.numberViewable', 'results.totalApplicants'),
	filtersOrSortChanged: function() {
		this.set('isLoadingResults', true);
		this.updateParams();
	}.observes('filters', 'sortType'),
    updateParams: function() {
    	var self = this;
    	var filterParams = this.get('filters').getEach('params');
        var params = JSON.parse(JSON.stringify(App.Fixtures.get('emptyParams')));
        var numResultsPerSearch = this.get('numResultsPerSearch');

        if (filterParams.length === 0) {
        	params.allOutcomes = true;
        	params.noOutcome = false;
        } else {
        	params.allOutcomes = false;
        	filterParams.forEach(function(paramObj) {
	    		Ember.merge(params, paramObj);
	    	});
        }
    	
    	params.sortType = this.get('sortType');

    	this.set('params', params);
    	this.set('offset', 0);

    	var successFunction = function(res) {
        	var updateObj = {};
        	var applicantId = self.get('applicantId');

			App.formatResults(updateObj, res, params);
			self.setProperties(updateObj);
			self.set('isLoadingResults', false);

			if (applicantId) {
				self.set('applicantId', null);
				self.transitionToRoute('viewApplicantsApplicationReader', applicantId);
			} else {
				self.transitionToRoute('viewApplicantsApplicationReader', updateObj.results.viewableApplications[0].Id);
			}
        };

    	Ember.run.debounce(this, this.search, params, successFunction, 300);
    	
    },
    search: function(params, successFunction) {
    	var self = this;
    	cont.getFilteredApplicants(params, function(res, evt) {
    		if (res) {

    			res = parseResult(res);

    			if (res.isSuccess) {
    				successFunction(res);
    			} else {
    				// error handling
    			}
    		} else {
    			// error handling
    		}
    	});
    },
    isScoreSortCustom: function () {
		return scoreSort !== 'Raw_Score__c';
	}.property(),
	maxApplicationRatingVal: function() {
		return !this.get('isScoreSortCustom') ? this.get('maxApplicationRating')[0].score : null;
	}.property(),
    actions: {
    	clickNext: function() {
    		var applications = this.get('results.viewableApplications');
    		var currentApplicationId = this.get('currentApplicationId');

    		var currentIndex = applications.indexOf(applications.findBy('Id', currentApplicationId));

    		if (applications.length - 1 === currentIndex) {
    			currentIndex = 0;
    		} else if (currentIndex === 0) {
    			currentIndex = applications.length - 1;
    		} else {
    			currentIndex--;
    		}

    		this.transitionToRoute('viewApplicantsApplicationReader', applications[currentIndex].Id);
    	},
    	clickPrev: function() {
    		var applications = this.get('results.viewableApplications');
    		var currentApplicationId = this.get('currentApplicationId');
    		console.log(this.get('currentApplicationId'));
    	},
    	clickPrevOrNext: function(direction) {
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

App.ViewApplicantsApplicationReaderController = Ember.ObjectController.extend(App.ApplicationReaderMixin, {
	selectedTab: 'application',
	retPage: 'to_viewApplicants',
	actions: {
		clickProvideFeedbackInline: function() {
			$('.js-feedback-card').slideDown();
		},
		clickCancelFeedbackInline: function() {
			$('.js-feedback-card').slideUp();
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
		console.log(this.get(scoreSort));
		return !Ember.isNone(this.get(scoreSort));
	}.property('parentController.results.viewableApplications'),
	ratingClass: function() {
		return this.get('applicationRatingVal') >= 0 ? 'text-success' : 'text-error'; 
	}.property('applicationRatingVal'),
	resultPartial: function() {
		var sortTypeLabel = this.get('parentController.sortOptions').findBy('value', this.get('parentController.sortType')).label;
		return (sortTypeLabel + ' Results').camelize(); 
	}.property('parentController.sortType')
});

App.InterviewController = Ember.ObjectController.extend(App.InterviewMixin, App.CamelizeModelMixin, {
	retPage: 'to_viewApplicants'
});

App.FeedbackController = Ember.ObjectController.extend(App.FeedbackMixin, App.CamelizeModelMixin);

App.OtherAppsController = Ember.ObjectController.extend(App.OtherAppsMixin, App.CamelizeModelMixin);

App.AdditionalInfoController = Ember.ObjectController.extend(App.AdditionalInfoMixin);

App.ViewApplicantsRoute = Ember.Route.extend({
    model: function (){
        return new Ember.RSVP.Promise(function(resolve, reject) {
        	var initData = App.Fixtures.get('initData');

        	if (!Ember.isNone(initData)) {
        		resolve(initData);
        	} else {
        		// Empty params
	        	var params = JSON.parse(JSON.stringify(App.Fixtures.get('emptyParams')));

	        	params.noOutcome = true;
	        	params.allOutcomes = false;
	        	params.sortType = scoreSort;
	        	// When all hired/withdrawn/rejected false, no outcome

	        	cont.getFilteredApplicants(params, function(res, evt) {
	        		if (res) {
	        			res = parseResult(res);

	        			if (res.isSuccess) {
	        				console.log(res);
	        				var resolveObj = {
	        					applicationStageAndStatuses: getDependentOptions(apiKey, 'Application__c', 'Stage__c', 'Status__c', namespace),
	        					applicationSources: res.data.sourceCounts.getEach('name'),
	        					maxApplicationRating: res.data.maxApplicationRating,
	        					maxInterviewScore: res.data.maxInterviewScore,
	        					sortOptions: App.Fixtures.get('sortOptions'),
	        					sortType: scoreSort,
	        					locations: [],
	        					filterOptions: ['Stage and Status', 'Application Rating', 'Interview Feedback', 'Applied On', 'Source', 'Threshold', 'Location', 'Outcome'],
	        					filters: []
	        				};

	        				App.formatHeaderNumbers(resolveObj, res);
	        				App.formatResults(resolveObj, res, params);
	        				// Format locations
	        				if (!Ember.isNone(res.data.requisition.Job_Locations__r)) {
	        					res.data.requisition.Job_Locations__r.records.forEach(function(location) {
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
	        				if (params.showHired === false && params.showWithdrew === false && params.showRejected === false) {
	        					resolveObj.filters.addObject({
	        						name: 'outcome',
	        						text: 'Outcome: No Outcome',
	        						params: {
	        							showHired: false,
	        							showWithdrew: false,
	        							showRejected: false,
	        							noOutcome: true
	        						}
	        					});
	        				}

	        				console.log(resolveObj);
	        				App.Fixtures.set('initData', resolveObj);
	        				resolve(resolveObj);
	        			} else {
	        				reject(res);
	        			}

	        		} else {
	        			reject({});
	        		}
	        	});
        	}
        });
    },
    afterModel: function(model, transition) {
    	this.transitionTo('viewApplicantsApplicationReader', model.results.viewableApplications[0].Id);
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
							console.log(res.data);
							
							application = applicationReaderProcesser(res.data);
							application.applicationStageAndStatuses = self.modelFor('viewApplicants').applicationStageAndStatuses;
							savedApplications.addObject(application);
							
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

