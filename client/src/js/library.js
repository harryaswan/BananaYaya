var request = function(reqtype, url, data={}, isJSON=true) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.onload = function() {
            if (request.status === 200) {
                if(request.responseText === "") {
                    resolve(request.responseText)
                } else {
                    if (isJSON) {
                      resolve(JSON.parse(request.responseText));
                    } else {
                      resolve(request.responseText);
                    }
                }
            } else {
                reject(request.status);
            }
        }
        request.open(reqtype, url);
        if (reqtype.toLowerCase() !== "get") {
            request.setRequestHeader('Content-Type', 'application/json');
        }
        request.send(JSON.stringify(data));
    });
};

var capitalise = function (word) {
    return word ? word[0].toUpperCase() + word.substring(1) : word;
}
