import * as React from "react";

function WorkExperience() {
  return (
    <div className="experience">
      <h2 className="experience-title">Work Experience</h2>
      <ul>
        <li>
          <a target="__blank" href="https://sharelookapp.com/">
            Sharelook PTE. LTD
          </a>
          <span>2020 October - *Present</span>
          <p>
            Front End Web Developer <span>ReactJs</span>
          </p>
          <ul className="experience-details">
            <li>
              Led the design and development of multiple services inside the enterprise-level application of Sharelook using the latest technologies surrounding
              ReactJs.
            </li>
            <li>
              Led the development of several features, from identifying system requirements and partner dependencies to workload balancing, software
              implementation, engineering, testing, and configuring metrics, monitors, and dashboards.
            </li>
            <li>
              Involved in design, planning and development of a patented feature i.e. Maze and in-app Video Conferencing with multiple features like screen
              sharing, Transcribe etc using AWS Chime & Agora.
            </li>
            <li>
              Implemented different third party libraries, WebGL integrations, Graphs, Charts, Chat Bots, Medias, Calendar, SDKs while constantly working with
              RESTful APIs and Web SOCKETS.
            </li>
            <li>Continuous Integration/Deployment Pipeline Integration, pull requests, code reviews, load/stress testing, E2E testing</li>
          </ul>
        </li>
        <li>
          <a target="__blank" href="https://getswanned.com/">
            Swanned Pty. Ltd
          </a>
          <span>2020 June - 2020 August</span>
          <p>
            Freelance <span>React Native</span>
          </p>
          <ul className="experience-details">
            <li>Implemented locally scheduled notifications inside the native swanned mobile application with Expo.</li>
            <li>Development of new screens and animations, added some forms and stylings inside the dating application</li>
            <li>Addition of bot in chats with realtime response, response tagging and did some enhancements on the Swanned web page.</li>
          </ul>
        </li>
        <li>
          <a target="__blank" href="https://aayulogic.com/">
            Aayulogic Pvt Ltd - RealHRSoft
          </a>
          <span>2020 January - 2020 April</span>
          <p>
            Internship - Front End Developer <span>VueJs</span>
          </p>
          <ul className="experience-details">
            <li>Added new UI components and worked around simple logical manipulations inside the inhouse Human Resource Management Software.</li>
            <li>Exposed to VueJs and its workarounds, involved in developing a real world application</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default WorkExperience;
