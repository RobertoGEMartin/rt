/**
 * Created by Rober on 14/05/15.
 */
//A basic replica of the netcat(1) command implemented using Node
var net = require('net');
//Parse host and port from command-line arguments
var host = process.argv[2];
var port = Number(process.argv[3]);

//Create socket instance and begin connecting to server
var socket = net.connect(port, host);

//Handle connect event when a connection to server is established
socket.on('connect', function () {
    process.stdin.pipe(socket);
    socket.pipe(process.stdout);
    //Call resume() on stdin to begin reading data
    process.stdin.resume();
});

//Pause stdin when end event happens
socket.on('end', function () {
    process.stdin.pause();
});
