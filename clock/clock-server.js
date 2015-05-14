/**
 * Created by Rober on 13/05/15.
 */

// A Socket.IO server that updates its clients with the time
var app = require('http').createServer(handler);
//Upgrade regular http sever to Socket.io server
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

//HTTP server code always server index.html file
function handler (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
    res.end(html);
}

//Get UTC representation of current time
function tick () {
    var now = new Date().toUTCString();
    //Send tiem to all connected sockets
    io.sockets.send(now);
}
//run tick function once per second
setInterval(tick, 1000);

app.listen(8080);