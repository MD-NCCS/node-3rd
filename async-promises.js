const fs = require('fs');
const readline = require('readline');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function writeFile(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      console.log('Write operation started...');
      fs.writeFile('file.txt', data, (err) => {
        if (err) reject(err);
        resolve('File written successfully!');
      });
    } else {
      resolve('No data provided for writing. Skipping...');
    }
  });
}

function updateFile(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      console.log('Update operation started...');
      fs.appendFile('file.txt', '\n' + data, (err) => {
        if (err) reject(err);
        resolve('File updated successfully!');
      });
    } else {
      resolve('No data provided for update. Skipping...');
    }
  });
}

function getUserInput(timeout) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      rl.close();
      resolve('');
    }, timeout);

    rl.question('', (input) => {
      clearTimeout(timer);
      rl.close();
      resolve(input.trim());
    });
  });
}

console.log('Starting file operation...');

readFile()
  .then((fileData) => {
    console.log('Current content of file:');
    console.log(fileData || 'File is empty.');

    setTimeout(() => {
      console.log('Starting write operation...');
      getUserInput(4000)
        .then((writeData) => {
          if (writeData) {
            return writeFile(writeData);
          } else {
            console.log('No data entered for write operation.');
            return Promise.resolve('Skipping write operation...');
          }
        })
        .then((writeResult) => {
          console.log(writeResult);
          console.log('Write operation stopped.');

          console.log('Starting update operation...');
          return Promise.race([
            new Promise((resolve) => setTimeout(resolve, 5000)),
            getUserInput(5000)
          ]);
        })
        .then((updateData) => {
          if (updateData) {
            return updateFile(updateData);
          } else {
            console.log('No data entered for update operation.');
            console.log('Exiting the program...');
            process.exit();
          }
        })
        .then((updateResult) => {
          console.log(updateResult);
          console.log('File operations completed.');
          process.exit();
        })
        .catch((err) => {
          console.error('Error:', err);
          process.exit();
        });
    }, 1000); // Adjust delay time after reading the file if needed
  })
  .catch((err) => {
    console.error('Error reading file:', err);
  });
