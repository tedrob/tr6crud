// adunit.route.js
const express       = require('express'),
      app           = express(),
      path          = require('path'),
      AdUnit        = require('\../src/db/models/adunit.js'),
      adUnitRoutes  = express.Router(),
      env = process.env.NODE_ENV || 'development',
      config = process.env.DATABASE_URL || require('\../config.json')[env],
      Sequelize     = require('sequelize');
console.log('route2', config);

if (env !== 'production') {
  require('dotenv').load();
}

let sequelize;
//if (config.use_env_variable) {
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
  sequelize = new Sequelize(`${process.env.DATABASE_URL_DEV}`, {
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
});
// define store route
adUnitRoutes.route('/add')
  .post((req, res, next) => {
    const adUnit = new AdUnit(req.body);
    Posts.create.create({
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
    next;
  });

module.exports = adUnitRoutes;
