/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./MainWork.css";
import workImage1 from "../assets/main-work-icon-1.png";
import workImage2 from "../assets/main-work-icon-2.png";
import workImage3 from "../assets/main-work-icon-3.png";

function MainWork() {
  return (
    <div className="main-work work" id="work">
      <div className="container">
        <div className="work__content-wrapper">
          <p className="work__title">Как это работает</p>
          <div className="work__btn-wrapper">
            <button className="work__btn">Узнать больше</button>
          </div>
          <div className="work__list">
            <div className="work__item">
              <img src={workImage1} alt="Удобный заказ на сайте"></img>
              <p className="work__item-text">Удобный заказ <br/> на сайте</p>
            </div>
            <div className="work__item">
              <img src={workImage2} alt="Нет необходимости ехать в офис"></img>
              <p className="work__item-text">Нет необходимости <br/> ехать в офис</p>
            </div>
            <div className="work__item">
              <img src={workImage3} alt="Огромный выбор направлений"></img>
              <p className="work__item-text">Огромный выбор <br/> направлений</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainWork;
