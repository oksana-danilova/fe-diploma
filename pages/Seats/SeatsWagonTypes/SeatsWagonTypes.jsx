/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RouteContext from '../context/routeContext';
import SVGicon from '../components/SVGicon/SVGicon';
import './SeatsWagonTypes.css';

const WAGON_CLASSES = [
  { value: 'fourth', label: 'Сидячий' },
  { value: 'third', label: 'Плацкарт' },
  { value: 'second', label: 'Купе' },
  { value: 'first', label: 'Люкс' },
];

function SeatsWagonTypes({ data, identity, onChange }) {
  /* eslint-disable-next-line no-unused-vars */
  const { routeState, setRouteState } = useContext(RouteContext);
  const availableClasses = new Set(data.map((obj) => obj.coach.class_type));

  function handleWagonClassChange(e) {
    e.preventDefault();
    const selectedClass = e.target.id;
    onChange({ [identity + 'Class']: selectedClass });
    setRouteState(prevState => ({
      ...prevState,
      [identity + 'Class']: selectedClass,
      ['targetType' + identity]: data.filter(
        (item) => item.coach.class_type === selectedClass
      ),
    }));
    
    updateWagonsVisibility(selectedClass, identity);
  }

  /**
   * Показываем вагон выбранного типа и скрываем остальные.
   *
   * @param {string} selectedClass — выбранный класс вагона
   * @param {string} identity — направление ("departure" или другое)
   */
  function updateWagonsVisibility(selectedClass, identity) {
    let containers = document.querySelectorAll('.seats__container');
    for (let i = 0; i < containers.length; i++) {
      const isDeparture = identity === 'departure';
      const containerIndex = isDeparture ? 0 : 1;
      
      let wagons = Array.from(containers[containerIndex].querySelectorAll('.seats__wagon-details'));
      wagons.forEach(wagon => {
        const textContent = wagon.firstElementChild.firstElementChild.textContent.trim();
        wagon.style.display = textContent === selectedClass ? 'flex' : 'none';
      });
    }
  }

  return (
    <div className="seats__wagon-types wagon-types" id={`wagon-types-${identity}`}>
      <h3 className="wagon-types__title">Тип вагона</h3>
      <ul className="wagon-types__list">
        {WAGON_CLASSES.map(({ value, label }, index) => (
          <li key={index}>
            <button
              className={`wagon-types__item ${value}`}
              id={value}
              type="button"
              disabled={!availableClasses.has(value)}
              onClick={handleWagonClassChange}
            >
              <span className="wagon-type__icon">
                <SVGicon name={`have_${value}_class`} />
              </span>
              <span className="wagon-type__text">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeatsWagonTypes;

SeatsWagonTypes.propTypes = {
  data: PropTypes.array.isRequired,
  identity: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
