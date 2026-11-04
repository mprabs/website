import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import SeaWaves from "./components/SeaWaves";
import Hero from "./pages/Hero";
import About from "./pages/About";
import WorkExperience from "./pages/WorkExperience";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import { profile } from "../../content";
import { copy } from "./copy";
import "./styles.css";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = copy.titles[location.pathname] || copy.titles["/"];
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-vscode-bg text-vscode-text overflow-x-hidden selection:bg-vscode-accent selection:text-vscode-bg">
      <SeaWaves />

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="py-6 text-center text-vscode-muted text-sm">
          <p>© {new Date().getFullYear()} {profile.name.short}.</p>
        </footer>
      </div>
    </div>
  );
}
