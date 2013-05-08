Ext.define('RSS.view.Contact', {
    extend: 'Ext.form.Panel',
    alias: 'widget.contactview',

    config: {
        cls: [
            'contact-view'
        ],
        items: [
            {
                xtype: 'image',
                height: 71,
                src: 'images/logo.png'
            },
            {
                xtype: 'fieldset',
                title: 'Contact',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Email',
                        name: 'email'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                instructions: 'max char 500',
                items: [
                    {
                        xtype: 'textareafield',
                        name: 'comment'
                    }
                ]
            },
            {
                xtype: 'button',
                action: 'contact',
                height: 50,
                margin: '1em 0 0 0',
                ui: 'action',
                text: 'Contact'
            }
        ]
    }

});
