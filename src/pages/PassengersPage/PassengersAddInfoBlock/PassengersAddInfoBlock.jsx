import PropTypes from "prop-types";
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

export default PassengersAddInfoBlock;