import React, { useState, useRef, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import {
  VscCode,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscSearch,
} from "react-icons/vsc";
import WindowFrame from "../components/WindowFrame";

export default function Hero() {
  const [userCode, setUserCode] = useState("");
  const [lineCount, setLineCount] = useState(12);
  const editableRef = useRef(null);

  const staticCodeLines = [
    { type: "keyword", text: "const" },
    { type: "function", text: " Developer" },
    { type: "plain", text: " = " },
    { type: "keyword", text: "new" },
    { type: "accent", text: " Person" },
    { type: "plain", text: "({" },
    { type: "plain", text: "  name: " },
    { type: "string", text: "'Prabin Acharya'" },
    { type: "plain", text: "," },
    { type: "plain", text: "  role: " },
    { type: "string", text: "'Frontend Engineer'" },
    { type: "plain", text: "," },
    { type: "plain", text: "  skills: [" },
    { type: "string", text: "'React'" },
    { type: "plain", text: ", " },
    { type: "string", text: "'Tailwind'" },
    { type: "plain", text: ", " },
    { type: "string", text: "'Node.js'" },
    { type: "plain", text: "]," },
    { type: "plain", text: "  hardWorker: " },
    { type: "keyword", text: "true" },
    { type: "plain", text: "," },
    { type: "plain", text: "  quickLearner: " },
    { type: "keyword", text: "true" },
    { type: "plain", text: "," },
    { type: "plain", text: "  hireable: " },
    { type: "function", text: "function" },
    { type: "plain", text: "() {" },
    { type: "plain", text: "    return " },
    { type: "keyword", text: "this" },
    { type: "plain", text: ".hardWorker && " },
    { type: "keyword", text: "this" },
    { type: "plain", text: ".quickLearner;" },
    { type: "plain", text: "  }" },
    { type: "plain", text: "});" },
  ];

  // Group static code into lines for rendering
  const lines = [
    <>
      <span className="text-vscode-keyword">const</span>{" "}
      <span className="text-vscode-function">Developer</span> ={" "}
      <span className="text-vscode-keyword">new</span>{" "}
      <span className="text-vscode-accent">Person</span>({"{"}
    </>,
    <>
      {"  "}name: <span className="text-vscode-string">'Prabin Acharya'</span>,
    </>,
    <>
      {"  "}role:{" "}
      <span className="text-vscode-string">'Frontend Engineer'</span>,
    </>,
    <>
      {"  "}skills: [<span className="text-vscode-string">'React'</span>,{" "}
      <span className="text-vscode-string">'Tailwind'</span>,{" "}
      <span className="text-vscode-string">'Node.js'</span>],
    </>,
    <>
      {"  "}hardWorker: <span className="text-vscode-keyword">true</span>,
    </>,
    <>
      {"  "}quickLearner: <span className="text-vscode-keyword">true</span>,
    </>,
    <>
      {"  "}hireable: <span className="text-vscode-function">function</span>(){" "}
      {"{"}
    </>,
    <>
      {"    "}
      <span className="text-vscode-keyword">return</span>{" "}
      <span className="text-vscode-keyword">this</span>.hardWorker &&{" "}
      <span className="text-vscode-keyword">this</span>.quickLearner;
    </>,
    <>
      {"  "}
      {"}"}
    </>,
    <>{"}"});</>,
    <>&nbsp;</>,
  ];

  const handleInput = (e) => {
    const text = e.target.innerText;
    setUserCode(text);
    // Split by newline and remove trailing empty line caused by browser artifact
    // In contentEditable, a single Enter often results in a trailing newline
    // to allow the cursor to reside on the new line.
    const newLines = text.replace(/\r?\n$/, "").split(/\r?\n/).length;
    setLineCount(11 + newLines);
  };

  useEffect(() => {
    // Scroll to bottom if user is typing
    if (editableRef.current) {
      // Find the scrollable container (WindowFrame content)
      const container = editableRef.current.closest(".overflow-auto");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [userCode]);

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-start sm:items-center justify-center overflow-hidden py-12 md:py-16 lg:py-0">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-full">
        {/* Left Column: Text Content */}
        <div className="order-1 lg:order-1 space-y-6 text-center lg:text-left pointer-events-auto">
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-vscode-accent font-mono text-base sm:text-lg tracking-wider">
              Hi, I am
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Prabin <span className="text-vscode-keyword">Acharya</span>
            </h1>
            <h3 className="text-2xl sm:text-3xl text-vscode-muted font-display font-medium">
              Frontend <span className="text-vscode-string">Engineer</span>
            </h3>
          </div>

          <p className="text-vscode-text/90 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-100 leading-relaxed font-sans">
            I craft high-performance, accessible, and visually stunning web
            experiences. Turning complex problems into elegant code is my
            passion.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up delay-200">
            <a
              href="/projects"
              className="px-5 sm:px-8 py-3 sm:py-3.5 bg-vscode-accent/10 hover:bg-vscode-accent/20 text-vscode-accent border border-vscode-accent/50 rounded-xl font-mono text-sm sm:text-base transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-vscode-accent/10"
            >
              <span>View Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
            <a
              href="/resume.pdf"
              download="Prabin_Acharya_Resume.pdf"
              className="px-5 sm:px-8 py-3 sm:py-3.5 bg-vscode-surface hover:bg-vscode-border border border-vscode-border text-white rounded-xl font-mono text-sm sm:text-base transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <FiDownload />
              <span>Resume</span>
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 animate-fade-in-up delay-300">
            <SocialLink
              href="https://github.com/mprabs"
              icon={<FiGithub />}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/in/paccharya"
              icon={<FiLinkedin />}
              label="LinkedIn"
            />
            <SocialLink
              href="mailto:acharyaprabin03@gmail.com"
              icon={<FiMail />}
              label="Email"
            />
          </div>
        </div>

        {/* Right Column: VS Code Mockup */}
        <div
          className="order-2 lg:order-2 animate-fade-in-up delay-200 w-full max-w-full overflow-visible pointer-events-auto"
          style={{ perspective: "1000px" }}
        >
          <WindowFrame
            title="prabin.tsx — portfolio"
            icon={VscCode}
            containerClassName="transform transition-all duration-500 hover:shadow-2xl hover:shadow-vscode-accent/20 active:scale-[0.98] hover:[transform:rotateY(-5deg)_rotateX(2deg)_scale(1.02)]"
          >
            <div className="flex flex-1 min-h-[280px] sm:min-h-[350px] md:min-h-[400px]">
              {/* Activity Bar - hidden on very small screens */}
              <div className="hidden sm:flex w-12 bg-vscode-surface border-r border-vscode-border flex-col items-center py-4 gap-6 text-vscode-muted">
                <VscExtensions className="text-2xl hover:text-white cursor-pointer" />
                <VscSearch className="text-2xl hover:text-white cursor-pointer" />
                <VscSourceControl className="text-2xl hover:text-white cursor-pointer" />
                <VscDebugAlt className="text-2xl hover:text-white cursor-pointer" />
              </div>

              {/* Editor Area */}
              <div
                className="flex-1 p-3 sm:p-4 md:p-6 font-mono text-[12px] sm:text-[12px] md:text-[13px] overflow-hidden flex cursor-text leading-6"
                onClick={() => editableRef.current?.focus()}
              >
                <div className="text-vscode-muted select-none pr-2 sm:pr-4 text-right border-r border-vscode-border/30 mr-4 flex-shrink-0">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i} className="h-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 overflow-x-auto outline-none">
                  {/* Static Code */}
                  <div className="opacity-90 pointer-events-none select-none">
                    {lines.map((line, i) => (
                      <div key={i} className="h-6 whitespace-pre">
                        {line}
                      </div>
                    ))}
                  </div>
                  {/* Editable Code */}
                  <div
                    ref={editableRef}
                    contentEditable
                    onInput={handleInput}
                    className="outline-none text-vscode-text focus:text-white transition-colors min-h-[1.5rem] whitespace-pre"
                    spellCheck="false"
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.innerText === "" &&
                        !userCode
                      ) {
                        e.preventDefault();
                      }
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-2xl text-vscode-muted hover:text-vscode-accent hover:-translate-y-1 transition-all duration-300 p-2 hover:bg-vscode-surface rounded-lg"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
