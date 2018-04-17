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
/*    "name TEXT, " +
    "description TEXT, " +
    "pm TEXT, " +
    "worker TEXT, " +
    "date TEXT, " +
    "time TEXT, " +
    "done INTEGER)";
*/    
    "name TEXT NOT NULL DEFAULT 'talo', " +
    "description TEXT NOT NULL DEFAULT 'asoy', " +
    "pm TEXT NOT NULL DEFAULT 'iisoy', " +
    "worker TEXT NOT NULL DEFAULT 'poika', " +
    "date TEXT NOT NULL DEFAULT '2018', " +
    "time TEXT NOT NULL DEFAULT 'nyt', " +
    "done INTEGER NOT NULL DEFAULT 0)";




db.run(sqlQueryCreateHousesTable);  

var stmt2 = db.prepare("INSERT INTO houses(id, name, description, pm, worker, date, time, done) VALUES (NULL,?,?,?,?,?,?,?)");

stmt2.run("Kanjoninkatu 3", "As Oy Satoisäntä", "Isännöinti Salonen Ilpo Ky", "Heli", "24.3.2018", "11:50", 1);
stmt2.run("Vilppulanpolku 6", "As. Oy Pohjanneito", "Isännöinti Salonen Ilpo Ky", "Meri", "11.4.2018", "9:10", 1);
stmt2.run("Nosturinraitti 2", "AS OY ANNENPIRTTI", "Isännöinti Ilkka Saarinen Oy", "Tiina", "16.4.2018", "15:50", 1);
stmt2.run("Kanjoninkatu 11", "AS OY SATOTÄTI", "Isännöinti Ilkka Saarinen Oy", "Satu", "1.4.2018", "14:33", 1);
stmt2.run("Lindforsinkatu 12", "As.Oy Rantasentteri", "Isännöintipalvelu Männistö", "Milla", "9.4.2018", "12:33", 1);
stmt2.run("Insinöörinkatu 52", "As Oy Ahvenisrinne", "Isännöintipalvelu Männistö", "Helena", 0, 0, 0);
stmt2.run("Kanjoninkatu 5", "As.Oy Tampereen Satokehrääjä", "Tili- ja Isännöintikeskus T.I.K. Oy", "Heli", 0, 0, 0);
stmt2.run("Insinöörinkatu 22", "AS OY VALTAPOHJA", "Isännöinti Ilkka Saarinen Oy", "Meri", 0, 0, 0);
stmt2.run("Kemiankatu 4", "AS OY PÄHKINÄNAKKELI", "Isännöinti Ilkka Saarinen Oy", "Tiina", 0, 0, 0);
stmt2.run("Insinöörinkatu 24 ", "AS OY VALTAPIHA", "Isännöinti Ilkka Saarinen Oy", "Satu", 0, 0, 0);
stmt2.run("Opiskelijankatu 15", "As.OY Tasatuomo", "Isännöinti Ilkka Saarinen Oy", "Milla", 0, 0, 0);
stmt2.run("Orivedenkatu 20", "As Oy Torisevankallio", "Kiinteistöpalvelu Staras Oy ", "Helena", 0, 0, 0);
stmt2.run("Opinpolku 1", "AS OY AHVENISKALLIO", "Isännöinti Ilkka Saarinen Oy", "Heli", 0, 0, 0);
stmt2.run("Elementinpolku 15", "As.Oy Raimonraitti", "Tampereen KV-Isännöinti Oy", "Meri", 0, 0, 0);
stmt2.finalize();
  

});

db.close();

