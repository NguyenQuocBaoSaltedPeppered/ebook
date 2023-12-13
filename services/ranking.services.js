const Novel = require("../models/novel.model");
const Review =require("../models/review.model");

const rankingServices = {
  readCountSort: async () => {
    const novel = await Novel.find().sort({ readCount: -1 }).limit(5);
    const ranking = novel.map((novel, index) => ({...novel.toObject(),
        top: index + 1,
    }));
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
      const novelIds = mostReviewedNovels.slice(0,5).map((item) => item._id);
      const novelList = await Promise.all(
        novelIds.map(async (id, index) => {
          const novel = await Novel.findOne({ _id: id });
          if (novel) {
            return { ...novel.toObject(), 
              top: index + 1,  
              totalReviews: mostReviewedNovels.find((item) => item._id.equals(id)).totalReviews, };
          }
          return null;
        })
      );
  
      const filteredNovelList = novelList.filter((novel) => novel !== null);
  
      return filteredNovelList;
    } catch (error) {
      throw error;
    }
  },
  scoreSort: async () => {
    try {
      const novelReviews = await Review.aggregate([
        {
          $group: {
            _id: "$novelId",
            totalReviews: { $sum: 1 },
            averageRating: {
              $avg: {
                $avg: ["$noiDungCotTruyen", "$boCucTheGioi", "$tinhCachNhanVat"],
              },
            },
          },
        },
        {
          $sort: { averageRating: -1 },
        },
      ]);
  
      const novelIds = novelReviews.slice(0, 5).map((item) => item._id);
  
      const novelList = await Promise.all(
        novelIds.map(async (id, index) => {
          const reviews = await Review.find({ novelId: id });
          const totalReviews = reviews.length;
            const finalAverageRating =
            totalReviews > 0
              ? reviews.reduce(
                  (sum, review) =>
                    sum +
                    (review.noiDungCotTruyen + review.boCucTheGioi + review.tinhCachNhanVat) * 5/ 24,
                  0
                ) / totalReviews
              : 0;
  
          const novel = await Novel.findOne({ _id: id });
          if (novel) {
            return {
              ...novel.toObject(),
              top: index + 1,
              totalReviews,
              averageRating: parseFloat(finalAverageRating.toFixed(2)),
            };
          }
          return null;
        })
      );
      novelList.sort((a, b) => b.averageRating - a.averageRating);  
      return novelList;
    } catch (error) {
      throw error;
    }
  }
  
};

module.exports = rankingServices;
