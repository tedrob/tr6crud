'use strict';
const express     = require('express'),
      app         = express(),
      path        = require('path'),
      http        = require('http'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      port        = process.env.PORT || 8080,
      // db          = require('\./src/db/models'),
      db = require(path.join(__dirname, '\./db/models')),
      // adUnitRoutes = require(path.join(__dirname, '\./routes/aduint.route.js')),
      // adUnitRoutes = require(path.join(__dirname, '\./db/routes/aduint.route.js')),
      { Pool }    = require('pg'),
      pool        = new Pool({
        connectString: process.env.DATABASE_URL,
        ssl: true
      });

console.log('server-adU.', path.join(__dirname, '\./routes/aduint.route.js'));
// app.use('\/adunits', adUnitRoutes);
require('./db/routes/')(app);

db.sequelize.sync()
.then(() => { //
  app.use(express.static(path.join(__dirname, '\./dist/tr6crud/')))
    .use(cors)
    .options('*', cors())
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json({
      'type': 'application/javascript'
    }))
    .use(bodyParser.json())
  // .use('\/adunits', adUnitRoutes)
    .use(express.static(path.join(__dirname, '\./dist/tr6crud/index.html')))
    .get('\/*', (req, res) => { //
      res.sendFile(path.join(__dirname, '\./dist/tr6crud/index.html'))
    })
    .listen(port, () => { //
      console.log('Listening on port ' + port);
    })
    module.exports = app;
  });
