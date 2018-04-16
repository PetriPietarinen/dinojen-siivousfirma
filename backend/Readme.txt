Viimeisiin päivitys 16.4.2018 by Petri Pietarinen
1. Luotu yksintertaine Express-palvelinsovellus joka käyttää tietokantaa (sqlite)
2. Otettu autentikointi käyttöön passport.js moduulia hyödyntäen (16.4.2018)

Dinojen siivousfirman backend-koodi on tässä hakemistossa.

Perustuu Express.js käyttöön.

Autentikointi on toteutettu käyttäen Passport.js moduulia.

Tärkeimmät kooditiedostot:
- backendDinoCleaning.js - backend-palvelimen pääohjelma
- dbSqliteDinoCleaning.js - tietokantarutuunit SQLITE-kannalle
- passport.js - autentikointiin liittyvät toiminnallisuudet
- routes.js - yksittäisetten HTTP-palelupyyntöjen käsittelijät.

Autentikointi tapahtuu HTTP POST komennolla <ip>:<port>/login
Message bodyssä annetaan parametrit 'username' ja 'password'.

Onnistuneen autentikoinnin jälkeen voidaan sitten lähettää muita palveluyyntäjä.
Perustuu sessioperiaatteeseen, eli cookie tarvitaan.

Jos autentikonti epäonnoistuu tai yritetään tehtä jotain ilmain autentikonitia, palautuu virhe.

Autentikointia voi testata myös ilman frotendiä pelkällä selaimella.
Annetaan HTTP GET pyyntö <ip>:<port>/login, jolloin palvelin palauttaa kirjautumisikkunan.
Tämän jälkeen voidaan sitten antaa palveluyyntöjä selaimen kautta (esim. <ip>:<port>/houses)


