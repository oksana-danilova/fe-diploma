/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../context/appContext";
import RouteContext from "../context/routeContext";
import OrderContext from "../context/orderContext";
import { useNavigate } from "react-router-dom";
import SVGicon from "../components/SVGicon/SVGicon";
import getTime from '../services/getTime';
import "./OrderTrain.css";

const SEAT_TYPES = {
  fourth: "Сидячий",
  third: "Плацкарт",
  second: "Купе",
  first: "Люкс"
};

function OrderTrain({ item }) {
  const { appState, setAppState } = useContext(AppContext);
  const { routeState, setRouteState } = useContext(RouteContext);
  const { orderState, setOrderState } = useContext(OrderContext);
  const navigate = useNavigate();

  function updateContexts() {
    const newAppState = { ...appState };
    const newRouteState = { ...routeState };
    const newOrderState = { ...orderState };
    
    for (let key in ["departure", "arrival"]) {
      let currentItem = item[key];
      
      if (!currentItem) continue;
      
      newAppState[key + "_id"] = currentItem._id;
      newRouteState[key + "_train_name"] = currentItem.train.name;
      newRouteState[key + "_from_city_name"] = currentItem.from.city.name;
      newRouteState[key + "_to_city_name"] = currentItem.to.city.name;
      newRouteState[key + "_from_datetime"] = getTime(currentItem.from.datetime);
      newRouteState[key + "_from_railway_station_name"] = currentItem.from.railway_station_name;
      newRouteState[key + "_to_datetime"] = getTime(currentItem.to.datetime);
      newRouteState[key + "_to_railway_station_name"] = currentItem.to.railway_station_name;
      newRouteState[key + "_duration"] = getTime(currentItem.duration);
      
      newOrderState[key].route_direction_id = currentItem._id;
    }

    setAppState(newAppState);
    setRouteState(newRouteState);
    setOrderState(newOrderState);
  }

  const handleClick = (e) => {
    e.preventDefault();
    updateContexts();
    navigate("/fe-diplom/order/seats");
  };

  const openSeats = (e) => {
    e.preventDefault();
    if (e.target.nextElementSibling.className.includes("train__price-seat-up-down")) {
      e.target.nextElementSibling.classList.toggle("train__price-seat-up-down-open");
    }
  };

  return (
    <div className="order-train train">
      <div className="train__name-wrapper" style={{ height: item.arrival ? "360px" : "350px" }}>
        <div className="train__name-icon"><SVGicon name={"train"} /></div>
        <p className="train__name-number">{item.departure.train.name}</p>
        
        {["departure", "arrival"].map(key => {
          const currentItem = item[key];
          
          if (!currentItem) return null;
          
          return (
            <>
              <p className="train__name-number" key={`${key}_number`}>{currentItem.train.name}</p>
              <div className="train__name-place" key={`${key}_place`}>
                <p className="train__name-city">{currentItem.from.city.name}</p>
                <p className="train__name-city">{currentItem.to.city.name}</p>
              </div>
            </>
          );
        })}
      </div>

      <div className="train__time-wrapper" style={{ height: item.arrival ? "360px" : "350px" }}>
        {["departure", "arrival"].map(key => {
          const currentItem = item[key];
          
          if (!currentItem) return null;
          
          return (
            <div className={`train__time-${key}`} key={currentItem._id}>
              <div>
                <time dateTime="2001-05-15 19:00">{getTime(currentItem.from.datetime)}</time>
                <p>{currentItem.from.city.name}</p>
                <p>{currentItem.from.railway_station_name}</p>
              </div>
              <div>
                <p>{getTime(currentItem.duration)}</p>
                <div className="train__time-arrow">{key === "departure" ? "arrow-right" : "arrow-left"}</div>
              </div>
              <div>
                <time dateTime="2024-05-15 19:00">{getTime(currentItem.to.datetime)}</time>
                <p>{currentItem.to.city.name}</p>
                <p>{currentItem.to.railway_station_name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="train__price-wrapper" style={{ height: item.arrival ? "360px" : "350px" }}>
        <div className="train__price-seats">
          {Object.keys(SEAT_TYPES).map(seatType => {
            const availableSeatsInfo = item.departure.available_seats_info[seatType];
            
            if (!availableSeatsInfo) return null;
            
            return (
              <div className="train__price-seat" key={seatType}>
                <p className="train__price-seat-type">{SEAT_TYPES[seatType]}</p>
                <p className="train__price-seat-count" onClick={openSeats}>{availableSeatsInfo}</p>
                
                <div className="train__price-seat-up-down">
                  {["top", "bottom", "side"].filter(priceKey => seatType !== "first" || priceKey === "bottom").map(priceKey => {
                    const price = item.departure.price_info[seatType][priceKey + "_price"];
                    
                    if (!price) return null;
                    
                    return (
                      <div className={`train__price-seat-${priceKey}`} key={`${seatType}-${priceKey}`}>
                        <p className={`train__price-seat-${priceKey}-type`}>{priceKey === "side" ? "боковые" : `${priceKey === "top" ? "верхние" : "нижние"}`}</p>
                        <p><span className={`train__price-seat-${priceKey}-sum`}>{price}</span>₽</p>
                      </div>
                    );
                  })}
                </div>
                
                <p>от<span className="train__price-seat-sum">{item.departure.price_info[seatType].top_price}</span>₽</p>
              </div>
            );
          })}
        </div>

        <div className="train__price-icons">
          {item.departure.have_air_conditioning && <SVGicon name={"have_air_conditioning"} />}
          {item.departure.have_wifi && <SVGicon name={"have_wifi"} />}
          {item.departure.is_express && <SVGicon name={"is_express"} />}
        </div>
        <button className="train__price-button" type="button" onClick={handleClick}>Выбрать места</button>
      </div>
    </div>
  );
}

export default OrderTrain;

OrderTrain.propTypes = {
  item: PropTypes.object,
};
