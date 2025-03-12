const mongoose = require("mongoose");

const CreatorEpisodeSchema = mongoose.Schema({
  podcastId: {
    type: String,
    required: true,
  },
  episodetitle: {
    type: String,
    required: true,
  },

  episodecount: {
    type: Number,
    required: true,
  },  
  audio: {
    type: Object,
    required: true,
  },
});
module.exports = mongoose.model("CreatorEpisode", CreatorEpisodeSchema);
