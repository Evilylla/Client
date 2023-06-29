const https = require('http');
const httpsLocalhost = require("https-localhost")();
const path = require('path');

const bodyParser = require('body-parser')

const Database = require('./database');

const express = require('express');

const app = require('express')();
app.use(express.static(path.join(__dirname, '..', 'public', 'img')));
app.use(express.static(path.join(__dirname, '..', 'public', 'product')));
app.use(express.static(path.join(__dirname, '..', 'public', 'stylesheets')));

const router = require('./routes');

require('dotenv')
    .config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

const start = async () => {
    const certs = await httpsLocalhost.getCerts()
    const server = https.createServer(certs, app);
    server.listen(process.env.PORT, function() {
        console.log('Server started on port ' + process.env.PORT);
    });

    const database = new Database();
    await database.authenticate();
}

start()
    .then();
