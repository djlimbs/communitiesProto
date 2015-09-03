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

               foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
            } else if(!Ember.isEmpty(generalQuestions.findBy('Form_Element__c', resp.Form_Element__c))){  //this if is checking for generalQuestions checkboxes
               var foundResp =  generalQuestions.findBy('Form_Element__c', resp.Form_Element__c);
               foundResp.Value__c += ', ' + resp.Value__c + scoreMarkup;
            } else {
                resp.Value__c += scoreMarkup;
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
//Ember.LOG_BINDINGS = true

Ember.subscribe('render', {
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
		return camelizeObj(model);
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
            //autoClose: true,
            //interactive: true,
            //hideOnClick: true,
            offsetY: -100,
            offsetX: -10,
            delay: 0,
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
	},
	afterRenderEvent: function() {
		this.initializeToolTipstser();
	},
	click: function(e) {
		var $button = this.get('$button');
		e.stopPropagation();

		if ($(e.target).closest('[data-dismiss="modal"]').length > 0) {
			$button.tooltipster('hide');
		}
	}
});

App.ApplicantTotalsComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'filters', 'ctrl'],
	isStageSelected: true,
	layoutName: 'components/viewApplicantsStageStatusTooltip',
	setFilter: function(newFilter) {
		var ctrl = this.get('ctrl');
		var filters = this.get('filters');
		var params = {};
		var $button = this.get('$button');

		params.allOutcomes = true;
		params.stage = name;

		filters.clear();
		filters.pushObject(newFilter);

		//ctrl.set('applicantId', applicantId);
		ctrl.notifyPropertyChange('filters');

		$button.tooltipster('hide');
	},
	actions: {
		setIsStageSelected: function(isStageSelected) {
    		this.set('isStageSelected', isStageSelected);
    	},
    	clickSetStageFilter: function(name) {
			var params = {};

			params.allOutcomes = true;
			params.stage = name;

			var newFilter = {
				name: 'stage',
				text: 'Stage and Status: ' + name + '; Any',
				params: params
			}

			this.setFilter(newFilter);
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

			this.setFilter(newFilter);
    	},
    	clickSetSourceFilter: function(name) {    		
			var params = {};

			params.source = name;

			var newFilter = {
				name: 'source',
				text: 'Source: ' + name,
				params: params
			}

			this.setFilter(newFilter);
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

App.FeedbackComponent = App.ToolTipsterComponent.extend({
	attributeBindings: ['data', 'ctrl'],
	disposition: function() {
		return this.get('ctrl.disposition');
	}.property(),
	chooseLike: function(){
        return this.get('Positive_Feedback__c') == 1
    }.property('Positive_Feedback__c'),
    chooseDislike: function(){
        return this.get('Negative_Feedback__c') == 1
    }.property('Negative_Feedback__c'),
    chooseUnknown: function(){
        return this.get('Neutral__c') == 1
    }.property('Neutral__c'),
    chooseDisqualified: function(){
        return this.get('Rejected__c');
    }.property('Rejected__c'),
    chooseSelected: function(){
        return this.get('Selected__c');
    }.property('Selected__c'),
	interviews: function() {
		return this.get('ctrl.interviews');
	}.property('ctrl'),
	additionalCriteriaFields: function() {
		return this.get('ctrl.additionalCriteriaFields').map(function(field) {
			return Ember.Object.create(field);
		});
	}.property('ctrl'),
	regardingSelectValues: function() {
		return this.get('ctrl.regardingSelectValues');
	}.property('ctrl'),
	allowNeutral: function() {
		return this.get('ctrl.allowNeutral');
	}.property('ctrl'),
	allowRejection: function() {
		return this.get('ctrl.allowRejection');
	}.property('ctrl'),
	isResumeReview : function(){
        if(!Ember.isEmpty(this.get('selectedType'))){
            return this.get('selectedType').split('|')[1] == labels.miscellaneous;
        }

        return false;
    }.property('selectedType'),
	selectedFinalOutcome : function(){
        this.set('Rejected__c', false)
        
        if(!Ember.isEmpty(this.get('selectedType'))){
            return this.get('selectedType').split('|')[1] == labels.finalSelection;
        }

        return false;
    }.property('selectedType'),
    setType : function(){
        if(!Ember.isEmpty(this.get('selectedType'))){
            //reset all the errorstates and selected choices
            this.set('feedbackError', false);
            var additionalCriteriaFields = this.get('additionalCriteriaFields');
            additionalCriteriaFields.forEach(function(field){
                field.set('isEmpty', false);
                field.set('selectedValue', null);
            });

            this.setProperties({
                Positive_Feedback__c : 0,
                Negative_Feedback__c : 0,
                Neutral__c : 0,
                Selected__c : false,
                Rejected__c : false
            });

            selectedType = this.get('selectedType').split('|');
            this.set('interviewText', this.get('ctrl.interviewers')[selectedType[0]]);
            this.set('Interview__c', selectedType[0] == "null" ? null : selectedType[0]);
            this.set('feedbackType', selectedType[1]);
            this.set('RecordTypeId', selectedType[1] == 'Interview' ? this.get('interviewRTId') : this.get('miscRTId')); 
        }
    }.observes('selectedType'),
    showDisposition: function(){
        return this.get('Rejected__c');
    }.property('Rejected__c'),
	actions: {
		clickSave: function() {
			var self = this;
			var ctrl = this.get('ctrl');

			var newEvaluation = {
				Application_Lookup__c: this.get('ctrl.application.Id'),
				RecordTypeId: this.get('isResumeReview') === true ? ctrl.get('miscRTId') : ctrl.get('interviewRTId'),
				Comments__c: this.get('comments'),
				Interview__c: this.get('Interview__c'),
				Negative_Feedback__c: this.get('Negative_Feedback__c'),
				Positive_Feedback__c: this.get('Positive_Feedback__c'),
				Neutral__c : this.get('Neutral__c'),
                Selected__c : this.get('Selected__c'),
                Rejected__c : this.get('Rejected__c'),
                Disposition__c: this.get('selectedDisposition')
			};
            var somethingIsEmpty = false;

			if(this.get('feedbackType') == 'Interview'){
                this.get('additionalCriteriaFields').forEach(function(field){
                    field.set('isEmpty', false);
                    
                    if(Ember.isEmpty(field.selectedValue)){
                        somethingIsEmpty = true;
                        field.set('isEmpty', true);
                    }

                    newEvaluation[field.name] = field.get('selectedValue');
                });
            }

            cont.saveEvaluation(JSON.stringify(newEvaluation), function(res, evt) {
            	if (res) {
            		res = parseResult(res);

            		if (res.isSuccess) {
            			ctrl.get('evaluations').unshiftObject(res.data.evaluation[0]);
            			self.resetFeedbackValues();
            			if (self.get('isInline') === true) {
							$('.js-feedback-card').slideUp();
							self.get('ctrl').set('isInlineFeedbackVisible', false);
						}
            		} else {
            			console.log(res);
            			// ERROR
            		}
            	} else {
            		//ERROR 
            	}
            });


		},
		clickCancel: function() {
			if (this.get('isInline') === true) {
				$('.js-feedback-card').slideUp();
				this.get('ctrl').set('isInlineFeedbackVisible', false);
			}

			this.resetFeedbackValues();
		},
		clickSelectFeedback : function(choice){
            if(this.get(choice) == 1){
                this.set('hasFeedback', false);
                this.set(choice, (choice == 'Rejected__c' || choice == 'Selected__c')? false : 0);
                this.set('Disposition__c', null);
            } else {
                this.set('hasFeedback', true);
                var choices = {
                    Positive_Feedback__c : 0,
                    Negative_Feedback__c : 0,
                    Neutral__c : 0,
                    Selected__c : false,
                    Rejected__c : false
                }

                if(choice == 'Rejected__c' || choice == 'Selected__c'){
                    choices[choice] = true;
                } else {
                    choices[choice] = 1;
                    this.set('Disposition__c', null);
                }

                this.setProperties(choices);
            }
        }
	},
	resetFeedbackValues: function() {
		var initState = {
            Positive_Feedback__c : 0,
            Negative_Feedback__c : 0,
            Neutral__c : 0,
            Selected__c : false,
            Rejected__c : false,
            selectedType: this.get('regardingSelectValues')[0].value,
            selectedDisposition: null,
            comments: null
        };

        this.get('additionalCriteriaFields').setEach('selectedValue', null);
        this.setProperties(initState);
	}
});

App.ProvideFeedbackComponent = App.FeedbackComponent.extend({
	layoutName: 'components/provideFeedback',
});

App.ProvideFeedbackInlineComponent = App.FeedbackComponent.extend({
	isInline: true,
	layoutName: 'components/provideFeedbackInline',
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
	shareUrl: function() {
		if (!Ember.isEmpty(this.get('params'))) {
			var params = JSON.parse(JSON.stringify(this.get('params')));

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
    	var params = self.get('params');

		App.formatResults(updateObj, res, params);
		self.setProperties(updateObj);

		self.set('isLoadingResults', false);

		if (applicantId && !Ember.isNone(self.get('results.viewableApplications').findBy('Id', applicantId))) {
			self.set('applicantId', null);
			self.transitionToRoute('viewApplicantsApplicationReader', applicantId);
		} else {
			if (!Ember.isEmpty(updateObj.results.viewableApplications)) {
				self.set('applicantId', null);
				self.transitionToRoute('viewApplicantsApplicationReader', updateObj.results.viewableApplications[0].Id);
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
						self.notifyPropertyChange('filters');
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
						self.notifyPropertyChange('filters');
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
    		
    		cont.bulkUpdateStatus(JSON.stringify(bulkUpdateObj), function(res, evt) {
    			if (res) {
    				res = parseResult(res);

    				if (res.isSuccess) {
    					self.notifyPropertyChange('filters');
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

App.ViewApplicantsApplicationReaderController = Ember.ObjectController.extend(App.ApplicationReaderMixin, {
	selectedTab: 'application',
	retPage: 'to_viewApplicants',
	isInlineFeedbackVisible: false,
	actions: {
		clickProvideFeedbackInline: function() {
			if (!this.get('isInlineFeedbackVisible')) {
				$('.js-feedback-card').slideDown();
			} else {
				$('.js-feedback-card').slideUp();
			}

			this.toggleProperty('isInlineFeedbackVisible');
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
		        					locations: [],
		        					filterOptions: ['Stage and Status', 'Application Rating', 'Interview Feedback', 'Applied On', 'Source', 'Threshold', 'Location', 'Outcome'],
		        					filters: [],
		        					initParams: params,
		        					applicantId: !Ember.isEmpty(appIdParam) ? appIdParam : null,
		        					initLimiter: params.limiter
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

							savedApplications.addObject(application);
							
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

