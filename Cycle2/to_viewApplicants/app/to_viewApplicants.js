App = Ember.Application.create({
    rootElement: '#application'
});

App.Router.map(function(){
    this.resource('main', {path: '/'});
});

if(!isSF1){
    App.MainView = Ember.View.extend({
        afterRenderEvent: function() {
            $('body').tooltip({
                selector: '[data-toggle=tooltip]'
            });
        }
    });
}

var outcomeColorMap = {
    'Hired' : 'label--success',
    'Withdrew' : 'label--warning',
    'Rejected' : 'label--error'
}

App.Router.map(function() {
    this.resource('main', { path: '/'}, function() {
        this.resource('applicantDashboard', { path: '/applicantDashboard' });
    });
});


App.MainRoute = Ember.Route.extend({
    beforeModel: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            Ember.run.later(this, function() {   
                if (window.innerHeight > 65) {
                    this.transitionTo('applicantDashboard');                    
                }
            }, 200);
        });
    }
});

App.ApplicantDashboardRoute = Ember.Route.extend({
    model: function (){
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var params = {
                status : null,
                stage : null,
                source : null,
                showWithdrawn : false,
                showRejected : false,
                offset : 0,
                scoreSort : scoreSort,
                reqId : reqId
            }

            cont.getApplicantData(params, function(result, resultObj){
                var parsedResult = parseResult(result);
                console.log(parsedResult);
                if(!parsedResult.isSuccess){
                    self.set('errorMsg', parsedResult.errorMessages);
                    return;
                }
                console.log('hello?');
                var data = parsedResult.data
                console.log(data);
                var emberApps = processApps(data);
            
                data.stages.unshift({label : '(Any)', value : null});
                data.status.unshift({label : '(Any)', value : null});
                data.source = [{label : '(Any)', value : null}, {label : 'External', value : 'External'}, {label : 'Internal', value : 'Internal'}];

                var sortOptions = [
                    {
                        label : 'Application rating (best to worst)',
                        value : scoreSort
                    },
                    {
                        label : 'Interview feedback (best to worst)',
                        value : 'Composite_Feedback_Score__c'
                    },
                    {
                        label : 'Last name (A - Z)',
                        value : 'Last_Name__c'
                    }
                ]

                data.otherApps = data.otherApps
                data.showWithdrawn = false
                data.showRejected = false
                data.showLoadingState = false
                data.jobTitle = data.requisition.Job_Posting_Title__c
                data.apps = emberApps
                data.sortOptions = sortOptions
                data.offset = 100
                resolve(Ember.Object.create(data));
            });
        });
    }
});


App.ApplicantView = Ember.View.extend({
    templateName: 'applicant',
    classNames : ['column--md--4', 'applicant', 'card-height'],
    click: function(e) {
        if(!$(e.target).is('a')){
            var appId = this.get('controller').get('Id');
            if(isSF1){
                sforce.one.navigateToSObject(appId);
            } else{
                window.location.href = '/' + appId;
            }
        }
    }
});

App.ModalApplicantView = Ember.View.extend({
    templateName: 'modalApplicant',
    classNames : ['card', 'pointer', 'mar--sm--n'],
    click: function(e) {
        if(!$(e.target).is('a')){
            var appId = this.get('controller').get('Id');
            sforce.one.navigateToSObject(appId);
        }
    }
});


