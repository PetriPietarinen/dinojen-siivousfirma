/*
    Tietokantarajapinta DinoCliening sovellukselle.   
    Käytetty tietokantatyyppi: SQLITE3
    Created by Petri Pietarinen
    Date: 2.4.2018
*/

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DinoCleaningDbSqlite.db');


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

exports.addNewHouse = function(body, callback) {
    console.log('Lisätään talo');
    console.log(body);

    // let sql = 'INSERT INTO houses(name, description, done) VALUES(?,?,0)';
    // let data = [body.name, body.description];


    let sql = 'INSERT INTO houses(id, name, description, pm, worker, date, time, done) VALUES(NULL,?,?,?,?,0,0,0)';
    let data = [body.name.name, body.name.description, body.name.pm, body.name.worker];
   
    db.run(sql, data, function(err) {
        if (err)
        {
            return callback(err);
        }
        return callback(null);
    });        
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


