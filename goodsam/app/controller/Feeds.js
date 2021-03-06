Ext.define('RSS.controller.Feeds', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            feedsView: {
                autoCreate: true,
                selector: 'feedsview',
                xtype: 'feedsview'
            },
            newsView: {
                autoCreate: true,
                selector: 'newsview',
                xtype: 'newsview'
            },
            newsDetailsView: {
                autoCreate: true,
                selector: 'newsdetailsview',
                xtype: 'newsdetailsview'
            },
            feedEditView: {
                autoCreate: true,
                selector: 'feededitview',
                xtype: 'feededitview'
            },
            deleteFeedButton: 'feededitview button[action=delete]'
        },

        control: {
            "feedsview": {
                disclose: 'onFeedDisclose',
                select: 'onFeedSelected'
            },
            "newsview": {
                disclose: 'onNewsDisclose'
            },
            "button[action=newfeed]": {
                tap: 'onNewFeedTap'
            },
            "feededitview button[action=delete]": {
                tap: 'onDeleteFeed'
            },
            "feededitview button[action=save]": {
                tap: 'onSaveFeed'
            }
        }
    },

    onFeedDisclose: function(list, record, target, index, e, options) {
        var store = Ext.getStore('News');

        store.getProxy().setExtraParam('q', record.get('url'));

        store.load({
            callback: this.onNewsLoaded,
            scope: this
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });
    },

    onNewsDisclose: function(list, record, target, index, e, options) {
        var view = this.getNewsDetailsView();
        view.setData(record.getData());
        this.getApplication().fireEvent('showview', view);
    },

    onNewFeedTap: function(button, e, options) {
        this.getApplication().fireEvent('showview', this.getFeedEditView());
    },

    onFeedSelected: function(dataview, record, options) {
        var view = this.getFeedEditView(),
            form = view.down('formpanel');

        form.setRecord(record);

        this.getApplication().fireEvent('showview', view);
        this.getDeleteFeedButton().show();
    },

    onDeleteFeed: function(button, e, options) {
        var me = this;
        me.getFeedEditView().down('formpanel').getRecord().erase({
            success: function(){
                Ext.getStore('Feeds').load();
                me.getApplication().fireEvent('back');
            },
            failure: function(){
                Ext.Msg.alert('Error', 'Sorry, there was an error l\'deleting the Feed.');
            } 
        });
    },

    onSaveFeed: function(button, e, options) {
        var me = this,
            view = me.getFeedEditView(),
            form = view.down('formpanel'),
            values = form.getValues(),
            feed = form.getRecord() || Ext.create('RSS.model.Feed'),
            errors;

        feed.setData(values);

        errors = feed.validate();

        if(!errors.length){

            feed.save({
                success: function() {
                    Ext.getStore('Feeds').load();
                    me.getApplication().fireEvent('back');
                },
                failure: function(){
                    Ext.Msg.alert('Error Saving', 'Sorry, there was an error saving the feed. Please try again.');
                }
            });
        }
        else{

            error = errors.first();
            Ext.Msg.alert('Invalid Feed', Ext.String.format('Error "{0}":<br/>{1}.', error.getField(), error.getMessage()));

        }
    },

    onShowfeeds: function() {
        this.getApplication().fireEvent('showview', this.getFeedsView());
        Ext.getStore('Feeds').load();
    },

    onNewsLoaded: function() {
        Ext.Viewport.setMasked(false);
        this.getApplication().fireEvent('showview', this.getNewsView());
    },

    init: function(application) {

        application.on([
        { event: 'showfeeds', fn: this.onShowfeeds, scope: this }
        ]);
    }

});
