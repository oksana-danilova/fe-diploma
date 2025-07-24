/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/appContext";
import OrderFilters from "../OrderFilters/OrderFilters";
import OrderLastTickets from "../OrderLastTickets/OrderLastTickets";
import OrderResultsControl from "../OrderResultsControl/OrderResultsControl";
import OrderPagination from "../OrderPagination/OrderPagination";
import useGetRoutes from "../services/useGetRoutes";
import Modal from "../components/Modal/Modal";
import Load from "../components/Load/Load";
import "./OrderContainer.css";

function OrderContainer() {
  const {appState, setAppState} = useContext(AppContext);
  const {result, isLoading} = useGetRoutes(appState);
  const [modal, setModal] = useState("none");
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);
  const [loadApp, setLoadApp] = useState(false);
  const [newOffset, setNewOffset] = useState(null);

  const handleSort = (value) => {
    if (value === "price") {
      setModal("flex");
      setLoader(true);
    }
  };

  const handleModal = (value) => {
    if (value === "none") {
      setLoader(false);
    }
    setModal(value);
  };

  const handlePage = (value) => {
    setNewOffset(value);
    setLoader(true);
    setLoadApp(true);
  };
  
  useEffect(() => {
    if (!loadApp) return;
    setAppState({
      ...appState, 
      offset: newOffset, 
    });
    setLoadApp(false);
    setLoader(false);
  },[appState, loadApp, newOffset, setAppState, setLoader]);

  return (
    <div className="order-container">
      <div className="container">
        <div className="order-content">
          <div className="order-sidebar">
            <OrderFilters/>
            <OrderLastTickets />
          </div>
            <div className="order-results">
            {isLoading ? 
              <Load /> : 
              <>
                <OrderResultsControl count={result && result.items ? result.total_count : 0} onChange={handleSort}/>
                <div className="order-results__wrapper">
                  <OrderPagination routes={result && result.items ? result : result} onChange={handlePage}/>
                </div>
              </>
            }
            </div>
        </div>
      </div>
      <Modal status={"error"} display={modal} text={result && result.error ? result.error : ""} onChange={handleModal}/>
    </div>
  );
}

export default OrderContainer;
