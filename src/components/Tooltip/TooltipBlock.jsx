/* eslint-disable-next-line no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function TooltipBlock({ id }) {
  const style = {
    display: "block",
    padding: "5px 10px",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#ebebeb",
    boxShadow: "0px 4px 4px #00000040",
  }

  return (
    <Tooltip
      id={id}
      border="1px solid #ebebeb"
      style={style}
    />
  );
}

export default TooltipBlock;

TooltipBlock.propTypes = {
  id: PropTypes.string.isRequired, 
};
