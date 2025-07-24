/* eslint-disable-next-line no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

function SeatsSchemeFirstClass({ seats, onChange }) {
  const getStatus = (i) => {
    const foundSeat = seats.find(item => item.index === i);
    return foundSeat ? foundSeat.available : false;
  };

  const handleSeat = (e) => {
    e.preventDefault();

    const item = e.target.closest('.scheme__seats-item');
    const container = e.target.closest('.seats__container');
    const way = container.dataset.name;
    const wagonNumberEl = e.target.closest('.seats__wagon-details')?.querySelector('.wagon-number');
    const wagonNumberText = wagonNumberEl && wagonNumberEl.textContent.trim();

    const adultInput = document.querySelector(`input[name="adult"]`);
    const inputValue = adultInput.value;

    if (!inputValue || +inputValue === 0) {
      const inputLabel = adultInput.parentElement;
      inputLabel.style.outline = '10px solid #ff3d0061';
      setTimeout(() => inputLabel.style.outline = 'none', 1000);
      return;
    }

    item.classList.toggle('selected');

    const coachDetailsItems = document.querySelectorAll('.wagon-details__item');
    const coachIdItem = Array.from(coachDetailsItems).find(item => item.textContent.includes(wagonNumberText));
    const coachId = coachIdItem?.id || null;

    onChange({
      way,
      type: 'first',
      coach_id: coachId,
      seatIndex: item.textContent,
      seatSide: '',
      selected: item.classList.contains('selected'),
    });
  };

  return (
    <div className="scheme__seats-container scheme__seats-first-class">
      <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-right-side">
        {[...Array(8)].map((_, i) => {
          const indexLeft = i * 2 + 1;
          const indexRight = i * 2 + 2;
          const availableLeft = getStatus(indexLeft);
          const availableRight = getStatus(indexRight);

          return (
            <>
              <div className="scheme__seats-row scheme__seats-row_first-class">
                <div className="scheme__seats-item-container">
                  <button 
                    className={`scheme__seats-item scheme__seats-item_first-class ${availableLeft ? '' : 'disabled'}`}
                    type="button"
                    disabled={!availableLeft}
                    onClick={handleSeat}
                  >{indexLeft}</button>
                </div>
              </div>
              
              <div className="scheme__seats-row scheme__seats-row_first-class">
                <div className="scheme__seats-item-container">
                  <button 
                    className={`scheme__seats-item scheme__seats-item_first-class ${availableRight ? '' : 'disabled'}`}
                    type="button"
                    disabled={!availableRight}
                    onClick={handleSeat}
                  >{indexRight}</button>
                </div>
              </div>
            </>
          );
        })}
      </ul>
      
      <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-left-side">
        {[...Array(8)].map((_, i) => (<div className="scheme__seats-row_left-train-side scheme__seats-row_empty" key={i}></div>))}
      </ul>
    </div>
  );
}

export default SeatsSchemeFirstClass;

SeatsSchemeFirstClass.propTypes = {
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
};
