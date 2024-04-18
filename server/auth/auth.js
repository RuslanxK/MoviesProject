const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

////////// REGISTER ///////

const register = async (req, res) => {
  const { fullname, username, password } = req.body;

  if (!fullname.length && !username.length && !password.length) {
    return res.status(400).json({ message: "Missing Data" });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await user
      .create({
        fullname,
        username,
        password: hash,
      })
      .then((user) => {
        const accessToken = jwt.sign(
          { id: user._id, username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 7200 }
        );

        res.status(201).json({
          accessToken: accessToken,
          message: "User successfully created",
          user: user._id,
        });
      })

      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",

          error: error.message,
        })
      );
  });
};

////////// LOGIN ///////

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    const User = await user.findOne({ username });

    if (!User) {
      res.status(400).json({
        message: "Login not successful",

        error: "User not found",
      });
    } else {
      bcrypt.compare(password, User.password).then(function (result) {
        if (result) {
          const accessToken = jwt.sign(
            { id: User._id, username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 7200 }
          );

          res.status(201).json({
            message: "User successfully Logged in",
            accessToken: accessToken,
            user: User._id,
          });
        } else {
          res.status(400).json({ message: "Login not successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { register, login };