App.ApplicantDashboardController = Ember.ObjectController.extend({
    showEmptyState : function(){
        return this.get('apps').length == 0 && !this.get('showLoadingState');
    }.property('apps', 'showLoadingState'),
    hideLoadMore : function(){
        return (this.get('showEmptyState') || this.get('showLoadingState') || this.get('offset') >= total)
    }.property('showEmptyState','showLoadingState'),
    showAlert: function(){  //display alert if we have error messages
        return !Ember.isEmpty(this.get('errorMsg'));
    }.property('errorMsg'),
    actions : {
        loadMore : function(){
            var self = this;
            var params = {
                reqId : reqId,
                stage : this.get('selectedStage'),
                status : this.get('selectedStatus'),
                source : this.get('selectedSource'),
                showWithdrawn : this.get('showWithdrawn'),
                showRejected : this.get('showRejected'),
                scoreSort : this.get('selectedSort'),
                offset : self.get('offset')
            };

            this.set('showLoadingState', true);

            cont.getApplicantData(params, function(result, resultObj){
                var parsedResult = parseResult(result);

                if(!parsedResult.isSuccess){
                    self.set('errorMsg', parsedResult.errorMessages);
                    return;
                }

                var data = parsedResult.data
                emberApps = processApps(data);
                
                self.set('offset', self.get('offset') + 100);
                self.set('apps', self.get('apps').concat(emberApps));
                self.set('otherApps', $.extend(self.get('otherApps'), data.otherApps));
                self.set('showLoadingState', false);
            });
        },
        saveModalState : function(){
            var modalState = Ember.Object.create({
                selectedSort : this.get('selectedSort'),
                selectedStage : this.get('selectedStage'),
                selectedStatus : this.get('selectedStatus'),
                selectedSource : this.get('selectedSource'),
                showWithdrawn : this.get('showWithdrawn'),
                showRejected : this.get('showRejected')
            });

            this.set('modalState', modalState);
        },
        restoreModalState : function(){
            this.setProperties(this.get('modalState'));
        },
        filterApps : function(){
            var self = this;
            console.log(this);
            var params = {
                reqId : reqId,
                stage : this.get('selectedStage'),
                status : this.get('selectedStatus'),
                source : this.get('selectedSource'),
                showWithdrawn : this.get('showWithdrawn'),
                showRejected : this.get('showRejected'),
                scoreSort : this.get('selectedSort'),
                offset : 0
            };

            this.set('showLoadingState', true);
            

            cont.getApplicantData(params, function(result, resultObj){
                var parsedResult = parseResult(result);

                if(!parsedResult.isSuccess){
                    self.set('errorMsg', parsedResult.errorMessages);
                    return;
                }

                var data = parsedResult.data
                var emberApps = processApps(data);
                
                self.set('offset', 100);
                self.set('apps', emberApps);
                self.set('otherApps', Ember.A(data.otherApps));
                self.set('showLoadingState', false);
            });
        }
    }
});

