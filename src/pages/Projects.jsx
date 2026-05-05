import { topProjects, projects } from "../data/data";
import ProjectCard from "../components/ProjectCard";
import { FiStar, FiZap } from "react-icons/fi";

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
                <div className="h-px flex-1 bg-vscode-border" />
              </div>
              <div className={topProjectsGridClass}>
                {topProjects.map((project, index) => (
                  <ProjectCard key={`top-${index}`} project={project} emphasis />
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
                <div className="h-px flex-1 bg-vscode-border"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {projects[category].map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                    emphasis={category === "professional"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
