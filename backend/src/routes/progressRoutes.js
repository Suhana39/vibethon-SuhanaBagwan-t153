const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    name: user.name,
    streak: user.streak,
    badges: user.badges,
    completedModules: user.completedModules,
    quizScores: user.quizScores,
    codingRuns: user.codingRuns,
    leaderboardPoints:
      user.completedModules.length * 20 + user.quizScores.reduce((acc, q) => acc + q.score, 0)
  });
});

router.post("/quiz-result", authMiddleware, async (req, res) => {
  const { moduleId, score, total } = req.body;
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.quizScores = user.quizScores.filter((item) => item.moduleId !== moduleId);
  user.quizScores.push({ moduleId, score, total });

  if (score === total && !user.badges.includes("Quiz Master")) {
    user.badges.push("Quiz Master");
  }
  if (!user.completedModules.includes(moduleId)) {
    user.completedModules.push(moduleId);
  }
  user.streak += 1;

  await user.save();
  return res.json({ message: "Quiz progress saved" });
});

module.exports = router;
