/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import AppContext from ".//context/appContext";
import { switchFilters } from "../utils/switchFilters";
import SVGicon from "../components/SVGicon/SVGicon";
import Calendar from "../components/Calendar/Calendar";
import SidebarSwitch from "../components/Switch/SidebarSwitch";
import SliderPrice from "../components/SliderPrice/SliderPrice";
import SliderPeriod from "../components/SliderPeriod/SliderPeriod";
import ArrivalImage from "../assets/slider-filter-period-arrival.png";
import DepartureImage from "../assets/slider-filter-period-departure.png";
import "./OrderFilters.css";

function OrderFilters() {
  const { appState, setAppState } = useContext(AppContext);
  const [filters, setFilters] = useState(appState);

  useEffect(() => {
    setAppState(filters);
  }, [filters, setAppState]);

  const changeDate = value => {
    setFilters(prev => ({...prev, ...value}));
  };

  const handleClickSwitch = value => {
    setFilters(prev => ({...prev, ...value}));
  };

  const handlePrice = value => {
    setFilters(prev => ({...prev, ...value}));
  };

  const handleTimePeriod = value => {
    setFilters(prev => ({...prev, ...value}));
  };

  return (
    <div className="order-filters filter">
      <div className="filter__date">
        <fieldset className="filter__fieldset">
          <legend className="fieldset__legend">Дата поездки</legend>
          <Calendar name="fieldset__input-thither" placeholder={appState.date_start || "ДД/ММ/ГГ"} onChange={changeDate} />
        </fieldset>
        <fieldset className="filter__fieldset">
          <legend className="fieldset__legend">Дата возвращения</legend>
          <Calendar name="fieldset__input-back" placeholder={appState.date_end || "ДД/ММ/ГГ"} onChange={changeDate} />
        </fieldset>
      </div>

      <div className="filter__switch switch">
        {switchFilters.map(item => (
          <div className="switch__component" key={item.name}>
            <div className="switch__image">
              <SVGicon name={item.name} />
            </div>
            <span className="switch__title">{item.alt}</span>
            <SidebarSwitch name={item.name} onChange={handleClickSwitch} />
          </div>
        ))}
      </div>

      <div className="filter__price price">
        <p className="price__title">Стоимость</p>
        <div className="price__under-range"><p>от</p><p>до</p></div>
        <SliderPrice onChange={handlePrice} />
      </div>

      <div className="filter__period period-departure">
        <div className="filter__period-control">
          <img className="filter__period-img" src={DepartureImage} alt="DepartureImage" />
          <p className="filter__period-title">Туда</p>
          <div className="filter__period-content">
            <p className="filter__period-subtitle departure-subtitle-left">Время отправления</p>
            <SliderPeriod data={{ from: 0, to: 24 }} name="start_departure" onChange={handleTimePeriod} />
            <p className="filter__period-subtitle departure-subtitle-right">Время прибытия</p>
            <SliderPeriod data={{ from: 0, to: 24 }} name="start_arrival" onChange={handleTimePeriod} />
          </div>
        </div>
      </div>

      <div className="filter__period period-arrival">
        <div className="filter__period-control">
          <img className="filter__period-img" src={ArrivalImage} alt="ArrivalImage" />
          <p className="filter__period-title">Обратно</p>
          <div className="filter__period-content">
            <p className="filter__period-subtitle arrival-subtitle-left">Время отправления</p>
            <SliderPeriod data={{ from: 0, to: 24 }} name="end_departure" onChange={handleTimePeriod} />
            <p className="filter__period-subtitle arrival-subtitle-right">Время прибытия</p>
            <SliderPeriod data={{ from: 0, to: 24 }} name="end_arrival" onChange={handleTimePeriod} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFilters;