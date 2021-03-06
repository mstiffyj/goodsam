Ext.define('RSS.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: {
                autoCreate: true,
                selector: 'mainview',
                xtype: 'mainview'
            },
            loginView: {
                autoCreate: true,
                selector: 'loginview',
                xtype: 'loginview'
            },
            logoutButton: 'button[action=logout]',
            newFeedButton: 'button[action=newfeed]',
            usersButton: 'button[action=users]',
            registerView: {
                autoCreate: true,
                selector: 'registerview',
                xtype: 'registerview'
            },
            contactView: {
                autoCreate: true,
                selector: 'contactview',
                xtype: 'contactview'
            },
            helpView: {
                autoCreate: true,
                selector: 'helpview',
                xtype: 'helpview'
            }
        },

        control: {
            "loginview button[action=login]": {
                tap: 'onLoginTap'
            },
            "navigationview": {
                push: 'onNavigationviewPush',
                pop: 'onNavigationviewPop'
            },
            "button[action=logout]": {
                tap: 'onLogout'
            },
            "loginview button[action=registerview]": {
                tap: 'onRegisterTap'
            },
            "registerview button[action=register]": {
                tap: 'onRegTap'
            },
            "button[action=contact]": {
                tap: 'onContactTap'
            }
        }
    },

    onLoginTap: function(button, e, options) {
        this.getLoginView().submit({
            url: 'api/v1/users/login',
            method: 'POST',
            scope: this,
            success: function(form, response){
                this.loginComplete (response.user);
            },
            failure: function(form, response){
                Ext.Msg.alert('Login Failed', 'Please try again.');


            }
        });
    },

    onNavigationviewPush: function(navigationView, view, options) {
        if(view instanceof RSS.view.News || 
        view instanceof RSS.view.FeedEdit || 
        view instanceof RSS.view.Users){
            this.hideLogoutButton();
            this.hideNewFeedButton();
            this.hideUsersButton();
        }
    },

    onNavigationviewPop: function(navigationView, view, options) {
        if(view instanceof RSS.view.News ||
        view instanceof RSS.view.FeedEdit || 
        view instanceof RSS.view.Users){
            this.showLogoutButton();
            this.showNewFeedButton();
            this.showUsersButton();
        }
    },

    onLogout: function(button, e, options) {
        Ext.Msg.confirm('Logout', 'Are you sure you want to log out?', function(btn){
            if(btn === 'yes'){
                delete window.localStorage.user;
                window.location.reload();
            }
        });

    },

    onRegisterTap: function(button, e, options) {
        this.getApplication().fireEvent('showview', this.getRegisterView());

    },

    onRegTap: function(button, e, options) {
        var me = this,
            view = me.getRegisterView(),
            form = view.down('formpanel'),
            values = form.getValues(),
            user = form.getRecord() || Ext.create('RSS.model.User'),
            errors;

        user.setData(values);

        errors = user.validate();

        if(!errors.length){

            this.getRegisterView().submit({
                url: 'api/v1/users/new',
                method: 'POST',
                scope: this,
                success: function(form, response){
                    Ext.Msg.alert('Registration Successful', 'Please log in.');
                },
                failure: function(form, response){
                    Ext.Msg.alert('Registration Failed', 'Please try again.');
                }
            });

        }
        else{

            error = errors.first();
            Ext.Msg.alert('Invalid Entry', Ext.String.format('Error "{0}":<br/>{1}.', error.getField(), error.getMessage()));

        }
    },

    onContactTap: function(button, e, options) {
        this.getContactView().submit({
            url: 'api/v1/users/comment',
            method: 'POST',
            scope: this,
            success: function(form, response){
                Ext.Msg.alert('Comment Received', 'Someone will respond to your comment shortly.');
            },
            failure: function(form, response){
                Ext.Msg.alert('Error', 'Sorry, your comment was not received. Please try again later.');
            }
        });
    },

    showView: function(view) {
        this.getMainView().push(view);
    },

    back: function() {
        this.getMainView().pop();
    },

    launch: function() {
        var user = window.localStorage.user;

        if(user){
            this.silentlogin(Ext.decode(user));
        }
        else {
            this.showView(this.getLoginView());
        }
    },

    silentlogin: function(user) {
        Ext.Ajax.request({
            url: 'api/v1/users/relogin',
            method: 'POST',
            params: {
                username: user.username,
                password: user.password
            },
            scope: this,
            success: function(response){
                this.loginComplete(Ext.decode(response.responseText).user);
            },
            failure: function(response){
                Ext.Msg.alert('Login Failed', 'Please try again.');
                console.log(localStorage.user);

                delete window.localStorage.user;
                window.location.reload();


            }
        });
    },

    loginComplete: function(user) {
        window.localStorage.user = Ext.encode(user);
        this.getApplication().fireEvent('showfeeds');
        this.showLogoutButton();
        this.showNewFeedButton();
        this.showUsersButton();
    },

    showLogoutButton: function() {
        this.getMainView().getNavigationBar().add({
            xtype: 'button',
            action: 'logout',
            ui: 'action',
            text: 'Logout'
        });

        this.getLogoutButton().show({
            type: 'pop'
        });
    },

    showNewFeedButton: function() {
        this.getMainView().getNavigationBar().add({
            xtype: 'button',
            action: 'newfeed',
            ui: 'action',
            iconMask: true,
            iconCls: 'add',
            align: 'right'
        });

        this.getNewFeedButton ().show({
            type: 'pop'
        });
    },

    hideLogoutButton: function() {
        this.getLogoutButton().destroy(true);
    },

    hideNewFeedButton: function() {
        this.getNewFeedButton().destroy(true);

    },

    showUsersButton: function() {
        this.getMainView().getNavigationBar().add({
            xtype: 'button',
            action: 'users',
            ui: 'action',
            iconMask: true,
            iconCls: 'user',
            align: 'right'
        });

        this.getUsersButton ().show({
            type: 'pop'
        });
    },

    hideUsersButton: function() {
        this.getUsersButton().destroy(true);
    },

    init: function(application) {

        application.on([
        { event: 'showview', fn: this.showView, scope: this },
        { event: 'back', fn: this.back, scope: this }
        ]);
    }

});
