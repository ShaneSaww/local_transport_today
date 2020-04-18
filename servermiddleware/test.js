var express = require('express');
var app = express();

app.get('/', function(req, res) {
  //let files = await require.context('~/assets/content/settings/', false, /\.json$/);
  res.send('hello');
  //res.send(files);
});

module.exports = {
  path: '/miffy',
  handler: app
};
