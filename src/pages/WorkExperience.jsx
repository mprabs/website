import { workExperiences } from '../data/data';
import { VscGitCommit, VscGitMerge, VscGitPullRequest } from 'react-icons/vsc';

export default function WorkExperience() {
    return (
        <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">

                <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
                    <VscGitPullRequest className="text-3xl text-vscode-function" />
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <span className="text-vscode-accent">02.</span> Work Experience
                    </h2>
                </div>

                <div className="relative pl-4 sm:pl-8 border-l-2 border-vscode-border space-y-12">
                    {workExperiences.map((exp, index) => (
                        <div key={index} className="relative group">
                            {/* Commit Node */}
                            <div className="absolute -left-[21px] sm:-left-[37px] top-0 bg-vscode-bg p-1 group-hover:scale-110 transition-transform duration-300">
                                <VscGitCommit className="text-2xl text-vscode-muted group-hover:text-vscode-accent transition-colors" />
                            </div>

                            {/* Content Card */}
                            <div className="bg-vscode-surface border border-vscode-border rounded-lg p-6 hover:border-vscode-accent transition-all duration-300 shadow-lg group-hover:shadow-vscode-accent/5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-vscode-accent flex items-center gap-2">
                                            {exp.role}
                                            <span className="text-vscode-muted text-sm font-normal font-mono">
                                                @{exp.company.replace(/\s+/g, '').toLowerCase()}
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-vscode-muted bg-vscode-bg px-2 py-1 rounded border border-vscode-border">
                                        <span>{generateCommitHash(exp.company)}</span>
                                        <span>•</span>
                                        <span>{exp.duration}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {exp.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-vscode-text/90 group/item">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-vscode-border group-hover/item:bg-vscode-string transition-colors"></span>
                                            <span className="text-sm leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {/* Initial Commit */}
                    <div className="relative group">
                        <div className="absolute -left-[21px] sm:-left-[37px] top-0 bg-vscode-bg p-1">
                            <VscGitMerge className="text-2xl text-vscode-function" />
                        </div>
                        <div className="pt-1">
                            <span className="text-vscode-muted font-mono text-sm">Initial commit: Started Career</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helper to generate a fake commit hash based on string
function generateCommitHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16).substring(0, 7);
}