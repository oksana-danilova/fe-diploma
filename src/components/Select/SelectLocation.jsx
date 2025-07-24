/* eslint-disable-next-line no-unused-vars */
import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import useGetCities from "./services/useGetCities";
import "./SelectLocation.css";

function SelectLocation({ name, placeholder, onValue }) {
  const [input, setInput] = useState("");
  const { result } = useGetCities(input);

  const cachedOptions = useMemo(() => {
    return Array.from(result).map((item) => ({
      value: item._id,
      label: item.name.toUpperCase(),
    }));
  }, [result]);

  const handleChange = useCallback(
    (value) => {
      const selectedCity = result.find((city) => city._id === value);
      if (!selectedCity) return;

      const key = placeholder === "Откуда" ? "from_city" : "to_city";
      
      onValue && onValue({
        [`${key}_name`]: selectedCity.name.toUpperCase(),
        [`${key}_id`]: selectedCity._id,
      });
    },
    [result, onValue, placeholder]
  );

  const handleSearch = useCallback((value) => setInput(value), []);

  return (
    <Select
      showSearch
      allowClear={false} 
      className={`fieldset__input ${name}`}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => 
        (option.label || "").toLowerCase().includes(input.toLowerCase())
      }
      onChange={handleChange}
      onSearch={handleSearch}
      options={cachedOptions}
      required
    />
  );
}

export default SelectLocation;

SelectLocation.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onValue: PropTypes.func,
};