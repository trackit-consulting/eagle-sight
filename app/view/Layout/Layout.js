Ext.define('ES.view.Layout.Layout', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.layout',

    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.LayoutController',
        'ES.view.Layout.LayoutModel',
        'ES.view.Layout.Toolbar.ToolbarController',
        'ES.view.Layout.Toolbar.ToolbarModel',

    ],
    controller: 'layout',
    viewModel: 'layout',
    layout: 'border',
    items: [
        {
            xtype: 'map',
            region: 'center',
        },
        {
            xtype: 'toolbar',
            region: 'north',
            plugins: 'responsive',
            height: 45,
            style: {
                background: 'linear-gradient(to left, #517fa4 , #243949)',
            }
        },
		{
		    xtype: 'menu',
			region: 'west',
            width: 250,
            height: 500,
            style: {
                background: 'linear-gradient(to left, #385871 , #507ea3)',
            }
		}

    ]
});