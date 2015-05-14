/**
 * Created by Rober on 14/05/15.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    //Broadcast a message to connected users when someone connects
    socket.broadcast.emit('chat message','New User Connected');

    //Broadcast a message to connected users when someone disconnects
    socket.on('disconnect', function(){
        socket.broadcast.emit('chat message','User Disconnected');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});