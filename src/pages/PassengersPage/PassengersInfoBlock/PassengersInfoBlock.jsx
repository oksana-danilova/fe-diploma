/* eslint-disable-next-line no-unused-vars */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import OrderContext from "../context/orderContext";
import PayContext from "../context/payContext";
import "./PassengersInfoBlock.css";

/* eslint-disable-next-line no-unused-vars */
const PassengersInfoBlock = ({ number, onChange }) => {
/* eslint-disable-next-line no-unused-vars */
    const { payState, setPayState } = useContext(PayContext);
    const { orderState } = useContext(OrderContext);
    
    const depAdultCount = Number(orderState.departure_person_count.adult);
    const depChildCount = Number(orderState.departure_person_count.child);
    const depAdultChildCount = depAdultCount + depChildCount;

    /* eslint-disable-next-line no-unused-vars */
    const [showComponent, setShowComponent] = useState(true);
    const [age, setAge] = useState({ dataValue: "adult", value: "Взрослый" });
    const [document, setDocument] = useState({ dataValue: "passport", value: "Паспорт" });

    /* eslint-disable-next-line no-unused-vars */
    const handleAge = (event) => {
        event.preventDefault();
        setAge({ dataValue: event.target.dataset.value, value: event.target.value });
    };

    /* eslint-disable-next-line no-unused-vars */
    const handleDocument = (event) => {
        event.preventDefault();
        setDocument({ dataValue: event.target.dataset.value, value: event.target.value });
    };

    /* eslint-disable-next-line no-unused-vars */
    const handleChangeDocument = () => {
    // eslint-disable-next-line no-undef
        const passportBlock = documentRef.current.querySelector('.select-option__passport');
    // eslint-disable-next-line no-undef
        const birthBlock = documentRef.current.querySelector('.select-option__birth-certificate');
        
        if (document.dataValue === "birth-certificate") {
            passportBlock.classList.add("invisible-block");
            birthBlock.classList.remove("invisible-block");
        } else {
            passportBlock.classList.remove("invisible-block");
            birthBlock.classList.add("invisible-block");
        }
    };

    const validateForm = (e) => {
        const errors = [];
        const formElements = [
            ['second-name', 'Фамилия'],
            ['first-name', 'Имя']
        ];

        for (let i = 0; i < formElements.length; i++) {
            const field = e.target.closest(`.passenger-${number}`).querySelector(`input[name="${formElements[i][0]}"]`);
            if (!field.value.trim()) {
                errors.push(`${formElements[i][1]} должно быть заполнено.`);
            }
        }

        const birthdayField = e.target.closest(`.passenger-${number}`).querySelector('input[name="birth"]');
        if (!birthdayField.value || new Date(birthdayField.value) >= new Date()) {
            errors.push("Дата рождения указана неверно.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    };

    /* eslint-disable-next-line no-unused-vars */
    const handleNextPassenger = (event) => {
        event.preventDefault();
        if (!validateForm(event)) return;

        const firstName = event.target.closest(`.passenger-${number}`).querySelector('input[name="first-name"]').value;
        const lastName = event.target.closest(`.passenger-${number}`).querySelector('input[name="second-name"]').value;
        const patronymic = event.target.closest(`.passenger-${number}`).querySelector('input[name="third-name"]').value;
        const gender = [...event.target.closest(`.passenger-${number}`).querySelectorAll(".personal-gender__radio-input")]
            .find(radio => radio.checked)?.value;
        const birthday = event.target.closest(`.passenger-${number}`).querySelector('input[name="birth"]').value;
        const documentType = event.target.closest(`.passenger-${number}`).querySelector('input[name="document-type"]').value;
        const documentData = documentType === "Паспорт" ?
            `${event.target.closest(`.passenger-${number}`).querySelector('#series').value}-${event.target.closest(`.passenger-${number}`).querySelector('#number').value}`
            : event.target.closest(`.passenger-${number}`).querySelector('#birth-number').value;

        const babyCount = number <= depAdultChildCount && orderState.departure_person_count.baby >= number ||
                         number > depAdultChildCount && orderState.arrival_person_count.baby >= (number - depAdultChildCount);

        const passengerObj = {
            coach_id: number - 1 < depAdultChildCount ? orderState.departure.seats[number - 1].coach_id : orderState.arrival.seats[number - 1 - depAdultChildCount].coach_id,
            seat_number: number - 1 < depAdultChildCount ? orderState.departure.seats[number - 1].seat_number : orderState.arrival.seats[number - 1 - depAdultChildCount].seat_number,
            is_child: age.dataValue !== "adult",
            include_children_seat: babyCount,
            person_info: {
                is_adult: age.dataValue === "adult",
                first_name: firstName,
                last_name: lastName,
                patronymic: patronymic,
                gender: gender,
                birthday: birthday,
                document_type: documentType,
                document_data: documentData,
            },
        };

        if (number - 1 < depAdultChildCount) {
            setPayState(prevState => ({
                ...prevState,
                departure: {
                    ...prevState.departure,
                    seats: prevState.departure.seats.concat(passengerObj),
                },
            }));
        } else {
            setPayState(prevState => ({
                ...prevState,
                arrival: {
                    ...prevState.arrival,
                    seats: prevState.arrival.seats.concat(passengerObj),
                },
            }));
        }
    };

    return (
        <>
            {showComponent &&
                <div className={`passengers-info-block info-block passenger-${number}`}>
                </div>}
        </>
    );
};

export default PassengersInfoBlock;

PassengersInfoBlock.propTypes = {
    number: PropTypes.number.isRequired,
    onChange: PropTypes.func,
};