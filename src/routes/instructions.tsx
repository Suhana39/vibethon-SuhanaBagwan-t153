import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, BookOpen, Code, Trophy, LayoutDashboard, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/instructions")({
  component: InstructionsPage,
  head: () => ({
    meta: [
      { title: "Instructions — AIML Learn" },
      { name: "description", content: "Learn how to use the AIML Learning Platform effectively." },
    ],
  }),
});

const sections = [
  {
    icon: BookOpen,
    title: "Learning Modules",
    items: [
      "Browse modules by difficulty level (Beginner, Intermediate, Advanced)",
      "Click on a module to expand its lessons",
      "Read through text content and watch linked videos",
      "Code examples are included in some lessons — try them in the Practice section",
    ],
  },
  {
    icon: Code,
    title: "Coding Practice",
    items: [
      "Select a challenge from the sidebar",
      "Read the description and modify the starter code",
      "Click 'Run' to execute your code and see the output",
      "Use the 'Hint' button if you get stuck",
      "The editor supports Python — type any valid Python code",
    ],
  },
  {
    icon: Trophy,
    title: "Quizzes",
    items: [
      "Choose a quiz matching your level",
      "Answer multiple-choice questions by clicking an option",
      "Get instant feedback with explanations",
      "Score 80%+ to earn a badge",
      "Retry quizzes as many times as you want",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    items: [
      "View your overall progress across all sections",
      "Track earned badges and achievements",
      "See your position on the leaderboard",
      "Monitor your learning streak",
    ],
  },
  {
    icon: Sparkles,
    title: "Tips for Success",
    items: [
      "Start with Beginner modules if you're new to AI/ML",
      "Practice coding after each learning module",
      "Take quizzes to test your understanding",
      "Aim for daily learning to maintain your streak",
      "Don't rush — understanding concepts is more important than speed",
    ],
  },
];

function InstructionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">
          <HelpCircle className="mr-2 inline-block h-8 w-8 text-primary" />
          How to Use This Platform
        </h1>
        <p className="mt-2 text-muted-foreground">A quick guide to get the most out of AIML Learn</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-2 ml-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
