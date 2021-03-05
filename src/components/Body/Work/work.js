import React, { useEffect } from "react";
import "./work.css";

import WorkBackground from "../../../assets/workBackground.jpg";
import Card from "./Card";

import { TOOLS, WORKS, PERSONAL_WORKS } from "../../../constants";

export default function Work({ mousecursor }) {
  useEffect(() => {
    const workItem = document.querySelectorAll(".work_item");
    workItem.forEach((item) => {
      item.addEventListener("mouseover", () => {
        if (mousecursor) {
          mousecursor.style.opacity = 0.5;
        }
      });
      item.addEventListener("mouseleave", () => {
        if (mousecursor) {
          mousecursor.style.opacity = 1;
        }
      });
    });
  });

  return (
    <div className="work" id="work">
      <div className="background-image">
        <img src={WorkBackground} />
      </div>
      <div className="works">
        <div className="works-top">
          <h1>My skills</h1>
          <div className="skills">
            {TOOLS.map((item) => (
              <span className="skill">{item}</span>
            ))}
          </div>
        </div>
        <div className="works-mid">
          <h1>Work Experience</h1>
          <div className="projects">
            {WORKS.map((work) => (
              <Card key={work.id} item={work} />
            ))}
          </div>
        </div>
        <div className="personal">
          <h2>
            <u> Personal Works </u>{" "}
          </h2>
          <div className="personal_works">
            {PERSONAL_WORKS.map((item) => (
              <a
                key={item.id}
                target="_blank"
                className="work_item"
                href={item.link}
              >
                <h3>{item.title}</h3>
                <div className="p-skills">{`(${item.tags.join(",")})`}</div>
              </a>
            ))}
          </div>
          etc..
        </div>
      </div>
    </div>
  );
}
