Ext.define('ES.view.Layout.Locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.translation',

    onMenuItemClick: function(item, e, options){
        var menu = this.getView(); 
        menu.setIconCls(item.iconCls); 
        menu.setText(item.text); 
        console.log("teste");
        localStorage.setItem("user-lang", item.iconCls); 
        location.reload();
    },

    init: function() {
            var lang = localStorage ? (localStorage.getItem('user-lang') || 'en' ) : 'en',
                button = this.getView();

            button.setIconCls(lang);
            if (lang == 'en') {
              button.setText('English');
            }else{
              button.setText('Português'); 
            }
    }
});