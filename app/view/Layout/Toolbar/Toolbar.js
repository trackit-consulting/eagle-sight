Ext.define('ES.view.Layout.Toolbar.Toolbar', {

    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbar',
    requires: [
        'Ext.layout.container.Fit'
    ],
    controller: 'toolbar',
    viewModel: 'toolbar',

    items: ["<-", {

            xtype: 'image',

            id: 'logo',
            src: 'ext/resources/images/logo.png',
            width: 110,
            height: 40,
            style: {
                "margin-left": "-16px",

            }

        },
        "->", {

            xtype: 'image',
            id: 'project_logo',
            src: 'ext/resources/images/project_logo.png',
            width: 170,
            height: 70,
            style: {
                "margin-right": "20px"

            }

        }



    ]

});