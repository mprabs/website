import React from "react";
import "./Content.scss";
import profilePhoto from "../assets/prabin.jpg";

import { Link } from "react-router-dom";

import Meta from "./Meta";

const Content: React.FC = () => {
  return (
    <div className="pa-content">
      <Meta
        title="Prabin Acharya | Front End ReactJs Web Developer"
        description="Prabin Acharya is a skilled FrontEnd ReactJs Web Developer with expertise in modern web applications."
        tags={["ReactJs", "FrontEnd Developer", "Web Development", "Prabin Acharya"]}
      />
      <section className="pa-profile">
        <div className="pa-container">
          <div className="pa-profile-content">
            <img src={profilePhoto} alt="Prabin Acharya" className="pa-profile-photo" />
            <div className="pa-profile-text">
              <h2>Hello, I'm Prabin Acharya !</h2>
              <p>I'm a passionate React developer based in Nepal, with a knack for creating seamless user experiences and robust front-end solutions.</p>
              <p className="pa-tagline">
                <span>
                  <i className="fas fa-graduation-cap"></i> Bachelors of Science in Computer Science
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="pa-main">
        <div className="pa-container">
          <section className="pa-section pa-highlights">
            <h3>Key Highlights</h3>
            <ul>
              <li>4+ years of professional React development experience</li>
              <li>Led development of patented features for enterprise-level applications</li>
              <li>Expertise in WebGL, real-time communications, and third-party integrations</li>
              <li>Proven track record in optimizing application performance and user engagement</li>
            </ul>
          </section>

          <section className="pa-section">
            <h3>
              Senior React Developer:{" "}
              <a target="__blank" href="https://sharelookapp.com/">
                Sharelook
              </a>{" "}
              Enterprise Application
            </h3>
            <p>
              Led the design and development of multiple services using the latest ReactJs technologies, including patented features and in-app video
              conferencing.
            </p>
          </section>
          <section className="pa-hero">
            <h2>Transforming Ideas into Seamless User Experiences</h2>
            <Link to="/works" className="pa-cta-button">
              View My Portfolio
            </Link>
          </section>

          <section className="pa-section pa-skills">
            <h3>Skills Snapshot</h3>
            <ul className="pa-skills-list">
              <li>ReactJS / HTML5 / CSS3 / JavaScript</li>
              <li>RESTful APIs & WebSockets</li>
              <li>UI/UX Design</li>
              <li>Performance Optimization</li>
              <li>Video Conferencing Integration</li>
              <li>Data Visualization</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="pa-footer">
        <p>Based in Nepal, available for remote opportunities worldwide</p>
      </footer>
    </div>
  );
};

export default Content;
