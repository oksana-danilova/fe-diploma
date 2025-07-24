/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from "react";
import AppContext from "../#context/appContext";
import RouteContext from "../context/routeContext";
import OrderContext from "../context/orderContext";
import ArrivalImage from "../assets/slider-filter-period-arrival.png";
import DepartureImage from "../assets/slider-filter-period-departure.png";
import PassengersImage from "../assets/order-sidebar-passengers-icon.png";
import "./OrderDetails.css";

const calculateTotalCost = ({
  departureServiceCost,
  arrivalServiceCost,
  ticketDepCost,
  ticketArrCost
}) => {
  const depCost = Number(departureServiceCost) + Number(ticketDepCost || 0);
  const arrCost = Number(arrivalServiceCost) + Number(ticketArrCost || 0);
  return depCost + arrCost;
};

function OrderDetails() {
  const { appState } = useContext(AppContext);
  const { routeState } = useContext(RouteContext);
  const { orderState } = useContext(OrderContext);

  const serviceDepCost = Object.values(orderState.departure_service)
    .reduce((acc, val) => acc + Number(val), 0);

  const serviceArrCost = Object.values(orderState.arrival_service)
    .reduce((acc, val) => acc + Number(val), 0);

  const ticketsDepCost = orderState.departure?.seats
    ?.reduce((acc, seat) => acc + Number(seat.seat_cost), 0);

  const ticketsArrCost = orderState.arrival?.seats
    ?.reduce((acc, seat) => acc + Number(seat.seat_cost), 0);

  const totalDepArrCost = calculateTotalCost({
    departureServiceCost: serviceDepCost,
    arrivalServiceCost: serviceArrCost,
    ticketDepCost: ticketsDepCost,
    ticketArrCost: ticketsArrCost
  });

  const adultSeatsCount =
    Number(orderState.departure_person_count.adult) +
    Number(orderState.arrival_person_count.adult);

  const childSeatsCount =
    Number(orderState.departure_person_count.child) +
    Number(orderState.arrival_person_count.child);

  const adultSeatsCost = totalDepArrCost -
    0.425 * ((totalDepArrCost * childSeatsCount) /
               (adultSeatsCount + childSeatsCount));

  const childSeatsCost = 0.425 *
     ((totalDepArrCost * childSeatsCount) /
       (adultSeatsCount + childSeatsCount));

  return (
    <div className="order-details passengers-sidebar">
      <div className="passengers-sidebar__header">
        <p>Детали поездки</p>
      </div>

      <div className="passengers-sidebar__details details-departure">
        <div className="passengers-sidebar__details-control details-control">
          <img className="details-control-img" src={DepartureImage} alt="Отправление"/>
          <p className="details-control__title">Туда</p>
          <time className="details-control__time" dateTime="2018-08-30 00:10">{appState.date_start}</time>
          
          <div className="details-control-content details-content__info">
            <div className="details-content__info-train-num">
              <p>№ Поезда</p>
              <p className="details-content__info-num info-num-departure">{routeState.departure_train_name}</p>
            </div>

            <div className="details-content__info-train-name">
              <p>Название</p>
              <p className="details-content__info-name info-name-departure">{routeState.departure_from_city_name}<br/>{routeState.departure_to_city_name}</p>
            </div>

            <div className="details-content__info-period">{routeState.departure_duration}</div>

            <div className="details-content__info-time">
              <time className="info-time__time time-departure-start" dateTime="2018-08-30 00:10">{routeState.departure_from_datetime}</time>
              <div className="info-period__arrow arrow-right"></div>
              <time className="info-time__time time-departure-end" dateTime="2018-08-31 09:52">{routeState.departure_to_datetime}</time>
            </div>

            <div className="details-content__info-date">
              <time className="info-date__date date-departure-start" dateTime="2018-08-30 00:10">{appState.date_start}</time>
              <time className="info-date__date date-departure-end" dateTime="2018-08-31 09:52">{appState.date_start_arrival || appState.date_start}</time>
            </div>

            <div className="details-content__info-city">
              <div className="info-city__city city-departure-start">{routeState.departure_from_city_name}</div>
              <div className="info-city__city city-departure-end">{routeState.departure_to_city_name}</div>
            </div>

            <div className="details-content__info-station">
              <div className="info-station__station station-departure-start">{routeState.departure_from_railway_station_name}</div>
              <div className="info-station__station station-departure-end">{routeState.departure_to_railway_station_name}</div>
            </div>
          </div>
        </div>
      </div>

      {!!appState.arrival_id &&
        <div className="passengers-sidebar__details details-arrival">
          <div className="passengers-sidebar__details-control details-control">
            <img className="details-control-img" src={ArrivalImage} alt="Прибытие"/>
            <p className="details-control__title">Обратно</p>
            <time className="details-control__time" dateTime="2018-09-09 00:10">{appState.date_end}</time>
            
            <div className="details-control-content details-content__info">
              <div className="details-content__info-train-num">
                <p>№ Поезда</p>
                <p className="details-content__info-num info-num-arrive">{routeState.arrival_train_name}</p>
              </div>

              <div className="details-content__info-train-name">
                <p>Название</p>
                <p className="details-content__info-name info-name-arrive">{routeState.arrival_from_city_name}<br/>{routeState.arrival_to_city_name}</p>
              </div>

              <div className="details-content__info-period">{routeState.arrival_duration}</div>

              <div className="details-content__info-time">
                <time className="info-time__time time-arrive-start" dateTime="2018-08-30 00:10">{routeState.arrival_from_datetime}</time>
                <div className="info-period__arrow arrow-left"></div>
                <time className="info-time__time time-arrive-end" dateTime="2018-08-31 09:52">{routeState.arrival_to_datetime}</time>
              </div>

              <div className="details-content__info-date">
                <time className="info-date__date date-arrive-start" dateTime="2018-08-30 00:10">{appState.date_end}</time>
                <time className="info-date__date date-arrive-end" dateTime="2018-08-31 09:52">{appState.date_end_arrival || appState.date_end}</time>
              </div>

              <div className="details-content__info-city">
                <div className="info-city__city city-arrive-start">{routeState.arrival_from_city_name}</div>
                <div className="info-city__city city-arrive-end">{routeState.arrival_to_city_name}</div>
              </div>

              <div className="details-content__info-station">
                <div className="info-station__station station-arrive-start">{routeState.arrival_from_railway_station_name}</div>
                <div className="info-station__station station-arrive-end">{routeState.arrival_to_railway_station_name}</div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="passengers-sidebar__details details-passengers">
        <div className="passengers-sidebar__details-control details-control">
          <img className="details-control-img" src={PassengersImage} alt="Пассажиры"/>
          <p className="details-control__title">Пассажиры</p>
          
          <div className="details-control-content details-content__info">
            <div className="passengers-info passengers-info__adult">
              <p>Взрослые:</p>
              <p className="passengers-info__count passengers-info__adult-count">{adultSeatsCount}</p>
              <p className="passengers-info__total-cost">
                <span className="passengers-info__adult-total-cost">{adultSeatsCost.toFixed()} ₽</span>
              </p>
            </div>

            <div className="passengers-info passengers-info__kid">
              <p>Дети:</p>
              <p className="passengers-info__count passengers-info__kid-count">{childSeatsCount}</p>
              <p className="passengers-info__total-cost">
                <span className="passengers-info__kid-total-cost">{childSeatsCost.toFixed()} ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="passengers-sidebar__footer footer-total-cost">
        <p className="footer-total-cost__title">Итог</p>
        <p className="footer-total-cost__total-cost">
          <span className="footer-total-cost__total-cost-count">{totalDepArrCost.toFixed()} ₽</span>
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
