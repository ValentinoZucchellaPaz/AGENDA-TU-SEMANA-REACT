import {
  Heading,
  FormControl,
  FormLabel,
  IconButton,
  Button,
  Checkbox,
  CheckboxGroup,
  Grid,
  Input,
  useToast,
} from '@chakra-ui/react';
import TimeField from 'react-simple-timefield';
import { sortWeekdays, weekDays } from './validations';
import useAsyncCreate from '@/hooks/useAsyncCreate';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import useUser from '@/hooks/useUser';

export default function Form({ task, submitButton, heading }) {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [hourFrom, setHourFrom] = useState('00:00');
  const [hourTo, setHourTo] = useState('00:00');
  const [selectedDays, setSelectedDays] = useState([]);
  const [showDays, setShowDays] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (task) {
      const { title, hourFrom, hourTo, selectedDays } = task;
      setHourFrom(hourFrom);
      setHourTo(hourTo);
      setTitle(title);
      setSelectedDays(selectedDays);
    }
  }, []);

  // maneja los checkbox
  function handleOnChange(day) {
    const monToSunChecked = weekDays
      .slice(0, -1)
      .every((weekDay) => day.includes(weekDay));

    if (day.includes('Todos') && !selectedDays.includes('Todos')) {
      // 'Todos' checked
      setSelectedDays([...weekDays]);
    } else if (selectedDays.includes('Todos') && !day.includes('Todos')) {
      // deschequear a todos
      setSelectedDays([]);
    } else if (selectedDays.includes('Todos') && day.includes('Todos')) {
      // todos checked y se descheckea uno, asi q tmb descheckea a 'Todos'
      const arr = day.filter((state) => state !== 'Todos');
      setSelectedDays(arr);
    } else if (monToSunChecked) {
      // todos checked menos 'Todos'
      setSelectedDays([...weekDays]);
    } else {
      // chequea al q se toca
      setSelectedDays(day);
    }
  }

  // mostrar o no los checkbox
  function handleToggleDays() {
    setShowDays(!showDays);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const sortedDays = sortWeekdays(selectedDays);

    if (selectedDays.length > 0) {
      setSelectedDays([]);
      setHourFrom('');
      setHourTo('');
      setTitle('');
      useAsyncCreate({
        title,
        hourTo: hourTo ? hourTo : '00:00',
        hourFrom: hourFrom ? hourFrom : '00:00',
        selectedDays: sortedDays,
        task,
        creator: user.email,
      })
        .then(() => {
          toast({
            title: `${title} subido`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        })
        .catch((e) => {
          toast({
            title: 'Hubo un error',
            description: e?.code,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        });
    } else {
      toast({
        title: 'Hubo un error',
        description: 'Debes llenar todos los campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=' w-fit flex flex-col gap-3 justify-center items-center  py-3 mx-auto'
    >
      <Heading size={'md'}>{heading}</Heading>
      <FormControl isRequired>
        <FormLabel requiredIndicator=''>Title</FormLabel>
        <Input
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Ej. lavar los platos'
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel requiredIndicator=''>Desde</FormLabel>
        <TimeField
          value={hourFrom}
          onChange={(e, value) => setHourFrom(value)}
          input={<Input type='text' />}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel requiredIndicator=''>Hasta</FormLabel>
        <TimeField
          value={hourTo}
          onChange={(e, value) => setHourTo(value)}
          input={<Input type='text' />}
        />
      </FormControl>

      {/* checkboxs */}
      <FormControl>
        <FormLabel display={'flex'} alignItems={'center'} requiredIndicator=''>
          Días
          <IconButton
            icon={showDays ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggleDays}
            aria-label={showDays ? 'Ocultar días' : 'Mostrar días'}
            variant='unstyled'
            fontSize='xl'
            mr={2}
          />
        </FormLabel>

        {showDays && (
          <CheckboxGroup
            colorScheme='green'
            value={selectedDays}
            onChange={handleOnChange}
            name='days'
          >
            <Grid
              mx={'auto'}
              w={'fit-content'}
              templateColumns={{
                base: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(5, minmax(0, 1fr))',
              }}
              gap={4}
            >
              {weekDays.map((day) => (
                <Checkbox key={day} value={day}>
                  {day}
                </Checkbox>
              ))}
            </Grid>
          </CheckboxGroup>
        )}
      </FormControl>

      {/* submitting button */}
      {submitButton || (
        <Button type='submit' colorScheme='blue'>
          Agregar
        </Button>
      )}
    </form>
  );
}
