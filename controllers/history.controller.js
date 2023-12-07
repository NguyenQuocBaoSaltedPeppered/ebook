const historyService = require("../services/history.services");
const { StatusCodes } = require("http-status-codes");
const historyController = {
  createHistory: async (req, res) => {
    const { chapterId, accountId, novelId } = req.body;
    try {
      const newHistory = await historyService.createHistory(
        chapterId,
        accountId,
        novelId
      );
      res.status(StatusCodes.OK).json({ newHistory });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  getHistory: async (req, res) => {
    const accountId = req.params.accountId;
    try {
      const historyList = await historyService.getHistory(accountId);
      res.status(StatusCodes.OK).json({ historyList });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = historyController;
