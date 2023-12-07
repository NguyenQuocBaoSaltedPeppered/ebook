const Chapter = require("../models/chapter.model");
const Comment = require("../models/comment.model");
const Account = require("../models/account.model");
const mongoose = require("mongoose");
const utility = require("./utility.services");

const commentService = {
  newComment: async (content, chapterId, accountId) => {
    if (!content || !chapterId || !accountId) {
      const error = utility.createError(400, "All field must be filled");
      throw error;
    }
    if (
      !mongoose.Types.ObjectId.isValid(accountId) ||
      !mongoose.Types.ObjectId.isValid(chapterId)
    ) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isChapterExisted = await Chapter.findById(chapterId);
    if (!isChapterExisted) {
      const error = utility.createError(404, "Chapter is not exist");
      throw error;
    }
    const isAccountExisted = await Account.findById(accountId);
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    const isCommentExisted = await Comment.findOne({
      chapterId: chapterId,
      accountId: accountId,
    });
    if (isCommentExisted) {
      const error = utility.createError(303, "Comment is already exist");
      throw error;
    }
    try {
      const newComment = await Comment.create({
        content,
        chapterId,
        accountId,
      });
      return newComment;
    } catch (error) {
      console.log(error);
    }
  },

  commentOfANovel: async (novelId) => {
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    try {
      const commentList = await Comment.aggregate([
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "_id",
            as: "chapterInfo",
          },
        },
        {
          $unwind: {
            path: "$chapterInfo",
          },
        },
        {
          $match: {
            "chapterInfo.novelId": utility.castId(novelId),
          },
        },
        {
          $limit: 10,
        },
      ]);
      return commentList;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentService;
