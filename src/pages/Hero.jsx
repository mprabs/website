import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { VscCode, VscSourceControl, VscDebugAlt, VscExtensions, VscSearch } from 'react-icons/vsc';
import PrabinImage from '../assets/prabin-no-bg.png';

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-64px)] flex items-start sm:items-center justify-center overflow-hidden py-12 md:py-16 lg:py-0">
            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text Content */}
                <div className="order-1 lg:order-1 space-y-6 text-center lg:text-left">
                    <div className="space-y-2 animate-fade-in-up">
                        <h2 className="text-vscode-accent font-mono text-lg sm:text-xl">Hi, I am</h2>
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
                            Prabin <span className="text-vscode-keyword">Acharya</span>
                        </h1>
                        <h3 className="text-2xl sm:text-3xl text-vscode-muted font-display">
                            Frontend <span className="text-vscode-string">Developer</span>
                        </h3>
                    </div>

                    <p className="text-vscode-text/80 text-lg max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-100 leading-relaxed">
                        I craft high-performance, accessible, and visually stunning web experiences.
                        Turning complex problems into elegant code is my passion.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-200">
                        <a href="/projects" className="px-6 py-3 bg-vscode-accent/10 hover:bg-vscode-accent/20 text-vscode-accent border border-vscode-accent/50 rounded-lg font-mono transition-all duration-300 flex items-center gap-2 group">
                            <span>View Projects</span>
                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                        <a
                            href="/resume.pdf"
                            download="Prabin_Acharya_Resume.pdf"
                            className="px-6 py-3 bg-vscode-surface hover:bg-vscode-border text-white rounded-lg font-mono transition-all duration-300 flex items-center gap-2"
                        >
                            <FiDownload />
                            <span>Resume</span>
                        </a>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 animate-fade-in-up delay-300">
                        <SocialLink href="https://github.com/mprabs" icon={<FiGithub />} label="GitHub" />
                        <SocialLink href="https://linkedin.com/in/paccharya" icon={<FiLinkedin />} label="LinkedIn" />
                        <SocialLink href="mailto:acharyaprabin03@gmail.com" icon={<FiMail />} label="Email" />
                    </div>
                </div>

                {/* Right Column: VS Code Mockup */}
                <div className="order-2 lg:order-2 animate-fade-in-up delay-200 perspective-1000">
                    <div className="relative bg-vscode-bg border border-vscode-border rounded-xl shadow-2xl overflow-hidden transform transition-transform hover:rotate-1 hover:scale-[1.02] duration-500">
                        {/* Title Bar */}
                        <div className="bg-vscode-surface px-4 py-2 flex items-center justify-between border-b border-vscode-border">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div className="text-xs text-vscode-muted font-mono">prabin.tsx — portfolio</div>
                            <div className="w-16"></div>
                        </div>

                        <div className="flex h-[400px]">
                            {/* Activity Bar */}
                            <div className="w-12 bg-vscode-surface border-r border-vscode-border flex flex-col items-center py-4 gap-6 text-vscode-muted">
                                <VscExtensions className="text-2xl hover:text-white cursor-pointer" />
                                <VscSearch className="text-2xl hover:text-white cursor-pointer" />
                                <VscSourceControl className="text-2xl hover:text-white cursor-pointer" />
                                <VscDebugAlt className="text-2xl hover:text-white cursor-pointer" />
                            </div>

                            {/* Editor Area */}
                            <div className="flex-1 p-6 font-mono text-sm sm:text-base overflow-hidden">
                                <div className="flex">
                                    <div className="text-vscode-muted select-none pr-4 text-right">
                                        1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11
                                    </div>
                                    <div className="flex-1">
                                        <p><span className="text-vscode-keyword">const</span> <span className="text-vscode-function">Developer</span> = <span className="text-vscode-keyword">new</span> <span className="text-vscode-accent">Person</span>({'{'}</p>
                                        <p className="pl-4">name: <span className="text-vscode-string">'Prabin Acharya'</span>,</p>
                                        <p className="pl-4">role: <span className="text-vscode-string">'Frontend Engineer'</span>,</p>
                                        <p className="pl-4">skills: [</p>
                                        <p className="pl-8"><span className="text-vscode-string">'React'</span>, <span className="text-vscode-string">'Tailwind'</span>, <span className="text-vscode-string">'Node.js'</span></p>
                                        <p className="pl-4">],</p>
                                        <p className="pl-4">hardWorker: <span className="text-vscode-keyword">true</span>,</p>
                                        <p className="pl-4">quickLearner: <span className="text-vscode-keyword">true</span>,</p>
                                        <p className="pl-4">hireable: <span className="text-vscode-function">function</span>() {'{'}</p>
                                        <p className="pl-8"><span className="text-vscode-keyword">return</span> <span className="text-vscode-keyword">this</span>.hardWorker && <span className="text-vscode-keyword">this</span>.quickLearner;</p>
                                        <p className="pl-4">{'}'}</p>
                                        <p>{'}'});</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-vscode-muted hover:text-white hover:scale-110 transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}
