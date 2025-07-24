/* eslint-disable-next-line no-unused-vars */
import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import "./MainFeedback.css";

function MainFeedback() {
  return (
    <div className="main-feedback feedback" id="feedback">
      <div className="container">
        <div className="feedback__wrapper">
          <p className="feedback__title">Отзывы</p>
          <div className="feedback__swiper-container">
            <MainSlider/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeedback;
