import { ListenTasks, deleteAllTasks } from '@/DAO/tasks';
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DINAMIC_COUNTER } from '@/constants/states';

export default function TasksContainer() {
  // context y hooks
  const taskContext = useContext(TaskContext);
  const { tasks, setTasks, sortByDate, sortByName } = taskContext;
  const { user } = useUser();
  // UI states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isButtonClikable, setIsButtonClikable] = useState(false);
  const [dinamicCount, setDinamicCount] = useState(DINAMIC_COUNTER.INITIAL)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();

  // observador de cambias en la db
  useEffect(() => {
    let unsubscribe;
    setTasks([])

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
  }, [user]);

  // cuando se quieran eliminar todas las tasks se espere tres segundos
  useEffect(() => {
    if (isOpen) {
      setIsButtonClikable(false)
      let count = DINAMIC_COUNTER.INITIAL
      const interval = setInterval(() => {
        count--
        setDinamicCount(count)

        if (count <= 0) {
          setIsButtonClikable(true)
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  // ordena por fecha
  function handleSortByDate() {
    sortByDate(isSortedByDate)
    setIsSortedByDate(prev => !prev)
  }
  // ordena por nombre
  function handleSortByName() {
    sortByName(isSortedByName)
    setIsSortedByName(prev => !prev)
  }
  // borra todo de la db de ese user
  function handleDeleteAll() {
    deleteAllTasks(user.email).then(cond => cond && toast({
      title: 'Todas borradas',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    }))
  }
  // abre modal y comienza cuenta
  function handleModalOpen() {
    setDinamicCount(DINAMIC_COUNTER.INITIAL)
    onOpen()
  }

  // mensajes en caso de carga o error
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading size={'md'}>Hubo un error</Heading>;
  }

  return (
    <div className='my-5 flex flex-col gap-10 justify-center w-full'>
      {
        // condicionales de mensajes segun si hay tasks o no
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
                  <MenuItem onClick={handleSortByDate} className='text-black'>
                    {/* <MenuItem onClick={() => sortByDate(isSortedByDate, setIsSortedByDate)} className='text-black'> */}
                    {isSortedByDate ? 'Más viejos' : 'Más nuevos'}
                  </MenuItem>
                  <MenuItem onClick={handleSortByName} className='text-black'>
                    {isSortedByName ? 'Z-A' : 'A-Z'}
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )
        ) : (
          <Spinner mx={'auto'} />
        )
      }

      {/* mapea tasks e imprime info */}
      <GridTasksLayout layout='todas'>
        {
          tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        }
      </GridTasksLayout>

      {/* boton de borrar todo */}
      {tasks.length > 0 && <Button w='fit-content' mx='auto' onClick={handleModalOpen}>Borrar todas</Button>}

      {/* confirmacion para borrar todo */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Borrar todas las tareas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Borrarás todas las tareas y no podrás recuperarlas, ¿seguro
            quieres hacerlo?
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isDisabled={!isButtonClikable}
              colorScheme='red'
              onClick={() => {
                handleDeleteAll();
                onClose();
              }}
            >
              {isButtonClikable ? 'Borrar' : `Espera ${dinamicCount} segundos`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
