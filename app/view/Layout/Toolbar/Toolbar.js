Ext.define('ES.view.Layout.Toolbar.Toolbar', {

    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbar',
    requires: [
        'Ext.layout.container.Fit'
    ],
    layout: 'fit',
    controller: 'toolbar',
    viewModel: 'toolbar',

/*
    items: [{

        text: 'abc',
        checked: false,
        group: 'theme',
        handler: function() {

        }
      
    }]
    */


});
