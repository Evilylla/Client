const path = require('path');
const https = require('https');
const httpsLocalhost = require("https-localhost")()
const app = require('express')();


const PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/form', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'script.js'));
});

app.get('/database.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'database.js'));
});

app.get('/stylesheets/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'stylesheets', 'style.css'));
});

app.get('/stylesheets/form.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'stylesheets', 'form.css'));
});
  
const start = async () => {
    const certs = await httpsLocalhost.getCerts()
    const server = https.createServer(certs, app);
    server.listen(PORT, function() {
        console.log('Server started on port ' + PORT);
    });
}

start();
