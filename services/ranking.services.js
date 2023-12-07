const Novel = require("../models/novel.model");

const rankingServices = {
  readCountSort: async () => {
    const ranking = await Novel.find().sort({ readCount: -1 });
    return ranking;
  },
};

module.exports = rankingServices;
