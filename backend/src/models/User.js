const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    streak: { type: Number, default: 1 },
    badges: [{ type: String }],
    completedModules: [{ type: String }],
    quizScores: [
      {
        moduleId: String,
        score: Number,
        total: Number
      }
    ],
    codingRuns: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
