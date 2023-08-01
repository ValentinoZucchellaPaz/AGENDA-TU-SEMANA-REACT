import { createContext, useState } from 'react';

export const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  function sortByDate() {
    console.log(
      tasks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
    );
    setTasks(tasks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
  }
  return (
    <TaskContext.Provider value={{ tasks, setTasks, sortByDate }}>
      {children}
    </TaskContext.Provider>
  );
}
