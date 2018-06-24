'use strict';

const fs        = require('fs'),
      path      = require('path'),
      Sequelize = require('sequelize'),
      basename  = path.basename(module.filename),
      env       = process.env.NODE_ENV || 'development',
      config    = process.env.DATABASE_URL || require('\./../config.json')[env],
      db        = {};

console.log('in Models index')

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    host: 'localhost',
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
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
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
    host: 'localhost',
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

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.adunits = require('./adunit')(sequelize, Sequelize);

module.exports = db;
