const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth');

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Inavlid status: " + status});
        }

        // toUserId exists?
        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).json({message: "User not found"});
        }

        // existing connection?
        const existingConnection = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if (existingConnection) {
            return res.status(400).json({message: `Connection requestion already exists`});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, 
            toUserId, 
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: `${req.user.firstName}, sent request successfully`,
            data 
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

requestRouter.post('/request/receive/:status/:requestId', userAuth, async (req, res) => {
    try {
        const {status, requestId} = req.params;
        const loggedInUser = req.user;

        // Akshay -> elon
        // elon can accept / reject the request
        // loggedInUser should be elon
        // requestId = should be akshay
        // status -> accepted, rejected

        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Invalid status: " + status});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });

        if (!connectionRequest) {
            return res.status(404).json({message: "Connection request not found"});
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request: " + status, data});
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;