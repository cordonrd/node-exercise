var model = require('../model/model');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/characters', function(req,res){
  model.getAllCharacters(function(characters){
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
