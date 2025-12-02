const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("invalid gender");
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.kindpng.com/imgv/bmmTxJ_student-png-sammilani-mahavidyalaya-undergraduate-and-dummy-user/"
    },
    about: {
        type: String,
        default: "This is default about of the user"
    },
    skills: {
        type: [String],
        validate: {
            validator: function(arr) {
                return arr.length <= 10;
            },
            message: 'Skills cannot exceed 10 items'
        }
    }
}, 
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;