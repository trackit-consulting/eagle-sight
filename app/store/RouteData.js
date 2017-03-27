Ext.define('ES.store.RouteData', {
    extend: 'Ext.data.Store',
    alias: 'store.routedata',

    fields: [
        'name', 'email', 'phone'
    ],
    data: { items: [
        {at: '3', distance: '4', dkm: '6', vel: '7' }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
