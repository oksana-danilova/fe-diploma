/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const SeatButton = ({ number, available, onSelect }) => {
  const handleClick = () => {
    onSelect(number);
  };

  return (
    <button
      className={`scheme__seats-item ${available ? '' : 'disabled'}`}
      type="button"
      disabled={!available}
      onClick={handleClick}
    >
      {number}
    </button>
  );
};

SeatButton.propTypes = {
  number: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function SeatsSchemeFourthClass({ seats, onChange }) {
  const getStatus = index => {
    const foundSeat = seats.find(seat => seat.index === index);
    return foundSeat?.available ?? false;
  };

  const handleSeatSelection = (seatNumber) => {
    const isSelected = document.getElementsByClassName(`seat-${seatNumber}`).length > 0;
    
    const wagonDetailsContainer = event.currentTarget.closest('.seats__wagon-details');
    const coachId = wagonDetailsContainer.id;
    const direction = event.currentTarget.closest('.seats__container').dataset.name;

    onChange({
      way: direction,
      type: 'fourth',
      coach_id: coachId,
      seatIndex: seatNumber,
      seatSide: '',
      selected: !isSelected,
    });
  };

  return (
    <div className="scheme__seats-container scheme__seats-fourth-class">
      <ul className="scheme__seats-fourth-class_right-side">
        {[...Array(16)].map((_, rowIndex) => (
          <li className="scheme__seats-row" key={rowIndex}>
            <SeatButton number={rowIndex * 2 + 1} available={getStatus(rowIndex * 2 + 1)} onSelect={handleSeatSelection}/>
            <SeatButton number={rowIndex * 2 + 2} available={getStatus(rowIndex * 2 + 2)} onSelect={handleSeatSelection}/>
          </li>
        ))}
      </ul>
      
      <ul className="scheme__seats-fourth-class_left-side">
        {[...Array(16)].map((_, rowIndex) => (
          <li className="scheme__seats-row" key={rowIndex}>
            <SeatButton number={rowIndex * 2 + 33} available={getStatus(rowIndex * 2 + 33)} onSelect={handleSeatSelection}/>
            <SeatButton number={rowIndex * 2 + 34} available={getStatus(rowIndex * 2 + 34)} onSelect={handleSeatSelection}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

SeatsSchemeFourthClass.propTypes = {
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
};

export default SeatsSchemeFourthClass;
