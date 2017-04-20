Ext.define('ES.util.Helper.Alerts', {
  statics: {
    wsOpenedAlert: function() {
      Ext.Msg.alert(locale.alert, locale.welcome);
    },

    wsClosedAlert: function() {
      Ext.Msg.alert(locale.alert, locale.end);
    },

    wsErrorAlert: function() {
      Ext.Msg.alert(locale.alert, locale.connecterror );
    }
  }
});