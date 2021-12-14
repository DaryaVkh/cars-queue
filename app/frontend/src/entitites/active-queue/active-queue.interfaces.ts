import {CarRecord, Schedule} from "../app/app.interfaces";

export interface ActiveQueueStateProps {
    days: Schedule;
    activeQueue: CarRecord[]
}

export type ActiveQueueProps = ActiveQueueStateProps;