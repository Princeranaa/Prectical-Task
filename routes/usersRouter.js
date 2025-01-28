const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const {
  registerUser,
  loginUser,
  logout,
 
} = require("../controllers/authController");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  res.send("hey it's working");
});

router.get("/profile", isloggedin, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // assuming `req.user.id` is set by a middleware after user login
    res.render("profile", { user });
  } catch (err) {
    res.send(err.message);
  }
});

// Update User Profile
// Get the Update Profile Form
router.get("/update", isloggedin, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // assuming `req.user.id` is set by a middleware after user login
    res.render("UpdatedUser", { user });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/update", isloggedin, async (req, res) => {
  try {
    const { fullname, phone } = req.body;
    const user = await userModel.findById(req.user.id);

    user.fullname = fullname || user.fullname;
    user.phone = phone || user.phone;

    await user.save();
    req.flash("success", "Profile updated successfully!");
    res.redirect("/users/profile");
  } catch (err) {
    req.flash("error", "Error updating profile.");
    res.redirect("/users/profile");
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
