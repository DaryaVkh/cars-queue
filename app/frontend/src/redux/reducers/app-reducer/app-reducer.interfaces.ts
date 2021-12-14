import {CarRecord, Schedule} from "../../../entitites/app/app.interfaces";

export interface AppReducerState {
    days: Schedule,
    activeQueue: CarRecord[],
    passedQueue: CarRecord[]
}

export interface AppAction {
    type: string;
    payload: CarRecord | Schedule;
}