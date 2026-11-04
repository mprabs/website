// Wording that belongs to the v1.1 "Code Editor" design. Facts (name, jobs,
// projects, links) come from src/content; this file is only how v1.1 says things.
export const copy = {
  titles: {
    "/": "Prabin - Portfolio",
    "/about": "About - Prabin",
    "/experience": "Experience - Prabin",
    "/projects": "Projects - Prabin",
    "/blogs": "Blogs - Prabin",
    "/contact": "Contact - Prabin",
  },
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    blogs: "Blogs",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I am",
    roleLead: "Frontend",
    roleAccent: "Engineer",
    tagline:
      "I craft high-performance, accessible, and visually stunning web experiences. Turning complex problems into elegant code is my passion.",
    projectsCta: "View Projects",
    resumeCta: "Resume",
    codeSkills: ["React", "Tailwind", "Node.js"],
  },
  about: {
    heading: "About Me",
    skillsHeading: "Technical Skills",
    setupHeading: "Setup",
    interestsHeading: "Interests",
    connectLabel: "Let's connect",
  },
  experience: {
    heading: "Work Experience",
    eyebrow: "Career Journey",
    intro:
      "A concise timeline of companies, roles, and real product impact across frontend-focused teams.",
    initialCommit: "Initial commit: Started professional frontend journey",
  },
  projects: {
    heading: "Projects",
    featuredHeading: "Top Projects",
    newBadge: "New",
    visitLabel: "Visit Live",
    sourceLabel: "Source",
    githubEyebrow: "Open Source",
    githubHeading: "More projects on GitHub",
    githubText:
      "Explore additional experiments, archived builds, and ongoing work in my public repositories.",
    githubCta: "More on GitHub",
  },
  blogs: {
    heading: "My Blogs",
    back: "cd ../articles",
    columns: { date: "Date", post: "Post", read: "Read" },
    open: "Open",
    empty: "No blog posts published yet.",
  },
  contact: {
    heading: "Contact Me",
    eyebrow: "Get In Touch",
    title: "Send me a message",
    intro:
      "If you want to contact me for work, collaboration, or anything else, send a message and I will get back to you soon.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "Your email" },
      message: { label: "Message", placeholder: "Write your message here..." },
    },
    submit: "Send Message",
    submitting: "Sending message...",
    success: "✓ Message sent successfully! I'll get back to you soon.",
    error: (email) =>
      `✗ Failed to send message. Please try emailing me directly at ${email}`,
    emailPrompt: "Prefer email? Reach me at",
  },
};
