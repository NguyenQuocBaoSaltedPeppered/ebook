const mongoose = require("mongoose");

const { Schema } = mongoose;

const account = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    avatarLink: {
        type: String,
        required: true,
        default:
        "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/reader_acrobat_adobe_rss_news_google_feed-512.png",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Account", account);
