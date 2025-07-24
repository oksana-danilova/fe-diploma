/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';
import './SliderPeriod.css';

const SliderPeriod = ({ data, name, onChange }) => {
  const marks = {
    0: '0:00',
    24: '24:00',
  };

  const formatter = (value) => `${value}:00`;

  const handleChange = ([startHour, endHour]) =>
    onChange && onChange({
      [`${name}_hour_from`]: startHour,
      [`${name}_hour_to`]: endHour,
    });

  return (
    <Slider
      range={{ draggableTrack: false }}
      tooltip={{ open: true, formatter }}
      defaultValue={[data.from, data.to]}
      step={1}
      min={0}
      max={24}
      marks={marks}
      onChange={handleChange}
    />
  );
};

export default SliderPeriod;

SliderPeriod.propTypes = {
  data: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
