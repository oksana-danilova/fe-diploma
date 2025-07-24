/* eslint-disable-next-line no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/appContext";
import SelectLocation from "../components/Select/SelectLocation";
import Calendar from "../components/Calendar/Calendar";
import Modal from "../components/Modal/Modal";
import "./HeaderWidget.css";

function HeaderWidget() {
  const { appState, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState({});
  const [newDate, setNewDate] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    if (!selectValue.from_city_name || !selectValue.to_city_name) {
      setModalOpen(true);
    } else {
      navigate("/fe-diploma/order");
    }
  };

  const handleSelectValue = (value) => {
    setSelectValue((prev) => ({...prev, ...value}));
  };

  const handleDateChange = (value) => {
    setNewDate((prev) => ({...prev, ...value}));
  };

  const swapCities = () => {
    if (selectValue.from_city_name && selectValue.to_city_name) {
      handleSelectValue({
        from_city_name: selectValue.to_city_name,
        from_city_id: selectValue.to_city_id,
        to_city_name: selectValue.from_city_name,
        to_city_id: selectValue.from_city_id,
      });
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (Object.keys(selectValue).length > 0 || Object.keys(newDate).length > 0) {
      setAppState(prevState => ({
        ...prevState,
        ...selectValue,
        ...newDate,
      }));
    }
  }, [selectValue, newDate, setAppState]);

  return (
    <div className="search-widget">
      <form className="search-widget__form form">
        <fieldset className="form__fieldset fieldset fieldset-direction">
          <legend className="fieldset__legend">Направление</legend>
          <div className="fieldset__input-wrapper">
            <SelectLocation
              name="fieldset__input-from"
              placeholder={appState.from_city_name || "Откуда"}
              onValue={handleSelectValue}
            />
          </div>
          <div className="fieldset__btn">
            <button className="fieldset-direction__btn" type="button" onClick={swapCities}>
              ⇄
            </button>
          </div>
          <div className="fieldset__input-wrapper">
            <SelectLocation
              name="fieldset__input-to"
              placeholder={appState.to_city_name || "Куда"}
              onValue={handleSelectValue}
            />
          </div>
        </fieldset>
        
        <fieldset className="form__fieldset fieldset fieldset-date">
          <legend className="fieldset__legend">Дата</legend>
          <div className="fieldset__input-wrapper">
            <Calendar
              name="fieldset__input-thither"
              placeholder={appState.date_start || "ДД/ММ/ГГ"}
              onChange={handleDateChange}
            />
          </div>
          <div className="fieldset__input-wrapper">
            <Calendar
              name="fieldset__input-back"
              placeholder={appState.date_end || "ДД/ММ/ГГ"}
              onChange={handleDateChange}
            />
          </div>
        </fieldset>

        <div className="form__btn">
          <button className="form__btn-send" type="button" onClick={handleSubmit}>
            Найти билеты
          </button>
        </div>
      </form>
      
      {
      modalOpen && (
        <Modal
          status="info"
          display="block"
          text="Заполните поля 'Откуда' и 'Куда'"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HeaderWidget;
