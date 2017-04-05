Ext.define('ES.view.Layout.Menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    onItemClick: function(grid, cellElement, rowIndex, cellIndex) {
        var gridstore = grid.getStore();
        
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        grid.up().collapse();
        }
        //Calling route information store

        var rowdata = gridstore.data.items[rowIndex];
        var lat = rowdata.data['lat'];
        var lng = rowdata.data['lng'];
        var vel = rowdata.data['vel'];
        var routeStore = Ext.getStore('routedata');

        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    var newInformation = Ext.ComponentQuery.query('map')[0];
                    newInformation.addInfoWindow(results[0].formatted_address, lat, lng);

                    routeStore.each(function(rec) {
                        if (rec.internalId == 2) {
                            if (parseInt(vel) == 0) {
                                rec.set("vel", "PARKED");
                            } else {
                                rec.set("vel", vel);
                            }
                        }
                    });

                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        });

    }

});