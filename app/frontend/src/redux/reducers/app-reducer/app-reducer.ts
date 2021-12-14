import {AppAction, AppReducerState} from "./app-reducer.interfaces";
import {
    ADD_CAR_RECORD,
    GENERATE_OR_UPDATE_DAYS,
    REPLACE_RECORD_FROM_ACTIVE_TO_PASSED
} from "../../actions/app-action-types";
import {CarRecord, Schedule} from "../../../entitites/app/app.interfaces";
import {workHours} from "../../../entitites/common/common.contants";

const initialState: AppReducerState = {
    days: generateDays(),
    activeQueue: [],
    passedQueue: []
}

export const appReducer = (state: AppReducerState = initialState, action: AppAction) => {
    switch (action.type) {
        case GENERATE_OR_UPDATE_DAYS:
            return {
                ...state,
                days: action.payload
            }
        case ADD_CAR_RECORD:
            return {
                ...state,
                activeQueue: [...state.activeQueue, action.payload],
                days: {...state.days, [(action.payload as CarRecord).date]: state.days[(action.payload as CarRecord).date].filter(time => time !== (action.payload as CarRecord).time)}
            }
        case REPLACE_RECORD_FROM_ACTIVE_TO_PASSED:
            return {
                ...state,
                activeQueue: [...state.activeQueue.filter(record => record !== action.payload)],
                passedQueue: [...state.passedQueue, action.payload]
            }
        default:
            return state;
    }
}

function generateDays(): Schedule {
    let today: Date = new Date();
    let days: Schedule = {};
    const currentTimeHour : number = +today.toTimeString().split(' ')[0].split(':')[0];

    days[today.toLocaleDateString("sv")] = [];

    for (let hour of workHours) {
        if (currentTimeHour >= +hour.split(':')[0]) {
            continue;
        }
        days[today.toLocaleDateString("sv")].push(hour);
    }

    if (days[today.toLocaleDateString("sv")].length === 0) {
        days = {};
    }

    today.setDate(today.getDate() + 1);
    for (let i = 1; i < 7; i++) {
        days[today.toLocaleDateString("sv")] = workHours;
        today.setDate(today.getDate() + 1);
    }

    return days;
}