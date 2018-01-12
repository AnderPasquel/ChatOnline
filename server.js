var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000
var io = require('socket.io')(server);

app.get('/test', function (req, res) {
    res.status(200).send('TestServer');
});

app.use(express.static('public'));

server.listen(port, function () {
  console.log('La aplicacion esta correinde en el puerto ' + port);
});

var messages = [{
    id:1,
    text:'Bienvenido',
    nickname:'CHAT--BOT'
}];

io.on('connection', function (socket) {
    console.log("El dispositivo con ip:" + socket.handshake.address + "se ha conectado");

    socket.emit('messages', messages);

    socket.on('add-Message', function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});
