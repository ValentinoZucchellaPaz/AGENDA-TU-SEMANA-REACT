import AuthForm from '@/components/AuthForm';
import { headings } from '@/constants/login';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  let { type } = router.query

  return (type === 'login') ? (
    <section className='w-full h-[90vh] flex flex-col justify-center items-center gap-6'>
      <div className='w-full md:w-2/3 bg-darkGray flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white'>
        <AuthForm authParam={headings.login} />
      </div>
      <div className='flex flex-col items-center'>
        <Text>¿No tienes una cuenta? Crea una y guarda tus tareas</Text>
        <Button className=' w-fit' onClick={() => router.replace('/sign-up')}>
          Sign Up
        </Button>
      </div>
    </section>
  ) :
    (
      <section className='w-full h-[90vh] flex flex-col justify-center items-center gap-6'>
        <div className='w-full md:w-2/3 bg-darkGray flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white'>
          <AuthForm authParam={headings.signUp} />
        </div >
        <div className='flex flex-col items-center'>
          <Text>Si ya tienes una cuenta solo debes loguearte</Text>
          <Button className=' w-fit' onClick={() => router.replace('/sign-up?type=login')}>
            Login
          </Button>
        </div>
      </section >
    )
}
