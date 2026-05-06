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

    const newLines = text.replace(/\r?\n$/, "").split(/\r?\n/).length;
    setLineCount(11 + newLines);
  };

  useEffect(() => {
    if (editableRef.current) {
      const container = editableRef.current.closest(".overflow-auto");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [userCode]);

  return (
    <section className="relative flex items-start sm:items-center justify-center overflow-x-hidden pt-8 pb-28 sm:py-12 md:py-16 lg:py-0 sm:min-h-[calc(100vh-64px)]">
      <div className="w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-full">
        {/* Left Column: Text Content */}
        <div className="order-1 lg:order-1 space-y-6 text-center lg:text-left pointer-events-auto">
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-vscode-accent font-mono text-base sm:text-lg tracking-wider">
              Hi, I am
            </h2>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] [text-shadow:0_3px_18px_rgba(7,14,24,0.38)]">
              <LiquidName />
            </h1>

            <h3 className="text-2xl sm:text-3xl text-vscode-text/95 font-display font-medium [text-shadow:0_2px_14px_rgba(9,16,29,0.3)]">
              Frontend <span className="text-vscode-string">Engineer</span>
            </h3>
          </div>

          <p className="text-vscode-text text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-100 leading-relaxed font-sans [text-shadow:0_2px_12px_rgba(7,14,24,0.25)]">
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
          className="order-2 lg:order-2 animate-fade-in-up delay-200 w-full max-w-full min-w-0 overflow-visible pointer-events-auto"
          style={{ perspective: "1000px" }}
        >
          <WindowFrame
            title="prabin.tsx — portfolio"
            icon={VscCode}
            containerClassName="w-full max-w-full transition-all duration-500 active:scale-[0.98] md:hover:shadow-2xl md:hover:shadow-vscode-accent/20 md:hover:[transform:rotateY(-5deg)_rotateX(2deg)_scale(1.02)]"
          >
            <div className="flex flex-1 min-h-[240px] sm:min-h-[350px] md:min-h-[400px]">
              {/* Activity Bar - hidden on very small screens */}
              <div className="hidden sm:flex w-12 bg-vscode-surface border-r border-vscode-border flex-col items-center py-4 gap-6 text-vscode-muted">
                <VscExtensions className="text-2xl hover:text-white cursor-pointer" />
                <VscSearch className="text-2xl hover:text-white cursor-pointer" />
                <VscSourceControl className="text-2xl hover:text-white cursor-pointer" />
                <VscDebugAlt className="text-2xl hover:text-white cursor-pointer" />
              </div>

              {/* Editor Area */}
              <div
                className="min-w-0 flex-1 p-3 sm:p-4 md:p-6 font-mono text-[12px] sm:text-[12px] md:text-[13px] overflow-hidden flex cursor-text leading-6"
                onClick={() => editableRef.current?.focus()}
              >
                <div className="text-vscode-muted select-none pr-2 sm:pr-4 text-right border-r border-vscode-border/30 mr-4 flex-shrink-0">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i} className="h-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div className="min-w-0 flex-1 overflow-x-auto outline-none">
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
                  />
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>
      </div>

      <LiquidNameStyles />
    </section>
  );
}

function LiquidName() {
  const firstName = "Prabin";
  const lastName = "Acharya";

  const firstNameDrops = {
    P: { delay: "0.9s", x: "58%", fall: "118px" },
    r: { delay: "7.6s", x: "53%", fall: "104px" },
    a: { delay: "13.8s", x: "49%", fall: "126px" },
    b: { delay: "21.5s", x: "55%", fall: "112px" },
    i: { delay: "28.2s", x: "50%", fall: "96px" },
    n: { delay: "35.6s", x: "56%", fall: "120px" },
  };

  const lastNameDrops = {
    A: { delay: "4.4s", x: "48%", fall: "122px" },
    c: { delay: "11.2s", x: "50%", fall: "106px" },
    h: { delay: "18.6s", x: "56%", fall: "116px" },
    a: { delay: "25.4s", x: "49%", fall: "124px" },
    r: { delay: "32.7s", x: "52%", fall: "102px" },
    y: { delay: "39.1s", x: "51%", fall: "132px" },
  };

  return (
    <span className="liquid-name" aria-label="Prabin Acharya">
      <span className="liquid-word">
        {firstName.split("").map((char, index) => {
          const drop = firstNameDrops[char] || {
            delay: `${index * 4}s`,
            x: "50%",
            fall: "112px",
          };

          return (
            <LiquidLetter
              key={`first-${char}-${index}`}
              char={char}
              delay={drop.delay}
              x={drop.x}
              fall={drop.fall}
            />
          );
        })}
      </span>

      <span className="liquid-space" aria-hidden="true">
        {" "}
      </span>

      <span className="liquid-word text-vscode-keyword">
        {lastName.split("").map((char, index) => {
          const drop = lastNameDrops[char] || {
            delay: `${index * 4.5}s`,
            x: "50%",
            fall: "112px",
          };

          return (
            <LiquidLetter
              key={`last-${char}-${index}`}
              char={char}
              delay={drop.delay}
              x={drop.x}
              fall={drop.fall}
            />
          );
        })}
      </span>
    </span>
  );
}

