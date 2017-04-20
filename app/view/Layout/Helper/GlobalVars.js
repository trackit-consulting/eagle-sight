Ext.define('ES.util.Helper.GlobalVars', {
  statics: {
    countVel: 0, //Count how much time the vehicle has been parked
    lat1: 0, //Latitude from the current address
    lon1: 0, //Longitude from the current address
    lat2: 0, //Latitude from destination address
    lon2: 0,//Longitude from destination address
    vel: 0, //Current speed
    isOffline: false, //Check if page expired or offline
    ws: "ws://localhost:8089/", //Websocket address
    protocol: "echo-protocol", 
    flightPathCoordinates: [] //All route coordinates
  }
});