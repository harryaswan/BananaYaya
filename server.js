var express = require('express');
var app = express();
var path = require('path');

app.use("/", express.static('./client'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});
// app.get('/index.js', function (req, res) {
//   res.sendFile(path.join(__dirname + '/client/src/index.js'));
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('It\'s Party Time!');
});
