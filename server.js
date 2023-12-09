const express = require('express');
const app = express();
const port = 3000;

// Route for handling GET requests at the root URL "/"
app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});

// Route for handling GET requests at "/about"
app.get('/about', (req, res) => {
  res.send('About page: Learn more about us!');
});


app.get('/contact', (req, res)=>{
 res.send("This is contact Page!");
});




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
