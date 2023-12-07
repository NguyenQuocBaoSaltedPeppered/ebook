const Novel = require("../models/novel.model");
const Chapter = require("../models/chapter.model");
const Comment = require("../models/comment.model");
const utility = require("./utility.services");
const mongoose = require("mongoose");

const chapterService = {
  newChapter: async (title, content, novelId) => {
    if (!title || !content || !novelId) {
      const error = utility.createError(400, "All field must be filled");
      throw error;
    }
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isNovelExisted = await Novel.findById(novelId);
    if (!isNovelExisted) {
      const error = utility.createError(404, "Novel is not exist");
      throw error;
    }
    const index = (await Chapter.find({ novelId: novelId }).count()) + 1;
    try {
      const newChapter = await Chapter.create({
        title,
        content,
        novelId,
        index,
      });
      return newChapter;
    } catch (error) {
      console.log(error);
    }
  },
  getChapter: async (chapterId) => {
    if (!chapterId) {
      const error = utility.createError(400, "ChapterId field must be filled");
      throw error;
    }
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      const error = utility.createError(404, "Chapter is not exist");
      throw error;
    }
    try {
      const prev = await Chapter.findOne(
        { novelId: chapter.novelId, index: chapter.index - 1 },
        { _id: 1 }
      );
      const next = await Chapter.findOne(
        { novelId: chapter.novelId, index: chapter.index + 1 },
        { _id: 1 }
      );
      const commentList = await Comment.aggregate([
        {
          $match: {
            chapterId: utility.castId(chapterId),
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountId",
            foreignField: "_id",
            as: "postedBy",
          },
        },
        {
          $unwind: {
            path: "$postedBy",
          },
        },
        {
          $project: {
            _id: 1,
            content: 1,
            createdAt: 1,
            "postedBy._id": 1,
            "postedBy.name": 1,
          },
        },
      ]);
      return { chapter, prev, next, commentList };
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = chapterService;
