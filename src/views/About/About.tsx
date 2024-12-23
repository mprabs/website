import React from "react";

import "./About.scss";

import fbLogo from "../../assets/fb.png";
import instaLogo from "../../assets/insta.png";
import githubLogo from "../../assets/github.png";
import linkedinLogo from "../../assets/linkedin.png";
import Footer from "../Footer";

import prabinLandscape from "../../assets/prabin_landscapee.jpg";
import Meta from "../../components/Meta";

function About() {
  return (
    <>
      <Meta
        title="About Me"
        description="My name is Prabin. I work as a frontend web developer with ReactJs."
        tags={["ReactJs", "FrontEnd Developer", "Web Development", "Prabin Acharya"]}
      />
      <div className="about-container">
        <h3>About Me</h3>
        <div className="about-info">
          <p>
            I'm a passionate young javascript developer from Nepal. I believe in constant learning and applying to develop skills and explore more of myself in
            life. Constantly evolving and moving forward is the goal.
          </p>{" "}
          <br />
          In my leisure time, I like to watch sports. I mostly watch football and cricket. I sometimes like to play video games like PUBG, and CSGO, etc; mobile
          games like Clash of Clans, etc. It's not been long but I've also started playing Chess.
          <br /> <br />
          <img src={prabinLandscape} alt="prabin acharya" />
          On weekends, I like to travel, hangout with friends and family, and have fun.
        </div>
        <hr />
        <div className="socials">
          <h3>My Socials</h3>
          <ul>
            <li>
              <a target="_blank" href="https://www.github.com/mprabs">
                <img src={githubLogo} alt="prabin acharya github icon" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.fb.com/paccharya">
                <img src={fbLogo} alt="prabin acharya facebook icon" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com/in/paccharya">
                <img src={linkedinLogo} alt="prabin acharya linkedin icon" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.instagram.com/m_prabs">
                <img src={instaLogo} alt="prabin acharya instagram icon" />
              </a>
            </li>
          </ul>
          <p className="email-text">
            You can also contact me via mail - <a href="mailto:acharyaprabin03.gmail.com">acharyaprabin03.gmail.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
