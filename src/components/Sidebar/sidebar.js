import React from "react";
import "./sidebar.css";

import { NAV, NAVIGATIONDATA } from "../../constants";

export default function sidebar({ mousecursor, onNavigation }) {
  const handleNavigation = (type) => {
    onNavigation(type);
  };

  return (
    <div className="sidebar">
      {NAVIGATIONDATA.map((item) => (
        <div
          className="sidebar_container"
          onClick={() => handleNavigation(item.title)}
        >
          <div className="sidebar_item">
            <div className="left">
              <img src={item.image} />
            </div>
            <div className="right">
              <h1>{item.title}</h1>
              <p>{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="sidebar_footer">
        Made with 💜 by <span>Prabin Acharya</span>
      </div>
    </div>
  );
}
