import { topProjects, projects } from "../data/data";
import ProjectCard from "../components/ProjectCard";
import { FiStar, FiZap, FiGithub, FiArrowRight } from "react-icons/fi";

export default function Projects() {
  const topProjectsGridClass = "grid grid-cols-1 gap-4 sm:gap-5";
  const categoryTitles = {
    sharelook: "Sharelook Projects",
    professional: "Professional Projects",
    personal: "Personal Projects",
  };

  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 border-b border-vscode-border pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-vscode-accent">03.</span> Projects
          </h1>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {!!topProjects.length && (
            <div>
              <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <FiStar className="text-vscode-accent" />
                  Top Projects
                </h2>
              </div>
              <div className={topProjectsGridClass}>
                {topProjects.map((project, index) => (
                  <ProjectCard key={`top-${index}`} project={project} />
                ))}
              </div>
            </div>
          )}

          {["sharelook", "professional", "personal"].map((category) => (
            <div key={category}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <FiZap className="text-vscode-accent" />
                  {categoryTitles[category]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {projects[category].map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-vscode-border bg-vscode-surface p-5 sm:p-6 md:p-7">
            <div className="flex flex-col gap-4 sm:gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.14em] font-mono text-vscode-muted">
                  Open Source
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  More projects on GitHub
                </h3>
                <p className="text-sm sm:text-[15px] text-vscode-text leading-relaxed">
                  Explore additional experiments, archived builds, and ongoing
                  work in my public repositories.
                </p>
              </div>

              <a
                href="https://github.com/mprabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-vscode-accent/10 border border-vscode-accent/50 text-vscode-accent rounded-lg font-mono text-sm transition-colors hover:bg-vscode-accent/20 w-full sm:w-auto"
              >
                <FiGithub />
                <span>More on GitHub</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
