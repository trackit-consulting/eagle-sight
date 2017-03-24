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

    columns: {
        border: false,
        defaults: {
            hoverCls: '',

        },


        items: [{
                text: 'Arrival Time',
                dataIndex: 'at',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#353c42; color: white;  border-right: 1px solid #4b5055";
                    return value;
                },
            },
            {
                text: 'Distance',
                dataIndex: 'distance',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#353c42; color: white; border-right: 1px solid #4b5055";
                    return value;
                },
            },
            {
                text: 'Direction',
                dataIndex: 'direction',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#353c42; color: white; border-right: 1px solid #4b5055;";
                    return value;
                },
            },
            {
                text: 'Travelled Distance',
                dataIndex: 'dkm',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#353c42; color: white; border-right: 1px solid #4b5055;";
                    return value;
                },
            },
            {
                text: 'Speed',
                dataIndex: 'vel',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#353c42; color: white;";
                    return value;
                },
            }
        ]
    },

    listeners: {
        select: 'onItemSelected',
        init: function() {

        }
    }
});