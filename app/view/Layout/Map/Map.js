Ext.define('ES.view.Layout.Map.Map', {
  extend: 'Ext.ux.GMapPanel',
  alias: 'widget.map',
  requires: [
    'Ext.layout.container.Fit'
  ],
  layout: 'fit',
  controller: 'map',
  viewModel: 'map',
  center: new google.maps.LatLng(40.350054, -8.5809265),
  mapOptions: {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 7,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    styles: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
          "hue": "#00ffbc"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "saturation": -70
        }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
          },
          {
            "saturation": -60
          }
        ]
      }
    ]
  },
  dockedItems: [{
    xtype: 'routebar',
    titleAlign: 'center',
    cls: 'x-toolbar-green',
    title: 'Route Informations',
    dock: 'bottom',
    dockedItems: {
      xtype: 'panel',
      width: 50,
      height: 65,
      bodyStyle: {
        background: "linear-gradient(to right, #232526, #414345)",
        "padding-top": "33px",
        "padding-left": "8px"
      },
      dock: 'right',
      items: {
        xtype: 'image',
        id: 'vhcImg',
        alt: 'vehicle image',
        width: 35,
        height: 35,
        src: 'ext/resources/images/truck_selected.png'
      }
    }
  }],
  addInfoWindow: function(string, lat, lng) {
    var pos = new google.maps.LatLng(lat, lng);
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      position: pos,
      title: 'Info',
      map: this.gmap
    });
    infowindow.setContent(string);
    infowindow.open(this.gmap, marker);
    google.maps.event.addListener(infowindow, 'closeclick', function() {
      marker.setMap(null);
    });
  }
});