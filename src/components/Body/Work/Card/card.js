import React from "react";
import "./card.css";

export default function card({ item }) {
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <h3>{item.title}</h3>
          <h4>{item.about}</h4>
          <div className="tags">
            {item.tags.map((item, index) => (
              <span key={index} className="skills">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div class="flip-card-back">
          <a target="_blank" href={item.link} className="visit">
            Click to EXPLORE
          </a>
        </div>
      </div>
    </div>
  );
}
