const express = require("express");
const { auth, isReader } = require("../middlewares/auth");
const { createRating } = require("../controllers/ratingAndReview");
const router = express.Router();

router.post("/rating", auth, isReader, createRating);

module.exports = router;