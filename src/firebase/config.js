// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqgAmJX9_5CZdHz_gIM42vFO1gpGwC-Ww",
  authDomain: 'agenda-tu-semana.firebaseapp.com',
  projectId: 'agenda-tu-semana',
  storageBucket: 'agenda-tu-semana.appspot.com',
  messagingSenderId: '82012225934',
  appId: '1:82012225934:web:a893140b600771cccae4df',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
