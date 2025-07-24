import React, { useContext } from "react";
import PropTypes from "prop-types";
import OrderContext from "../context/orderContext";
import SVGicon from "../components/SVGicon/SVGicon";
import TooltipBlock from "../components/Tooltip/TooltipBlock";

const handleChooseService = ({ target }, orderState, setOrderState, wagonType) => {
  const serviceItem = target.closest(".wagon-details__service-item");
  if (!serviceItem || !target.dataset.cost) return;

  const isDeparture = target.closest(".seats__container")?.dataset?.name === "departure";
  const newCost = parseInt(target.dataset.cost);

  const updateField = isDeparture ? 'departure_service' : 'arrival_service';
  const currentValue = orderState[updateField][wagonType] ?? 0;

  const updatedValue = serviceItem.classList.contains('wagon-details__service-icon-active')
    ? currentValue + newCost
    : currentValue - newCost;

  setOrderState(prevState => ({
    ...prevState,
    [updateField]: {
      ...prevState[updateField],
      [wagonType]: updatedValue
    },
  }));

  serviceItem.classList.toggle('wagon-details__service-icon-active');
};

function SeatsWagonDetailsBody({ data, wagonType }) {
  const { orderState, setOrderState } = useContext(OrderContext);

  return (
    <>
      <div className="wagon-details__number">
        <p className="wagon-number">{data.coach.name}</p>
        <p>вагон</p>
      </div>

      <div className="wagon-details__place">
        <p>Места <span className="wagon-details__place-count">{data.coach.available_seats}</span></p>
        {['fourth', 'third'].includes(wagonType) &&
          <React.Fragment>
            <p>Верхние <span className="wagon-details__place-count"></span></p>
            <p>Нижние <span className="wagon-details__place-count"></span></p>
            {wagonType === 'third' && <p>Боковые <span className="wagon-details__place-count"></span></p>}
          </React.Fragment>
        }
      </div>

      <div className="wagon-details__price">
        <p>Стоимость</p>
        {['fourth', 'third'].includes(wagonType)
          ? ['top', 'bottom', 'side'].filter(type => type !== 'side' || wagonType === 'third').map((type, index) =>
              <p key={index}>
                <span className="wagon-details__price-count">{data.coach[`${type}_price`]}</span>₽
              </p>)
          : <p><span className="wagon-details__price-count">{data.coach.price}</span>₽</p>
        }
      </div>

      <div className="wagon-details__service">
        <p>Обслуживание ФПК</p>
        <ul className="wagon-details__service-list">
          <li className="wagon-details__service-item"
            onClick={(event) => handleChooseService(event, orderState, setOrderState, wagonType)}
            data-tooltip-id="have_air_conditioning"
            data-tooltip-content={data.coach.have_air_conditioning ? "кондиционер работает" : "кондиционер отсутствует"}
            data-tooltip-place="bottom">
            <TooltipBlock id="have_air_conditioning"/>
            <div className={`wagon-details__service-icon ${data.coach.have_air_conditioning ? 'wagon-details__service-icon-include' : 'wagon-details__service-icon-exclude'}`}>
              <SVGicon name={"have_air_conditioning"}/>
            </div>
          </li>

          <li className="wagon-details__service-item"
            onClick={(event) => handleChooseService(event, orderState, setOrderState, wagonType)}
            data-cost={data.coach.wifi_price}
            data-tooltip-id="have_wifi"
            data-tooltip-content={data.coach.have_wifi ? `WI-FI, стоимость ${data.coach.wifi_price} ₽` : "WI-FI отсутствует"}
            data-tooltip-place="bottom">
            <TooltipBlock id="have_wifi"/>
            <div className={`wagon-details__service-icon ${!data.coach.have_wifi && 'wagon-details__service-icon-exclude'}`}>
              <SVGicon name={"have_wifi"}/>
            </div>
          </li>

          <li className="wagon-details__service-item"
            onClick={(event) => handleChooseService(event, orderState, setOrderState, wagonType)}
            data-cost={data.coach.linens_price}
            data-tooltip-id="have_bed_linen"
            data-tooltip-content={data.coach.is_linens_included ? "белье включено в стоимость" : `белье, стоимость ${data.coach.linens_price} ₽`}
            data-tooltip-place="bottom">
            <TooltipBlock id="have_bed_linen"/>
            <div className={`wagon-details__service-icon ${data.coach.is_linens_included && 'wagon-details__service-icon-include'}`}>
              <SVGicon name={"have_bed_linen"}/>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SeatsWagonDetailsBody;

SeatsWagonDetailsBody.propTypes = {
  data: PropTypes.object,
  wagonType: PropTypes.string,
};