const fs = require('fs');
const dir = './temporary';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const { readFileSync, writeFileSync } = require('fs')
const path = require('path');

console.log('start:')

// first line (overwrite or create)
writeFileSync('./temporary/fileA.txt', 'Line 1: This is the first line\n');

// second and third lines
writeFileSync('./temporary/fileA.txt', 'Line 2: This is the second line\n', { flag: 'a' });
writeFileSync('./temporary/fileA.txt', 'Line 3: This is the third line\n', { flag: 'a' });

// Reading the file contents synchronously
const content = readFileSync('./temporary/fileA.txt', 'utf8');

console.log('File contents:');
console.log(content);

console.log('done with this task');
