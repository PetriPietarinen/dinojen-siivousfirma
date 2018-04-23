/*
    Tietokantarajapinta DinoCliening sovellukselle.   
    Käytetty tietokantatyyppi: SQLITE3
    Created by Petri Pietarinen
    Date: 2.4.2018
*/

var NodeGeocoder = require('node-geocoder');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DinoCleaningDbSqlite.db');
var lat = 0;
var lon = 0;



exports.getUsers = function(callback) {
    let sql = 'SELECT * FROM users';
    db.all(sql, function(err, rows) {
        callback(err, rows);
    });
};

exports.getHouses = function(callback) {
    let sql = 'SELECT * FROM houses';
    db.all(sql, function(err, rows) {
        callback(err, rows);
    });
};

exports.getUserById = function(id, callback) {
    let sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], function(err, rows) {
        callback(err, rows);
    });
};

exports.getHouseById = function(id, callback) {
    let sql = 'SELECT * FROM houses WHERE id = ?';
    db.get(sql, [id], function(err, rows) {
        callback(err, rows);
    });
};

exports.setHouseState = function(id, state, date, time, callback) {
    let sql = 'UPDATE houses SET done = ?, date = ?, time = ? WHERE id = ?';
    let data = [state, date, time, id];
    db.run(sql, data, function(err) {
        if (err)
        {
            return callback(err);
        }
        return callback(null);
    });
};

exports.setHouseDirt = function(id, state, callback) {
    let sql = 'UPDATE houses SET done = ? WHERE id = ?';
    let data = [state, id];
    db.run(sql, data, function(err) {
        if (err)
        {
            return callback(err);
        }
        return callback(null);
    });
};

exports.editHouse = function(body, callback) {
    console.log('Muokataan taloa : ');
    console.log(body);

    let sql = 'UPDATE houses SET name = ?, description = ?, pm = ?, worker = ? WHERE id = ?';
    let data = [body.id.name, body.id.description, body.id.pm, body.id.worker, body.id.id];
   
    console.log('sql= ', sql, 'ja data= ', data);

    db.run(sql, data, function(err) {
        if (err)
        {
            console.log('Error:', err);
            return callback(err);
        }
        console.log('Toimiko edit');
        return callback(null);
    });        
};


exports.addNewHouse = function(body, callback) {
    console.log('Lisätään talo');
    console.log(body);

    

    var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: '4a245ed908b745ba8b0f71cbd8d6e12a',
        language: 'fi'
      });
   
// bounds: 23.564538, 51.280430 , 0.278970,51.683979}

      console.log(body.name.name +' tampere');

      geocoder.geocode(body.name.name +', tampere')
        .then(function(res) {
        let sql = 'INSERT INTO houses(id, name, description, pm, worker, lat, lon, date, time, done) VALUES(NULL,?,?,?,?,?,?,0,0,0)';
        let data = [body.name.name, body.name.description, body.name.pm, body.name.worker, res[0].latitude, res[0].longitude];
        console.log('Geocoder:', res);
        console.log('LAT: ', res[0].latitude);
        console.log('LON: ', res[0].longitude);
        db.run(sql, data, function(err) {
            if (err)
            {
                console.log('ei lisätty: ', err);
                return callback(err);
            }
            console.log('Lisättiin talo');
            return callback(null);
            }); 
        })  
        .catch(function(err) {
            console.log(err);
          });

     



//    let sql = 'INSERT INTO houses(id, name, description, pm, worker, lat, lon, date, time, done) VALUES(NULL,?,?,?,?,?,?,0,0,0)';
//    let data = [body.name.name, body.name.description, body.name.pm, body.name.worker, lat, lon];
   
       
};

/*
// Seuraavalla funktiolla voitaisiin periaatteessa dataa mistä tahansa taulusta minkä tahansa kentän arvolla
// Ehkä hieman kyseenalaista käyttää tällaista...mahdollistaisi periaatteessa pääsyn mihin vain...
exports.getFromAnyTableByAnyField = function(table, field, value, callback) {
    console.log('table: ' + table);
    console.log('field: ' + field);
    console.log('value: ' + value);
    let sql = 'SELECT * FROM ' + table + ' WHERE ' + field + ' = ?';
    db.all(sql, [value], function(err, rows) {
        callback(err, rows);
    });
};
*/


