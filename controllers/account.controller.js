const accountService = require("../services/account.services");
const { StatusCodes } = require("http-status-codes");
const accountController = {
    // signup
    signupAccount: async (req, res) => {
        const { name, email, password, avatarLink, isAdmin } = req.body;
        try {
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
    userDetail: async (req, res) => {
        const accountId = req.params.accountId;
        try {
            const userInfo = await accountService.userDetail(accountId);
            res.status(StatusCodes.OK).json({ userInfo });
        } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    },
    updateUsernameAndEmail: async (req, res) => {
        const { username, email } = req.body;
        const { accountId } = req.params;
        try {
            const user = await accountService.updateUsernameAndEmail(accountId, username, email);
            res.status(StatusCodes.OK).json({ user });
        } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    },
    updatePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const { accountId } = req.params;
        try {
            const user = await accountService.updatePassword(accountId, oldPassword, newPassword);
            res.status(StatusCodes.OK).json({ user });
        } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    },
    updateUserInfo: async (req, res) => {
        const { email, name, avatarLink } = req.body;
        const accountId = req.params.accountId;
        try {
            const userInfo = await accountService.updateUserInfo(email, name, avatarLink, accountId);
            res.status(StatusCodes.OK).json({userInfo});
        } catch (error) {
            res.status(error.code).json({ error: error.message });
        }
    }
};

module.exports = accountController;
