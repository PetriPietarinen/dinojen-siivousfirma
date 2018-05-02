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
var session = require('express-session');
var passport = require('passport');

var corsOptions = {
    credentials: true,
    methods:['GET','POST'] ,
    origin: 'http://localhost:8080'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  // app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//  }); 





require('./passport.js')(passport);




// app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
    secret: 'NakkiMakkara' //,
//  name: 'keksi',
//  store: sessionStore, // connect-mongo session store
//    cookie: { //secure: false,
//                maxAge : 36000000 }
//    proxy: false,
//    resave: false,
//    saveUninitialized: false  */
})); 



app.use(cors(corsOptions));

console.log(' app.use(passport.initialize());');
app.use(passport.initialize());
console.log(' app.use(passport.session())');
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes.js')(app, apiName, db, passport); // load our routes and pass in our app and fully configured passport
console.log('require(./routes.js)(app,: ', app, 'apiName: ', apiName, ' db: ', db, 'passport:', passport);
console.log('Töttöröö - kuuntelen porttia ' + portti);
app.listen(portti);

