/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Line1 from "../assets/order-step-1.png";
import Line2 from "../assets/order-step-2.png";
import Line3 from "../assets/order-step-3.png";
import Line4 from "../assets/order-step-4.png";
import "./OrderLine.css";

function OrderLine() {
  const path = window.location.pathname;
  const bgLine = path.includes("passengers") ? {backgroundImage: `url(${Line2})`} :
    path.includes("payment") ? {backgroundImage: `url(${Line3})`} :
    path.includes("confirm") ? {backgroundImage: `url(${Line4})`} :
    {backgroundImage: `url(${Line1})`}

  return (
    <div className={path.includes("confirm") ? "order-line line order-line-all" : "order-line line"}>
      <div className="line__container">
        <ol className="line__list line__list-bg" style={bgLine}>
          <li className="line__item">
            <p className="line__title">
              <span className="line__num">1</span>
              Билеты
            </p>
          </li>
          <li className="line__item">
            <p className="line__title">
              <span className="line__num">2</span>
              Пассажиры
            </p>
          </li>
          <li className="line__item">
            <p className="line__title">
              <span className="line__num">3</span>
              Оплата
            </p>
          </li>
          <li className="line__item">
            <p className="line__title">
              <span className="line__num">4</span>
              Проверка
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default OrderLine;
