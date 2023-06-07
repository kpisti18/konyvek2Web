const baseUrl = 'http://localhost:3000/vasarlok';
const inputID = document.querySelector('#vasarloID');
const inputNev = document.querySelector('#nev');
const inputEmail = document.querySelector('#email');
const inputFelhasznalonev = document.querySelector('#felhasznalonev');
const inputJelszo = document.querySelector('#jelszo1');
const inputJelszo2 = document.querySelector('#jelszo2');
const btnCreate = document.querySelector('#btnCreate');
const btnReadAll = document.querySelector('#btnReadAll');
const btnDelete = document.querySelector('#btnDelete');
const btnUpdate = document.querySelector('#btnUpdate');

//adatok kiolvasása
btnReadAll.addEventListener('click', readAllVasarlo);
async function readAllVasarlo() {
    const response = await fetch(`${baseUrl}/readAll`);
    const jsonData = await response.json();
    kartyakMegjelenites(jsonData);
}

//kártyák megjelenítése
function kartyakMegjelenites(jsonData) {
    beviteliMezokNullazasa();
    let kartya = "";
    for (adat of jsonData) {
        kartya += `
        <div class="col-sm-3">
            <div class="card m-2 p-2">
                <div class="card-title h3">${adat.nev}</div>
                <div class="card-text">${adat.felhasznalonev}</div>
                <div class="card-text">${adat.email_cim}</div>
                <div class="card-footer">
                    <button type="button" class="btn btn-outline-dark" id="${adat.vasarloid}" onclick="vasarloKivalasztasa(${adat.vasarloid})">Kiválaszt</button>
                </div>
            </div>
        </div>
        `;
    }
    document.querySelector('#osszesVasarlo').innerHTML = kartya;
}

//beviteli mezők nullázása
function beviteliMezokNullazasa() {
    inputID.value = "";
    inputNev.value = "";
    inputEmail.value = "";
    inputFelhasznalonev.value = "";
    inputJelszo.value = "";
    inputJelszo2.value = "";
}

//vásárló kiválasztása
async function vasarloKivalasztasa(id) {
    const response = await fetch(`${baseUrl}/selectedCustomer/${id}`);
    const jsonData = await response.json();
    let selectedCustomer = jsonData[0];
    kivalasztottVasarloMegjelenitese(selectedCustomer);
}

//kiválasztott vásárló megjelenítése
function kivalasztottVasarloMegjelenitese(params) {
    inputID.value = params.vasarloid;
    inputNev.value = params.nev;
    inputEmail.value = params.email_cim;
    inputFelhasznalonev.value = params.felhasznalonev;
}

//új felhasználó létrehozása
btnCreate.addEventListener('click', createVasarlo);
async function createVasarlo() {
    let data = {
        nev: inputNev.value,
        email_cim: inputEmail.value,
        felhasznalonev: inputFelhasznalonev.value,
        jelszo: inputJelszo.value
    }
    beviteliMezokNullazasa();
    readAllVasarlo();

    const response = await fetch(`${baseUrl}/createCustomer`, {
        method: "POST",
        header: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result);
}

//vásárló törlése
btnDelete.addEventListener('click', deleteVasarlo);
async function deleteVasarlo() {
    let data = {
        id: inputID.value,
        nev: inputNev.value,
        email_cim: inputEmail.value,
        felhasznalonev: inputFelhasznalonev.value,
    }

    beviteliMezokNullazasa();
    readAllVasarlo();

    const response = await fetch(`${baseUrl}/deleteCustomer`, {
        method: "DELETE",
        header: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);
}

//update
btnUpdate.addEventListener('click', updateVasarlo);
async function updateVasarlo() {
    let data = {
        id: inputID.value,
        nev: inputNev.value,
        email_cim: inputEmail.value,
        felhasznalonev: inputFelhasznalonev.value,
        jelszo: inputJelszo.value
    }

    beviteliMezokNullazasa();
    readAllVasarlo();

    const response = await fetch(`${baseUrl}/updateCustomer`, {
        method: "PUT",
        header: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);
}