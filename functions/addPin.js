const GeoFire = require('geofire');

module.exports = (admin) => 
	(req, res) => {
    const tag = req.body.tag;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    const tags = tag ? tag.split(',') : [];

	  const firebaseRef = admin.database().ref('/pins').push();
	  const geoFire = new GeoFire(firebaseRef);

	  return geoFire.set('position', [latitude, longitude])
	    .then(() => {
        firebaseRef.once("value", (snapshot) => {
          const val = snapshot.val();
          firebaseRef.set({ g : val.position.g, l : val.position.l, position : null, tags});
          res.status(200).send();
        }, (error) => {
          res.status(500).send(error);
        });
      })
	    .catch(error => res.status(400).send(error));
	};
