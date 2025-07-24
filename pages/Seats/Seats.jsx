/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import OrderContext from '../context/orderContext';
import useGetSeats from '../services/useGetSeats';
import { useNavigate } from 'react-router-dom';
import SeatsContainer from '../Seats/SeatsContainer/SeatsContainer';
import Modal from '../components/Modal/Modal';
import './Seats.css';

const Seats = () => {
  const { appState } = useContext(AppContext);
  const { orderState } = useContext(OrderContext);
  const { resultDeparture } = useGetSeats(appState, 'departure');
  const { resultArrival } = useGetSeats(appState, 'arrival');
  const [modal, setModal] = useState('none');
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate('/fe-diploma/order/passengers');
  };

  const isButtonDisabled = () => {
    const hasDepartureSeats = Boolean(orderState.departure?.seats?.length);
    const hasArrivalSeats = Boolean(orderState.arrival?.seats?.length);
    
    return !hasDepartureSeats || !hasArrivalSeats;
  };

  useEffect(() => {
    if (!resultDeparture.isLoading && !resultArrival.isLoading) {
      if ((!appState.departure_id || !resultDeparture.result.length)) {
        setModal('flex');
      } else {
        setModal('none');
      }
    }
  }, [
    appState.departure_id,
    resultDeparture.isLoading,
    resultDeparture.result,
    resultArrival.isLoading,
  ]);

  return (
    <>
      <h2 className="seats-title">Выбор мест</h2>
      <SeatsContainer />
      <button
        className="seats-button"
        type="button"
        onClick={handleClick}
        disabled={isButtonDisabled()}
      >
        далее
      </button>
      <Modal
        status={'error'}
        display={modal}
        text={resultArrival?.result?.error ?? ''}
        onChange={(newValue) => setModal(newValue)}
      />
    </>
  );
};

export default Seats;