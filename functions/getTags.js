module.exports = (admin) =>
  (req, res) => {
    admin.database().ref('/pins').orderByChild("tags").once('value', snapshot => {
      const value = snapshot.val();
      const tags = Object.keys(value).reduce((acc, key) => {
        if (value[key].tags)
          value[key].tags.forEach(tag => acc.add(tag));
        return acc;
      }, new Set());

      res.status(200).send([...tags]);
    });
  };