const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);

// exports.getTags = functions.https.onRequest(require('./getTags')(admin));

app.use('/pins', require('./routes/pins')(admin));

exports.serviceV1 = functions.https.onRequest(app);