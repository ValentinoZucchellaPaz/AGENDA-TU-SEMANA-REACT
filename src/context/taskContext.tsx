'use client'
import { listenTasks } from "@/firebase/tasks";
import { Task } from "@/firebase/types";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { useFirebaseErrorContext } from "./firebaseErrorContext";
import { useUserContext } from "./userContext";


export const TaskContext = createContext<{ tasks: Task[], loading: boolean } | undefined>(undefined)

export function TaskContextProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useUserContext()
    const { setError } = useFirebaseErrorContext()

    useEffect(() => {
        console.log(user);
        setLoading(true)

        if (user?.email) {
            const unsubTasks = listenTasks(user?.email, setTasks, setError, setLoading)
            return () => unsubTasks()
        }
    }, [user])

    return (
        <TaskContext.Provider value={{ tasks, loading }}>
            {children}
        </TaskContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useTaskContext = () => {
    const context = use(TaskContext);
    if (!context) {
        throw new Error("useFirebaseContentContext debe usarse dentro de un AppProvider");
    }
    return context;
};