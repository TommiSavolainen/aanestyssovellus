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
uusiKayttajaBtn.addEventListener('click', lisaaUusiKayttaja);
kirjauduBtn.addEventListener('click', kirjaudu);

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
}

function adminPanel() {
    login.style.display = 'none';
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
