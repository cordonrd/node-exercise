# node-exercise
A little exercise using a Star Wars API

## Goal
Make a small express server with endpoints centered around Star Wars. 
This will hopefully demonstrate to us abilities to make an express app, consume data from an API, and manipulate that data into some desired way

## Requirements
Make an express server with at least these endpoints.
* '/character/:name' - Returns an EJS view (nothing too fancy) with data about the given character. (Needs to work with at least 'luke', 'han', 'leia', and 'rey')
* '/characters' - Returns raw JSON of 50 characters (doesn't matter which 50). This endpoint should be able to take a query parameter in the URL called 'sort' 
    and the potential sort parameters will be 1 of the following, ['name', 'mass', 'height']  So the endpoint '/characters?sort=height' should return JSON of 50 characters sorted by their height. 
    NOTE: when querying for the 50 characters, limit the # of people returned per call to 10, so you can demonstrate pagination
* '/planetresidents' - Return raw JSON in the form {planetName1: [characterName1, characterName2], planetName2: [characterName3]}. 
    So it is an object where the keys are the planet names, and the values are lists of residents names for that planet