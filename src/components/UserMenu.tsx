import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { logout } from "@/firebase/auth"
import { Button } from "./ui/button"


export default function UserMenu({ userMail }: { userMail: string }) {
    const router = useRouter()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' title={userMail}>
                    <p className="max-w-32 overflow-hidden truncate">{userMail}</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">¿Quieres cambiar de cuenta?</DialogTitle>
                    <DialogDescription className="text-md pt-2">
                        Dejarás de ver las tareas creadas en esta cuenta, <br />¿seguro quieres hacerlo?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={() => {
                            logout()
                            router.push('/')
                        }} variant='destructive'>Salir</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}