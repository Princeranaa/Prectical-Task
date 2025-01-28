const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const producModel = require("../models/product-model");


router.post("/create", upload.single("image"), async function (req, res) {

  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  
  try{ 
    let product = await producModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("success", "product created successfully")
  res.redirect("/owners/admin");
} catch (error){
  res.send(error.message);

     
  }
});

module.exports = router;
