const express = require('express');
const {userAuth} = require('../middlewares/auth');

const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest', userAuth, async(req, res) => {
    try {
        const user = req.user;
    
        console.log("Sending connection request");

        res.send(user.firstName + " sent connection request");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;