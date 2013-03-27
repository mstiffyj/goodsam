/*
 * File: app/model/Friends.js
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

Ext.define('RSS.model.Friends', {
    extend: 'Ext.data.Model',

    config: {
        identifier: {
            type: 'simple'
        },
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'surname',
                type: 'string'
            },
            {
                name: 'username',
                type: 'string'
            },
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'email',
                type: 'string'
            }
        ],
        proxy: {
            type: 'rest',
            api: {
                create: 'api/v1/users/new',
                read: 'api/v1/users/friends',
                update: 'api/v1/users/update',
                destroy: 'api/v1/users/remove'
            }
        }
    }
});