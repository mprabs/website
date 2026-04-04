import { workExperiences } from "../data/data";
import { VscGitPullRequest } from "react-icons/vsc";
import WindowFrame from "../components/WindowFrame";

export default function WorkExperience() {
  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pointer-events-auto">
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-vscode-accent">02.</span> Work Experience
          </h2>
        </div>

        <WindowFrame
          title="experience.git — log"
          icon={VscGitPullRequest}
          containerClassName="animate-fade-in-up"
        >
          <div className="p-6 sm:p-10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-mono text-vscode-accent">
                  Career timeline
                </p>
                <p className="mt-1 max-w-2xl text-sm text-vscode-muted leading-relaxed">
                  Rewritten to read closer to a real resume: specific product work,
                  clearer frontend ownership, and the React ecosystem tools I
                  actually work around.
                </p>
              </div>
            </div>

            <div className="relative space-y-10">
              <div className="pointer-events-none absolute left-[7px] top-2 bottom-4 w-px bg-gradient-to-b from-vscode-border via-vscode-border to-vscode-function/70" />
              {workExperiences.map((exp, index) => (
                <div key={index} className="relative group pl-8 sm:pl-10">
                  {/* Timeline Node */}
                  <div className="absolute left-[7px] top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-vscode-muted bg-vscode-bg group-hover:border-vscode-accent group-hover:scale-110 transition-all duration-300 z-10 flex items-center justify-center shadow-[0_0_0_4px_rgba(13,17,23,0.9)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-vscode-muted group-hover:bg-vscode-accent transition-colors"></div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-vscode-surface/50 border border-vscode-border rounded-xl p-6 hover:border-vscode-accent hover:bg-vscode-surface transition-all duration-300 shadow-lg group-hover:shadow-vscode-accent/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-vscode-muted font-mono mb-2">
                          {exp.company}
                        </p>
                        <h3 className="text-xl font-bold text-vscode-accent">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-vscode-muted bg-vscode-bg border border-vscode-border px-2 py-1 rounded">
                        <span>•</span>
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {exp.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-vscode-border bg-vscode-bg px-2.5 py-1 text-[11px] font-mono text-vscode-text/85"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-vscode-text/90 group/item"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-vscode-border group-hover/item:bg-vscode-string transition-colors flex-shrink-0"></span>
                          <span className="text-sm leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Initial Commit */}
              <div className="relative group pl-8 sm:pl-10">
                <div className="absolute left-[7px] top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-vscode-function bg-vscode-bg z-10 flex items-center justify-center shadow-[0_0_0_4px_rgba(13,17,23,0.9)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-vscode-function"></div>
                </div>
                <div className="pt-0.5">
                  <span className="text-vscode-muted font-mono text-sm">
                    Initial commit: Started Career
                  </span>
                </div>
              </div>
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
