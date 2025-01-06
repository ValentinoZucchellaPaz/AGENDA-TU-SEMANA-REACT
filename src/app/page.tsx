'use client'
import AuthFallback from "@/components/AuthFallback";
import TaskContainer from "@/components/TasksContainer";
import { useFirebaseContentContext } from "@/context/firebaseContentContext";

export default function Home() {
  const { user } = useFirebaseContentContext()

  if (user === null) {
    return <AuthFallback />
  }
  return (
    <TaskContainer />
  );
}
