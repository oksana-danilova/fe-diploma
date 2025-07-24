/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../context/orderContext';
import './SeatsTotalCost.css';

const calculateTotalCost = ({ seats, services }) =>
  (seats?.reduce((sum, seat) => sum + parseFloat(seat.seat_cost || 0), 0) || 0)
  + Object.values(services).reduce((sum, value) => sum + parseFloat(value || 0), 0);

const checkSeatLimit = (seatArray, maxSeats) => ({
  isExceeded: seatArray.length > maxSeats,
  isReached: seatArray.length === maxSeats,
});

function SeatsTotalCost({ identity }) {
  const { orderState } = useContext(OrderContext);

  const directionData =
    identity === 'departure'
      ? { seats: orderState.departure.seats, personCount: orderState.departure_person_count, services: orderState.departure_service }
      : { seats: orderState.arrival.seats, personCount: orderState.arrival_person_count, services: orderState.arrival_service };

  const selectedSeats = directionData.seats || [];
  const passengerCount = (directionData.personCount.adult || 0) + (directionData.personCount.child || 0);

  const totalCost = calculateTotalCost(directionData);
  const limitCheck = checkSeatLimit(selectedSeats, passengerCount);

  return (
    <>
      {limitCheck.isReached && <p className="info-message">Лимит билетов достигнут</p>}
      {limitCheck.isExceeded && <p className="error-message">Лимит билетов превышен</p>}
      
      <div className="total-seats">
        <span className="total-seats__count">{totalCost.toFixed(2)}</span>
        <span>₽</span>
      </div>
    </>
  );
}

export default SeatsTotalCost;

SeatsTotalCost.propTypes = {
  identity: PropTypes.oneOf(['departure', 'arrival']).isRequired,
};
