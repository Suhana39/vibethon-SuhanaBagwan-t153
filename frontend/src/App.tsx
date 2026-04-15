import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";

type ModuleCard = {
  id: string;
  title: string;
  level: string;
  description: string;
};

type ModuleSection = {
  id: string;
  title: string;
  intro: string;
  example: string;
  exercise: string;
};

type ModuleData = {
  slug: string;
  title: string;
  description: string;
  sections: ModuleSection[];
  references: string[];
};

type QuizQuestion = {
  id: number;
  level: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type GuessQuestion = {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
};

type ClassificationItem = {
  id: string;
  text: string;
  label: "spam" | "not-spam";
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-slate-100/95 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-semibold text-slate-800">
              MindML
            </Link>
            <button
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <div className={`${menuOpen ? "mt-3 flex" : "hidden"} flex-col gap-2 text-sm md:mt-0 md:flex md:flex-row md:items-center md:justify-between`}>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <NavItem to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavItem>
              <NavItem to="/modules" onClick={() => setMenuOpen(false)}>
                Modules
              </NavItem>
              <NavItem to="/quiz" onClick={() => setMenuOpen(false)}>
                Quiz
              </NavItem>
              <NavItem to="/mini-games" onClick={() => setMenuOpen(false)}>
                Mini-Games
              </NavItem>
              <NavItem to="/instructions" onClick={() => setMenuOpen(false)}>
                Instructions
              </NavItem>
              <NavItem to="/disclaimer" onClick={() => setMenuOpen(false)}>
                Disclaimer
              </NavItem>
            </div>
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-fit rounded-lg bg-sky-600 px-3 py-2 font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Login/Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto mt-24 max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/:level" element={<ModuleDetailsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/mini-games" element={<MiniGamesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

function NavItem({ to, children, onClick }: { to: string; children: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `rounded px-2 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${
          isActive ? "bg-white text-slate-900" : "text-slate-700 hover:bg-white hover:text-slate-900"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Home() {
  const leaders = [
    { name: "Suhana", points: 1450 },
    { name: "Aarav", points: 1320 },
    { name: "Ishita", points: 1185 }
  ];

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">MindML - Learning Platform</h1>
        <p className="mt-3 max-w-3xl text-gray-700">
          Learn AI/ML through clear modules, practical examples, mini-games, and lightweight gamification designed for
          a calm, focused learning experience.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Feature title="Structured Learning" text="Beginner to advanced path with concept-first explanations." />
          <Feature title="Hands-on Practice" text="Interactive quizzes and mini-games with instant feedback." />
          <Feature title="Progress Visibility" text="Badges, section progress, and leaderboard-ready design." />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Leaderboard (Demo)</h2>
        <p className="mt-2 text-sm text-gray-700">Static sample leaderboard to showcase gamification potential.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {leaders.map((leader, index) => (
            <div key={leader.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-sky-700">#{index + 1}</p>
              <p className="font-semibold text-slate-900">{leader.name}</p>
              <p className="text-sm text-gray-700">{leader.points} pts</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-700">{text}</p>
    </article>
  );
}

function ModulesPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const raw = localStorage.getItem("mindml-module-progress");
    if (raw) {
      setProgress(JSON.parse(raw));
    }
  }, []);

  const modules: ModuleCard[] = [
    {
      id: "beginner",
      level: "Beginner",
      title: "Intro to Machine Learning",
      description: "Understand datasets, supervised learning, and model evaluation basics."
    },
    {
      id: "intermediate",
      level: "Intermediate",
      title: "Model Building and Tuning",
      description: "Explore feature engineering, validation strategies, and hyperparameter tuning."
    },
    {
      id: "advanced",
      level: "Advanced",
      title: "Deep Learning and Deployment",
      description: "Learn neural network fundamentals and how models reach production systems."
    }
  ];

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Learning Modules</h2>
        <p className="mt-2 text-gray-700">Choose a level and begin your guided AI/ML learning path.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <article
            key={module.id}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => navigate(`/modules/${module.id}`)}
          >
            <p className="text-sm font-medium text-sky-700">{module.level}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{module.title}</h3>
            <p className="mt-2 flex-1 text-sm text-gray-700">{module.description}</p>
            <div className="mt-4">
              <p className="mb-1 text-xs text-gray-600">Progress: Completed {progress[module.id] || 0}/3 sections</p>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${((progress[module.id] || 0) / 3) * 100}%` }} />
              </div>
            </div>
            <button className="btn-primary mt-5">Start</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ModuleDetailsPage() {
  const { level } = useParams();
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const slug = level || "beginner";
    fetch(`/data/${slug}.json`)
      .then((res) => res.json())
      .then((data: ModuleData) => {
        setModuleData(data);
        fetch(`/content/${data.slug}.md`)
          .then((res) => res.text())
          .then((markdown) => setNotes(markdown))
          .catch(() => setNotes(""));
        const saved = localStorage.getItem(`mindml-completed-${data.slug}`);
        if (saved) {
          setCompleted(JSON.parse(saved));
        } else {
          setCompleted([]);
        }
      })
      .catch(() => setModuleData(null));
  }, [level]);

  const toggleSection = (id: string) => {
    if (!moduleData) return;
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(next);
    localStorage.setItem(`mindml-completed-${moduleData.slug}`, JSON.stringify(next));
    const progressRaw = localStorage.getItem("mindml-module-progress");
    const progressMap = progressRaw ? JSON.parse(progressRaw) : {};
    progressMap[moduleData.slug] = next.length;
    localStorage.setItem("mindml-module-progress", JSON.stringify(progressMap));
  };

  if (!moduleData) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Module not found</h2>
        <p className="mt-2 text-gray-700">Please return to modules and pick a valid level.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">{moduleData.title}</h2>
        <p className="mt-2 text-gray-700">{moduleData.description}</p>
        <p className="mt-4 text-sm text-gray-600">
          Completed {completed.length}/{moduleData.sections.length} sections
        </p>
        <div className="mt-1 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(completed.length / moduleData.sections.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {moduleData.sections.map((section) => {
          const isDone = completed.includes(section.id);
          return (
            <article key={section.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                <button
                  className={`rounded-md px-3 py-1 text-sm font-medium ${isDone ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}
                  onClick={() => toggleSection(section.id)}
                >
                  {isDone ? "Completed" : "Mark done"}
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-700">{section.intro}</p>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Example:</span> {section.example}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Exercise:</span> {section.exercise}
              </p>
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-gray-700 shadow-sm">
        <p className="font-semibold text-slate-900">Open-source references</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          {moduleData.references.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {notes && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <p className="font-semibold text-slate-900">Markdown Study Notes</p>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{notes}</pre>
        </div>
      )}
    </section>
  );
}

function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch("/data/quiz.json")
      .then((res) => res.json())
      .then((data: { questions: QuizQuestion[] }) => setQuestions(data.questions));
  }, []);

  const chooseAnswer = (question: QuizQuestion, answerIndex: number) => {
    if (selected[question.id] !== undefined) return;
    const next = { ...selected, [question.id]: answerIndex };
    setSelected(next);
    if (answerIndex === question.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const completeQuiz = () => {
    setFinished(true);
  };

  const percentage = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Quiz Arena</h2>
        <p className="mt-2 text-gray-700">Answer all 10 questions and unlock a badge at 80%+ score.</p>
        <p className="mt-3 text-sm text-gray-600">
          Progress: {Object.keys(selected).length}/{questions.length}
        </p>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-sky-500 transition-all"
            style={{ width: `${questions.length ? (Object.keys(selected).length / questions.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => {
          const picked = selected[question.id];
          const answered = picked !== undefined;
          const isCorrect = picked === question.correctIndex;
          return (
            <article key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-700">{question.level}</p>
                {answered && (
                  <p className={`text-sm font-semibold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                )}
              </div>
              <p className="font-medium text-slate-900">{question.question}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.options.map((option, idx) => (
                  <button
                    key={option}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      picked === idx
                        ? idx === question.correctIndex
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-red-300 bg-red-50"
                        : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50"
                    }`}
                    onClick={() => chooseAnswer(question, idx)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answered && <p className="mt-3 text-sm text-gray-700">{question.explanation}</p>}
            </article>
          );
        })}
      </div>

      {!finished ? (
        <button className="btn-primary w-full sm:w-auto" onClick={completeQuiz} disabled={Object.keys(selected).length < questions.length}>
          Finish Quiz
        </button>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Final Result</h3>
          <p className="mt-2 text-gray-700">
            Score: {correctCount}/{questions.length} ({percentage}%)
          </p>
          {percentage >= 80 ? (
            <p className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              Quiz Master Badge Unlocked
            </p>
          ) : (
            <p className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              Keep going - you are getting stronger
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function MiniGamesPage() {
  const [guessSet, setGuessSet] = useState<GuessQuestion[]>([]);
  const [classificationSet, setClassificationSet] = useState<ClassificationItem[]>([]);
  const [guessScore, setGuessScore] = useState(0);
  const [guessAnswers, setGuessAnswers] = useState<Record<number, number>>({});
  const [classifyScore, setClassifyScore] = useState(0);
  const [classified, setClassified] = useState<Record<string, "spam" | "not-spam">>({});

  useEffect(() => {
    fetch("/data/mini-games.json")
      .then((res) => res.json())
      .then((data: { guessAlgorithm: GuessQuestion[]; classificationChallenge: ClassificationItem[] }) => {
        setGuessSet(data.guessAlgorithm);
        setClassificationSet(data.classificationChallenge);
      });
  }, []);

  const answerGuess = (question: GuessQuestion, index: number) => {
    if (guessAnswers[question.id] !== undefined) return;
    setGuessAnswers((prev) => ({ ...prev, [question.id]: index }));
    if (index === question.correctIndex) {
      setGuessScore((prev) => prev + 1);
    }
  };

  const classifyItem = (item: ClassificationItem, label: "spam" | "not-spam") => {
    if (classified[item.id]) return;
    setClassified((prev) => ({ ...prev, [item.id]: label }));
    if (item.label === label) {
      setClassifyScore((prev) => prev + 1);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Mini-Games</h2>
        <p className="mt-2 text-gray-700">Play quick challenges to reinforce ML ideas with instant feedback.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-sky-100 px-3 py-1 font-medium text-sky-700">Guess Score: {guessScore}</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">Classification Score: {classifyScore}</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Guess the Algorithm</h3>
          {guessSet.map((item) => {
            const picked = guessAnswers[item.id];
            return (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-gray-800">{item.prompt}</p>
                <div className="mt-3 grid gap-2">
                  {item.options.map((option, idx) => (
                    <button
                      key={option}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                        picked === idx
                          ? idx === item.correctIndex
                            ? "border-emerald-300 bg-emerald-100"
                            : "border-red-300 bg-red-100"
                          : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50"
                      }`}
                      onClick={() => answerGuess(item, idx)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Classification Challenge</h3>
          <p className="text-sm text-gray-700">Classify each message as spam or not spam.</p>
          {classificationSet.map((item) => {
            const picked = classified[item.id];
            const correct = picked === item.label;
            return (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-gray-800">{item.text}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    onClick={() => classifyItem(item, "spam")}
                  >
                    Spam
                  </button>
                  <button
                    className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                    onClick={() => classifyItem(item, "not-spam")}
                  >
                    Not Spam
                  </button>
                </div>
                {picked && (
                  <p className={`mt-2 text-sm font-medium ${correct ? "text-emerald-700" : "text-red-700"}`}>
                    {correct ? "Great choice" : `Not quite. Correct answer: ${item.label === "not-spam" ? "Not Spam" : "Spam"}`}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isValid = useMemo(() => {
    if (mode === "register" && name.trim().length < 2) return false;
    return email.includes("@") && password.length >= 6;
  }, [mode, name, email, password]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setMessage({
        type: "error",
        text: "Please enter a valid email and a password with at least 6 characters."
      });
      return;
    }
    setMessage({
      type: "success",
      text:
        mode === "login"
          ? "Login successful (placeholder). Backend integration is planned."
          : "Registration successful (placeholder). Backend integration is planned."
    });
  };

  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{mode === "login" ? "Login" : "Register"}</h2>
      <p className="mt-2 text-sm text-gray-700">Authentication UI placeholder for upcoming backend wiring.</p>

      <form className="mt-4 space-y-3" onSubmit={submit}>
        {mode === "register" && (
          <input
            className="input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Full name"
          />
        )}
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button className="btn-primary w-full" type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        className="mt-3 text-sm font-medium text-sky-700 transition hover:text-sky-800"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </section>
  );
}

function Instructions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Instructions</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Use the top navigation bar to move between pages quickly.</li>
        <li>Open Modules and complete sections to update progress indicators.</li>
        <li>Play Quiz for instant feedback and unlock the Quiz Master badge above 80%.</li>
        <li>Try Mini-Games for algorithm guessing and spam classification practice.</li>
        <li>Use Login/Register page to test placeholder auth forms and alerts.</li>
      </ul>
    </section>
  );
}

function Disclaimer() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Disclaimer</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>This platform is for educational purposes only.</li>
        <li>Content simplifies technical topics and is not production ML advice.</li>
        <li>Always validate AI/ML decisions with domain experts in real-world use.</li>
      </ul>
    </section>
  );
}

export default App;
