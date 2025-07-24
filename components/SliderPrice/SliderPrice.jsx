/* eslint-disable-next-line no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";
import "./SliderPrice.css";

function SliderPrice({ onChange }) {
  const marks = {
    0: '0',
    9999: '9999'
  };

  const onChangeComplete = ([from, to]) => {
    onChange({ price_from: from, price_to: to });
  };

  return (
    <Slider
      range
      defaultValue={[0, 9999]}
      step={10}
      min={0}
      max={9999}
      marks={marks}
      onChange={onChangeComplete}
    />
  );
}

export default SliderPrice;

SliderPrice.propTypes = {
  onChange: PropTypes.func.isRequired
};