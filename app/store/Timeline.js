Ext.define('ES.store.Timeline', {
    extend: 'Ext.data.Store',
    alias: 'store.timeline',
    storeId: 'timeline',
    fields: [
        'vid', 'time', 'lat', 'lng', 'address', 'dir', 'vel'
    ],
    pageSize: 500,
    autoSync:true,
    sorters: [
            {
                property: 'time',
                direction: 'DESC'
            }
        ],
    data: {
        query: []},

    proxy: {
        type: 'sessionstorage',
        id: 'sessionTimeline',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    }
});