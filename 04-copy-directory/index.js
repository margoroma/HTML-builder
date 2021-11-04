const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');

function copyDirectory() {
    fs.stat(pathCopy, function(err) {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(pathCopy, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        fs.readdir(pathFolder, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                fs.copyFile(path.join(pathFolder, file), path.join(pathCopy, file), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
            console.log('Directory is copied');
        });
    });
}

copyDirectory();