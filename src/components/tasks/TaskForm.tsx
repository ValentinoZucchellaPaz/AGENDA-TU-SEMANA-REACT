'use client'
import { Task } from "@/firebase/types"
import { FormEvent, memo, ReactNode, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addTask, updateTask } from "@/firebase/tasks";
import { Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";
import { useUserContext } from "@/context/userContext";
import DaySelector from "../DaySelector";

interface TaskFormProps {
    children?: ReactNode,
    task?: Task,
    onFulfilled?: CallableFunction
}

function TaskForm({ children, task, onFulfilled }: TaskFormProps) {
    const [error, setError] = useState<string | null>(null)
    const [selectedDays, setSelectedDays] = useState<string[]>(task ? task.selectedDays : [])
    const [loading, setLoading] = useState(false)
    const { user } = useUserContext()
    const { setError: setFirebaseError } = useFirebaseErrorContext()
    const { toast } = useToast()


    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        if (selectedDays.length === 0) {
            setError('Primero debes seleccionar un dia')
            setLoading(false)
            return
        }

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const title = formData.get('task-title') as string
        const hourFrom = formData.get('hour-from') as string
        const hourTo = formData.get('hour-to') as string
        const now = new Date()
        const createdAt = new Timestamp(now.getSeconds(), now.getMilliseconds())

        const taskData = {
            title, hourFrom, hourTo, selectedDays
        }

        if (task) {
            updateTask(task.id, taskData)
                .then(() => {
                    toast({
                        title: `Tarea ${title} actualizada correctamente`,
                        description: `tiene id ${task.id}`,
                        variant: 'success'
                    })
                    if (onFulfilled) onFulfilled()
                    form.reset()
                    setSelectedDays([])
                }).catch(setFirebaseError)
                .finally(() => setLoading(false))
        } else {
            addTask({
                ...taskData,
                createdAt,
                creator: user?.email as string,
                isCompleted: false
            })
                .then(fulfilled => {
                    toast({
                        title: `Tarea ${title} agregada correctamente`,
                        description: `creada en la fecha: ${now.toLocaleString()} con id ${fulfilled}`,
                        variant: 'success'
                    })
                    form.reset()
                    setSelectedDays([])
                })
                .catch(setFirebaseError)
                .finally(() => setLoading(false))
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto py-5 justify-center items-center w-full">
            <h3 className="text-3xl font-bold">{task ? 'Editar tarea' : 'Crear tarea'}</h3>
            {error && <p className="text-red-600">Parece que ocurrio un error: {error}</p>}
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="task-title">Título</Label>
                <Input type="text" id="task-title" name="task-title" required placeholder="ej. ir a futbol" defaultValue={task ? task.title : ''} />
            </div>
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="hour-from">Desde:</Label>
                <Input type="time" id="hour-from" name="hour-from" required defaultValue={task ? task.hourFrom : ''} />
            </div>
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="hour-to">Hasta:</Label>
                <Input type="time" id="hour-to" name="hour-to" required defaultValue={task ? task.hourTo : ''} />
            </div>
            <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />


            {
                children ?
                    children :
                    <Button type="submit" disabled={loading} variant='outline' className="shadow-lg">
                        {loading ?
                            "Cargando..."
                            : task ? 'Editar' : 'Crear'
                        }
                    </Button>
            }

        </form>
    )
}

export default memo(TaskForm)