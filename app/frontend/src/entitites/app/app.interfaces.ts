import {AppAction} from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface CarRecord {
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
    days: Schedule,
    activeQueue: CarRecord[],
    passedQueue: CarRecord[]
}

export interface AppState {
    appReducer: AppStateProps
}

export interface AppDispatchProps {
    onGenerateOrUpdateDays: (days: Schedule) => AppAction;
    onEndRecordTime: (record: CarRecord) => AppAction;
}

export type AppProps = AppDispatchProps;