import React from "react";
import "./sidebar.css";

import WorkIcon from "../../assets/work.svg";
import AboutIcon from "../../assets/about.svg";
import ContactIcon from "../../assets/letter.svg";

export default function sidebar({ mousecursor }) {
  const items = [
    {
      title: "About",
      subtitle: "Who I am",
      image: AboutIcon,
    },
    {
      title: "Work",
      subtitle: "watch my work",
      image: WorkIcon,
    },
    {
      title: "Contact",
      subtitle: "contact me",
      image: ContactIcon,
    },
  ];
  return (
    <div className="sidebar">
      {items.map((item) => (
        <div className="sidebar_container">
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
        Made by <span>Prabin Acharya</span>
      </div>
    </div>
  );
}
