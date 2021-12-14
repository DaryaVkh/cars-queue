import {CarRecord, Schedule} from "../app/app.interfaces";
import {AppAction} from "../../redux/reducers/app-reducer/app-reducer.interfaces";

export interface MainPageStateProps {
    days: Schedule,
    activeQueue: CarRecord[]
}

export interface MainPageDispatchProps {
    onAddRecord: (newRecord: CarRecord) => AppAction;
}

export type MainPageProps = MainPageStateProps & MainPageDispatchProps;