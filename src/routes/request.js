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

module.exports = requestRouter;