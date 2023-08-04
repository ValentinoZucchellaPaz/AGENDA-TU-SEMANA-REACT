import { useState, useEffect } from 'react';
import {
  LogWithEmail,
  SignUpWithEmail,
  onAuthStateChangeOfUser,
} from '@/firebase/user';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // hace login y tmb maneja cualquier error y lo devuelve en obj
  function handleLogin(email, password) {
    LogWithEmail(email, password)
      .then((res) => {
        router.push('/');
        setUser(res);
      })
      .catch((err) => {
        const errorCode = err.code.split('/').pop().split('-').join(' ');
        let errorMessage = err.message.replace('Firebase: ', '').split('(')[0];
        if (errorMessage === 'Error ') {
          errorMessage = null;
        }
        setError({ errorCode, errorMessage });
      });
  }

  // hace sign up y login juntos, tmb maneja cualquier error y lo devuelve en obj
  function handleSignUp(email, password) {
    SignUpWithEmail(email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        const errorCode = err.code.split('/').pop().split('-').join(' ');
        let errorMessage = err.message.replace('Firebase: ', '').split('(')[0];
        if (errorMessage === 'Error ') {
          errorMessage = null;
        }
        setError({ errorCode, errorMessage });
      });
  }

  function SignOut() {
    signOut(auth)
      .then((res) => setUser(null))
      .catch(() => console.log('no se pudo desloguear'));
  }

  useEffect(() => {
    onAuthStateChangeOfUser(setUser);
  }, []);

  return { user, handleLogin, handleSignUp, error, SignOut };
}
