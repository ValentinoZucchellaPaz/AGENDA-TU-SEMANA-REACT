import { createContext, useState } from 'react';

export const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  function sortByDate(state) {
    console.log('sorted by date');
    if (!state) {
      tasks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    } else {
      tasks.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    }
  }
  function sortByName(state) {
    console.log('sorted by name');
    if (!state) {
      tasks.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      tasks.sort((a, b) => b.title.localeCompare(a.title))
    }
  }
  return (
    <TaskContext.Provider value={{ tasks, setTasks, sortByDate, sortByName }}>
      {children}
    </TaskContext.Provider>
  );
}
