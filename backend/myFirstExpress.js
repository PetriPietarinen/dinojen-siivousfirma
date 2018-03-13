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
*/

var portti = 3000;

var siivoojat = [
    {id: 1, nimi: 'Juha Sipilä', palkka: '1000 EUR/kk'},  
    {id: 2, name: 'Timo Soini', palkka: '850 EUR/kk'}, 
    {id: 3, name: 'Petteri Orpo', palkka: '950 EUR/kk'}    
];

var express = require('express');
var app = express();

app.get('/hello', function(req, res){
   res.send('Hello world!');
});

app.get('/siivoojat', function(req, res){
   res.json(siivoojat);
});

app.get('/:id', function(req, res){
   res.send('Sanoitko ' + req.params.id + '?');
});

app.get('', function(req,res){
   res.send('Vaadittu muoto: IP_OSOITE:PORTTI/JOTAIN');
});

console.log('Tötteröö - kuuntelen porttia ' + portti);
app.listen(portti);

