import {
  FiCode,
  FiUser,
  FiBriefcase,
  FiBox,
  FiBook,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", icon: <FiCode />, label: "Home" },
    { path: "/about", icon: <FiUser />, label: "About" },
    { path: "/experience", icon: <FiBriefcase />, label: "Experience" },
    { path: "/projects", icon: <FiBox />, label: "Projects" },
    { path: "/blogs", icon: <FiBook />, label: "Blogs" },
    { path: "/contact", icon: <FiMail />, label: "Contact" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop / Tablet Nav */}
      <div className="hidden sm:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-auto">
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

      {/* Mobile Floating Hamburger */}
      <div
        className="sm:hidden fixed z-50 pointer-events-auto left-auto flex flex-col items-end"
        style={{
          right: "max(1rem, env(safe-area-inset-right))",
          top: "max(1rem, env(safe-area-inset-top))",
        }}
      >
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full border border-vscode-border bg-vscode-surface/90 backdrop-blur-md text-white flex items-center justify-center shadow-2xl shadow-black/60 active:scale-95 transition-transform"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>

        <div
          className={`mt-3 w-64 rounded-2xl border border-vscode-border bg-vscode-surface/95 backdrop-blur-md shadow-2xl shadow-black/60 overflow-hidden origin-top-right transition-all duration-200 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <nav className="p-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-vscode-accent/15 border border-vscode-accent/30"
                      : "text-vscode-text hover:bg-vscode-bg/70"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
