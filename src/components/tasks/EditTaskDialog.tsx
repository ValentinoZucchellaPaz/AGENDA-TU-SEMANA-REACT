import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Task } from "@/firebase/types"
import { useState } from "react"
import TaskForm from "./TaskForm"
import { Button } from "../ui/button"


export default function EditTaskDialog({ task }: { task: Task }) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-gray-800 dark:focus:text-gray-50 w-full hover:dark:bg-gray-800">
                Editar
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{task.title}</DialogTitle>
                <TaskForm task={task} onFulfilled={() => setOpen(false)}>
                    <footer className="flex flex-row gap-3 justify-end w-full">
                        <DialogClose asChild>
                            <Button type="button" variant='destructive' className="shadow-lg">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" variant='outline' className="shadow-lg">Editar</Button>
                    </footer>
                </TaskForm>
            </DialogContent>
        </Dialog >

    )
}