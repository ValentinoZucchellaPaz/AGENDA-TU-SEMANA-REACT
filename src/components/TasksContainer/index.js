import { ListenTasks } from '@/firebase/tasks';
import TaskCard from '../TaskCard';
import { useContext, useEffect, useState } from 'react';
import GridTasksLayout from '../GridTasksLayout';
import { TaskContext } from '@/context/tasksContext';
import useUser from '@/hooks/useUser';
import {
  Button,
  Heading,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

export default function TasksContainer() {
  const { user } = useUser();
  const taskContext = useContext(TaskContext);
  const { tasks, setTasks, sortByDate } = taskContext;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    let unsubscribe;

    async function fetchData() {
      setError(false);
      setLoading(true);

      try {
        unsubscribe = await ListenTasks(setTasks, setError, user?.email);
      } catch (error) {
        setError(true);
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    }

    user && fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);
  useEffect(() => {}, [tasks]);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading size={'md'}>Hubo un error</Heading>;
  }

  return (
    <div className='my-5 flex flex-col gap-10 justify-center w-full'>
      {
        // dependiendo si hay tasks o no muestra un mensaje u otro
        tasks ? (
          tasks.length === 0 ? (
            <Heading textAlign={'center'} size={'md'}>
              No tienes tareas
            </Heading>
          ) : (
            <div className='flex flex-row justify-center gap-5 items-center'>
              <Heading textAlign={'center'} size={'md'}>
                Estas son tus tareas
              </Heading>
              <Menu>
                <MenuButton as={Button}>Ordernar por</MenuButton>
                <MenuList>
                  <MenuItem onClick={sortByDate} className='text-black'>
                    Fecha
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )
        ) : (
          <Spinner mx={'auto'} />
        )
      }

      <GridTasksLayout layout='todas'>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </GridTasksLayout>
    </div>
  );
}
