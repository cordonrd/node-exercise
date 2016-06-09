var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

exports.getAllCharacters = getAllCharacters;

function getAllCharacters(callback){
    var options = {
        url: "http://swapi.co/api/people?format=json",
        headers: {
            "content-type": "application/json"
        },
        json:true
    };
    request(options).then(function(data){
        var totalPages = Math.ceil(parseInt(data.body.count))/10;
        var urls = [];
        for(var i=1; i <= totalPages; i++){
            urls.push("http://swapi.co/api/people?format=json&page="+i);
        }
        Promise.map(urls,
            function(url){
                var options = {
                    url: url,
                    headers: {
                        "content-type": "application/json"
                    },
                    json:true
                };
                return request(options);
            },
            {concurrency:10}
        ).then(function(list){
            var characters = list.map(function(item){
                return item.body.results
            });
            callback(characters);
        })

    }).catch(console.error)

}