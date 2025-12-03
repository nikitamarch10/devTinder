const express = require('express');
const User = require('../models/user');
const {validateSignUpData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const salt = 10;

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
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

authRouter.post('/login', async (req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if (!user) {
            // Changed error messages to generic "Invalid credentials" (security best practice - don't reveal if user exists or password is wrong)
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = await user.getJWT();

        // Add the token to cookie and send the response back to the user
        res.cookie("token", token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}); //7d
        res.send("Login successful");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = authRouter;