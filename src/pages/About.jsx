import { FiGithub, FiLinkedin, FiMail, FiBook, FiCpu, FiCode, FiDatabase, FiLayout, FiTerminal, FiZap } from 'react-icons/fi';
import { aboutData, socialLinks, technicalExpertise } from '../data/data';
import PrabinImage from '../assets/prabin-no-bg.png';

export default function About() {
    return (
        <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative overflow-hidden">

            <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
                <FiBook className="text-3xl text-vscode-function" />
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    <span className="text-vscode-accent">01.</span> About Me
                </h2>
            </div>

            {/* Chaotic Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-10 left-10 text-vscode-accent font-mono text-xs animate-pulse">{'// TODO: Make it awesome'}</div>
                <div className="absolute top-32 right-20 text-vscode-keyword font-mono text-xs rotate-12">const chaos = true;</div>
                <div className="absolute bottom-40 left-32 text-vscode-function font-mono text-xs -rotate-6">{'{ developer: "mode" }'}</div>
                <div className="absolute top-1/2 right-10 text-vscode-string font-mono text-xs rotate-45">npm run creative</div>
            </div>

            <div className="bg-vscode-bg border border-vscode-border rounded-xl shadow-xl overflow-hidden animate-fade-in-up relative">

                {/* File Header with Terminal Vibe */}
                <div className="bg-vscode-surface px-4 py-2 border-b border-vscode-border flex items-center gap-2 relative">
                    <FiBook className="text-vscode-accent animate-pulse" />
                    <span className="text-sm text-vscode-text font-mono">README.md</span>
                    <div className="flex gap-1 ml-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-xs text-vscode-muted ml-auto flex items-center gap-1">
                        <FiTerminal className="text-vscode-accent" />
                        Preview
                    </span>
                </div>

                {/* Content - Creatively Chaotic */}
                <div className="p-4 sm:p-6 md:p-10 space-y-10 sm:space-y-12 relative">

                    {/* Hero Section - Asymmetric Chaos */}
                    <div className="relative pb-8 border-b border-vscode-border">

                        {/* Floating Code Decorations */}
                        <div className="absolute -top-4 left-0 text-vscode-muted font-mono text-xs opacity-30">01</div>
                        <div className="absolute -top-4 right-0 text-vscode-accent font-mono text-xs opacity-30">{'<AboutMe />'}</div>

                        <div className="grid md:grid-cols-[1.2fr_1.8fr] gap-6 md:gap-10 items-start">

                            {/* Left Column - Image with Glitch Effect */}
                            <div className="flex justify-center md:justify-start relative group">
                                {/* Glitch layers */}
                                <div className="absolute inset-0 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 mx-auto md:mx-0">
                                    <div className="absolute inset-0 border-2 border-vscode-keyword/20 rounded-lg translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                                    <div className="absolute inset-0 border-2 border-vscode-function/20 rounded-lg -translate-x-1 -translate-y-1 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform"></div>
                                </div>

                                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-vscode-accent shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={PrabinImage}
                                        alt="Prabin Acharya"
                                        className="w-full h-full object-cover"
                                        loading='lazy'
                                        referrerPolicy='no-referrer'
                                        decoding='async'
                                        fetchpriority='high'
                                        priority='high'
                                    />
                                    {/* Terminal-style overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-3 py-2 border-t border-vscode-accent/50">
                                        <div className="flex items-center gap-2 text-xs font-mono">
                                            <FiTerminal className="text-vscode-accent" />
                                            <span className="text-vscode-muted">prabin@developer</span>
                                            <span className="text-vscode-accent">~</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-3 -right-3 bg-vscode-accent text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg rotate-12 hover:rotate-0 transition-transform">
                                    5+ YRS
                                </div>
                            </div>

                            {/* Right Column - Chaotic Text Layout */}
                            <div className="space-y-5 text-center md:text-left relative">

                                {/* Terminal prompt style greeting */}
                                <div className="inline-block bg-vscode-surface border border-vscode-border rounded px-3 py-1 font-mono text-sm mb-2">
                                    <span className="text-vscode-function">$</span>{' '}
                                    <span className="text-vscode-muted">echo</span>{' '}
                                    <span className="text-vscode-string">"Hello there!"</span>
                                </div>

                                {/* Main heading with creative chaos */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative">
                                    <div className="mb-2">
                                        My name is{' '}
                                        <span className="relative inline-block">
                                            <span className="text-white relative z-10">Prabin</span>
                                            <span className="absolute inset-0 bg-vscode-accent/20 blur-xl"></span>
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                                        <span className="text-vscode-text">and I</span>
                                        <span className="bg-vscode-keyword/10 border border-vscode-keyword px-3 py-1 rounded text-vscode-keyword transform -rotate-2 hover:rotate-0 transition-transform">
                                            develop
                                        </span>
                                        <span className="text-vscode-text">and</span>
                                        <span className="bg-vscode-function/10 border border-vscode-function px-3 py-1 rounded text-vscode-function transform rotate-2 hover:rotate-0 transition-transform">
                                            build
                                        </span>
                                    </div>
                                    <div className="mt-3 text-2xl sm:text-3xl italic text-vscode-muted font-light">
                                        (most of the time)
                                        <span className="inline-block ml-2 animate-pulse">_</span>
                                    </div>
                                </h1>

                                {/* Bio with code comment style */}
                                <div className="pt-4 space-y-2">
                                    <div className="text-vscode-muted font-mono text-xs">{'/* About */'}</div>
                                    <p className="text-base sm:text-lg text-vscode-text leading-relaxed pl-4 border-l-2 border-vscode-accent/30">
                                        {aboutData.bio}
                                    </p>
                                </div>

                                {/* Quick stats - chaotic placement */}
                                <div className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start">
                                    <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2 transform -rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-vscode-accent font-bold text-xl">5+</div>
                                        <div className="text-vscode-muted text-xs font-mono">years</div>
                                    </div>
                                    <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2 transform rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-vscode-keyword font-bold text-xl">∞</div>
                                        <div className="text-vscode-muted text-xs font-mono">coffee</div>
                                    </div>
                                    <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2 transform -rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-vscode-function font-bold text-xl">100%</div>
                                        <div className="text-vscode-muted text-xs font-mono">passion</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Tech Stack - Chaotic Grid */}
                    <div className="relative">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="text-vscode-muted font-mono text-xs opacity-50">{'<section>'}</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <FiCpu className="text-vscode-keyword animate-pulse" />
                                Tech Stack
                                <FiZap className="text-vscode-accent" />
                            </h2>
                            <div className="text-vscode-muted font-mono text-xs opacity-50">{'</section>'}</div>
                        </div>

                        {/* Asymmetric chaotic grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                            {technicalExpertise.map((skill, index) => {
                                // Varied colors for dots
                                const dotColors = [
                                    'bg-vscode-function',
                                    'bg-vscode-keyword',
                                    'bg-vscode-accent',
                                    'bg-vscode-string'
                                ];
                                const dotColor = dotColors[index % dotColors.length];

                                return (
                                    <div
                                        key={index}
                                        className="bg-vscode-surface border border-vscode-border p-3 md:p-4 rounded-lg flex items-center gap-3 hover:border-vscode-accent hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${dotColor} group-hover:animate-pulse`}></div>
                                        <span className="text-vscode-text font-mono text-xs md:text-sm group-hover:text-white transition-colors">
                                            {skill}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Terminal output decoration */}
                        <div className="mt-6 bg-vscode-surface/50 border border-vscode-border/50 rounded px-4 py-2 font-mono text-xs text-vscode-muted">
                            <span className="text-vscode-function">$</span> skills.length{' '}
                            <span className="text-vscode-accent">→</span>{' '}
                            <span className="text-vscode-keyword">{technicalExpertise.length}</span>{' '}
                            <span className="text-vscode-string">technologies mastered</span>
                        </div>
                    </div>

                    {/* Interests - Creative Chaos */}
                    <div className="relative">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="text-vscode-muted font-mono text-xs opacity-50">{'// hobbies'}</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <FiLayout className="text-vscode-string" />
                                Interests
                            </h2>
                        </div>

                        {/* Chaotic tag cloud */}
                        <div className="flex flex-wrap gap-3 justify-center items-center">
                            {aboutData.hobbies.map((hobby, index) => {
                                const emojis = ['⚽', '🎮', '✈️', '📚', '🎨', '🎵', '🏃', '📷'];

                                return (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-vscode-surface border border-vscode-border rounded-lg text-sm text-vscode-muted hover:text-white hover:border-vscode-string hover:scale-110 transition-all duration-300 cursor-pointer flex items-center gap-2"
                                    >
                                        {/* <span className="text-base">{emojis[index % emojis.length]}</span> */}
                                        {hobby}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Connect - Terminal Style */}
                    <div className="pt-8 border-t border-vscode-border relative">
                        {/* Terminal command header */}
                        <div className="mb-6 text-center">
                            <div className="inline-block bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2 font-mono text-sm mb-4">
                                <span className="text-vscode-function">$</span>{' '}
                                <span className="text-vscode-muted">git</span>{' '}
                                <span className="text-vscode-keyword">connect</span>{' '}
                                <span className="text-vscode-string">--with prabin</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Let's Connect</h2>
                        </div>

                        {/* Social links with glitch effect */}
                        <div className="flex gap-4 justify-center flex-wrap">
                            {socialLinks.map((link, index) => {
                                const labels = {
                                    'FiGithub': 'GitHub',
                                    'FiLinkedin': 'LinkedIn',
                                    'FiMail': 'Email',
                                    'FiBook': 'Blog'
                                };

                                return (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-4 bg-vscode-surface border border-vscode-border rounded-lg text-vscode-muted hover:text-white hover:border-vscode-accent transition-all duration-300 flex flex-col items-center gap-2 min-w-[100px] hover:scale-110 hover:-translate-y-1"
                                        aria-label={link.icon}
                                    >
                                        {/* Glitch effect on hover */}
                                        <div className="absolute inset-0 border-2 border-vscode-accent/0 group-hover:border-vscode-accent/30 rounded-lg translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
                                        <div className="absolute inset-0 border-2 border-vscode-keyword/0 group-hover:border-vscode-keyword/30 rounded-lg translate-x-0 translate-y-0 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all"></div>

                                        <div className="relative z-10">
                                            {link.icon === 'FiGithub' && <FiGithub size={28} />}
                                            {link.icon === 'FiLinkedin' && <FiLinkedin size={28} />}
                                            {link.icon === 'FiMail' && <FiMail size={28} />}
                                            {link.icon === 'FiBook' && <FiBook size={28} />}
                                        </div>
                                        <span className="text-xs font-mono relative z-10">{labels[link.icon]}</span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Terminal output */}
                        <div className="mt-8 bg-vscode-surface/50 border border-vscode-border/50 rounded px-4 py-3 font-mono text-xs text-vscode-muted text-center">
                            <span className="text-vscode-accent">→</span>{' '}
                            <span className="text-vscode-string">"Always open to interesting conversations and collaborations"</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}