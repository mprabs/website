import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Book, { FLIP_MS } from "./book/Book";
import {
  anchorIndex,
  lastPosition,
  positionOf,
  readablePages,
  useBookLayout,
  visibleIndices,
} from "./book/layout";
import { buildPages } from "./pages/buildPages";
import { PageFrame } from "./pages/Page";
import Scene from "./scene/Scene";
import Hud from "./components/Hud";
import Manuscript from "./components/Manuscript";
import { copy } from "./copy";

// Phases: intro (closed book on the table) → opening (camera moves in,
// cover swings) → reading → closing → intro. The first screen is only the
// book: the seal on its cover is the way in.
const CAMERA_MS = 1000;
const MAX_STAGGER_TOTAL_MS = 900;
const SWIPE_PX = 48;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTyping = () => ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);

export default function BookExperience() {
  const layout = useBookLayout();
  const { mode } = layout;
  const { pages, folios } = useMemo(buildPages, []);
  const readable = readablePages(pages, mode);
  const count = readable.length;
  const last = lastPosition(count, mode);

  const [phase, setPhase] = useState("intro");
  const [hasOpened, setHasOpened] = useState(false);
  // The scene fades up from black on first paint.
  const [lit, setLit] = useState(false);
  // Your place is stored as a page id, so it survives switching between
  // spread and single-page layouts.
  const [view, setView] = useState({ anchor: "cover", from: "cover" });
  const [post, setPost] = useState(null);
  const timers = useRef([]);
  const touch = useRef(null);

  // A page that only exists in the spread (a blank) maps to the next real page.
  const indexOf = (id) => {
    const found = readable.findIndex((page) => page.id === id);
    if (found >= 0) return found;
    const next = pages.slice(pages.findIndex((page) => page.id === id) + 1).find((page) => readable.includes(page));
    return next ? readable.indexOf(next) : 0;
  };
  const position = positionOf(indexOf(view.anchor), mode);
  const from = positionOf(indexOf(view.from), mode);

  const later = useCallback((ms, fn) => {
    timers.current.push(setTimeout(fn, prefersReducedMotion() ? 0 : ms));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const goToPosition = (next) => {
    const target = Math.min(last, Math.max(0, next));
    setView((current) => ({
      anchor: readable[anchorIndex(target, count, mode)].id,
      from: current.anchor,
    }));
  };

  const goToPage = (id) => goToPosition(positionOf(indexOf(id), mode));

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const openBook = () => {
    if (phase !== "intro") return;
    setHasOpened(true);
    setPhase("opening");
    later(CAMERA_MS, () => goToPosition(1));
    later(CAMERA_MS + FLIP_MS, () => setPhase("reading"));
  };

  const closeBook = () => {
    if (phase !== "reading") return;
    setPost(null);
    setPhase("closing");
    const turning = position;
    goToPosition(0);
    const stagger = turning > 1 ? Math.min(MAX_STAGGER_TOTAL_MS, turning * 90) : 0;
    later(FLIP_MS + stagger, () => setPhase("intro"));
  };

  const reading = phase === "reading";
  const next = () => reading && position < last && goToPosition(position + 1);
  const prev = () => {
    if (!reading) return;
    if (position <= 1) closeBook();
    else goToPosition(position - 1);
  };

  // Keyboard: arrows and page keys turn pages while reading.
  useEffect(() => {
    const onKey = (e) => {
      if (post || isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!reading) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") next();
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touch.current || !reading || post) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) next();
    else prev();
  };

  // Chrome hit-tests a tilted, floating 3D book unreliably (taps can land on
  // the rig instead of the cover), so the stage opens the book for a click
  // anywhere on it, including the cover seal's own click as it bubbles up.
  const onStageClick = (e) => {
    if (phase === "intro" && e.target.closest(".book")) openBook();
  };

  const ctx = {
    goToPage,
    openPost: setPost,
    closeBook,
    canOpen: phase === "intro",
  };

  const renderPage = (page, side, active) => (
    <PageFrame page={page} side={side} folio={folios[page.id]} active={active}>
      {page.render?.(ctx)}
    </PageFrame>
  );

  const onScreen = visibleIndices(position, count, mode).map((i) => readable[i]);
  const numbered = onScreen.filter((page) => page.numbered);
  const totalFolios = Object.keys(folios).length;
  const folioLabel = numbered.length
    ? `${numbered.map((page) => folios[page.id]).join("–")} / ${totalFolios}`
    : "";

  const pose = phase === "intro" ? "intro" : "open";

  return (
    <div className="stage" data-phase={phase} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Scene pose={pose} />

      <div className="stage__book" style={{ "--band": `${layout.band}px` }} onClick={onStageClick}>
        <Book
          pages={pages}
          mode={mode}
          position={position}
          from={from}
          pose={pose}
          size={layout}
          arriving={phase === "intro" && !hasOpened}
          renderPage={renderPage}
          turnLabels={copy.hud}
          onPrev={prev}
          onNext={position < last ? next : null}
        />
      </div>

      <Hud
        visible={reading}
        folio={folioLabel}
        canPrev={position > 0}
        canNext={position < last}
        onPrev={prev}
        onNext={next}
        onContents={() => goToPage("contents")}
        onClose={closeBook}
      />

      <div className="veil" data-on={!lit} aria-hidden="true" />

      {post && <Manuscript post={post} onClose={() => setPost(null)} />}
    </div>
  );
}
