/* eslint-disable-next-line no-unused-vars */
import React from "react";
import TrainImage from "./assets/train.png";
import LineImage from "./assets/line.png";
import "./Load.css";

function Load() {
  const styleTrain = {backgroundImage: `url(${TrainImage})`};
  const styleLine = {backgroundImage: `url(${LineImage})`};

  return (
    <div className="load__wrapper">
      <div className="load__container">
        <p>идет поиск</p>
        <div className="load__image">
          <div className="load__image-train" style={styleTrain}></div>
          <div className="load__image-line" style={styleLine}></div>
        </div>
      </div>
    </div>

  );
}

export default Load;
