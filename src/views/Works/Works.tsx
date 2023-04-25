import * as React from "react";

import "./Works.scss";

import EvolutionImage from "../../assets/evolution.png";
import IpTrackerImage from "../../assets/iptracket.png";
import TetrisImage from "../../assets/tetris.png";
import CodeImage from "../../assets/codewriter.png";
import CanteenImage from "../../assets/canteen-management.png";
import HotelsImage from "../../assets/hotels-app.png";
import Footer from "../Footer";
import WorkExperience from "./WorkExperience";

function Works() {
  return (
    <>
      <div className="works-container">
        <WorkExperience />
        <h2 className="experience-title works-title">Personal Projects</h2>
        <div className="works">
          <div className="work-item">
            <img src={EvolutionImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">Evolution Simulator</h3>
                <p>This is the simulation of human like walking.</p>
                <ul className="tags">
                  <li>Box2DJs</li>
                  <li>TensorFlow</li>
                  <li>Genetic Algortithm</li>
                  <li>NeuroEvolution</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site" target="__blank" href="https://mprabs.github.io/Evolution-Simulator/">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/Evolution-Simulator">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="work-item">
            <img src={HotelsImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">Hotels Application</h3>
                <p>App for users to checkin between Hotels</p>
                <ul className="tags">
                  <li>VueJs</li>
                  <li>NodeJs</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site disabled" title="visit hotels application">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/Hotels-App">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="work-item">
            <img src={CodeImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">CodeWriter</h3>
                <p>A simple interface for writing code like codepen</p>
                <ul className="tags">
                  <li>ReactJs</li>
                  <li>CodeMirror</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site" target="__blank" href="https://mprabs.github.io/Codepen-clone/">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/Tetris">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="work-item">
            <img src={IpTrackerImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">IP Tracker</h3>
                <p>Track location through IP Address in a map view.</p>
                <ul className="tags">
                  <li>LeafletJs</li>
                  <li>IPify</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site" href="https://mprabs.github.io/IP-Tracker/" target="__blank">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/IP-Tracker">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="work-item">
            <img src={TetrisImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">Tetris</h3>
                <p>A simple game of tetris on the web</p>
                <ul className="tags">
                  <li>VanillaJs</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site disabled" title="visit tetris game">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/Tetris">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="work-item">
            <img src={CanteenImage} alt="" />
            <div className="work-about">
              <div className="work-description">
                <h3 className="work-title">Canteen Management System</h3>
                <p>App to manage canteen workflows</p>
                <ul className="tags">
                  <li>VueJs</li>
                  <li>Vuex</li>
                  <li>Vuetify</li>
                </ul>
              </div>
              <div className="work-buttons">
                <a className="visit-site disabled" title="visit canteen management system">
                  Visit
                </a>
                <a className="view-code" target="__blank" role="button" href="https://github.com/mprabs/Canteen-Management">
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="other-works">
          <h3 className="other-works-title">Pet Projects</h3>
          <ul>
            <li>
              <a target="__blank" href="https://github.com/mprabs/Reddit-Clone">
                Reddit Clone
              </a>
              <span>VueJs</span>
            </li>
            <li>
              <a target="__blank" href="https://github.com/mprabs/Todos-App">
                Todos App
              </a>
              <span>ReactJs</span>
            </li>
            <li>
              <a target="__blank" href="https://github.com/mprabs/Pokemon">
                PokemonApp
              </a>
              <span>ReactJs</span>
            </li>
            <li>
              <a target="__blank" href="https://github.com/mprabs/Reqres-Users-App">
                Reqres Users App
              </a>
              <span>React Native</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Works;
