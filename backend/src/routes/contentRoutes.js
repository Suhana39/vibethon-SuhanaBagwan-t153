const express = require("express");
const { introToMLModule } = require("../data/introToML");

const router = express.Router();

router.get("/module/intro-to-ml", (_req, res) => {
  res.json(introToMLModule);
});

module.exports = router;
