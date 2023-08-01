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

  function handleLogin(email, password) {
    LogWithEmail(email, password)
      .then((res) => {
        console.log(res);
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

  function handleSignUp(email, password) {
    SignUpWithEmail(email, password)
      .then((res) => {
        console.log(res);
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
    console.log(user);
  }, []);

  return { user, handleLogin, handleSignUp, error, SignOut };
}
