# Käyttötapauskuvaukset

## Kirjautuminen

### Käyttäjä:

Laukaisija:

-   Oletus näkymä, kun tullaan sivustolle

Esiehto:

-   Pystyy kirjautumaan, jos on luotu käyttäjatunnus ja salasana

Jälkiehto:

-   Jos ei ole tietokannassa käyttäjätunnusta ja salasanaa voi sellaisen luoda uusi käyttäjä napista

Käyttötapauksen kulku:

-   Käyttäjä syöttää käyttäjätunnuksen ja salasanan ja painaa kirjaudu nappia

Poikkeuksellinen toiminta:

-   Jos käyttäjätunnus kenttä on tyhjä tulee ilmoitus: "Syötä käyttäjätunnus!"
-   Jos salasana kenttä on tyhjä tulee ilmoitus: "Syötä salasana!"
-   Jos käyttäjätunnus tai salasana on väärä tulee ilmoitus: "Väärä käyttäjätunnus tai salasana"
-   Jos yritetään luoda käyttäjätunnus mikä on jo olemassa tulee ilmoitus: "Käyttäjätunnus on jo olemassa!"

### Ylläpitäjä:

Käyttötapauksen kulku:

-   Ylläpitäjä kirjautuu ylläpitäjän käyttäjätunnuksella (admin) ja salasanalla (admin)

Poikkeuksellinen toiminta:

-   Jos yritetään luoda uutta käyttäjää nimella admin tulee ilmoitus "Käyttäjätunnus on jo olemassa!"

## Katselee äänestyksiä

### Käyttäjä:

Laukaisija:

-   Kun kirjaudutaan olemassa olevilla tunnuksilla sivustolle tulee käyttäjä Äänestykset sivustolle
-   Kirjautumis ikkuna hävitetään näkyvistä ja tuodaan äänestykset ikkuna näkyviin

Esiehto:

-   Jos on ensimmäinen kerta, kun kirjaudutaan ja selaimen tietokannassa ei ole vielä tehtyjä äänestyksiä, tulee näkyviin ns. oletus äänestys: Paras auto

Jälkiehto:

-   Jos on muita äänestyksiä tehty tulevat ne myös näkyviin

Käyttötapauksen kulku:

-   Äänestykset tulevat näkyviin, kun kirjaudutaan. Samassa näkyy äänestys tulokset ja äänestys nappi

## Katselee äänestystuloksia

### Käyttäjä:

Käyttötapauksen kulku:

-   Äänestykset tulevat näkyviin, kun kirjaudutaan. Samassa näkyy äänestys tulokset ja äänestys nappi

## Äänestää

### Käyttäjä:

Laukaisija:

-   Käyttäjä voi äänestää äänestyksiä äänestä napista

Esiehto:

-   Käyttäjä painaa äänestä napista

Jälkiehto:

-   Lasketaan äänestys tulokset ja lisätään ne tietokantaan

Käyttötapauksen kulku:

-   Käyttäjä painaa äänestä napista, jolloin lisätään kyseisen kohdan tuloksiin 1 ääni ja lasketaan prosenttuaalinen osuus kaikista kyseisen äänestyksen vaihtoehdosta ja lisätään tulokset tietokantaan ja päivitetään tulokset näkyviin.

## Luo uusia äänestyksiä

### Ylläpitäjä:

Laukaisija:

-   Kun kirjaudutaan ylläpitäjän tunnuksilla saavutaan äänestyksen teko työkalun pariin

Esiehto:

-   Syötetään äänestyksen otsikko ja painetaan lisää otsikko painiketta

Jälkiehto:

-   Syötetään äänestettävä tuote ja painetaan lisää item painiketta
-   Kun kaikki tuotteet on saatu lisättyä voi uuden äänestyksen lisätä tietokantaan lataa äänestys tietokantaan napista

Käyttötapauksen kulku:

-   Syötetään äänestyksen otsikko ja painetaan lisää otsikko painiketta. Otsikko ilmestyy alapuolelle ja lisää otsikko nappi muuttuu toimimattomaksi
-   Syötetään äänestettävä tuote ja painetaan lisää item painiketta. Tuotteet tulevat otsikon alapuolelle.
-   Kun kaikki tuotteet on saatu lisättyä voi uuden äänestyksen lisätä tietokantaan lataa äänestys tietokantaan napista.

Poikkeuksellinen toiminta:

-   Jos otsikko kenttä on tyhjä yritetään lisätä otsikko tulee ilmoitus: "Otsikko kenttä tyhjä!"
-   Jos äänestys item kenttä on tyhjä ja yritetään lisätä tuote äänestykseen tulee ilmoitus: "Äänestys item kenttä tyhjä!"

## Poistaa äänestyksiä

### Ylläpitäjä:

Laukaisija:

-   Ylläpitäjä painaa Preview/Poista napista

Esiehto:

-   Ylläpitäjä painaa Preview/Poista napista

Jälkiehto:

-   Ylläpitäjä painaa Poista napista

Käyttötapauksen kulku:

-   Ylläpitäjä painaa Preview/Poista napista ja näkyviin tulee kaikki tietokannassa olevat äänestykset.
-   Jokaisen äänestyksen otsikon alla on poista nappi, josta voi poistaa kyseisen äänestyksen tietokannasta ja näkyvistä.

Poikkeuksellinen toiminta:

-   Jos äänestyksiä ei ole vielä tehty aikaisemmin tulee näkyviin ns. oletus äänestys.
