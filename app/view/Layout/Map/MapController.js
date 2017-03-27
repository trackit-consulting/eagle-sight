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

                        //Calling polyline store

                        var polylineStore = this.getView().getViewModel().getStore('Polyline');

                        //Calling timeline store

                        var timelineStore = Ext.getStore('timeline');

                        //Calling route information store

                        var routeStore = Ext.getStore('routedata');

                        //Delaying geocoder requests

                        var countRequest = 0;
                        var newRequest = true;

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

                            var lineSymbol = {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                                scale: 2,
                                strokeColor: '#8d02ff'
                            };

                            var flightPath = new google.maps.Polyline({
                                path: flightPathCoordinates,
                                geodesic: true,
                                strokeColor: '#5443b2',
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
                                icons: [{
                                    icon: lineSymbol,
                                    offset: '100%'
                                }],
                            });

                            animateCircle(flightPath);

                            function animateCircle(line) {
                                var count = 0;
                                var test = window.setInterval(function() {
                                    count = (count + 1) % 200;

                                    var icons = line.get('icons');
                                    icons[0].offset = (count / 2) + '%';
                                    line.set('icons', icons);
                                }, 10);
                            }

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
                            var vel = parseFloat(JSON.parse(e.data).gsp);

                            routeStore.each(function(rec) {
                                if (rec.internalId == 1) {
                                    rec.set("at", minTommss(getArrivalTime(getDistance(lat1, lon1, lat2, lon2), vel)));
                                    rec.set("distance", getDistance(lat1, lon1, lat2, lon2));
                                    rec.set("dkm", getDistance(lat1, lon1, lat2, lon2));
                                    rec.set("vel", vel);
                                }
                            });

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
                        

                            //Get current date

                            var date = new Date();
                            var hour = ("0" + date.getHours()).substr(-2);
                            var minutes = ("0" + date.getMinutes()).substr(-2);
                            var seconds = ("0" + date.getSeconds()).substr(-2);

                            //Get values to insert on timeline

                            var specifyInfo = {
                                time: hour + ":" + minutes + ":" + seconds,
                                lat: parseFloat(JSON.parse(e.data).loc.lat),
                                lng: parseFloat(JSON.parse(e.data).loc.lon),
                                address: "Show Up",
                                dir: degToCompass(parseFloat(JSON.parse(e.data).hdg)),
                                vel: vel
                            };

                            //Degrees to compass (vehicle direction)

                            function degToCompass(num) {
                                var val = Math.floor((num / 22.5) + 0.5);
                                var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                                return arr[(val % 16)];
                            }

                            //Put data on timeline

                            timelineStore.insert(0, specifyInfo);

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
    }
});