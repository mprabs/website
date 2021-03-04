import WorkIcon from "../assets/work.svg";
import AboutIcon from "../assets/about.svg";
import ContactIcon from "../assets/letter.svg";
import InstagramIcon from "../assets/instagram.png";
import GithubIcon from "../assets/github.png";
import LinkedinIcon from "../assets/linkedin.png";
import FacebookIcon from "../assets/facebook.png";

export const NAV = {
  ABOUT: "About",
  WORK: "Work",
  CONTACT: "Contact",
};

export const CONTACT_ICONS = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    link: "https://www.fb.com/paccharya",
  },
  {
    name: "Github",
    icon: GithubIcon,
    link: "https://www.github.com/mprabs",
  },
  {
    name: "Linkedin",
    icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/paccharya",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    link: "https://www.instagram.com/m_prabs",
  },
];

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
  {
    title: NAV.CONTACT,
    subtitle: "contact me",
    image: ContactIcon,
  },
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
    tags: ["React", "Redux"],
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
    tags: ["Vue", "Vuex", "Scrum"],
    about: "A human resource management web application",
    contribution: `Exposure to real life application. Applied vuejs functionalities, stylings,
    addition of features and many more. Worked in scrum.`,
    link: "https://realhrsoft.com/",
  },
  {
    id: 3,
    title: "Swanned",
    tags: ["React Native", "Redux"],
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
    link: "https://github.com/mprabs/Hotels-App",
  },
  {
    id: 2,
    title: "Reddit Clone",
    tags: ["Vue", "CSS"],
    link: "https://github.com/mprabs/Reddit-Clone",
  },
  {
    id: 3,
    title: "IP Tracker",
    tags: ["JavaScript"],
    link: "https://github.com/mprabs/IP-Tracker",
  },
  {
    id: 4,
    title: "Custom Codepen",
    tags: ["ReactJs"],
    link: "https://github.com/mprabs/Codepen-clone",
  },
  {
    id: 5,
    title: "Canteen App",
    tags: ["Vue", "Vuex"],
    link: "https://github.com/mprabs/Canteen-Management",
  },
  {
    id: 6,
    title: "Reqres Users App",
    tags: ["React Native"],
    link: "https://github.com/mprabs/Reqres-Users-App",
  },
];

// {
//   id: 5,
//   title: '',
//   about: '',
//   contribution: ``
// }
