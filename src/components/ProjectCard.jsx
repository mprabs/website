import {
  VscCloudDownload,
  VscGithubInverted,
  VscGlobe
} from "react-icons/vsc";

export default function ProjectCard({ project, emphasis = false }) {
  // Check if visit link exists and is not null
  const hasVisitLink =
    (project.links?.visit || project.link) &&
    project.links?.visit !== null &&
    project.link !== null;
  const hasCustomActions = Array.isArray(project.actions) && project.actions.length > 0;
  const descriptionClass = project.showFullDescription
    ? "text-sm text-vscode-text mt-3 leading-relaxed"
    : "text-sm text-vscode-text mt-3 line-clamp-3 sm:line-clamp-2 leading-relaxed";
  const visibleHighlights = project.maxHighlights || 2;
  const isEmphasisCard = emphasis;
  const cardClass = isEmphasisCard
    ? "bg-vscode-surface/80 border-vscode-border/90 hover:border-vscode-accent/80 hover:bg-vscode-surface/90"
    : "bg-vscode-surface/50 border-vscode-border hover:border-vscode-accent hover:bg-vscode-surface";
  const imageContainerClass = project.imageContainerClass || "bg-vscode-bg";
  const tagClass = isEmphasisCard
    ? "text-[10px] uppercase tracking-wider font-mono text-vscode-text/85 bg-vscode-surface border border-vscode-border/80 px-2 py-1 rounded"
    : "text-[10px] uppercase tracking-wider font-mono text-vscode-muted bg-vscode-bg border border-vscode-border px-2 py-1 rounded";
  const highlightsTextClass = isEmphasisCard
    ? "text-xs text-vscode-text/80 flex items-start gap-2"
    : "text-xs text-vscode-muted flex items-start gap-2";

  return (
    <div
      className={`border p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all duration-300 group shadow-lg hover:shadow-vscode-accent/5 sm:hover:-translate-y-1 ${cardClass}`}
    >
      {/* Project Image/Icon */}
      <div
        className={`w-full h-40 sm:w-28 sm:h-28 sm:flex-shrink-0 border border-vscode-border rounded-lg overflow-hidden group-hover:border-vscode-accent/50 transition-colors ${imageContainerClass}`}
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
                className={tagClass}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className={descriptionClass}>
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.highlights.slice(0, visibleHighlights).map((point) => (
              <li key={point} className={highlightsTextClass}>
                <span className="mt-1 h-1 w-1 rounded-full bg-vscode-accent/80 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 mt-5 pt-1 sm:mt-auto">
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
