/*
 * File: app/store/Data.js
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

Ext.define('MyApp.store.Data', {
    extend: 'Ext.data.Store',
    alias: 'store.data',

    requires: [
        'MyApp.model.Instagram'
    ],

    config: {
        autoLoad: true,
        model: 'MyApp.model.Instagram',
        storeId: 'data',
        proxy: {
            type: 'jsonp',
            url: 'https://api.instagram.com/v1/tags/gooddeed/media/recent?client_id=%207bff020e004c4170a0818f85dc8ebce4',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});