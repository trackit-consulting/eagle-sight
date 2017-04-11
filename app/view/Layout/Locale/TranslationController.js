Ext.define('ES.view.Layout.Locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.translation',

    onMenuItemClick: function(item, e, options) {
        var menu = this.getView();
        menu.setIconCls(item.iconCls);
        menu.setText(item.text);
        localStorage.setItem("user-lang", item.iconCls);
        location.reload();
    },

    init: function() {

        var isMobile;
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            isMobile = true;
        } else {
            isMobile = false;
        }
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            button = this.getView();
        button.setIconCls(lang);
        if (lang == 'en') {
            setText('English');
        } else if (lang == 'pt_PT') {
            setText('Português');
        } else if (lang == 'es') {
            setText('Español');
        } else {
            setText('Français');
        }

        function setText(text) {
            if (isMobile) {
                button.setText('');
            } else {
                button.setText(text);
            }
        }
    }
});