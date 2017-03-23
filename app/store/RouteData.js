Ext.define('ES.store.RouteData', {
    extend: 'Ext.data.Store',

    alias: 'store.routedata',

    fields: [
        'name', 'email', 'phone'
    ],
    data: { items: [
        { lat: '1', lng: '2', at: '3', distance: '4', direction: '5', dkm: '6', vel: '7' }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
