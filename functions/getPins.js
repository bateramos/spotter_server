const GeoFire = require('geofire');

module.exports = (admin) =>
  (req, res) => {
    const firebaseRef = admin.database().ref('/pins');
    const geoFire = new GeoFire(firebaseRef);

    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);
    const tag = req.query.tag;

    const geoQuery = geoFire.query({ center : [latitude, longitude], radius : 1000000.5 });
    let keys = [];
    geoQuery.on('key_entered', (key, location, distance) => {
      keys.push(key);
    });

    geoQuery.on('ready', () => {
      geoQuery.cancel();
      Promise.all(
        keys.map(key => admin.database().ref('/pins/' + key).once('value'))
      ).then(result => res.status(200).send(
        result.filter(r => !tag || r.val().tag === tag).map(r => ({ value : r.val(), id : r.key })))
      )
    });
  };