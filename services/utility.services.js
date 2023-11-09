const mongoose = require("mongoose");

const utility = {
    castId: (id) => new mongoose.Types.ObjectId(id),

    createError: (statusCode, msg) => {
        const error = new Error(msg);
        error.code = statusCode;
        return error;
    },
};
module.exports = utility;
