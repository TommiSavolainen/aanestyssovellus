let login = document.getElementById('login');
let user = document.getElementById('user');
let salasana = document.getElementById('salasana');
let virheIlmoitus = document.getElementById('virheIlmoitus');
let kirjauduBtn = document.getElementById('kirjauduBtn');
let uusiKayttajaBtn = document.getElementById('uusiKayttajaBtn');
let users;
let usersList = JSON.parse(localStorage.getItem('users'));
let eiSamaaKayttajaa = true;
let aanestyksetLuettelo = document.getElementById('aanestykset');
let admin = document.getElementById('admin');
let uusiAanestysOtsikko = document.getElementById('uusiAanestysOtsikko');
let lisaaAanestysItem = document.getElementById('lisaaAanestysItem');
let lisaaItemBtn = document.getElementById('lisaaItemBtn');
let itemNumber = 1;
let aanestysNumber = localStorage.getItem('aanestysNumber');
let talletaBtn = document.getElementById('talletaBtn');
let lisaaOtsikkoBtn = document.getElementById('lisaaOtsikkoBtn');
let aanestys = document.getElementById('aanestys');
let aanestysOtsikko = document.createElement('h3');
let div = document.createElement('div');
let items = [];
let katso = document.getElementById('katso');
lisaaItemBtn.addEventListener('click', lisaaUusiItem);
lisaaOtsikkoBtn.addEventListener('click', lisaaOtsikko);
uusiKayttajaBtn.addEventListener('click', lisaaUusiKayttaja);
kirjauduBtn.addEventListener('click', kirjaudu);
talletaBtn.addEventListener('click', talleta);
katso.addEventListener('click', katsoJaPoista);
document.addEventListener('click', poista);
document.addEventListener('click', aanesta);

// Haetaan käyttäjät jos niitä löytyy
if (usersList == null) {
    usersList = [];
} else {
    usersList = JSON.parse(localStorage.getItem('users'));
}
// Asetetaan äänestysnumero jos sellaista ei ole jo olemassa
if (aanestysNumber == null) {
    aanestysNumber = 1;
} else {
    aanestysNumber = localStorage.getItem('aanestysNumber');
}
// Ladataan malli äänestys localstorageen jos siellä ei ole vielä muita äänestyksiä
if (aanestysNumber < 2) {
    init();
}

function init() {
    let malliaanestys = [
        {
            otsikko: 'Paras auto',
            summa: 60,
            items: [
                { labelName: 'Audi: ', progress: 30, prosentti: 50 },
                { labelName: 'BMW: ', progress: 20, prosentti: 33 },
                { labelName: 'Volvo: ', progress: 10, prosentti: 16 },
            ],
        },
    ];
    localStorage.setItem('aanestys' + aanestysNumber, JSON.stringify(malliaanestys));
    aanestysNumber++;
    localStorage.setItem('aanestysNumber', aanestysNumber);
}
// Äänestyssovellukseen kirjautuminen
function kirjaudu() {
    virheIlmoitus.innerText = '';
    virheIlmoitus.innerText = '';
    if (user.value.length > 0) {
        if (salasana.value.length > 0) {
            let kayttajat = JSON.parse(localStorage.getItem('users'));
            if (kayttajat != null) {
                kayttajat.forEach((kayttaja) => {
                    if (user.value == 'admin' && salasana.value == 'admin') {
                        adminPanel();
                    }
                    if (kayttaja.kayttaja == user.value && kayttaja.salasana == salasana.value) {
                        virheIlmoitus.style.color = 'green';
                        virheIlmoitus.innerText = 'Käyttäjätunnus ja salasana oikein';
                        aanestykset();
                    } else if (kayttaja.kayttaja != user.value || kayttaja.salasana != salasana.value) {
                        virheIlmoitus.style.color = 'red';
                        virheIlmoitus.innerText = 'Väärä käyttäjätunnus tai salasana';
                    }
                });
            }
        } else {
            virheIlmoitus.style.color = 'red';
            virheIlmoitus.innerText = 'Syötä salasana!';
        }
    } else {
        virheIlmoitus.style.color = 'red';
        virheIlmoitus.innerText = 'Syötä käyttäjätunnus!';
    }
}

