/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RouteContext from '../context/routeContext';
import SeatsWagonDetailsBody from './SeatsWagonDetailsBody/SeatsWagonDetailsBody';
import SeatsScheme from '../SeatsScheme/SeatsScheme';
import './SeatsWagonDetails.css';

const WagonDetails = ({ data, identity, routeState }) => {
  const wagonType = identity === 'departure' ? routeState.departureClass : routeState.arrivalClass;

  return data.map((item, index) => (
    <div
      className='seats__wagon-details wagon-details'
      id={`wagon-details-${identity}-${index}`}
      key={`${identity}_${index}`}
    >
      <SeatsWagonDetailsBody data={item} wagonType={wagonType} />
      
      <SeatsScheme data={item} />
    </div>
  ));
};

const SeatsWagonDetails = ({ data, identity }) => {
  const { routeState } = useContext(RouteContext);

  return <WagonDetails data={data} identity={identity} routeState={routeState} />;
};

export default SeatsWagonDetails;

SeatsWagonDetails.propTypes = {
  data: PropTypes.array.isRequired,
  identity: PropTypes.oneOf(['departure', 'arrival']).isRequired,
};