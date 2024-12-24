import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";


//auth
export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: {
        errorCode: string;
        errorMessage: string;
    } | null,
    handleLogin: (email: string, password: string) => void,
    handleSignUp: (email: string, password: string) => void,
    SignOut: () => void
}

//tasks
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

export interface TaskContextProps {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    sortByDate: (state: boolean) => void,
    sortByName: (state: boolean) => void
}

export interface UseAsyncCreateProps {
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    creator: string,
    task: Task
}

export interface EditTaskProps {
    id: string
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[]
}

export interface AddTaskProps {
    title: string,
    hourFrom: string,
    hourTo: string,
    selectedDays: string[],
    createdAt: Date,
    creator: string,
}

// eventos

export interface Event {
    id: string
    title: string,
    hourFrom: string,
    hourTo: string,
    day: Timestamp,
    createdAt: Timestamp,
    creator: string,
    isCompleted: boolean
}