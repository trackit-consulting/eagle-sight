Ext.define('ES.util.Helper.Alerts', {
  statics: {
    wsOpenedAlert: function() {
      Ext.Msg.alert(locale.alert, "Bem-vindo, acompanhe em tempo real a trajetória do veículo.");
    },

    wsClosedAlert: function() {
      Ext.Msg.alert(locale.alert, "A ligação foi encerrada.");
    },

    wsErrorAlert: function() {
      Ext.Msg.alert(locale.alert, "Lamentamos, aconteceu um erro durante a ligação.");
    }
  }
});