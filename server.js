const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const mongoURI = 'your-mongodb-connection-string';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('registration');
        const usersCollection = database.collection('users');

        const { username, email, password } = req.body;

        const newUser = {
            username,
            email,
            password,
        };

        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'Registration successful', insertedId: result.insertedId });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
