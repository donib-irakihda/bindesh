const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const http = require("http");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (await bcrypt.compare(password, existingUser.password)) {
        if (existingUser.userType === "user") {
          return res.status(500).json({ error: "invalid credentials" });
        } else {
          res
            .status(200)
            .json({ message: "Admin login success", admin: existingUser });
        }
      } else {
        return res.status(500).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while logging in" });
  }
};

const onlyAdmin = async (req, res) => {
  console.log("I got here");
  return res.status(200).json({ message: "Wow I am admin" });
};

module.exports = { adminLogin, onlyAdmin };
