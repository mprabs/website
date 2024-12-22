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
            <span>Laptop</span>
            <h3>Acer Nitro 5 (2020 Edition)</h3>
          </li>
          <li>
            <span>Processor</span>
            <h3>AMD Ryzen 4500H</h3>
          </li>
          <li>
            <span>GPU</span>
            <h3>GTX 1650</h3>
          </li>
          <li>
            <span>Monitor II</span>
            <h3>KOORUI 27" 2K 144Hz</h3>
          </li>
          <li>
            <span>Keyboard</span>
            <h3>AiTNT Mechanical Keyboard</h3>
          </li>
          <li>
            <span>Mouse</span>
            <h3>Logitech M90</h3>
          </li>
          <li>
            <span>HeadPhone</span>
            <h3>Fantech MH90</h3>
          </li>
          <li>
            <span>PowerBank</span>
            <h3>Remax 50,000W</h3>
          </li>
          <li>
            <span>Mobile PC</span>
            <h3>Samsung S24 Ultra</h3>
          </li>
        </ul>
        <h2 className="setup-title">Software</h2>
        <ul>
          <li>
            <span>Operating System</span>
            <h3>Windows 10</h3>
          </li>
          <li>
            <span>Web Browser</span>
            <h3>Brave, Google Chrome, Mozilla Firefox</h3>
          </li>
        </ul>
        <h2 className="setup-title">Development Tools</h2>
        <ul>
          <li>
            <span>Code Editor</span>
            <h3>VS Code</h3>
          </li>
          <li>
            <span>Version Control</span>
            <h3>Git</h3>
          </li>
          <li>
            <span>Package Manager</span>
            <h3>npm, yarn</h3>
          </li>
        </ul>
        <h2 className="setup-title">Others</h2>
        <ul>
          <li>
            <span>Image Manipulation</span>
            <h3>Adobe Photoshop, Canva</h3>
          </li>
          <li>
            <span>Video Player</span>
            <h3>VLC Media</h3>
          </li>
          <li>
            <span>E-Mail</span>
            <h3>Gmail</h3>
          </li>
          <li>
            <span>Games</span>
            <h3>PUBG, Chess</h3>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Setup;
