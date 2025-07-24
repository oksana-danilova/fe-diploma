/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { HashLink } from "react-router-hash-link";
import "./HeaderNav.css";

function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="container">
        <nav className="header-nav__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <HashLink to="/fe-diplom/#about" className="nav__link">О нас</HashLink>
            </li>
            <li className="nav__item">
              <HashLink to="/fe-diplom/#work" className="nav__link">Как это работает</HashLink>
            </li>
            <li className="nav__item">
              <HashLink to="/fe-diplom/#feedback" className="nav__link">Отзывы</HashLink>
            </li>
            <li className="nav__item">
              <HashLink to="/fe-diplom/#contacts" className="nav__link">Контакты</HashLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HeaderNav;
