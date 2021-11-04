const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');

const newWriteStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const rl = readline.createInterface({ input: stdin, output:  stdout});

stdout.write(`You can write here (press \'ctrl + c\' to exit): \n`);

const exit = () => {
  rl.close();
  newWriteStream.end();
  stdout.write(`Thanks! \n`);
}

rl.on('line', (input) => {
  if (input.indexOf('exit') === -1) newWriteStream.write(`${input} \n`);
  else exit();
});

rl.on('SIGINT', () => exit());

