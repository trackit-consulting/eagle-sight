Ext.define('ES.view.Layout.Menu.Menu',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.menu',
			width: '150',
            height: '350',
    requires: [
        'Ext.layout.container.Fit'
    ],
    layout: 'fit',
    controller: 'menu',
    viewModel: 'menu',
        items: [{
        text: 'abc',
        checked: false,
        group: 'theme',
        handler: function() {
        }
    }]

});
