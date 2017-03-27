Ext.define('ES.store.Timeline', {
    extend: 'Ext.data.Store',
    alias: 'store.timeline',
    storeId: 'timeline',
    fields: [
        'time', 'lat', 'lng', 'address', 'dir'
    ],
    autoLoad: true,
    sorters: [
            {
                property: 'time',
                direction: 'DESC'
            }
        ],
    data: { 
        storeId: 'timeline',
        query: [
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    }
});