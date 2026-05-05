import { useState } from "react";
import { FiMail } from "react-icons/fi";
import WindowFrame from "../components/WindowFrame";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Formspree endpoint - Replace with your form ID from formspree.io
    // Get it by signing up at https://formspree.io and creating a form
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbledplr";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "✓ Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Formspree Error:", error);
      setStatus({
        type: "error",
        message:
          "✗ Failed to send message. Please try emailing me directly at acharyaprabin03@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-start sm:items-center justify-center pointer-events-auto">
      <div className="w-full max-w-3xl space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <span className="text-vscode-accent">05.</span> Contact Me
            </h1>
          </div>
        </div>

        <WindowFrame
          title="contact.md"
          icon={FiMail}
          containerClassName="animate-fade-in-up"
        >
          <div className="p-6 sm:p-8 md:p-10 bg-vscode-bg/90">
            <div className="mb-8 max-w-2xl">
              <p className="text-vscode-accent font-mono text-xs sm:text-sm uppercase tracking-[0.12em]">
                Get In Touch
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                Send me a message
              </h2>
              <p className="mt-3 text-vscode-text/80 text-sm sm:text-base leading-relaxed">
                If you want to contact me for work, collaboration, or anything
                else, send a message and I will get back to you soon.
              </p>
            </div>

            {status.message && (
              <div
                className={`mb-6 p-4 rounded-lg border text-sm sm:text-base transition-all duration-300 ${
                  status.type === "success"
                    ? "bg-green-900/10 border-green-500/30 text-green-300"
                    : "bg-red-900/10 border-red-500/30 text-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-vscode-text"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-vscode-border bg-vscode-surface/40 px-4 py-3 text-white placeholder:text-vscode-muted/70 focus:outline-none focus:border-vscode-accent/70 focus:bg-vscode-surface/60 transition-colors"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-vscode-text"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-vscode-border bg-vscode-surface/40 px-4 py-3 text-white placeholder:text-vscode-muted/70 focus:outline-none focus:border-vscode-accent/70 focus:bg-vscode-surface/60 transition-colors"
                  placeholder="Your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-vscode-text"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-lg border border-vscode-border bg-vscode-surface/40 px-4 py-3 text-white placeholder:text-vscode-muted/70 focus:outline-none focus:border-vscode-accent/70 focus:bg-vscode-surface/60 transition-colors resize-none h-36"
                  placeholder="Write your message here..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-vscode-accent/50 bg-vscode-accent/10 text-vscode-accent hover:bg-vscode-accent hover:text-vscode-bg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 font-medium"
                >
                  {isSubmitting ? "Sending message..." : "Send Message"}
                </button>
              </div>
            </form>

            <div className="mt-7 pt-6 border-t border-vscode-border text-vscode-muted text-sm">
              <p>
                Prefer email? Reach me at{" "}
                <a
                  href="mailto:acharyaprabin03@gmail.com"
                  className="text-vscode-accent hover:text-white transition-colors"
                >
                  acharyaprabin03@gmail.com
                </a>
              </p>
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
