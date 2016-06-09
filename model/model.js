var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

exports.getAllCharacters = getAllCharacters;

var characters = [];
function getAllCharacters(callback){
    var options = {
        url: "http://swapi.co/api/people?format=json",
        headers: {
            "content-type": "application/json"
        },
        json:true
    };
    request(options).then(function(data){getAdditionalCharacters(data, callback)}).catch(console.error)

}

function getAdditionalCharacters(data, callback){
    characters.push(data.body.results);

    if(data.body.next){
        var options = {
            url: data.body.next,
            headers: {
                "content-type": "application/json"
            },
            json:true
        };
        request(options).then(function(data){getAdditionalCharacters(data, callback)}).catch(console.error)
    }
    else{
        callback(characters);
    }
}