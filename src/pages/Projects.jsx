import { featuredLaunches, projects } from "../data/data";
import ProjectCard from "../components/ProjectCard";
import { FiStar, FiZap } from "react-icons/fi";

export default function Projects() {
  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto">
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 border-b border-vscode-border pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-vscode-accent">03.</span> Projects
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="space-y-10 sm:space-y-12">
          {!!featuredLaunches.length && (
            <div className="relative overflow-hidden rounded-2xl border border-vscode-accent/40 bg-vscode-accent/5 p-4 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vscode-accent to-transparent" />
              <div className="mb-4 sm:mb-6 flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <FiStar className="text-vscode-accent" />
                  Featured Launch
                </h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-vscode-accent border border-vscode-accent/50 rounded-full px-2 py-1">
                  Distinct Build
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {featuredLaunches.map((project, index) => (
                  <ProjectCard key={`featured-${index}`} project={project} />
                ))}
              </div>
            </div>
          )}

          {["sharelook", "professional", "personal"].map((category) => (
            <div key={category}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 capitalize">
                  <FiZap className="text-vscode-accent" />
                  {category} Projects
                </h2>
                <div className="h-px flex-1 bg-vscode-border"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {projects[category].map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
