Ext.define('ES.view.Layout.Menu.Menu', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.timelineBar',
    controller: 'menu',
    viewModel: 'menu',
    //autoScroll:true,
    overflowY: 'auto',

    title: 'Timeline',
    bodyStyle: 'background: #2b5876;',
    autoHeight:true,
    store: {
        type: 'timeline'
    },
    columns: {
        border: false,
        defaults: {
            hoverCls: ''
        },

        items: [{
                text: locale.time,
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
                text: locale.address,
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
                text: locale.dir,
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