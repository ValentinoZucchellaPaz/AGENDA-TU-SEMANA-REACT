import TasksContainer from '@/components/TasksContainer';
import useUser from '@/hooks/useUser';
import React, { useContext } from 'react';

export default function Eventos() {
    const { user } = useUser()
    return user ?
        <div>
            Estos son tus eventos
        </div>
        : <div>Debes hacer login para ver tus tareas</div>;
}
