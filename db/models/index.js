'use strict';

const fs        = require('fs'),
      path      = require('path'),
      Sequelize = require('sequelize'),
      basename  = path.basename(module.filename),
      env       = process.env.NODE_ENV || 'development',
      config    = process.env.DATABASE_URL || require('\./../config.json')[env],
      db        = {};

console.log('process.env.NODE_ENV=', `${process.env.NODE_ENV}`,
            '\nenv=',env,
            '\ndb/model/config.url=', config.url,
            '\ndb/model/config', `${process.env.DATABASE_URL}`,
            '\nconfig.use_env_variable=', `${config.use_env_variable}`
          );

let sequelize;
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

/* sequelize
  .authenticate()
  .then(() => {
    console.log('Models2 Database connected and authenticated!');
  })
  .catch((err) => {
    console.error('Failed2 to connect and authenticate', err);
  }); */

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

module.exports = db;
