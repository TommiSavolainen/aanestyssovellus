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
let aanestysObject = [
    {
        aanestys1: {
            otsikko: 'eka',
            items: [
                { labelName: 'Punainen', progressBar: 0 },
                { labelName: 'Sininen', progressBar: 0 },
            ],
        },
    },
];
localStorage.setItem('aanestykset', JSON.stringify(aanestysObject));

if (usersList == null) {
    usersList = [];
} else {
    usersList = JSON.parse(localStorage.getItem('users'));
}

if (aanestysNumber == null) {
    aanestysNumber = 1;
} else {
    aanestysNumber = localStorage.getItem('aanestysNumber');
}

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
            virheIlmoitus.innerText = 'Syötä salsana!';
        }
    } else {
        virheIlmoitus.style.color = 'red';
        virheIlmoitus.innerText = 'Syötä käyttäjätunnus!';
    }
}
function aanestykset() {
    login.style.display = 'none';
    aanestyksetLuettelo.style.display = 'block';
    for (let key in localStorage) {
        if (key == 'aanestysNumber') {
            continue;
        }
        if (key.startsWith('aanestys')) {
            let x = JSON.parse(localStorage.getItem(key));
            aanestyksetLuettelo.innerHTML += x;
            console.log(x);
        }
    }
}

function adminPanel() {
    login.style.display = 'none';
    admin.style.display = 'block';
}

function katsoJaPoista() {
    let aanestyksetList = JSON.parse(localStorage.getItem('aanestykset'));
    aanestyksetList.forEach((aanestysObj) => {
        aanestysOtsikko.innerHTML = aanestysObj.aanestys1.otsikko;
        div = document.createElement('div');
        div.id = aanestysObj.aanestys1.otsikko;
        let br = document.createElement('br');
        br.id = 'poistaBr';
        let poistaBtn = document.createElement('button');
        poistaBtn.id = 'poistaBtn';
        poistaBtn.innerHTML = 'Poista';
        aanestys.appendChild(div);
        div.appendChild(aanestysOtsikko);
        div.appendChild(poistaBtn);
        div.appendChild(br);
        aanestysObj.aanestys1.items.forEach((item) => {
            console.log(item.labelName);
            let br = document.createElement('br');
            let label = document.createElement('label');
            let aanestysID = 'ID' + aanestysNumber;
            label.htmlFor = item.labelName;
            label.innerHTML = item.labelName;
            let progress = document.createElement('progress');
            progress.id = item.labelName;
            // localStorage.setItem(progress.id, 0);
            progress.value = item.progressBar;
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
    // for (let key in localStorage) {
    //     if (key == 'aanestysNumber') {
    //         continue;
    //     }
    //     if (key.startsWith('aanestys')) {
    //         let x = JSON.parse(localStorage.getItem(key));
    //         aanestys.innerHTML += x;

    //         console.log(x);
    //     }
    // }
}

function poista(e) {
    let element = e.target;
    if (element.id == 'poistaBtn') {
        localStorage.removeItem(element.parentNode.id);
        element.parentNode.remove();
        console.log(element.parentNode);
    }
}

// todo juokseva id progress elementteihin ja sen mukaan tallennetaan localStorageen
function aanesta(e) {
    let element = e.target;
    if (element.id == 'itemBtn') {
        let aanestysId = localStorage.getItem(element.previousSibling.id);
        aanestysId = Number(aanestysId) + 1;
        localStorage.setItem(element.previousSibling.id, aanestysId);
        element.previousSibling.value = Number(localStorage.getItem(element.previousSibling.id));
        console.log(element.previousSibling.id);
    }
}

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
    }
}

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
        localStorage.setItem(progress.id, 0);
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
        items.push(div.outerHTML);
        lisaaAanestysItem.value = '';
        itemNumber++;
        console.log(div.id);
    }
}

function talleta() {
    console.log(aanestysNumber);
    localStorage.setItem('aanestys' + aanestysNumber, JSON.stringify(items[items.length - 1]));
    aanestysNumber++;
    localStorage.setItem('aanestysNumber', aanestysNumber);
    aanestys.innerHTML = '';
    uusiAanestysOtsikko.value = '';
    lisaaOtsikkoBtn.disabled = false;
    items = [];
}

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
            virheIlmoitus.innerText = 'Syötä salsana!';
        }
    } else {
        virheIlmoitus.style.color = 'red';
        virheIlmoitus.innerText = 'Syötä käyttäjätunnus!';
    }
}
