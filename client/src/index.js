const path = require('path');
const https = require('https');
const httpsLocalhost = require("https-localhost")()
const app = require('express')();


const PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const start = async () => {
    const certs = await httpsLocalhost.getCerts()
    const server = https.createServer(certs, app);
    server.listen(PORT, function() {
        console.log('Server started on port ' + PORT);
    });
}

start();
