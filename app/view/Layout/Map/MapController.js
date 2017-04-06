Ext.define('ES.view.Layout.Map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window',
        'ES.store.RouteData',
        'ES.store.Timeline'
    ],

    config: {
        listen: {
            component: {
                'map': {

                    mapready: function(gmappanel) {

                        //http://localhost:1841/?token=eyAibG5nIjogLTguNjU2ODcyNiwgImxhdCI6IDQxLjE2Mjg2MzQsICJ2aWQiOiAxMzE2NTMsICJlcG9jaCI6IDE0OTIwMTI5NTUwMDAgfQ==
                        //{"lng": -8.6568726,"lat": 41.1628634,"vid": 160005,"epoch": 1490802031000};
                        //https://www.base64decode.org/ -> Dás encode no json com todos os ficheiros necessários
                        //https://www.epochconverter.com/ -> Geras a data e hora e modificas no json

                        //Calling timeline store

                        var timelineStore = Ext.getStore('timeline');

                        var isOffline;
                        var onError;

                        //Calling route information store

                        var routeStore = Ext.getStore('routedata');

                        //Receiving parameters from the Token

                        /*
                            var obj = {
                            "lng": -8.6568726,
                            "lat": 41.1628634,
                            "vid": 160005,
                            "epoch": 1490802031000
                            };

                            var stringfy = JSON.stringify(obj);

                            var enc = window.btoa(stringfy);
                        */

                        //Check if token is valid


                        if (window.location.search === '' || window.location.search.split("?")[1].substr(5, 1) != '=' || window.location.search.split("?")[1].split("=")[0] != 'token' || window.location.search.split("?")[1].split("=")[1] == '') {
                            onError = true;
                            Ext.Msg.alert(locale.alert, locale.tokenerror);
                        } else {
                            onError = false;
                        }

                        //Run the scriptis everything is fine with the GET parameters

                        if (!onError) {

                            var query = window.location.search.split("?");

                            var token = query[1].split("=")[1];

                            //Decoding the parameter

                            var dec = window.atob(token);

                            var isJson;

                            //Check if the JSON received on parameters is valid

                            try {
                                var retreiveObj = JSON.parse(dec);
                                isJson = true;
                            } catch (e) {
                                isJson = false;
                            }
                            
                            var getLng, getLat, getVhc, getCtd;

                            //Check if all json properties are right

                            if (isJson && retreiveObj.hasOwnProperty('lng') && retreiveObj.hasOwnProperty('lat') && retreiveObj.hasOwnProperty('vid') && retreiveObj.hasOwnProperty('epoch')) {

                                getLng = retreiveObj.lng;
                                getLat = retreiveObj.lat;
                                getVhc = retreiveObj.vid;
                                getCtd = retreiveObj.epoch;

                            } else {

                                //Reset the token

                                getLng = 0;
                                getLat = 0;
                                getVhc = 0;
                                getCtd = 0;
                            }


                            //Save parameters data (route destiny, vehicle id, epoch)

                            localStorage.setItem("dstLng", getLng);
                            localStorage.setItem("dstLat", getLat);
                            localStorage.setItem("vhcId", getVhc);
                            localStorage.setItem("ctdTime", getCtd);

                            //Catching page life time

                            var getEpochEnding = new Date(parseInt(localStorage.getItem('ctdTime')));

                            //Check if the vehicle is parked

                            var countVel = 0;

                            //Create countdown based on life time so the user can see when the page is going to be offline

                            var updateTime = setInterval(function() {

                                var getTimeNow = new Date();
                                var ctdMillis = new Date(Math.abs(getEpochEnding - getTimeNow));

                                //Converting the epoch milliseconds to hours/minutes/seconds

                                var ctdSeconds = parseInt((ctdMillis / 1000) % 60);
                                var ctdMinutes = parseInt((ctdMillis / (1000 * 60)) % 60);
                                var ctdHours = parseInt((ctdMillis / (1000 * 60 * 60)) % 24);

                                if (getTimeNow > getEpochEnding) {
                                    console.log(locale.alert);
                                    Ext.Msg.alert(locale.alert, locale.ttl);
                                    ctdSeconds = 0;
                                    ctdMinutes = 0;
                                    ctdHours = 0;
                                    isOffline = true;
                                    timelineStore.removeAll();
                                    clearInterval(updateTime);
                                }

                                //Change the route information row

                                routeStore.each(function(rec) {

                                    if (rec.internalId == 1) {

                                        rec.set("countdown", ("0" + ctdHours).substr(-2) + ":" + ("0" + ctdMinutes).substr(-2) + ":" + ("0" + ctdSeconds).substr(-2));

                                    }

                                });

                            }, 1000);

                            setTimeout(function() {

                                if (!isOffline) {

                                    //Identifying map

                                    var map = gmappanel.gmap;

                                    //Start to listen the Websocket

                                    var wsUri = "ws://192.168.1.124:8089/";

                                    //Polyline coordinates

                                    var flightPathCoordinates = [];

                                    //Load all timeline store data

                                    timelineStore.load(
                                        function(records, op, success) { 

                                            var list, i;
                                            var sameVhc = true;

                                            for (i = 0; i < records.length; i++) {
                                                list = records[i].data;

                                                if (list.vid != parseInt(getVhc)) {
                                                    sameVhc = false;
                                                } else {

                                                    var reloadData = {
                                                        lat: list.lat,
                                                        lng: list.lng
                                                    };

                                                    console.log(i + "-" + reloadData);
                                                    flightPathCoordinates.push(reloadData);
                                                }
                                            }

                                            if (!sameVhc) {
                                                timelineStore.removeAll();
                                            }
                                        }
                                    );

                                    drawPolyline(0);

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
                                                setTimeout(askLocation, 14000);
                                            }
                                        }
                                        askLocation();


                                    };

                                    //On close

                                    client.onclose = function() {
                                        console.log('echo-protocol Client Closed');
                                    };


                                    setTimeout(function() {

                                        addMarker(localStorage.getItem('dstLat'), localStorage.getItem('dstLng'));

                                        function addMarker(lat, lng) {

                                            var pos = new google.maps.LatLng(lat, lng);

                                            var marker = new google.maps.Marker({
                                                position: pos,
                                                title: 'Destination',
                                                map: gmappanel.gmap
                                            });

                                            var infoWindow = new google.maps.InfoWindow({
                                                content: "Destination Point"
                                            });
                                            infoWindow.open(map, marker);

                                        }

                                    }, 500);

                                    //Receiving messages from the Websocket

                                    client.onmessage = function(e) {

                                        if (parseInt(localStorage.getItem('vhcId')) == parseInt(JSON.parse(e.data).vid) && !isOffline) {

                                            var lat1 = parseFloat(JSON.parse(e.data).loc.lat);
                                            var lon1 = parseFloat(JSON.parse(e.data).loc.lon);
                                            var lat2 = parseFloat(localStorage.getItem('dstLat'));
                                            var lon2 = parseFloat(localStorage.getItem('dstLng'));
                                            var vel = parseFloat(JSON.parse(e.data).gsp);
                                            var directionsService = new google.maps.DirectionsService();
                                            var directionsDisplay = new google.maps.DirectionsRenderer();

                                            var polylineData = {
                                                lat: lat1,
                                                lng: lon1
                                            };

                                            flightPathCoordinates.push(polylineData);

                                            //Receiving origin and destiny location

                                            var request = {
                                                origin: {
                                                    lat: lat1,
                                                    lng: lon1
                                                },
                                                destination: {
                                                    lat: lat2,
                                                    lng: lon2
                                                },
                                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                                            };

                                            directionsService.route(request, function(response, status) {
                                                if (status == google.maps.DirectionsStatus.OK) {
                                                    routeStore.each(function(rec) {
                                                        if (rec.internalId == 1) {
                                                            rec.set("at", response.routes[0].legs[0].duration.text);
                                                            rec.set("dkm", (response.routes[0].legs[0].distance.value) / 1000);

                                                            if (parseInt(vel) == 0) {
                                                                rec.set("vel", "PARKED");
                                                            } else {
                                                                rec.set("vel", vel);
                                                            }
                                                        }
                                                    });

                                                }
                                            });


                                            //Get current date

                                            var date = new Date();
                                            var hour = ("0" + date.getHours()).substr(-2);
                                            var minutes = ("0" + date.getMinutes()).substr(-2);
                                            var seconds = ("0" + date.getSeconds()).substr(-2);

                                            //Get values to insert on timeline

                                            var specifyInfo = {
                                                vid: parseInt(JSON.parse(e.data).vid),
                                                time: hour + ":" + minutes + ":" + seconds,
                                                lat: lat1,
                                                lng: lon1,
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

                                            timelineStore.add(specifyInfo);
                                            timelineStore.save();
                                            drawPolyline();
                                            var circle = new google.maps.Circle({
                                                center: polylineData,
                                                radius: 50,
                                                strokeColor: "#E16D65",
                                                strokeOpacity: 1,
                                                strokeWeight: 3,
                                                fillColor: "#E16D65",
                                                fillOpacity: 0
                                            });

                                            //Check if car is parked

                                            if (parseInt(vel) == 0) {
                                                countVel++;
                                            }

                                            //Show circle when car is parked

                                            drawPolyline(parseInt(vel));

                                            //Turn counter into 0 when the car is not parked

                                            if (parseInt(vel) > 0) {
                                                countVel = 0;
                                            }

                                            //Move map to the current vehicle address when the client asks for new informations

                                            map.panTo(new google.maps.LatLng(lat1, lon1));

                                        } else {

                                            //Close the client if the link is expired

                                            client.close();
                                        }

                                    };

                                    //Drawing the polylines

                                    function drawPolyline(vel) {

                                        var lineSymbol;

                                        if (countVel > 2 && vel <= 0) {

                                        lineSymbol = {
                                            path: google.maps.SymbolPath.CIRCLE,
                                            strokeColor: '#841346',
                                            scale: 8,
                                            strokeWeight:2,
                                            strokeColor:"#B40404"
                                        };


                                    }else{
                                        
                                       lineSymbol = {
                                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                            strokeColor: '#841346',
                                        };

                                        }

                                        //Polyline styles

                                        var flightPath = new google.maps.Polyline({
                                            path: flightPathCoordinates,
                                            geodesic: true,
                                            strokeColor: '#5443b2',
                                            strokeOpacity: 0.8,
                                            strokeWeight: 3,
                                            icons: [{
                                                icon: lineSymbol,
                                                offset: '100%'
                                            }],
                                        });

                                        //Create animated circle (Show when car is parked)

                                        function animateCircle(line) {
                                            var count = 0;
                                            window.setInterval(function() {
                                                count = (count + 1) % 200;

                                                var icons = line.get('icons');
                                                icons[0].offset = (count / 2) + '%';
                                                line.set('icons', icons);
                                            }, 1000);
                                        }

                                        // Drawing Polyline Points

                                        for (var i = 0; i < flightPath.getPath().getLength(); i++) {
                                            new google.maps.Marker({
                                                icon: {
                                                    url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
                                                    size: new google.maps.Size(7, 7),
                                                    anchor: new google.maps.Point(4, 4)
                                                },
                                                position: flightPath.getPath().getAt(i),
                                                map: map
                                            });
                                        }

                                        flightPath.setMap(map);


                                    }
                                }
                            }, 1000);

                            //Finished
                        }
                    }
                }
            }
        }
    }
});