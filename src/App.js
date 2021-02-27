import React, { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Body from "./components/Body";

export default function App() {
  const [mobileView, setmobileView] = useState(false);
  const [mousecursor, setmousecursor] = useState(null);

  useEffect(() => {
    const pushContentToLeft = (e) => {
      const body = document.getElementById("bodyContent");
      if (mobileView) {
        body.scrollTop += e.deltaY / 5;
      } else {
        body.scrollLeft += e.deltaY / 5;
      }
    };

    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("hide-sidebar");

    document.addEventListener("wheel", (e) => {
      pushContentToLeft(e);
    });

    const handleResize = () => {
      if (window.innerWidth < 600) {
        setmobileView(true);
      } else {
        setmobileView(false);
      }
    };
    const handleCursor = (e) => {
      const mousecursor = document.querySelector(".mousecursor");
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
    console.log("Toggle Ham Icon");
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

  return (
    <div className="App" id="bodyContent">
      <div className="mousecursor"></div>
      <div className="hamburger" id="hamIcon" onClick={() => toggleHamIcon()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="sidebar-main" id="sidebar">
        <Sidebar mousecursor={mousecursor} />
      </div>
      <div className="body">
        <Body mousecursor={mousecursor} />
      </div>
    </div>
  );
}
