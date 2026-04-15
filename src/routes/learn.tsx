import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { learningModules, type LearningModule } from "@/data/learning-modules";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
  head: () => ({
    meta: [
      { title: "Learn AI & ML — AIML Learn" },
      { name: "description", content: "Structured learning modules covering AI fundamentals to advanced deep learning." },
    ],
  }),
});

const levelColors = {
  beginner: "bg-chart-3/15 text-chart-3",
  intermediate: "bg-primary/15 text-primary",
  advanced: "bg-chart-4/15 text-chart-4",
};

function LearnPage() {
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const filtered = filter === "all" ? learningModules : learningModules.filter((m) => m.level === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">
            <BookOpen className="mr-2 inline-block h-8 w-8 text-primary" />
            Learning Modules
          </h1>
          <p className="mt-2 text-muted-foreground">Structured courses from AI basics to advanced deep learning</p>
        </div>

        {/* Level filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(level)}
              className="capitalize"
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Module list */}
        <div className="space-y-4">
          {filtered.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              isOpen={openModule === mod.id}
              onToggle={() => setOpenModule(openModule === mod.id ? null : mod.id)}
              openLesson={openLesson}
              setOpenLesson={setOpenLesson}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ModuleCard({
  module: mod,
  isOpen,
  onToggle,
  openLesson,
  setOpenLesson,
}: {
  module: LearningModule;
  isOpen: boolean;
  onToggle: () => void;
  openLesson: string | null;
  setOpenLesson: (id: string | null) => void;
}) {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="text-3xl">{mod.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold">{mod.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${levelColors[mod.level]}`}>
              {mod.level}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{mod.description}</p>
        </div>
        {isOpen ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-4">
              {mod.lessons.map((lesson, idx) => {
                const lessonId = `${mod.id}-${idx}`;
                const isLessonOpen = openLesson === lessonId;
                return (
                  <div key={idx} className="mb-3 last:mb-0">
                    <button
                      onClick={() => setOpenLesson(isLessonOpen ? null : lessonId)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-secondary/50"
                    >
                      {isLessonOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      {lesson.title}
                    </button>
                    <AnimatePresence>
                      {isLessonOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="rounded-lg bg-surface p-4 ml-7 mt-1">
                            <div className="prose prose-sm max-w-none text-foreground">
                              {lesson.content.split("\n").map((line, i) => (
                                <p key={i} className="mb-2 text-sm leading-relaxed text-surface-foreground whitespace-pre-wrap">
                                  {line}
                                </p>
                              ))}
                            </div>
                            {lesson.videoUrl && (
                              <a
                                href={lesson.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Watch Video
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
