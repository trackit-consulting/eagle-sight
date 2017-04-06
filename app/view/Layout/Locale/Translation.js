Ext.define('ES.view.Layout.Locale.Translation', {
    extend: 'Ext.button.Split',
    requires: [
        'ES.view.Layout.Locale.TranslationController',
        'ES.view.Layout.Locale.TranslationModel'
    ],
    alias: "widget.translationbtn",
    controller: 'translation',
    viewModel: 'translation',
    menu: new Ext.menu.Menu({
        transitionType: 'slide',
        delay: 0.2, // default
        autoWidth: true, // default
        bodyStyle: {
            "background-color": "rgba(255,255,255,0.6)"
        },
        transitionDuration: 0.3, // default
        animate: true, 
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: 'English',
                height:30,
                listeners: {
                    click: "onMenuItemClick"
                }
            },
            {
                xtype: 'menuitem',
                iconCls: 'pt_PT',
                text: 'Português',
                 height:30,
                listeners: {
                    click: "onMenuItemClick"
                }
            },
            {
                xtype:'menuitem',
                iconCls:'es',
                text:'Español',
                height:30,
                listeners: {
                    click:"onMenuItemClick"
                }
            },
            {
                xtype:'menuitem',
                iconCls:'fr',
                text:'Français',
                height:30,
                listeners: {
                    click:"onMenuItemClick"
                }
            }
        ]
    })
});
