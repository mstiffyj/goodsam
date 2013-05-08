Ext.define('RSS.model.Feed', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'url',
                type: 'string'
            },
            {
                name: 'user_id',
                type: 'int'
            }
        ],
        proxy: {
            type: 'rest',
            api: {
                create: 'api/v1/feeds/new',
                read: 'api/v1/feeds/all',
                update: 'api/v1/feeds/update',
                destroy: 'api/v1/feeds/remove'
            }
        },
        validations: [
            {
                type: 'presence',
                field: 'name'
            },
            {
                type: 'presence',
                field: 'url'
            },
            {
                type: 'format',
                matcher: /^http:\/\/.?/,
                field: 'url'
            }
        ]
    }
});
