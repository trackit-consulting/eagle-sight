
Ext.define('ES.view.Layout.Map.Map',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ES.view.Layout.Map.MapController',
        'ES.view.Layout.Map.MapModel'
    ],

    controller: 'layout-map-map',
    viewModel: {
        type: 'layout-map-map'
    },

    html: 'Hello, World!!'
});
