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
stmt.run("Nakki", "Nakki", 1, "Nakki Makkara");
stmt.run("a", "a", 1, "Teppo Tulkku");
stmt.run("TiinaToimari", "PuhdastaTulee", 1, "Tiina Toimitusjohtaja");
stmt.run("SeppoSiivooja", "LisaaLiksaa", 2, "Seppo Siivooja");
stmt.run("SirpaSiivooja", "LisaaLiksaa", 2, "Sirpa Siivooja");
stmt.finalize();

var sqlQueryCreateHousesTable = "CREATE TABLE houses (" +
    "id INTEGER PRIMARY KEY, " +
    "name TEXT NOT NULL DEFAULT 'talo', " +
    "description TEXT NOT NULL DEFAULT 'asoy', " +
    "pm TEXT NOT NULL DEFAULT 'iisoy', " +
    "lat TEXT NOT NULL DEFAULT '61', " +
    "lon TEXT NOT NULL DEFAULT '23', " +
    "worker TEXT NOT NULL DEFAULT 'poika', " +
    "date TEXT NOT NULL DEFAULT '2018', " +
    "time TEXT NOT NULL DEFAULT 'nyt', " +
    "done INTEGER NOT NULL DEFAULT 0)";




db.run(sqlQueryCreateHousesTable);  

var stmt2 = db.prepare("INSERT INTO houses(id, name, description, pm, worker, lat, lon, date, time, done) VALUES (NULL,?,?,?,?,?,?,?,?,?)");

stmt2.run("Kanjoninkatu 3", "As Oy Satoisäntä", "Isännöinti Salonen Ilpo Ky", "Heli", "61.457514","23.843912", "24.3.2018", "11:50", 1);
stmt2.run("Vilppulanpolku 6", "As. Oy Pohjanneito", "Isännöinti Salonen Ilpo Ky", "Meri", "61.456897", "23.842791", "11.4.2018", "9:10", 1);
stmt2.run("Nosturinraitti 2", "AS OY ANNENPIRTTI", "Isännöinti Ilkka Saarinen Oy", "Tiina", "61.442655", "23.850718", "16.4.2018", "15:50", 1);
stmt2.run("Kanjoninkatu 11", "AS OY SATOTÄTI", "Isännöinti Ilkka Saarinen Oy", "Satu", "61.456886", "23.840233", "1.4.2018", "14:33", 1);
stmt2.run("Lindforsinkatu 12", "As.Oy Rantasentteri", "Isännöintipalvelu Männistö", "Milla", "61.450111", "23.845147", "9.4.2018", "12:33", 1);
stmt2.run("Insinöörinkatu 52", "As Oy Ahvenisrinne", "Isännöintipalvelu Männistö", "Helena", "61.448205", "23.851725", 0, 0, 0);
stmt2.run("Kanjoninkatu 5", "As.Oy Tampereen Satokehrääjä", "Tili- ja Isännöintikeskus T.I.K. Oy", "Heli", "61.457665", "23.843141", 0, 0, 0);
stmt2.run("Insinöörinkatu 22", "AS OY VALTAPOHJA", "Isännöinti Ilkka Saarinen Oy", "Meri", "61.452722", "23.847458", 0, 0, 0);
stmt2.run("Kemiankatu 4", "AS OY PÄHKINÄNAKKELI", "Isännöinti Ilkka Saarinen Oy", "Tiina", "61.445364", "23.840902", 0, 0, 0);
stmt2.run("Insinöörinkatu 24", "AS OY VALTAPIHA", "Isännöinti Ilkka Saarinen Oy", "Satu", "61.452512", "23.847627", 0, 0, 0);
stmt2.run("Opiskelijankatu 15", "As.OY Tasatuomo", "Isännöinti Ilkka Saarinen Oy", "Milla", "61.451471", "23.843642", 0, 0, 0);
stmt2.run("Orivedenkatu 20", "As Oy Torisevankallio", "Kiinteistöpalvelu Staras Oy ", "Helena", "61.454746", "23.840354", 0, 0, 0);
stmt2.run("Opinpolku 1", "AS OY AHVENISKALLIO", "Isännöinti Ilkka Saarinen Oy", "Heli", "61.448453", "23.833553", 0, 0, 0);
stmt2.run("Elementinpolku 15", "As.Oy Raimonraitti", "Tampereen KV-Isännöinti Oy", "Meri", "61.442952", "23.851117", 0, 0, 0);
stmt2.finalize();
  

});

db.close();

