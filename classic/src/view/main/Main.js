Ext.define('ES.view.main.Main', {
  extend: 'Ext.container.Viewport',
  xtype: 'app-main',
  requires: [
    'Ext.plugin.Viewport'
  ],
  layout: 'fit',
  items: [{
    xtype: 'layout'
  }]
});