//Listing 13.3 Express/Socket.IO server that triggers events on file change
var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var root = __dirname;

//Use middleware to begin wathcing ifles returned by static middleware
app.use(function (req, res, next) {
    //Register static event emitted by static() middleware component
    req.on('static', function () {
        var file = url.parse(req.url).pathname;
        var mode = 'stylesheet';
        if (file[file.length - 1] == '/') {
            file += 'index.html';
            mode = 'reload';
        }
        //Determine filename served and call createWatcher()
        createWatcher(file, mode);
    });
    next(); });

//Set up server as basic static file server
app.use(express.static(root));

//Keep list of active files being watched
var watchers = {};

function createWatcher (file, event) {
    var absolute = path.join(root, file);
    if (watchers[absolute]) {
        return;
    }
    //Begin watching file for any change
    fs.watchFile(absolute, function (curr, prev) {
        //Check if mtime(last modified time)changed; if so, fire Socket.IO event
        if (curr.mtime !== prev.mtime) {
            io.sockets.emit(event, file);
        }
    });
    //Mark file as being watched
    watchers[absolute] = true;
}
server.listen(3000);