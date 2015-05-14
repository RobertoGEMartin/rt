/**
 * Created by Rober on 14/05/15.
 */

//Listing 13.5 A simple TCP server that echoes any data it receives back to the client
var net = require('net');
net.createServer(function (socket) {
    console.log('socket connected!');
    socket.on('data', function (data) {
        console.log('"data" event', data);
    });
    socket.on('end', function () {
        console.log('"end" event');
    });
    socket.on('close', function () {
        console.log('"close" event');
    });
    socket.on('error', function (e) {
        console.log('"error" event', e);
    });
    socket.pipe(socket);
}).listen(1337);