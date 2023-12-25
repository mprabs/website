import React from "react";

import "./Content.scss";

function Content() {
  return (
    <>
      <div className="content">
        <div className="content-text line" id="text-content">
          <h1 className="flipX">Front End ReactJs Developer</h1>
        </div>
        <div className="content-image" role="img" aria-label="prabin-acharya-profile-image"></div>
        <div className="content-description">
          <p>
            Hi ! My name is Prabin Acharya. I live in Nepal. I'm currently working remotely as a Frontend Web Developer with ReactJs. Feel free to explore the
            whole website.
            <br /> <br />
          </p>
          <h3>Happy Exploring !</h3>
        </div>
      </div>
    </>
  );
}

export default Content;
