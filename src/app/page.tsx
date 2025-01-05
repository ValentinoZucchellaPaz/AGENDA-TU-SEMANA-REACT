'use client'
import TaskContainer from "@/components/TasksContainer";
import { useFirebaseContentContext } from "@/context/firebaseContentContext";
import { useRouter } from "next/navigation";


export default function Home() {
  const { user } = useFirebaseContentContext()
  const router = useRouter()

  if (user === null) {
    router.push('/auth')
  }
  return (
    <TaskContainer />
  );
}
