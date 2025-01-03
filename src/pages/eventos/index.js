import TasksContainer from '@/components/TasksContainer';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

export default function Eventos() {
    const { user, loading } = useAuth()
    return (user === null && !loading) ?
        <div>Debes hacer login para ver tus tareas</div>
        : <div>
            Estos son tus eventos
        </div>
}
