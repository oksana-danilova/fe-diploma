import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayContext from '../context/payContext';
import OrderContext from '../context/orderContext';
import SVGicon from '../components/SVGicon/SVGicon';
import './FinishInfo.css';

const initialStars = Array.from({ length: 5 }, (_, index) =>
  (<div key={index} className={`service-rating__star${index === 0 ? '' : ' inactive'}`}></div>),
);

function FinishInfo() {
  const { orderState } = useContext(OrderContext);
  const { payState } = useContext(PayContext);
  const navigate = useNavigate();

  const serviceDepCostMemo = React.useMemo(
    () => Object.values(orderState.departure_service || {}).reduce((acc, item) => acc + parseFloat(item), 0),
    [orderState]
  );

  const serviceArrCostMemo = React.useMemo(
    () => Object.values(orderState.arrival_service || {}).reduce((acc, item) => acc + parseFloat(item), 0),
    [orderState]
  );

  const ticketsDepCostMemo = React.useMemo(
    () => orderState.departure?.seats?.reduce((acc, seat) => acc + parseFloat(seat.seat_cost), 0) ?? 0,
    [orderState]
  );

  const ticketsArrCostMemo = React.useMemo(
    () => orderState.arrival?.seats?.reduce((acc, seat) => acc + parseFloat(seat.seat_cost), 0) ?? 0,
    [orderState]
  );

  const totalDepCostMemo = React.useMemo(() => serviceDepCostMemo + ticketsDepCostMemo, [
    serviceDepCostMemo,
    ticketsDepCostMemo,
  ]);

  const totalArrCostMemo = React.useMemo(() => serviceArrCostMemo + ticketsArrCostMemo, [
    serviceArrCostMemo,
    ticketsArrCostMemo,
  ]);

  const totalDepArrCostMemo = React.useMemo(() => totalDepCostMemo + totalArrCostMemo, [
    totalDepCostMemo,
    totalArrCostMemo,
  ]);

  const [starIndex, setStarIndex] = useState(-1);

  const handleClickStar = (index) => setStarIndex(index);

  const renderStars = () => initialStars.map((star, idx) => (
    <div
      key={idx}
      className={`service-rating__star ${idx <= starIndex ? 'active' : ''}`}
      onClick={() => handleClickStar(idx)}
    />
  ));

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/fe-diplom');
  };

  return (
    <div className="finish-info__wrapper">
      <div className="finish-info__container">
        <p className="finish-info__title">Благодарим Вас за заказ!</p>
        <div className="finish-info__bg-wrapper">
          <div className="finish-info__order-info">
            <p>№ Заказа 285АА</p>
            <p>сумма<span className="finish-info__order-cost">{totalDepArrCostMemo.toFixed(2)}</span>₽</p>
          </div>
          <div className="finish-info__tickets-info">
            <div className="finish-info__ticket-info">
              <SVGicon name={"pc"}/>
              <p>билеты будут<br/>отправлены<br/>на ваш <b>e-mail</b></p>
            </div>
            <div className="finish-info__ticket-info">
              <SVGicon name={"tickets"}/>
              <p><b>распечатайте</b><br/>и сохраняйте билеты<br/>до даты поездки</p>
            </div>
            <div className="finish-info__ticket-info">
              <SVGicon name={"driver"}/>
              <p><b>предьявите</b><br/>распечатанные<br/>билеты при посадке</p>
            </div>
          </div>

          <div className="finish-info__appeal-info">
            <p>{`${payState.user.first_name} ${payState.user.patronymic}!`}</p>
            <p>Ваш заказ успешно оформлен.<br/>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
            <p>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
          </div>

          <div className="finish-info__service-rating">
            <p className="service-rating__title">Оценить сервис</p>
            <div className="service-rating__stars">{renderStars()}</div>
            <button className="service-rating__btn" type="button" onClick={handleClick}>
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishInfo;
