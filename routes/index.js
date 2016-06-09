var model = require('../model/model');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SWAPI Node Exercise' });
});
router.get('/characters', function(req,res){
  model.getAllCharacters(function(characters){
    if (req.query.sort=="height"){
      characters.sort(function(a,b){
        if (a.height > b.height) {
          return 1;
        }
        if (a.height < b.height) {
          return -1;
        }
        return 0;
      })
    }
    if (req.query.sort=="mass"){
      characters.sort(function(a,b){
        if (a.mass > b.mass) {
          return 1;
        }
        if (a.mass < b.mass) {
          return -1;
        }
        return 0;
      })
    }
    if (req.query.sort=="name"){
      characters.sort(function(a,b){
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    }
    res.send(characters);
  });
});
router.get('/character/:name', function(req,res){
  model.getCharacterByName(req.params.name, function(character){
        res.render('character', {
          title:character.name + "'s Character Page",
          character:character
        })
      }
  )
});
router.get('/planetresidents', function(req,res){
  model.getAllPlanetResidents(function(planets){
    res.send(planets);
  });
});

module.exports = router;
