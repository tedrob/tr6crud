let express     = require('express'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    cors        = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const server = app.listen(function () {
  console.log('Listening on port ' + port);
});
