import { DocumentData, Timestamp } from "firebase/firestore";

export interface DTOTask {
    id: string,
    data: DocumentData
}

export interface Task {
    id: string
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    createdAt: Timestamp,
    creator: string,
    isCompleted: boolean
}

export interface TaskContextType {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    sortByDate: (state: boolean) => void,
    sortByName: (state: boolean) => void
}

export interface UseAsyncCreateType {
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    creator: string,
    task: Task
}

export interface EditTaskType {
    id: string
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[]
}

export interface AddTaskType {
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    createdAt: Date,
    creator: string,
}