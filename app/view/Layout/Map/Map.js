Ext.define('ES.view.Layout.Map.Map',{
    
    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.map',
    requires: [
        'Ext.layout.container.Fit'
    ],
    layout: 'fit',
    controller: 'map',
    viewModel: 'map',
    center: new google.maps.LatLng(40.350054, -8.5809265)

});