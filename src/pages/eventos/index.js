import TasksContainer from '@/components/TasksContainer';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

export default function Eventos() {
    const { user } = useAuth()
    return user ?
        <div>
            Estos son tus eventos
        </div>
        : <div>Debes hacer login para ver tus tareas</div>;
}
