Ext.define('ES.store.RouteData', {
  extend: 'Ext.data.Store',
  alias: 'store.routedata',
  storeId: 'routedata',
  fields: [{
    name: 'at',
    type: 'string'
  }, {
    name: 'dkm',
    type: 'string'
  }, {
    name: 'vel',
    type: 'string'
  }, {
    name: 'countdown',
    type: 'string'
  }],
  autoLoad: true,
  data: {
    storeId: 'routedata',
    query: [{
        at: '',
        dkm: '',
        vel: '',
        countdown: ''
      },
      {
        at: '',
        dkm: '',
        vel: '',
        countdown: ''
      }
    ]
  },
  proxy: {
    type: 'memory',
    reader: {
      type: 'json',
      rootProperty: 'query'
    }
  }
});