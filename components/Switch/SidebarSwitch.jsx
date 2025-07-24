/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

const SidebarSwitch = ({ name, onChange }) => (
  <Switch
    className="switch__btn"
    data-name={name}
    onChange={(value) => onChange && onChange({ [name]: value })}
  />
);

SidebarSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default SidebarSwitch;