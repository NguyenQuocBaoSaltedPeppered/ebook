const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookmark = new Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: true,
  },
  novelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Novel",
    require: true,
  },
});

module.exports = mongoose.model("Bookmark", bookmark);
