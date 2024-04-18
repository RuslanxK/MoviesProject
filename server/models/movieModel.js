const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
  name: String,
  premiered: Number,
  genres: [String],
  imageurl: String,
});

module.exports = mongoose.model("movies", movieSchema);
