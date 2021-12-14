import {AppAction, AppReducerState} from './app-reducer.interfaces';
import {
    ADD_CAR_RECORD,
    GENERATE_OR_UPDATE_SCHEDULE,
    REPLACE_RECORD_FROM_ACTIVE_TO_PASSED
} from '../../actions/app-action-types';
import {Record, Schedule} from '../../../entitites/app/app.interfaces';
import {workHours} from '../../../entitites/common/common.contants';

const initialState: AppReducerState = {
    schedule: generateSchedule(),
    activeRecords: [],
    passedRecords: []
}

export const appReducer = (state: AppReducerState = initialState, action: AppAction) => {
    switch (action.type) {
        case GENERATE_OR_UPDATE_SCHEDULE:
            return {
                ...state,
                schedule: action.payload
            }
        case ADD_CAR_RECORD:
            return {
                ...state,
                activeRecords: [...state.activeRecords, action.payload],
                schedule: {...state.schedule, [(action.payload as Record).date]: state.schedule[(action.payload as Record).date].filter(time => time !== (action.payload as Record).time)}
            }
        case REPLACE_RECORD_FROM_ACTIVE_TO_PASSED:
            return {
                ...state,
                activeRecords: [...state.activeRecords.filter(record => record !== action.payload)],
                passedRecords: [...state.passedRecords, action.payload]
            }
        default:
            return state;
    }
}

function generateSchedule(): Schedule {
    let today: Date = new Date();
    let schedule: Schedule = {};
    const currentTimeHour: number = +today.toTimeString().split(' ')[0].split(':')[0];

    schedule[today.toLocaleDateString('sv')] = [];

    for (let hour of workHours) {
        if (currentTimeHour >= +hour.split(':')[0]) {
            continue;
        }
        schedule[today.toLocaleDateString('sv')].push(hour);
    }

    if (schedule[today.toLocaleDateString('sv')].length === 0) {
        schedule = {};
    }

    for (let i = Object.keys(schedule).length; i < 7; i++) {
        today.setDate(today.getDate() + 1);
        schedule[today.toLocaleDateString('sv')] = workHours;
    }

    return schedule;
}