import { projects } from '../data/data';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
    return (
        <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="animate-fade-in-up">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <span className="text-vscode-accent">03</span> Projects
                    </h1>
                    <p className="text-vscode-muted">A collection of my professional and personal work</p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-12">
                    {['sharelook', 'professional', 'personal'].map((category) => (
                        <div key={category}>
                            <h2 className="text-xl font-bold text-white mb-4 capitalize border-l-4 border-vscode-accent pl-3">
                                {category} Projects
                            </h2>

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