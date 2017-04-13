Ext.define('ES.view.Layout.Toolbar.Toolbar', {

    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.tb',
    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.Locale.Translation'
    ],
    controller: 'toolbar',
    viewModel: 'toolbar',

    items: ["<-", {

            xtype: 'image',
            alt: 'logo',
            id: 'logo',
            src: 'ext/resources/images/logo.png',
            width: 90,
            height: 35,
            style: {
                "margin-left": "-16px",
            }
        },

        {
            xtype: 'tbspacer',
            width: 2
        },

        {
            xtype: 'translationbtn',

        },
        "->", {

            xtype: 'button',
            id: 'btnClear',
            width: 100,
            height: 35,
            text: "<span style='color:white'>CLEAR</span>",
            style: {
                "background": "transparent",
                "border-radius": "10px",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "margin-right": "-5px",
                "letter-spacing":"1px"
            },      
            listeners: {

               click: function() {
                    var timelineStore = Ext.getStore('timeline');
                    timelineStore.removeAll();
               },
               'mouseover': function(){

                Ext.getCmp("btnClear").setStyle('background-color', 'rgba(255,255,255,0.3)');

               },
               'mouseout': function(){

                Ext.getCmp("btnClear").setStyle('background-color', 'transparent');

               }

            }
        },
        "<-", {

            xtype: 'image',
            alt: 'project_logo',

            src: 'ext/resources/images/project_logo.png',
            width: 140,
            height: 60,

            style: {
                "margin-right": "20px"

            }
        }


    ]

});