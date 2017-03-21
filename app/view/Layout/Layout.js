
Ext.define('ES.view.Layout.Layout',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ES.view.Layout.LayoutController',
        'ES.view.Layout.LayoutModel'
    ],

    controller: 'layout-layout',
    viewModel: {
        type: 'layout-layout'
    },

    html: 'Hello, World!!'
});
