// The content hub: every design version reads facts about Prabin from here.
// Edit the JSON files, not this file. Version-specific wording (taglines,
// headings, button labels) lives in each version's own copy.js instead.
import profileData from "./profile.json";
import experienceData from "./experience.json";
import projectsData from "./projects.json";
import skillsData from "./skills.json";
import socialData from "./social.json";
import blogData from "./blog.json";

// Images in ./media are referenced from JSON by filename ("evolution.png").
// Absolute paths ("/assets/...") and URLs point at /public or the web as-is.
const mediaFiles = import.meta.glob("./media/*.{png,jpg,jpeg,svg,webp,gif}", {
  eager: true,
  import: "default",
});

export function resolveMedia(ref) {
  if (!ref) return null;
  if (ref.startsWith("/") || /^https?:\/\//.test(ref)) return ref;

  const url = mediaFiles[`./media/${ref}`];
  if (!url && import.meta.env.DEV) {
    console.warn(`[content] No file named "${ref}" in src/content/media`);
  }
  return url || null;
}

const withImage = (project) => ({
  ...project,
  image: resolveMedia(project.image),
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2020-10" -> "October 2020"
export function formatMonth(value) {
  if (!value) return "Present";
  const [year, month] = value.split("-").map(Number);
  return month ? `${MONTHS[month - 1]} ${year}` : String(year);
}

export function formatPeriod({ start, end }) {
  return `${formatMonth(start)} - ${formatMonth(end)}`;
}

export const profile = {
  ...profileData,
  portrait: resolveMedia(profileData.portrait),
  candid: resolveMedia(profileData.candid),
  interestsPhoto: resolveMedia(profileData.interestsPhoto),
};

export const experience = experienceData.map((job) => ({ ...job, logo: resolveMedia(job.logo) }));

export const projects = {
  featured: projectsData.featured.map(withImage),
  groups: projectsData.groups.map((group) => ({
    ...group,
    items: group.items.map(withImage),
  })),
  archive: projectsData.archive,
};

export const skills = { ...skillsData, deskPhoto: resolveMedia(skillsData.deskPhoto) };

export const social = socialData;

export const blog = blogData;

const content = { profile, experience, projects, skills, social, blog };

export default content;
