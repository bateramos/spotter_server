const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

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

app.get('/testAuth', (req, res) => {
  request('http://192.168.65.2:3100/auth?token=testToken', (error, response) => {
    res.status(response.statusCode).send('Funcionou').end();
  });
});

app.get('/fibonacci', (req, res) => {
  const result = fibonacci(40);
  res.send({ result });
});

app.get('/auth', (req, res) => {
  if (req.query.token) {
    res.status(200).end();
  } else if (req.body.user && req.body.password) {
    res.status(200).end();
  } else {
    res.status(401).end(); 
  }
});

app.use('/pins', require('./functions/routes/pins')(admin));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});