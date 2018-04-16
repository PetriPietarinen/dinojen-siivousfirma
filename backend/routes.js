/*
 *  routes.js
 *  Yksittäisten HTTP-palvelupyyntöjen käsittelyt laitettu nyt tänne.
 *  Created by Petri Pietarinen
 *  Date: 16.4.2018
 */

var path = require("path");

module.exports = function(app, apiName, db, passport) {

    /*
    *  Palauttaa yksinkertaisen web-formin kirjautumista varten.
    *  Tarkoitettu lähinna backendin testaamiseen ja demoamiseen ilman frontendiä.
    *  Fronted-sovellus ei kutsu tätä, vaan kirjautuu suoraan.
    */
    app.get('/login', function(req, res){
        res.sendFile(path.join(__dirname+'/login.html'));
     });

    /*
    *  Varsinainen kirjautuminen.
    *  Pyynnön dataosuudessa pitää tulla kentät username ja password.
    */     
    app.post('/login', passport.authenticate('local', 
        { successRedirect: '/good-login',
        failureRedirect: '/bad-login' }));

    // Uloskirjautuminen - jos halutaan käyttää, ei liene välttämätön...           
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });    

    // Ilmoitus käyttäjälle, että kirjautuminen onnistui.
    app.get('/good-login', function(req, res){
        res.json({message: 'Welcome to dino cleaning backend service!'});
    });                                        

    // Ilmoitus käyttäjälle, että kirjautuminen epäonnistui tai on tekemättä.
    app.get('/bad-login', function(req, res){
        res.json({message: 'Authentication failed.'});
    });    

    // Haetaan lista käyttäjistä
    app.get(/*'/' + apiName + */'/users', isLoggedIn, function(req, res){
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
    app.get(/*'/' + apiName + */'/users/:id', isLoggedIn, function(req, res){
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
    app.get(/*'/' + apiName + */'/houses', isLoggedIn, function(req, res){
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
    app.get(/*'/' + apiName + */'/houses/:id', isLoggedIn, function(req, res){
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
    app.post(/*'/' + apiName + */'/houses/done/:id/:state', isLoggedIn, function(req, res){
        let id = req.params.id;
        let state = req.params.state;
        let currentdate = new Date(); 
        let date = currentdate.getDate() + "." + (currentdate.getMonth()+1)  + "." + currentdate.getFullYear();
        let time = currentdate.getHours() + ":" + currentdate.getMinutes();
  
        console.log('Siivotaan talo: ' + id + '  -  date:  ' + date + ' time: ' + time);

        db.setHouseState(id, state, date, time, function(err) {
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

    // lisätään uusi siivouskohde
    // Testaus: 
    // curl -H "Content-Type: application/json" -X POST -d '{"name":"Nahkatehtaankatu 3","description":"Epilässä"}' http://localhost:3000/dinoCleaning/houses/add
    app.post(/*'/' + apiName + */'/houses/add', isLoggedIn, function(req, res){
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    {
        console.log('is authenticated');
        return next();
    }

    // if they aren't redirect them to the home page
    
    console.log('authentication needed');
    res.redirect('/bad-login');
}
