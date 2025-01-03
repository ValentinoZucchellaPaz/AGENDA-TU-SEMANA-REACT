import { Task, TaskContextProps } from '@/types';
import React, { ReactNode, useContext } from 'react';
import { createContext, useState } from 'react';

export const TaskContext = createContext<TaskContextProps | null>(null);

export function TasksProvider({ children }: { children: ReactNode }): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  function sortByDate(state: boolean): void {
    console.log('sorted by date');
    if (!state) {
      tasks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    } else {
      tasks.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    }
  }
  function sortByName(state: boolean): void {
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

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks se debe usar dentro de TasksProvider')
  return context
}