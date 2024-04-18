const movie = require("../models/movieModel");

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    movie.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    movie.findById(id, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addMovie = (newMovie) => {
  return new Promise((resolve, reject) => {
    let Movie = new movie(newMovie);

    Movie.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Created");
      }
    });
  });
};

const updateMovie = (id, obj) => {
  return new Promise((resolve, reject) => {
    movie.findByIdAndUpdate(
      id,
      {
        name: obj.name,
        premiered: obj.premiered,
        genres: obj.genres,
        imageurl: obj.imageurl,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Updated");
        }
      }
    );
  });
};

const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    movie.findByIdAndDelete(id, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
