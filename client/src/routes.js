const path = require("path");

const { Router } = require('express');

const DataBase = require('./database');

const router = Router();

router.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/form', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

router.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'script.js'));
});

router.get('/database.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'database.js'));
});

router.get('/stylesheets/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'stylesheets', 'style.css'));
});

router.get('/stylesheets/form.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'stylesheets', 'form.css'));
});

router.post('/send-form', async (req, res) => {
    const database = await new DataBase();
    const { fname, sname, street, postal_code, tg_uid } = req.body;

    await database.sendQuery(
        `INSERT INTO "usertable" ("fname", "sname", "street", "postal_code", "tg_uid") VALUES (${fname}, ${sname}, ${street}, ${postal_code}, ${tg_uid})`
    );

    res.redirect('/');
})

module.exports = router;