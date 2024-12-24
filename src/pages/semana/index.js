import TasksContainer from '@/components/TasksContainer';
import useUser from '@/hooks/useUser';
import React, { useContext } from 'react';

export default function Semana() {
  const { user } = useUser()
  return user ?
    <div>
      <TasksContainer />
    </div>
    : <div>Debes hacer login para ver tus tareas</div>;
}
