const bookmarkService = require("../services/bookmark.services");
const { StatusCodes } = require("http-status-codes");
const bookmarkController = {
  newBookmark: async (req, res) => {
    const { accountId, novelId } = req.body;
    try {
      const newBookmark = await bookmarkService.newBookmark(accountId, novelId);
      res.status(StatusCodes.CREATED).json({ newBookmark });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  getBookmark: async (req, res) => {
    const { accountId } = req.params;
    try {
      const bookmarkList = await bookmarkService.getBookmark(accountId);
      res.status(StatusCodes.OK).json({ bookmarkList });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  deleteBookmark: async (req, res) => {
    const { accountID, novelID } = req.params;
    try {
      const deleteBookmark = await bookmarkService.deleteBookmark(
        accountID,
        novelID
      );
      res.status(StatusCodes.OK).json({ deleteBookmark });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  bookmarkStatus: async (req, res) => {
    const { accountId, novelId } = req.params;
    try {
      const isBookmarked = await bookmarkService.bookmarkStatus(
        accountId,
        novelId
      );
      res.status(StatusCodes.OK).json({ isBookmarked });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = bookmarkController;
