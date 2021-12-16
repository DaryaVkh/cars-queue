import React, {FC, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import ActiveRecords from './pages/active-records/active-records';
import PassedRecords from './pages/passed-records/passed-records';
import {AppProps, Record, Schedule} from './entitites/app/app.interfaces';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppAction} from './redux/reducers/app-reducer/app-reducer.interfaces';
import {generateOrUpdateSchedule, replaceRecordFromActiveToPassed} from './redux/actions/app-actions';
import {store} from './index';
import {startTimeMinutes, workHours} from './entitites/common/common.contants';

const App: FC<AppProps> = props => {
    useEffect(() => {
        setTimeout(() => updateSchedule(), 60000 * (60 - startTimeMinutes));
    });

    function updateSchedule() {
        const currentTimeHour = +(new Date().toTimeString().split(' ')[0].split(':')[0]);

        updateDays(currentTimeHour);
        updateQueues(currentTimeHour);

        setTimeout(() => updateSchedule(), 60000 * 60);
    }

    function updateDays(currentTimeHour: number) {
        const today = new Date();
        const prevSchedule: Schedule = store.getState().appReducer.schedule;

        let schedule: Schedule;

        const isWorkDayEnded = currentTimeHour > 17;
        const isWorkDayNotStarted = currentTimeHour < 9;

        if (isWorkDayEnded) {
            schedule = Object.fromEntries(Object.entries(prevSchedule).filter(([key, _]) => key !== today.toLocaleDateString("sv")));
            today.setDate(today.getDate() + 1);
            schedule[today.toLocaleDateString('sv')] = workHours;
        } else if (isWorkDayNotStarted) {
            schedule = Object.fromEntries(Object.entries(prevSchedule).filter(([key, _]) => key >= today.toLocaleDateString("sv")));
            if (Object.keys(schedule).length === 6) {
                today.setDate(today.getDate() + 1);
                schedule[today.toLocaleDateString('sv')] = workHours;
            }
        } else {
            schedule = {...prevSchedule};
            schedule[today.toLocaleDateString('sv')].filter(time => +time.split(':')[0] > currentTimeHour);
        }

        props.onGenerateOrUpdateSchedule(schedule);
    }

    function updateQueues(currentTimeHour: number) {
        const activeRecords = store.getState().appReducer.activeRecords;
        const today = new Date().toLocaleDateString('sv');

        for (let record of activeRecords) {
            if (record.date < today || (record.date === today && +record.time.split(':')[0] < currentTimeHour)) {
                props.onEndRecordTime(record);
            }
        }
    }

    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/active-records' element={<ActiveRecords />} />
            <Route path='/passed-records' element={<PassedRecords />} />
        </Routes>
    );
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
    return {
        onGenerateOrUpdateSchedule: (newSchedule: Schedule) => dispatch(generateOrUpdateSchedule(newSchedule)),
        onEndRecordTime: (record: Record) => dispatch(replaceRecordFromActiveToPassed(record))
    }
}

export default connect(null, mapDispatchToProps)(App);
