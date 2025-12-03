const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email");
            }
        }
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
        default: "https://www.kindpng.com/imgv/bmmTxJ_student-png-sammilani-mahavidyalaya-undergraduate-and-dummy-user/",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("invalid photo url");
            }
        }
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

userSchema.methods.getJWT = async function() {
    const user = this;

    // Create a JWT token
    const token = await jwt.sign({_id: user._id}, "DEVTINDER@10", {expiresIn: '7d'});

    return token
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;