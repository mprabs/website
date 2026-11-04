import { useEffect, useRef, useState } from "react";
import { listedVersions, switchVersion } from "./version";
import "./VersionSwitcher.css";

// "2026-11" -> "November 2026"
function formatReleased(value) {
  if (!value) return null;
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1).toLocaleString("en", { month: "long", year: "numeric" });
}

// Rendered on top of every version, so it is styled with its own plain CSS
// and does not depend on any version's design tokens.
export default function VersionSwitcher({ activeId }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const options = listedVersions(activeId);

  useEffect(() => {
    if (!isOpen) return;

    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !rootRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isOpen]);

  if (options.length < 2) return null;

  return (
    <div className="version-switcher" ref={rootRef}>
      {isOpen && (
        <ul className="version-switcher__menu" aria-label="Site versions">
          {options.map((version) => {
            const isActive = version.id === activeId;
            return (
              <li key={version.id}>
                <button
                  type="button"
                  className="version-switcher__option"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => (isActive ? setIsOpen(false) : switchVersion(version.id))}
                >
                  <span className="version-switcher__id">{version.id}</span>
                  <span className="version-switcher__name">
                    {version.name}
                    {version.released && (
                      <span className="version-switcher__date">{formatReleased(version.released)}</span>
                    )}
                  </span>
                  {version.status === "draft" && (
                    <span className="version-switcher__badge">draft</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        className="version-switcher__toggle"
        aria-expanded={isOpen}
        aria-label={`Site version ${activeId}. Switch version`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {activeId}
      </button>
    </div>
  );
}
