import { copy } from "../copy";

// Reading controls above and below the book. Hidden (and inert) until the
// book is open. Nothing here repeats what the pages already say.
export default function Hud({ visible, folio, canPrev, canNext, onPrev, onNext, onContents, onClose }) {
  return (
    <div className="hud" data-visible={visible} inert={!visible}>
      <div className="hud__top">
        <button type="button" className="hud__button" onClick={onContents}>
          {copy.hud.contents}
        </button>
        <button type="button" className="hud__button" onClick={onClose}>
          {copy.hud.close}
        </button>
      </div>

      <nav className="hud__bottom" aria-label="Pages">
        <button type="button" className="hud__arrow" onClick={onPrev} disabled={!canPrev} aria-label={copy.hud.prev}>
          ←
        </button>
        <span className="hud__folio">{folio}</span>
        <button type="button" className="hud__arrow" onClick={onNext} disabled={!canNext} aria-label={copy.hud.next}>
          →
        </button>
      </nav>
    </div>
  );
}
