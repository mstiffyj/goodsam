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
            }
        },

        control: {
            "button[action=users]": {
                tap: 'onUsersTap'
            },
            "button[action=friends]": {
                tap: 'onFriendsTap'
            }
        }
    },

    onUsersTap: function(button, e, options) {
        this.getApplication().fireEvent('showusers');

    },

    onFriendsTap: function(button, e, options) {
        this.getApplication().fireEvent('showfriends');

    },

    onShowusers: function() {
        this.getApplication().fireEvent('showview', this.getUsersView());
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