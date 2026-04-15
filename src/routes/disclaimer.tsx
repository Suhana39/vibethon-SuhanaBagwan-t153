import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
  head: () => ({
    meta: [
      { title: "Disclaimer — AIML Learn" },
      { name: "description", content: "Disclaimer for the AIML Learning Platform." },
    ],
  }),
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">
          <AlertTriangle className="mr-2 inline-block h-8 w-8 text-chart-5" />
          Disclaimer
        </h1>

        <div className="mt-8 glass-card rounded-xl p-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Educational Purpose</h2>
            <p>This platform is designed for educational purposes only. The content, quizzes, coding challenges, and simulations are intended to help users learn concepts of Artificial Intelligence and Machine Learning in an interactive and engaging manner.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">No Professional Advice</h2>
            <p>The information provided on this platform does not constitute professional, academic, or technical advice. Users should not rely solely on this platform for critical decision-making in professional AI/ML applications.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Accuracy of Content</h2>
            <p>While we strive to provide accurate and up-to-date information, the field of AI/ML evolves rapidly. Some content may become outdated. We encourage users to cross-reference with official documentation and peer-reviewed resources.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Code Execution</h2>
            <p>The coding practice environment provides a simulated execution experience. For production-grade ML work, users should use dedicated environments such as Jupyter Notebooks, Google Colab, or local Python installations.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Third-Party Links</h2>
            <p>This platform may contain links to external websites and video resources. We are not responsible for the content or privacy practices of these third-party sites.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Limitation of Liability</h2>
            <p>The platform and its creators shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this platform or reliance on its content.</p>
          </section>

          <div className="rounded-lg bg-chart-5/10 p-4 text-sm">
            <p className="font-medium text-foreground">By using this platform, you acknowledge and agree to the terms outlined in this disclaimer.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
