/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RouteContext from '../context/routeContext';
import SVGicon from '../components/SVGicon/SVGicon';
import './SeatsTrain.css';

const extractRouteInfo = (state, type) => ({
  trainNumber: state[`${type}_train_name`],
  cityFrom: state[`${type}_from_city_name`],
  cityTo: state[`${type}_to_city_name`],
  datetimeFrom: state[`${type}_from_datetime`],
  railwayStationFrom: state[`${type}_from_railway_station_name`],
  datetimeTo: state[`${type}_to_datetime`],
  railwayStationTo: state[`${type}_to_railway_station_name`],
  durationHours: state[`${type}_duration`].slice(-4, -3),
  durationMinutes: state[`${type}_duration`].slice(-2, -1),
});

function SeatsTrain({ data }) {
  const { routeState } = useContext(RouteContext);
  const info = extractRouteInfo(routeState, data);

  return (
    <div className="flex-center seats__about-train">
      <div className="flex-center seats__about-block">
        <div className="icon">
          <SVGicon name={data === 'departure' ? 'train' : 'plane'} />
        </div>
        <div className="train-info">
          <p className="number">{info.trainNumber}</p>
          <p className="city">{info.cityFrom}</p>
          <p className="city">{info.cityTo}</p>
        </div>
      </div>
      
      <div className="direction-container">
        <div>
          <time dateTime={info.datetimeFrom}>{info.datetimeFrom}</time>
          <p>{info.railwayStationFrom}</p>
        </div>
        
        <div className="train__time-arrow arrow-right"></div>
        
        <div>
          <time dateTime={info.datetimeTo}>{info.datetimeTo}</time>
          <p>{info.railwayStationTo}</p>
        </div>
      </div>
    
      <div className="duration-container">
        <div className="clock-icon">
          <SVGicon name={'clock'} />
        </div>
        <p>
          <span className="seats__about-clock-hour">{info.durationHours}</span> часа(ов)<br />
          <span className="seats__about-clock-minute">{info.durationMinutes}</span> минут(ы)
        </p>
      </div>
    </div>
  );
}

export default SeatsTrain;

SeatsTrain.propTypes = {
  data: PropTypes.oneOf(['departure', 'arrival']).isRequired,
};