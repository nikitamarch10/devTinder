const validator = require('validator');
const bcrypt = require('bcrypt');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validateEditData = (req) => {
    const excludeEdits = ["password"];

    const isEditRestricted = Object.keys(req.body).some((field) => {
        console.log(field);
        return excludeEdits.includes(field)});

    // console.log(Object.keys(req.body));
    console.log(isEditRestricted);
    
    return isEditRestricted;
};

const validatePassword = async (req) => {
    const user = req.user; // attached by userAuth
    const currentPassword = req.body?.password;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(currentPassword, passwordHash);

    return isPasswordValid;
};

module.exports = {
    validateSignUpData,
    validateEditData,
    validatePassword
};