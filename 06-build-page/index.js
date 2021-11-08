const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'assets');
const trgPath = path.join(__dirname, 'project-dist');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {});

const copy = async (srcPath, trgPath) => {
  await fs.mkdir(trgPath, {recursive: true}, () => {});
  fs.readdir(srcPath, {withFileTypes: true}, (err, files) => {

    if (err) throw err;
    files.forEach((file) => {

      let origPath = path.join(srcPath, file.name);
      let newPath = path.join(trgPath, file.name);

      if(file.isDirectory()) {
        copy(origPath, newPath);
      } 
      else {
        fs.copyFile(origPath, newPath,() => {});
      }
    });
  });
};

const copyFolder = async (srcPath, trgPath) => {
  await fs.mkdir(trgPath, {recursive: true}, () => {});
  const newFolder = path.join(trgPath, 'assets');
  await copy(srcPath, newFolder);
};

copyFolder(srcPath, trgPath);

const styles = fs.createWriteStream('./06-build-page/project-dist/style.css', 'utf-8');

fs.readdir(path.join(__dirname, 'styles'),{ withFileTypes: true }, (err, files) => {
  if (err) throw err;
    
  files.forEach(file =>{
    fs.stat(path.join(__dirname, 'styles', file.name), (err, stats) => {
      if (err) throw err;
        
      if (stats.isFile() && path.extname(file.name) === '.css'){
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name));
        input.on('data', partData => styles.write(partData + '\n'));
      }
    });
  });
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => { 
  if (err) throw err;

  const re = /{{(.*)}}/;
  let template = data;
  let tags = template.match(re);
  let tagName = tags[1];  

  clearTags(); 

  function clearTags() {
    fs.readFile(path.join(__dirname, 'components', `${tagName}.html`), 'utf-8', (err, el) => {
      if (err) throw err;
      if (!el) {
        template = template.replace(re, '');
      } 
      else {
        template = template.replace(re, el);
      }
  
      tags = template.match(re);
  
      if (tags === null) {
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, () => {});
      } 
      else {
        tagName = tags[1];
        clearTags();
      }
    });      
  }
});