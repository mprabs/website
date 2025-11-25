import { FiGithub, FiLinkedin, FiMail, FiBook, FiCpu, FiCode, FiDatabase, FiLayout } from 'react-icons/fi';
import { aboutData, socialLinks, technicalExpertise } from '../data/data';
import PrabinImage from '../assets/prabin-no-bg.png';

export default function About() {
    return (
        <section className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="bg-vscode-bg border border-vscode-border rounded-xl shadow-xl overflow-hidden animate-fade-in-up">

                {/* File Header */}
                <div className="bg-vscode-surface px-4 py-2 border-b border-vscode-border flex items-center gap-2">
                    <FiBook className="text-vscode-accent" />
                    <span className="text-sm text-vscode-text font-mono">README.md</span>
                    <span className="text-xs text-vscode-muted ml-auto">Preview</span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-8">

                    {/* Profile Image - Circular Avatar */}
                    <div className="flex justify-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-vscode-accent/50 shadow-lg">
                            <img
                                src={PrabinImage}
                                alt="Prabin Acharya"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="border-b border-vscode-border pb-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-vscode-accent">01.</span> Hi, I'm Prabin Acharya 👋
                        </h1>
                        <p className="text-lg text-vscode-text leading-relaxed max-w-3xl mx-auto">
                            {aboutData.bio}
                        </p>
                    </div>

                    {/* Tech Stack Grid */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                            <FiCpu className="text-vscode-keyword" />
                            Tech Stack
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {technicalExpertise.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-vscode-surface border border-vscode-border p-3 rounded-lg flex items-center gap-3 hover:border-vscode-accent transition-colors duration-300 group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-vscode-function group-hover:bg-vscode-accent transition-colors"></div>
                                    <span className="text-vscode-text font-mono text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hobbies */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                            <FiLayout className="text-vscode-string" />
                            Interests
                        </h2>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {aboutData.hobbies.map((hobby, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-vscode-surface border border-vscode-border rounded-full text-sm text-vscode-muted hover:text-white hover:border-vscode-string transition-colors duration-300"
                                >
                                    {hobby}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Connect */}
                    <div className="pt-6 border-t border-vscode-border">
                        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Connect</h2>
                        <div className="flex gap-4 justify-center">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-vscode-surface border border-vscode-border rounded-lg text-vscode-muted hover:text-white hover:border-vscode-accent hover:bg-vscode-accent/10 transition-all duration-300"
                                    aria-label={link.icon}
                                >
                                    {link.icon === 'FiGithub' && <FiGithub size={24} />}
                                    {link.icon === 'FiLinkedin' && <FiLinkedin size={24} />}
                                    {link.icon === 'FiMail' && <FiMail size={24} />}
                                    {link.icon === 'FiBook' && <FiBook size={24} />}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}