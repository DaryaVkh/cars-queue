import {CarRecord, Schedule} from "../app/app.interfaces";

export interface PassedStateProps {
    days: Schedule;
    passedQueue: CarRecord[]
}

export type PassedQueueProps = PassedStateProps;