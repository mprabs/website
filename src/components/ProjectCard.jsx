import { VscGithubInverted, VscGlobe } from 'react-icons/vsc';

export default function ProjectCard({ project }) {
    // Check if visit link exists and is not null
    const hasVisitLink = (project.links?.visit || project.link) &&
        project.links?.visit !== null &&
        project.link !== null;

    return (
        <div className="bg-vscode-surface border border-vscode-border hover:bg-vscode-border/30 p-4 flex gap-4 transition-all duration-200 group">
            {/* Project Image/Icon */}
            <div className="w-24 h-24 flex-shrink-0 bg-vscode-bg border border-vscode-border overflow-hidden">
                <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div>
                    <h3 className="text-lg font-bold text-white truncate group-hover:text-vscode-accent transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-xs text-vscode-muted truncate">
                        {project.tags?.join(', ')}
                    </p>
                </div>

                <p className="text-sm text-vscode-text mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex gap-3 mt-3">
                    {hasVisitLink && (
                        <a
                            href={project.links?.visit || project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-vscode-accent/10 border border-vscode-accent/50 text-vscode-accent text-xs font-medium rounded-sm hover:bg-vscode-accent/20 transition-colors flex items-center gap-1"
                        >
                            <VscGlobe /> Visit
                        </a>
                    )}

                    {project.links?.source && (
                        <a
                            href={project.links.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-vscode-border text-vscode-text text-xs font-medium rounded-sm hover:bg-vscode-border/80 transition-colors flex items-center gap-1"
                        >
                            <VscGithubInverted /> Source Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
