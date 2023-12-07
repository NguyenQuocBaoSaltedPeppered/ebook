const History = require("../models/history.model");
const Account = require("../models/account.model");
const Chapter = require("../models/chapter.model");
const Novel = require("../models/novel.model");
const mongoose = require("mongoose");
const utility = require("./utility.services");

const historyService = {
  createHistory: async (chapterId, accountId, novelId) => {
    if (!chapterId | !accountId || !novelId) {
      const error = utility.createError(400, "All field must be filled");
      throw error;
    }
    if (
      !mongoose.Types.ObjectId.isValid(chapterId) ||
      !mongoose.Types.ObjectId.isValid(accountId) ||
      !mongoose.Types.ObjectId.isValid(novelId)
    ) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isAccountExisted = await Account.findById(accountId);
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    const isNovelExisted = await Novel.findById(novelId);
    if (!isNovelExisted) {
      const error = utility.createError(404, "Novel is not exist");
      throw error;
    }
    const isChapterExisted = await Chapter.findById(chapterId);
    if (!isChapterExisted) {
      const error = utility.createError(404, "Chapter is not exist");
      throw error;
    }
    const isHistoryExisted = await History.findOne({
      chapterId: chapterId,
      accountId: accountId,
      novelId: novelId,
    });
    if (isHistoryExisted) return isHistoryExisted;
    const findHistory = await History.findOne({
      accountId: accountId,
      novelId: novelId,
    });
    if (findHistory) {
      findHistory.chapterId = chapterId;
      await findHistory.save();
      return findHistory;
    }
    const newHistory = await History.create({
      chapterId: chapterId,
      accountId: accountId,
      novelId: novelId,
    });
    return newHistory;
  },
  getHistory: async (accountId) => {
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isAccountExisted = await Account.findById(accountId);
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    try {
      const historyList = await History.aggregate([
        {
          $match: {
            accountId: utility.castId(accountId),
          },
        },
        {
          $lookup: {
            from: "novels",
            localField: "novelId",
            foreignField: "_id",
            as: "novelInfo",
          },
        },
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
            path: "$novelInfo",
          },
        },
        {
          $unwind: {
            path: "$chapterInfo",
          },
        },
        {
          $project: {
            _id: 1,
            chapterId: 1,
            novelId: 1,
            "novelInfo.title": 1,
            "novelInfo.coverLink": 1,
            "chapterInfo.index": 1,
          },
        },
      ]);
      return historyList;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = historyService;
