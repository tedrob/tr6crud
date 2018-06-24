const express = require('express'),
      router   = express.Router(),
      Sequelize = require('sequelize'),
      env       = process.env.NODE_ENV || 'development',
      config    = process.env.DATABASE_URL || require('\./../config.json')[env],
      baseUrl = 'http:\\localhost',
      models  = require('\../models/index.js');

console.log('inRoutes Index seq', config);

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    host: `${baseUrl}`, // `${host}`,
    dialec: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
    // to  create a pool of connections
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    host: `${baseUrl}`, // 'localhost',
    dialec: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
    // to  create a pool of connections
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
} else {
  sequelize = new Sequelize(config.url, {
    host: `${baseUrl}`, // `${host}`,
    dialec: 'postgres',
    ssl: false,
    dialectOptions: {
      ssl: false
    },
    operatorsAliases: false,
    // to  create a pool of connections
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
} //

sequelize
  .authenticate()
  .then(() => {
    console.log(`connection routes/index has been exablish successfully to host ${baseUrl}.`);
  })
  .catch((err) => {
    console.log('Unable to connection/index routes to database:', err);
  });

// router.get('/', (req, res) => { //
router.route('/').get((req, res) => {
  models.AdUnit.find((err, adUnits) => {
        if(err) {
          console.log(err);
        } else {
          res.json(adUnits);
        }
      });
});

router.route('/add').post((req, res) => {
  models.Adunit.create({
    unit_name: req.body.unit_name,
    unit_price: req.body.unit_price
  }).then((adunit) => {
    res.status(201).json({'adUnit': 'AdUnit added successfully'});
  })
  .catch((err) => {
    res.status(400).send('unable to save to database');
  });
});

module.exports = router;
