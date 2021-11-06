const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');


function createDirectory() {
    fs.stat(pathCopy, (err) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(pathCopy, (err) => {})
        } else {
            fs.rm(pathCopy, {force: true}, (err, files) => {})
        }
    })
}

function copyDirectory() {
    createDirectory()
    fs.readdir(pathFolder, (err, files) => {
        files.forEach(file => {
            fs.copyFile(path.resolve(pathFolder, file), path.resolve(pathCopy, file), (err) => {})
        })
    })
}

copyDirectory()