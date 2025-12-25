import { VscGithubInverted, VscGlobe } from "react-icons/vsc";

export default function ProjectCard({ project }) {
  // Check if visit link exists and is not null
  const hasVisitLink =
    (project.links?.visit || project.link) &&
    project.links?.visit !== null &&
    project.link !== null;

  return (
    <div className="bg-vscode-surface/50 border border-vscode-border hover:border-vscode-accent hover:bg-vscode-surface p-5 rounded-xl flex gap-5 transition-all duration-300 group shadow-lg hover:shadow-vscode-accent/5 hover:-translate-y-1">
      {/* Project Image/Icon */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-vscode-bg border border-vscode-border rounded-lg overflow-hidden group-hover:border-vscode-accent/50 transition-colors">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center transition-all duration-500 opacity-90 group-hover:opacity-100"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-vscode-accent transition-colors truncate">
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider font-mono text-vscode-muted bg-vscode-bg border border-vscode-border px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-vscode-text/90 mt-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex gap-3 mt-4">
          {hasVisitLink && (
            <a
              href={project.links?.visit || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-vscode-accent/10 border border-vscode-accent/50 text-vscode-accent text-xs font-semibold rounded-lg hover:bg-vscode-accent/20 transition-all flex items-center gap-2 group/btn"
            >
              <VscGlobe className="group-hover/btn:rotate-12 transition-transform" />{" "}
              <span>Visit Live</span>
            </a>
          )}

          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-vscode-surface border border-vscode-border text-vscode-muted hover:text-white hover:border-vscode-muted transition-all text-xs font-semibold rounded-lg flex items-center gap-2"
            >
              <VscGithubInverted /> <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
