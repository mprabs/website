import { experience, profile } from "../../../content";
import { copy } from "../copy";
import { Polaroid, Sticky } from "./Page";
import { ScribbleCircle, Sparkle, Underline } from "./doodles";

export function Cover({ ctx }) {
  return (
    <div className="cover" data-ready={ctx.canOpen}>
      <svg className="cover__mark" viewBox="0 0 64 40" aria-hidden="true">
        <path d="M20 8L6 20L20 32M44 8L58 20L44 32M37 4L27 36" />
      </svg>

      <div className="cover__label">
        <h1 className="cover__name">{profile.name.full}</h1>
        <p className="cover__role">{profile.role}</p>
        <p className="cover__volume">{copy.cover.volume}</p>
      </div>

      {profile.candid && <Polaroid className="cover__photo" src={profile.candid} alt="" />}

      <span className="cover__band" aria-hidden="true" />

      {/* The seal is the visible, focusable control. Its click bubbles to the
          stage, which opens the book for a click anywhere on it (see BookExperience). */}
      <button type="button" className="cover__seal" disabled={!ctx.canOpen} aria-label={copy.cover.openLabel}>
        <span className="cover__seal-text">{copy.cover.open}</span>
        <svg viewBox="0 0 40 16" aria-hidden="true">
          <path d="M3 9C12 5 22 12 33 7M27 3L34 7L28 12" />
        </svg>
      </button>
    </div>
  );
}

// The job with no end date is the one I'm in now.
const currentJob = experience.find((job) => !job.end);

export function Foreword() {
  return (
    <div className="foreword">
      <h2 className="page-heading">
        {copy.foreword.heading}
        <Underline className="page-heading__underline" />
        <Sparkle className="page-heading__sparkle" />
      </h2>

      <Polaroid className="foreword__photo" src={profile.portrait} alt={profile.name.full}>
        {copy.foreword.annotation}
      </Polaroid>

      <p className="prose prose--dropcap">{profile.bio}</p>

      {currentJob && (
        <Sticky className="foreword__note" style={{ "--at": "700ms" }}>
          <span className="label">{copy.foreword.currently}</span>
          {currentJob.role} at {currentJob.company}
        </Sticky>
      )}
    </div>
  );
}

export function Contents({ ctx }) {
  return (
    <nav className="contents" aria-label={copy.contents.heading}>
      <h2 className="page-heading">
        {copy.contents.heading}
        <Underline className="page-heading__underline" />
      </h2>
      <ol className="contents__list">
        {ctx.chapters.map((chapter, i) => (
          <li key={chapter.id} style={{ "--at": `${i * 120}ms` }}>
            <button type="button" className="contents__entry" onClick={() => ctx.goToPage(chapter.pageId)}>
              <span className="contents__numeral">
                <ScribbleCircle className="contents__circle" />
                {chapter.numeral}
              </span>
              <span className="contents__title">{chapter.title}</span>
              <span className="leader" aria-hidden="true" />
              <span className="contents__folio">{chapter.folio}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
