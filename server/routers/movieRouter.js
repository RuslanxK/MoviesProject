const express = require("express");
const movieBL = require("../models/movieBL");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/").get(async (req, resp) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return resp.status(401).json("No token provided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return resp.status(500).json("Failed to authenticate token");
    }

    const getData = async () => {
      data = await movieBL.getAllMovies();
      return resp.json(data);
    };
    getData();
  });
});

router.route("/:id").get(async (req, resp) => {
  try {
    const { id } = req.params;
    const movie = await movieBL.getMovieById(id);
    return resp.json(movie);
  } catch (error) {
    console.log(error);
  }
});

router.route("/").post(async (req, resp) => {
  try {
    const newMovie = req.body;
    const status = await movieBL.addMovie(newMovie);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").put(async (req, resp) => {
  try {
    const { id } = req.params;
    const updateMovie = req.body;
    const status = await movieBL.updateMovie(id, updateMovie);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").delete(async (req, resp) => {
  try {
    const { id } = req.params;
    const status = await movieBL.deleteMovie(id);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
