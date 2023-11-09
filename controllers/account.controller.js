const accountService = require("../services/account.services");
const { StatusCodes } = require("http-status-codes");
const accountController = {
    // signup
    signupAccount: async (req, res) => {
        const { name, email, password, avatarLink, isAdmin } = req.body;
        try {
            console.log("controller here");
            const user = await accountService.signup(
                name,
                email,
                password,
                avatarLink,
                isAdmin
            );
            res.status(StatusCodes.CREATED).json({ user });
            } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    },
    // login
    loginAccount: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await accountService.login(email, password);
            res.status(StatusCodes.OK).json({ user });
            } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    },
};

module.exports = accountController;