function LiquidLetter({ char, delay, x, fall }) {
  const letterRef = useRef(null);
  const [dynamicFall, setDynamicFall] = useState(fall || "118px");

  useEffect(() => {
    const parseSeconds = (value) => {
      if (typeof value !== "string") return Number(value) || 0;
      const trimmed = value.trim();
      if (trimmed.endsWith("ms")) return parseFloat(trimmed) / 1000;
      if (trimmed.endsWith("s")) return parseFloat(trimmed);
      return parseFloat(trimmed) || 0;
    };

    const getAnimationDuration = () => (window.innerWidth <= 640 ? 46 : 36);
    const getSeaImpactY = () => window.innerHeight * (window.innerWidth <= 768 ? 0.78 : 0.72);

    const updateFallDistance = () => {
      const node = letterRef.current;
      if (!node) return 0;

      const rect = node.getBoundingClientRect();
      const fallbackFall = parseFloat(fall) || 118;
      const seaY = getSeaImpactY();
      const measuredFall = seaY - rect.bottom;
      const nextFall = Math.max(fallbackFall, measuredFall);

      setDynamicFall(`${Math.round(nextFall)}px`);
      return nextFall;
    };

    updateFallDistance();

    const handleResize = () => updateFallDistance();
    window.addEventListener("resize", handleResize);

    const delaySeconds = parseSeconds(delay);
    const durationSeconds = getAnimationDuration();
    // Trigger very near visible contact, then align to next paint frame so it
    // doesn't appear one frame early vs CSS animation.
    const impactAt = durationSeconds * 0.1205;

    let intervalId;

    const emitImpact = () => {
      const node = letterRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const impactX = rect.left + rect.width * ((parseFloat(x) || 50) / 100);
      const impactY = getSeaImpactY();

      window.dispatchEvent(
        new CustomEvent("portfolio-droplet-impact", {
          detail: {
            x: impactX,
            y: impactY,
            char,
          },
        })
      );
    };

    const emitImpactOnPaint = () =>
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => emitImpact())
      );

    const timeoutId = window.setTimeout(() => {
      emitImpactOnPaint();
      intervalId = window.setInterval(
        emitImpactOnPaint,
        durationSeconds * 1000
      );
    }, (delaySeconds + impactAt) * 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [char, delay, fall, x]);

  return (
    <span
      ref={letterRef}
      className="liquid-letter"
      style={{
        "--drop-delay": delay,
        "--drop-x": x || "50%",
        "--drop-fall": dynamicFall,
      }}
    >
      <span className="liquid-letter-text">{char}</span>

      {/* top-fed trickle that follows glyph surfaces */}
      <LiquidTrickle char={char} />

      {/* wide wet part attached to the letter bottom */}
      <span className="liquid-bridge" aria-hidden="true" />

      {/* actual falling drop */}
      <span className="liquid-drop-tint" aria-hidden="true" />
      <span className="liquid-drop" aria-hidden="true" />

      {/* collision mark */}
      <span className="liquid-splash" aria-hidden="true" />
    </span>
  );
}

const TRICKLE_PATHS = {
  P: [
    "M20 8 L20 84",
    "M20 10 C46 10 58 18 58 32 C58 46 45 54 30 54",
  ],
  r: [
    "M24 18 L24 84",
    "M24 24 C36 18 46 20 52 30 C47 33 40 38 36 44",
  ],
  a: [
    "M47 28 C56 34 60 44 59 56 C58 70 50 81 39 84 C27 86 18 77 18 65 C18 53 27 45 39 45 C47 45 53 49 56 56",
    "M58 20 C58 40 58 62 58 84",
  ],
  b: [
    "M21 8 L21 84",
    "M22 44 C34 40 48 44 54 54 C60 63 58 76 49 82 C42 87 30 86 23 80",
  ],
  i: [
    "M40 26 L40 84",
    "M40 8 L40 15",
  ],
  n: [
    "M22 24 L22 84",
    "M22 38 C30 22 50 22 57 36 C60 42 60 54 60 84",
  ],
  A: [
    "M22 84 L32 52 L40 28 L47 10",
    "M58 84 L50 52 L43 28 L36 10",
  ],
  c: [
    "M58 34 C52 24 42 20 33 22 C22 25 16 36 16 50 C16 65 23 76 35 79 C44 81 52 77 58 69",
  ],
  h: [
    "M22 8 L22 84",
    "M22 44 C30 28 50 26 58 38 C62 44 62 54 62 84",
  ],
  y: [
    "M24 24 C29 34 35 44 40 54",
    "M56 24 C50 42 45 62 38 82 C34 92 30 96 23 96",
  ],
};

