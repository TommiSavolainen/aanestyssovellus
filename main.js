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
// localStorage.setItem('aanestys' + aanestysNumber, JSON.stringify(aanestysObject));

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
            let aanestyksetList = JSON.parse(localStorage.getItem(key));
            aanestyksetList.forEach((aanestysObj) => {
                aanestysOtsikko.innerHTML = aanestysObj.otsikko;
                div = document.createElement('div');
                div.id = key;
                // let br = document.createElement('br');
                // br.id = 'poistaBr';
                // let poistaBtn = document.createElement('button');
                // poistaBtn.id = 'poistaBtn';
                // poistaBtn.innerHTML = 'Poista';
                aanestys.appendChild(div);
                div.appendChild(aanestysOtsikko);
                // div.appendChild(poistaBtn);
                // div.appendChild(br);
                aanestysObj.items.forEach((item) => {
                    console.log(item.labelName);
                    let br = document.createElement('br');
                    let label = document.createElement('label');
                    label.htmlFor = item.labelName;
                    label.innerHTML = item.labelName;
                    let progress = document.createElement('progress');
                    progress.id = item.labelName;
                    progress.value = item.progress;
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

function adminPanel() {
    login.style.display = 'none';
    admin.style.display = 'block';
}

function katsoJaPoista() {
    for (let key in localStorage) {
        if (key == 'aanestysNumber') {
            continue;
        }
        if (key.startsWith('aanestys')) {
            let aanestyksetList = JSON.parse(localStorage.getItem(key));
            aanestyksetList.forEach((aanestysObj) => {
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
                    console.log(item.labelName);
                    let br = document.createElement('br');
                    let label = document.createElement('label');
                    label.htmlFor = item.labelName;
                    label.innerHTML = item.labelName;
                    let progress = document.createElement('progress');
                    progress.id = item.labelName;
                    progress.value = item.progress;
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

function poista(e) {
    let element = e.target;
    if (element.id == 'poistaBtn') {
        localStorage.removeItem(element.parentNode.id);
        element.parentNode.remove();
    }
}

// todo kirjaudu sivulle tavarat tulemaan localstoragesta ja vara äänestykset jos localstorage tyhjä
function aanesta(e) {
    let element = e.target;
    if (element.id == 'itemBtn') {
        let aanestysId = JSON.parse(localStorage.getItem(element.parentNode.id));
        aanestysId.forEach((item) => {
            item.items.forEach((aanestys) => {
                if (aanestys.labelName == element.previousSibling.id) {
                    aanestys.progress = Number(aanestys.progress) + 1;
                    console.log(aanestys.progress);
                    element.previousSibling.value = aanestys.progress;
                }
            });
        });
        localStorage.setItem(element.parentNode.id, JSON.stringify(aanestysId));
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
        items.push({ otsikko: uusiAanestysOtsikko.value });
    }
}
let item = [];
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

        item.push({ labelName: lisaaAanestysItem.value, progress: 0 });
        lisaaAanestysItem.value = '';
        itemNumber++;
    }
}

function talleta() {
    items = [{ otsikko: uusiAanestysOtsikko.value, items: item }];
    localStorage.setItem('aanestys' + aanestysNumber, JSON.stringify(items));
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
