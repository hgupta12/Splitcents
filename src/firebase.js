import { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "splitcents-e717d.firebaseapp.com",
    projectId: "splitcents-e717d",
    storageBucket: "splitcents-e717d.appspot.com",
    messagingSenderId: "196772419737",
    appId: "1:196772419737:web:9e81ca9dc5b7aee0460008",
    databaseURL: "https://splitcents-e717d-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);