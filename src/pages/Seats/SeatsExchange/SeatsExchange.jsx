/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ArrivalImage from '../assets/slider-filter-period-arrival.png';
import DepartureImage from '../assets/slider-filter-period-departure.png';
import './SeatsExchange.css';

const SeatsExchange = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/fe-diploma/order');
  };

  return (
    <div className={`seats__exchange ${!data && 'justify-flex-start'}`}>
      <img className="seats__exchange-img" src={data ? ArrivalImage : DepartureImage} alt={`${data ? 'Arrival' : 'Departure'} Image`}/>
      <button className="seats__exchange-button" type="button" onClick={handleClick}>
        Выбрать другой поезд
      </button>
    </div>
  );
};

export default SeatsExchange;

SeatsExchange.propTypes = {
  data: PropTypes.bool.isRequired,
};