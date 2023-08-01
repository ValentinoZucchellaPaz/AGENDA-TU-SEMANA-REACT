import AuthForm from '@/components/AuthForm';
import FormContainer from '@/components/FormContainer';
import TasksContainer from '@/components/TasksContainer';
import useUser from '@/hooks/useUser';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  if (user === null) {
    return (
      <section className='w-full h-full flex flex-col items-center gap-6'>
        <div className='w-full md:w-2/3 bg-darkGray flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white'>
          <AuthForm authParam={'Login'} />
        </div>
        <div className='flex flex-col items-center'>
          <Text>¿No tienes una cuenta? Crea una y guarda tus tareas</Text>
          <Button className=' w-fit' onClick={() => router.push('/sign-up')}>
            Sign Up
          </Button>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <FormContainer />
        <TasksContainer />
      </>
    );
  }
}
