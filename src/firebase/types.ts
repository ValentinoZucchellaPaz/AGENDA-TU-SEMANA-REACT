import { Timestamp } from "firebase/firestore";

export interface Task {
    id: string;
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    createdAt: Timestamp,
    creator: string,
    isCompleted: boolean
}
