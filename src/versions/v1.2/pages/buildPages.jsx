import { blog, experience, profile, projects, skills } from "../../../content";
import { copy } from "../copy";
import { Contents, Cover, Foreword } from "./front";
import {
  ChapterOpener,
  DeskPage,
  JobPage,
  ProjectPage,
  ToolkitPage,
  WorksPage,
  WritingPage,
} from "./chapters";
import { EndPage, LetterPage } from "./back";

// The order of pages in the book. Each page is
//   { id, kind, numbered, spreadOnly?, running?, chapter?, render(ctx) }
// render receives ctx: { goToPage(id), openPost(post), closeBook(), canOpen }.
// `running` is the chapter name shown atop content pages; pages that already
// carry a big heading (openers, foreword, contents, end) don't get one.
// Like a printed book, chapters (and the contents) start on a right-hand page
// facing an empty left one, and so does the page of a one-page chapter.
// The blank pages only exist in the two-page spread.
// Folios (page numbers) are assigned after the list is built.

const CHAPTER_ORDER = ["experience", "featured", "archive", "craft", "writing", "letter"];
const CHAPTER_TONES = ["terracotta", "pen", "sage", "mustard", "terracotta", "pen"];

function chapterPages(id) {
  const running = copy.chapters[id].title;
  const page = (pageId, render) => ({ id: pageId, kind: "paper", numbered: true, running, chapter: id, render });

  switch (id) {
    case "experience":
      return experience.map((job) => page(`job-${job.id}`, () => <JobPage job={job} />));
    case "featured":
      return projects.featured.map((project, i) =>
        page(`project-${project.id}`, () => <ProjectPage project={project} plate={`II.${i + 1}`} />)
      );
    case "archive": {
      // One group per page keeps each page readable without scrolling on laptops.
      const sheets = projects.groups.map((group) =>
        page(`works-${group.id}`, () => <WorksPage groups={[group]} />)
      );
      if (projects.archive.length) {
        sheets.push(page("works-archive", () => <WorksPage groups={[]} archive={projects.archive} />));
      }
      return sheets;
    }
    case "craft":
      return [page("toolkit", () => <ToolkitPage />), page("desk", () => <DeskPage />)];
    case "writing":
      return [page("writing", (ctx) => <WritingPage posts={blog} ctx={ctx} />)];
    case "letter":
      return [page("letter", () => <LetterPage />)];
    default:
      return [];
  }
}

export function buildPages() {
  const chapters = [];
  let blanks = 0;
  const blank = () => ({ id: `blank-${++blanks}`, kind: "blank", spreadOnly: true });
  const isEmpty = (page) => page.kind === "blank" || page.kind === "endpaper";

  // In a spread, even indices are right-hand pages (index 0 is the cover).
  const startOnRight = (page) => {
    if (pages.length % 2 === 1) pages.push(blank());
    else if (!isEmpty(pages.at(-1))) pages.push(blank(), blank());
    pages.push(page);
  };

  const pages = [
    { id: "cover", kind: "cover", render: (ctx) => <Cover ctx={ctx} /> },
    { id: "endpaper", kind: "endpaper", spreadOnly: true },
    { id: "foreword", kind: "paper", numbered: true, render: () => <Foreword /> },
  ];
  startOnRight({
    id: "contents",
    kind: "paper",
    numbered: true,
    render: (ctx) => <Contents ctx={{ ...ctx, chapters }} />,
  });

  CHAPTER_ORDER.forEach((id, i) => {
    const body = chapterPages(id);
    if (!body.length) return;

    const chapter = { id, tone: CHAPTER_TONES[i % CHAPTER_TONES.length], ...copy.chapters[id] };
    // The career numbers and timeline open the Experience chapter instead of
    // sitting beside the bio they echo; the desk photo opens The Craft.
    const stats = id === "experience" ? profile.stats : null;
    const timeline = id === "experience" ? experience : null;
    const photo = id === "craft" ? { src: skills.deskPhoto } : null;
    chapters.push({ ...chapter, pageId: `chapter-${id}` });
    startOnRight({
      id: `chapter-${id}`,
      kind: "paper",
      numbered: true,
      chapter: id,
      render: (ctx) => <ChapterOpener chapter={chapter} stats={stats} timeline={timeline} photo={photo} ctx={ctx} />,
    });
    // A one-page chapter puts that page on the right too, facing a blank page.
    if (body.length === 1) startOnRight(body[0]);
    else pages.push(...body);
  });

  pages.push({ id: "end", kind: "paper", numbered: true, render: (ctx) => <EndPage ctx={ctx} /> });
  // If the last page falls on the left, close the spread with an endpaper.
  if (pages.length % 2 === 0) pages.push({ id: "endpaper-back", kind: "endpaper", spreadOnly: true });

  // Folios count numbered pages only, so they match in both reading modes.
  let folio = 0;
  const folios = {};
  for (const page of pages) {
    if (page.numbered) folios[page.id] = ++folio;
  }
  for (const chapter of chapters) chapter.folio = folios[chapter.pageId];

  return { pages, folios };
}
