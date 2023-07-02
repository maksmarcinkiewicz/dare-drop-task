const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
  name: String,
  description: String,
  streamingPlatform: String,
  upvotes: Number,
  downvotes: Number,
  image: String,
});

const Streamer = mongoose.model("Streamer", streamerSchema);

module.exports = Streamer;
