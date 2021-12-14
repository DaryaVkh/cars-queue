import React, {FC, useState} from 'react';
import './active-queue.scss';
import NavBar from "../../components/navbar/navbar";
import Background from "../../components/background/background";
import {Card, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../entitites/app/app.interfaces";
import {ActiveQueueProps} from "../../entitites/active-queue/active-queue.interfaces";

const ActiveQueue: FC<ActiveQueueProps> = props => {
    const [activeDay, setActiveDay] = useState(0);

    function changeActiveDay(selectedDay: string | null) {
        if (selectedDay === null) {
            return;
        }
        setActiveDay(+selectedDay);
    }

    function renderDays() {
        let today = new Date();
        const dates = [];

        for (let i = 0; i < 7; i++) {
            dates.push(today.toLocaleDateString('ru', {day: 'numeric', weekday: 'short'}).split(', '));
            today.setDate(today.getDate() + 1);
        }

        return dates.map((date, ind) => {
            return (
                <Nav.Item key={ind}>
                    <Nav.Link eventKey={ind}>{date[0].toUpperCase()} {date[1]}</Nav.Link>
                </Nav.Item>
            );
        });
    }

    function renderCards() {
        const days = Object.keys(props.days);
        const records = [];

        for (let record of props.activeQueue) {
            if (record.date === days[activeDay]) {
                records.push(record);
            }
        }

        records.sort((r1, r2) => {
            let time1 = r1.time.split(':');
            let time2 = r2.time.split(':');
            return +time1[0] < +time2[0] ? -1 : 1;
        });

        return records.map((record, ind) =>
            <Card key={ind}>
                <Card.Header>{record.time}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <b>Владелец:</b> {record.ownerName}<br />
                        <b>Телефон:</b> 8 {record.ownerPhone}<br />
                        <b>Машина:</b> {record.carModel}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className='page-wrapper'>
            <Background />
            <NavBar activePage='active-queue' />

            <div className='active-queue-wrapper'>
                <Nav id='nav' fill variant="pills" activeKey={activeDay} onSelect={changeActiveDay}>
                    {renderDays()}
                </Nav>

                {renderCards()}
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        days: state.appReducer.days,
        activeQueue: state.appReducer.activeQueue
    }
}

export default connect(mapStateToProps)(ActiveQueue);