const express = require('express');
const fs = require('fs-extra');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Set a file path for demonstration
const filePath = 'file.txt';

// ReadFile route
app.get('/readFile', async (req, res) => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        res.send(fileContent);
    } catch (err) {
        res.status(500).send('Error reading file');
    }
});

// WriteFile route
app.post('/writeFile', async (req, res) => {
    try {
        const { data } = req.body; // Assuming data is passed in the body as { "data": "content" }
        if (!data) {
            return res.status(400).send('No data provided');
        }

        await fs.writeFile(filePath, data, 'utf8');
        res.send('File written successfully');
    } catch (err) {
        res.status(500).send('Error writing file');
    }
});

// UpdateFile route
app.put('/updateFile', async (req, res) => {
    try {
        const { newData } = req.body; // Assuming newData is passed in the body as { "newData": "content" }
        if (!newData) {
            return res.status(400).send('No data provided');
        }

        await fs.appendFile(filePath, newData, 'utf8');
        res.send('File updated successfully');
    } catch (err) {
        res.status(500).send('Error updating file');
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// const express = require('express');
// const app = express();
// const passwordValidator = require('password-validator');

// // Create a schema for password validation
// const schema = new passwordValidator();
// schema
//   .is().min(8) // Minimum length 8
//   .is().max(20) // Maximum length 20
//   .has().uppercase() // Must have uppercase letters
//   .has().lowercase() // Must have lowercase letters
//   .has().digits(1) // Must have at least 1 digit
//   .has().symbols(1) // Must have at least 1 symbol
//   .has().not().spaces(); // Should not have spaces

// // Middleware to parse JSON in POST requests
// app.use(express.json());

// app.get('/', (req, res) =>{
//   res.send("To Check your password stength go to (/check-password) route!");
// });
// // Endpoint to check password strength
// app.post('/check-password', (req, res) => {
//   const { password } = req.body;

//   // Validate password against the schema
//   const isValid = schema.validate(password);

//   if (isValid) {
//     res.status(200).json({ message: 'Password is strong!' });
//   } else {
//     res.status(400).json({ message: 'Password does not meet requirements.' });
//   }
// });


// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
