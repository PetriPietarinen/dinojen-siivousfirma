/*
Esimerkkisovellus joka käyttää Node.js:n päälle tehtyä Express.js kirjastoa.

Käyttöönottoa:
1. Asenna Node.js omalle koneellesi
    Ohjeet: https://nodejs.org/en/
2. Asenna Express.js käyttämällä Node.js:n paketinhallintaa: 
    - Manuaalisesti: aja samassa hakemistossa komento "npm install express"
    - Kehittyneempi vaihtoehto hyödyntäen package.json tiedostoa:
      Komento "npm install" asentaa package.json:issa määritellyt moduulit 
3. Käynnistä sovellus komennolla "node myFirstExpress.js"
    - Palvelu käynnistyy oletuksena portissa 3000      
4. Ota yhteys palveluun selaimella, voit kokeilla seuraavia url:leja
    - localhost:3000/hello
    - localhost:3000/siivoojat
    - localhost:3000/<mitä vain, vaikka oma nimesi>
    
Tämä sovellus toteuttaa nyt yksinkertaisen HTTP-rest API:n, jota front-end web-sovellus voisi hyödyntää, mutta sen palauttama data voidaan tosiaan näyttää myös sellaisenaan selaimella, mikä on hyödyllistä testauksen kannalta. Tuo vaihtoehto 'siivoojat' palauttaa kuvitteellisen listan siivoojista json-datana, joka voitaisiin sitten näyttää front-end sovelluksen käyttäjälle halutulla tavalla. Data on tässä esimerkissä kovakoodattuna, mutta voitaisiin lukea myös tietokannasta.

Express.js on näppärä alusta tämän kaltaisten juttujen tekemiseen.
Siitä löytyy ohjetta mm. tuolta: 
https://www.tutorialspoint.com/expressjs/index.htm   

- Jakaa rajapinta sub appeihin ja eri tiedostoihin
- npm start package.jsoniin
- tiedostorakenne

*/
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

var portti = 3000;

var houses = [
    {id: 1,	name: 'Kanjoninkatu 3', done: 0},
    {id: 2,	name: 'Vilppulanpolku 6', done: 0},
    {id: 3,	name: 'Nosturinraitti 2', done: 0},
    {id: 4,	name: 'Kanjoninkatu 11', done: 0},
    {id: 5,	name: 'Lindforsinkatu 12', done: 0},
    {id: 6,	name: 'Insinöörinkatu 52', done: 0},
    {id: 7,	name: 'Kanjoninkatu 5', done: 0},
    {id: 8,	name: 'Insinöörinkatu 22', done: 0},
    {id: 9,	name: 'Kemiankatu 4', done: 0},
    {id: 10, name: 'Insinöörinkatu 24', done: 0},
    {id: 11, name: 'Opiskelijankatu 15', done: 0},
    {id: 12, name: 'Orivedenkatu 20', done: 0},
    {id: 13, name: 'Opinpolku 1', done: 0},
    {id: 14, name: 'Elementinpolku 15', done: 0},
    {id: 15, name: 'Opiskelijankatu 1', done: 0},
    {id: 16, name: 'Pellervonkatu 22', done: 0},
    {id: 17, name: 'Paavo Kolinkatu 12', done: 0},
    {id: 18, name: 'Elementinpolku 13', done: 0},
    {id: 19, name: 'Paavo Kolinkatu 4', done: 0},
    {id: 20, name: 'Ahvenisjärventie 22', done: 0}
];
    

var siivoojat = [
    {id: 1, name: 'Juha Hippilä', palkka: '1000 EUR/kk'},  
    {id: 2, name: 'Timo Soini', palkka: '850 EUR/kk'}, 
    {id: 3, name: 'Petteri Orpo', palkka: '950 EUR/kk'},
];

var games = [{name: 'testi', id: 0}];
var nextId = 1;

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/hello', function(req, res){
   res.send('Hello world!');
});

app.get('/siivoojat', function(req, res){
   res.json(siivoojat);
});

app.get('/api/v1/houses', function(req, res){
    res.json(houses);
});

app.get('/api/v1/game', function(req, res){
    res.json(games);
});

app.get('/api/v1/houses/:id', function(req, res){
    let id = req.params.id;

    let house;

    for(let i = 0; i < houses.length; i++){
        if(houses[i]['id'] == id){
            house = houses[i];
            break;
        }
    // Jos haluaa    house = [{id: id, name:'Ei löydy'}];
    }
    res.json(house);
});


app.get('/api/v1/game/:id', function(req, res){
    let id = req.params.id;

    let game;

    for(let i = 0; i < games.length; i++){
        if(games[i]['id'] == id){
            game = games[i];
            break;
        }
    }
    res.json(game);
});

app.post('/api/v1/game', function(req, res) {
    let game = { id: nextId, name: req.body.name };
    nextId++;
    games.push(game);
    res.json(game);
});

app.get('/:id', function(req, res){
   res.send('Sanoitko ' + req.params.id + '?');
});

app.get('', function(req,res){
   res.send('Vaadittu muoto: IP_OSOITE:PORTTI/JOTAIN');
});

console.log('Tötteröö - kuuntelen porttia ' + portti);
app.listen(portti);

