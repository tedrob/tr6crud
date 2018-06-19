'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = process.env.DATABASE_URL || require('\../config.json')[env];
//const config    = require(__dirname + '/../config.json')[env];
// const config = process.env.DATABASE_URL || process.env.DATABASE_URL_DEV // require(__dirname + '../config.json')[env]
const DataTypes = require('sequelize/lib/data-types');
const db        = {};

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
    console.log('Models Database connected and authenticated!');
  })
  .catch((err) => {
    console.error('Failed to connect and authenticate', err);
  });

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
