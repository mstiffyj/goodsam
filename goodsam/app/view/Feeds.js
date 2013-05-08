Ext.define('RSS.view.Feeds', {
    extend: 'Ext.dataview.List',
    alias: 'widget.feedsview',

    config: {
        store: 'Feeds',
        onItemDisclosure: true,
        cls: [
            'feeds-view'
        ],
        itemTpl: [
            '<div class="name">{name}</div>'
        ],
        plugins: [
            {
                xtype: 'component',
                type: 'pullrefresh'
            }
        ]
    }

});
