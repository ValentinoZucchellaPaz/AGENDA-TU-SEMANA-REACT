import { Timestamp } from "firebase/firestore";

export interface Task {
    id: string;
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    // selectedDays: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'todos'],
    createdAt: Timestamp,
    creator: string,
    isCompleted: boolean
}
