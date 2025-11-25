import EvolutionImage from "../assets/evolution.png";
import IpTrackerImage from "../assets/iptracket.png";
import TetrisImage from "../assets/tetris.png";
import CodeImage from "../assets/codewriter.png";
import CanteenImage from "../assets/canteen-management.png";
import HotelsImage from "../assets/hotels-app.png";
import RAndRImage from "../assets/randr.png";
import MoodlightImage from "../assets/moodlight.png";
import SharelookImage from "../assets/sharelook.jpeg";

export const workExperiences = [
    {
        company: "Sharelook PTE. LTD",
        duration: "October 2020 - Present",
        role: "Senior Frontend Developer",
        points: [
            "Architected and delivered multiple production applications (App, Marketplace, Voices) serving 10,000+ users, utilizing React.js and modern JavaScript with focus on performance optimization and cross-browser compatibility",
            "Developed patented features including interactive Maze navigation and in-app Video Conferencing using AWS Chime & Agora SDK, implementing WebRTC and WebSockets for real-time communication",
            "Engineered complex data visualization dashboards using D3.js and WebGL, reducing load times by 40% through code-splitting, lazy loading, and performance optimization strategies for large datasets",
            "Established CI/CD pipelines using AWS services and Bitbucket, reducing deployment time by 60% while mentoring 3 junior developers on best practices, code reviews, and agile methodologies"
        ]
    },
    {
        company: "Swanned Pty. Ltd",
        duration: "June 2020 - August 2020",
        role: "React Native Developer (Freelance)",
        points: [
            "Implemented local push notification system using Expo framework, improving user engagement by 35% through timely and personalized notifications",
            "Developed 5+ new screens with custom animations and form validations for dating application, enhancing user flow and reducing form abandonment rate",
            "Integrated real-time chatbot with response tagging system and optimized web application performance, improving response time and user experience"
        ]
    },
    {
        company: "Aayulogic Pvt Ltd",
        duration: "January 2020 - April 2020",
        role: "Frontend Developer (Internship)",
        points: [
            "Developed reusable UI components for internal HR Management System using Vue.js and Vuex, improving development efficiency by 25%",
            "Implemented state management patterns and conducted code reviews, gaining hands-on experience with modern frontend frameworks and agile development practices",
            "Collaborated with senior developers on production applications, contributing to bug fixes and feature enhancements while learning industry best practices"
        ]
    }
];



export const projects = {
    sharelook: [
        {
            name: "Sharelook App",
            description: "Enterprise-level learning management platform with real-time collaboration, video conferencing, and interactive features.",
            tags: ["ReactJS", "WebRTC", "WebSockets", "AWS Chime", "Redux"],
            links: {
                visit: "https://app.sharelookapp.com",
                source: null
            },
            image: SharelookImage
        },
        {
            name: "Sharelook Website",
            description: "Marketing and landing website for the Sharelook platform showcasing features and onboarding new users.",
            tags: ["ReactJS", "SEO", "Responsive Design"],
            links: {
                visit: "https://sharelookapp.com",
                source: null
            },
            image: SharelookImage
        },
        {
            name: "Sharelook Marketplace",
            description: "Content marketplace for educational resources, courses, and learning materials with integrated payment systems.",
            tags: ["ReactJS", "E-Commerce", "Payment Integration"],
            links: {
                visit: "https://marketplace.sharelookapp.com",
                source: null
            },
            image: SharelookImage
        },
        {
            name: "Sharelook Voices",
            description: "Audio-focused learning platform for podcasts, voice notes, and audio-based educational content.",
            tags: ["ReactJS", "Audio Processing", "Media Streaming"],
            links: {
                visit: "https://sharelookvoices.com",
                source: null
            },
            image: SharelookImage
        },
        {
            name: "Strategic Global Intelligence (SGI)",
            description: "Intelligence platform providing timely research and insights through podcasts and case studies to help organizations make informed decisions.",
            tags: ["ReactJS", "Content Platform", "Research"],
            links: {
                visit: "https://sgi.academy",
                source: null
            },
            image: SharelookImage
        }
    ],
    professional: [
        {
            name: "R&R Groceries",
            description: "Enhanced the existing Shopify website with design improvements and feature changes.",
            tags: ["Shopify", "Web Development", "E-Commerce"],
            links: {
                visit: "https://randrgrocery.ca/",
                source: null
            },
            image: RAndRImage
        },
        {
            name: "Mood Light Interiors",
            description: "Led the development management for the website, coordinating the team and overseeing project execution.",
            tags: ["Web Development", "Project Management", "Interior Design"],
            links: {
                visit: "https://moodlightinteriors.com",
                source: null
            },
            image: MoodlightImage
        }
    ],
    personal: [
        {
            name: "Evolution Simulator",
            description: "Simulation of human-like walking utilizing Box2DJs, TensorFlow, genetic algorithms, and neuroevolution techniques.",
            tags: ["Box2DJs", "TensorFlow", "Genetic Algorithm", "NeuroEvolution"],
            links: {
                visit: "https://mprabs.github.io/Evolution-Simulator/",
                source: "https://github.com/mprabs/Evolution-Simulator"
            },
            image: EvolutionImage
        },
        {
            name: "Hotels Application",
            description: "Application designed for users to check in between hotels.",
            tags: ["VueJs", "NodeJs", "Express", "MongoDB"],
            links: {
                visit: null, // Disabled
                source: "https://github.com/mprabs/Hotels-App"
            },
            image: HotelsImage
        },
        {
            name: "CodeWriter",
            description: "A simple interface for writing and editing code, similar to CodePen.",
            tags: ["ReactJs", "CodeMirror"],
            links: {
                visit: "https://mprabs.github.io/Codepen-clone/",
                source: "https://github.com/mprabs/Codepen-clone"
            },
            image: CodeImage
        },
        {
            name: "IP Tracker",
            description: "Track location through IP Address in a map view.",
            tags: ["LeafletJs", "IPify"],
            links: {
                visit: "https://mprabs.github.io/IP-Tracker/",
                source: "https://github.com/mprabs/IP-Tracker"
            },
            image: IpTrackerImage
        },
        {
            name: "Tetris",
            description: "A simple game of tetris on the web.",
            tags: ["VanillaJs", "HTML5", "CSS3"],
            links: {
                visit: "https://mprabs.github.io/Tetris/",
                source: "https://github.com/mprabs/Tetris"
            },
            image: TetrisImage
        },
        {
            name: "Canteen Management System",
            description: "Application for managing canteen operations and workflows.",
            tags: ["VueJs", "Vuex", "Vuetify"],
            links: {
                visit: null, // Disabled
                source: "https://github.com/mprabs/Canteen-Management"
            },
            image: CanteenImage
        }
    ],
    pet: [
        {
            name: "Reddit Clone",
            tech: "VueJs",
            link: "https://github.com/mprabs/Reddit-Clone"
        },
        {
            name: "Todos App",
            tech: "ReactJs",
            link: "https://github.com/mprabs/Todos-App"
        },
        {
            name: "PokemonApp",
            tech: "ReactJs",
            link: "https://github.com/mprabs/Pokemon"
        },
        {
            name: "Reqres Users App",
            tech: "React Native",
            link: "https://github.com/mprabs/Reqres-Users-App"
        }
    ]
};

