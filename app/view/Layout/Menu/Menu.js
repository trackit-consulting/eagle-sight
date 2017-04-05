Ext.define('ES.view.Layout.Menu.Menu', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.timelineBar',
    controller: 'menu',
    viewModel: 'menu',
    autoScroll:true,

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
                flex: 1,
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
                text: 'Address',
                dataIndex: 'address',
                flex: 1,
                align: 'center',
                height: 60,
                style: {
                    "background-color": "#351e47",
                    "color": "white",
                    "outline": "1px solid #2b5876"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#4f3068; color: white; outline: 1px solid white; padding:20px";
                    return value;
                },

                listeners: {

                    click: 'onItemClick'

                },
            },
            {
                text: 'Direction',
                dataIndex: 'dir',
                flex: 1,
                align: 'right',
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

            }
        ]
    }
});