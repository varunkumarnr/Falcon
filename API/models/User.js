const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  country: String,
  passwordChangedAt: Date,
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = User = mongoose.model("user", UserSchema);
