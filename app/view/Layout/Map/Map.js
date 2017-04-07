Ext.define('ES.view.Layout.Map.Map', {

    extend: 'Ext.ux.GMapPanel',
    alias: 'widget.map',
    requires: [
        'Ext.layout.container.Fit'
    ],
    plugins: {
        ptype: 'bufferedrenderer',
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    },
    store: {
        type: 'timeline'
    },
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
                "featureType": "road",
                "stylers": [{
                        "hue": "#5e00ff"
                    },
                    {
                        "saturation": -79
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [{
                        "saturation": -78
                    },
                    {
                        "hue": "#6600ff"
                    },
                    {
                        "lightness": -47
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                    "lightness": 22
                }]
            },
            {
                "featureType": "landscape",
                "stylers": [{
                        "hue": "#6600ff"
                    },
                    {
                        "saturation": -11
                    }
                ]
            },
            {},
            {},
            {
                "featureType": "water",
                "stylers": [{
                        "saturation": -65
                    },
                    {
                        "hue": "#1900ff"
                    },
                    {
                        "lightness": 8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                        "weight": 1.3
                    },
                    {
                        "lightness": 30
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [{
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#5e00ff"
                    },
                    {
                        "saturation": -16
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "stylers": [{
                    "saturation": -72
                }]
            },
            {}
        ]
    },

    dockedItems: [
        {
            xtype: 'routebar',
            preventHeader: true,
            dock: 'bottom'
        }
    ],

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

        google.maps.event.addListener(infowindow,'closeclick',function(){
        marker.setMap(null);
        });
    }

});