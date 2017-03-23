/**
 * This view is an example list of people.
 */
Ext.define('ES.view.main.RouteList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    requires: [
        'ES.store.RouteData'
    ],

    title: 'RouteData',

    store: {
        type: 'routedata'
    },

    //Latitude, longitude, arrival time, distance, sentido, km andados, velocidade
    //lat, lng, at, distance, direction, dkm, vel
    forceFit: true,
    columns: [
        { text: 'Latitude',  dataIndex: 'lat', style: {
            'background-color': 'transparent'
        } },
        { text: 'Longitude', dataIndex: 'lng' },
        { text: 'Arrival Time', dataIndex: 'at' },
        { text: 'Distance', dataIndex: 'distance'},
        { text: 'Direction', dataIndex: 'direction'},
        { text: 'Travelled Distance', dataIndex: 'dkm' },
        { text: 'Speed', dataIndex: 'vel'}
    ],

    listeners: {
        select: 'onItemSelected',
        init: function(){
            
        }
    }
});
