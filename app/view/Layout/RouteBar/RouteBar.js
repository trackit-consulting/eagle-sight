Ext.define('ES.view.Layout.RouteBar.RouteBar', {
  extend: 'Ext.grid.Panel',
  requires: ['Ext.window.Toast'],
  alias: 'widget.routebar',
  title: 'RouteData',
  controller: 'routebar',
  viewModel: 'routebar',
  width: '100%',
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
          "background-color": "#0b4439",
          "color": "white",
          "border-right": "1px solid #237263"
        },
        renderer: function(value, metaData) {
          var color;
          if (metaData.rowIndex == 1) {
            color = "#204056";
          } else {
            color = "#1b6053";
          }
          metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #33776a";
          return value;
        },
        listeners: {
          click: 'cellclick'
        }
      },
      {
        text: locale.countdown,
        dataIndex: 'countdown',
        height: 45,
        align: 'center',
        style: {
          "background-color": "#0b4439",
          "color": "white",
          "border-right": "1px solid #237263"
        },
        renderer: function(value, metaData) {
          var color;
          if (metaData.rowIndex == 1) {
            color = "#204056";
          } else {
            color = "#1b6053";
          }
          metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #33776a";
          return value;
        },
        listeners: {
          click: 'cellclick'
        }
      },
      {
        text: locale.dkm,
        dataIndex: 'dkm',
        height: 45,
        align: 'center',
        style: {
          "background-color": "#0b4439",
          "color": "white",
          "border-right": "1px solid #237263"
        },
        renderer: function(value, metaData) {
          var color;
          if (metaData.rowIndex == 1) {
            color = "#204056";
          } else {
            color = "#1b6053";
          }
          metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #33776a";
          return value;
        },
        listeners: {
          click: 'cellclick'
        }
      },
      {
        text: locale.vel,
        dataIndex: 'vel',
        height: 45,
        align: 'center',
        style: {
          "background-color": "#0b4439",
          "color": "white",
          "border-right": "1px solid #237263"
        },
        renderer: function(value, metaData) {
          var color;
          if (metaData.rowIndex == 1) {
            color = "#204056";
          } else {
            color = "#1b6053";
          }
          metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #33776a";
          return value;
        },
        listeners: {
          click: 'cellclick'
        }
      }
    ]
  }
});