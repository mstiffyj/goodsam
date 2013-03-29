/*
 * File: app/view/FeedEdit.js
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

Ext.define('RSS.view.FeedEdit', {
    extend: 'Ext.Container',
    alias: 'widget.feededitview',

    config: {
        layout: {
            type: 'fit'
        },
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
                        title: 'Name',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'name'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Url',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'url',
                                placeHolder: 'http://feeds.feedburner.com'
                            }
                        ]
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    },
                    {
                        xtype: 'button',
                        action: 'save',
                        height: 50,
                        ui: 'action',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        height: 50,
                        hidden: true,
                        style: 'margin-top: 10px;',
                        ui: 'decline',
                        text: 'Delete'
                    }
                ]
            }
        ]
    }

});