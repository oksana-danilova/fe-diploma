/* eslint-disable-next-line no-unused-vars */
import React, { useState } from "react";
import "./HeaderProgressBar.css";

function HeaderProgressBar() {
  const [count, setCount] = useState(99999);
  const loadTime = performance.getEntriesByType("navigation");
  const animStyle = {
    animationDuration: `${count/10}ms`,
  };

  window.onload = function() {
    setCount(loadTime[0].domComplete);
  }

  return (
    <div className="header-progress">
      <progress 
        style={animStyle}
        className="progress-bar" 
        id="progress" 
        value="0" 
        max="100" 
        aria-label="Загрузка страницы">
      </progress>
    </div>
  );
}

export default HeaderProgressBar;
