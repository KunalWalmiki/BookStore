const express = require("express");
const { signin, signup, verify } = require("../controllers/auth");
const { auth, isAuthor } = require("../middlewares/auth");
const router = express.Router();


router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify-email", verify);

module.exports = router;