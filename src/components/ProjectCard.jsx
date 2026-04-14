import { VscGithubInverted, VscGlobe } from "react-icons/vsc";

export default function ProjectCard({ project }) {
  // Check if visit link exists and is not null
  const hasVisitLink =
    (project.links?.visit || project.link) &&
    project.links?.visit !== null &&
    project.link !== null;

  return (
    <div className="bg-vscode-surface/50 border border-vscode-border hover:border-vscode-accent hover:bg-vscode-surface p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all duration-300 group shadow-lg hover:shadow-vscode-accent/5 sm:hover:-translate-y-1">
      {/* Project Image/Icon */}
      <div className="w-full h-40 sm:w-28 sm:h-28 sm:flex-shrink-0 bg-vscode-bg border border-vscode-border rounded-lg overflow-hidden group-hover:border-vscode-accent/50 transition-colors">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-center transition-all duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-vscode-accent/20 via-vscode-function/20 to-vscode-string/20 flex items-center justify-center">
            <span className="font-mono text-lg text-vscode-accent tracking-wider">
              NX
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-vscode-accent transition-colors">
              {project.name}
            </h3>
            {project.isNewLaunch && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-vscode-accent border border-vscode-accent/50 bg-vscode-accent/10 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider font-mono text-vscode-muted bg-vscode-bg border border-vscode-border px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-vscode-text/90 mt-3 line-clamp-3 sm:line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.highlights.slice(0, 2).map((point) => (
              <li key={point} className="text-xs text-vscode-muted flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-vscode-accent/80 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 mt-4">
          {hasVisitLink && (
            <a
              href={project.links?.visit || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-10 px-3 sm:px-4 py-2 sm:py-1.5 bg-vscode-accent/10 border border-vscode-accent/50 text-vscode-accent text-xs font-semibold rounded-lg hover:bg-vscode-accent/20 transition-all flex items-center justify-center gap-2 group/btn flex-1 sm:flex-initial"
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
              className="min-h-10 px-3 sm:px-4 py-2 sm:py-1.5 bg-vscode-surface border border-vscode-border text-vscode-muted hover:text-white hover:border-vscode-muted transition-all text-xs font-semibold rounded-lg flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              <VscGithubInverted /> <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
