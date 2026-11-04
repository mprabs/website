import { versions, DEFAULT_VERSION } from "../versions/registry";

const STORAGE_KEY = "portfolio:version";
const QUERY_PARAM = "v";

// Accepts "v1.2", "V1.2" or "1.2".
function normalizeId(raw) {
  if (!raw) return null;
  const id = raw.trim().toLowerCase();
  return id.startsWith("v") ? id : `v${id}`;
}

export function getVersion(id) {
  return versions.find((version) => version.id === normalizeId(id)) || null;
}

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Private mode or blocked storage: the ?v= param still carries the choice.
  }
}

// Priority: ?v= in the URL (also remembered), then the last choice, then default.
export function resolveVersion() {
  const fromUrl = getVersion(
    new URLSearchParams(window.location.search).get(QUERY_PARAM)
  );
  if (fromUrl) {
    store(fromUrl.id);
    return fromUrl;
  }

  return getVersion(readStored()) || getVersion(DEFAULT_VERSION);
}

// Versions load their own global CSS, so switching does a full page load
// rather than swapping components in place - no styles leak between designs.
export function switchVersion(id) {
  store(id);
  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_PARAM, id);
  window.location.assign(url);
}

export function listedVersions(activeId) {
  return versions.filter(
    (version) =>
      version.status !== "draft" ||
      import.meta.env.DEV ||
      version.id === activeId
  );
}
