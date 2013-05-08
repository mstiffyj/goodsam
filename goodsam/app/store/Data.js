Ext.define('RSS.store.Data', {
    extend: 'Ext.data.Store',
    alias: 'store.data',

    requires: [
        'RSS.model.Instagram'
    ],

    config: {
        autoLoad: true,
        model: 'RSS.model.Instagram',
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
