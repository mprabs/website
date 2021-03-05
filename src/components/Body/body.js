import React from "react";
import "./body.css";

import About from "./About";
import Contact from "./Contact";
import Work from "./Work";

import Swivel from "../../assets/swivel.png";

export default function body({ mousecursor }) {
  return (
    <div className="content">
      <About mousecursor={mousecursor} />
      <div className="swivel">
        <img src={Swivel} />
      </div>
      <Work mousecursor={mousecursor} />
      <Contact mousecursor={mousecursor} />
    </div>
  );
}
