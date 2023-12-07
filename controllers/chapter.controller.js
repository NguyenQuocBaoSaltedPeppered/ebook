const chapterService = require("../services/chapter.services");
const { StatusCodes } = require("http-status-codes");
const chapterController = {
  newChapter: async (req, res) => {
    const { title, content, novelId } = req.body;

    try {
      const newChapter = await chapterService.newChapter(
        title,
        content,
        novelId
      );
      res.status(StatusCodes.CREATED).json({ newChapter });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  getChapter: async (req, res) => {
    const chapterId = req.params.chapterId;
    try {
      const { chapter, prev, next, commentList } =
        await chapterService.getChapter(chapterId);
      res.status(StatusCodes.OK).json({ chapter, prev, next, commentList });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = chapterController;
