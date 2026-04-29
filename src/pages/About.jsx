import {
  FiBook,
  FiCode,
  FiCpu,
  FiGithub,
  FiHardDrive,
  FiLinkedin,
  FiMail,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";
import WindowFrame from "../components/WindowFrame";
import ImmersiveRouteShell from "../components/ImmersiveRouteShell";
import {
  aboutData,
  socialLinks,
  technicalExpertise,
  setupDetails,
} from "../data/data";
import PrabinImage from "../assets/prabin-no-bg.png";

const socialIconMap = {
  FiGithub,
  FiLinkedin,
  FiMail,
};

function getSetupIcon(category) {
  if (category === "hardware") return FiCpu;
  if (category === "software") return FiSettings;
  if (category === "development") return FiCode;
  return FiHardDrive;
}

export default function About() {
  return (
    <ImmersiveRouteShell
      eyebrow="Profile Deck"
      title="The person behind the workspace."
      description="A cleaner, calmer route for the full background: skills, setup, interests, and the context behind the cinematic homepage."
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <WindowFrame
        title="about.md"
        icon={FiBook}
        containerClassName="animate-fade-in-up"
      >
        <div className="p-5 sm:p-8 md:p-10 space-y-10">
          <div className="grid lg:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start">
            <div className="mx-auto lg:mx-0 w-48 h-48 sm:w-56 sm:h-56 rounded-xl border border-vscode-border bg-vscode-surface overflow-hidden">
              <img
                src={PrabinImage}
                alt="Prabin Acharya"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-vscode-accent font-mono text-sm">
                  Frontend Engineer
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  Prabin Acharya
                </h1>
              </div>

              <p className="text-vscode-text/95 leading-relaxed text-base sm:text-lg">
                {aboutData.bio}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2">
                  <div className="text-vscode-accent font-bold text-xl leading-none">
                    5+
                  </div>
                  <div className="text-vscode-muted text-xs font-mono mt-1">
                    Years Experience
                  </div>
                </div>
                <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2">
                  <div className="text-vscode-function font-bold text-xl leading-none">
                    20+
                  </div>
                  <div className="text-vscode-muted text-xs font-mono mt-1">
                    Projects Delivered
                  </div>
                </div>
                <div className="bg-vscode-surface border border-vscode-border rounded-lg px-4 py-2">
                  <div className="text-vscode-keyword font-bold text-xl leading-none">
                    React
                  </div>
                  <div className="text-vscode-muted text-xs font-mono mt-1">
                    Core Expertise
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FiCode className="text-vscode-accent" />
                Technical Skills
              </h3>
              <div className="h-px flex-1 bg-vscode-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalExpertise.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-vscode-border bg-vscode-surface px-3 py-1.5 text-xs font-mono text-vscode-text/90 hover:border-vscode-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FiMonitor className="text-vscode-accent" />
                Setup
              </h3>
              <div className="h-px flex-1 bg-vscode-border" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(setupDetails).map(([category, items]) => {
                const Icon = getSetupIcon(category);
                return (
                  <div
                    key={category}
                    className="bg-vscode-surface/50 border border-vscode-border rounded-xl p-4 hover:border-vscode-accent/60 transition-colors"
                  >
                    <h4 className="text-vscode-muted font-mono text-xs uppercase tracking-[0.18em] mb-3 flex items-center gap-2">
                      <Icon size={14} />
                      {category}
                    </h4>
                    <div className="space-y-2.5">
                      {Object.entries(items).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between gap-4 text-sm border-b border-vscode-border/40 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-vscode-muted">{key}</span>
                          <span className="text-vscode-text text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">Interests</h3>
              <div className="h-px flex-1 bg-vscode-border" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {aboutData.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-1.5 bg-vscode-surface border border-vscode-border rounded-full text-sm text-vscode-muted hover:text-vscode-text hover:border-vscode-accent transition-colors"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-vscode-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-vscode-accent font-mono text-sm">
                  Let&apos;s connect
                </p>
                <p className="text-vscode-muted text-sm mt-1">
                  Open to frontend roles and collaborative product work.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon] || FiMail;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-vscode-surface border border-vscode-border rounded-lg text-vscode-muted hover:text-vscode-accent hover:border-vscode-accent transition-all"
                      title={link.name}
                      aria-label={link.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>
    </ImmersiveRouteShell>
  );
}
