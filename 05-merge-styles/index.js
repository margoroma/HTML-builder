const fs = require('fs');
const path = require('path');
const pathMergedFiles = path.join(__dirname, 'styles/');
const pathProject = path.join(__dirname, 'project-dist/');
let newWriteStream = fs.createWriteStream(path.join(pathProject, '/bundle.css'));

function mergeFiles() {
    fs.readdir(pathMergedFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            const ext = path.extname(file).slice(1);
            if (ext === 'css') {
                let newReadStream = fs.createReadStream(`${pathMergedFiles}${file}`, "utf8");
                newReadStream.pipe(newWriteStream);
            }
        });
    });
};
mergeFiles();