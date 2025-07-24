/* eslint-disable-next-line no-unused-vars */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import AppContext from '../context/appContext';
import useGetSeats from '../services/useGetSeats';
import SeatsExchange from '../SeatsExchange/SeatsExchange';
import SeatsTrain from '../SeatsTrain/SeatsTrain';
import SeatsTicketAmount from '../SeatsTicketAmount/SeatsTicketAmount';
import SeatsWagonTypes from '../SeatsWagonTypes/SeatsWagonTypes';
import SeatsWagonHeader from '../SeatsWagonHeader/SeatsWagonHeader';
import SeatsWagonDetails from '../SeatsWagonDetails/SeatsWagonDetails';
import SeatsTotalCost from '../SeatsTotalCost/SeatsTotalCost';
import './SeatsContainer.css';

/* eslint-disable-next-line no-unused-vars */
const useWagonClasses = ({ departureData, arrivalData }) => {
  const [wagonClasses, setWagonClasses] = useState({});

  const handleWagonClass = (identity, newClass) => {
    setWagonClasses((prev) => ({
      ...prev,
      [identity]: newClass,
    }));
  };

  return {
    wagonClasses,
    handleWagonClass,
  };
};

function SeatsContainer() {
  const { appState } = useContext(AppContext);
  const { resultDeparture } = useGetSeats(appState, 'departure');
  const { resultArrival } = useGetSeats(appState, 'arrival');

  const { wagonClasses, handleWagonClass } = useWagonClasses({
    departureData: resultDeparture,
    arrivalData: resultArrival,
  });

  const getSelectedClassForIdentity = (identity) =>
    wagonClasses?.[identity]?.class || '';

  const renderWagonSection = (data, identity) => {
    const selectedClass = getSelectedClassForIdentity(identity);
    return (
      <>
        <SeatsTicketAmount />
        <SeatsWagonTypes
          data={Array.isArray(data.result) ? data.result : Array.from(data.result)}
          identity={identity}
          onChange={(newClass) => handleWagonClass(identity, newClass)}
        />
        {selectedClass ? (
          <>
            <SeatsWagonHeader
              identity={identity}
              wagonClass={selectedClass}
              data={Array.isArray(data.result) ? data.result : Array.from(data.result)}
            />
            <SeatsWagonDetails
              data={Array.isArray(data.result) ? data.result : Array.from(data.result)}
              identity={identity}
            />
            <SeatsTotalCost identity={identity} />
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className="seats-container" id={appState && appState.departure_id ? appState.departure_id : ''}>
        <SeatsExchange data={false} />
        <SeatsTrain data={'departure'} />
        {resultDeparture.result.length > 0 ? (
          renderWagonSection(resultDeparture, 'departure')
        ) : (
          <p className="error-message">Мест по вашему запросу не обнаружено</p>
        )}
      </div>

      {appState && appState.arrival_id && (
        <div className="seats-container" id={appState.arrival_id}>
          <SeatsExchange data={true} />
          <SeatsTrain data={'arrival'} />
          {resultArrival.result.length > 0 ? (
            renderWagonSection(resultArrival, 'arrival')
          ) : (
            <p className="error-message">Мест по вашему запросу не обнаружено</p>
          )}
        </div>
      )}
    </>
  );
}

export default SeatsContainer;