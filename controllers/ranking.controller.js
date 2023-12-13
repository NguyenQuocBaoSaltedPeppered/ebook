const rankingServices = require("../services/ranking.services");
const novelServices =require("../services/novel.services");
const { StatusCodes } = require("http-status-codes");
const rankingController = {
  readCountSort: async (req, res) => {
    try {
      const result = await rankingServices.readCountSort();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something wrong!");
    }
  },
  reviewSort: async (req, res) =>{
    try {
      const mostReviewedNovels = await rankingServices.reviewSort();
      res.status(StatusCodes.OK).json(mostReviewedNovels);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something wrong!");
    }
  },
  scoreSort: async (req, res) =>{
    try {
      const mostScoreNovels = await rankingServices.scoreSort();
      res.status(StatusCodes.OK).json(mostScoreNovels);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something wrong!");
    }
  }
};
module.exports = rankingController;
