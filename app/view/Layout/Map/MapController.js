Ext.define('ES.view.Layout.Map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window'
    ],
    config: {
        listen: {
            component: {
                'map': {

                    mapready: function(gmappanel) {

                        var polylineStore = this.getView().getViewModel().getStore('Polyline');
                        var distanceStore = this.getView().getViewModel().getStore('Distance');
                        var arrivalTimeStore = this.getView().getViewModel().getStore('ArrivalTime');

                        //Receiving parameters from the Token

                        var query = window.location.search.split("&");

                        var getLng = query[0].split("=")[1];
                        var getLat = query[1].split("=")[1];

                        //Save parameters data

                        localStorage.setItem("lng", getLng);
                        localStorage.setItem("lat", getLat);

                        //Identifying map

                        var map = gmappanel.gmap;

                        //Start to listen the Websocket

                        var wsUri = "ws://localhost:8089/";

                        var flightPathCoordinates = [];

                        client = new WebSocket(wsUri, "echo-protocol");

                        //On error

                        client.onerror = function() {
                            console.log('Connection Error');
                        };

                        //On open

                        client.onopen = function() {

                            console.log('WebSocket Client Connected');

                            //Ask for information

                            function askLocation() {
                                if (client.readyState === client.OPEN) {
                                    var number = Math.round(Math.random() * 0xFFFFFF);
                                    client.send(number.toString());
                                    setTimeout(askLocation, 1000);
                                }
                            }
                            askLocation();


                        };

                        //On close

                        client.onclose = function() {
                            console.log('echo-protocol Client Closed');
                        };

                        setTimeout(function() {

                            //http://localhost/zc/map/?lng=-8.5822235&lat=40.349019

                            //Adding markers on origin and destination points

                            addMarker(polylineStore.getAt(0).data.lat, polylineStore.getAt(0).data.lng);
                            addMarker(localStorage.getItem('lat'), localStorage.getItem('lng'));

                            function addMarker(lat, lng) {

                                var pos = new google.maps.LatLng(lat, lng);

                                var marker = new google.maps.Marker({
                                    position: pos,
                                    title: 'My map',
                                    map: gmappanel.gmap
                                });

                            }

                        }, 3000);

                        //Receiving messages from the Websocket

                        client.onmessage = function(e) {

                            //Drawing Polylines

                            var flightPath = new google.maps.Polyline({
                                path: flightPathCoordinates,
                                geodesic: true,
                                strokeColor: '#517fa4',
                                strokeOpacity: 0.6,
                                strokeWeight: 4
                            });

                            var polylineData = {
                                lat: parseFloat(JSON.parse(e.data).loc.lat),
                                lng: parseFloat(JSON.parse(e.data).loc.lon)
                            };

                            flightPathCoordinates.push(polylineData);

                            // Drawing Polyline Points

                            for (var i = 0; i < flightPath.getPath().getLength(); i++) {
                                var test = new google.maps.Marker({
                                    icon: {
                                        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
                                        size: new google.maps.Size(7, 7),
                                        anchor: new google.maps.Point(4, 4)
                                    },
                                    title: "a",
                                    position: flightPath.getPath().getAt(i),
                                    map: map
                                });
                            }

                            //Receiving origin and destiny location

                            var lat1 = parseFloat(JSON.parse(e.data).loc.lat);
                            var lon1 = parseFloat(JSON.parse(e.data).loc.lon);
                            var lat2 = parseFloat(localStorage.getItem('lat'));
                            var lon2 = parseFloat(localStorage.getItem('lng'));
                            var vel =  parseFloat(JSON.parse(e.data).gsp);

                            //Get the distance between two locations

                            function getDistance(lat1, lon1, lat2, lon2) {
                                var R = 6371; // Radius of the earth in km
                                var dLat = deg2rad(lat2 - lat1); // deg2rad below
                                var dLon = deg2rad(lon2 - lon1);
                                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                var d = R * c; // Distance in km
                                return d;
                            };

                            //Degree to Radius

                            function deg2rad(deg) {
                                return deg * (Math.PI / 180)
                            };

                            //Calculate route Arrival time

                            function getArrivalTime(distance, vel) {
                                return distance / 70;
                            };

                            //Convert Arrival time from decimal to minutes

                            function minTommss(time) {
                                var sign = time < 0 ? "-" : "";
                                var min = Math.floor(Math.abs(time))
                                var sec = Math.floor((Math.abs(time) * 60) % 60);
                                return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
                            };

                            //Collect current arrival time to record on a store

                            var arrivalTime = {
                                lat: parseFloat(JSON.parse(e.data).loc.lat),
                                lng: parseFloat(JSON.parse(e.data).loc.lon),
                                time: minTommss(getArrivalTime(getDistance(lat1, lon1, lat2, lon2), vel))
                            };

                            //Collect current distance to record on a store

                            var getDistance = {
                                lat: parseFloat(JSON.parse(e.data).loc.lat),
                                lng: parseFloat(JSON.parse(e.data).loc.lon),
                                dist: getDistance(lat1, lon1, lat2, lon2)
                            };

                            //Store Arrival Time

                            arrivalTimeStore.add(arrivalTime);

                            //Store Get Distance

                            distanceStore.add(getDistance);

                            //Put polylines on map

                            flightPath.setMap(map);

                            //Add polyline data on store

                            polylineStore.add(polylineData);

                            console.log(flightPathCoordinates);

                        };

                    }
                }
            }
        }
    },

    init: function() {


    }

});