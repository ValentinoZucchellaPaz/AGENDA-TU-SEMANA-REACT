import TaskContainer from "@/components/TasksContainer";
import { ToggleTheme } from "@/components/ui/ToggleTheme";


export default function Home() {
  return (
    <div>hola
      <ToggleTheme />
      <TaskContainer />
    </div>
  );
}
