import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiBook,
  FiCpu,
  FiCode,
  FiDatabase,
  FiLayout,
  FiTerminal,
  FiZap,
  FiMonitor,
  FiHardDrive,
  FiCpu as FiCpuIcon,
  FiSettings,
} from "react-icons/fi";
import {
  aboutData,
  socialLinks,
  technicalExpertise,
  setupDetails,
} from "../data/data";
import PrabinImage from "../assets/prabin-no-bg.png";

export default function About() {
  return (
    <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <div className="flex items-center gap-3 mb-8 border-b border-vscode-border pb-4">
        <FiBook className="text-3xl text-vscode-function" />
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-vscode-accent">01.</span> About Me
        </h2>
      </div>

      <div className="bg-vscode-bg border border-vscode-border rounded-xl shadow-xl overflow-hidden animate-fade-in-up">
        {/* File Header */}
        <div className="bg-vscode-surface px-4 py-2 border-b border-vscode-border flex items-center gap-2">
          <FiBook className="text-vscode-accent" />
          <span className="text-sm text-vscode-text font-mono">README.md</span>
          <div className="flex gap-1 ml-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-10 space-y-16">
          {/* Hero Section */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start">
            {/* Image Column */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-vscode-accent to-vscode-function rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden border border-vscode-border bg-vscode-surface">
                  <img
                    src={PrabinImage}
                    alt="Prabin Acharya"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-vscode-accent font-mono text-sm leading-none">
                  Hi, my name is
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                  Prabin Acharya
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-vscode-muted">
                  I build things for the web.
                </p>
              </div>

              <div className="max-w-2xl">
                <p className="text-lg text-vscode-text leading-relaxed">
                  {aboutData.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2">
                  <div className="text-vscode-accent font-bold text-xl leading-none">
                    5+
                  </div>
                  <div className="text-vscode-muted text-xs font-mono mt-1">
                    Years Experience
                  </div>
                </div>
                <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2">
                  <div className="text-vscode-keyword font-bold text-xl leading-none">
                    20+
                  </div>
                  <div className="text-vscode-muted text-xs font-mono mt-1">
                    Projects Built
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FiCpu className="text-vscode-keyword" />
                Technical Skills
              </h2>
              <div className="h-px flex-1 bg-vscode-border"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {technicalExpertise.map((skill, index) => (
                <div
                  key={index}
                  className="bg-vscode-surface border border-vscode-border p-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-vscode-accent transition-colors group text-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-vscode-accent/50 group-hover:bg-vscode-accent"></div>
                  <span className="text-vscode-muted font-mono text-xs group-hover:text-vscode-text transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Setup Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FiMonitor className="text-vscode-accent" />
                My Setup
              </h2>
              <div className="h-px flex-1 bg-vscode-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(setupDetails).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-vscode-surface/50 border border-vscode-border rounded-xl p-5 hover:bg-vscode-surface transition-colors"
                >
                  <h3 className="text-vscode-function font-mono text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    {category === "hardware" && <FiCpuIcon size={14} />}
                    {category === "software" && <FiSettings size={14} />}
                    {category === "development" && <FiCode size={14} />}
                    {category === "tools" && <FiHardDrive size={14} />}
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(items).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-vscode-border/50 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-vscode-muted text-xs font-mono">
                          {key}
                        </span>
                        <span className="text-vscode-text text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FiLayout className="text-vscode-string" />
                Interests
              </h2>
              <div className="h-px flex-1 bg-vscode-border"></div>
            </div>

            <div className="flex flex-wrap gap-3">
              {aboutData.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-vscode-surface border border-vscode-border rounded-full text-sm text-vscode-muted hover:text-white hover:border-vscode-accent transition-all cursor-default"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="pt-8 border-t border-vscode-border text-center space-y-8">
            <div>
              <p className="text-vscode-accent font-mono text-sm mb-2">
                What's next?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get In Touch
              </h2>
              <p className="max-w-md mx-auto text-vscode-muted">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, I'll try my best to get back to
                you!
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              {socialLinks.map((link, index) => {
                const Icon = {
                  FiGithub,
                  FiLinkedin,
                  FiMail,
                  FiBook,
                }[link.icon];

                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-vscode-surface border border-vscode-border rounded-xl text-vscode-muted hover:text-vscode-accent hover:border-vscode-accent transition-all hover:-translate-y-1 shadow-lg"
                    title={link.name}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
