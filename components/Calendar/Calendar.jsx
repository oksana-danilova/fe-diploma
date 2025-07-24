/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './Calendar.css';

function Calendar({ name, placeholder, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;
    
    const picker = new AirDatepicker(inputRef.current, {
      dateFormat(date) {
        const newDate = date.toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }).replace(/(\d+)\D+(\d+)\D+(\d+)/, '$3-$2-$1');
        
        return newDate;
      },
      navTitles: {
        days: 'MMMM',
      },
      onSelect({ date }) {
        const formattedDate = date.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })
                                  .replace(/(\d+)\D+(\d+)\D+(\d+)/, '$3-$2-$1');
                                  
        onChange(formattedDate);
      },
    });

    return () => picker.destroy();
  }, [name, onChange]);

  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      className={`fieldset__input ${name}`}
      required
    />
  );
}

export default Calendar;

Calendar.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};