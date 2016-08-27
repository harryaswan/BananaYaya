var fs = require('fs'), request = require('request');
var MongoClient = require("mongodb").MongoClient;

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream("./client/src/img/pokemon/"+filename)).on('close', callback);
  });
};

var url = 'mongodb://localhost:27017/pokemon';

MongoClient.connect(url, function (err, db) {
    if (!err) {

        var collection = db.collection("pokemon");

        collection.find({}).toArray(function (err, docs) {
            if (!err) {
                docs.forEach(function (result) {
                    download(result.img, result.id + ".png", function () {
                        console.log("Saved image: " + result.id + ".png");
                    });
                });
            } else {
                console.log("Collection Error:", err);
            }
        })

    } else {
        console.log("Error: ", err);
    }
})

//
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });
