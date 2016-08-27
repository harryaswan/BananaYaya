var request = require("request");
var MongoClient = require("mongodb").MongoClient;

var getData = function (id) {
    return new Promise(function(resolve, reject) {
        request('http://pokeapi.co/api/v2/pokemon/'+id+'/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('got data for: ' + id);
                resolve(JSON.parse(body));
            } else {
                reject(error, response);
            }
        });
    });
}

var promises = [];
var allTheData = [];

var run = function (id) {
    getData(id)
    .then(function (resultData) {
        console.log('got data for ' + id);
        allTheData.push(resultData);
        if (id+1 < 722) {
            saveData(resultData);
            run(id+1);
        } else {
            dealWithData(allTheData);
        }
    })
}


// for (var i =1; i < 722; i++) {
//     promises.push(getData(i));
// }
//
// Promise.all(promises)
// .then(function (data) {
//
//     dealWithData(thing);
//     // console.log('data',thing);
// })
// .catch(function (error) {
//     console.log('error',error);
// })

var saveData = function (data) {
    console.log('saving data', data);

    var cleanedData = {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        height: data.height,
        weight: data.weight
    };

    console.log('34973298472394872');
    var url = 'mongodb://localhost:27017/pokemon';
    MongoClient.connect(url, function(err, db) {
        console.log('CONNECTED');
        console.log(err);
        var collection = db.collection('pokemon');
        collection.insert(cleanedData, function(err, result) {
            console.log('data saved for ' + cleanedData.id);
            console.log(err, result);
            db.close();
        });
    });
    console.log('asdasdgljsl');
}

var dealWithData = function (data) {
    console.log('dealing with data');

}


run(1);
