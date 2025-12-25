import { useState } from "react";
import { VscTerminal } from "react-icons/vsc";
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
          title="contact-form.sh"
          icon={VscTerminal}
          containerClassName="animate-fade-in-up"
        >
          {/* Terminal Body */}
          <div className="p-6 sm:p-8 font-mono text-sm sm:text-base bg-[#0d1117] text-[#c9d1d9]">
            <div className="mb-8 text-vscode-muted/80">
              <p>Last login: {new Date().toDateString()} on ttys000</p>
              <p>Type your message below to execute send_mail.sh</p>
            </div>

            {/* Status Messages */}
            {status.message && (
              <div
                className={`mb-6 p-4 rounded-lg border transition-all duration-300 ${
                  status.type === "success"
                    ? "bg-green-900/10 border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                    : "bg-red-900/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="group space-y-2">
                <div className="flex items-center gap-2 text-[#27c93f]">
                  <span>➜</span>
                  <span className="text-vscode-accent">~</span>
                  <span className="text-vscode-muted group-focus-within:text-vscode-accent transition-colors">
                    enter_name:
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-vscode-surface/30 border border-transparent focus:border-vscode-border hover:bg-vscode-surface/50 p-3 rounded-lg focus:ring-0 text-white focus:outline-none caret-vscode-accent transition-all pl-6"
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Input */}
              <div className="group space-y-2">
                <div className="flex items-center gap-2 text-[#27c93f]">
                  <span>➜</span>
                  <span className="text-vscode-accent">~</span>
                  <span className="text-vscode-muted group-focus-within:text-vscode-accent transition-colors">
                    enter_email:
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-vscode-surface/30 border border-transparent focus:border-vscode-border hover:bg-vscode-surface/50 p-3 rounded-lg focus:ring-0 text-white focus:outline-none caret-vscode-accent transition-all pl-6"
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Input */}
              <div className="group space-y-2">
                <div className="flex items-center gap-2 text-[#27c93f]">
                  <span>➜</span>
                  <span className="text-vscode-accent">~</span>
                  <span className="text-vscode-muted group-focus-within:text-vscode-accent transition-colors">
                    enter_message:
                  </span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-vscode-surface/30 border border-transparent focus:border-vscode-border hover:bg-vscode-surface/50 p-3 rounded-lg focus:ring-0 text-white focus:outline-none caret-vscode-accent resize-none h-32 transition-all pl-6"
                  placeholder="Type your message here..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-vscode-surface border border-vscode-border hover:border-vscode-accent text-vscode-accent hover:text-white transition-all rounded-lg group disabled:opacity-50 shadow-lg hover:shadow-vscode-accent/5 active:scale-95"
                >
                  <span className="text-[#27c93f]">$</span>
                  <span>
                    {isSubmitting ? "Sending..." : "./send_message.sh"}
                  </span>
                  {!isSubmitting && <span className="animate-pulse">_</span>}
                </button>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="mt-6 pt-6 border-t border-vscode-border text-vscode-muted text-xs">
              <p>
                Or email me directly at:{" "}
                <a
                  href="mailto:acharyaprabin03@gmail.com"
                  className="text-vscode-accent hover:underline"
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
