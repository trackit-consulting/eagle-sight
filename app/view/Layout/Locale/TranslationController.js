Ext.define('ES.view.Layout.Locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.translation',

    onMenuItemClick: function(item, e, options){
        var menu = this.getView(); 
        menu.setIconCls(item.iconCls); 
        menu.setText(item.text); 
        localStorage.setItem("user-lang", item.iconCls); 
        location.reload();
    },

     //look for language preferences saved at LocalStore

    init: function() {
            var lang = localStorage ? (localStorage.getItem('user-lang') || 'en' ) : 'en',
                button = this.getView();

    //when the button is clicked it is possible to change the language in which the page is

            button.setIconCls(lang);
            if (lang == 'en') {
              button.setText('English');
            }else if (lang == 'pt_PT'){
              button.setText('Português'); 
            }else if (lang == 'es'){
                button.setText('Español');
            }else{
                button.setText('Français');
            }
    }
});