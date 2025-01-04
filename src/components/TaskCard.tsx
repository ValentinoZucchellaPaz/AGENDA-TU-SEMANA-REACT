import { Task } from "@/firebase/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


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
    return (
        <Card>
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="uppercase font-semibold">Desde: {task.hourFrom}</p>
                <p className="uppercase font-semibold">Hasta: {task.hourTo}</p>
                <p className="uppercase font-semibold">Días: {formatDaysToString()}</p>
            </CardContent>
            <CardFooter>
                {task.createdAt.toDate().toLocaleDateString()}
            </CardFooter>
        </Card>

    )
}