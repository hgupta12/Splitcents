import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "splitcents-e717d.firebaseapp.com",
    projectId: "splitcents-e717d",
    storageBucket: "splitcents-e717d.appspot.com",
    messagingSenderId: "710788878899",
    appId: "1:710788878899:web:55ad53e85f6782d5f10946",
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);