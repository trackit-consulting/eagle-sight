function loadLocale() {

    var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
        file = Ext.util.Format.format("ext/resources/translations/{0}.js", lang);
    Ext.Loader.loadScript({
        url: file,
        onError: function() {
            alert('Error loading locale file. Please contact system administrator.');
        }
    });
}

loadLocale();


/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('ES.Application', {
    extend: 'Ext.app.Application',

    name: 'ES',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function() {
        // TODO - Launch the application
        Ext.tip.QuickTipManager.init();

        console.log('done');
    },

    init: function() {
        var me = this;
        me.splashscreen = Ext.getBody().mask(
            "A carregar a página, por favor aguarde.", 'splashscreen'
        );



        var task = new Ext.util.DelayedTask(function() {

            // fade out the body mask
            me.splashscreen.fadeOut({
                duration: 500,
                remove: true
            });
        });

        task.delay(1000);
    },

    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});