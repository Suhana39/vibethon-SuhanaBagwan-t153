import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { quizzes, type Quiz } from "@/data/quizzes";

export const Route = createFileRoute("/quizzes")({
  component: QuizzesPage,
  head: () => ({
    meta: [
      { title: "Quizzes — AIML Learn" },
      { name: "description", content: "Test your AI and ML knowledge with interactive quizzes and instant feedback." },
    ],
  }),
});

const levelColors = {
  beginner: "border-chart-3/30 hover:border-chart-3",
  intermediate: "border-primary/30 hover:border-primary",
  advanced: "border-chart-4/30 hover:border-chart-4",
};

function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  if (activeQuiz) {
    return <QuizRunner quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">
          <Trophy className="mr-2 inline-block h-8 w-8 text-primary" />
          Quizzes
        </h1>
        <p className="mt-2 text-muted-foreground">Test your knowledge and earn badges</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => setActiveQuiz(quiz)}
              className={`glass-card rounded-xl border-2 p-6 text-left transition-all ${levelColors[quiz.level]}`}
            >
              <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                {quiz.level}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold">{quiz.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{quiz.questions.length} questions</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Start Quiz <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function QuizRunner({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const q = quiz.questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore((s) => s + 1);
    setAnswers((a) => [...a, idx]);
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <h2 className="font-display text-3xl font-bold">Quiz Complete!</h2>
            <p className="mt-4 text-xl">
              You scored <span className="font-bold text-primary">{score}/{quiz.questions.length}</span> ({pct}%)
            </p>
            <p className="mt-2 text-muted-foreground">
              {pct >= 80 ? "Excellent work! You've earned a badge!" : pct >= 50 ? "Good effort! Keep practicing." : "Review the modules and try again!"}
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button onClick={handleRestart} variant="outline">
                <RotateCcw className="mr-1 h-4 w-4" /> Retry
              </Button>
              <Button onClick={onBack}>Back to Quizzes</Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} size="sm">← Back</Button>
          <span className="text-sm text-muted-foreground">
            {currentIdx + 1} / {quiz.questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((currentIdx + (selected !== null ? 1 : 0)) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-display text-xl font-semibold">{q.question}</h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, idx) => {
              let style = "glass-card border-2 border-transparent";
              if (selected !== null) {
                if (idx === q.correctIndex) style = "border-2 border-chart-3 bg-chart-3/10";
                else if (idx === selected) style = "border-2 border-destructive bg-destructive/10";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${style} ${
                    selected === null ? "hover:border-primary/30 cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm">{opt}</span>
                  {selected !== null && idx === q.correctIndex && <CheckCircle2 className="ml-auto h-5 w-5 text-chart-3" />}
                  {selected !== null && idx === selected && idx !== q.correctIndex && <XCircle className="ml-auto h-5 w-5 text-destructive" />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <div className={`rounded-lg p-4 text-sm ${selected === q.correctIndex ? "bg-chart-3/10" : "bg-destructive/10"}`}>
                <p className="font-medium">{selected === q.correctIndex ? "✅ Correct!" : "❌ Incorrect"}</p>
                <p className="mt-1 text-muted-foreground">{q.explanation}</p>
              </div>
              <Button onClick={handleNext} className="mt-4">
                {currentIdx < quiz.questions.length - 1 ? "Next Question" : "See Results"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
