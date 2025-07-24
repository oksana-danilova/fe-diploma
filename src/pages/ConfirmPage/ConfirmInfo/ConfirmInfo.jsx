/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/appContext";
import RouteContext from "../context/routeContext";
import OrderContext from "../context/orderContext";
import PayContext from "../context/payContext";
import ConfirmTrain from "./ConfirmTrain/ConfirmTrain";
import SVGicon from "../components/SVGicon/SVGicon";
import Modal from "../components/Modal/Modal";
import "./ConfirmInfo.css";

function ConfirmInfo() {
  const { setAppState } = useContext(AppContext);
  const { setRouteState } = useContext(RouteContext);
  const { orderState } = useContext(OrderContext);
  const { payState } = useContext(PayContext);
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState("none");
  const navigate = useNavigate();

  const totalServiceCost = Object.values(orderState.departure_service).reduce((acc, item) => acc + +item, 0) +
                           Object.values(orderState.arrival_service).reduce((acc, item) => acc + +item, 0);

  const totalTicketsCost = (orderState.departure?.seats || []).reduce((acc, item) => acc + +item.seat_cost, 0) +
                          (orderState.arrival?.seats || []).reduce((acc, item) => acc + +item.seat_cost, 0);

  const totalCost = totalServiceCost + totalTicketsCost;

  const combinedSeats = [...payState.departure.seats, ...payState.arrival.seats];

  const handleModal = (value) => setModal(value);

  const modalInfo = (value) =>
    value &&
    value === "info" ? (
      <Modal status={"info"} display={modal} text={"Данные о поездке успешно отправлены"} onChange={handleModal} />
    ) : (
      <Modal status={"error"} display={modal} text={"Ошибка! Сервер недоступен. Пожалуйста, попробуйте позже"} onChange={handleModal} />
    );

  const handleSubmit = async () => {
    try {
      await fetch("https://students.netoservices.ru/fe-diplom/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payState),
      }).then((response) => response.json());

      setStatus("info");
      setModal("flex");
      setTimeout(() => {
        setModal("none");
        setAppState({});
        setRouteState({});
        navigate("/fe-diplom/finish");
      }, 1500);
    } catch (e) {
      console.error("Ошибка:", e.message);
      setStatus("error");
      setModal("flex");
    }
  };

  return (
    <div className="confirm-info__wrapper">
      <div className="confirm-info__block confirm-info__train-block">
        <p className="confirm-info__block-title">Поезд</p>
        <ConfirmTrain />
      </div>

      <div className="confirm-info__block confirm-info__passengers-block">
        <p className="confirm-info__block-title">Пассажиры</p>
        <div className="confirm-info__passengers-container">
          <div className="confirm-info__passengers-wrapper">
            {combinedSeats.map((item, index) => (
              <div className="confirm-info__passenger" key={index}>
                <div className="confirm-info__passenger-logo">
                  <SVGicon name={"person-in-circle"} />
                  <p>{item.person_info.is_adult ? "Взрослый" : "Детский"}</p>
                </div>
                <div className="confirm-info__passenger-info">
                  <p>{`${item.person_info.last_name} ${item.person_info.first_name} ${item.person_info.patronymic}`}</p>
                  <p>{item.person_info.gender ? "Пол мужской" : "Пол женский"}</p>
                  <p>{`Дата рождения ${item.person_info.birthday}`}</p>
                  <p>{`${item.person_info.document_type} ${item.person_info.document_data}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="confirm-info__cost-wrapper">
            <div className="confirm-info__total-cost">
              <p>Всего:</p>
              <p>
                <span className="confirm-info__cost">{totalCost}</span>₽
              </p>
            </div>
            <button className="confirm-info__btn" type="button">
              Изменить
            </button>
          </div>
        </div>
      </div>

      <div className="confirm-info__block confirm-info__payment-block">
        <p className="confirm-info__block-title">Способ оплаты</p>
        <div className="confirm-info__payment-wrapper">
          <p className="confirm-info__payment-method">{payState.user.payment_method === "online" ? "Онлайн" : "Наличными"}</p>
          <button className="confirm-info__btn" type="button">
            Изменить
          </button>
        </div>
      </div>

      <div className="confirm-info__ok-btn-wrapper">
        <button className="confirm-info__ok-btn" type="button" onClick={handleSubmit}>
          подтвердить
        </button>
      </div>

      {modalInfo(status)}
    </div>
  );
}

export default ConfirmInfo;