import React from "react";
import "./body.css";

import About from "./About";
import Contact from "./Contact";
import Work from "./Work";

export default function body() {
  return (
    <div className="content">
      <About />
      <Work />
      <Contact />
    </div>
  );
}
