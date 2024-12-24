import { useState, useEffect } from 'react';
import {
  LogWithEmail,
  SignUpWithEmail,
  onAuthStateChangeOfUser,
} from '@/DAO/user';
import { useRouter } from 'next/router';
import { signOut, UserCredential } from 'firebase/auth';
import { auth } from '@/DAO/config';

export default function useUser(): {
  user: UserCredential | null,
  handleLogin: (email: string, password: string) => void,
  handleSignUp: (email: string, password: string) => void,
  error: {
    errorCode: string;
    errorMessage: string;
  } | null,
  SignOut: () => void
} {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [error, setError] = useState<{ errorCode: string, errorMessage: string } | null>(null);
  const router = useRouter();

  // hace login y tmb maneja cualquier error y lo devuelve en obj
  function handleLogin(email: string, password: string): void {
    LogWithEmail(email, password)
      .then((res) => {
        router.push('/');
        setUser(res);
      })
      .catch((err) => {
        const errorCode: string = err.code.split('/').pop().split('-').join(' ');
        const errorMessage: string = err.message.replace('Firebase: ', '').split('(')[0];
        setError({ errorCode, errorMessage });
      });
  }

  // hace sign up y login juntos, tmb maneja cualquier error y lo devuelve en obj
  function handleSignUp(email: string, password: string): void {
    SignUpWithEmail(email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        const errorCode: string = err.code.split('/').pop().split('-').join(' ');
        let errorMessage: string = err.message.replace('Firebase: ', '').split('(')[0];
        setError({ errorCode, errorMessage });
      });
  }

  function SignOut(): void {
    signOut(auth)
      .then(() => setUser(null))
      .catch(() => console.log('no se pudo desloguear'));
  }

  useEffect(() => {
    onAuthStateChangeOfUser(setUser);
  }, []);

  return { user, handleLogin, handleSignUp, error, SignOut };
}
