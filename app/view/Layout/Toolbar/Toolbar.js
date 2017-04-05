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

         {xtype: 'tbspacer', width:10},

            {
                xtype: 'translationbtn',

            },
        "->", {

            xtype: 'image',
            alt: 'project_logo',
            id: 'project_logo',
            src: 'ext/resources/images/project_logo.png',
            width: 155,
            height: 65,
            style: {
                "margin-right": "20px"

            }

        }



    ]

});