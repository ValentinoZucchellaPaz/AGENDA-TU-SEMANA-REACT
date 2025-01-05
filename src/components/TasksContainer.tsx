'use client'
import { listenTasks } from "@/firebase/tasks"
import { Task } from "@/firebase/types"
import { FirestoreError } from "firebase/firestore"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"

export default function TaskContainer() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<FirestoreError | null>(null)

    useEffect(() => {
        const unsub = listenTasks("vzucchellapaz@gmail.com", setTasks, setError)
        return (() => unsub())
    }, [])

    return (
        <section className="py-5">
            {error && <p>{error.message}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-3 md:mx-12 xl:mx-28 auto-rows-auto">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </section>
    )
}