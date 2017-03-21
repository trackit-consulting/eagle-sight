
Ext.define('ES.view.Layout.Menu.Menu',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ES.view.Layout.Menu.MenuController',
        'ES.view.Layout.Menu.MenuModel'
    ],

    controller: 'layout-menu-menu',
    viewModel: {
        type: 'layout-menu-menu'
    },

    html: 'Hello, World!!'
});
