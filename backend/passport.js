/*
 *  passport.js
 *  Käyttäjän autentikointi passport.js moduulin avulla.
 *  Created by Petri Pietarinen
 *  Date: 16.4.2018
 */

var passwordHash = require('password-hash');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var db = require('./dbSqliteDinoCleaning.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializeUser');
        console.log(user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {

        console.log('deserializeUser:' + id);

        db.getUserById(id, function(err, row) {
            if (!row)
            {
                console.log('deserialize, not found');
                return done(null, false);
            }
            //console.log('deserialize, found');
            return done(null, row);
          });
    });

    passport.use(new LocalStrategy(function(username, password, done) {

        console.log('passport.use, username: ' + username);

        db.getUserByName(username, function(err, row) {
            if (!row) 
            {
                console.log('username not found');
                return done(null, false, { message: 'Incorrect username'});
            }

            /*
                Turvallisempaa olisi tallettaa salasanat kantaan kryptattuina (esim. sha-1)         
                Tällöin vastaanotettu salasana kryptataan vastaavasti ennen vertailua.
                Vielä turvallisempaa olisi tehdä tämä jo frontend puolella.
                Sama voidaan haluttaessa tehdä myös käyttäjätunnukselle.
            */
            let hashedPassword = password; 
            //let hashedPassword = passwordHash.generate(password);

            if (hashedPassword.localeCompare(row.password) != 0)
            {
                console.log('password check failed: ' + hashedPassword + ' != ' + row.password);
                return done(null, false, { message: 'Incorrect password' });
            }   

            return done(null, row);
        });

    }));
  
};

