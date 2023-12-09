const fs = require('fs');

function readFileWithTimeout(filePath, timeout) {
  const filePromise = fs.promises.readFile(filePath, 'utf8');
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('File reading timed out'));
    }, timeout);
  });

  return Promise.race([filePromise, timeoutPromise]);
}

// Usage
const filePath = 'file.txt';
const timeoutDuration = 5000; // Timeout duration in milliseconds

readFileWithTimeout(filePath, timeoutDuration)
  .then((fileContent) => {
    console.log('File content:', fileContent);
    // Do something with the file content
  })
  .catch((error) => {
    console.error('Error reading file:', error);
    // Handle errors, including timeout error
    if (error.message === 'File reading timed out') {
      console.error('Operation timed out. Exiting...');
      process.exit(1); // Terminate the Node.js process with an error code
    }
  });


