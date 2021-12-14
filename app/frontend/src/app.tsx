import React, {FC, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainPage from "./pages/main-page/main-page";
import ActiveQueue from "./pages/active-queue/active-queue";
import Passed from "./pages/passed/passed";
import {AppProps, CarRecord, Schedule} from "./entitites/app/app.interfaces";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppAction} from "./redux/reducers/app-reducer/app-reducer.interfaces";
import {generateOrUpdateDays, replaceRecordFromActiveToPassed} from "./redux/actions/app-actions";
import {store} from "./index";
import {startTimeMinutes, workHours} from "./entitites/common/common.contants";

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
        const prevDays: Schedule = store.getState().appReducer.days;

        let days: Schedule;

        const isWorkDayEnded = currentTimeHour > 18;
        const isWorkDayNotStarted = currentTimeHour < 9;

        if (isWorkDayEnded) {
            days = Object.fromEntries(Object.entries(prevDays).filter(([key, _]) => key !== today.toLocaleDateString("sv")));
            today.setDate(today.getDate() + 1);
            days[today.toLocaleDateString("sv")] = workHours;
        } else if (isWorkDayNotStarted) {
            days = Object.fromEntries(Object.entries(prevDays).filter(([key, _]) => key >= today.toLocaleDateString("sv")));
            if (Object.keys(days).length === 6) {
                today.setDate(today.getDate() + 1);
                days[today.toLocaleDateString("sv")] = workHours;
            }
        } else {
            days = {...prevDays};
            days[today.toLocaleDateString("sv")].filter(time => +time.split(':')[0] > currentTimeHour);
        }

        props.onGenerateOrUpdateDays(days);
    }

    function updateQueues(currentTimeHour: number) {
        const activeQueue = store.getState().appReducer.activeQueue;
        const today = new Date().toLocaleDateString("sv");

        for (let record of activeQueue) {
            if (+record.time.split(':')[0] < currentTimeHour && record.date === today) {
                props.onEndRecordTime(record);
            }
        }
    }

    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/active-queue' element={<ActiveQueue />} />
            <Route path='/passed' element={<Passed />} />
        </Routes>
    );
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
    return {
        onGenerateOrUpdateDays: (days: Schedule) => dispatch(generateOrUpdateDays(days)),
        onEndRecordTime: (record: CarRecord) => dispatch(replaceRecordFromActiveToPassed(record))
    }
}

export default connect(null, mapDispatchToProps)(App);
