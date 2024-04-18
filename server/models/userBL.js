const user = require("./userModel");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    user.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    user.findById(id, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { getAllUsers, getUserById };
