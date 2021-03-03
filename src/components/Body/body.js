import React from "react";
import "./body.css";

import About from "./About";
import Contact from "./Contact";
import Work from "./Work";

import Swivel from "../../assets/swivel.png";

export default function body({ navigation }) {
  return (
    <div className="content">
      <About />
      <div className="swivel">
        <img src={Swivel} />
      </div>
      <Work />
      <Contact />
    </div>
  );
}
