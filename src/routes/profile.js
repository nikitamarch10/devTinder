const express = require('express');
const {userAuth} = require('../middlewares/auth');
const {validateEditData, validatePassword} = require('../utils/validation');
const validator = require('validator');
const bcrypt = require('bcrypt');

const profileRouter = express.Router();

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        const isEditRestricted = validateEditData(req);
        if (isEditRestricted) {
            throw new Error("Edit not permitted");
        }

        const currentUserData = req.user;
        
        Object.assign(currentUserData, req.body);

        await currentUserData.save();

        res.json({
            message: `${currentUserData.firstName}, your edit was saved successfully`,
            data: currentUserData
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        // take existing , new password
        const user = req.user;

        const newPassword = req.body?.newPassword;

        // validate current user password
        const isPasswordValid = validatePassword(req);

        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        // for new password if strong enough then save
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Enter a strong password");
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        Object.assign(user, {password: newPasswordHash});
        // user.password = newPassword;

        await user.save();

        res.send("Password updated successfully");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;