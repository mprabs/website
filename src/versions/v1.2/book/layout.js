import { useEffect, useState } from "react";

// Wide screens read a two-page spread; narrow ones read one page at a time.
const SPREAD_MIN_WIDTH = 900;
const SPREAD_MIN_HEIGHT = 560;

const even = (n) => Math.floor(n / 2) * 2;
const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

function measure() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mode = vw >= SPREAD_MIN_WIDTH && vh >= SPREAD_MIN_HEIGHT ? "spread" : "single";
  // Room kept free above and below the book for the reading controls.
  const band = mode === "spread" ? 72 : 60;
  const availH = vh - band * 2;

  let w;
  let h;
  if (mode === "spread") {
    w = Math.min((vw - 96) / 2, availH * 0.7, 620);
    h = Math.min(availH, w / 0.68);
  } else {
    w = Math.min(vw - 24, 520);
    h = Math.min(availH, w / 0.52);
  }
  w = even(w);
  h = Math.round(h);

  return {
    mode,
    band,
    w,
    h,
    font: clamp(14.5, w * 0.033, 17.5),
    // The closed book on the intro screen is about this wide on screen.
    introScale: Math.min(300, vw * 0.62) / w,
  };
}

export function useBookLayout() {
  const [layout, setLayout] = useState(measure);

  useEffect(() => {
    const onResize = () => {
      // Phone keyboards shrink the viewport; don't reflow the book mid-typing.
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      setLayout(measure());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return layout;
}

// A "position" is how many leaves have been turned: 0 is the closed book.
// Spread: position p shows pages 2p-1 (left) and 2p (right).
// Single: position p shows readable page p. Pages marked spreadOnly (endpapers)
// become the back of the previous leaf instead of a page of their own.

export function readablePages(pages, mode) {
  return mode === "single" ? pages.filter((page) => !page.spreadOnly) : pages;
}

export function buildLeaves(pages, mode) {
  const leaves = [];
  if (mode === "single") {
    for (const page of pages) {
      if (page.spreadOnly && leaves.length) leaves[leaves.length - 1].back = page;
      else leaves.push({ front: page, back: null });
    }
  } else {
    for (let i = 0; i < pages.length; i += 2) {
      leaves.push({ front: pages[i], back: pages[i + 1] || null });
    }
  }
  return leaves;
}

export function lastPosition(count, mode) {
  return mode === "single" ? count - 1 : Math.floor(count / 2);
}

export function positionOf(index, mode) {
  return mode === "single" ? index : Math.ceil(index / 2);
}

// The page that represents a position (used to keep your place on resize).
export function anchorIndex(position, count, mode) {
  if (mode === "single" || position === 0) return position;
  return Math.min(position * 2, count - 1);
}

// Readable indices of the pages on screen at a position.
export function visibleIndices(position, count, mode) {
  if (mode === "single" || position === 0) return [position];
  return [position * 2 - 1, position * 2].filter((i) => i < count);
}
