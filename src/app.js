const express = require('express');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./utils/validation');
const connectDB = require('./config/database');
const User = require('./models/user');
const salt = 10;

// not best way since server is already listening and what if DB connection fails, it is better to have DB connection before server starts listening
// require('./config/database');

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash
        });

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

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoURL", "gender", "about", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
        
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate({_id: userId}, data,
            {
                returnDocument: "after",
                runValidators: true
            });

        console.log(user);

        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
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

        // findById(id) is equivalent to findOne({ _id: id })
        const user = await User.findById(userId);
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


