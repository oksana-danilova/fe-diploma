/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from "react";
import OrderContext from "../context/orderContext";
import "./SeatsTicketAmount.css";

const SeatsTicketAmount = () => {
  const { orderState, setOrderState } = useContext(OrderContext);

  const handleInputChange = ({ target }) => {
    const { dataset: { name }, value } = target.parentElement.closest('.seats__container');
    let newValue = value;

    switch(target.name) {
      case 'adult':
        newValue = Math.min(newValue.replace(/[^0-5]/g, ''), 5).toString();
        break;
      
      case 'child':
        newValue = Math.min(newValue.replace(/[^0-3]/g, ''), 3).toString();
        break;
        
      case 'baby': 
        newValue = Math.min(newValue.replace(/[^0-5]/g, ''), parseInt(orderState[name]?.adult || 0)).toString();
        break;
    }

    let newCount = {};
    newCount[target.name] = newValue;

    setOrderState(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        ...newCount
      }
    }));
  };

  return (
    <div className="seats__ticket-amount ticket-amount">
      <h3 className="ticket-amount__title">Количество билетов</h3>
      <form className="ticket-amount__form">
        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            Взрослые —
            <input 
              className="ticket-amount__input" 
              name="adult" 
              type="number" 
              placeholder="0" 
              onChange={handleInputChange} />
          </label>
          <span className="ticket-amount__block_description">Максимально можно добавить 5 пассажиров.</span>
        </div>

        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            Дети —
            <input 
              className="ticket-amount__input" 
              name="child" 
              type="number" 
              placeholder="0" 
              onChange={handleInputChange} />
          </label>
          <span className="ticket-amount__block_description">Дети до 10 лет имеют свое место, билет дешевле примерно на 50–65%.</span>
        </div>

        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            Младенцы («без места») —
            <input 
              className="ticket-amount__input" 
              name="baby" 
              type="number" 
              placeholder="0" 
              onChange={handleInputChange} />
          </label>
          <span className="ticket-amount__block_description"></span>
        </div>
      </form>
    </div>
  );
};

export default SeatsTicketAmount;
