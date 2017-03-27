Ext.define('ES.store.RouteData', {
    extend: 'Ext.data.Store',
    alias: 'store.routedata',

    storeId: 'routedata',
    fields: [
        'at', 'dkm', 'vel', 'countdown'
    ],
    autoLoad: true,
    data: {
        storeId: 'routedata',
        query: [{
                at: '',
                dkm: '',
                vel: '',
                countdown: ''
            },
            {
                at: '',
                dkm: '',
                vel: '',
                countdown: ''
            }
        ]
    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    }

});