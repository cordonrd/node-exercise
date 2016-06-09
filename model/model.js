var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

exports.getAllCharacters = getAllCharacters;
exports.getAllPlanetResidents = getAllPlanetResidents;
exports.getCharacterByName = getCharacterByName;

function getAllPlanetResidents(callback){
    getCount("planets").then(function(data) {
        var pageLimit = Math.ceil(data.body.count/ 10); //Each page has 10 results
        var urls = [];
        for (var i = 1; i <= pageLimit; i++) {
            urls.push({url:"http://swapi.co/api/planets", page:i});
        }
        Promise.map(urls,
            function(url) {
                return makeJSONRequest(url.url, url.page)
            },
                {concurrency: 10}// so that if there were more than 10 requests at once, there would only be 10 allowed at a time.
        ).then(function (list) {
                var planets = {};
                var promises = [];
                list.forEach(function (page) {
                     page.body.results.forEach(function (planet) {
                         planets[planet.name] = [];
                         promises.push(
                             Promise.map(planet.residents, makeJSONRequest,{concurrency:10}).then(function(persons){
                                 persons.forEach(function(person){
                                     planets[planet.name].push(person.body.name);
                                 })

                             })
                         )
                    })
                });
                Promise.all(promises).then(function(){
                    callback(planets);
                })
            })
    })
}
function makeJSONRequest(url,page){
    var options = {
        url: url,
        qs:{format:"json", page:page},
        headers: {
            "content-type": "application/json"
        },
        json: true
    };
    return request(options);
}
function makeJSONRequest2(url){
    var options = {
        url: url+"?format=json",
        headers: {
            "content-type": "application/json"
        },
        json: true
    };
    return request(options);
}

function getCount(endpoint){
    var options = {
        url: "http://swapi.co/api/"+endpoint+"?format=json",
        headers: {
            "content-type": "application/json"
        },
        json:true
    };
    return request(options);
}

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

function getCharacterByName(name, callback){
    /*
        Can't get person by name in SWAPI, only by ID. Since only these 4 names were required
        I assumed rather than pulling down all of the characters to search for
        the correct one by name or searching each page for the name (both of which would
        take some time) that it would be okay to link these names directly to their ID.
     */
    if (name == "rey")
        getCharacterById(85,callback)
    else if (name == "han")
        getCharacterById(14,callback)
    else if (name == "leia")
        getCharacterById(5,callback)
    else if (name == "luke")
        getCharacterById(1,callback)
    else
        callback()
}

function getCharacterById(id, callback){
    var options = {
        url: "http://swapi.co/api/people/"+id+"?format=json",
        headers: {
            "content-type": "application/json"
        },
        json:true
    };
    request(options).then(function(data){

        callback(data.body)
    })
}