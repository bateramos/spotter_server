const express = require('express');
const app = express();

const admin = require('firebase-admin');
const GeoFire = require('geofire');

const env = require('./env');

admin.initializeApp({
  credential: admin.credential.cert(require('./keys/dev-key.json')),
  databaseURL: env.firebaseDatabaseUrl 
});

app.get('/', function (req, res) {
  admin.database().ref('/messages').once("value", function(data) {
    res.send(data);
  });
});

app.get('/addPin', require('./functions/addPin')(admin));
app.get('/getPins', require('./functions/getPins')(admin));
app.get('/getTags', require('./functions/getTags')(admin));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});