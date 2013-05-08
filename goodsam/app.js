Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Feed',
        'News',
        'Instagram',
        'User'
    ],
    stores: [
        'Feeds',
        'News',
        'Data',
        'Users'
    ],
    views: [
        'Main',
        'Login',
        'Feeds',
        'News',
        'NewsDetails',
        'FeedEdit',
        'Viewport',
        'Timeline',
        'Register',
        'Contact',
        'Users',
        'Profile',
        'MyFormPanel7'
    ],
    name: 'RSS',
    controllers: [
        'Main',
        'Feeds',
        'Users'
    ],

    launch: function() {

        Ext.create('RSS.view.Viewport', {fullscreen: true});
    }

});
