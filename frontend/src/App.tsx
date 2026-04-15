import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, Route, Routes } from "react-router-dom";

type ModuleCard = {
  id: string;
  title: string;
  level: string;
  description: string;
};

function App() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-slate-100/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-slate-800">
            MindML
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-sm md:gap-5">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/modules">Modules</NavItem>
            <NavItem to="/instructions">Instructions</NavItem>
            <NavItem to="/disclaimer">Disclaimer</NavItem>
            <Link
              to="/auth"
              className="rounded-lg bg-sky-600 px-3 py-2 font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="rounded px-2 py-1 text-slate-700 transition hover:bg-white hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
    >
      {children}
    </Link>
  );
}

function Home() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-panel p-6 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">MindML - Learning Platform</h1>
      <p className="mt-3 max-w-3xl text-gray-700">
        Learn AI/ML through clear modules, practical examples, and lightweight gamification designed for a calm,
        focused learning experience.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Feature title="Structured Learning" text="Beginner to advanced path with concept-first explanations." />
        <Feature title="Hands-on Practice" text="Interactive quiz and coding-ready learning flow." />
        <Feature title="Progress Visibility" text="Dashboard-friendly layout and achievement mindset." />
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
          <article key={module.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-sky-700">{module.level}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{module.title}</h3>
            <p className="mt-2 flex-1 text-sm text-gray-700">{module.description}</p>
            <button className="btn-primary mt-5">Start</button>
          </article>
        ))}
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
        <li>Open Modules and pick Beginner, Intermediate, or Advanced track.</li>
        <li>Use the Login/Register page to test form behavior and alerts.</li>
        <li>Follow the calm, readable interface for focused learning sessions.</li>
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
