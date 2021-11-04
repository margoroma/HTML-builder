const fs = require('fs');
const path = require('path'); 

let newReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

newReadStream.on('data', function(chunk) {
    console.log(chunk);
});