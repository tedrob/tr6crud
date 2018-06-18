const express     = require('express'),
      app         = express(),
      path        = require('path'),
      http        = require('http'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      port        = process.env.PORT || 8080;

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
    console.log('path=' + path.join(__dirname, 'dist/tr6crud/index.html'));
    res.sendFile(path.join(__dirname, 'dist/tr6crud/index.html'))
  })
  .listen(port, () => {
    console.log('path=' + path.join(__dirname, '\/dist/tr6crud/index.html'));
    console.log('Listening on port ' + port);
  })
  module.exports = express;
