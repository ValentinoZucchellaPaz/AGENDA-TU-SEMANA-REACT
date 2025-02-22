'use client'
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext"
import TaskCard from "./TaskCard"
import { useTaskContext } from "@/context/taskContext"
import TaskForm from "./TaskForm"
import { ChangeEvent, FormEvent, useCallback } from "react"

export default function TaskContainer() {
    const { tasks, loading } = useTaskContext()
    const { error } = useFirebaseErrorContext()

    if (loading) return (
        <div className="flex justify-center items-center h-[50dvh]">
            <span className="loader"></span>
        </div>
    )

    return (
        <section>
            {error && <p>{error.message} aaaaaa</p>}
            <div className='mx-auto md:max-w-[50dvw] flex flex-col gap-3 justify-center items-center px-8 py-3 my-10 rounded-lg border border-gray-300 bg-white text-gray-950 shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50'>
                <TaskForm />
            </div>
            <ul className="mx-3 md:mx-12 xl:mx-28 task-container">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </ul>
        </section>
    )
}