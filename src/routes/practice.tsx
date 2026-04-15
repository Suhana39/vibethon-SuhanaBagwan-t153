import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Code, Play, Lightbulb, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { codingChallenges, type CodingChallenge } from "@/data/coding-challenges";

export const Route = createFileRoute("/practice")({
  component: PracticePage,
  head: () => ({
    meta: [
      { title: "Coding Practice — AIML Learn" },
      { name: "description", content: "Practice Python coding challenges for AI and Machine Learning." },
    ],
  }),
});

function PracticePage() {
  const [activeChallenge, setActiveChallenge] = useState<CodingChallenge>(codingChallenges[0]);
  const [code, setCode] = useState(activeChallenge.starterCode);
  const [output, setOutput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [running, setRunning] = useState(false);

  const selectChallenge = (c: CodingChallenge) => {
    setActiveChallenge(c);
    setCode(c.starterCode);
    setOutput("");
    setShowHint(false);
  };

  const runCode = () => {
    setRunning(true);
    setOutput("");

    // Simulate Python execution with a simple output parser
    setTimeout(() => {
      try {
        const lines: string[] = [];
        const printRegex = /print\((?:f?"(.*?)"|'(.*?)'|(.+?))\)/g;
        let match;
        const codeStr = code;

        // Simple variable resolution for demo
        const vars: Record<string, string> = {};

        // Extract simple assignments
        const assignRegex = /^(\w+)\s*=\s*(.+)$/gm;
        let assignMatch;
        while ((assignMatch = assignRegex.exec(codeStr)) !== null) {
          vars[assignMatch[1]] = assignMatch[2].trim();
        }

        // Extract prints
        while ((match = printRegex.exec(codeStr)) !== null) {
          let val = match[1] || match[2] || match[3];
          if (val) {
            // Handle f-string interpolation simply
            val = val.replace(/\{([^}]+)\}/g, (_, expr) => {
              // Try to evaluate simple expressions
              const cleaned = expr.replace(/:.+$/, "");
              if (cleaned.includes("**")) {
                const parts = cleaned.split("**");
                return String(Math.pow(parseFloat(parts[0]) || 0, parseFloat(parts[1]) || 0));
              }
              return `[${cleaned}]`;
            });
            lines.push(val);
          }
        }

        if (lines.length > 0) {
          setOutput(lines.join("\n"));
        } else {
          setOutput("# Code executed successfully!\n# (Simulated Python environment)\n# Output would appear here in a full Python runtime.\n\n# Tip: This is a demonstration editor.\n# For full Python execution, connect to a Jupyter kernel.");
        }
      } catch {
        setOutput("Error: Could not parse code.");
      }
      setRunning(false);
    }, 800);
  };

  const levelLabel = {
    beginner: "🟢",
    intermediate: "🟡",
    advanced: "🔴",
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">
          <Code className="mr-2 inline-block h-8 w-8 text-primary" />
          Coding Practice
        </h1>
        <p className="mt-2 text-muted-foreground">Hands-on Python challenges for AI/ML concepts</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Challenge list */}
          <div className="space-y-2">
            {codingChallenges.map((c) => (
              <button
                key={c.id}
                onClick={() => selectChallenge(c)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                  activeChallenge.id === c.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{levelLabel[c.level]}</span>
                <span className="flex-1">{c.title}</span>
                <ChevronRight className="h-4 w-4 opacity-40" />
              </button>
            ))}
          </div>

          {/* Editor area */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5">
              <h2 className="font-display text-lg font-semibold">{activeChallenge.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{activeChallenge.description}</p>
            </div>

            <div className="glass-card overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground">Python Editor</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="mr-1 h-3.5 w-3.5" />
                    Hint
                  </Button>
                  <Button size="sm" onClick={runCode} disabled={running}>
                    <Play className="mr-1 h-3.5 w-3.5" />
                    {running ? "Running..." : "Run"}
                  </Button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none resize-none"
                rows={16}
                spellCheck={false}
              />
            </div>

            {showHint && (
              <div className="rounded-lg bg-accent/10 p-4 text-sm">
                <Lightbulb className="mr-1 inline h-4 w-4 text-accent" />
                <span className="font-medium">Hint:</span> {activeChallenge.hint}
              </div>
            )}

            {output && (
              <div className="glass-card rounded-xl">
                <div className="border-b border-border px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground">Output</span>
                </div>
                <pre className="p-4 font-mono text-sm text-foreground whitespace-pre-wrap">{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
