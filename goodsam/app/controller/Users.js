Ext.define('RSS.controller.Users', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            usersView: {
                autoCreate: true,
                selector: 'usersview',
                xtype: 'usersview'
            },
            profileView: {
                autoCreate: true,
                selector: 'profileview',
                xtype: 'profileview'
            },
            deleteUserButton: 'button[action=delete]'
        },

        control: {
            "button[action=users]": {
                tap: 'onUsersTap'
            },
            "profileview": {
                disclose: 'onProfileDisclose',
                select: 'onProfileSelect'
            },
            "usersview button[action=delete]": {
                tap: 'onRemoveAccount'
            },
            "usersview button[action=save]": {
                tap: 'onUpdateUser'
            }
        }
    },

    onUsersTap: function(button, e, options) {
        this.getApplication().fireEvent('showusers');

    },

    onProfileDisclose: function(list, record, target, index, e, options) {
        var view = this.getUsersView(),
            form = view.down('formpanel');

        form.setRecord(record);

        this.getApplication().fireEvent('showview', view);
        this.getDeleteUserButton().show();
    },

    onProfileSelect: function(dataview, record, options) {
        var view = this.getUsersView(),
            form = view.down('formpanel');

        form.setRecord(record);

        this.getApplication().fireEvent('showview', view);
        this.getDeleteUserButton().show();
    },

    onRemoveAccount: function(button, e, options) {
        var me = this;
        me.getUsersView().down('formpanel').getRecord().erase({
            success: function(){
                Ext.getStore('Users').load();
                delete window.localStorage.user;
                window.location.reload();
            },
            failure: function(){
                Ext.Msg.alert('Error', 'Sorry, there was an error l\'deleting your account.');
            } 
        });

    },

    onUpdateUser: function(button, e, options) {
        var me = this,
            view = me.getUsersView(),
            form = view.down('formpanel'),
            values = form.getValues(),
            user = form.getRecord() || Ext.create('RSS.model.User'),
            errors;

        user.setData(values);

        errors = user.validate();

        if(!errors.length){

            user.save({
                success: function() {
                    Ext.getStore('Users').load();
                    me.getApplication().fireEvent('back');
                },
                failure: function(){
                    Ext.Msg.alert('Error Saving', 'Sorry, there was an error updating your account. Please try again.');
                }
            });
        }
        else{

            error = errors.first();
            Ext.Msg.alert('Invalid Entry', Ext.String.format('Error "{0}":<br/>{1}.', error.getField(), error.getMessage()));

        }
    },

    onShowusers: function() {
        this.getApplication().fireEvent('showview', this.getProfileView());
        Ext.getStore('Users').load();
    },

    init: function(application) {

        application.on([
        { event: 'showusers', fn: this.onShowusers, scope: this }
        ]);
    }

});
