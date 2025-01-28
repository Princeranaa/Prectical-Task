const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const producModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isloggedin, async function (req, res) {
  let products = await producModel.find();
  let success = req.flash("success"); // retrieve the flash message
  res.render("shop", { products, success });
});


router.get("/cart", isloggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  // Check if cart has items
  let bill = 0;
  if (user.cart.length > 0) {
    // Calculate the bill only if the cart has products
    bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
  }

  res.render("cart", { user, bill });  // Pass the user object to the rendered view
});





router.get("/addtocart/:productid", isloggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to Cart"); // set the flash message
  res.redirect("/shop");
});


module.exports = router;
