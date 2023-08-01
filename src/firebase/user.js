import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './config';

export function SignUpWithEmail(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => resolve(userCredentials))
      .catch((err) => reject(err));
  });
}

export function LogWithEmail(email, password) {
  console.log(email, password);
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => resolve(userCredentials))
      .catch((err) => reject(err));
  });
}

export function onAuthStateChangeOfUser(onChange) {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
}
