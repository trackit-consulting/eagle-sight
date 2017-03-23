Ext.define('ES.view.Layout.Map.Map',{
    
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
            
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#E4E3E2"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#0C7CA5"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#E4E3E2"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#FEFEFE"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#FEFEFE"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#FEFEFE"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#FEFEFE"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#FEFEFE"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "color": "#FEFEFE"
                }]
            }
        ]
    },
     dockedItems: [{

        xtype: 'mainlist',
        preventHeader: true,
        //overlay : true,
        dock: 'bottom'
    }]
    
});