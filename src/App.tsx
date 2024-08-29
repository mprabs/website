import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Content from "./components/Content";
import Header from "./components/Header";

import Blogs from "./views/Blogs";
import Setup from "./views/Setup";
import About from "./views/About";

import ErrorPage from "./ErrorPage";

import Works from "./views/Works";

function App() {
  const themesJSON = useMemo(() => {
    return {
      nightMode: "NIGHT",
      dayMode: "DAY",
    };
  }, []);

  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) return localTheme;
    return themesJSON.dayMode;
  });

  const [mobileView, setMobileView] = useState(window.innerWidth < 750);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setMobileView(window.innerWidth < 750);
    if (window.innerWidth > 750) {
      setOpenMobileMenu(false);
    }
  };

  useEffect(() => {
    const mainDocument = document.documentElement;
    const textContent = document.getElementById("text-content");

    if (theme === themesJSON.dayMode) {
      mainDocument.setAttribute("data-theme", "light");
      if (textContent) {
        textContent.style.backgroundImage = "none";
      }
    } else {
      mainDocument.setAttribute("data-theme", "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, themesJSON]);

  useEffect(() => {
    const headerItem = document.getElementById("header");

    if (mobileView) {
      headerItem?.classList.add("mobile-view");
    } else {
      headerItem?.classList.remove("mobile-view");
    }
  }, [mobileView]);

  const toggleMobileMenu = useCallback(() => setOpenMobileMenu((val) => !val), []);

  return (
    <div className="App" id="App">
      <Header
        theme={theme}
        themesJSON={themesJSON}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        mobileView={mobileView}
        toggleMobileMenu={toggleMobileMenu}
        openMobileMenu={openMobileMenu}
      />
      <div className="app-items">
        <Routes>
          <Route path="/" element={<Content />} />
          {/* <Route path="/blogs" element={<Blogs />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/works" element={<Works />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
