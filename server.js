var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/pokemon';

app.use("/", express.static('./client'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.get('/api/givemeone', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection("pokemon");
        collection.find({}).toArray(function (err, docs) {
            var index = Math.round((Math.random() * docs.length) + 1);
            if (!err) {
                res.json(docs[index]);
            } else {
                res.send(err);
            }
        })
    })
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('It\'s Party Time!');
});
