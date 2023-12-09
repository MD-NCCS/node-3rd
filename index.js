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
