'use client'
import AuthContainer from "@/components/AuthContainer";
import TaskContainer from "@/components/tasks/TasksContainer";
import { useUserContext } from "@/context/userContext";

export default function Home() {
  const { user, loading } = useUserContext()

  if (loading) return (
    <div className="flex justify-center items-center h-[50dvh]">
      <span className="loader"></span>
    </div>
  )
  if (user === null) return <AuthContainer />
  return <TaskContainer />
}
