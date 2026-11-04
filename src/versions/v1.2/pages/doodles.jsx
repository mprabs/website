// Hand-drawn marks and line illustrations. Strokes with className "draw" use
// pathLength="1" so pages.css can animate them drawing in when a page opens.

function Svg({ viewBox, className = "", style, children, preserveAspectRatio }) {
  return (
    <svg
      className={`doodle ${className}`}
      viewBox={viewBox}
      style={style}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

// A stroke that draws itself; `at` staggers it after the page's reveal start.
function Stroke({ d, width = 2, at = 0 }) {
  return (
    <path
      className="draw"
      d={d}
      pathLength="1"
      strokeWidth={width}
      style={at ? { "--at": `${at}ms` } : undefined}
    />
  );
}

export function ScribbleCircle(props) {
  return (
    <Svg viewBox="0 0 120 100" {...props}>
      <Stroke d="M66 9C94 9 114 29 110 53C106 79 80 93 53 91C26 89 8 70 10 46C12 23 34 8 60 11C75 13 87 18 95 25" width={2.4} />
    </Svg>
  );
}

export function Underline(props) {
  return (
    <Svg viewBox="0 0 200 16" preserveAspectRatio="none" {...props}>
      <Stroke d="M3 10C42 4 82 13 122 7C152 3 176 9 197 5" width={3} />
    </Svg>
  );
}

export function Arrow(props) {
  return (
    <Svg viewBox="0 0 100 60" {...props}>
      <Stroke d="M8 52C18 26 46 12 86 16" width={2.2} />
      <Stroke d="M74 7L87 16L76 27" width={2.2} at={450} />
    </Svg>
  );
}

export function Star(props) {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <Stroke d="M20 4L24.6 15.2L36 15.9L27.2 23.3L30.1 34.6L20 28.3L9.9 34.6L12.8 23.3L4 15.9L15.4 15.2Z" width={2} />
    </Svg>
  );
}

export function Sparkle(props) {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <Stroke d="M20 5C21 15 24 19 35 20C24 21 21 25 20 35C19 25 16 21 5 20C16 19 19 15 20 5Z" width={1.8} />
    </Svg>
  );
}

export function Check(props) {
  return (
    <Svg viewBox="0 0 20 20" {...props}>
      <Stroke d="M3 11L8 16L17 4" width={2.4} />
    </Svg>
  );
}

// Soft painted shape behind numerals and stickers (no stroke, no animation).
export function Blob({ className = "", style }) {
  return (
    <svg className={`blob ${className}`} style={style} viewBox="0 0 120 100" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M62 6C88 4 112 20 114 46C116 72 96 95 64 95C36 95 9 82 7 55C5 29 33 8 62 6Z"
      />
    </svg>
  );
}

