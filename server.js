const express = require('express');
const bodyParser = require('body-parser');

const admin = require('firebase-admin');
const GeoFire = require('geofire');

const env = require('./env');

const app = express();
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(require('./keys/dev-key.json')),
  databaseURL: env.firebaseDatabaseUrl 
});

// app.get('/addPin', require('./functions/addPin')(admin));
// app.get('/getPins', require('./functions/getPins')(admin));
// app.get('/getTags', require('./functions/getTags')(admin));

app.use('/pins', require('./functions/routes/pins')(admin));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});