/* eslint-disable-next-line no-unused-vars */
import React from "react";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderWidget from "./HeaderWidget/HeaderWidget";
import bgImage from "../assets/header-order-image.png";
import "./HeaderOrder.css";

function HeaderOrder() {
  const startBg = {
    backgroundImage: `url(${bgImage})`,
  }

  return (
    <header className="header-order" style={startBg}>
      <HeaderLogo />
      <HeaderNav />
      <HeaderWidget />
    </header>
  );
}

export default HeaderOrder;