// Normaali käyttäjille näkyvät äänestykset luodaan tässä
function aanestykset() {
    login.style.display = 'none';
    aanestyksetLuettelo.style.display = 'block';
    for (let key in localStorage) {
        if (key == 'aanestysNumber') {
            continue;
        }
        if (key.startsWith('aanestys')) {
            let aanestyksetList = JSON.parse(localStorage.getItem(key));
            aanestyksetList.forEach((aanestysObj) => {
                let aanestysOtsikko = document.createElement('h3');
                aanestysOtsikko.innerHTML = aanestysObj.otsikko;
                div = document.createElement('div');
                div.id = key;
                aanestyksetLuettelo.appendChild(div);
                div.appendChild(aanestysOtsikko);
                aanestysObj.items.forEach((item) => {
                    let br = document.createElement('br');
                    let label = document.createElement('label');
                    label.htmlFor = item.labelName;
                    label.innerHTML = item.labelName;
                    let progress = document.createElement('progress');
                    progress.id = item.labelName;
                    progress.value = item.prosentti;
                    progress.max = 100;
                    let button = document.createElement('button');
                    button.innerHTML = 'Äänestä';
                    button.id = 'itemBtn';
                    div.appendChild(label);
                    div.appendChild(progress);
                    div.appendChild(button);
                    div.appendChild(br);
                });
            });
        }
    }
}

// Avataan admin paneeli mistä voi lisätä ja poistaa äänestyksiä (Käyttäjätunnus: admin Salasana: admin)
function adminPanel() {
    login.style.display = 'none';
    admin.style.display = 'block';
}

// Avataan esikatselu äänestyksistä mistä voi poistaa myös äänestyksiä
function katsoJaPoista() {
    for (let key in localStorage) {
        if (key == 'aanestysNumber') {
            continue;
        }
        if (key.startsWith('aanestys')) {
            let aanestyksetList = JSON.parse(localStorage.getItem(key));
            aanestyksetList.forEach((aanestysObj) => {
                let aanestysOtsikko = document.createElement('h3');
                aanestysOtsikko.innerHTML = aanestysObj.otsikko;
                div = document.createElement('div');
                div.id = key;
                let br = document.createElement('br');
                br.id = 'poistaBr';
                let poistaBtn = document.createElement('button');
                poistaBtn.id = 'poistaBtn';
                poistaBtn.innerHTML = 'Poista';
                aanestys.appendChild(div);
                div.appendChild(aanestysOtsikko);
                div.appendChild(poistaBtn);
                div.appendChild(br);
                aanestysObj.items.forEach((item) => {
                    let br = document.createElement('br');
                    let label = document.createElement('label');
                    label.htmlFor = item.labelName;
                    label.innerHTML = item.labelName;
                    let progress = document.createElement('progress');
                    progress.id = item.labelName;
                    progress.value = item.prosentti;
                    progress.max = 100;
                    let button = document.createElement('button');
                    button.innerHTML = 'Äänestä';
                    button.id = 'itemBtn';
                    div.appendChild(label);
                    div.appendChild(progress);
                    div.appendChild(button);
                    div.appendChild(br);
                });
            });
        }
    }
}

// äänestyksen poisto
function poista(e) {
    let element = e.target;
    if (element.id == 'poistaBtn') {
        localStorage.removeItem(element.parentNode.id);
        element.parentNode.remove();
    }
}

// äänestyksien laskenta
function aanesta(e) {
    let element = e.target;
    if (element.id == 'itemBtn') {
        let aanestysId = JSON.parse(localStorage.getItem(element.parentNode.id));
        aanestysId.forEach((item) => {
            item.summa++;
            item.items.forEach((aanestys) => {
                if (aanestys.labelName == element.previousSibling.id) {
                    aanestys.progress = Number(aanestys.progress) + 1;
                }
            });
        });
        localStorage.setItem(element.parentNode.id, JSON.stringify(aanestysId));
        tarkistaAanestysProsentit();
    }
    function tarkistaAanestysProsentit() {
        let aanestysId = JSON.parse(localStorage.getItem(element.parentNode.id));
        let x = element.parentNode.querySelectorAll('progress');
        aanestysId.forEach((item) => {
            item.items.forEach((aanestys, index) => {
                x.forEach((tulos, i) => {
                    if (index == i) {
                        tulos.value = Math.floor((Number(aanestys.progress) / item.summa) * 100);
                        aanestys.prosentti = tulos.value;
                    }
                });
            });
        });
        localStorage.setItem(element.parentNode.id, JSON.stringify(aanestysId));
    }
}
// Määritetään uuden äänestyksen otsikko
function lisaaOtsikko() {
    if (uusiAanestysOtsikko.value == '') {
        alert('Otsikko kenttä tyhjä!');
    } else {
        aanestysOtsikko.innerHTML = uusiAanestysOtsikko.value;
        div = document.createElement('div');
        div.id = 'aanestys' + aanestysNumber;
        let br = document.createElement('br');
        br.id = 'poistaBr';
        let poistaBtn = document.createElement('button');
        poistaBtn.id = 'poistaBtn';
        poistaBtn.innerHTML = 'Poista';
        aanestys.appendChild(div);
        div.appendChild(aanestysOtsikko);
        div.appendChild(poistaBtn);
        div.appendChild(br);
        lisaaOtsikkoBtn.disabled = true;
        items.push({ otsikko: uusiAanestysOtsikko.value });
    }
}
let item = [];

