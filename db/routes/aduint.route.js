// adunit.route.js
const express       = require('express'),
      app           = express(),
      adUnitRoutes  = express.Router(),
      AdUnit        = require('\./../models/adunit');

      // path          = require('path'),
      //AdUnit        = require('\../src/db/models/adunit.js'),
      //AdUnit        = require('\./../models/adunit.js'),
      // env = process.env.NODE_ENV || 'development',
      // config = process.env.DATABASE_URL || require('\../config.json')[env],
      // Sequelize     = require('sequelize');
// console.log('db/routes env=', env,
//            '\nroutes config',config.url);

/* let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    dialec: 'postgres',
    ssl: true,
    operatorsAliases: false,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  sequelize = new Sequelize(config.url, {
    dialec: 'postgres',
    ssl: false,
    operatorsAliases: false,
    dialectOptions: {
      ssl: false
    }
  });
}
sequelize
  .authenticate()
  .then(() => {
    console.log('Routes Database connected and authenticated!');
  })
  .catch((err) => {
    console.error('Failed to connect and authenticate', err);
  });

const Posts = sequelize.define('AdUnit', {
  unit_name: {
    type: Sequelize.STRING
  },
  unit_price: {
    type: Sequelize.DECIMAL
  },
}); */
// define store route
adUnitRoutes.route('/add')
  .post((req, res) => {
    const adUnit = new AdUnit(req.body);
    Posts.create({
      unit_name: req.body.unit_name,
      unit_price: req.body.unit_price
    })
    .then((game) => {
      res.status(201).json({
        'adunit': 'AdUnit in added successfully'
      });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    })
  });

adUnitRoutes.route('/')
  .get((req, res) => {
    adUnit.find((err, adUnits) => {
      if(err) {
        console.log(err);
      } else {
        res.json(adUnits);
      }
    });
  });



module.exports = adUnitRoutes;
