const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

//adatbázis kapcsolat
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'konyvesbolt2'
});
connection.connect();

//végpontok
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend/index.html'));
})

//vásárlók beolvasása
app.get('/vasarlok/readAll', (req, res) => {
    let sql = "SELECT `vasarloid`, `nev`, `email_cim`, `felhasznalonev` FROM `vasarlo";
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log("A beolvasás sikertelen");
            throw err;
        }
        else {
            res.status(200).json(rows);
        }
    })
});

//vásárló hozzáadása
app.get('/vasarlok/createCustomer', (req, res) => {
    let nev = req.body.nev;
    let email = req.body.email_cim;
    let felhasz = req.body.felhasznalonev;
    let jelszo = req.body.jelszo;
    let sql = `INSERT INTO vasarlo SET (null, ${nev}, ${email}, ${felhasz}, ${jelszo})`;
    connection.query(sql, (err) => {
        if (err) {
            console.log("Sikertelen hozzáadás");
            throw err;
        }
        else {
            console.log("Sikeres hozzáadás!");
            res.status(200).json("Sikeres hozzáadás!");
        }
    })
});