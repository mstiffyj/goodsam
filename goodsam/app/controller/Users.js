/*
 * File: app/controller/Users.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('RSS.controller.Users', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            usersView: {
                autoCreate: true,
                selector: 'usersview',
                xtype: 'usersview'
            },
            friendsView: {
                autoCreate: true,
                selector: 'friendsview',
                xtype: 'friendsview'
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
            "button[action=friends]": {
                tap: 'onFriendsTap'
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

    onFriendsTap: function(button, e, options) {
        this.getApplication().fireEvent('showfriends');

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

    onShowfriends: function() {
        this.getApplication().fireEvent('showview', this.getFriendsView());
        Ext.getStore('Friends').load();
    },

    init: function(application) {

        application.on([
        { event: 'showusers', fn: this.onShowusers, scope: this },
        { event: 'showfriends', fn: this.onShowfriends, scope: this }
        ]);
    }

});