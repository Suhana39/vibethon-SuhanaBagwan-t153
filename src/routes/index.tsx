import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Code, Trophy, Brain, Sparkles, BarChart3, Gamepad2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "AIML Learn — Interactive AI & Machine Learning Platform" },
      { name: "description", content: "Learn AI and Machine Learning through interactive modules, coding challenges, quizzes, and real-world simulations." },
    ],
  }),
});

const features = [
  { icon: BookOpen, title: "Learning Modules", description: "Structured courses from basics to advanced deep learning", to: "/learn" as const },
  { icon: Code, title: "Coding Practice", description: "Interactive Python editor with instant execution", to: "/practice" as const },
  { icon: Trophy, title: "Quizzes & Badges", description: "Test your knowledge and earn achievements", to: "/quizzes" as const },
  { icon: BarChart3, title: "Visualizations", description: "Interactive charts showing model accuracy and loss curves", to: "/learn" as const },
  { icon: Gamepad2, title: "Mini-Games", description: "Fun games that teach ML concepts like sorting and training", to: "/practice" as const },
  { icon: Users, title: "Community", description: "Q&A section to discuss concepts and share insights", to: "/dashboard" as const },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Interactive AI/ML Learning
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Master <span className="gradient-text">AI & ML</span>
              <br />the fun way
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              From fundamentals to deep learning — learn through interactive modules,
              coding challenges, quizzes, and real-world simulations.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/learn">Start Learning</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/instructions">How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute left-10 top-20 h-20 w-20 rounded-2xl bg-primary/10"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-16 w-16 rounded-full bg-accent/10"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold">Everything you need to learn AIML</h2>
            <p className="mt-3 text-muted-foreground">Comprehensive tools for every stage of your learning journey</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={feature.to} className="glass-card group block rounded-xl p-6 transition-all hover:glow-border">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="bg-surface px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold">Adaptive Learning Paths</h2>
          <p className="mt-3 text-muted-foreground">Content tailored to your skill level</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { level: "Beginner", color: "bg-chart-3", desc: "AI basics, Python intro, fundamental concepts" },
              { level: "Intermediate", color: "bg-primary", desc: "Supervised learning, neural networks, model evaluation" },
              { level: "Advanced", color: "bg-chart-4", desc: "Deep learning, transformers, real-world projects" },
            ].map((item) => (
              <div key={item.level} className="rounded-xl bg-card p-6 shadow-sm">
                <div className={`mx-auto mb-4 h-3 w-3 rounded-full ${item.color}`} />
                <h3 className="font-display text-lg font-semibold">{item.level}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <Brain className="mx-auto mb-6 h-12 w-12 text-primary" />
          <h2 className="font-display text-3xl font-bold">Ready to begin?</h2>
          <p className="mt-3 text-muted-foreground">
            Jump in and start your AI/ML journey today. No prerequisites needed.
          </p>
          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/learn">Get Started Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
