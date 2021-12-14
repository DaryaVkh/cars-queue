import React, {FC, useState} from 'react';
import './active-records.scss';
import NavBar from '../../components/navbar/navbar';
import AppBackground from '../../components/app-background/app-background';
import {Card, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import {AppState} from '../../entitites/app/app.interfaces';
import {ActiveRecordsProps, ActiveRecordsStateProps} from '../../entitites/active-records/active-records.interfaces';

const ActiveRecords: FC<ActiveRecordsProps> = props => {
    const [activeDay, setActiveDay] = useState(0);

    function changeActiveDay(selectedDay: string | null) {
        if (selectedDay === null) {
            return;
        }
        setActiveDay(+selectedDay);
    }

    function renderScheduleDays() {
        let today = new Date();
        const currentTimeHour: number = +today.toTimeString().split(' ')[0].split(':')[0];

        if (currentTimeHour > 18) {
            today.setDate(today.getDate() + 1);
        }

        const dates: string[] = [];

        for (let i = 0; i < 7; i++) {
            dates.push(`${today.getDate()}.${today.getMonth() + 1}`);
            today.setDate(today.getDate() + 1);
        }

        return dates.map((date, ind) => {
            return (
                <Nav.Item key={ind}>
                    <Nav.Link eventKey={ind}>{date}</Nav.Link>
                </Nav.Item>
            );
        });
    }

    function renderActiveRecords(): JSX.Element[] {
        const scheduleDays = Object.keys(props.schedule);
        const records = [];

        for (let record of props.activeRecords) {
            if (record.date === scheduleDays[activeDay]) {
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
            <AppBackground />
            <NavBar activePage='active-records' />

            <div className='active-records-wrapper'>
                <Nav id='nav' fill variant='pills' activeKey={activeDay} onSelect={changeActiveDay}>
                    {renderScheduleDays()}
                </Nav>

                {renderActiveRecords()}
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState): ActiveRecordsStateProps {
    return {
        schedule: state.appReducer.schedule,
        activeRecords: state.appReducer.activeRecords
    }
}

export default connect(mapStateToProps)(ActiveRecords);