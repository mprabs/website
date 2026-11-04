import { formatPeriod, skills, social, profile } from "../../../content";
import { copy } from "../copy";
import { PhotoSlot, Polaroid, Sticky, Tape, TextLink } from "./Page";
import { TechIcon } from "./techIcons";
import {
  Arrow,
  Blob,
  Check,
  CoffeeRing,
  DeskSketch,
  Illustration,
  InterestsSketch,
  Monogram,
  ScribbleCircle,
  Star,
  Underline,
} from "./doodles";

const STICKY_TONES = ["yellow", "pink", "blue"];

const toMonths = (value) => {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
};

// A hand-drawn ruler of years with a highlighter bar per job, drawn from the
// jobs' start and end months. Each company jumps to its page.
function Timeline({ jobs, ctx }) {
  const today = new Date();
  const now = today.getFullYear() * 12 + today.getMonth();
  const firstYear = Math.floor(Math.min(...jobs.map((job) => toMonths(job.start))) / 12);
  const lastYear = today.getFullYear();
  const span = (lastYear + 1 - firstYear) * 12;
  const at = (months) => ((months - firstYear * 12) / span) * 100;
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  const ordered = [...jobs].sort((a, b) => toMonths(a.start) - toMonths(b.start));

  return (
    <div className="timeline" aria-label={copy.experience.timeline}>
      <svg className="timeline__line" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden="true">
        <path className="draw" pathLength="1" d="M2 5C60 3 120 7 180 4.5S260 6 298 5" />
      </svg>
      {years.map((year) => (
        <span key={year} className="timeline__year" style={{ left: `${at(year * 12)}%` }} aria-hidden="true">
          {`'${String(year).slice(2)}`}
        </span>
      ))}
      {ordered.map((job, i) => {
        const left = at(toMonths(job.start));
        const width = Math.max(at(job.end ? toMonths(job.end) + 1 : now) - left, 1.6);
        const place = i % 2 ? "above" : "below";
        return (
          <button
            key={job.id}
            type="button"
            className={`timeline__job timeline__job--${place}${width > 25 ? " timeline__job--wide" : ""}`}
            style={{ left: `${left}%`, width: `${width}%`, "--at": `${900 + i * 200}ms` }}
            onClick={() => ctx.goToPage(`job-${job.id}`)}
          >
            <span className="timeline__bar" />
            <span className="timeline__label">{job.company.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ChapterOpener({ chapter, stats, timeline, photo, ctx }) {
  return (
    <div className={`opener tone-${chapter.tone}`}>
      <div className="opener__mark" aria-hidden="true">
        <Blob className="opener__blob pop" />
        <ScribbleCircle className="opener__circle" />
        <span className="opener__numeral">{chapter.numeral}</span>
      </div>
      <h2 className="opener__title">
        <span className="sr-only">
          {copy.chapterLabel} {chapter.numeral}:{" "}
        </span>
        {chapter.title}
      </h2>
      <p className="opener__lede">{chapter.lede}</p>
      {timeline ? (
        <Timeline jobs={timeline} ctx={ctx} />
      ) : (
        <div className="opener__visuals">
          {photo && <PhotoSlot className="opener__photo" src={photo.src} sketch={<DeskSketch />} />}
          <Illustration name={chapter.id} className="opener__art" />
        </div>
      )}
      {stats?.length > 0 && (
        <div className="opener__stats">
          {stats.map((stat, i) => (
            <Sticky
              key={stat.label}
              tone={STICKY_TONES[i % STICKY_TONES.length]}
              style={{ "--at": `${1000 + i * 160}ms` }}
            >
              <span className="sticky__value">{stat.value}</span>
              <span className="label">{stat.label}</span>
            </Sticky>
          ))}
        </div>
      )}
    </div>
  );
}

function Checks({ items }) {
  return (
    <ul className="checks">
      {items.map((item, i) => (
        <li key={item} style={{ "--at": `${300 + i * 140}ms` }}>
          <Check className="checks__mark" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>
          <TechIcon tag={item} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Jobs with many points are set a little tighter so each job stays on one page.
const DENSE_POINTS = 4;

export function JobPage({ job }) {
  return (
    <article className={`entry${job.points.length > DENSE_POINTS ? " entry--dense" : ""}`}>
      <div className="entry__company">
        <PhotoSlot className="entry__logo" src={job.logo} fit="contain" light sketch={<Monogram name={job.company} />} />
        <p className="label label--accent">{job.company}</p>
      </div>
      <h3 className="entry__title">
        {job.role}
        <Underline className="entry__underline" />
      </h3>
      <p className="entry__meta">
        <span className="tag">{formatPeriod(job)}</span>
        {!job.end && (
          <span className="burst pop" style={{ "--at": "600ms" }}>
            <Star className="burst__star" />
            <span>{copy.experience.current}</span>
          </span>
        )}
      </p>
      <Checks items={job.points} />
      <p className="label entry__stack-label">{copy.experience.stack}</p>
      <Chips items={job.stack} />
    </article>
  );
}

export function ProjectPage({ project, plate }) {
  const actions = project.actions?.length
    ? project.actions.map((action) => ({ label: action.label, href: action.href }))
    : [
        project.links?.visit && { label: copy.projects.visit, href: project.links.visit },
        project.links?.source && { label: copy.projects.source, href: project.links.source },
      ].filter(Boolean);

  return (
    <article className="entry">
      <div className="entry__head">
        <Polaroid
          className="entry__photo"
          src={project.image}
          alt=""
          fit={project.imageFit}
          light={project.imageBackground === "light"}
        />
        <div className="entry__heading">
          <p className="label">
            {copy.projects.plate} {plate}
          </p>
          <h3 className="entry__title">{project.name}</h3>
        </div>
        {project.isNew && (
          <span className="burst burst--new pop" style={{ "--at": "700ms" }}>
            <Star className="burst__star" />
            <span>{copy.projects.newEdition}</span>
          </span>
        )}
      </div>
      <p className="prose">{project.description}</p>
      {project.highlights?.length > 0 && <Checks items={project.highlights} />}
      <Chips items={project.tags} />
      {actions.length > 0 && (
        <p className="entry__links">
          {actions.map((action) => (
            <a
              key={action.href}
              className="sketch-button"
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      )}
    </article>
  );
}

export function WorksPage({ groups, archive }) {
  const github = social.find((link) => link.id === "github");
  return (
    <div className="works">
      {groups.map((group) => (
        <section key={group.id}>
          <h3 className="section-heading">
            <span className="hl">{group.title}</span>
          </h3>
          <ul className="works__list">
            {group.items.map((project, i) => {
              const href = project.links?.visit || project.links?.source;
              return (
                <li key={project.id} className="works__item" style={{ "--at": `${200 + i * 120}ms` }}>
                  <PhotoSlot className="works__thumb" src={project.image} />
                  <h4 className="works__name">
                    {href ? <TextLink href={href}>{project.name}</TextLink> : project.name}
                  </h4>
                  <p className="works__description">{project.description}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      {archive?.length > 0 && (
        <section>
          <h3 className="section-heading">
            <span className="hl">{copy.projects.earlier}</span>
          </h3>
          <p className="works__description works__intro">{copy.projects.earlierNote}</p>
          <ul className="spec">
            {archive.map((item) => (
              <li key={item.id}>
                <TextLink href={item.link}>{item.name}</TextLink>
                <span className="leader" aria-hidden="true" />
                <span className="spec__value">{item.tech}</span>
              </li>
            ))}
          </ul>
          {github && (
            <div className="works__more">
              <Arrow className="works__arrow" />
              <Sticky tone="blue" style={{ "--at": "900ms" }}>
                <TextLink href={github.url}>{copy.projects.more}</TextLink>
              </Sticky>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export function ToolkitPage() {
  return (
    <div className="toolkit">
      <h3 className="section-heading">
        <span className="hl">{copy.craft.toolkit}</span>
      </h3>
      <ul className="chips chips--stickers">
        {skills.expertise.map((skill, i) => (
          <li key={skill} className="pop" style={{ "--at": `${200 + i * 60}ms` }}>
            <TechIcon tag={skill} />
            {skill}
          </li>
        ))}
      </ul>
      <h3 className="section-heading section-heading--spaced">
        <span className="hl">{copy.craft.interests}</span>
      </h3>
      <div className="toolkit__interests">
        <ul className="stars">
          {profile.interests.map((interest, i) => (
            <li key={interest} style={{ "--at": `${900 + i * 140}ms` }}>
              <Star className="stars__mark" />
              {interest}
            </li>
          ))}
        </ul>
        <PhotoSlot className="toolkit__photo" src={profile.interestsPhoto} sketch={<InterestsSketch />} />
      </div>
    </div>
  );
}

export function DeskPage() {
  return (
    <div className="desk">
      <CoffeeRing className="desk__coffee" />
      <h3 className="section-heading">
        <span className="hl">{copy.craft.desk}</span>
      </h3>
      {Object.entries(skills.setup).map(([category, items]) => (
        <section key={category} className="desk__group">
          <h4 className="label label--accent">{category}</h4>
          <ul className="spec">
            {Object.entries(items).map(([name, value]) => (
              <li key={name}>
                <span>{name}</span>
                <span className="leader" aria-hidden="true" />
                <span className="spec__value">{value}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function WritingPage({ posts, ctx }) {
  return (
    <ul className="cards">
      {posts.map((post, i) => (
        <li key={post.slug} className="card pop" style={{ "--at": `${200 + i * 150}ms` }}>
          <Tape className="card__tape" />
          <button type="button" className="card__button" onClick={() => ctx.openPost(post)}>
            <span className="card__date">{post.date}</span>
            <span className="card__title">{post.title}</span>
            <span className="card__excerpt">{post.excerpt}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
