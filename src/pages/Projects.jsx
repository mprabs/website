import { projects } from "../data/data";
import ProjectCard from "../components/ProjectCard";
import { FiZap } from "react-icons/fi";

export default function Projects() {
  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-auto">
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-vscode-accent">03.</span> Projects
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {["sharelook", "professional", "personal"].map((category) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 capitalize">
                  <FiZap className="text-vscode-accent" />
                  {category} Projects
                </h2>
                <div className="h-px flex-1 bg-vscode-border"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
