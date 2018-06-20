const AdUnit = require('../models').AdUnit;

module.exports = {
  create(req, res) {
    return AdUnit
      .create({
        unit_name: req.body.unit_name,
        unit_price: req.body.unit_price
      })
      .then((adUnit) => res.status(201).send(adUnit))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return AdUnit
      .all()
      .then(adUnits => res.status(200).send(adUnits))
      .ctach(error => res.status(400).send(error));
  },
}
