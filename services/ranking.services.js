const Novel = require("../models/novel.model");
const Review =require("../models/review.model");

const rankingServices = {
  readCountSort: async () => {
    const ranking = await Novel.find().sort({ readCount: -1 });
    return ranking;
  },
  reviewSort: async () => {
    try {
      const mostReviewedNovels = await Review.aggregate([
        {
          $group: {
            _id: "$novelId",
            totalReviews: { $sum: 1 },
          },
        },
        {
          $sort: { totalReviews: -1 },
        },
      ]);
      const novelIds = mostReviewedNovels.map((item) => item._id);
      const novelList=[];
      for (const id of novelIds) {

        const novel = await Novel.findOne({_id: id});
      
        if (novel) {
      
          novelList.push(novel);
      
        }
      
      }

      return novelList;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = rankingServices;
