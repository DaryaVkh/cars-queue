import {CarRecord, Schedule} from "../../entitites/app/app.interfaces";
import {ADD_CAR_RECORD, GENERATE_OR_UPDATE_DAYS, REPLACE_RECORD_FROM_ACTIVE_TO_PASSED} from "./app-action-types";
import {AppAction} from "../reducers/app-reducer/app-reducer.interfaces";

export function generateOrUpdateDays(days: Schedule): AppAction {
    return {
        type: GENERATE_OR_UPDATE_DAYS,
        payload: days
    }
}

export function addCarRecord(newRecord: CarRecord): AppAction {
    return {
        type: ADD_CAR_RECORD,
        payload: newRecord
    }
}

export function replaceRecordFromActiveToPassed(record: CarRecord): AppAction {
    return {
        type: REPLACE_RECORD_FROM_ACTIVE_TO_PASSED,
        payload: record
    }
}