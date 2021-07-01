const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, username } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Server error" }] });
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Username or email already exist" }] });
  }
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Server error" }] });
  }
  const profileImages = [
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic1_jay2ch.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic2_uufmdu.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635407/Alliance%20chat/pic3_x0kjks.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic4_vty8zj.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic5_dxjeha.jpg",
  ];
  const RandomNo = Math.floor(Math.random() * 5);
  const createdUser = new User({
    name,
    email,
    username,
    avatar: profileImages[RandomNo],
    password: hashedPassword,
    accountVerified: false,
    country: null,
  });
  try {
    await createdUser.save();
    res.send(createdUser);
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "server up failed" }] });
  }
};
module.exports = { signUp };
