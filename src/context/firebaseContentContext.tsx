'use client'
import { listenTasks } from "@/firebase/tasks";
import { Task } from "@/firebase/types";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { useFirebaseErrorContext } from "./firebaseErrorContext";
import { User } from "firebase/auth";
import { userChangeListener } from "@/firebase/auth";

interface FirebaseContentType {
    user: User | null,
    tasks: Task[]
}

export const FirebaseContentContext = createContext<FirebaseContentType | undefined>(undefined)

export function FirebaseContentProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [user, setUser] = useState<User | null>(null)
    const { setError } = useFirebaseErrorContext()

    useEffect(() => {
        const unsubUser = userChangeListener(setUser)
        return (() => unsubUser())
    }, [])

    useEffect(() => {
        console.log(user);

        if (user?.email) {
            const unsubTasks = listenTasks(user?.email, setTasks, setError)
            return (() => {
                unsubTasks()
            })
        } else {
            setTasks([])
        }
    }, [user])

    return (
        <FirebaseContentContext.Provider value={{ user, tasks }}>
            {children}
        </FirebaseContentContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useFirebaseContentContext = () => {
    const context = use(FirebaseContentContext);
    if (!context) {
        throw new Error("useFirebaseContentContext debe usarse dentro de un AppProvider");
    }
    return context;
};