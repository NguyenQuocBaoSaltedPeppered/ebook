const rankingServices = require("../services/ranking.services");
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
};
module.exports = rankingController;
