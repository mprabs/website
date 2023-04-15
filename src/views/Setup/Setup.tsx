import React from "react";

import "./Setup.scss";
import Footer from "../Footer";

function Setup() {
  return (
    <>
      <div className="setup-container">
        <h2 className="setup-title">Hardware</h2>
        <ul>
          <li>
            <h3>Laptop</h3>
            <span>Acer Nitro 5 (2020 Edition)</span>
          </li>
          <li>
            <h3>Processor</h3>
            <span>AMD Ryzen 4500H</span>
          </li>
          <li>
            <h3>GPU</h3>
            <span>GTX 1650</span>
          </li>
          <li>
            <h3>Monitor II</h3>
            <span>DELL 27" FHD 60fps</span>
          </li>
          <li>
            <h3>Keyboard</h3>
            <span>AiTNT Mechanical Keyboard</span>
          </li>
          <li>
            <h3>Mouse</h3>
            <span>Digicom Wired Optical Mouse</span>
          </li>
          <li>
            <h3>HeadPhone</h3>
            <span>Fantech HG11</span>
          </li>
          <li>
            <h3>Multi Port USB</h3>
            <span>USB 3.0 SuperSpeed</span>
          </li>
          <li>
            <h3>PowerBank</h3>
            <span>Remax 50,000W</span>
          </li>
        </ul>
        <h2 className="setup-title">Software</h2>
        <ul>
          <li>
            <h3>Operating System</h3>
            <span>Windows 10</span>
          </li>
          <li>
            <h3>Web Browser</h3>
            <span>Brave, Google Chrome, Mozilla Firefox</span>
          </li>
        </ul>
        <h2 className="setup-title">Development Tools</h2>
        <ul>
          <li>
            <h3>Code Editor</h3>
            <span>Visual Studio Code</span>
          </li>
          <li>
            <h3>Version Control</h3>
            <span>Git</span>
          </li>
          <li>
            <h3>Package Manager</h3>
            <span>npm</span>
          </li>
        </ul>
        <h2 className="setup-title">Others</h2>
        <ul>
          <li>
            <h3>Image Manipulation</h3>
            <span>Adobe Photoshop </span>
          </li>
          <li>
            <h3>Video Player</h3>
            <span>VLC Media </span>
          </li>
          <li>
            <h3>E-Mail</h3>
            <span>Gmail</span>
          </li>
          <li>
            <h3>Games</h3>
            <span>PUBG, Chess</span>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Setup;
