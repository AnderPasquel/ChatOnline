var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000
var io = require('socket.io')(server);

//REQUIRE EMOJIS LIST MODULE
var emojis = require("emojis-list")

app.get('/test', function (req, res) {
    res.status(200).send('TestServer');
});

app.use(express.static('public'));

server.listen(port, function () {
    console.log('La aplicacion esta correinde en el puerto ' + port);
});

var messages = [{
    id: 1,
    text: 'Bienvenido',
    nickname: 'Herraminta de chat'
}];

io.on('connection', function (socket) {
    console.log("El dispositivo con ip:" + socket.handshake.address + "se ha conectado");
    socket.emit('messages', messages);
    socket.on('add-Message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*//LOG THE TOTAL LENGTH OF OUR ARRAY
console.log("There are " + emojis.length + " emojis");
//LOG THE FIRST THIRTY EMOJIS
for (var i = 0; i < 800; i++) {
    console.log(i + 1 + ". " + emojis[i]);
}*/
