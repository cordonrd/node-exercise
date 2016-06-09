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
  res.render('character', {title:req.params.name + "'s Character Page", name:req.params.name})
});
router.get('/planetresidents', function(req,res){
  res.send("Planet Residents Page")
});

module.exports = router;
