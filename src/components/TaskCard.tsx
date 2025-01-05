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

import { Separator } from "./ui/separator";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTask, getTaskById, getTasks, toggleComplete, updateTask } from "@/firebase/tasks";
import { Badge } from "./ui/badge";


export default function TaskCard({ task }: { task: Task }) {

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
        try {
            await toggleComplete(task.id, task.isCompleted)
        } catch (e) {
            console.log(e);
        }
    }
    async function handleDelete() {
        try {
            await deleteTask(task.id)

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card className="flex flex-col shadow-lg">
            <CardHeader className="px-4 flex flex-row justify-between items-center py-2">
                <CardTitle>{task.title}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                            <PlusIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
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
                <p>Creado: {task.createdAt.toDate().toLocaleDateString()}, {task.createdAt.toDate().toLocaleTimeString()}</p>
                {task.isCompleted && <Badge variant='success'>COMPLETADA</Badge>}
            </CardFooter>
        </Card>

    )
}