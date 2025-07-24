/* eslint-disable-next-line no-unused-vars */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PayContext from '../context/payContext';
import ValidationEmail from '../services/ValidationEmail';
import './PaymentInfo.css';

const PaymentInfo = () => {
  const { payState, setPayState } = useContext(PayContext);
  const navigate = useNavigate();

  const validateForm = (data) => {
    return data.firstName.trim() !== '' &&
           data.lastName.trim() !== '' &&
           data.phone.match(/\d+/g).join('').length === 11 &&
           ValidationEmail(data.email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {
      firstName: document.querySelector('#first-name').value,
      lastName: document.querySelector('#last-name').value,
      patronymic: document.querySelector('#third-name').value,
      phone: document.querySelector('#phone').value,
      email: document.querySelector('#mail').value,
      paymentMethod: document.querySelector('input[name="payment-method"]:checked')?.value || 'online',
    };

    if (validateForm(formData)) {
      setPayState({...payState, user: {...formData}});
      navigate('/fe-diploma/order/confirm');
    }
  };

  return (
    <div className="payment-info__wrapper">
      <div className="payment-info__personal-container">
        <h3 className="payment-info__personal-title">Персональные данные</h3>
        
        <div className="payment-info__content">
          <div className="info-block__personal-info payment-info__second-name">
            <label htmlFor="last-name">Фамилия:</label>
            <input type="text" name="last-name" id="last-name"/>
          </div>
          
          <div className="info-block__personal-info payment-info__first-name">
            <label htmlFor="first-name">Имя:</label>
            <input type="text" name="first-name" id="first-name"/>
          </div>
          
          <div className="info-block__personal-info payment-info__third-name">
            <label htmlFor="third-name">Отчество:</label>
            <input type="text" name="third-name" id="third-name"/>
          </div>
          
          <div className="info-block__personal-info payment-info__phone">
            <label htmlFor="phone">Телефон:</label>
            <input type="tel" pattern="^\+?[1-9]\d{1,14}$" name="phone" id="phone" placeholder="+7" required/>
          </div>
          
          <div className="info-block__personal-info payment-info__mail">
            <label htmlFor="mail">Электронная почта:</label>
            <input type="email" name="mail" id="mail" placeholder="example@example.ru" required/>
          </div>
        </div>
      </div>
      
      <div className="payment-info__pay-block">
        <h3 className="payment-info__pay-title">Способ оплаты</h3>
        
        <div className="payment-info__pay-options">
          <label htmlFor="pay-online">
            <input type="radio" name="payment-method" id="pay-online" value="online"/> Онлайн
          </label>
          
          <ul className="payment-methods-list">
            <li>Банковская карта</li>
            <li>PayPal</li>
            <li>Visa QIWI Wallet</li>
          </ul>
          
          <label htmlFor="pay-cash">
            <input type="radio" name="payment-method" id="pay-cash" value="cash"/> Наличные
          </label>
        </div>
      </div>
      
      <div className="payment-info__pay-btn">
        <button className="payment-info__btn" type="submit" onClick={handleSubmit}>
          Купить билеты
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;