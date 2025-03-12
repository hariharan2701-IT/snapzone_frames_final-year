const express = require("express");
const router = express.Router();
const { saveFrame,sendEmail, getFrames, deleteFrame } = require("../controllers/frameController");

router.post("/checkout", sendEmail);
router.post("/cart", saveFrame);
router.get("/cart/:userId", getFrames);
router.delete("/cart/:id", deleteFrame);

module.exports = router;
