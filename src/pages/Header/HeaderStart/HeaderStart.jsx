/* eslint-disable-next-line no-unused-vars */
import React from "react";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderWidget from "./HeaderWidget/HeaderWidget";
import HeaderProgressBar from "./HeaderProgressBar/HeaderProgressBar";
import bgImage from "./assets/header-base-image.png";
import "./HeaderStart.css";

function HeaderStart() {
  const startBg = {
    backgroundImage: `url(${bgImage})`,
  }

  return (
    <header className="header" style={startBg}>
      <HeaderLogo />
      <HeaderNav />
      <div className="header-widget container">
        <HeaderTitle />
        <HeaderWidget />
      </div>
      <HeaderProgressBar />
    </header>
  );
}

export default HeaderStart;
