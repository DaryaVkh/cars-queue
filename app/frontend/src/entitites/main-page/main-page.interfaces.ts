import {Record, Schedule} from '../app/app.interfaces';
import {AppAction} from '../../redux/reducers/app-reducer/app-reducer.interfaces';

export interface MainPageStateProps {
    schedule: Schedule,
    activeRecords: Record[]
}

export interface MainPageDispatchProps {
    onAddRecord: (newRecord: Record) => AppAction;
}

export type MainPageProps = MainPageStateProps & MainPageDispatchProps;