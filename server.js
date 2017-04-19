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

function fibonacci(n) {
 return n < 1 ? 0
      : n <= 2 ? 1
      : fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/fibonacci', (req, res) => {
  const result = fibonacci(40);
  res.send({ result });
})
app.use('/pins', require('./functions/routes/pins')(admin));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});