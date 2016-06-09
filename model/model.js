var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

exports.getAllCharacters = getAllCharacters;

function getAllCharacters(callback){
    var pageLimit = 5; //Each page has 10 results, and characters is supposed to return 50 results.
    var urls = [];
    for(var i=1; i <= pageLimit; i++){
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
        {concurrency:10} // so that if there were more than 10 requests at once, there would only be 10 allowed at a time.
    ).then(function(list){
        var characters = [];
        list.forEach(function(page){
            page.body.results.forEach(function(person) {
                characters.push(person);
            })
        });
        callback(characters);
    })

}