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
