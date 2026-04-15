import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Award, Flame, Target, BookOpen, Code, Trophy, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — AIML Learn" },
      { name: "description", content: "Track your AI/ML learning progress, badges, and achievements." },
    ],
  }),
});

const badges = [
  { name: "First Steps", icon: "🎯", description: "Complete your first lesson", earned: true },
  { name: "Quiz Master", icon: "🏆", description: "Score 100% on any quiz", earned: false },
  { name: "Code Runner", icon: "💻", description: "Run 10 coding challenges", earned: false },
  { name: "AI Scholar", icon: "🎓", description: "Complete all beginner modules", earned: false },
  { name: "Neural Ninja", icon: "🧠", description: "Complete neural networks module", earned: false },
  { name: "Streak King", icon: "🔥", description: "7-day learning streak", earned: false },
];

const stats = [
  { label: "Modules Completed", value: "1/6", icon: BookOpen, color: "text-primary" },
  { label: "Quizzes Passed", value: "0/3", icon: Trophy, color: "text-chart-3" },
  { label: "Challenges Done", value: "0/3", icon: Code, color: "text-accent" },
  { label: "Current Streak", value: "1 day", icon: Flame, color: "text-chart-5" },
];

const leaderboard = [
  { name: "AlexAI", score: 2450, rank: 1 },
  { name: "MLMaster", score: 2100, rank: 2 },
  { name: "DataDriven", score: 1880, rank: 3 },
  { name: "NeuralNerd", score: 1650, rank: 4 },
  { name: "You", score: 120, rank: 15 },
];

function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">
          <LayoutDashboard className="mr-2 inline-block h-8 w-8 text-primary" />
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">Track your learning journey</p>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <p className="mt-3 font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Badges */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Badges
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`glass-card rounded-xl p-4 text-center transition-all ${
                    badge.earned ? "glow-border" : "opacity-50 grayscale"
                  }`}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="mt-2 font-display text-sm font-semibold">{badge.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-chart-5" /> Leaderboard
            </h2>
            <div className="glass-card rounded-xl divide-y divide-border">
              {leaderboard.map((entry) => (
                <div
                  key={entry.name}
                  className={`flex items-center justify-between px-4 py-3 ${
                    entry.name === "You" ? "bg-primary/5 font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                      {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
                    </span>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{entry.score.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress chart placeholder */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" /> Learning Progress
          </h2>
          <div className="glass-card rounded-xl p-6">
            <div className="space-y-4">
              {[
                { label: "AI Fundamentals", progress: 40 },
                { label: "Python for ML", progress: 20 },
                { label: "Supervised Learning", progress: 0 },
                { label: "Neural Networks", progress: 0 },
                { label: "Deep Learning", progress: 0 },
                { label: "Transformers", progress: 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.progress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
