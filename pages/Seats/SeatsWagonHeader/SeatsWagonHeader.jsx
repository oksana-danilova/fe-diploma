/* eslint-disable-next-line no-unused-vars */
import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import RouteContext from '../context/routeContext';
import './SeatsWagonHeader.css';

const SeatsWagonHeader = ({ data, identity, wagonClass }) => {
/* eslint-disable-next-line no-unused-vars */
  const { routeState, setRouteState } = useContext(RouteContext);

  const buttonsList = useMemo(() => {
    return data.filter((item) =>
      identity === 'departure' ? item.coach.class_type === wagonClass.depClass :
      identity === 'arrival' ? item.coach.class_type === wagonClass.arrClass : false
    ).map((item) => ({
      name: item.coach.name,
      id: item.coach._id,
    }));
  }, [data, identity, wagonClass]);

  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.id;
    
    document.querySelectorAll('.seats__wagon-details').forEach((wagon) => {
      const isTargetedWagon = wagon.children[0].children[0].textContent === targetId;
      wagon.style.display = isTargetedWagon ? 'flex' : 'none';
    });

    setRouteState(prevState => ({
      ...prevState,
      [identity + 'Id']: targetId,
    }));

    const activeButton = document.getElementById(targetId);
    Array.from(activeButton.parentNode.children)
      .filter(button => button !== activeButton)
      .forEach(button => button.style.color = '#000');
    activeButton.style.color = '#fff';
  };

  return (
    <div className='seats__wagon-details-header' id={`wagon-names-${identity}`}>
      <p>Вагоны</p>
      <div className='wagon-details__list'>
        {buttonsList.length > 0 &&
          buttonsList.map(({ name, id }) => (
            <button
              key={id}
              className='wagon-details__item'
              type='button'
              id={id}
              onClick={handleClick}
            >
              {name}
            </button>
          ))}
      </div>
      <p>Нумерация вагонов начинается с головы поезда</p>
    </div>
  );
};

export default SeatsWagonHeader;

SeatsWagonHeader.propTypes = {
  data: PropTypes.array.isRequired,
  identity: PropTypes.string.isRequired,
  wagonClass: PropTypes.object.isRequired,
};
