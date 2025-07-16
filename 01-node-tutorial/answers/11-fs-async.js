const { writeFile } = require('fs');

console.log('start writing');

// to write (overwrite or create file)
writeFile('./temporary/fileB.txt', 'Line 1: This is the first line\n', (err) => {
  if (err) {
    console.error('Error writing line 1:', err);
    return;
  }
  console.log('Finished writing line 1');

  // second line
  writeFile('./temporary/fileB.txt', 'Line 2: This is the second line\n', { flag: 'a' }, (err) => {
    if (err) {
      console.error('Error writing line 2:', err);
      return;
    }
    console.log('Finished writing line 2');

    // third line
    writeFile('./temporary/fileB.txt', 'Line 3: This is the third line\n', { flag: 'a' }, (err) => {
      if (err) {
        console.error('Error writing line 3:', err);
        return;
      }
      console.log('Finished writing line 3');
      console.log('All writes complete');
    });
  });
});

console.log('end of script');
