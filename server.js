'use strict';
require('zone.js/dist/zone-node');
const express         = require('express'),
      app             = express(),
      port            = process.env.PORT || 8080,
      // baseUrl         = `http:\\localhost:${port}`,
      baseUrl         = `http:\\localhost`,
      path            = require('path'),
      cors            = require('cors'),
      bodyParser      = require('body-parser'),
      // routes       = require('\./src/db/routes/adunit'),
      // routes = require('\./src/db/routes'),
      routes          = require('./src/db/routes/index.js'),
      adunit      = require('\./src/db/routes/adunit'),
      db              = require('\./src/db/models');
      console.log(`in server routes=${routes}
                  \nand adunit=${adunit}
                  \nand env=${env}`,);

if (app.get('env') === 'development') {
  app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

console.log('before server');
// CORS middleware
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
  res.header('Access-Control-Allow-Origin', 'X-Requested-With,content-type');
}

// set up ++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, '\./dist/tr6crud/')))
  .use(cors)
  .options('*', cors())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json({
    'type': 'application/json'
  }))
  .use(allowCrossDomain)
  .use('\/', routes)
  .use('\/adunits', adunit);

db.sequelize.sync()
.then(() => { //
  app.use(express.static(path.join(__dirname, '\./dist/tr6crud/')))
    /* .use(cors)
    .options('*', cors())
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json({
      'type': 'application/json'
    }))
    .use(allowCrossDomain)
    .use('\/', routes)
    .use('\/adunits', adunit) */
    .use(express.static(path.join(__dirname, '\./dist/tr6crud/index.html')))
    .get('\/*', cors(), (req, res) => { //
      res.sendFile(path.join(__dirname, '\./dist/tr6crud/index.html'))
    })
    .listen(port, cors(), () => { //
      console.log(`Server running at ${baseUrl} port ${port}`);
    });
  });

  module.exports = app;