export function CoffeeRing({ className = "" }) {
  return (
    <svg className={`coffee ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <filter id="coffee-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
      </defs>
      <g filter="url(#coffee-rough)" fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="44" strokeWidth="5" opacity="0.55" />
        <circle cx="60" cy="60" r="41" strokeWidth="1.5" opacity="0.4" />
        <path d="M18 74C22 92 40 104 58 104" strokeWidth="8" opacity="0.25" />
      </g>
    </svg>
  );
}

// ---------- chapter illustrations ----------

const ILLUSTRATIONS = {
  experience: (
    <>
      <Stroke d="M26 26a10 10 0 1 0 0.1 0" width={1.8} />
      <Stroke d="M6 96C30 76 52 80 74 66C96 52 118 56 154 36" width={2} at={150} />
      <Stroke d="M14 104C40 96 62 100 86 86C106 74 120 74 138 54" width={1.6} at={300} />
      <Stroke d="M38 98a3 3 0 1 0 0.1 0M76 88a3 3 0 1 0 0.1 0M112 72a3 3 0 1 0 0.1 0" width={2.4} at={700} />
      <Stroke d="M138 54V22" width={2} at={900} />
      <Stroke d="M138 22L158 28L138 36" width={2} at={1100} />
    </>
  ),
  featured: (
    <>
      <Stroke d="M80 20C62 20 50 34 50 50C50 61 56 68 63 74C66 77 67 81 67 86H93C93 81 94 77 97 74C104 68 110 61 110 50C110 34 98 20 80 20Z" width={2} />
      <Stroke d="M68 94H92M71 102H89" width={2} at={400} />
      <Stroke d="M71 60L77 51L83 60L89 51" width={1.8} at={650} />
      <Stroke d="M80 3V11M44 14L50 20M116 14L110 20M30 50H38M122 50H130" width={1.8} at={900} />
    </>
  ),
  archive: (
    <>
      <Stroke d="M36 66L120 63L122 100L38 102Z" width={2} />
      <Stroke d="M46 38L112 36L114 64L48 66Z" width={2} at={250} />
      <Stroke d="M58 12L100 12L101 37L59 38Z" width={2} at={500} />
      <Stroke d="M72 80H88M70 50H90M74 24H86" width={1.8} at={800} />
    </>
  ),
  craft: (
    <>
      <Stroke d="M30 18H116V74H30Z" width={2} />
      <Stroke d="M18 74H128L138 88H8Z" width={2} at={250} />
      <Stroke d="M58 38L50 46L58 54M88 38L96 46L88 54M78 36L68 56" width={1.8} at={500} />
      <Stroke d="M142 58H158V84C158 89 154 93 150 93C146 93 142 89 142 84Z" width={2} at={750} />
      <Stroke d="M158 64C165 64 165 77 158 77" width={1.8} at={900} />
      <Stroke d="M146 50C144 46 148 44 146 40M153 50C151 46 155 44 153 40" width={1.6} at={1050} />
    </>
  ),
  writing: (
    <>
      <Stroke d="M46 84L118 12L134 28L62 100Z" width={2} />
      <Stroke d="M46 84L38 108L62 100" width={2} at={300} />
      <Stroke d="M110 20L126 36" width={1.8} at={500} />
      <Stroke d="M6 104C14 94 22 108 30 98C34 93 38 100 42 96" width={1.8} at={800} />
    </>
  ),
  letter: (
    <>
      <Stroke d="M22 62L152 14L106 100L86 74Z" width={2} />
      <Stroke d="M152 14L86 74L80 98L98 84" width={2} at={350} />
      <Stroke d="M22 62C10 70 4 86 16 94C28 102 40 88 30 80" width={1.6} at={700} />
    </>
  ),
};

export function Illustration({ name, className = "" }) {
  const art = ILLUSTRATIONS[name];
  if (!art) return null;
  return (
    <Svg viewBox="0 0 170 112" className={`illustration ${className}`}>
      {art}
    </Svg>
  );
}

// ---------- sketches that stand in for photos ----------

// A company's initial, stamped like a monogram, for jobs without a logo file.
export function Monogram({ name }) {
  return (
    <svg className="monogram" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="16.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.4 2.2" />
      <text x="20" y="27.5" textAnchor="middle">
        {name.trim().charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}

export function DeskSketch() {
  return (
    <Svg viewBox="0 0 120 120" className="sketch">
      <Stroke d="M18 22H102V72H18Z" width={2} />
      <Stroke d="M54 72L50 86H70L66 72M42 87H78" width={2} at={200} />
      <Stroke d="M30 38L24 47L30 56M46 38L52 47L46 56M41 36L35 58" width={1.6} at={400} />
      <Stroke d="M60 40H88M60 48H82M60 56H90" width={1.6} at={550} />
      <Stroke d="M10 104H72L78 96H16Z" width={1.8} at={700} />
      <Stroke d="M22 100H66" width={1.2} at={850} />
      <Stroke d="M88 88H104V104C104 108 100 110 96 110C92 110 88 108 88 104Z" width={1.8} at={950} />
      <Stroke d="M104 93C110 93 110 102 104 102" width={1.6} at={1050} />
      <Stroke d="M92 82C90 78 94 76 92 72M99 82C97 78 101 76 99 72" width={1.4} at={1150} />
    </Svg>
  );
}

export function InterestsSketch() {
  return (
    <Svg viewBox="0 0 120 120" className="sketch">
      <Stroke d="M40 22a20 20 0 1 0 0.1 0" width={2} />
      <Stroke d="M40 34L48 40L45 50H35L32 40Z" width={1.6} at={250} />
      <Stroke d="M40 34V24M48 40L58 36M45 50L51 58M35 50L29 58M32 40L22 36" width={1.4} at={400} />
      <Stroke d="M84 30C76 30 72 38 76 44L70 52H90V44C94 40 92 30 84 30Z" width={1.8} at={600} />
      <Stroke d="M68 56H94V62H68ZM64 62H98V68H64Z" width={1.8} at={750} />
      <Stroke d="M20 82H58V108H20ZM28 82L32 76H44L48 82" width={1.8} at={900} />
      <Stroke d="M39 95a7 7 0 1 0 0.1 0" width={1.6} at={1050} />
      <Stroke d="M74 90C80 84 88 96 94 88C98 84 102 92 106 88" width={1.4} at={1150} />
    </Svg>
  );
}
