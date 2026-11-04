// Wording that belongs to the v1.2 "Book" design. Facts (name, jobs,
// projects, links) come from src/content; this file is only how v1.2 says things.
// Each phrase appears once in the book: nothing here repeats a content fact.
export const copy = {
  titles: {
    "/": "Prabin Acharya — Vol. 1.2",
  },
  cover: {
    open: "open",
    openLabel: "Open the book",
    volume: "Vol. 1.2",
  },
  foreword: {
    heading: "Foreword",
    annotation: "somewhere between two deploys",
    currently: "Currently",
  },
  contents: {
    heading: "Contents",
  },
  chapterLabel: "Chapter",
  chapters: {
    experience: {
      numeral: "I",
      title: "Experience",
      lede: "The teams I've shipped with, and what we built together.",
    },
    featured: {
      numeral: "II",
      title: "Featured Work",
      lede: "Products I designed and built myself, end to end.",
    },
    archive: {
      numeral: "III",
      title: "Collected Works",
      lede: "Product, client and personal projects along the way.",
    },
    craft: {
      numeral: "IV",
      title: "The Craft",
      lede: "Tools of the trade, and the desk they live on.",
    },
    writing: {
      numeral: "V",
      title: "Writing",
      lede: "Notes from the journey, unpolished on purpose.",
    },
    letter: {
      numeral: "VI",
      title: "Write to Me",
      lede: "For work, collaboration, or just to say hello.",
    },
  },
  experience: {
    current: "now",
    stack: "Built with",
    timeline: "Career timeline",
  },
  projects: {
    plate: "Plate",
    newEdition: "new!",
    visit: "Visit",
    source: "Source",
    earlier: "Earlier experiments",
    earlierNote: "Small apps I built while learning, kept for the memories.",
    more: "Everything else lives on GitHub",
  },
  craft: {
    toolkit: "Toolkit",
    interests: "Away from the keyboard",
    desk: "The Desk",
  },
  writing: {
    loading: "Fetching the manuscript…",
    failed: "This manuscript could not be loaded.",
    close: "Close",
  },
  letter: {
    fields: {
      name: { label: "Your name", placeholder: "Ada Lovelace" },
      email: { label: "Your email", placeholder: "ada@example.com" },
      message: { label: "Your message", placeholder: "Dear Prabin," },
    },
    submit: "Send letter",
    submitting: "Sending…",
    success: "Letter received. I'll write back soon.",
    error: (email) => `That didn't send. Please write to ${email} instead.`,
    elsewhere: "Or find me at",
    resume: "Résumé (PDF)",
  },
  end: {
    heading: "The End",
    colophon:
      "Thanks for reading all the way to the end. If something here caught your eye, I'd love to hear from you.",
    toContents: "Back to contents",
    close: "Close the book",
  },
  hud: {
    contents: "Contents",
    close: "Close",
    prev: "Previous page",
    next: "Next page",
  },
};