App.AppController = Ember.ObjectController.extend({
    needs: "applicantDashboard",
    allowNeutralBinding : "controllers.applicantDashboard.allowNeutral",
    positiveTooltipBinding : "controllers.applicantDashboard.positiveTooltip",
    negativeTooltipBinding : "controllers.applicantDashboard.negativeTooltip",
    neutralTooltipBinding : "controllers.applicantDashboard.neutralTooltip",
    downloadUrl : function(){
        return '/' + this.get('Resume_Post_Id__c')
    }.property(),
    employmentText : function(){
        var employmentHistory = this.get('employmentHistory');
        if(!Ember.isEmpty(employmentHistory)){
            return employmentHistory.Job_Title__c  + ' at ' + employmentHistory.Name;
        }

        return labels.cardNoEmployment
    }.property(),
    isSF1 : function(){
        return isSF1;
    }.property(),
    hasOutcome : function(){
        return !Ember.isEmpty(this.get('Outcome__c'))
    }.property(),
    hasAddress : function(){
        return (!Ember.isEmpty(this.get('City__c')) && !Ember.isEmpty(this.get('State_Province__c')))
    }.property(),
    hasProfile : function(){
        return !Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'));
    }.property(),
    outcomeColor : function(){
        return outcomeColorMap[this.get('Outcome__c')];
    }.property(), 
    statusText : function(){
        var offerStage = this.get('parentController').get('offerStage');
        var statusText = this.get('Stage__c');

        if(Ember.isEmpty(this.get('Outcome__c'))){
            if(statusText == offerStage && !Ember.isEmpty(this.get('Job_Offers__r'))){
                statusText += ' (' + this.get('Job_Offers__r').records[0].Status__c + ')';
            } else {
                statusText += ' (' + this.get('Status__c') + ')';
            }
        }

        return statusText;
    }.property(),
    otherAppText : function(){
        var otherApps = this.get('parentController').get('otherApps')[this.get('Contact__c')];
        var otherAppText = '';

        if(!Ember.isEmpty(otherApps)){
            var tooltipText = '';
            otherAppText = '(' + (otherApps['after'].length + otherApps['before'].length);

            if(otherApps['after'].length !== 0 && otherApps['before'].length !== 0){
                otherAppText += ' ' + labels.others;
                var tooltipText = otherApps['before'].length + ' ' + labels.createdBefore + ' ' +  otherApps['before'].length + ' ' + labels.createdAfter
            } else if(otherApps['after'].length !== 0){
                otherAppText += ' ' + labels.since;
                var tooltipText = otherApps['after'].length + ' ' + labels.applicationsSince + ' ' + moment(this.get('CreatedDate')).format(localeString)
            } else {
                otherAppText += ' ' + labels.before;
                var tooltipText = otherApps['before'].length + ' ' + labels.applicationsBefore + ' ' + moment(this.get('CreatedDate')).format(localeString)
            }

            otherAppText += ')';
            this.set('otherAppTooltip', tooltipText); 
        }

        return otherAppText;
    }.property(),
    cardErrorType : function(){
        var errorText = '';
        if(Ember.isEmpty(this.get('Outcome__c'))){
            var errorType = this.get('cardColor');
            
            if(errorType == 'Problem'){
                errorText = 'has-problem-error'
            } else if(errorType == 'Warning'){
                errorText = 'has-problem-warning';
            }
        }

        return errorText;
    }.property(),
    linkedInLinkText : function(){
        var linkText = labels.cardProfile;

        if(Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'))){
            linkText = labels.cardSearch;
        }

        return linkText;
    }.property(),
    linkedInAddress : function(){
        var address = ''

        if(Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'))){
            address = 'https://www.linkedin.com/pub/dir/?first=' + this.get('First_Name__c') + '&last=' + this.get('Last_Name__c')
        } else {
            if (isSF1 && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                address = 'linkedin://#profile/' + this.get('LinkedIn_Profile_Id__c');
            } else {
                address = 'https://www.linkedin.com/profile/view?id=' + this.get('LinkedIn_Profile_Id__c');
            }
        }

        return address;
    }.property(),
    loadAddress : function(){
        var address = 'https://www.google.com/maps/place/' + this.get('Street_Address__c') + ' ' + this.get('City__c') + ' ' + this.get('State_Province__c') + ' ' + this.get('Country__c');

        if (isSF1 && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            address = 'comgooglemaps://?q=' + this.get('Street_Address__c') + ' ' + this.get('City__c') + ' ' + this.get('State_Province__c') + ' ' + this.get('Country__c')
        } else {
            address = 'https://www.google.com/maps/place/' + this.get('Street_Address__c') + ' ' + this.get('City__c') + ' ' + this.get('State_Province__c') + ' ' + this.get('Country__c')
        }

        return address
    }.property(),
    actions: {
        loadLinkedIn: function(){
            if(Ember.isEmpty(this.get('LinkedIn_Profile_Id__c'))){
                console.log('am i not here?')
                //var address = 'https://www.linkedin.com/pub/dir/?first=' + this.get('First_Name__c') + '&last=' + this.get('Last_Name__c');
                var address = 'https://www.google.com?#q=' + this.get('First_Name__c') + ' ' + this.get('Last_Name__c') + ' site://linkedin.com'
                console.log(address);
                if (isSF1){
                    sforce.one.navigateToURL(address);
                } else {
                    window.location.href = address; 
                }
            } else {
                var address = 'https://www.linkedin.com/profile/view?id=' + this.get('LinkedIn_Profile_Id__c');

                if (isSF1) {
                    if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
                        var now = new Date().valueOf();
                        setTimeout(function () {
                            if (new Date().valueOf() - now > 300) return;
                            sforce.one.navigateToURL(address);
                        }, 100);

                        sforce.one.navigateToURL('linkedin://#profile/' + this.get('LinkedIn_Profile_Id__c'));
                    } else {
                        var response = confirm('Sorry, this isn’t supported yet. Would you like the information sent to you via email?');
                        if(response){
                            cont.sendLinkedInEmail(this.get('Id'), function(){});
                        }

                        //sforce.one.navigateToURL(address);
                    }
                } else {
                    window.location.href = address;
                }
            }
        },
        loadGoogleMaps: function(){
           /* if (isSF1) {
                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
                    var now = new Date().valueOf();
                    setTimeout(function () {
                        if (new Date().valueOf() - now > 300) return;
                        sforce.one.navigateToURL(address);
                    }, 100);

                    sforce.one.navigateToURL('comgooglemaps://?q=' + this.get('Street_Address__c') + ' ' + this.get('City__c') + ' ' + this.get('State_Province__c') + ' ' + this.get('Country__c'));
                } else {
                    sforce.one.navigateToURL(address);
                }
            } else */
            if(!isSF1) {
                var address = 'https://www.google.com/maps/place/';
                address += Ember.isEmpty(this.get('Street_Address__c')) ? '' : this.get('Street_Address__c') + ' ';
                address += Ember.isEmpty(this.get('City__c')) ? '' : this.get('City__c') + ' ';
                address += Ember.isEmpty(this.get('State_Province__c')) ? '' : this.get('State_Province__c') + ' ';
                address += Ember.isEmpty(this.get('Country__c')) ? '' : this.get('Country__c') + ' ';
                window.location.href = address;
            }
        },
        openApplicationModal : function(){
            if(isSF1){
                var parentController = this.get('parentController');
                var otherApps = parentController.get('otherApps')[this.get('Contact__c')]['before'].concat(parentController.get('otherApps')[this.get('Contact__c')]['after'])
                otherApps.addObject(this);
                otherApps = otherApps.sortBy('CreatedDate').reverse();
                parentController.set('modalAppsToDisplay', otherApps);
                parentController.set('modalApplicantName', this.get('Name'));
                $('#applicantModal').modal();
            } else {
                window.location.href = '/_ui/search/ui/UnifiedSearchResults?searchType=2&str=' + this.get('First_Name__c') + '+' + this.get('Last_Name__c');
            }
        }
    }
});

