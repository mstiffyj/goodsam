
Ext.define('RSS.store.Feeds', {
    extend: 'Ext.data.Store',

    requires: [
        'RSS.model.Feed'
    ],

    config: {
        model: 'RSS.model.Feed',
        storeId: 'Feeds',
        proxy: {
            type: 'ajax',
            url: 'api/v1/feeds/all',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});
