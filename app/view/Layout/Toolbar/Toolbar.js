Ext.define('ES.view.Layout.Toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.tb',
    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.Locale.Translation',
        'ES.util.Helper.GlobalVars',
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
                "margin-left": "-16px"
            },
            listeners: {
                afterrender: function() {

                    if (ES.util.Helper.Mobile.isMobile()) {
                        Ext.getCmp("logo").setHeight(25);
                        Ext.getCmp("logo").setWidth(60);
                    }

                }
            }
        },
        {
            xtype: 'tbspacer',
            width: 2
        },
        {
            xtype: 'translationbtn'
        },
        "->", {
            xtype: 'image',
            alt: 'connection',
            id: 'con',
            width: 15,
            height: 15,
            style: {
            
            },
            listeners: {
                afterrender: function() {
 
                    setInterval(function() {
                        switch (ES.util.Helper.GlobalVars.countPing) {

                            case 1:

                                Ext.getCmp("con").setSrc("ext/resources/connected/green-ball.png");

                                break;

                            case 2:

                                Ext.getCmp("con").setSrc("ext/resources/connected/yellow-ball.png");

                                break;

                            case 3:

                                Ext.getCmp("con").setSrc("ext/resources/connected/orange-ball.png");

                                break;

                            case 4:

                                Ext.getCmp("con").setSrc("ext/resources/connected/red-ball.png");

                                break;
                            
                            default:

                                Ext.getCmp("con").setSrc("ext/resources/connected/red-ball.png");

                        }
                    }, 5000);
                }
            }

        },
        "<-", {
            xtype: 'image',
            alt: 'project_logo',
            id: 'project_logo',
            src: 'ext/resources/images/project_logo.png',
            width: 140,
            height: 60,
            style: {
                "margin-right": "10px"
            },
            listeners: {
                afterrender: function() {

                    if (ES.util.Helper.Mobile.isMobile()) {
                        Ext.getCmp("project_logo").setHeight(45);
                        Ext.getCmp("project_logo").setWidth(80);
                    }

                }
            }
        }
    ]
});