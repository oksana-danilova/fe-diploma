/* eslint-disable-next-line no-unused-vars */
import React from "react";
import HeaderOrder from "../Header/HeaderOrder/HeaderOrder";
import OrderLine from "../Order/OrderLine/OrderLine";
import OrderFilters from "../Order/OrderFilters/OrderFilters";
import OrderLastTickets from "../Order/OrderLastTickets/OrderLastTickets";
import Seats from "../Seats/Seats";
import Footer from "../Footer/Footer";
import "./SeatsPage.css";

function SeatsPage() {
  return (
    <>
      <HeaderOrder />
      <OrderLine />
      <div className="order-container">
        <div className="container">
          <div className="order-content">
            <div className="order-sidebar">
              <OrderFilters />
              <OrderLastTickets />
            </div>
            <div className="seats seats-wrapper">
              <Seats />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SeatsPage;
