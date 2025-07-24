/* eslint-disable-next-line no-unused-vars */
import React from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import HeaderNav from "../HeaderNav/HeaderNav";
import bgImage from "../assets/header-final-image.png";
import "./HeaderFinish.css";

function HeaderFinish() {
  const startBg = {
    backgroundImage: `url(${bgImage})`,
  }

  return (
    <header className="header-finish" style={startBg}>
      <HeaderLogo />
      <HeaderNav />
    </header>
  );
}

export default HeaderFinish;
