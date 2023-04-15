import React from "react";

import "./Content.scss";

function Content() {
  return (
    <>
      <div className="content">
        <div className="content-text" id="text-content">
          <p>
            Front <br /> End <br /> ReactJs <br /> Developer
          </p>
        </div>
        <div className="content-image"></div>
        <div className="content-description">
          <p>
            Hi ! My name is Prabin Acharya. I live in Nepal. I'm currently working remotely as a Frontend Web Developer with ReactJs. Feel free to explore the
            whole website.
            <br /> <br />
          </p>
          <span>Happy Exploring !</span>
        </div>
      </div>
    </>
  );
}

export default Content;
