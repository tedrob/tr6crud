'use strict';
const express     = require('express'),
      app         = express(),
      path        = require('path'),
      http        = require('http'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      port        = process.env.PORT || 8080,
      db          = require('\./src/db/models'),
      adUnitRoutes = require(path.join(__dirname, '\./routes/aduint.route.js')),
      { Pool }    = require('pg'),
      pool        = new Pool({
        connectString: process.env.DATABASE_URL,
        ssl: true
      });

//      db = require('\./src//db/models/');

//console.log('db=', db);
console.log('adU.', path.join(__dirname, '\./routes/aduint.route.js'));
db.sequelize.sync()
.then(() => {


app.use(express.static(path.join(__dirname, '\./dist/tr6crud/'))) //express()
  .use(cors)
  .options('*', cors())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json({
    'type': 'application/javascript'
  }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, '\./dist/tr6crud/index.html')))
  .get('\/*', (req, res) => {
    console.log('path=' + path.join(__dirname, '\./dist/tr6crud/index.html'));
    res.sendFile(path.join(__dirname, '\./dist/tr6crud/index.html'))
  })
  // .use('/adunits', adUnitRoutes)
  .listen(port, () => {
    console.log('path=' + path.join(__dirname, '\./dist/tr6crud/index.html'));
    console.log('Listening on port ' + port);
  })
  module.exports = app; //express;
  });
