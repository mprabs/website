// Little hand-drawn marks for the technologies in stacks and tags. Tags are
// matched by keyword, so "ReactJS", "React" and "React Native" share one icon.
// Tags with no match simply render without an icon.

const ICONS = {
  react: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </>
  ),
  next: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9 16V8l7.5 10M15 8v5" />
    </>
  ),
  vue: <path d="M3 4h4l5 8.5L17 4h4L12 20Z M7.5 4 12 11.5 16.5 4" />,
  ts: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 11h5M9.5 11v6M18 11.5c-.6-.7-3.3-1-3.3.9 0 1.8 3.5 1.2 3.5 3.1 0 1.8-2.9 1.6-3.7.7" />
    </>
  ),
  js: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M11 10v5.5c0 1.6-2.2 1.9-3 .8M18 11c-.6-.7-3.3-1-3.3.9 0 1.8 3.5 1.2 3.5 3.1 0 1.8-2.9 1.6-3.7.7" />
    </>
  ),
  flutter: <path d="M14 3 5 12l3 3L20 3ZM14 12l-5 5 5 4h6l-5-4 5-5Z" />,
  node: (
    <>
      <path d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3Z" />
      <path d="M12 8v8" />
    </>
  ),
  tailwind: <path d="M3 11c2-4 5-5 8-3s4 3 7 1M6 16c2-4 5-5 8-3s4 3 7 1" />,
  cloud: <path d="M7 18h10.5a4 4 0 0 0 .3-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18Z" />,
  video: (
    <>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
      <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    </>
  ),
  code: <path d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14" />,
  git: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10M18 11c0 4-6 3-11 6.5" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  api: <path d="M4 12h4l2-5 4 10 2-5h4" />,
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  shop: <path d="M3 4h2.5l2.3 11h10.4L20.5 7H7M9 20a1 1 0 1 0 0-.1M17 20a1 1 0 1 0 0-.1" />,
  build: <path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L3.5 17.5l3 3 5.8-5.8a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.6-.4-.4-2.6Z" />,
  brain: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  map: <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11ZM12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />,
};

// First match wins, so more specific keywords come before general ones.
const MATCHERS = [
  [/next/, "next"],
  [/react/, "react"],
  [/vue/, "vue"],
  [/typescript/, "ts"],
  [/javascript|vanilla/, "js"],
  [/flutter|riverpod|hive/, "flutter"],
  [/node|express/, "node"],
  [/tailwind/, "tailwind"],
  [/aws|supabase|vercel|netlify/, "cloud"],
  [/webrtc|agora|video|media|audio/, "video"],
  [/html|css|codemirror|design system|web development/, "code"],
  [/\bgit\b|ci\/cd/, "git"],
  [/mongo|local-first|redux|vuex/, "db"],
  [/rest|api|websocket|ipify/, "api"],
  [/mobile|expo|admob/, "phone"],
  [/commerce|shopify|payment/, "shop"],
  [/webpack|vite|build|productivity/, "build"],
  [/tensorflow|neuro|genetic|box2d/, "brain"],
  [/leaflet|map/, "map"],
];

function iconFor(tag) {
  const key = tag.toLowerCase();
  const match = MATCHERS.find(([pattern]) => pattern.test(key));
  return match ? match[1] : null;
}

export function TechIcon({ tag }) {
  const name = iconFor(tag);
  if (!name) return null;
  return (
    <svg
      className="tech-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}
