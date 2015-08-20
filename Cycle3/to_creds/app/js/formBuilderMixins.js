App.SectionCheck = Ember.Mixin.create({
    isOnJobSpecific: function() {
        return isOnJobSpecific;
    }.property()
});

App.FormBuilderMixin = Ember.Mixin.create({
    elementTypes: ['Question', 'Heading', 'Rich Text'],
    answerTypes: ['Radio Buttons', 'Checkboxes', 'Text Field', 'Paragraph', 'Date'],
    deletedFormElements: [],
    deletedAnswerChoices: [],
    jobTitle: function() {
        return requisitionJobTitle;
    }.property(),
    hasFormElements: function() {
        return this.get('formElements').length > 1;
    }.property('formElements'),
    disableCancel: function() {
        return this.get('formElements').isAny('isEditing') === true ? 'disabled' : false;
    }.property('formElements.@each.isEditing'),
    disableSave: function() {
        var elements = this.get('formElements')
            , doesNotHaveFormElements = elements.length === 1 || (elements.length === 2 && elements[1].isNew === true)
            , isSaving = this.get('isSaving')
            , isEditing = elements.isAny('isEditing');

        return isSaving === true || isEditing === true ? 'disabled' : false; 
    }.property('formElements', 'formElements.@each.isNew', 'isSaving', 'formElements.@each.isEditing'),
    doesNotHaveFormElements: function() {
        var elements = this.get('formElements');
        return elements.length === 1 || (elements.length === 2 && elements[1].isNew === true);
    }.property('formElements', 'formElements.@each.isNew'),
    actions: {
        clickCancel: function() {
            this.goBackToOrigin();
        },
        clickSaveAndClose: function() {
            this.saveFormElements()
                .then(this.goBackToOrigin)
                .then(undefined, this.handleError);
        },
        clickSaveAndKeepWorking: function() {
            var currentPath = this.get('currentPath');
            // Only perform save if we aren't already saving.
            // This occurs mostly in the configurator because a user can switch sections quickly.
            if (this.get('isSaving') !== true) {    
                this.set('showSavingNotification', true);

                if (currentPath === 'formBuilder.formElements' || Ember.isNone(currentPath)) { 
                    this.saveFormElements()
                        .then(this.updateObjectsAndKeepWorking)
                        .then(undefined, this.handleError);
                } else if (currentPath === 'formBuilder.applicationSection') {
                    var hiringModel = App.Fixtures.get('currentHiringModel');
                    console.log(hiringModel)
                    this.send('saveHiringModelData', hiringModel);
                } else if (currentPath === 'formBuilder.contactInfo') {
                    var hiringModel = App.Fixtures.get('currentHiringModel');

                    this.send('saveContactInfo', hiringModel);
                } else if (currentPath === 'formBuilder.onePage') {
                    this.send('saveHiringModelData', null, true);
                }

            }   
        },
        clickSaveAndPreview: function() {
            this.saveFormElements()
                .then(function(self) {
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        if (isSF1 !== true) { 
                            self.set('previewWindow', window.open());
                        }
                        resolve(self);
                    });
                })
                .then(this.gotoPreview)
                .then(undefined, this.handleError);
        },
        gotoSection: function(section) {
            this.set('currentSection', section);
        }
    },
    saveFormElements: function() {
        var self = this;

        this.set('isSaving', true);
        
        var formElementsWithAnswers = [];

        this.get('formElements').forEach(function(fe) { 
            var elementType = fe.get('Element_Type__c')
                , answerType = fe.get('Answer_Type__c');

            if (elementType === 'Question' && (answerType === 'Radio Buttons' || answerType === 'Checkboxes')) {
                fe.get('answers').forEach(function(a, i) {
                    a.set('Sequence_Number__c', i + 1);
                });
                formElementsWithAnswers.push(fe);
            };
        });
        
        var saveObj = {
            deletedFormElements: this.get('deletedFormElements'),
            deletedAnswerChoices: this.get('deletedAnswerChoices'),
            formElements: this.get('formElements').rejectBy('isLast', true),
            answerChoices: [].concat.apply([], formElementsWithAnswers.getEach('answers').compact())
        };
        
        if (isOnJobSpecific === true) {
            saveObj.requisitionId = requisitionId;
            saveObj.allowCandidatesToAssertSkills = this.get('allowCandidatesToAssertSkills');
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {
            cont.saveFormElementsJson(JSON.stringify(saveObj), function(res, resObj) {
                if (res) {
                    var parsedResult = parseResult(res);

                    if (!Ember.isEmpty(parsedResult.errorMessages)) {
                        self.set('error', parsedResult.errorMessages[0]);
                        reject(self);
                    } else {
                        self.set('ajaxResult', parsedResult);
                        resolve(self);
                    }
                } else {
                    self.set('error', resObj.message);
                    reject(self);
                }
            });
        });
    },
    handleError: function(self) {
        console.log(self.get('error'));
        var previewWindow = self.get('previewWindow');

        if (!Ember.isNone(previewWindow)) {
            previewWindow.close();
        }
        self.setProperties({
            errorMessage: self.get('error'),
        });

        $(window).scrollTop(0);
    },
    goBackToOrigin: function(self) {
        var target = isOnJobSpecific === true ? requisitionId : listViewPrefix;

        if (isSF1 === true && isOnJobSpecific === true) {
            sforce.one.navigateToSObject(target);
        } else {
            window.location.href = '/' + target;
        }
    },
    gotoPreview: function(self) {
        if (isSF1 === true) {
            sforce.one.navigateToUrl('/apex/to_applicationFormPreview?id=' + requisitionId);
        } else {
            var previewWindow = self.get('previewWindow');
            var jobOfferPreviewUrl;

            if (typeof requisitionId !== 'undefined' && !Ember.isEmpty(requisitionId)) {
                jobOfferPreviewUrl = window.location.protocol + '//' + window.location.host + '/apex/to_applicationFormPreview?id=' + requisitionId;
            } else {
                jobOfferPreviewUrl = window.location.protocol + '//' + window.location.host + '/apex/to_applicationFormPreview';                
            }
            
            previewWindow.location = jobOfferPreviewUrl;
            self.set('isSaving', false);
        }
    },
    updateObjectsAndKeepWorking: function(self) {
        var eIdsMap = self.get('ajaxResult').data.eIdsMap;
        self.get('formElements').rejectBy('isLast', true).forEach(function(fe) {
            var elementType = fe.get('Element_Type__c');
            var answerType = fe.get('Answer_Type__c');

            if (Ember.isEmpty(fe.get('Id'))) {
                fe.set('Id', eIdsMap.formElements[fe.get('eId')].Id);
            }

            if (elementType === 'Question' && (answerType === 'Radio Buttons' || answerType === 'Checkboxes')) {
                fe.get('answers').forEach(function(a) {
                    a.setProperties({
                        Id: eIdsMap.answerChoices[a.get('eId')].Id,
                        Form_Element__c: fe.get('Id')
                    });
                });
            }
        });

        Ember.run.later(this, function() {
            self.setProperties({
                showSavingNotification: false,
                isSaving: false
            })
        }, 1500);
    }
});

