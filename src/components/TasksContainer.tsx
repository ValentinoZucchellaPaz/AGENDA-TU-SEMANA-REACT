'use client'
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext"
import TaskCard from "./TaskCard"
import { useFirebaseContentContext } from "@/context/firebaseContentContext"
import TaskForm from "./TaskForm"

export default function TaskContainer() {
    const { tasks } = useFirebaseContentContext()
    const { error } = useFirebaseErrorContext()

    return (
        <section>
            TaskContainer
            {error && <p>{error.message}</p>}
            <div className='mx-auto md:max-w-[50dvw] flex flex-col gap-3 justify-center items-center px-8 py-3 my-10 rounded-lg border border-gray-300 bg-white text-gray-950 shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50'>
                <TaskForm />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-3 md:mx-12 xl:mx-28 auto-rows-auto">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </section>
    )
}