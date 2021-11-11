const fs = require('fs/promises');
const path = require('path');
const pathFolder = path.join(__dirname, 'files'); 
const pathCopy = path.join(__dirname, 'files-copy'); 


async function copyFolder(srcFrom, scrTo) {
    await fs.rm(scrTo, {
        recursive: true,
        force: true
    })
    await fs.mkdir(scrTo, {
        recursive: true
    });

    let allData = await fs.readdir(srcFrom, {
        withFileTypes: true
    });

    for (let adata of allData) {
        let srcPath = path.resolve(srcFrom, adata.name);
        let scrToPath = path.resolve(scrTo, adata.name);
        adata.isDirectory() ? await copyFolder(srcPath, scrToPath) : await fs.copyFile(srcPath, scrToPath);
    }
}

copyFolder(pathFolder, pathCopy);