App.FormElementsMixin = Ember.Mixin.create({
    needs: ['formBuilder'],
    currentSectionBinding: 'controllers.formBuilder.currentSection',
    sortAscending: true,
    isInEditMode: function() {
        return this.isAny('isEditing', true);
    }.property('@each.isEditing'),
    hasFormElements: function() {
        return this.get('model').length > 1;
    }.property('[]'),
    actions: {
        swapFormElements: function(sequenceNumber1, sequenceNumber2) {
            var formElements = this.get('model')
                , sequenceProperty = 'Sequence_Number__c'
                , formElement1 = formElements.findBy(sequenceProperty, sequenceNumber1)
                , formElement2 = formElements.findBy(sequenceProperty, sequenceNumber2);

            if (!Ember.isNone(formElement1) && !Ember.isNone(formElement2)
                    && formElement1.get('isLast') !== true && formElement2.get('isLast') !== true) {
                formElement1.set(sequenceProperty, sequenceNumber2);
                formElement2.set(sequenceProperty, sequenceNumber1);
            }
        }
    }
});

App.FormElementMixin = Ember.Mixin.create({
    needs: ['formBuilder'],
    isInEditModeBinding: 'parentController.isInEditMode',
    elementTypesBinding: 'controllers.formBuilder.elementTypes',
    answerTypesBinding: 'controllers.formBuilder.answerTypes',
    formElementsBinding: 'controllers.formBuilder.formElements',
    currentSectionBinding: 'controllers.formBuilder.currentSection',
    isQuestionType: Ember.computed.equal('Element_Type__c', 'Question'),
    answersToDelete: [],
    maxRichTextLength: 6000,
    isAtMaxElements: function() {
        return this.get('parentController.model').length >= 101;
    }.property('parentController.[]'),
    previewTemplate: function() {
        var elementType = this.get('Element_Type__c')
            , answerType = this.get('Answer_Type__c')
            , previewTemplate = elementType === 'Question' ? 'preview-' + answerType : 'preview-' + elementType;
        return previewTemplate.camelize();
    }.property('Element_Type__c', 'Answer_Type__c'),
    editTemplate: function() {
        var editTemplate = 'edit-'
            , elementType = this.get('Element_Type__c')
            , answerType = this.get('Answer_Type__c');

        if (!Ember.isNone(elementType)) {
            if (elementType === 'Question') {
                if (Ember.isNone(answerType)) {
                    answerType = 'Radio Buttons',
                    this.set('Answer_Type__c', 'Radio Buttons');
                }
                editTemplate += answerType;
                return editTemplate.camelize();

            } else if (elementType !== 'Question') {
                editTemplate += elementType;
                return editTemplate.camelize();
            }
        }
    }.property('Element_Type__c', 'Answer_Type__c'),
    divId: function() {
        return 'formElement' + this.get('eId');
    }.property('eId'),
    doesNotHaveEnoughInfo: function() {
        var Text__c = this.get('Text__c')
            , populatedAnswers = this.get('answers').filter(function(a) { return !Ember.isEmpty(a.Value__c); })
            , Element_Type__c = this.get('Element_Type__c')
            , Answer_Type__c = this.get('Answer_Type__c')
            , Rich_Text_Content__c = this.get('Rich_Text_Content__c');

        return (Element_Type__c !== 'Rich Text' && Ember.isEmpty(Text__c)) 
                    || (Element_Type__c === 'Rich Text' && Ember.isEmpty(Rich_Text_Content__c)) 
                    || ((Element_Type__c === 'Question' && (Answer_Type__c === 'Radio Buttons' || Answer_Type__c === 'Checkboxes')) 
                            && Ember.isEmpty(populatedAnswers));
    }.property('Rich_Text_Content__c', 'Text__c', 'answers', 'Element_Type__c', 'Answer_Type__c', 'answers.@each.Value__c'),
    isAtMaxAnswers: function() {
        return this.get('answers').length === 20;
    }.property('answers'),
    elementTypeDidChange: function() {
        this.focusOnInput();
    }.observes('Element_Type__c'),
    actions: {
        clickDone: function() {
            var Element_Type__c = this.get('Element_Type__c')
                , Answer_Type__c = this.get('Answer_Type__c')
                , answers = this.get('answers')
                , parentController = this.get('parentController')
                , formBuilderController = this.get('controllers.formBuilder')
                , answersToDelete = this.get('answersToDelete')
                , maxRichTextLength = this.get('maxRichTextLength')
                , valid = true;

            this.set('errorMessage', null);

            // parse out the rich text content if it's of that type and empty out non-associated fields.
            if (Element_Type__c === 'Rich Text') {
                var richText = $('#' + this.get('componentId')).find('iframe').contents().find('body');

                richText.find('[style]').removeAttr('style');
                richText.find('[class]').removeAttr('class');

                var richTextContent = richText.html();

                // Verify rich text length

                if (richTextContent.length > maxRichTextLength) {
                    this.set('errorMessage', labels.pleaseReduceTheAmountOfContent);
                    valid = false;
                } else {
                    this.setProperties({
                        Rich_Text_Content__c: richText.html(),
                        Text__c: null
                    });
                }
            } else {
                this.set('Rich_Text_Content__c', null);
            }

            if (valid !== false) {
                // add any answers marked to delete to the deletedAnswerChoices array
                if (!Ember.isEmpty(answersToDelete)) {
                    formBuilderController.get('deletedAnswerChoices').addObjects(answersToDelete);
                }

                // clear out answer choices if we're hitting 'Done' on a non-radio/checkbox type.
                if (Element_Type__c !== 'Question' || (Answer_Type__c !== 'Radio Buttons' && Answer_Type__c !== 'Checkboxes')) {
                    formBuilderController.get('deletedAnswerChoices').addObjects(answers.getEach('Id')).compact();

                    this.setProperties({
                        Answer_Type__c: Element_Type__c !== 'Question' ? null : Answer_Type__c,
                        answers: [Ember.Object.create({
                            eId: EID++,
                            formElementEId: this.get('eId'),
                            Value__c: null,
                            Score__c: 0,
                            Disqualify__c: false
                        })]
                    });
                }

                // clear out any answers that were left empty. If a user blanked out a saved answer, consider that deleted.
                if (Element_Type__c === 'Question' && (Answer_Type__c === 'Radio Buttons' || Answer_Type__c === 'Checkboxes')) {
                    var emptyAnswers = this.get('answers').filter(function(a) { 
                        return Ember.isEmpty(a.Value__c);
                    });
                    formBuilderController.get('deletedAnswerChoices').addObjects(emptyAnswers.getEach('Id'));
                    this.get('answers').removeObjects(emptyAnswers);
                }

                this.setProperties({
                    isEditing: false,
                    isNew: false
                });
            }
        },
        clickCancel: function() {
            var tempObject = this.get('parentController.tempObject');

            // clear out any answers set to be deleted
            this.get('answersToDelete').clear();

            if (this.get('isNew') === true) {
                this.deleteMe();    
            } else if (this.get('isEditing') === true && this.get('isLast') !== true) {
                this.set('isEditing', false);

                if (tempObject.Element_Type__c === 'Question' && 
                        (tempObject.Answer_Type__c === 'Radio Buttons' || tempObject.Answer_Type__c === 'Checkboxes')) {
                    var tempAnswers = [];

                    // When restoring the original object on cancel, make sure to turn answers into ember objects.
                    tempObject.answers.forEach(function(a) {
                        tempAnswers.push(Ember.Object.create(a));
                    });

                    tempObject.answers = tempAnswers;
                }

                // Restore object to what it was before edit.
                this.setProperties(tempObject);
            }
        },
        clickNew: function() {
            if (!this.get('isInEditMode')) {
                var formBuilderController = this.get('controllers.formBuilder')
                    , formElements = this.get('parentController').get('model')
                    , formElementEId = EID++
                    , currentSection = this.get('currentSection')
                    , sequenceProperty = 'Sequence_Number__c'
                    , sequenceNumber = this.get(sequenceProperty)
                    , selectedHiringModel = formBuilderController.get('selectedHiringModel')
                    , selectedGeography = formBuilderController.get('selectedGeography');

                formElements.forEach(function(fe, i) {
                    if (fe.get(sequenceProperty) >= sequenceNumber) {
                        fe.incrementProperty(sequenceProperty);
                    }
                });

                formElements.addObject(Ember.Object.create({
                    eId: formElementEId,
                    isNew: true,
                    isEditing: true,
                    Requisition__c : isOnJobSpecific === true ? requisitionId : null,
                    Sequence_Number__c: sequenceNumber,
                    Element_Type__c: 'Question',
                    Answer_Type__c: 'Radio Buttons',
                    Text__c: null,
                    Section__c: currentSection,
                    Geography__c: currentSection === 'Legal' ? selectedGeography : null,
                    Hiring_Model__c: currentSection === 'General' ? selectedHiringModel : null,
                    Source_Position__c: typeof positionId !== 'undefined' ? positionId : null,
                    Original__c: isOnJobSpecific === true ? true : false,
                    answers: [Ember.Object.create({
                        eId: EID++,
                        formElementEId: formElementEId,
                        Value__c: null,
                        Score__c: 0,
                        Disqualify__c: false
                    })]
                }));

                formBuilderController.notifyPropertyChange('formElements');

                this.scrollToElement('.edit-this');
                this.focusOnInput();
            }
        },
        clickEdit: function() {
            var currentState = this.get('model');
            var tempObject = {};
            // Create a copy of the form element
            tempObject = JSON.parse(JSON.stringify(currentState));

            this.get('parentController').set('tempObject', tempObject);
            this.set('isEditing', true);
            this.scrollToElement('.edit-this');
            this.focusOnInput();
        },
        clickMoveUp: function() {
            var currentSequenceNumber = this.get('Sequence_Number__c');

            this.send('swapFormElements', currentSequenceNumber, currentSequenceNumber - 1);
            this.scrollToElement('#' + this.get('divId'), -30, true);
        },
        clickMoveDown: function() {
            var currentSequenceNumber = this.get('Sequence_Number__c');            

            this.send('swapFormElements', currentSequenceNumber, currentSequenceNumber + 1);
            this.scrollToElement('#' + this.get('divId'), -30, true);
        },
        clickDelete: function() {
            this.set('shouldConfirmDelete', true);
        },
        clickConfirmDelete: function() {
            this.deleteMe();
        },
        clickCancelDelete: function() {
            this.set('shouldConfirmDelete', false);
        },

        // answer specific actions
        clickAddAnswer: function() {
            if (!this.get('isAtMaxAnswers')) {
                this.get('answers').addObject(Ember.Object.create({
                    eId: EID++,
                    formElementEId: this.get('eId'),
                    Value__c: null,
                    Score__c: 0,
                    Disqualify__c: false
                }));
                this.notifyPropertyChange('answers');

                Ember.run.scheduleOnce('afterRender', this, function() {
                    $('.answerInput:last').focus();
                });
            }
        }
    },

    focusOnInput: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            $('.edit-this').find('.elementInput').focus();
        });
    },
    deleteMe: function() {
        var formBuilderController = this.get('controllers.formBuilder')
            , formElements = this.get('parentController').get('model')
            , sequenceProperty = 'Sequence_Number__c'  
            , sequenceNumber = this.get(sequenceProperty);

        if (!Ember.isNone(this.get('Id'))) {
            formBuilderController.get('deletedFormElements').addObject(this.get('Id'));
        }

        this.set('isEditing', false);
        formElements.removeObject(this.get('model'));

        formElements.forEach(function(fe, i) {
            var feSequenceNumber = fe.get(sequenceProperty);
            if (!Ember.isEmpty(feSequenceNumber) && feSequenceNumber > sequenceNumber) {
                fe.decrementProperty(sequenceProperty);
            }
        });

        if (isOnJobSpecific !== true) {
            formBuilderController.notifyPropertyChange('general');
            formBuilderController.notifyPropertyChange('legal');
        }
    },
    scrollToElement: function(elementQuery, paddingAmount, usePrev) {
        Ember.run.scheduleOnce('afterRender', this, function() {
            var element = usePrev === true ? $(elementQuery).prev('div') : $(elementQuery);

            if ($(element).length > 0) {
                var scrollToPosition = $(element).offset().top;

                if (paddingAmount) {
                    scrollToPosition += paddingAmount;
                }

                $('html, body').animate({
                    scrollTop: scrollToPosition
                }, 300);
            }
        });
    }
});

App.AnswerMixin = Ember.Mixin.create({
    needs: ['formBuilder'],
    isThumbsDown: Ember.computed.equal('Score__c', -1),
    isThumbsUp: Ember.computed.equal('Score__c', 1),
    isDisqualify: Ember.computed.equal('Disqualify__c', true),
    actions: {
        clickVote: function(vote) {
            var currentScore = this.get('Score__c')
                , currentDisqualify = this.get('Disqualify__c');

            if (vote === 'upVote') {
                this.setProperties({
                    Score__c: currentScore === 1 ? 0 : 1,
                    Disqualify__c: false
                });
            } else if (vote === 'downVote') {
                this.setProperties({
                    Score__c: currentScore === -1 ? 0 : -1,
                    Disqualify__c: false
                });
            } else if (vote === 'disqualify') {
                this.set('Score__c', 0);
                this.toggleProperty('Disqualify__c');
            }
        },
        clickDelete: function() {
            var parentController = this.get('parentController');

            parentController.get('answers').removeObject(this.get('model'));

            if(!Ember.isNone(this.get('Id'))) {
                parentController.get('answersToDelete').addObject(this.get('Id'));
            }
            parentController.notifyPropertyChange('answers');
        }
    }
});