const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
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
};

module.exports = accountService;
