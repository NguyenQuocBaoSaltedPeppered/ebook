const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const utility = require("./utility.services");

const accountService = {
    //signup
    signup: async (name, email, password, avatarLink, isAdmin) => {
        console.log("service here");
        if (!email || !password || !name) {
            const error = utility.createError(400, "All field must be filled");
            throw error;
        }
        if (!validator.isEmail(email)) {
            const error = utility.createError(400, "Email is not valid");
            throw error;
        }
        // if (!validator.isStrongPassword(password)) {
        //     const error = utility.createError(400, "Password is not strong enough!");
        //     throw error;
        // }
        const isEmailExisted = await Account.findOne({ email: email });

        if (isEmailExisted) {
            const error = utility.createError(303, "Email already in use");
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const newAccount = await Account.create({
                name,
                email,
                password: hash,
                avatarLink,
                isAdmin,
            });
            return newAccount;
        } catch (error) {
            console.log(error);
        }
    },

    //login
    login: async (email, password) => {
        if (!email || !password) {
            const error = utility.createError(400, "All field must be filled");
            throw error;
        }
        const acc = await Account.findOne({ email: email });
        if (!acc) {
            const error = utility.createError(400, "Incorrect Email!");
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(password, acc.password);
        if (!isPasswordMatch) {
            const error = utility.createError(400, "Password is incorrect!");
            throw error;
        }
        return acc;
    },
    userDetail: async (accountId) => {
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            const error = utility.createError(400, "Id is not valid");
            throw error;
        }
        const isAccountExisted = await Account
            .findOne({ _id: utility.castId(accountId) })
            .select({
                "name": 1,
                "email": 1,
                "avatarLink": 1,
            });
        if (!isAccountExisted) {
            const error = utility.createError(404, "Account is not exist");
            throw error;
        }
        return isAccountExisted;
    },
    // Update username or email
    updateUsernameAndEmail: async (accountId, username, email) => {
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            const error = utility.createError(400, "Id is not valid");
            throw error;
        }
        const isAccountExisted = await Account.findById(accountId);
        if (!isAccountExisted) {
            const error = utility.createError(404, "Account is not exist");
            throw error;
        }
        if (!username && !email)
        {
            const error = utility.createError(400, "All the updated fields is empty");
            throw error;
        }
        if (username)
        {
            const isUsername = await Account.findOne({name: username});
            if (isUsername)
            {
                const error = utility.createError(400, "New username is already existed");
                throw error;
            }
            isAccountExisted.name = username;
        }
        if (email)
        {
            if (!validator.isEmail(email))
            {
                const error = utility.createError(400, "Email is not valid");
                throw error;
            }
            else
            {
                isAccountExisted.email = email;
            }
        }
        await isAccountExisted.save();
        return isAccountExisted;
    },
    // change password
    updatePassword: async (accountId, oldPassword, newPassword) => {
        console.log(accountId, oldPassword, newPassword);
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            const error = utility.createError(400, "Id is not valid");
            throw error;
        }
        if (!oldPassword && !newPassword)
        {
            const error = utility.createError(400, "Missing old or new password");
            throw error;
        }
        const isAccountExisted = await Account.findById(accountId);
        if (!isAccountExisted) {
            const error = utility.createError(404, "Account is not exist");
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, isAccountExisted.password);
        if (!isPasswordMatch) {
            const error = utility.createError(400, "Old Password is incorrect!");
            throw error;
        }
        // Mã hoá và lưu lại mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        isAccountExisted.password = hash;
        await isAccountExisted.save();
        return isAccountExisted;
    }
};

module.exports = accountService;
