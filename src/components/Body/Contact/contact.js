import React from "react";
import "./contact.css";

import ConnectBackground from "../../../assets/connectBackground.jpg";
import EverestIcon from "../../../assets/everest.png";

import { CONTACT_ICONS } from "../../../constants";

export default function contact() {
  return (
    <div className="contact" id="contact">
      <div className="background-image">
        <img src={ConnectBackground} />
      </div>
      <div className="container">
        <div className="title">Lets Connect</div>
        <div className="info_personal">
          <div className="everest">
            <div className="address">
              <span>
                Hello from <q>The Land of Mountains</q>
              </span>
              <div className="mail">
                <a href="mailto:acharyaprabin03@gmail.com">
                  {" "}
                  Mail me at acharyaprabin03@gmail.com
                </a>
              </div>
            </div>
            <div className="circle">
              <span className="circle_info">
                Mt. Everest <br /> 8848m
              </span>
            </div>
            <img src={EverestIcon} />
          </div>
        </div>
        <div className="icons">
          {CONTACT_ICONS.map((item, index) => (
            <a
              key={index}
              className="contact_icon"
              target="_blank"
              href={item.link}
            >
              <img src={item.icon} />
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer">Prabin Acharya @ 2020</div>
    </div>
  );
}
