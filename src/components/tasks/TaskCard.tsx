import { Task } from "@/firebase/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { deleteTask, toggleComplete } from "@/firebase/tasks";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";
import { memo } from "react";
import EditTaskDialog from "./EditTaskDialog";
import { Separator } from "../ui/separator";
import { useFirebaseErrorContext } from "@/context/firebaseErrorContext";


function TaskCard({ task }: { task: Task }) {
    const { toast } = useToast()
    const { setError } = useFirebaseErrorContext()

    function formatDaysToString(): string {
        let res = ''
        if (task.selectedDays.length === 8) return "toda la semana"
        task.selectedDays.forEach((day, index) => {
            if (index === task.selectedDays.length - 1) {
                res += day
            } else if (index === task.selectedDays.length - 2) {
                res += day + " y "
            } else {
                res += day + ", "
            }
        })
        return res
    }

    async function handleToggleComplete() {
        toggleComplete(task.id, task.isCompleted).catch(e => setError(e))
    }
    async function handleDelete() {
        deleteTask(task.id)
            .then(() => toast({ title: `${task.title.toUpperCase()} eliminada correctamente` }))
            .catch(e => {
                toast({ title: `Ocurrio un error eliminando ${task.title}`, variant: 'destructive' })
                setError(e)
            })
    }

    return (
        <li>
            <Card className="flex flex-col shadow-lg h-full">
                <CardHeader className="px-4 flex flex-row justify-between items-center py-2">
                    <CardTitle>{task.title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                                <PlusIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <EditTaskDialog task={task} />

                            <DropdownMenuItem onClick={handleToggleComplete}>{task.isCompleted ? 'Descompletar' : 'Completar'}</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-red-500">Borrar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </CardHeader>
                <Separator />
                <CardContent className="flex-1 py-2 px-4">
                    <p className="uppercase leading-relaxed"><span className="font-semibold">Desde:</span> {task.hourFrom}</p>
                    <p className="uppercase leading-relaxed"><span className="font-semibold">Hasta:</span> {task.hourTo}</p>
                    <p className="uppercase leading-relaxed"><span className="font-semibold">Días:</span> {formatDaysToString()}</p>
                </CardContent>
                <Separator />
                <CardFooter className="py-2 px-4 flex flex-col items-start">
                    <p>Creado: {task.createdAt.toDate().toLocaleString()}</p>
                    {task.isCompleted && <Badge variant='success'>COMPLETADA</Badge>}
                </CardFooter>
            </Card>
        </li>

    )
}

export default memo(TaskCard)