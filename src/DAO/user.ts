import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { auth } from './config';

export async function SignUpWithEmail(email: string, password: string): Promise<UserCredential> {
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw error;
  }
}

export async function LogWithEmail(email: string, password: string): Promise<UserCredential> {
  console.log(email, password);
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw error;
  }
}

export function onAuthStateChangeOfUser(onChange: CallableFunction) {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
}
