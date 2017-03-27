Ext.define('ES.view.Layout.Layout', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.layout',

    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.LayoutController',
        'ES.view.Layout.LayoutModel',
        'ES.view.Layout.Toolbar.ToolbarController',
        'ES.view.Layout.Toolbar.ToolbarModel'

    ],

    controller: 'layout',
    viewModel: 'layout',
    layout: 'border',
    items: [{
            xtype: 'map',
            region: 'center',
        },
        {
            xtype: 'toolbar',
            region: 'north',
            plugins: 'responsive',
            height: 80,
            style: {
                background: 'linear-gradient(to left, #4e4376,#2b5876)',
                'text-align': 'center',
                'vertical-align': 'middle'
            },

        },
        {
            region: 'west',
            layout: 'fit',
            xtype: 'menu',
            title: 'Timeline',
            width: 320,
            collapsible: true,
            height: 500,
            style: {
                background: 'linear-gradient(to left, #385871 , #507ea3)',
            }

        }
    ]


});