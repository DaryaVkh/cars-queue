import {Record, Schedule} from '../../entitites/app/app.interfaces';
import {ADD_CAR_RECORD, GENERATE_OR_UPDATE_SCHEDULE, REPLACE_RECORD_FROM_ACTIVE_TO_PASSED} from './app-action-types';
import {AppAction} from '../reducers/app-reducer/app-reducer.interfaces';

export function generateOrUpdateSchedule(newSchedule: Schedule): AppAction {
    return {
        type: GENERATE_OR_UPDATE_SCHEDULE,
        payload: newSchedule
    }
}

export function addCarRecord(newRecord: Record): AppAction {
    return {
        type: ADD_CAR_RECORD,
        payload: newRecord
    }
}

export function replaceRecordFromActiveToPassed(record: Record): AppAction {
    return {
        type: REPLACE_RECORD_FROM_ACTIVE_TO_PASSED,
        payload: record
    }
}