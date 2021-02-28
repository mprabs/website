import React from "react";
import "./contact.css";

import ConnectBackground from "../../../assets/connectBackground.jpg";

export default function contact() {
  return (
    <div className="contact" id="contact">
      <div className="background-image">
        <img src={ConnectBackground} />
      </div>
    </div>
  );
}
