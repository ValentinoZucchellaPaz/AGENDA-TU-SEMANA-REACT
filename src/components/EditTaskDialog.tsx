import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import TaskForm from "./TaskForm"
import { Task } from "@/firebase/types"
import { ReactNode } from "react"


export default function EditTaskDialog({ task }: { task: Task }) {

    return (
        <Dialog>
            <DialogTrigger className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 hover:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-gray-800 dark:focus:text-gray-50 w-full hover:dark:bg-gray-800">
                Editar
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{task.title}</DialogTitle>
                <TaskForm task={task} />
            </DialogContent>
        </Dialog >

    )
}