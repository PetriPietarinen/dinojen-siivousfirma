/*
    Luodaan yksintertainen testitietokanta DinoCliening sovellukselle.   
    Käytetty tietokantatyyppi: SQLITE3
    Created by Petri Pietarinen
    Date: 2.4.2018
*/


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('DinoCleaningDbSqlite.db');
var check;
db.serialize(function() {

var sqlQueryCreateUsersTable = "CREATE TABLE users (" +
    "id INTEGER PRIMARY KEY, " +
    "username TEXT NOT NULL, " +
    "password TEXT NOT NULL, " +
    "type INTEGER NOT NULL, " +
    "description TEXT)";
        
db.run(sqlQueryCreateUsersTable);

var stmt = db.prepare("INSERT INTO users(id, username, password, type, description) VALUES (NULL,?,?,?,?)");
stmt.run("TiinaToimari", "PuhdastaTulee", 1, "Tiina Toimitusjohtaja");
stmt.run("SeppoSiivooja", "LisaaLiksaa", 2, "Seppo Siivooja");
stmt.run("SirpaSiivooja", "LisaaLiksaa", 2, "Sirpa Siivooja");
stmt.finalize();

var sqlQueryCreateHousesTable = "CREATE TABLE houses (" +
    "id INTEGER PRIMARY KEY, " +
    "name TEXT NOT NULL, " +
    "description TEXT NOT NULL, " +
    "done INTEGER NOT NULL)";
    
db.run(sqlQueryCreateHousesTable);  

var stmt2 = db.prepare("INSERT INTO houses(id, name, description, done) VALUES (NULL,?,?,?)");
stmt2.run("Tiaisentie 15", "Kissa sanoo miau", 0);
stmt2.run("Kanjoninkatu 3", "Koira sanoo hau", 0);
stmt2.run("Vilppulanpolku 6", "Siivous 2x viikossa", 0);
stmt2.finalize();
  

});

db.close();

