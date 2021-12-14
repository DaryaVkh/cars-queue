import React, {FC, useState} from 'react';
import './main-page.scss';
import {Button, Form, Modal} from "react-bootstrap";
import NavBar from "../../components/navbar/navbar";
import Background from "../../components/background/background";
import {AppAction} from "../../redux/reducers/app-reducer/app-reducer.interfaces";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppState, CarRecord} from "../../entitites/app/app.interfaces";
import {MainPageProps} from "../../entitites/main-page/main-page.interfaces";
import {addCarRecord} from "../../redux/actions/app-actions";

const MainPage: FC<MainPageProps> = props => {
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [popupShow, setPopupShow] = useState(false);

    function validateInput(input: string, id: string): boolean {
        let isValid = true;
        const element = document.querySelector('#' + id) as HTMLInputElement;
        if (input === '') {
            element.classList.add('error-input');
            isValid = false;
        } else {
            if (element.classList.contains('error-input')) {
                element.classList.remove('error-input');
            }
        }
        return isValid;
    }

    function isValidForm(model: string, name: string, time: string): boolean {
        let isValid = true;
        const phoneInput = document.querySelector('#phone') as HTMLInputElement;

        if (phone === undefined || phone.length !== 14) {
            phoneInput.classList.add('error-input');
            isValid = false;
        } else {
            if (phoneInput.classList.contains('error-input')) {
                phoneInput.classList.remove('error-input');
            }
        }
        isValid = validateInput(model, 'car-model') && isValid;
        isValid = validateInput(name, 'name') && isValid;
        isValid = validateInput(time, 'time') && isValid;
        return isValid;
    }

    function addCarToQueue(event: React.SyntheticEvent): void {
        event.preventDefault();
        let name = (document.querySelector('#name') as HTMLInputElement).value;
        let time = (document.querySelector('#time') as HTMLSelectElement).value;
        let model = (document.querySelector('#car-model') as HTMLInputElement).value;

        if (isValidForm(model, name, time)) {
            props.onAddRecord({ownerName: name, ownerPhone: phone, date: date, time: time, carModel: model} as CarRecord);
            setPhone('');
            setPopupShow(false);
        }
    }

    function normalizePhoneInput(value: string, previousValue: string): string | undefined {
        if (!value) return value;
        const currentValue = value.replace(/[^\d]/g, '');

        if (!previousValue || value.length > previousValue.length) {
            if (currentValue.length < 4) return currentValue;
            if (currentValue.length < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
        }
    }

    function handlePhoneInput(event: React.SyntheticEvent): void {
        setPhone(normalizePhoneInput((event.target as HTMLInputElement).value, phone) as string);
    }

    function setAvailableTime(event: React.SyntheticEvent): void {
        let selectedDate = (event.target as HTMLInputElement).value;
        setDate(selectedDate);
    }

    function renderTimeOptions(): JSX.Element[] {
        let options = props.days[date];
        return (options || []).map((time, ind) => <option value={time} key={ind}>{time}</option>);
    }

    function handleAddButtonClick(): void {
        let today = new Date();
        setMinDate(today.toLocaleDateString("sv"));
        let i = 0;
        for (let day in props.days) {
            if (props.days[day].length !== 0) {
                today.setDate(today.getDate() + i);
                setDate(today.toLocaleDateString("sv"));
                break;
            }
            i++;
        }
        today.setDate(new Date().getDate() + 6);
        setMaxDate(today.toLocaleDateString("sv"));
        setPopupShow(true);
    }

    return (
        <div className='page-wrapper'>
            <Background />
            <NavBar activePage='main' />

            <div className='information'>
                <h1>Запись в очередь на ТО</h1>
                <Button className='add-button' variant="light" onClick={handleAddButtonClick}>Добавить машину</Button>
            </div>

            <Modal show={popupShow}
                   onHide={() => setPopupShow(false)}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Запись в очередь
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label column>ФИО владельца</Form.Label>
                            <Form.Control type="text" placeholder="Иванов И.И." required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label column>Номер телефона владельца</Form.Label>
                            <Form.Control type="tel" placeholder="(xxx) xxx-xxxx" value={phone} onChange={handlePhoneInput} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label column>Дата ТО</Form.Label>
                            <Form.Control type="date" value={date} min={minDate} max={maxDate} onChange={setAvailableTime} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label column>Время ТО</Form.Label>
                            <Form.Select>
                                {date !== '' ? renderTimeOptions() : null}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="car-model">
                            <Form.Label column>Марка машины</Form.Label>
                            <Form.Control type="text" placeholder='Opel Astra' required />
                        </Form.Group>

                        <Button type='submit' onClick={addCarToQueue}>Добавить</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        days: state.appReducer.days,
        activeQueue: state.appReducer.activeQueue,
    }
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
    return {
        onAddRecord: (newRecord: CarRecord) => dispatch(addCarRecord(newRecord))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);