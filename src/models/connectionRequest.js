const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    }
},
{
    timestamps: true
});

connectionRequestSchema.index({fromUserId: 1, toUserId:1});

// mongoose middleware
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;

    console.log("HOOK EXECUTED");
    console.log("VALUE OF NEXT:", next);

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection to yourself");
    }

    // next(); // not needed in mongoose 7+?
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;

