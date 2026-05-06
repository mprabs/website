import {
  VscCloudDownload,
  VscGithubInverted,
  VscGlobe
} from "react-icons/vsc";

export default function ProjectCard({ project }) {
  const hasVisitLink =
    (project.links?.visit || project.link) &&
    project.links?.visit !== null &&
    project.link !== null;
  const hasCustomActions =
    Array.isArray(project.actions) && project.actions.length > 0;
  const descriptionClass =
    "text-sm sm:text-[15px] text-vscode-text mt-3 line-clamp-3 sm:line-clamp-2 leading-relaxed";
  const visibleHighlights = 2;
  const cardClass = "bg-vscode-surface border-vscode-border";
  const imageContainerClass = "bg-vscode-bg";
  const tagClass =
    "text-[10px] uppercase tracking-[0.14em] font-mono text-vscode-muted bg-vscode-surface border border-vscode-border px-2.5 py-1 rounded-full";
  const highlightsTextClass = "text-xs text-vscode-text flex items-start gap-2";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all duration-300 hover:border-vscode-border hover:bg-vscode-surface sm:hover:-translate-y-0.5 ${cardClass}`}
    >
      <div
        className={`w-full h-40 sm:w-28 sm:h-28 sm:flex-shrink-0 border border-vscode-border rounded-lg overflow-hidden transition-colors ${imageContainerClass}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-center transition-all duration-500 opacity-90 group-hover:opacity-100"
            style={{ objectFit: project.imageFit || "cover" }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-vscode-accent/20 via-vscode-function/20 to-vscode-string/20 flex items-center justify-center">
            <span className="font-mono text-lg text-vscode-accent tracking-wider">
              NX
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="pb-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-vscode-accent transition-colors leading-tight">
              {project.name}
            </h3>
            {project.isNewLaunch && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-vscode-accent border border-vscode-accent/50 bg-vscode-accent/10 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className={tagClass}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className={descriptionClass}>{project.description}</p>

        {project.highlights?.length > 0 && (
          <ul className="mt-3.5 space-y-1.5">
            {project.highlights.slice(0, visibleHighlights).map((point) => (
              <li key={point} className={highlightsTextClass}>
                <span className="mt-1 h-1 w-1 rounded-full bg-vscode-accent/80 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 mt-5 pt-4 sm:mt-auto">
          {hasCustomActions && project.actions.map((action) => (
            <a
              key={`${project.name}-${action.label}`}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-h-10 px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group/btn flex-1 sm:flex-initial ${
                action.variant === "secondary"
                  ? "bg-vscode-surface border border-vscode-border text-vscode-muted hover:text-white hover:border-vscode-muted"
                  : "bg-vscode-accent/10 border border-vscode-accent/50 text-vscode-accent hover:bg-vscode-accent/20"
              }`}
            >
              {action.type === "download" ? (
                <VscCloudDownload className="group-hover/btn:translate-y-0.5 transition-transform" />
              ) : (
                <VscGlobe className="group-hover/btn:rotate-12 transition-transform" />
              )}
              <span>{action.label}</span>
            </a>
          ))}

          {!hasCustomActions && hasVisitLink && (
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
