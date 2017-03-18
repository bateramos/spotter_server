const express = require('express')
const app = express()

const admin = require('firebase-admin');
const GeoFire = require('geofire');

admin.initializeApp({
  credential: admin.credential.cert(require('./keys/spotter-5bd0542ca9b5.json')),
  databaseURL: "https://spotter-9871c.firebaseio.com"
});

app.get('/', function (req, res) {
  
  admin.database().ref('/messages').once("value", function(data) {
    res.send(data);
  });
})

app.get('/addPin', require('./functions/addPin')(admin));
app.get('/getPins', require('./functions/getPins')(admin));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})