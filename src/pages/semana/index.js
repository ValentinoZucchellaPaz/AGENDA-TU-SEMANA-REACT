import TasksContainer from '@/components/TasksContainer';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

export default function Semana() {
  const { user } = useAuth()
  return user ?
    <div>
      <TasksContainer />
    </div>
    : <div>Debes hacer login para ver tus tareas</div>;
}
