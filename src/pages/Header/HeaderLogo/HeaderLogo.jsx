import React from "react";
import { Link } from "react-router-dom";
import "./HeaderLogo.css";

function HeaderLogo() {
  return (
    <div className="header-logo">
      <div className="container">
        <Link to="/fe-diplom/" className="header-logo__link">Лого</Link>
      </div>
    </div>
  );
}

export default HeaderLogo;
