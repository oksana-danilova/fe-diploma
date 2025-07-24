/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const SeatButton = ({ index, available, onSelect }) => {
  return (
    <button
      className={`seat ${available ? '' : 'disabled'}`}
      type="button"
      disabled={!available}
      onClick={() => onSelect(index)}
    >
      {index}
    </button>
  );
};

SeatButton.propTypes = {
  index: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const RowOfSeats = ({ startIndex, count, getStatus, onSelect }) => {
  return Array.from({ length: count }).map((_, idx) => (
    <SeatButton
      key={startIndex + idx}
      index={startIndex + idx}
      available={getStatus(startIndex + idx)}
      onSelect={onSelect}
    />
  ));
};

RowOfSeats.propTypes = {
  startIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  getStatus: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function SeatsSchemeSecondClass({ seats, onChange }) {
  const getStatus = (i) => {
    const foundSeat = seats.find((seat) => seat.index === i);
    return foundSeat && foundSeat.available;
  };

  const handleSeatSelection = (seatNumber) => {
    const targetContainer = event.currentTarget.closest(".seats__container");
    const isDeparture = targetContainer.dataset.name === "departure";

    const passengerInput = document.querySelector("input[name='adult']");
    if (+passengerInput.value <= 0) {
      passengerInput.parentNode.style.outline = "10px solid #ff3d0061";
      setTimeout(() => (passengerInput.parentNode.style.outline = ""), 1000);
      return;
    }

    const wagonDetailsEl = targetContainer.querySelector(".wagon-number").textContent.trim();
    const coachId = targetContainer.querySelectorAll(".wagon-details__item")
      .find((el) => el.textContent.includes(wagonDetailsEl))
      ?.id;

    const buttonEl = event.currentTarget;
    buttonEl.classList.toggle("selected");

    onChange({
      way: isDeparture ? "departure" : "arrival",
      type: "second",
      coach_id: coachId || "",
      seatIndex: seatNumber,
      seatSide: "",
      selected: buttonEl.classList.contains("selected"),
    });
  };

  return (
    <div className="seats-second-class">
      <ul className="left-side-seats">{[...Array(8)].map((_, i) => <div key={i} />)}</ul>
      <ul className="right-side-seats">
        {[...Array(8)].map((_, rowIdx) => (
          <>
            <RowOfSeats
              key={`${rowIdx}-upper`}
              startIndex={rowIdx * 4 + 1}
              count={2}
              getStatus={getStatus}
              onSelect={handleSeatSelection}
            />
            <RowOfSeats
              key={`${rowIdx}-lower`}
              startIndex={rowIdx * 4 + 3}
              count={2}
              getStatus={getStatus}
              onSelect={handleSeatSelection}
            />
          </>
        ))}
      </ul>
    </div>
  );
}

export default SeatsSchemeSecondClass;

SeatsSchemeSecondClass.propTypes = {
  seats: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};