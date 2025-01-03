import AuthForm from '@/components/AuthForm';
import FormContainer from '@/components/FormContainer';
import TasksContainer from '@/components/TasksContainer';
import { headings } from '@/constants/login';
import { useAuth } from '@/context/AuthContext';
import { Button, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter();

  // devolver formulario de login si no esta logueado, si esta login renderiza resto de la app
  if (user === null && !loading) {
    router.replace(`/sign-up?type=login`)
  }

  // <section className='w-full h-[90vh] flex flex-col justify-center items-center gap-6'>
  //   <div className='w-full md:w-2/3 bg-darkGray flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white'>
  //     <AuthForm authParam={headings.login} />
  //   </div>
  //   <div className='flex flex-col items-center'>
  //     <Text>¿No tienes una cuenta? Crea una y guarda tus tareas</Text>
  //     <Button className=' w-fit' onClick={() => router.push('/sign-up')}>
  //       Sign Up
  //     </Button>
  //   </div>
  // </section>
  return (user && !loading) ?
    (
      <>
        <FormContainer />
        <TasksContainer />
      </>
    ) : (
      <div className={`h-screen absolute -top-14 grid place-content-center`}>
        <Spinner size='lg' label='Cargando...' />
      </div>
    );
}
