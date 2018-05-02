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
        {   
            successRedirect: '/good-login',
            failureRedirect: '/bad-login' }));

    // Uloskirjautuminen - jos halutaan käyttää, ei liene välttämätön...           
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });    

    // Ilmoitus käyttäjälle, että kirjautuminen onnistui.
    app.get('/good-login', function(req, res){
        
    console.log('****************************************************************');
    console.log(' Läpi meni res._passport : '); //, res);
    console.log('****************************************************************');
    
      //  res.status(200);
        res.json({message: 'Welcome to dino cleaning backend service!'});
    });                                        

    // Ilmoitus käyttäjälle, että kirjautuminen epäonnistui tai on tekemättä.
    app.get('/bad-login', function(req, res){
        req.logout();
        res.status(401);
        console.log('------------------------------------------------------------------');
        console.log(' --  Väärät tunnukset  -- Logout -- '); //, req);
        console.log('------------------------------------------------------------------');
    
     
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
        console.log('hae kaikki talot');
        db.getHouses(function(err, data) {
            if (err)
            {
                res.status(500);
                res.json({message: err.message});
            }        
            else if (data && data.length > 0)
            {
                console.log('hae kaikki talot::  ',data);
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

//         db.getHouseById(id, function(err, data) {  menee palaute pyllylleen jossain
        db.getHouses(function(err, data) {
            if (err)
            {
                res.status(500);
                res.json({message: err.message});
            }        
            else if (data)
            {
                res.json(data);   
 //               console.log(data);
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
     
       
        let worker = req.body.user;
         //  let worker = res.req.user.username;
        console.log( ' req.body.user: ' ,  req.body.user);

        console.log('State ' + state);
    //    console.log(' setHouseState passport: ', req.session.passport);

        if (state == 1){

            let currentdate = new Date(); 
            let date = currentdate.getDate() + "." + (currentdate.getMonth()+1)  + "." + currentdate.getFullYear();
            let time = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
            db.setHouseState(id, state, date, time, worker, function(err) {})
            console.log('Siivotaan talo: ', id + '  -  date:  ', date, ' time: ', time, ' worker: ', worker);
        }
            else{
                db.setHouseDirt(id, state, function(err) {});
                console.log('Sotketaan talo: ', id );
            }

    //    db.setHouseState(id, state, date, time, function(err) {
        db.getHouses( function(err, data) {
            if (err)
        {
                res.status(500);
                res.json({message: err.message});
        }
        else if (data)
        {
          //  console.log('Haetaan kaikkien talon tiedot: ' + data);
            res.json(data);   
         //   console.log(data);
        }
        else
        {
            res.status(404);
            res.json({message: "Not Found"});
        }       
        });
    });

    // lisätään uusi siivouskohde
    // Testaus: 
    // curl -H "Content-Type: application/json" -X POST -d '{"name":"Nahkatehtaankatu 3","description":"Epilässä"}' http://localhost:3000/dinoCleaning/houses/add
    app.post(/*'/' + apiName + */'/houses/add', isLoggedIn, function(req, res){
       
            db.addNewHouse(req.body, function(err) {})
            db.getHouses(function(err, data) {
                console.log('Lisättiin talo, sitten haetaan kaikki talot : ', data);
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
            });/*
        if (err)
        {
                res.status(500);
                res.json({message: err.message});
        }
        else
        {
                res.status(200);
                res.json({message: 'Done'});
        } */  
        });

// Edit siivouskohde
app.post('/' + apiName + '/edit/:id', function(req, res){
    console.log('Edit body= ', req.body);
     
    db.editHouse(req.body, function(err) {});
    
    db.getHouses(function(err, data) {
        // console.log('Muokattiin, sitten haetaan kaikki talot : ', data);
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('*************** logging in, req.isAuthenticated()= ', req.isAuthenticated());
    console.log('req.session : ', req.session);
    console.log('req.sessionstore: ', req.sessionStore );
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~req.session.passport.user~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
   // console.log('^^^^^^   req   ^^^^^^^', req);
    // if user is authenticated in the session, carry on 
 
    if (req.isAuthenticated())
    {
        console.log('Käyttäjä on jo isLoggedIn OK -> sisään vaan');
        return next();
    }

    // if they aren't redirect them to the home page
    
    console.log('authentication needed');
    res.redirect('/bad-login');
}
