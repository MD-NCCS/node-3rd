const fs = require('fs');
const readline = require('readline');

function readFile(callback) {
  fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) callback(err, null);
    else callback(null, data);
  });
}

function writeFile(data, callback) {
  if (data) {
    console.log('Write operation started...');
    fs.writeFile('file.txt', data, (err) => {
      if (err) callback(err);
      else callback(null, 'File written successfully!');
    });
  } else {
    callback(null, 'No data provided for writing. Skipping...');
  }
}

function updateFile(data, callback) {
  if (data) {
    console.log('Update operation started...');
    fs.appendFile('file.txt', '\n' + data, (err) => {
      if (err) callback(err);
      else callback(null, 'File updated successfully!');
    });
  } else {
    callback(null, 'No data provided for update. Skipping...');
  }
}

function getUserInput(timeout, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const timer = setTimeout(() => {
    rl.close();
    callback(null, '');
  }, timeout);

  rl.question('', (input) => {
    clearTimeout(timer);
    rl.close();
    callback(null, input.trim());
  });
}

console.log('Starting file operation...');

readFile((err, fileData) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log('Current content of file:');
  console.log(fileData || 'File is empty.');

  setTimeout(() => {
    console.log('Starting write operation...');
    getUserInput(4000, (inputErr, writeData) => {
      if (inputErr) {
        console.error('Error getting user input:', inputErr);
        return;
      }

      if (writeData) {
        writeFile(writeData, (writeErr, writeResult) => {
          if (writeErr) {
            console.error('Error writing file:', writeErr);
            return;
          }

          console.log(writeResult);
          console.log('Write operation stopped.');

          console.log('Starting update operation...');
          updateFile(writeResult, (updateErr, updateResult) => {
            if (updateErr) {
              console.error('Error updating file:', updateErr);
              return;
            }

            console.log(updateResult);
            console.log('File operations completed.');
          });
        });
      } else {
        console.log('No data entered for write operation.');
        console.log('Skipping write operation...');

        console.log('Starting update operation...');
        getUserInput(5000, (updateInputErr, updateData) => {
          if (updateInputErr) {
            console.error('Error getting user input for update:', updateInputErr);
            return;
          }

          if (updateData) {
            updateFile(updateData, (updateErr, updateResult) => {
              if (updateErr) {
                console.error('Error updating file:', updateErr);
                return;
              }

              console.log(updateResult);
              console.log('File operations completed.');
            });
          } else {
            console.log('No data entered for update operation.');
            console.log('Exiting the program...');
          }
        });
      }
    });
  }, 1000); // Adjust delay time after reading the file if needed
});
