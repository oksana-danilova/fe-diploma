import React from 'react';
import PropTypes from 'prop-types';

const SeatButton = ({ number, available, onSelect }) => {
  return (
    <button
      className={`scheme__seats-item scheme__seats-item_third-class ${available ? '' : 'disabled'}`}
      type="button"
      disabled={!available}
      onClick={() => onSelect(number)}
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

function SeatsSchemeThirdClass({ seats, onChange }) {
  const seatsMap = new Map(seats.map(({ index, available }) => [index, available]));

  const selectSeat = (seatNumber) => {
    const container = document.querySelector('.seats__container');
    const isDeparture = container.dataset.name === 'departure';
    const passengerInput = isDeparture ? container.parentNode.querySelector('input[name="adult"]') : null;
    
    if (passengerInput && (+passengerInput.value <= 0)) {
      passengerInput.parentElement.style.outline = '10px solid #ff3d0061';
      setTimeout(() => passengerInput.parentElement.style.outline = '', 1000);
      return;
    }

    const buttonEl = document.querySelector(`.scheme__seats-item[data-seat="${seatNumber}"]`);
    buttonEl.classList.toggle('selected');

    const wagonDetails = container.querySelector('.wagon-number').textContent;
    const coachId = Array.from(container.querySelectorAll('.wagon-details__item')).find(el => el.textContent.includes(wagonDetails)).id;

    onChange({
      way: container.dataset.name,
      type: "third",
      coach_id: coachId,
      seatIndex: seatNumber,
      seatSide: "",
      selected: buttonEl.classList.contains('selected'),
    });
  };

  return (
    <div className="scheme__seats-container scheme__seats-third-class">
      <ul className="scheme__seats-list scheme__seats-third-class scheme__seats-right-side">
        {[...Array(8)].map((_, row) =>
          <React.Fragment key={row}>
            <div className="scheme__seats-row scheme__seats-row_third-class">
              <SeatButton number={row * 4 + 1} available={seatsMap.get(row * 4 + 1)} onSelect={selectSeat}/>
              <SeatButton number={row * 4 + 2} available={seatsMap.get(row * 4 + 2)} onSelect={selectSeat}/>
            </div>
            <div className="scheme__seats-row scheme__seats-row_third-class">
              <SeatButton number={row * 4 + 3} available={seatsMap.get(row * 4 + 3)} onSelect={selectSeat}/>
              <SeatButton number={row * 4 + 4} available={seatsMap.get(row * 4 + 4)} onSelect={selectSeat}/>
            </div>
          </React.Fragment>
        )}
      </ul>
      
      <ul className="scheme__seats-list scheme__seats-third-class scheme__seats-left-side">
        {[...Array(8)].map((_, row) =>
          <li className="scheme__seats-row_left-train-side" key={row}>
            <SeatButton number={row * 2 + 33} available={seatsMap.get(row * 2 + 33)} onSelect={selectSeat}/>
            <SeatButton number={row * 2 + 34} available={seatsMap.get(row * 2 + 34)} onSelect={selectSeat}/>
          </li>
        )}
      </ul>
    </div>
  );
}

SeatsSchemeThirdClass.propTypes = {
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SeatsSchemeThirdClass;