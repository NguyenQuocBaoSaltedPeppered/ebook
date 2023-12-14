const Review = require("../models/review.model");
const Account = require("../models/account.model");
const Novel = require("../models/novel.model");
const mongoose = require("mongoose");
const utility = require("./utility.services");

const reviewService = {
  newReview: async (
    noiDungCotTruyen,
    boCucTheGioi,
    tinhCachNhanVat,
    content,
    novelId,
    accountId
  ) => {
    if (
      !noiDungCotTruyen ||
      !boCucTheGioi ||
      !tinhCachNhanVat ||
      !content ||
      !novelId ||
      !accountId
    ) {
      const error = utility.createError(400, "All field must be filled");
      throw error;
    }
    if (
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
    const isReviewExisted = await Review.findOne({
      accountId: accountId,
      novelId: novelId,
    });
    if (isReviewExisted) {
      const error = utility.createError(303, "Review is already exist");
      throw error;
    }
    try {
      const newReview = await Review.create({
        noiDungCotTruyen,
        boCucTheGioi,
        tinhCachNhanVat,
        content,
        novelId,
        accountId,
      });
      return newReview;
    } catch (error) {
      console.log(error);
    }
  },
  getReviewOfANovel: async (novelId, currentPage, pageSize) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(novelId)) {
        const error = utility.createError(400, "Id is not valid");
        throw error;
      }
      const isNovelExisted = await Novel.find({ _id: novelId });
      if (!isNovelExisted) {
        const error = utility.createError(404, "Novel is not exist");
        throw error;
      }
      const reviewCount = await Review.find({novelId: utility.castId(novelId)}).count();
      const reviewList = await Review.aggregate([
        {
          $match: {
            novelId: utility.castId(novelId),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountId",
            foreignField: "_id",
            as: "accountInfo",
          },
        },
        {
          $unwind: {
            path: "$accountInfo",
          },
        },
        {
          $project: {
            _id: 1,
            noiDungCotTruyen: 1,
            boCucTheGioi: 1,
            tinhCachNhanVat: 1,
            content: 1,
            "accountInfo._id": 1,
            "accountInfo.name": 1,
            "accountInfo.avatarLink": 1,
          },
        },
        {
          $skip: (currentPage - 1) * pageSize,
        },
        {
          $limit: pageSize
        }
      ]);
      return {reviewList, reviewCount};
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = reviewService;
