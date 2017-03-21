
Ext.define('ES.view.Layout.Toolbar.Toolbar',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ES.view.Layout.Toolbar.ToolbarController',
        'ES.view.Layout.Toolbar.ToolbarModel'
    ],

    controller: 'layout-toolbar-toolbar',
    viewModel: {
        type: 'layout-toolbar-toolbar'
    },

    html: 'Hello, World!!'
});
