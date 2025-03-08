const express = require("express");
const router = express.Router();
const ensureAuthentication = require('../Middlewares/Auth');

router.get("/product", ensureAuthentication, (req, res) => {
    console.log("--looged user details ----" , req.user);
    
  res.status(200).json([
    {
      name: "tv",
      price: 10000,
    },
    {
      name: "phone",
      price: 8000,
    },
  ]);
});

module.exports = router;
