import { workExperiences } from "../data/data";
import { VscGitPullRequest } from "react-icons/vsc";
import WindowFrame from "../components/WindowFrame";

export default function WorkExperience() {
  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pointer-events-auto">
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
          <div className="p-5 sm:p-7 md:p-9">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-mono text-vscode-accent">
                  Career Journey
                </p>
                <p className="mt-1 max-w-2xl text-sm text-vscode-muted leading-relaxed">
                  A concise timeline of companies, roles, and real product
                  impact across frontend-focused teams.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none hidden md:block absolute left-[11px] top-2 bottom-10 w-px bg-gradient-to-b from-vscode-border via-vscode-border to-vscode-accent/80" />
              {workExperiences.map((exp, index) => (
                <article
                  key={index}
                  className="group relative border-b border-vscode-border/80 last:border-b-0 py-6 md:py-7 md:pl-12 transition-colors duration-200 hover:bg-vscode-surface/20"
                >
                  <div className="hidden md:flex absolute left-[11px] top-10 -translate-x-1/2 h-5 w-5 items-center justify-center rounded-full border-2 border-vscode-border bg-vscode-bg group-hover:border-vscode-accent transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-vscode-muted group-hover:bg-vscode-accent transition-colors" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto] md:items-start">
                      <div className="space-y-2">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-vscode-muted font-mono">
                          {exp.company}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-vscode-accent transition-colors leading-tight">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-md border border-vscode-border bg-vscode-bg/60 px-3 py-1.5 text-xs font-mono text-vscode-muted w-fit">
                        <span className="h-1.5 w-1.5 rounded-full bg-vscode-accent/80" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-vscode-border bg-vscode-surface/60 px-2.5 py-1 text-[11px] font-mono text-vscode-text/85"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2.5">
                      {exp.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-vscode-text/90"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-vscode-border group-hover:bg-vscode-accent/80 transition-colors flex-shrink-0" />
                          <span className="text-sm leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

              <div className="pt-6 md:pl-12">
                <p className="text-vscode-muted font-mono text-xs sm:text-sm">
                  Initial commit: Started professional frontend journey
                </p>
              </div>
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
