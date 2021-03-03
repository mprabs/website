import React, { useEffect, useState } from "react";
import "./about.css";

import ProfilePNG from "../../../assets/profile.jpg";
import Background from "../../../assets/background.jpg";

export default function About() {
  const [quote, setquote] = useState(null);

  useEffect(() => {
    fetch("https://freequote.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => setquote(data));
  }, []);

  return (
    <div className="about" id="about">
      <div className="background-image">
        <img src={Background} />
      </div>
      <div className="top">
        {quote && quote.quote} - {quote && quote.author}
      </div>

      <div className="info">
        <div className="left">
          <div className="image">
            <img src={ProfilePNG} />
          </div>
          <div className="intro">
            <h2>Prabin Acharya</h2>
            <p>Developer</p>
          </div>
        </div>
        <div className="right">
          <div className="quote">
            {" "}
            <q>Do good, be good. Live the healthy way ! </q>{" "}
          </div>
          <div className="myInfo">
            <p>
              <span className="hi">Hi</span>, <br />I am{" "}
              <span>Prabin Acharya</span>. I'm a passionate young javascript
              developer from Nepal. I believe in constant learning and applying
              to develop skills and explore more of myself in life. On a
              constantly evolving journey of life and hence am very optimistic
              and confident that i will succeed in this journey of mine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
