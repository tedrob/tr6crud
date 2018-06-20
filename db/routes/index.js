// const adunitsController = require('../controllers').adunits;
const adunitsController = require('../controllers').adunits;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(201).send({
    message: 'Welcome to the AdUnits API!',
  }))

  app.post('/appi/adunits', adunitsController.create);

};
