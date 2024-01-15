const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Here, you can store the user information in a database or perform any other desired action.
    console.log(`User registered: ${username}, ${email}, ${password}`);
    res.send('Registration successful!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
