/**
 * Created by Rober on 14/05/15.
 */
//A move() function that renames, if possible, or falls back to copying

var fs = require('fs');

module.exports = function move (oldPath, newPath, callback) {
    //    Call fs.rename() and hope it works
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            //    Fall back to copy technique if EXDEV error

            if (err.code === 'EXDEV') {
                copy();
            } else {
                //￼￼Fail and report to caller if any other kind of error
                callback(err);
            }
            return;
        }
        //If fs.rename() worked, you’re done
        callback();
    });

    function copy () {
        //Reads original file and pipes it to the destination path
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);
        readStream.on('error', callback);
        writeStream.on('error', callback);
        readStream.on('close', function () {
            //Unlink (delete) original file once copy is done
            fs.unlink(oldPath, callback);
        });
        readStream.pipe(writeStream);
    }
}