function LiquidTrickle({ char }) {
  const paths = TRICKLE_PATHS[char] || [];

  return (
    <span className="liquid-trickle-surface" aria-hidden="true">
      <svg
        className="liquid-trickle-svg"
        viewBox="0 0 80 96"
        preserveAspectRatio="none"
      >
        {paths.map((d, idx) => (
          <path
            key={`${char}-trickle-${idx}`}
            d={d}
            className={`liquid-trickle-path liquid-trickle-path-${idx + 1}`}
          />
        ))}
      </svg>
    </span>
  );
}

function LiquidNameStyles() {
  return (
    <style>{`
      .liquid-name {
        position: relative;
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        overflow: visible;
        isolation: isolate;
      }

      .liquid-word {
        display: inline-flex;
        align-items: baseline;
        overflow: visible;
      }

      .liquid-space {
        width: 0.28em;
        flex-shrink: 0;
      }

      .liquid-letter {
        position: relative;
        display: inline-block;
        overflow: visible;
        transform: translateZ(0);
      }

      .liquid-letter-text {
        position: relative;
        z-index: 3;
      }

      .liquid-trickle-surface {
        position: absolute;
        left: 50%;
        top: -0.06em;
        width: 0.92em;
        height: 1.08em;
        min-width: 20px;
        transform: translateX(-50%);
        pointer-events: none;
        z-index: 6;
      }

      .liquid-trickle-svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .liquid-trickle-path {
        fill: none;
        stroke: color-mix(in srgb, currentColor 45%, rgba(172, 232, 255, 0.78) 55%);
        stroke-linecap: round;
        stroke-width: 3;
        opacity: 0;
        filter: blur(0.35px);
        pointer-events: none;
        mix-blend-mode: screen;
        stroke-dasharray: 150;
        stroke-dashoffset: 150;
        animation: liquid-surface-trickle 36s linear infinite;
        animation-delay: var(--drop-delay);
      }

      .liquid-trickle-path-2 {
        stroke-width: 2.7;
        opacity: 0;
        animation-delay: calc(var(--drop-delay) + 0.18s);
      }

      /*
        This is the important part.
        Instead of spawning a small bead from nowhere,
        the drop begins as a wide wet strip connected to the letter bottom.
      */
      .liquid-bridge {
        position: absolute;
        left: var(--drop-x);
        bottom: 0;
        width: 62%;
        height: 0.115em;
        min-width: 10px;
        border-radius: 999px;
        transform: translate3d(-50%, 0, 0) scaleX(0);
        transform-origin: 50% 50%;
        opacity: 0;
        pointer-events: none;
        z-index: 2;
        filter: blur(0.9px);
        background:
          radial-gradient(
            ellipse at center,
            color-mix(in srgb, currentColor 46%, rgba(95, 198, 255, 0.9) 54%),
            rgba(63, 179, 255, 0.46) 44%,
            transparent 72%
          );
        animation: liquid-bridge-form 36s linear infinite;
        animation-delay: var(--drop-delay);
      }

      .liquid-drop {
        position: absolute;
        left: var(--drop-x);
        bottom: 0;
        width: 0.2em;
        height: 0.24em;
        min-width: 8px;
        min-height: 10px;
        border-radius: 55% 55% 66% 66% / 45% 45% 74% 74%;
        opacity: 0;
        pointer-events: none;
        z-index: 4;
        transform-origin: 50% 0%;
        transform: translate3d(-50%, 0, 0) scale(0);
        will-change: transform, opacity, filter;

        /*
          The drop uses currentColor so it borrows part of the letter color.
          White letters create a white-blue drop.
          Accent letters create a more accent-blue/green drop.
        */
        background:
          radial-gradient(circle at 31% 20%, rgba(255, 255, 255, 0.98) 0 9%, transparent 10%),
          radial-gradient(circle at 62% 66%, rgba(255, 255, 255, 0.34), transparent 42%),
          radial-gradient(circle at 56% 78%, rgba(196, 235, 255, 0.3), transparent 52%),
          radial-gradient(
            circle at 46% 34%,
            color-mix(in srgb, currentColor 28%, rgba(210, 241, 255, 0.88) 72%) 0%,
            rgba(148, 216, 252, 0.62) 42%,
            rgba(70, 165, 234, 0.48) 68%,
            rgba(24, 96, 168, 0.34) 86%,
            rgba(8, 50, 98, 0.16) 100%
          );

        box-shadow:
          inset -0.045em -0.065em 0.09em rgba(10, 60, 122, 0.24),
          inset 0.06em 0.05em 0.08em rgba(255, 255, 255, 0.6),
          0 0.12em 0.3em rgba(84, 187, 245, 0.18),
          0 0.02em 0.07em rgba(255, 255, 255, 0.24);

        mix-blend-mode: screen;
        opacity: 0.9;
        backdrop-filter: blur(0.4px);
        animation: liquid-drop-fast-gravity 36s linear infinite;
        animation-delay: var(--drop-delay);
      }

      .liquid-drop-tint {
        position: absolute;
        left: var(--drop-x);
        bottom: 0;
        width: 0.22em;
        height: 0.26em;
        min-width: 9px;
        min-height: 11px;
        border-radius: 55% 55% 66% 66% / 45% 45% 74% 74%;
        opacity: 0;
        pointer-events: none;
        z-index: 5;
        transform-origin: 50% 0%;
        transform: translate3d(-50%, 0, 0) scale(0);
        will-change: transform, opacity, filter;
        background:
          radial-gradient(
            circle at 45% 34%,
            color-mix(in srgb, currentColor 78%, rgba(255, 255, 255, 0.22) 22%),
            color-mix(in srgb, currentColor 58%, rgba(90, 194, 255, 0.42) 42%) 58%,
            rgba(90, 194, 255, 0) 88%
          );
        filter: blur(0.35px);
        mix-blend-mode: screen;
        animation: liquid-drop-tint-attach 36s linear infinite;
        animation-delay: var(--drop-delay);
      }

      .liquid-drop::before {
        content: "";
        position: absolute;
        top: 17%;
        left: 28%;
        width: 29%;
        height: 22%;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.95);
        filter: blur(0.35px);
        transform: rotate(-22deg);
      }

      .liquid-splash {
        position: absolute;
        left: var(--drop-x);
        bottom: calc(-1 * var(--drop-fall));
        width: 0.72em;
        height: 0.13em;
        min-width: 24px;
        border-radius: 999px;
        background:
          radial-gradient(
            ellipse at center,
            color-mix(in srgb, currentColor 28%, rgba(105, 205, 255, 0.88) 72%),
            rgba(90, 194, 255, 0.24) 48%,
            transparent 74%
          );
        opacity: 0;
        filter: blur(1px);
        pointer-events: none;
        z-index: 1;
        transform: translate3d(-50%, 0, 0) scaleX(0);
        animation: liquid-impact-splash 36s ease-out infinite;
        animation-delay: var(--drop-delay);
      }

      /*
        The bridge forms from the full lower width of the character.
        It becomes heavy, narrows, then disappears exactly when the drop detaches.
      */
      @keyframes liquid-bridge-form {
        0%, 2.6%, 100% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scaleX(0);
        }

        3.1% {
          opacity: 0.26;
          transform: translate3d(-50%, 0, 0) scaleX(0.45);
        }

        3.9% {
          opacity: 0.58;
          transform: translate3d(-50%, 0, 0) scaleX(0.96);
        }

        5.1% {
          opacity: 0.72;
          transform: translate3d(-50%, 0.012em, 0) scaleX(1);
        }

        6.0% {
          opacity: 0.62;
          transform: translate3d(-50%, 0.026em, 0) scaleX(0.58);
        }

        6.8% {
          opacity: 0.32;
          transform: translate3d(-50%, 0.038em, 0) scaleX(0.28);
        }

        7.15% {
          opacity: 0;
          transform: translate3d(-50%, 0.024em, 0) scaleX(0);
        }

        7.16%, 100% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scaleX(0);
        }
      }

      @keyframes liquid-surface-trickle {
        0%, 2.95%, 100% {
          opacity: 0;
          stroke-dashoffset: 150;
        }

        3.15% {
          opacity: 0.38;
          stroke-dashoffset: 132;
        }

        3.9% {
          opacity: 0.5;
          stroke-dashoffset: 92;
        }

        4.8% {
          opacity: 0.46;
          stroke-dashoffset: 48;
        }

        5.7% {
          opacity: 0.34;
          stroke-dashoffset: 8;
        }

        6.5% {
          opacity: 0.22;
          stroke-dashoffset: 0;
        }

        7.1%, 100% {
          opacity: 0;
          stroke-dashoffset: -6;
        }
      }

      /*
        This fixes the jump.

        The drop starts wide and flat while connected.
        Then it stretches downward while still attached.
        After detach, every keyframe only moves downward.
        No upward movement.
        No first-frame bounce.
        Faster fall than before.
      */
      @keyframes liquid-drop-fast-gravity {
        0%, 2.8%, 100% {
          opacity: 0;
          filter: blur(0px);
          transform: translate3d(-50%, 0, 0) scale(0);
        }

        /*
          Wide liquid mass attached to the bottom of the letter.
          This makes it feel like it comes from the full lower surface,
          not from a random corner.
        */
        3.4% {
          opacity: 0.38;
          transform: translate3d(-50%, 0, 0) scale(1.45, 0.18);
        }

        4.4% {
          opacity: 0.82;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.004), 0) scale(1.25, 0.32);
        }

        5.3% {
          opacity: 1;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.012), 0) scale(0.82, 0.86);
        }

        /*
          Heavy stretch before detaching.
          Still connected visually through liquid-bridge.
        */
        6.2% {
          opacity: 1;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.018), 0) scale(0.58, 1.52);
        }

        /*
          Detach point.
          From here onward it only falls down.
        */
        7.0% {
          opacity: 1;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.024), 0) scale(0.82, 1.08);
        }

        /*
          Fast gravity curve.
          Roughly y = t² visual spacing.
          It starts slow then accelerates sharply.
        */
        7.7% {
          opacity: 0.99;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.07), 0) scale(0.9, 1.04);
        }

        8.4% {
          opacity: 0.98;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.17), 0) scale(0.95, 1.02);
        }

        9.1% {
          opacity: 0.97;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.29), 0) scale(0.98, 1);
        }

        9.8% {
          opacity: 0.96;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.44), 0) scale(1, 0.98);
        }

        10.5% {
          opacity: 0.95;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.63), 0) scale(1.02, 0.96);
        }

        11.2% {
          opacity: 0.93;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.82), 0) scale(1.04, 0.94);
        }

        /*
          Impact.
          No bounce upward. It just squashes and disappears.
        */
        11.85% {
          opacity: 0.9;
          filter: blur(0.08px);
          transform: translate3d(-50%, var(--drop-fall), 0) scale(1.36, 0.52);
        }

        12.45% {
          opacity: 0.42;
          filter: blur(0.45px);
          transform: translate3d(-50%, var(--drop-fall), 0) scale(1.85, 0.2);
        }

        13.25% {
          opacity: 0;
          filter: blur(1.2px);
          transform: translate3d(-50%, var(--drop-fall), 0) scale(0.72, 0.1);
        }

        13.26%, 100% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scale(0);
        }
      }

      @keyframes liquid-drop-tint-attach {
        0%, 2.8%, 100% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scale(0);
        }

        3.4% {
          opacity: 0.44;
          transform: translate3d(-50%, 0, 0) scale(1.42, 0.2);
        }

        4.4% {
          opacity: 0.4;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.003), 0) scale(1.16, 0.34);
        }

        5.3% {
          opacity: 0.34;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.01), 0) scale(0.84, 0.9);
        }

        6.2% {
          opacity: 0.27;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.022), 0) scale(0.62, 1.44);
        }

        6.95% {
          opacity: 0.18;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.04), 0) scale(0.78, 1.12);
        }

        7.05%, 100% {
          opacity: 0;
          transform: translate3d(-50%, calc(var(--drop-fall) * 0.026), 0) scale(0.78, 1.02);
        }
      }

      @keyframes liquid-impact-splash {
        0%, 11.6%, 100% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scaleX(0);
        }

        12.0% {
          opacity: 0.62;
          transform: translate3d(-50%, 0, 0) scaleX(0.72);
        }

        12.65% {
          opacity: 0.28;
          transform: translate3d(-50%, 0, 0) scaleX(1.35);
        }

        13.45% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0) scaleX(1.9);
        }
      }

      @media (max-width: 640px) {
        .liquid-drop,
        .liquid-drop-tint,
        .liquid-trickle-path,
        .liquid-bridge,
        .liquid-splash {
          animation-duration: 46s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .liquid-drop,
        .liquid-drop-tint,
        .liquid-trickle-path,
        .liquid-bridge,
        .liquid-splash {
          animation: none !important;
          opacity: 0 !important;
        }
      }
    `}</style>
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
