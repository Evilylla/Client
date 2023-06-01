const path = require("path");

const { Router } = require('express');

const DataBase = require('./database');

const router = Router();

router.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


router.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'img', 'steam.jpg'));
});

router.get('/form', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

router.get('/formlogin', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'formlogin.html'));
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
    const { u_login, u_password, tg_uid} = req.body;
    
    await database.sendQuery(
        `INSERT INTO "schema_shop"."table_user" ("u_login", "u_password", "tg_uid") VALUES ('${u_login}', '${u_password}','${tg_uid}')`
    );

    res.redirect('/');
})

router.post('/check-form', async (req, res) => {
    const database = await new DataBase();
    const { u_login, u_password, tg_uid} = req.body;

    const dbuser = await database.sendQuery(
        `SELECT * FROM "schema_shop"."table_user" WHERE "u_login" = '${u_login}'`
    )

    console.log(dbuser);
    res.redirect('/');
    
})

module.exports = router;