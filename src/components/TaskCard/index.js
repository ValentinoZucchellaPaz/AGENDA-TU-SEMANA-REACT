import { deleteTaskById, toggleCompleteTask } from '@/DAO/tasks';
import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  Heading,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  CardFooter,
  Divider,
} from '@chakra-ui/react';
import EditTaskModal from '../EditTaskModal';

export default function TaskCard({ task }) {
  const { title, hourFrom, hourTo, selectedDays, id, isCompleted, createdAt } =
    task;
  const createdAtToString = new Date(createdAt.seconds * 1000).toLocaleString();
  const toast = useToast();

  const formattedDays =
    selectedDays.length === 1
      ? selectedDays[0]
      : selectedDays.length === 8
        ? 'Toda la semana'
        : selectedDays.map((day, index) => {
          if (index === selectedDays.length - 2) {
            return `${day} y `;
          } else if (index === selectedDays.length - 1) {
            return day;
          } else {
            return `${day}, `;
          }
        });

  function handleCompleted() {
    toggleCompleteTask(id, isCompleted).catch((e) =>
      toast({
        title: `${title} no se pudo completar`,
        description: e.code,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      }),
    );
  }
  function handleDelete() {
    deleteTaskById(id)
      .then(() =>
        toast({
          title: `${title} eliminado`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        }),
      )
      .catch((err) =>
        toast({
          title: `Error: ${err}`,
          description: `No se ha podido eliminar ${title}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        }),
      );
  }

  return (
    <Card position={'relative'} w={'100%'} py={2} px={1}>
      <CardHeader
        display={'flex'}
        p={1}
        alignItems={'start'}
        justifyContent={'space-between'}
      >
        <Box flex={1}>
          <Heading noOfLines={2} mx={3} size='md'>
            <p className=' first-letter:uppercase'>{title}</p>
          </Heading>
        </Box>
        <Menu>
          <MenuButton variant={'ghost'} p={0} minW={7} h={7} as={Button}>
            <SmallAddIcon />
          </MenuButton>
          <MenuList>
            <EditTaskModal task={task} />
            <MenuItem onClick={handleCompleted}>
              {isCompleted ? 'Uncomplete' : 'Complete'}
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              textColor={'red.500'}
              fontWeight={'semibold'}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>

      <Divider />

      <CardBody>
        <Stack spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              From:{' '}
              <Text
                display={'inline'}
                fontWeight={'normal'}
                pt='2'
                fontSize='sm'
              >
                {hourFrom}
              </Text>
            </Heading>
            <Heading size='xs' textTransform='uppercase'>
              To:{' '}
              <Text
                display={'inline'}
                fontWeight={'normal'}
                pt='2'
                fontSize='sm'
              >
                {hourTo}
              </Text>
            </Heading>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Days:{' '}
              <Text
                display={'inline'}
                fontWeight={'normal'}
                pt='2'
                fontSize='sm'
              >
                {formattedDays}
              </Text>
            </Heading>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter className='flex flex-col' p={2}>
        <Text as='small'>Created: {createdAtToString}</Text>
        {isCompleted && (
          <Badge width='fit-content' colorScheme='green'>
            Completed
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
