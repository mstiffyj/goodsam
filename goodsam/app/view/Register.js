/*
 * File: app/view/Register.js
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

Ext.define('RSS.view.Register', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerview',

    config: {
        layout: {
            type: 'fit'
        },
        cls: [
            'register-view'
        ],
        items: [
            {
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'image',
                        height: 71,
                        src: 'images/logo.png'
                    },
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'default'
                        },
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Username',
                                name: 'username',
                                required: true
                            },
                            {
                                xtype: 'passwordfield',
                                label: 'Password',
                                name: 'password',
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                label: 'First',
                                name: 'name'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Last',
                                name: 'surname'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Email',
                                name: 'email',
                                required: true
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'date',
                                value: new Date().getUTCMilliseconds()
                            },
                            {
                                xtype: 'checkboxfield',
                                label: 'Newsletter',
                                name: 'newsletter',
                                value: 'Yes',
                                checked: true
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        action: 'register',
                        height: 50,
                        margin: '1em 0 0 0',
                        ui: 'action',
                        text: 'Register'
                    }
                ]
            }
        ]
    }

});