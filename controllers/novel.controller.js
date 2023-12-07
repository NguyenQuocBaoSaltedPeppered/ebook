const novelService = require("../services/novel.services");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const novelController = {
  newNovel: async (req, res) => {
    const {
      title,
      intro,
      types,
      coverLink,
      readCount,
      author,
      accountPostedId,
    } = req.body;
    try {
      const newNovel = await novelService.newNovel(
        title,
        intro,
        types,
        coverLink,
        readCount,
        author,
        accountPostedId
      );
      res.status(StatusCodes.CREATED).json({ newNovel });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  getLatest: async (req, res) => {
    try {
      const novelList = await novelService.getLatestNovel();
      res.status(StatusCodes.OK).json({ novelList });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
  sameTypes: async (req, res) => {
    const { types } = req.body;
    try {
      const novelSameTypes = await novelService.sameTypes(types);
      res.status(StatusCodes.OK).json({ novelSameTypes });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  get1Novel: async (req, res) => {
    const novelId = req.params.novelId;
    try {
      const { novelInfo, chapterList, reviewList, reviewCount, bookmarkCount } =
        await novelService.get1Novel(novelId);
      res.status(StatusCodes.OK).json({
        novelInfo,
        chapterList,
        reviewList,
        reviewCount,
        bookmarkCount,
      });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },

  searchNovel: async (req, res) => {
    const { searchName } = req.body;
    try {
      const searchResult = await novelService.searchNovel(searchName);
      res.status(StatusCodes.OK).json({ searchResult });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something wrong!");
    }
  },
};
module.exports = novelController;
