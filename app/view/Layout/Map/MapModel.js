Ext.define('ES.view.Layout.Map.MapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.map',
    stores: {
        Markers: {
            storeId: 'Markers',
            autoLoad: true,
            fields: ['lat', 'lng'],
            data: [
                {lat: 38.6619788, lng: -9.0758742},
                {lat: 38.6509715, lng: -9.0598949}
            ]
        },
        Distance: {
            storeId: 'Distance',
            autoLoad: true,
            fields: ['lat', 'lng', 'dist'],
            data: []
        },
        ArrivalTime: {
            storeId: 'ArrivalTime',
            autoLoad: true,
            fields: ['lat', 'lng', 'time'],
            data: []
        },
        Polyline: {
            storeId: 'Polyline',
            autoLoad: true,
            fields: ['lat', 'lng'],
            data: []
        }
    }
});
