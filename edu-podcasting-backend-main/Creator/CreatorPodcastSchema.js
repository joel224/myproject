const mongoose = require("mongoose");

const CreatorPodcastSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creators",
  },
  creatorname: {
    type: String,
    required: true,
  },
  podcastname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  coverimage: {
    type: Object,
    required: true,
  },
  audio: {
    type: Object,
    required: true,
  },
  episodecount:{
    type:Number,
    default:0
  }
});
module.exports = mongoose.model("creatorsPodcast", CreatorPodcastSchema);
