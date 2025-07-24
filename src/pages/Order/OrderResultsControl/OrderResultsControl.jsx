/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppContext from "../context/appContext";
import "./OrderResultsControl.css";

const OrderResultsControl = ({ count }) => {
/* eslint-disable-next-line no-unused-vars */
  const { appState, setAppState } = useContext(AppContext);
  const [option, setOption] = useState({ dataValue: "date", value: "времени" });
  const [view, setView] = useState({ dataValue: "5", value: "5" });

  const handleSortSelect = (value) => {
    setOption({ dataValue: value, value });
    setAppState((prevState) => ({
      ...prevState,
      sort: value,
    }));
  };

  const handleViewChange = (newValue) => {
    setView({ dataValue: newValue, value: newValue });
    setAppState((prevState) => ({
      ...prevState,
      limit: newValue,
    }));
  };

  return (
    <div className="order-results__control result-control">
      <p>найдено: <span className="result-control__find-value">{count}</span></p>
      
      <div className="result-control__sort">
        <p>сортировать по: </p>
        <div className="result-control__select">
          <button
            className="result-control__select-btn"
            type="button"
            data-value={option.dataValue}
            value={option.value}
            aria-expanded="false"
            aria-controls="sort-options"
            onClick={(e) =>
              e.currentTarget.setAttribute(
                'aria-expanded',
                !JSON.parse(e.currentTarget.getAttribute('aria-expanded'))
              )
            }
          >
            {option.value}
          </button>
          <ul id="sort-options" role="listbox" className={`result-control__options ${!JSON.parse(document.querySelector('.result-control__select-btn').getAttribute('aria-expanded')) ? '' : 'result-control__options-visible'}`}>
            <li><button className="result-control__option" type="button" data-value="date" value="времени" onClick={() => handleSortSelect("date")}>По времени</button></li>
            <li><button className="result-control__option" type="button" data-value="price" value="стоимости" onClick={() => handleSortSelect("price")}>По стоимости</button></li>
            <li><button className="result-control__option" type="button" data-value="duration" value="длительности" onClick={() => handleSortSelect("duration")}>По длительности</button></li>
          </ul>
        </div>
      </div>

      <div className="result-control__view">
        <p>показывать по: </p>
        <div className="result-control__view-wrapper">
          {[...Array.from({ length: 3 }).keys()].map((i) => (
            <button
              key={["5", "10", "20"][i]}
              className={`view-button${view.dataValue === ["5", "10", "20"][i] ? '_active' : ''}`}
              type="button"
              data-value={["5", "10", "20"][i]}
              onClick={() => handleViewChange(["5", "10", "20"][i])}
            >{`${["5", "10", "20"][i]} шт.`}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

OrderResultsControl.propTypes = {
  count: PropTypes.number.isRequired,
};

export default OrderResultsControl;