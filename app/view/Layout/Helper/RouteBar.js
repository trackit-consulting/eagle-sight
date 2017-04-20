Ext.define('ES.util.Helper.Routebar', {
  statics: {
   /**
    * Request information to fill the route bar
    * @param {object} directionsService Receive function that will do the route request
    * @param {object} routeStore Retreive route store
    */
    requestRoutebarData: function(directionsService, routeStore) {
      var request = {
        origin: {
          lat: ES.util.Helper.GlobalVars.lat1,
          lng: ES.util.Helper.GlobalVars.lon1
        },
        destination: {
          lat: ES.util.Helper.GlobalVars.lat2,
          lng: ES.util.Helper.GlobalVars.lon2
        },
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      ES.util.Helper.Routebar.updateRoutebarData(directionsService, routeStore, request);
    },

   /**
    * Request information to fill the route bar
    * @param {object} directionsService Do a route request
    * @param {object} routeStore Retreive route store
    * @param {string} request Receive the origin and the destination from the route
    */
    updateRoutebarData: function(directionsService, routeStore, request) {
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          routeStore.each(function(rec) {
            if (rec.internalId == 1) {
              rec.set("at", response.routes[0].legs[0].duration.text);
              rec.set("dkm", (response.routes[0].legs[0].distance.value) / 1000);
              if (parseInt(ES.util.Helper.GlobalVars.vel) == 0) {
                rec.set("vel", locale.parked);
              } else {
                rec.set("vel", ES.util.Helper.GlobalVars.vel);
              }
            }
          });
        }
      });
    },
   /**
    * Request information to fill the route bar
    * @param {int} vel Check if car is parked or not
    * @param {object} routeStore Retreive route store
    */
    showVel: function(routeStore, vel) {
      routeStore.each(function(rec) {
        if (rec.internalId == 2) {
          if (parseInt(vel) == 0) {
            rec.set("vel", locale.parked);
          } else {
            rec.set("vel", vel);
          }
        }
      });
    }
  }
});