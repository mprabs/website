// Every design version of the site. Each one is a self-contained app in its own
// folder (routes, components, styles, copy) and reads facts from src/content.
//
// status:
//   "stable" - finished; listed in the switcher everywhere
//   "draft"  - in progress; listed in dev only (still reachable via ?v=<id>)
//
// released: "YYYY-MM" the version went live, shown in the version switcher.
// backdrop: page background painted before the version's CSS arrives, so the
// first frame matches the design instead of flashing white.
export const versions = [
  {
    id: "v1.2",
    name: "Book",
    status: "stable",
    released: "2026-11",
    backdrop: "#0c0a08",
    load: () => import("./v1.2/App.jsx"),
  },
  {
    id: "v1.1",
    name: "Code Editor",
    status: "stable",
    released: "2024-06",
    backdrop: "#0d1117",
    load: () => import("./v1.1/App.jsx"),
  },
];

// What a first-time visitor sees. Flip this when a new version ships.
export const DEFAULT_VERSION = "v1.2";
