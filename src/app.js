const express = require('express');

const connectDB = require('./config/database');
const User = require('./models/user');

// not best way since server is already listening and what if DB connection fails, it is better to have DB connection before server starts listening
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

// Feed API
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.get('/user', async (req, res) => {
    try {
        const userEmail = req.body.emailId;

        console.log(userEmail);
        const users = await User.find({ emailId: userEmail });

        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Exploring findOne
app.get('/findOne', async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        const user = await User.findOne({ emailId: userEmail });

        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Exploring findById
app.get('/findById', async (req, res) => {
    try {
        const userId = req.body._id;

        console.log(userId);

        // findById(id) is equivalent to findOne({ _id: id })
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
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


