import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import SeaWaves from "./components/SeaWaves";
import Hero from "./pages/Hero";
import About from "./pages/About";
import WorkExperience from "./pages/WorkExperience";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  // Update page title based on current route
  useEffect(() => {
    const titles = {
      "/": "Prabin - Portfolio",
      "/about": "About - Prabin",
      "/experience": "Experience - Prabin",
      "/projects": "Projects - Prabin",
      "/blogs": "Blogs - Prabin",
      "/contact": "Contact - Prabin",
    };

    document.title = titles[location.pathname] || "Prabin - Portfolio";
  }, [location]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-vscode-bg text-vscode-text overflow-x-hidden selection:bg-vscode-accent selection:text-vscode-bg">
      {/* Animated sea wave background */}
      <SeaWaves />

      {/* Content Container - Set pointer-events-none to allow clicking through to sun behind */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <Navigation />

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-0 mb-20 sm:mb-0">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<WorkExperience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="py-6 text-center text-vscode-muted text-sm">
          <p>© {new Date().getFullYear()} Prabin.</p>
        </footer>
      </div>
    </div>
  );
}
