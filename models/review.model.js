const mongoose = require("mongoose");
const { Schema } = mongoose;

const review = new Schema(
  {
    noiDungCotTruyen: {
      type: Number,
    },
    boCucTheGioi: {
      type: Number,
    },
    tinhCachNhanVat: {
      type: Number,
    },
    content: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus at urna. Arcu dictum varius duis at consectetur lorem donec massa sapien. Purus viverra accumsan in nisl nisi scelerisque eu. Vitae purus faucibus ornare suspendisse sed nisi.",
    },
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", review);
