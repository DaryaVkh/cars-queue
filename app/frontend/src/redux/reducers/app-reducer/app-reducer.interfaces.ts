import {Record, Schedule} from '../../../entitites/app/app.interfaces';

export interface AppReducerState {
    schedule: Schedule,
    activeRecords: Record[],
    passedRecords: Record[]
}

export interface AppAction {
    type: string;
    payload: Record | Schedule;
}