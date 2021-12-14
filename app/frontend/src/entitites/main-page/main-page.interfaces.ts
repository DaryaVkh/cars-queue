import {CarRecord, Schedule} from "../app/app.interfaces";
import {AppAction} from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface AppStateProps {
    days: Schedule,
    activeQueue: CarRecord[]
}

export interface AppDispatchProps {
    onAddRecord: (newRecord: CarRecord) => AppAction;
}

export type MainPageProps = AppStateProps & AppDispatchProps;