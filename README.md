# Prabin Portfolio

One repository, many designs. The facts about me live in a single content hub;
each design version is a self-contained app that reads from it.

```
src/
  content/            the content hub: shared by every version
    profile.json        name, role, bio, stats, interests, resume, contact
    experience.json     jobs (start/end as "YYYY-MM", end: null = present)
    projects.json       featured, grouped and archived projects
    skills.json         expertise list and setup details
    social.json         profile links
    blog.json           post index (posts themselves are in public/posts)
    media/              images referenced from JSON by filename
    index.js            loads the JSON, resolves images, exports helpers
  versions/
    registry.js         list of versions + which one is the default
    v1.1/               "Code Editor" design (November 2025)
    v1.2/               "Book" design: a 3D book you open and read (November 2026, default)
  core/                 version resolution and the version switcher
  main.jsx              boots whichever version is active
```

## Content vs. copy

- **Content** (`src/content/*.json`) holds facts that stay the same in every
  design: jobs, projects, links, bio. Edit these once and every version updates.
- **Copy** (`src/versions/<id>/copy.js`) holds how a particular design phrases
  things: taglines, headings, button labels. It can differ freely between versions.

Versions import from the hub:

```js
import { profile, experience, projects, skills, social, blog, formatPeriod } from "../../../content";
```

Images: put the file in `src/content/media/` and reference it by filename
(`"image": "evolution.png"`). Paths starting with `/` point at `public/`.
Optional image fields that are `null` (`experience[].logo`,
`profile.interestsPhoto`, `skills.deskPhoto`) show as empty photo slots in
v1.2 until a file is named there.

## How a version is chosen

1. `?v=1.2` (or `?v=v1.2`) in the URL. This choice is remembered.
2. Otherwise the visitor's last choice (localStorage).
3. Otherwise `DEFAULT_VERSION` in `src/versions/registry.js`.

The switcher pill in the bottom-left corner reloads the page into the chosen
version. A full reload is deliberate: each version ships its own global CSS,
so nothing leaks from one design into another. Draft versions show in the
switcher only during `npm run dev`. In production they are reachable via
`?v=` only.

## Starting a new version

1. Create `src/versions/v1.3/` with an `App.jsx` that default-exports the
   version's root component (it renders inside the shared `BrowserRouter`).
2. Add an entry to `versions` in `src/versions/registry.js` with
   `status: "draft"`.
3. Build the design inside that folder only: its own `App.jsx` (with its own
   routes), `styles.css`, `copy.js`, components and pages.
4. When it is ready, set `status: "stable"`, add its `released` month
   (`"YYYY-MM"`), and point `DEFAULT_VERSION` at it.

A version that uses Tailwind starts its `styles.css` with
`@import "tailwindcss" source("./")`, so Tailwind only scans that version's
folder (v1.1 does this; v1.2 is plain CSS). Load fonts with an `@import url(...)`
at the top of the same file, not in `index.html`.

Old versions stay as they are. Fix content in the hub, not inside a version.

## Scripts

```
npm run dev       # start dev server
npm run build     # production build
npm run preview   # serve the build
npm run lint
```

Requires Node 18+.
