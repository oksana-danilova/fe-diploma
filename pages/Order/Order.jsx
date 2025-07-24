/* eslint-disable-next-line no-unused-vars */
import React from "react";
import OrderLine from "./OrderLine/OrderLine";
import OrderContainer from "./OrderContainer/OrderContainer";
import "./Order.css";

function Order() {
  return (
    <main className="order-page order">
      <OrderLine />
      <OrderContainer />
    </main>
  );
}

export default Order;
