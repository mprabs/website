import { buildLeaves } from "./layout";
import "./book.css";

export const FLIP_MS = 1100;
const MAX_STAGGER_MS = 90;
const MAX_TOTAL_STAGGER_MS = 900;
// Depth between stacked leaves. The leaves on screen always sit at z = 0, so
// the pages you read are never scaled by perspective and text stays crisp.
const LEAF_GAP = 0.5;

// The physical book: a stack of two-sided leaves hinged on the spine.
// It knows nothing about content; renderPage(page, side, active) draws each face,
// where active means that face is the one on screen.
export default function Book({
  pages,
  mode,
  position,
  from,
  pose,
  size,
  arriving,
  renderPage,
  turnLabels,
  onPrev,
  onNext,
}) {
  const leaves = buildLeaves(pages, mode);
  const forward = position >= from;
  const turning = Math.abs(position - from);
  const stagger = turning > 1 ? Math.min(MAX_STAGGER_MS, MAX_TOTAL_STAGGER_MS / turning) : 0;

  // A closed book (or any single page) is centred on its right half.
  const shift = mode === "spread" && position > 0 ? 0 : -size.w / 2;

  return (
    <div
      className="book"
      data-mode={mode}
      data-pose={pose}
      data-arriving={arriving}
      style={{
        "--page-w": `${size.w}px`,
        "--page-h": `${size.h}px`,
        "--page-font": `${size.font}px`,
        "--intro-scale": size.introScale,
        "--shift": `${shift}px`,
        "--depth": `${Math.round(size.w * 0.07)}px`,
        "--flip-ms": `${FLIP_MS}ms`,
        "--prev-left": shift === 0 ? "0%" : "50%",
      }}
    >
      <div className="book__rig">
        <div className="book__float">
          <div className="book__shadow book__shadow--right" />
          <div className="book__shadow book__shadow--left" data-on={shift === 0} />

          <div
            className="book__block"
            style={{ transform: `translateZ(${-(leaves.length * LEAF_GAP + 1)}px)` }}
          >
            <div className="paper paper--blank" />
          </div>
          <div className="book__edge book__edge--fore" />
          <div className="book__edge book__edge--top" />
          <div className="book__edge book__edge--bottom" />

          {leaves.map((leaf, i) => {
            const turned = i < position;
            const z = turned ? -(position - 1 - i) * LEAF_GAP : -(i - position) * LEAF_GAP;
            const moving = i >= Math.min(from, position) && i < Math.max(from, position);
            const order = forward ? i - from : from - 1 - i;
            const delay = moving ? order * stagger : 0;
            // One page at a time: turned leaves would peek in at the left edge,
            // so they hide once their turn finishes (and reappear as it starts back).
            const hidden = mode === "single" && turned;
            const frontVisible = i === position;
            const backVisible = mode === "spread" && i === position - 1;

            return (
              <div
                key={`${mode}-${i}`}
                className={`leaf${i === 0 ? " leaf--cover" : ""}`}
                data-turn={moving ? (forward ? "forward" : "back") : undefined}
                style={{
                  "--delay": `${delay}ms`,
                  transform: `translateZ(${z}px) rotateY(${turned ? -180 : 0}deg)`,
                  visibility: hidden ? "hidden" : "visible",
                  transitionProperty: "transform, visibility",
                  transitionDuration: `${FLIP_MS}ms, 0ms`,
                  transitionDelay: `${delay}ms, ${hidden ? delay + FLIP_MS : delay}ms`,
                }}
              >
                <div
                  className="leaf__face leaf__face--front"
                  inert={!frontVisible}
                  aria-hidden={!frontVisible}
                >
                  {renderPage(leaf.front, "recto", frontVisible)}
                </div>
                <div
                  className="leaf__face leaf__face--back"
                  inert={!backVisible}
                  aria-hidden={!backVisible}
                >
                  {leaf.back ? (
                    renderPage(leaf.back, "verso", backVisible)
                  ) : (
                    <div className="paper paper--blank" />
                  )}
                </div>
              </div>
            );
          })}

          {pose === "open" && position > 0 && (
            <>
              <button
                type="button"
                className="book__turn book__turn--prev"
                aria-label={turnLabels.prev}
                onClick={onPrev}
              />
              {onNext && (
                <button
                  type="button"
                  className="book__turn book__turn--next"
                  aria-label={turnLabels.next}
                  onClick={onNext}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
