const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
  name: String,
  description: String,
  streamingPlatform: String,
  upvotes: Number,
  downvotes: Number,
});

const Streamer = mongoose.model("Streamer", streamerSchema);

module.exports = Streamer;
