const express = require("express");
const {
  createProperty,
  getProperties,
  likeProperty,
  interestProperty,
} = require("../controllers/propertyController");
const auth = require("../middleware/auth"); // Middleware to authenticate user

const router = express.Router();

router.post("/", auth, createProperty);
router.get("/", getProperties);
router.post("/:id/like", auth, likeProperty);
router.post("/:id/interest", auth, interestProperty);

module.exports = router;
