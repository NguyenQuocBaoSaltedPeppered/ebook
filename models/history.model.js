const mongoose = require("mongoose");
const { Schema } = mongoose;

const history = new Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", history);
