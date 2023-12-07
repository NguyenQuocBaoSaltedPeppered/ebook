const reviewService = require("../services/review.services");
const { StatusCodes } = require("http-status-codes");
const reviewController = {
  newReview: async (req, res) => {
    const {
      noiDungCotTruyen,
      boCucTheGioi,
      tinhCachNhanVat,
      content,
      novelId,
      accountId,
    } = req.body;
    try {
      const newReview = await reviewService.newReview(
        noiDungCotTruyen,
        boCucTheGioi,
        tinhCachNhanVat,
        content,
        novelId,
        accountId
      );
      res.status(StatusCodes.CREATED).json({ newReview });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = reviewController;
