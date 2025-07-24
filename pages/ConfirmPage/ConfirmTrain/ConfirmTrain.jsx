/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from "react";
import RouteContext from "../context/routeContext";
import SVGicon from "../components/SVGicon/SVGicon";
import "./ConfirmTrain.css";

function ConfirmTrain() {
  const {routeState} = useContext(RouteContext);

  return (
    <div className="order-train train">

      <div className="train__name-wrapper" style={routeState && routeState.arrival_id ? {height: "360px"} : {height: "350px"}}>
        <div className="train__name-icon">
          <SVGicon name={"train"}/>
        </div>
        <p className="train__name-number">{routeState.departure_train_name}</p>
        <div className="train__name-place">
          <p className="train__name-city">{routeState.departure_from_city_name}</p>
          <p className="train__name-city">{routeState.departure_to_city_name}</p> 
        </div>
        {routeState && routeState.arrival_id ? 
        <>
          <p className="train__name-number">{routeState.arrival_train_name}</p>
          <div className="train__name-place">
            <p className="train__name-city">{routeState.arrival_from_city_name}</p>
            <p className="train__name-city">{routeState.arrival_to_city_name}</p> 
          </div>
        </> : ""
        }
      </div>

      <div className="train__time-wrapper" style={routeState && routeState.arrival_id ? {height: "360px"} : {height: "350px"}}>
        <div className="train__time-to" id={routeState.departure_id}>
          <div>
            <time dateTime="2024-11-15 19:00">{routeState.departure_from_datetime}</time>
            <p>{routeState.departure_from_city_name}</p>
            <p>{routeState.departure_from_railway_station_name}</p>
          </div>
          <div>
            <p>{routeState.departure_duration}</p>
            <div className="train__time-arrow arrow-right"></div>
          </div>
          <div>
            <time dateTime="2024-11-15 19:00">{routeState.departure_to_datetime}</time>
            <p>{routeState.departure_to_city_name}</p>
            <p>{routeState.departure_to_railway_station_name}</p>
          </div>
        </div>
        {routeState && routeState.arrival_id ? 
        <div className="train__time-from" id={routeState.arrival_id}>
          <div>
            <time dateTime="2024-11-15 19:00">{routeState.arrival_from_datetime}</time>
            <p>{routeState.arrival_from_city_name}</p>
            <p>{routeState.arrival_from_railway_station_name}</p>
          </div>
          <div>
            <p>{routeState.arrival_duration}</p>
            <div className="train__time-arrow arrow-left"></div>
          </div>
          <div>
            <time dateTime="2024-11-15 19:00">{routeState.arrival_to_datetime}</time>
            <p>{routeState.arrival_to_city_name}</p>
            <p>{routeState.arrival_to_railway_station_name}</p>
          </div>
        </div> : ""
        }
      </div>

      <div className="train__price-wrapper" style={routeState && routeState.arrival_id ? {height: "360px"} : {height: "350px"}}>
        <div className="train__price-seats">

            <div className="train__price-seat">
              <p className="train__price-seat-type">Сидячий</p>
              <p className="train__price-seat-count">88</p>
              <p>от
                <span className="train__price-seat-sum">1920</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div>

            <div className="train__price-seat">
              <p className="train__price-seat-type">Плацкарт</p>
              <p className="train__price-seat-count">52</p>
              <p>от
                <span className="train__price-seat-sum">2530</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div>

            <div className="train__price-seat">
              <p className="train__price-seat-type">Купе</p>
              <p className="train__price-seat-count">24</p>
              <p>от
                <span className="train__price-seat-sum">3820</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div>

            <div className="train__price-seat">
              <p className="train__price-seat-type">Люкс</p>
              <p className="train__price-seat-count">15</p>
              <p>от
                <span className="train__price-seat-sum">4950</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div>

        </div>

        <div className="train__price-icons">
          <SVGicon name={"have_air_conditioning"}/>
          <SVGicon name={"have_wifi"}/>
          <SVGicon name={"is_express"}/>
        </div>
        <button className="confirm-info__btn" type="button">Изменить</button>
      </div>

    </div>
  );
}

export default ConfirmTrain;
