import "./pages.css";

// Paper, running head and folio around a page's content. `active` is true
// while the page is on screen; pages.css uses it to play the page's reveal.
// The running head (chapter name) only heads right-hand pages, so a spread
// never says the same thing twice.
export function PageFrame({ page, side, folio, active, children }) {
  if (page.kind === "cover") return children;
  if (page.kind === "endpaper") return <div className={`endpaper endpaper--${side}`} />;
  if (page.kind === "blank") return <div className={`paper paper--${side} paper--blank`} />;

  return (
    <div className={`paper paper--${side}`} data-active={active}>
      {page.running && side === "recto" && <header className="paper__running">{page.running}</header>}
      <div className="paper__body">{children}</div>
      {page.numbered && <footer className="paper__folio">{folio}</footer>}
    </div>
  );
}

export function Tape({ className = "" }) {
  return <span className={`tape ${className}`} aria-hidden="true" />;
}

// A photo taped onto the page.
export function Polaroid({ src, alt, fit = "cover", light, className = "", children }) {
  return (
    <figure className={`polaroid pop ${className}`}>
      <Tape />
      <div className={`polaroid__photo${light ? " polaroid__photo--light" : ""}`}>
        <img src={src} alt={alt} style={{ objectFit: fit }} loading="lazy" />
      </div>
      {children && <figcaption className="polaroid__caption">{children}</figcaption>}
    </figure>
  );
}

// The photo if there is one, otherwise a hand-drawn sketch in the same taped
// frame. Naming a file for the matching content field replaces the sketch.
export function PhotoSlot({ src, alt = "", sketch, fit, light, className = "", children }) {
  if (src) {
    return (
      <Polaroid src={src} alt={alt} fit={fit} light={light} className={className}>
        {children}
      </Polaroid>
    );
  }
  return (
    <figure className={`polaroid polaroid--sketch pop ${className}`} aria-hidden="true">
      <Tape />
      <div className="polaroid__photo">{sketch}</div>
    </figure>
  );
}

export function Sticky({ tone = "yellow", className = "", style, children }) {
  return (
    <div className={`sticky sticky--${tone} pop ${className}`} style={style}>
      {children}
    </div>
  );
}

export function TextLink({ href, children, download }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      className="text-link"
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}
