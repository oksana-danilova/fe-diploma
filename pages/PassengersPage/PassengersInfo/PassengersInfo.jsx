/* eslint-disable-next-line no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../context/orderContext';
import PassengersInfoBlock from '../PassengersInfoBlock/PassengersInfoBlock';
import PassengersAddInfoBlock from '../PassengersAddInfoBlock/PassengersAddInfoBlock';
import './PassengersInfo.css';

const calculateTotalPassengers = orderState =>
  Number(orderState.departure_person_count?.adult || 0)
  + Number(orderState.departure_person_count?.child || 0)
  + Number(orderState.arrival_person_count?.adult || 0)
  + Number(orderState.arrival_person_count?.child || 0);

function PassengersInfo() {
  const { orderState } = useContext(OrderContext);

  const initialPassengerCount = calculateTotalPassengers(orderState);

  const [passengerCount, setPassengerCount] = useState(initialPassengerCount);

  const navigate = useNavigate();

  const handleIncrease = () => setPassengerCount(prevCount => prevCount + 1);
  /* eslint-disable-next-line no-unused-vars */
  const handleDecrease = () => passengerCount > 0 && setPassengerCount(prevCount => prevCount - 1);

  const handleNextStep = event => {
    event.preventDefault();
    navigate('/fe-diploma/order/payment');
  };

  return (
    <div className="passengers-info__wrapper">
      <div className="passengers-info__container">
        {[...Array(passengerCount)].map((_, index) => (
          <PassengersInfoBlock number={index + 1} key={`passenger-${index}`} />
        ))}
        
        <PassengersAddInfoBlock onChange={handleIncrease} />
      </div>
    
      <button
        className="passengers-info__btn"
        type="button"
        disabled={!passengerCount}
        onClick={handleNextStep}>
        Далее
      </button>
    </div>
  );
}

export default PassengersInfo;
