'use client'
import { Task } from "@/firebase/types"
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { weekDays } from "@/lib/formValidations";
import { ChevronDownIcon } from "lucide-react";
import { addTask } from "@/firebase/tasks";
import { useFirebaseContentContext } from "@/context/firebaseContentContext";
import { FirestoreError, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";

export default function TaskForm({ task }: { task?: Task }) {
    const [error, setError] = useState<string | null>(null)
    const [checkbox, setCheckbox] = useState<string[]>([])
    const [showDays, setShowDays] = useState(true)
    const { user } = useFirebaseContentContext()
    const { setError: setFirebaseError } = useFirebaseErrorContext()
    const { toast } = useToast()


    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target
        let newState: string[]
        if (checked) {
            // todas las opciones de agregar
            newState = [...checkbox, name]
            if (name === 'Todos') {
                // se clickeo todos
                setCheckbox(weekDays)
                return
            } else if (weekDays
                .slice(0, -1)
                .every((weekDay) => newState.includes(weekDay))) {
                // todos checked menos "todos"
                setCheckbox(weekDays)
                return
            } else {
                setCheckbox(newState)
            }
        } else {
            // todas las opciones de desagregar
            newState = checkbox.filter(day => day !== name)
            if (name === 'Todos') {
                setCheckbox([])
                return
            } else if (checkbox.length === 8) {
                // estaban todos y se saca uno, tmb "todos"
                setCheckbox(newState.filter(day => day !== 'Todos'))
                return
            } else {
                setCheckbox(newState)
            }
        }
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (checkbox.length === 0) {
            setError('Primero debes seleccionar un dia')
            return
        }

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const title = formData.get('task-title') as string
        const hourFrom = formData.get('hour-from') as string
        const hourTo = formData.get('hour-to') as string
        const now = new Date()
        const createdAt = new Timestamp(now.getSeconds(), now.getMilliseconds())

        addTask({
            title,
            hourFrom,
            hourTo,
            selectedDays: checkbox,
            createdAt,
            creator: user?.email as string,
            isCompleted: false
        }).then(fulfilled => {
            toast({
                title: `Tarea ${title} agregada correctamente`,
                description: `creada en la fecha: ${now.toLocaleString()} con id ${fulfilled}`,
                variant: 'success'
            })
            form.reset()
            setCheckbox([])
        }).catch(error => setFirebaseError(error))
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto py-5 justify-center items-center w-full">
            <h3 className="text-3xl font-bold">{task ? 'Editar tarea' : 'Crear tarea'}</h3>
            {error && <p className="text-red-600">Parece que ocurrio un error: {error}</p>}
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="task-title">Título</Label>
                <Input type="text" id="task-title" name="task-title" required placeholder="ej. ir a futbol" />
            </div>
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="hour-from">Desde:</Label>
                <Input type="time" id="hour-from" name="hour-from" required />
            </div>
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="hour-to">Hasta:</Label>
                <Input type="time" id="hour-to" name="hour-to" required />
            </div>
            <div className="w-full sm:w-[80%] lg:w-96">
                <Label htmlFor="hour-to">Dias:</Label>
                <Button
                    type="button"
                    className='ml-2'
                    size='icon'
                    variant='ghost'
                    onClick={() => setShowDays(prev => !prev)}>
                    <ChevronDownIcon className={`transition-all ${showDays ? 'rotate-180' : 'rotate-0'}`} />
                </Button>
                {
                    showDays && (
                        <ul className="flex flex-wrap justify-start">
                            {
                                weekDays.map(day => (
                                    <li key={`li-checkbox-${day}`} className="flex flex-row gap-2 m-3">
                                        <input
                                            type="checkbox"
                                            name={day}
                                            id={`checkbox-${day}`}
                                            onChange={handleCheckboxChange}
                                            checked={checkbox.includes(day)}
                                            className="hover:cursor-pointer"
                                        />
                                        <Label
                                            htmlFor={`checkbox-${day}`}
                                            className="hover:cursor-pointer">
                                            {day}
                                        </Label>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>

            <Button type="submit" variant='outline' className="shadow-lg">{task ? 'Editar' : 'Crear'}</Button>
        </form>
    )
}