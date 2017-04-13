Ext.define('ES.view.Layout.Menu.Menu', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.timelineBar',
    controller: 'menu',
    viewModel: 'menu',
    overflowY: 'auto',
    id: 'timelineBar',
    autoScroll:true,
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
                }
            },
            {
                text: locale.address,
                dataIndex: 'address',
                flex: 1,
                align: 'center',
                height: 60,
                style: {
                    "background-color": "#0b4439",
                    "color": "white",
                    "outline": "1px solid #2b5876"
                },
                renderer: function(value, metaData) {
                    metaData.style = "background-color:#136c5a; color: white; outline: 1px solid white; padding:20px";
                    return value;
                },

                listeners: {

                    click: 'onItemClick'

                }
            },
            {
                text: locale.dir,
                dataIndex: 'dir',
                flex: 1,
                align: 'center',
                height: 60,
                style: {
                    "background-color": "#2f699b",
                    "color": "white",
                    "outline": "1px solid #2b5876"
                },
                renderer: function(value, metaData, record) {
                   metaData.style = "background-color:#2b5876; color: white; outline: 1px solid white; padding: 20px;";
                     switch (value) {
                         case 'N':
                         return '<img width="13" height="13" src="/ext/resources/directions/north.png" />';
                         break;

                         case 'S':
                         return '<img width="13" height="13" src="/ext/resources/directions/south.png" />';
                         break;

                         case 'W':
                         return '<img width="13" height="13" src="/ext/resources/directions/west.png" />';
                         break;

                         case 'E':
                         return '<img width="13" height="13" src="/ext/resources/directions/east.png" />';
                         break;

                         case 'NE':
                         return '<img width="13" height="13" src="/ext/resources/directions/northeast.png" />';
                         break;

                         case 'NW':
                         return '<img width="13" height="13" src="/ext/resources/directions/northwest.png" />';
                         break;

                        case 'SW':
                        return '<img width="13" height="13" src="/ext/resources/directions/southwest.png" />';
                        break;

                        case 'SE':
                        return '<img width="13" height="13" src="/ext/resources/directions/southeast.png" />';
                        break; 

                        case 'NNE':
                        return '<img width="13" height="13" src="/ext/resources/directions/northeast.png" />';
                        break;
                        
                        case 'ENE':
                        return '<img width="13" height="13" src="/ext/resources/directions/northeast.png" />';
                        break;

                        case 'WNW':
                        return '<img width="13" height="13" src="/ext/resources/directions/northwest.png" />';
                        break;

                        case 'NNW':
                        return '<img width="13" height="13" src="/ext/resources/directions/northwest.png" />';
                        break;

                        case 'SSW': 
                        return '<img width="13" height="13" src="/ext/resources/directions/southwest.png" />';
                        break;

                        case 'WSW':
                        return '<img width="13" height="13" src="/ext/resources/directions/southwest.png" />';
                        break;

                        case 'SSE':
                        return '<img width="13" height="13" src="/ext/resources/directions/southeast.png" />';
                        break;

                        case 'ESE':
                        return '<img width="13" height="13" src="/ext/resources/directions/southeast.png" />';
                        break;
                     } 
                }

            }
        ]
    }
});