export const technicalExpertise = [
    "ReactJS", "JavaScript (ES6+)", "TypeScript", "HTML5/CSS3",
    "REST APIs", "WebSockets", "NodeJs", "Redux",
    "Tailwind CSS", "Git", "Webpack", "CI/CD"
];

export const aboutData = {
    bio: "I'm a passionate JavaScript developer from Nepal with 5+ years of experience in building enterprise-level applications. I specialize in React ecosystem and modern web technologies, focusing on creating performant, scalable solutions with great user experiences.",
    hobbies: [
        "⚽ Football & Cricket enthusiast",
        "🎮 Casual gaming (PUBG, Chess)",
        "✈️ Weekend travels & photography",
        "📚 Learning new technologies"
    ]
};

export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/mprabs",
        icon: "FiGithub"
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/paccharya",
        icon: "FiLinkedin"
    },
    {
        name: "Email",
        url: "mailto:acharyaprabin03@gmail.com",
        icon: "FiMail"
    }
];

export const setupDetails = {
    hardware: {
        "Laptop": "MacBook Pro M3 Pro",
        "Secondary": "Acer Nitro (Ryzen 4500H, GTX 1650)",
        "Display": "KOORUI 27\" 2K 144Hz",
        "Keyboard": "AULA F75",
        "Mouse": "Prolink PMB8502",
        "Audio": "Anker Soundcore Q45"
    },
    software: {
        "Operating System": "macOS, Windows 11",
        "Code Editor": "Visual Studio Code",
        "Design": "Figma, Adobe Photoshop",
        "Browser": "Brave, Chrome"
    },
    development: {
        "Version Control": "Git, GitHub",
        "Package Managers": "npm, yarn",
        "Build Tools": "Webpack, Vite, Babel",
        "Testing": "Jest, React Testing Library",
        "Deployment": "Vercel, Netlify"
    },
    tools: {
        "3D Modeling": "Blender",
        "Terminal": "Terminal, Windows Terminal",
        "API Testing": "Postman",
        "Database": "MongoDB Compass"
    }
};


export const blogPosts = [
    {
        title: "Day 1 of Blender",
        date: "November 2025",
        excerpt: "My first experience diving into Blender - from creating a monkey with a hat to making a donut, until a thunderstorm interrupted my journey.",
        url: "/posts/day-1-of-blender.md",
        isMarkdown: true
    },
    // {
    //     title: "My Coding Journey",
    //     date: "November 2019",
    //     excerpt: "So i started coding like 2 years ago... it was hard at first i didnt know what a variable was lol.",
    //     url: "/posts/my-coding-journey.md",
    //     isMarkdown: true
    // },
    // {
    //     title: "React is Hard",
    //     date: "November 2020",
    //     excerpt: "React is so confusing sometimes... hooks are weird why do i need useEffect for everything??",
    //     url: "/posts/react-is-hard.md",
    //     isMarkdown: true
    // }
];