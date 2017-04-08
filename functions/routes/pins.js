const express = require('express');
const app = express();

module.exports = (admin) => {
  app.use('/', parseRequest);
  app.get('/', validateGetPinRequest);

  app.get('/', require('../getPins')(admin));
  app.post('/', require('../addPin')(admin));

  return app;
};

function parseRequest(req, res, next) {
  parseQueryToInt(req.query, 'longitude');
  parseQueryToInt(req.query, 'latitude');

  next();
}

function parseQueryToInt(query, property) {
  if (typeof query[property] === 'string')
    query[property] = parseInt(query[property]); 
}

function validateGetPinRequest(req, res, next) {
  if (!req.query.longitude || !req.query.latitude)
    return res.status(400).send('wrong query param');

  next();
}