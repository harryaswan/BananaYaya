var request = function(url) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.onload = function() {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.status);
            }
        }
        request.send();
    });
};

var capitalise = function (word) {
    return word[0].toUpperCase() + word.substring(1);
}
