/**
 * This view is an example list of people.
 */
Ext.define('ES.view.main.Timelinelist', {
    extend: 'Ext.grid.Panel',
    xtype: 'timelinelist',

    requires: [
        'ES.store.Timeline'
    ],

    title: 'Timeline',
    bodyStyle: 'background: #2b5876;',
    store: {
        type: 'timeline'
    },

    columns: {
        border: false,
        defaults: {
            hoverCls: ''
        },

        items: [{
                text: 'Time',
                dataIndex: 'time',
                align: 'center',
                height: 60,
                style: {
                    "background-color": "#2f699b",
                    "color": "white",
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#2b5876; color: white; outline: 1px solid white; padding:20px;";
                    return value;
                },
            },
            {
                text: 'Adress',
                dataIndex: 'adress',
                align: 'center',
                height: 60,
                style: {
                    "background-color": "#2f699b",
                    "color": "white",
                    "outline": "1px solid #2b5876"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#2b5876; color: white; outline: 1px solid white; padding:20px";
                    return value;
                },
            },
            {
                text: 'Direction',
                dataIndex: 'dir',
                flex: 1,
                align: 'right',
                width: 75,
                height: 60,
                style: {
                    "background-color": "#2f699b",
                    "color": "white",
                    "outline": "1px solid #2b5876"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#2b5876; color: white; outline: 1px solid white; padding: 20px;";
                    return value;
                },
                
            }]
    },
    listeners: {
        select: 'onItemSelected'
    }
});