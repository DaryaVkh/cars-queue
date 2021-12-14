import {AppAction} from '../../redux/reducers/app-reducer/app-reducer.interfaces';

export interface Record {
    ownerName: string;
    ownerPhone: string;
    date: string;
    time: string;
    carModel: string;
}

export interface Schedule {
    [key: string]: string[];
}

export interface AppStateProps {
    schedule: Schedule,
    activeRecords: Record[],
    passedRecords: Record[]
}

export interface AppState {
    appReducer: AppStateProps
}

export interface AppDispatchProps {
    onGenerateOrUpdateSchedule: (newSchedule: Schedule) => AppAction;
    onEndRecordTime: (record: Record) => AppAction;
}

export type AppProps = AppDispatchProps;