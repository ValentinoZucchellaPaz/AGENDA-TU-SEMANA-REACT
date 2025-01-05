'use client'
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext"
import TaskCard from "./TaskCard"
import { useFirebaseContentContext } from "@/context/firebaseContentContext"

export default function TaskContainer() {
    const { tasks } = useFirebaseContentContext()
    const { error } = useFirebaseErrorContext()

    return (
        <section>
            TaskContainer
            {error && <p>{error.message}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-3 md:mx-12 xl:mx-28 auto-rows-auto">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </section>
    )
}