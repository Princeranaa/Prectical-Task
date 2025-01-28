const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    console.log("No token found in cookies.");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    console.log("Decoded token:", decoded); // Debugging line

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      req.flash("error", "User  not found.");
      console.log("User  not found in database.");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "You need to login first");
    console.error("JWT verification failed:", err.message); // Debugging line
    res.redirect("/");
  }
};