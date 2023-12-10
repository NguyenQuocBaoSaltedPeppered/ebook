const Novel = require("../models/novel.model");
const Account = require("../models/account.model");
const Chapter = require("../models/chapter.model");
const Review = require("../models/review.model");
const Bookmark = require("../models/bookmark.model");
const mongoose = require("mongoose");
const utility = require("./utility.services");
const unorm = require('unorm');


const novelService = {
  //new Novel
  newNovel: async (
    title,
    intro,
    types,
    coverLink,
    readCount,
    author,
    accountPostedId
  ) => {
    if (!title || !intro || !types || !author || !accountPostedId) {
      const error = utility.createError(
        400,
        "Title, Intro, Types, author or accountPostedId must be all filled"
      );
      throw error;
    }
    const isNovelExisted = await Novel.findOne({ title: title });
    if (isNovelExisted) {
      const error = utility.createError(303, "Novel is already existed");
      throw error;
    }
    if (!mongoose.Types.ObjectId.isValid(accountPostedId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isAccountExisted = await Account.findOne({ _id: accountPostedId });
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    try {
      const newNovel = Novel.create({
        title,
        intro,
        types,
        coverLink,
        readCount,
        author,
        accountPostedId,
      });
      return newNovel;
    } catch (error) {
      console.log(error);
    }
  },

  //getLatestNovel
  getLatestNovel: async () => {
    try {
      const novelList = await Novel.find({}, { accountPostedId: 0 })
        .sort({ $natural: -1 })
        //.limit(4);
      return novelList;
    } catch (error) {
      console.log(error);
    }
  },
  sameTypes: async (types) => {
    try {
      const novelSameTypes = await Novel.find({
        types: {
          $all: types,
        },
      }).sort({ readCount: -1 });
      return novelSameTypes;
    } catch (error) {
      console.log(error);
    }
  },
  get1Novel: async (novelId) => {
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isNovelExisted = await Novel.find({ _id: novelId });
    if (!isNovelExisted) {
      const error = utility.createError(404, "Novel is not exist");
      throw error;
    }
    try {
      const novelInfo = await Novel.aggregate([
        {
          $match: {
            _id: utility.castId(novelId),
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountPostedId",
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
            title: 1,
            intro: 1,
            types: 1,
            coverLink: 1,
            readCount: 1,
            author: 1,
            "postedBy._id": 1,
            "postedBy.name": 1,
          },
        },
      ]);
      const chapterList = await Chapter.find(
        { novelId: novelId },
        { _id: 1, title: 1, content: 1, createdAt: 1 }
      );
      const bookmarkCount = await Bookmark.find({ novelId: novelId }).count();
      return { novelInfo, chapterList, bookmarkCount };
    } catch (error) {
      console.log(error);
    }
  },
  

  searchNovel: async (searchName) => {
    try {
      const regex = new RegExp(unorm.nfc(searchName).split('').join('.*'), 'i');
      const searchResult = await Novel.find(
        { title: { $regex: regex } }
      ).collation({ locale: 'vi', strength: 2});
  
      return searchResult;
    } catch (error) {
      console.log(error);
    }
  }
  
};

module.exports = novelService;
