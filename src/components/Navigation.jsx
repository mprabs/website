import {
  FiCode,
  FiUser,
  FiBriefcase,
  FiBox,
  FiSettings,
  FiBook,
  FiMail,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <FiCode />, label: "Home" },
    { path: "/about", icon: <FiUser />, label: "About" },
    { path: "/experience", icon: <FiBriefcase />, label: "Experience" },
    { path: "/projects", icon: <FiBox />, label: "Projects" },
    { path: "/blogs", icon: <FiBook />, label: "Blogs" },
    { path: "/contact", icon: <FiMail />, label: "Contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <nav className="glass-panel rounded-2xl px-2 py-2 flex items-center justify-between shadow-2xl shadow-black/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative p-3 rounded-xl transition-all duration-300 group flex flex-col items-center justify-center
                                ${
                                  isActive
                                    ? "text-white bg-vscode-accent/10"
                                    : "text-vscode-muted hover:text-white hover:bg-vscode-surface"
                                }`}
              aria-label={item.label}
            >
              <span
                className={`text-xl transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-vscode-surface border border-vscode-border rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-vscode-accent shadow-[0_0_8px_rgba(88,166,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
