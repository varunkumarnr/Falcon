const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const UserController = require("../controllers/user-contoller");
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("username", "enter a valid useraname").not().isEmpty(),
    check("email", "enter student mail address").isEmail(),
    check("password", "enter password of minimum length 6").isLength({
      min: 6,
    }),
  ],
  UserController.signUp
);
module.exports = router;