// Määritetään äänestys objektit
function lisaaUusiItem() {
    if (lisaaAanestysItem.value == '') {
        alert('Äänestys item kenttä tyhjä!');
    } else {
        let label = document.createElement('label');
        let aanestysID = 'ID' + aanestysNumber;
        label.htmlFor = aanestysID + 'item' + itemNumber;
        label.innerHTML = lisaaAanestysItem.value;
        let progress = document.createElement('progress');
        progress.id = aanestysID + 'item' + itemNumber;
        progress.value = localStorage.getItem(progress.id);
        progress.max = 100;
        let button = document.createElement('button');
        button.innerHTML = 'Äänestä';
        button.id = 'itemBtn';
        let br = document.createElement('br');
        div.appendChild(label);
        div.appendChild(progress);
        div.appendChild(button);
        div.appendChild(br);

        item.push({ labelName: lisaaAanestysItem.value, progress: 0, prosentti: 0 });
        lisaaAanestysItem.value = '';
        itemNumber++;
    }
}

// talletetaan äänestys localstorageen
function talleta() {
    items = [{ otsikko: uusiAanestysOtsikko.value, summa: 0, items: item }];
    localStorage.setItem('aanestys' + aanestysNumber, JSON.stringify(items));
    aanestysNumber++;
    localStorage.setItem('aanestysNumber', aanestysNumber);
    aanestys.innerHTML = '';
    uusiAanestysOtsikko.value = '';
    lisaaOtsikkoBtn.disabled = false;
    items = [];
}

// lisätään uusi käyttäjä localstorageen
function lisaaUusiKayttaja() {
    virheIlmoitus.innerText = '';
    virheIlmoitus.innerText = '';
    if (user.value.length > 0) {
        if (salasana.value.length > 0) {
            let kayttajat = JSON.parse(localStorage.getItem('users'));
            if (kayttajat != null) {
                kayttajat.forEach((kayttaja) => {
                    if (kayttaja.kayttaja == user.value) {
                        virheIlmoitus.style.color = 'red';
                        virheIlmoitus.innerText = 'Käyttäjätunnus on jo olemassa!';
                        eiSamaaKayttajaa = false;
                    }
                    if (user.value == 'admin') {
                        virheIlmoitus.style.color = 'red';
                        virheIlmoitus.innerText = 'Käyttäjätunnus on jo olemassa!';
                        eiSamaaKayttajaa = false;
                    }
                });
                if (eiSamaaKayttajaa) {
                    eiSamaaKayttajaa = true;
                    uusiusers = { kayttaja: user.value, salasana: salasana.value };
                    usersList.push(uusiusers);
                    localStorage.setItem('users', JSON.stringify(usersList));
                    virheIlmoitus.style.color = 'black';
                    virheIlmoitus.innerText = 'Käyttäjä lisätty';
                    user.value = '';
                    salasana.value = '';
                }
            } else {
                users = { kayttaja: user.value, salasana: salasana.value };
                usersList.push(users);
                localStorage.setItem('users', JSON.stringify(usersList));
                virheIlmoitus.style.color = 'black';
                virheIlmoitus.innerText = 'Käyttäjä lisätty';
                user.value = '';
                salasana.value = '';
            }
        } else {
            virheIlmoitus.style.color = 'red';
            virheIlmoitus.innerText = 'Syötä salasana!';
        }
    } else {
        virheIlmoitus.style.color = 'red';
        virheIlmoitus.innerText = 'Syötä käyttäjätunnus!';
    }
}
