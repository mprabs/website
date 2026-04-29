import {
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiHome,
  FiMail,
  FiUser,
} from "react-icons/fi";

const items = [
  { href: "#arrival", label: "Gate", icon: FiHome },
  { href: "#foyer", label: "About", icon: FiUser },
  { href: "#studio", label: "Work", icon: FiBriefcase },
  { href: "#garage", label: "Projects", icon: FiFolder },
  { href: "#library", label: "Blogs", icon: FiBookOpen },
  { href: "#signal", label: "Contact", icon: FiMail },
];

export default function ImmersiveNavigation() {
  return (
    <div className="game-nav pointer-events-auto">
      <div className="game-nav-shell">
        <div className="game-nav-brand">
          <span className="game-nav-brand-dot" />
          <span>Prabin House</span>
        </div>

        <nav className="game-nav-links" aria-label="House navigation">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} className="game-nav-link">
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
