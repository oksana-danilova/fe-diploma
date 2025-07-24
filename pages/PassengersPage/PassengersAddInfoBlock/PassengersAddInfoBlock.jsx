/* eslint-disable-next-line no-unused-vars */
import PropTypes from "prop-types";
/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import './PassengersAddInfoBlock.css';

const PassengersAddInfoBlock = ({ onChange }) => {
  const handleAddBlock = () => {
    onChange(true);
  };

  return (
    <div className="passengers-add-info__wrapper">
      <div className="passengers-add-info__block">
        <p>Добавить пассажира</p>
        <button
          className="passengers-add-info__btn"
          type="button"
          onClick={handleAddBlock}
        />
      </div>
    </div>
  );
};

PassengersAddInfoBlock.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default PassengersAddInfoBlock;