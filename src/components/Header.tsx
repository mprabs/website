import React, { useMemo, useEffect } from "react";
import "./Header.scss";

import blackSun from "../assets/sun-black.svg";
import whiteSun from "../assets/sun-white.svg";
import barBlack from "../assets/menu.svg";
import barWhite from "../assets/menu-white.svg";

import { Link } from "react-router-dom";

interface Theme {
  theme: string;
  themesJSON: any;
  onThemeChange: (x: any) => void;
  toggleMobileMenu: () => void;
  mobileView: Boolean;
  openMobileMenu: Boolean;
}

function Header({ theme, themesJSON, onThemeChange, mobileView, toggleMobileMenu, openMobileMenu }: Theme) {
  const themeIcon = useMemo(() => {
    const icon = theme === themesJSON.dayMode ? blackSun : whiteSun;
    return icon;
  }, [theme, themesJSON]);

  const handleHeaderImageClick = () => {
    if (mobileView) {
      toggleMobileMenu();
    } else {
      handleThemeChange();
    }
  };

  const handleThemeChange = () => onThemeChange(theme === themesJSON.dayMode ? themesJSON.nightMode : themesJSON.dayMode);

  return (
    <header id="header">
      <div className="header-left">
        <h1 className="name">
          <Link to="/">
            <div class="content">
              <h2>Prabin</h2>
              <h2>Prabin</h2>
            </div>
          </Link>
        </h1>
        <ul className="menu">
          {/* <li id="blog">
            <Link to="/blogs">Blogs</Link>
          </li> */}
          <li id="about">
            <Link to="/about">About</Link>
          </li>
          <li id="setup">
            <Link to="/setup">Setup</Link>
          </li>
          <li id="works">
            <Link to="/works">Works</Link>
          </li>
        </ul>
      </div>
      <div className="header-right">
        <img
          height="40px"
          width="40px"
          className={theme === themesJSON.dayMode ? "header-image" : "header-image header-image-night"}
          onClick={handleHeaderImageClick}
          src={mobileView ? (theme === themesJSON.dayMode ? barBlack : barWhite) : themeIcon}
          alt="sun for toggling themes"
        />
      </div>
      {openMobileMenu && (
        <div className="mobile-menus">
          <span className="close-button" onClick={toggleMobileMenu}>
            &#x2716;
          </span>
          <h3>Menus</h3>
          <hr />
          <ul className="menu" id="mobile-menu">
            <li id="home" onClick={toggleMobileMenu}>
              <Link to="/">Home</Link>
            </li>
            {/* <li onClick={toggleMobileMenu} id="blog">
              <Link to="/blogs">Blogs</Link>
            </li> */}
            <li onClick={toggleMobileMenu} id="about">
              <Link to="/about">About</Link>
            </li>
            <li onClick={toggleMobileMenu} id="setup">
              <Link to="/setup">Setup</Link>
            </li>
            <li onClick={toggleMobileMenu} id="works">
              <Link to="/works">Works</Link>
            </li>
            <li id="mob-theme" onClick={handleThemeChange}>
              <img src={themeIcon} height="40px" width="40px" alt="sun for toggling themes" />
              {theme === themesJSON.dayMode ? "Dark Mode : OFF" : "Dark Mode : ON"}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
