const fs = require('fs').promises;

const readFile = async () => {
  try {
    const data = await fs.readFile('./sampleweek2.txt', 'utf8');
    console.log('File contents:', data);
  } catch (err) {
    console.log('An error occurred:', err.message);
  }
};

readFile();

