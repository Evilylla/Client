const app = require('express')();
const http = require('http').Server(app);

const PORT = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
http.listen(PORT, function(){
    console.log('HTTP server started on port ' + PORT);
});