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

// Muuta seuraava jos haluat käyttää jotain muuta tietokantaa
var db = require('./dbSqliteDinoCleaning.js');

var portti = 3000;

var games = [{name: 'testi', id: 0}];
var nextId = 1;

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Haetaan lista käyttäjistä
app.get('/' + apiName + '/users', function(req, res){
    db.getUsers(function(err, data) {
        if (err)
        {
            res.status(500);
            res.json({message: err.message});
        }        
        else if (data && data.length > 0)
        {
            res.json(data);   
        }
        else
        {
            res.status(404);
            res.json({message: "No data"});
        }    
    });
});

// Haetaan käyttäjä id:n perusteella
app.get('/' + apiName + '/users/:id', function(req, res){
    let id = req.params.id;
    db.getUserById(id, function(err, data) {  
        if (err)
        {
            res.status(500);
            res.json({message: err.message});
        }        
        else if (data)
        {
            res.json(data);   
        }
        else
        {
            res.status(404);
            res.json({message: "Not Found"});
        }   
    });    
});

// Heataan lista siivouskohteista
app.get('/' + apiName + '/houses', function(req, res){
    db.getHouses(function(err, data) {
        if (err)
        {
            res.status(500);
            res.json({message: err.message});
        }        
        else if (data && data.length > 0)
        {
            res.json(data);   
        }
        else
        {
            res.status(404);
            res.json({message: "No data"});
        }   
    });
});

// Heataan siivouskohde id:n perusteella
app.get('/' + apiName + '/houses/:id', function(req, res){
    let id = req.params.id;

    console.log('Haetaan tiedot talosta: ' + id);

    db.getHouseById(id, function(err, data) {
        if (err)
        {
            res.status(500);
            res.json({message: err.message});
        }        
        else if (data)
        {
            console.log('Palaute: ' + data.name);
            res.json(data);   
            console.log(data);
        }
        else
        {
            res.status(404);
            res.json({message: "Not Found"});
        }   
    });    
});

// Siivouskohteen tilan muutos
// Testaus:
// curl --data '' http://localhost:3000/dinoCleaning/houses/done/2/1
app.post('/' + apiName + '/houses/done/:id/:state', function(req, res){
    let id = req.params.id;
    let state = req.params.state;
    let currentdate = new Date(); 
    let date = currentdate.getDate() + "." + (currentdate.getMonth()+1)  + "." + currentdate.getFullYear();
    let time = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();

   
       
    console.log('Siivotaan talo: ', id + '  -  date:  ', date, ' time: ', time);

    db.setHouseState(id, state, date, time, function(err) {})
    db.getHouseById(id, function(err, data) {
        if (err)
            {
                res.status(500);
                res.json({message: err.message});
            }        
            else if (data)
            {
                console.log('Haetaan siivotun talon tiedot: ', data.name);
                res.json(data);   
                console.log(data);
            }
            else
            {
                res.status(404);
                res.json({message: "Not Found"});
            }   
        });
    });

/*       if (err)
       {
            res.status(500);
            res.json({message: err.message});
       }
       else
       {
        db.getHouseById(id, function(err, data) {
            if (err)
            {
                res.status(500);
                res.json({message: err.message});
            }        
            else (data)
            {
                console.log('Palaute: ' + data.name);
                res.json(data);   
                console.log(data);
            } 
        


            // res.status(200);
            // res.json({message: id});
              
    });
       })
});
*/
// lisätään uusi siivouskohde
// Testaus: 
// curl -H "Content-Type: application/json" -X POST -d '{"name":"Nahkatehtaankatu 3","description":"Epilässä"}' http://localhost:3000/dinoCleaning/houses/add
app.post('/' + apiName + '/houses/add', function(req, res){
    
   
    db.addNewHouse(req.body, function(err) {
       if (err)
       {
            res.status(500);
            res.json({message: err.message});
       }
       else
       {
            res.status(200);
            res.json({message: 'Done'});
       }       
    });
});

/*
// Seuraavalla funktiolla voitaisiin periaatteessa dataa mistä tahansa taulusta minkä tahansa kentän arvolla
// Ehkä hieman kyseenalaista käyttää tällaista...mahdollistaisi periaatteessa pääsyn mihin vain...
app.get('/' + apiName + '/:table/:field/:value', function(req, res) {
    let table = req.params.table;
    let field = req.params.field;
    let value = req.params.value;
    db.getFromAnyTableByAnyField(table, field, value, function(err, data) {
       if (err)
        {
            res.status(500);
            res.json({message: err.message});
        }        
        else if (data && data.length > 0)
        {
            res.json(data);   
        }
        else
        {
            res.status(404);
            res.json({message: "No data"});
        }   
    });        
});
*/ 

console.log('Tötteröö - kuuntelen porttia ', portti);
app.listen(portti);

