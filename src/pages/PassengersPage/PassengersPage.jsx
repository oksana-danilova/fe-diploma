/* eslint-disable-next-line no-unused-vars */
import React from "react";
import HeaderOrder from "../Header/HeaderOrder/HeaderOrder";
import OrderLine from "../Order/OrderLine/OrderLine";
import OrderDetails from "../Order/OrderDetails/OrderDetails";
import PassengersInfo from "./PassengersInfo/PassengersInfo";
import Footer from "../Footer/Footer";

function PassengersPage() {
  return (
    <>
      <HeaderOrder />
      <OrderLine />
      <div className="order-container">
        <div className="container">
          <div className="order-content">
            <div className="order-sidebar">
              <OrderDetails />
            </div>
            <PassengersInfo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PassengersPage;
