import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 font-display font-semibold text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          AIML Learn
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/instructions" className="hover:text-foreground transition-colors">Instructions</Link>
          <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 AIML Learn. For educational purposes only.</p>
      </div>
    </footer>
  );
}
