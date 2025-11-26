const express = require('express');

const connectDB = require('./config/database');
const User = require('./models/user');

// not best way since server is already listening and what if DB connection fails, 
// it is better to have DB connection before server starts listening
// require('./config/database');

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const userObj = req.body;
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(7777, () => {
            console.log("Server is listening on port 7777");
        });
    })
    .catch((err) => {
        console.error("Database connection failed");
    });


