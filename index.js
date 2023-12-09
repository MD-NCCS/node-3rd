
const express = require('express');
const app = express();
const passwordValidator = require('password-validator');

// Create a schema for password validation
const schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8
  .is().max(20) // Maximum length 20
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits(1) // Must have at least 1 digit
  .has().symbols(1) // Must have at least 1 symbol
  .has().not().spaces(); // Should not have spaces

// Middleware to parse JSON in POST requests
app.use(express.json());

app.get('/', (req, res) =>{
  res.send("To Check your password stength go to (/check-password) route!");
});
// Endpoint to check password strength
app.post('/check-password', (req, res) => {
  const { password } = req.body;

  // Validate password against the schema
  const isValid = schema.validate(password);

  if (isValid) {
    res.status(200).json({ message: 'Password is strong!' });
  } else {
    res.status(400).json({ message: 'Password does not meet requirements.' });
  }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
