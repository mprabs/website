import React from "react";
import "./Content.scss";
import profilePhoto from "../assets/prabin-no-bg.png";
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

      <div className="pa-container">
        <section className="pa-hero">
          <div className="pa-hero-content">
            <div className="pa-hero-text">
              <h1>Hello, I'm Prabin Acharya</h1>
              <p className="pa-lead">A passionate React developer crafting seamless user experiences in Nepal</p>
              <div className="pa-badge">
                <i className="fas fa-graduation-cap"></i>
                <span>B.Sc. Computer Science</span>
              </div>
            </div>
            <div className="pa-hero-image">
              <img src={profilePhoto} alt="Prabin Acharya" />
            </div>
          </div>
        </section>

        <section className="pa-experience">
          <h2>Professional Overview</h2>
          <div className="pa-experience-grid">
            <div className="pa-experience-card">
              <span className="pa-number">4+</span>
              <p>Years of React Development</p>
            </div>
            <div className="pa-experience-card">
              <span className="pa-number">5+</span>
              <p>Enterprise Solutions Built</p>
            </div>
            <div className="pa-experience-card">
              <i className="fas fa-globe"></i>
              <p>Remote Work Experience</p>
            </div>
          </div>
        </section>

        <section className="pa-current">
          <h2>Current Role</h2>
          <div className="pa-role-card">
            <h3>
              Senior React Developer at{" "}
              <a href="https://sharelookapp.com/" target="_blank" rel="noopener noreferrer">
                Sharelook
              </a>
            </h3>
            <p>Leading the development of enterprise applications with patented features and real-time communication solutions.</p>
          </div>
        </section>

        <section className="pa-skills">
          <h2>Technical Expertise</h2>
          <div className="pa-skills-grid">
            {["ReactJS", "JavaScript", "HTML5/CSS3", "REST APIs", "WebSockets", "UI/UX Design", "Performance", "WebRTC"].map((skill) => (
              <div key={skill} className="pa-skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Content;
