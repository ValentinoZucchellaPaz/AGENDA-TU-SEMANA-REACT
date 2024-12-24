import { headings } from '@/constants/login';
import { useAuth } from '@/context/AuthContext';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

export default function AuthForm({ authParam }) {
  const { handleLogin, handleSignUp, error } = useAuth();


  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    if (authParam === headings.login) {
      handleLogin(username, password);
    } else if (authParam === headings.signUp) {
      handleSignUp(username, password);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex flex-col gap-3 justify-center items-center px-8 py-3'
    >
      <Heading size='xl'>{authParam}</Heading>

      <FormControl isRequired>
        <FormLabel requiredIndicator=''>Email</FormLabel>
        <Input name='username' type='email' placeholder='Ej. email@gmail.com' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel requiredIndicator=''>Contraseña</FormLabel>
        <Input
          name='password'
          type='password'
          placeholder='Escribe tu contraseña'
        />
      </FormControl>
      {error && (
        <Text align='center' color='red' className=' first-letter:uppercase'>
          {error?.errorCode}
          {error.errorMessage && ': '}
          {error.errorMessage}
        </Text>
      )}
      <Button type='submit'>{authParam}</Button>
    </form>
  );
}
