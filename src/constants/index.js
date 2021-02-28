import WorkIcon from "../assets/work.svg";
import AboutIcon from "../assets/about.svg";
import ContactIcon from "../assets/letter.svg";

export const NAV = {
  ABOUT: "About",
  WORK: "Work",
  CONTACT: "Contact",
};

export const NAVIGATIONDATA = [
  {
    title: NAV.ABOUT,
    subtitle: "Who I am",
    image: AboutIcon,
  },
  {
    title: NAV.WORK,
    subtitle: "watch my work",
    image: WorkIcon,
  },
  // {
  //   title: NAV.CONTACT,
  //   subtitle: "contact me",
  //   image: ContactIcon,
  // },
];

export const TOOLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vue",
  "React Native",
  "SCSS",
  "SPA",
  "Agile",
  "Scrum",
  "Git",
  "JSON",
];

export const WORKS = [
  {
    id: 1,
    title: "Sharelook App",
    tags: ["React", "Redux", "Git"],
    about:
      "Web application that allows course building with integrated video broadcasting",
    contribution: `
    Explored React, Redux functionalities. Applied different functionalities
like interactive badge creation, form-data, image manipulation, excel
data formatting and many more features.
    `,
    link: "https://sharelookapp.com/",
  },
  {
    id: 2,
    title: "RealHRSoft",
    tags: ["Vue", "Vuex", "Scrum", "Git"],
    about: "A human resource management web application",
    contribution: `Exposure to real life application. Applied vuejs functionalities, stylings,
    addition of features and many more. Worked in scrum.`,
    link: "https://realhrsoft.com/",
  },
  {
    id: 3,
    title: "Swanned",
    tags: ["React Native", "Redux", "Git"],
    about: "Real life online dating platform where users swipe to match",
    contribution: `Exposure to React native with expo. Applied multiple functionalities like handling
    local notifications, different features and design with react native and
    redux.
    `,
    link: "https://www.getswanned.com/",
  },
];

export const PERSONAL_WORKS = [
  {
    id: 1,
    title: "Hotels App",
    tags: ["Vue", "Express", "Mongodb"],
  },
  {
    id: 2,
    title: "Reddit Clone",
    tags: ["Vue", "CSS"],
  },
  {
    id: 3,
    title: "IP Tracker",
    tags: ["JavaScript"],
  },
  {
    id: 4,
    title: "Custom Codepen",
    tags: ["ReactJs"],
  },
  {
    id: 5,
    title: "Canteen App",
    tags: ["Vue", "Vuex"],
  },
  {
    id: 6,
    title: "Reqres Users App",
    tags: ["React Native"],
  },
];

// {
//   id: 5,
//   title: '',
//   about: '',
//   contribution: ``
// }
