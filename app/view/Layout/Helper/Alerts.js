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
    },

    wsNoResults: function() {
      Ext.Msg.alert(locale.alert, "Lamentamos, não foi encontrado nenhum registo");
    },

    wsGeocoderError: function(error) {
      Ext.Msg.alert(locale.alert, "Geocoder falhou devido ao seguinte erro:" + error);
    }
  }
});