var processApps = function(parsedResult){
    var emberApps = Ember.A();
    
    parsedResult.applications.forEach(function(app){
        app.chatterPosts = 0;
        app.localeDate = labels.createdOn + ' ' + moment(app.CreatedDate).format(localeString);
        app.photoUrl = parsedResult.photos[app.Contact__c];

        if(Ember.isEmpty(app.photoUrl)){
            app.photoUrl = defaultIconUrl;
        }

        if(!Ember.isEmpty(app.Employment_Histories__r)){
            app.employmentHistory = Ember.Object.create(app.Employment_Histories__r.records[0]);
        }

        app.cardColor = app.Alert_Status__c;
        app.positive = 0
        app.negative = 0
        app.neutral = 0
        app.interviewScore = 0;
        app.lastName = app.Last_Name__c

        if(!Ember.isEmpty(app.Evaluations__r)){
            app.Evaluations__r.records.forEach(function(eval){
                if(eval.Alert_Status__c == 'Problem') {
                    app.cardColor = eval.Alert_Status__c
                } else if(app.cardColor != 'Problem' && eval.Alert_Status__c == 'Warning'){
                    app.cardColor = eval.Alert_Status__c;
                };

                app.positive += eval.Positive_Feedback__c ? eval.Positive_Feedback__c : 0;
                app.negative += eval.Negative_Feedback__c ? eval.Negative_Feedback__c : 0;
                app.neutral += eval.Neutral__c ? eval.Neutral__c : 0;
            });
        }

        if(!Ember.isEmpty(app.Job_Offers__r)){
            app.Job_Offers__r.records.forEach(function(jo){
                if(jo.Alert_Status__c == 'Problem') {
                    app.cardColor = jo.Alert_Status__c
                } else if(app.cardColor != 'Problem' && jo.Alert_Status__c == 'Warning'){
                    app.cardColor = jo.Alert_Status__c;
                };
            });
        }

        if(!Ember.isEmpty(parsedResult.posts[app.Id])){
            app.chatterPosts = parsedResult.posts[app.Id];
        }

        if(!Ember.isEmpty(parsedResult.resumes[app.Id])){
            app.resume = parsedResult.resumes[app.Id];
        }

        emberApps.addObject(Ember.Object.create(app));
    });
    
    return emberApps;
}

Ember.Handlebars.helper('formatLocaleDate', function(date) {
    return moment(date).format(localeString);
});

Ember.Handlebars.helper('formatDate', function(date) {
    return moment(date).format('MMM D');
});

Ember.Handlebars.helper('formatSize', function(size) {
    var formattedSize = '';
    if(size >= 1000){
        formattedSize = Math.floor(size/1000) + 'K';
    } else if (size >= 100000){
        formattedSize = Math.floor(size/100000) + 'M';
    } else {
        formattedSize = size + 'B'
    }

    return formattedSize;
});

App.Router.reopen( {
    location: 'none'
});