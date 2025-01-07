'use client'
import AuthContainer from "@/components/AuthContainer";
import TaskContainer from "@/components/TasksContainer";
import { useFirebaseContentContext } from "@/context/firebaseContentContext";

export default function Home() {
  const { user } = useFirebaseContentContext()

  if (user === null) {
    return <AuthContainer />
  }
  return (
    <TaskContainer />
  );
}
