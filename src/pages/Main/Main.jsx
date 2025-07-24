/* eslint-disable-next-line no-unused-vars */
import React from "react";
import MainAbout from "./MainAbout/MainAbout";
import MainWork from "./MainWork/MainWork";
import MainFeedback from "./MainFeedback/MainFeedback";
import "./Main.css";

function Main() {
  return (
    <main className="main">
      <MainAbout />
      <MainWork />
      <MainFeedback />
    </main>
  );
}

export default Main;
