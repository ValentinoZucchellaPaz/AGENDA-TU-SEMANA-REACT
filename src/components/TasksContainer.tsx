'use client'
import { listenTasks } from "@/firebase/tasks"
import { Task } from "@/firebase/types"
import { FirestoreError } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function TaskContainer() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<FirestoreError | null>(null)

    useEffect(() => {
        const unsub = listenTasks("vzucchellapaz@gmail.com", setTasks, setError)
        return (() => unsub())
    }, [])

    return (
        <div>
            {error && <p>{error.message}</p>}
            {tasks.map(task => (
                <p key={task.id}>{task.title}</p>
            ))}
        </div>
    )
}