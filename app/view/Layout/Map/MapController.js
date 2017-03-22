Ext.define('ES.view.Layout.Map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window'
    ],
    config: {
        listen: {
            component: {
                'map': {

                    mapready: function(gmappanel) {

                    }
                }
            }
        }
    },

    init: function() {


    }


});