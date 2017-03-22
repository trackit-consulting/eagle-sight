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
        Polyline: {
            storeId: 'Polyline',
            autoLoad: true,
            fields: ['lat', 'lng'],
            data: [
                /*
                {lat: 38.6619788, lng: -9.0758742},
                {lat: 38.6449281, lng: -9.0637415},
                {lat: 38.6509715, lng: -9.0598949}
                */
            ]
        }
    }
});
