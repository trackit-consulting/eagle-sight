Ext.define('ES.view.Layout.RouteBar.RouteBar', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.routebar',

    title: 'RouteData',
    controller: 'routebar',
    viewModel: 'routebar',
    forceFit: true,
    store: {
        type: 'routedata'
    },
    viewConfig: {
        markDirty: false
    },
    columns: {
        border: false,
        defaults: {
            hoverCls: ''
        },

        items: [{
                text: locale.at,
                dataIndex: 'at',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    var color;
                    if (metaData.rowIndex == 1) {
                        color = "#381f2e";
                    } else {
                        color = "#353c42";
                    }

                    metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #4b5055";
                    return value;
                },
                listeners: {

                    click: 'onItemClick'

                }
            },
            {
                text: locale.countdown,
                dataIndex: 'countdown',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    var color;
                    if (metaData.rowIndex == 1) {
                        color = "#381f2e";
                    } else {
                        color = "#353c42";
                    }

                    metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #4b5055";
                    return value;
                },
                listeners: {

                    click: 'onItemClick'

                }
            },
            {
                text: locale.dkm,
                dataIndex: 'dkm',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    var color;
                    if (metaData.rowIndex == 1) {
                        color = "#381f2e";
                    } else {
                        color = "#353c42";
                    }

                    metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #4b5055";
                    return value;
                },
                listeners: {

                    click: 'onItemClick'

                }
            },
            {
                text: locale.vel,
                dataIndex: 'vel',
                height: 45,
                align: 'center',
                style: {
                    "background-color": "#2a3136",
                    "color": "white",
                    "border-right": "1px solid #353c42"
                },
                renderer: function(value, metaData) {
                    var color;
                    if (metaData.rowIndex == 1) {
                        color = "#381f2e";
                    } else {
                        color = "#353c42";
                    }

                    metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #4b5055";
                    return value;
                },
                listeners: {

                    click: 'onItemClick'

                }
            }
        ]
    }
});