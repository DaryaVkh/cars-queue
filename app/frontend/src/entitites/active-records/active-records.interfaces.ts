import {Record, Schedule} from '../app/app.interfaces';

export interface ActiveRecordsStateProps {
    schedule: Schedule;
    activeRecords: Record[]
}

export type ActiveRecordsProps = ActiveRecordsStateProps;