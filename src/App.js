import React, { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Body from "./components/Body";

export default function App() {
  const [mobileView, setmobileView] = useState(false);
  const [mousecursor, setmousecursor] = useState(null);

  const pushContentToLeft = (e) => {
    const body = document.getElementById("bodyContent");
    if (mobileView) {
      body.scrollTop += e.deltaY / 2;
    } else {
      body.scrollLeft += e.deltaY / 2;
    }
  };

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("hide-sidebar");

    document.addEventListener("wheel", (e) => {
      document.body.style.setProperty("--afterContent", " ");
      pushContentToLeft(e);
    });

    const handleResize = () => {
      setmobileView(window.innerWidth < 750);
    };

    const handleCursor = (e) => {
      const mousecursor = document.getElementById("cursor");
      mousecursor.style.top = e.pageY + "px";
      mousecursor.style.left = e.pageX + "px";
      setmousecursor(mousecursor);
    };

    handleResize();
    window.addEventListener("mousemove", handleCursor);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleCursor);
    };
  }, []);

  const toggleHamIcon = () => {
    const hamIcon = document.getElementById("hamIcon");
    const sidebar = document.getElementById("sidebar");
    hamIcon.style.transitionDelay = 1000;
    if (hamIcon.classList.contains("open")) {
      hamIcon.classList.remove("open");
      sidebar.classList.remove("show-sidebar");
      sidebar.classList.add("hide-sidebar");
    } else {
      sidebar.classList.remove("hide-sidebar");
      hamIcon.classList.add("open");
      sidebar.classList.add("show-sidebar");
    }
    return;
  };

  const handleNavigation = (type) => {
    toggleHamIcon();
    document.getElementById(type.toLowerCase()).scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
  };

  return (
    <div className="App" id="bodyContent">
      <div className="mousecursor" id="cursor"></div>
      <div className="hamburger" id="hamIcon" onClick={() => toggleHamIcon()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="sidebar-main" id="sidebar">
        <Sidebar mousecursor={mousecursor} onNavigation={handleNavigation} />
      </div>
      <div className="body">
        <Body mousecursor={mousecursor} />
      </div>
    </div>
  );
}
