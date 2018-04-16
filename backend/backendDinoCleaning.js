/*
    Dinojen siivousfirman backend sovellus
    Created by Petri Pietarinen
    Date: 2.4.2018
    Käyttää seuraavia sisäisiä moduuleita: dbSqliteDinoCliening - SQLite tietokantarajapintakirjasto
*/
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const apiName = 'dinoCleaning';
const portti = 3000;
var cookieParser = require('cookie-parser');

// Muuta seuraava jos haluat käyttää jotain muuta tietokantaa
var db = require('./dbSqliteDinoCleaning.js');
var app = express();
var passport = require('passport');
var expressSession = require('express-session');

require('./passport.js')(passport);

app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes.js')(app, apiName, db, passport); // load our routes and pass in our app and fully configured passport

console.log('Tötteröö - kuuntelen porttia ' + portti);
app.listen(portti);

