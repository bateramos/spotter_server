const functions = require('firebase-functions');
const admin = require('firebase-admin');
const GeoFire = require('geofire');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.addPin = functions.https.onRequest(require('./addPin')(admin));
exports.getPins = functions.https.onRequest(require('./getPins')(admin));
exports.getTags = functions.https.onRequest(require('./getTags')(admin));
