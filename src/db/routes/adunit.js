// routes adunit.js
const express       = require('express'),
      adRoutes      = express.Router()
      cors          = require('cors'),
      port          = process.env.PORT || 8080,
      env           = process.env.NODE_ENV || 'development',
      config        = process.env.DATABASE_URL || require('\./../config.json')[env],
      db            = {},
      AdUnit        = require('\../models/adunit'),
      baseUrl       = 'http:\\localhost',
      Sequelize     = require('sequelize');

let sequelize;
const host = 'localhost'
console.log('inRoute adunit', `${baseUrl}`, 'models', AdUnit);
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
    console.log(`connection routes has been exablish successfully to host ${baseUrl}.`);
  })
  .catch((err) => {
    console.log('Unable to connection routes to database:', err);
  });

const Posts = sequelize.define('AdUnit', {
  unit_name: {
    type: Sequelize.STRING
  },
  unit_price: {
    type: Sequelize.DECIMAL
  },
});

// Defined store route
adRoutes.route('/adUnits', (req, res) => {
  model
    .findAll()
    .then((data) => {
      console.log('get all', data);
      return res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
    next;
});

adRoutes.route('/add').post((req, res, next) => {
  console.log('inRoutes add')
  const data =  { // new AdUnit(req.body);
     unit_name: req.body.unit_name,
     unit_price: req.body.unit_price,
     complete: false
  }
  Post.create({
    unit_name:  req.body.unit_name,
    unit_price: req.body.unit_price
  })
  then(() =>{
    console.log('AdUnit added successfully')
    res.status(201).json({
      'adUnit': 'AdUnit added successfully'
    });
  })
  .catch((err) => {
    if (err) {
      console.log('err', err);
      res.status(400).send(err + "Unable to save to database");
    }
  })
  next;
});

// Defined get data(index or listing) route
/* adRoutes.route('/').get((req, res) => {
  AdUnit.find((err, adUnits) =>{
    if (err) {
      console.log(err);
    } else {
      res.json(adUnits);
    }
  });
});
 */
module.exports = adRoutes;
